/* ============================================================
 *  Corner Counter POS — Bluetooth Thermal Printer Module
 *  bluetooth-printer.js
 *
 *  Connects to BLE thermal printers via Web Bluetooth API and
 *  sends ESC/POS encoded receipts over a BLE UART (serial)
 *  characteristic.
 *
 *  Supported printer protocols (tries in order):
 *    1. Nordic UART Service (NUS) — most common on modern printers
 *    2. Generic 0xFF00 serial service (common in cheap Chinese printers)
 *    3. Microchip BLE UART (some older units)
 *    4. Peripage / Phomemo custom service
 *
 *  ESC/POS commands implemented:
 *    ESC @  — Initialize
 *    ESC a  — Alignment (left/center/right)
 *    ESC E  — Bold
 *    ESC !  — Text mode (double-height, double-width)
 *    GS V   — Paper cut
 *    LF     — Line feed
 * ============================================================ */

const BluetoothPrinter = (function () {

  // --------------- BLE Service / Characteristic UUIDs ---------------
  const SERVICES = [
    {
      // Nordic UART Service — by far the most common
      serviceUUID: '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
      txCharUUID:  '6e400002-b5a3-f393-e0a9-e50e24dcca9e', // write
      rxCharUUID:  '6e400003-b5a3-f393-e0a9-e50e24dcca9e', // notify
    },
    {
      // Generic 0xFF00 serial (GOOJPRT, many cheap ESC/POS printers)
      serviceUUID: '0000ff00-0000-1000-8000-00805f9b34fb',
      txCharUUID:  '0000ff02-0000-1000-8000-00805f9b34fb',
      rxCharUUID:  '0000ff01-0000-1000-8000-00805f9b34fb',
    },
    {
      // Microchip BM70/RN4870 UART Transparent Service
      serviceUUID: '49535343-fe7d-4ae5-8fa9-9fafd205e455',
      txCharUUID:  '49535343-8841-43f4-a8d4-ecbe34729bb3',
      rxCharUUID:  '49535343-1e4d-4bd9-ba61-23c647249616',
    },
    {
      // Peripage / Phomemo / some Epson BT-d series
      serviceUUID: '0000ae30-0000-1000-8000-00805f9b34fb',
      txCharUUID:  '0000ae01-0000-1000-8000-00805f9b34fb',
      rxCharUUID:  '0000ae02-0000-1000-8000-00805f9b34fb',
    },
  ];

  // All service UUIDs we want to filter on (for the device picker)
  const ALL_SERVICE_UUIDS = SERVICES.map(s => s.serviceUUID);

  // --------------- Internal State ---------------
  let _device        = null;   // BluetoothDevice
  let _server        = null;   // BluetoothRemoteGATTServer
  let _txChar        = null;   // BluetoothRemoteGATTCharacteristic (write)
  let _connected     = false;
  let _deviceName    = null;
  let _serviceInfo   = null;   // which SERVICES entry matched

  // --------------- ESC/POS Encoder ---------------
  const ESC = 0x1B;
  const GS  = 0x1D;
  const LF  = 0x0A;
  const CR  = 0x0D;

  function cmd(...bytes) {
    return new Uint8Array(bytes);
  }

  function textBytes(str) {
    // Encode to Latin-1 (ISO 8859-1) — standard for ESC/POS printers
    const bytes = [];
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      bytes.push(code > 255 ? 0x3F : code); // replace non-Latin chars with '?'
    }
    return new Uint8Array(bytes);
  }

  function centerPad(text, width) {
    if (text.length >= width) return text.slice(0, width);
    const pad = Math.floor((width - text.length) / 2);
    return ' '.repeat(pad) + text;
  }

  function leftRight(left, right, width) {
    const gap = width - left.length - right.length;
    if (gap <= 0) return left.slice(0, width - right.length - 1) + ' ' + right;
    return left + ' '.repeat(gap) + right;
  }

  /**
   * Build a complete ESC/POS receipt byte array from a sale object.
   * @param {Object} sale   - sale record from state.sales
   * @param {Object} settings - POS settings (storeName, currency, etc.)
   * @returns {Uint8Array}
   */
  function buildReceiptBytes(sale, settings) {
    const COL = 32; // 58mm paper width (32 chars), change to 42 for 80mm
    const curr = settings.currency || '$';
    const storeName = sale.companyName || settings.storeName || 'Corner Counter';
    const footer = settings.receiptFooter || 'Thank you!';
    const timeStr = new Date(sale.timestamp).toLocaleString();
    const cashier = sale.cashier || 'Staff';
    const saleId = (sale.id || '').slice(-6).toUpperCase();

    function fmt(amount) {
      return curr + parseFloat(amount || 0).toFixed(2);
    }

    const chunks = [];

    const push = (...arrays) => arrays.forEach(a => chunks.push(a));

    // Initialize printer
    push(cmd(ESC, 0x40));  // ESC @ — init

    // --- Store name (bold + double height + centered) ---
    push(cmd(ESC, 0x61, 0x01));                    // ESC a 1 — center
    push(cmd(ESC, 0x21, 0x30));                    // ESC ! 0x30 — double height+width
    push(cmd(ESC, 0x45, 0x01));                    // ESC E 1 — bold on
    push(textBytes(storeName + '\n'));
    push(cmd(ESC, 0x45, 0x00));                    // bold off
    push(cmd(ESC, 0x21, 0x00));                    // normal size

    // Subtitle
    push(textBytes('RECEIPT\n'));
    push(cmd(ESC, 0x61, 0x00));                    // left align

    // Divider
    push(textBytes('-'.repeat(COL) + '\n'));

    // Metadata
    push(textBytes('Time:    ' + timeStr + '\n'));
    push(textBytes('Cashier: ' + cashier + '\n'));
    push(textBytes('ID:      #' + saleId + '\n'));

    // Divider
    push(textBytes('-'.repeat(COL) + '\n'));

    // Items
    if (sale.items && sale.items.length > 0) {
      sale.items.forEach(item => {
        const itemName = (item.name || 'Item').slice(0, COL - 12);
        const qty = String(item.qty || 1);
        const lineTotal = fmt((item.qty || 1) * (item.price || 0));
        const line = qty + 'x ' + itemName;
        push(textBytes(leftRight(line, lineTotal, COL) + '\n'));
        if (item.note) {
          push(textBytes('  > ' + item.note.slice(0, COL - 4) + '\n'));
        }
      });
    }

    // Divider
    push(textBytes('-'.repeat(COL) + '\n'));

    // Subtotal
    const subtotal = sale.subtotal || sale.total || 0;
    push(textBytes(leftRight('Subtotal', fmt(subtotal), COL) + '\n'));

    if (sale.tax) {
      push(textBytes(leftRight('Tax', fmt(sale.tax), COL) + '\n'));
    }
    if (sale.discount) {
      push(textBytes(leftRight('Discount', '-' + fmt(sale.discount), COL) + '\n'));
    }
    if (sale.tip) {
      push(textBytes(leftRight('Tip', fmt(sale.tip), COL) + '\n'));
    }

    // Total (bold + large)
    push(cmd(ESC, 0x45, 0x01));
    push(cmd(ESC, 0x21, 0x10));                    // double height
    push(textBytes(leftRight('TOTAL', fmt(sale.total), COL) + '\n'));
    push(cmd(ESC, 0x21, 0x00));
    push(cmd(ESC, 0x45, 0x00));

    // Payment info
    const method = (sale.paymentMethod || 'CASH').toUpperCase();
    push(textBytes(leftRight('Method', method, COL) + '\n'));
    if (sale.paymentMethod === 'cash' && sale.change !== undefined) {
      push(textBytes(leftRight('Change', fmt(sale.change), COL) + '\n'));
    }

    // Divider
    push(textBytes('='.repeat(COL) + '\n'));

    // Footer (centered)
    push(cmd(ESC, 0x61, 0x01)); // center
    push(textBytes(footer + '\n'));
    push(textBytes('Powered by Corner Counter\n'));
    push(cmd(ESC, 0x61, 0x00)); // left

    // Feed and cut
    push(new Uint8Array([LF, LF, LF, LF]));     // feed 4 lines before cut
    push(cmd(GS, 0x56, 0x00));                   // GS V 0 — full cut

    // Merge all chunks into one Uint8Array
    const totalLen = chunks.reduce((s, c) => s + c.length, 0);
    const result = new Uint8Array(totalLen);
    let offset = 0;
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }
    return result;
  }

  // --------------- BLE Write Helpers ---------------

  /**
   * Write bytes to the TX characteristic in MTU-sized chunks.
   * Most BLE printers have an MTU of 20 bytes, some up to 512.
   */
  async function writeChunked(char, data, chunkSize = 20) {
    let offset = 0;
    while (offset < data.length) {
      const chunk = data.slice(offset, offset + chunkSize);
      await char.writeValueWithoutResponse(chunk).catch(() =>
        char.writeValue(chunk) // fallback for older browsers
      );
      offset += chunkSize;
      // Small delay between chunks to avoid overwhelming the printer buffer
      if (offset < data.length) {
        await new Promise(r => setTimeout(r, 15));
      }
    }
  }

  /**
   * Try to connect using a specific service/characteristic UUID pair.
   * Returns the TX characteristic on success, or null on failure.
   */
  async function tryService(server, serviceInfo) {
    try {
      const service = await server.getPrimaryService(serviceInfo.serviceUUID);
      const tx = await service.getCharacteristic(serviceInfo.txCharUUID);
      return tx;
    } catch (e) {
      return null;
    }
  }

  // --------------- Public API ---------------

  /**
   * Check if Web Bluetooth is supported in this browser.
   * @returns {boolean}
   */
  function isSupported() {
    return !!(navigator.bluetooth && typeof navigator.bluetooth.requestDevice === 'function');
  }

  /**
   * Prompt the browser's device picker and attempt to connect.
   * Tries all known service UUIDs in sequence until one works.
   *
   * @returns {Promise<{success: boolean, deviceName: string, error?: string}>}
   */
  async function connect() {
    if (!isSupported()) {
      return { success: false, error: 'Web Bluetooth is not supported in this browser. Please use Chrome or Edge.' };
    }

    try {
      // Disconnect any existing connection first
      if (_device && _device.gatt.connected) {
        await disconnect().catch(() => {});
      }

      // Open the browser device picker — user selects the printer
      _device = await navigator.bluetooth.requestDevice({
        // Accept any device, but strongly prefer ones advertising our services
        acceptAllDevices: false,
        filters: [
          // Many thermal printers advertise with "Printer" or brand names
          { namePrefix: 'Printer' },
          { namePrefix: 'RPP' },
          { namePrefix: 'MTP' },
          { namePrefix: 'BT' },
          { namePrefix: 'GOOJPRT' },
          { namePrefix: 'Rongta' },
          { namePrefix: 'Epson' },
          { namePrefix: 'Star' },
          { namePrefix: 'WH-' },
          { namePrefix: 'ZJ-' },
          { namePrefix: 'PTP' },
          { namePrefix: 'GP-' },
          { namePrefix: 'MPT' },
          { namePrefix: 'PT-' },
          { services: ALL_SERVICE_UUIDS },
        ],
        optionalServices: ALL_SERVICE_UUIDS,
      });

    } catch (err) {
      if (err.name === 'NotFoundError' || err.name === 'AbortError') {
        return { success: false, error: 'No device selected.' };
      }
      // If filters were too narrow, try with acceptAllDevices
      try {
        _device = await navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: ALL_SERVICE_UUIDS,
        });
      } catch (err2) {
        if (err2.name === 'NotFoundError' || err2.name === 'AbortError') {
          return { success: false, error: 'No device selected.' };
        }
        return { success: false, error: err2.message || 'Failed to open device picker.' };
      }
    }

    _deviceName = _device.name || 'Unknown Printer';

    // Handle unexpected disconnection
    _device.addEventListener('gattserverdisconnected', () => {
      _connected = false;
      _txChar = null;
      _server = null;
      _serviceInfo = null;
      // Notify the POS app if it has registered a callback
      if (typeof BluetoothPrinter._onDisconnect === 'function') {
        BluetoothPrinter._onDisconnect();
      }
    });

    try {
      _server = await _device.gatt.connect();
    } catch (err) {
      return { success: false, error: 'Failed to connect to device GATT server: ' + err.message };
    }

    // Try each known service until one works
    for (const serviceInfo of SERVICES) {
      const tx = await tryService(_server, serviceInfo);
      if (tx) {
        _txChar = tx;
        _serviceInfo = serviceInfo;
        break;
      }
    }

    if (!_txChar) {
      // Last-ditch attempt: enumerate all services and find any writable characteristic
      try {
        const services = await _server.getPrimaryServices();
        outer: for (const service of services) {
          const chars = await service.getCharacteristics().catch(() => []);
          for (const char of chars) {
            if (char.properties.writeWithoutResponse || char.properties.write) {
              _txChar = char;
              _serviceInfo = { serviceUUID: service.uuid, txCharUUID: char.uuid };
              break outer;
            }
          }
        }
      } catch (e) {
        // ignore
      }
    }

    if (!_txChar) {
      await _device.gatt.disconnect().catch(() => {});
      return {
        success: false,
        error: `Connected to "${_deviceName}" but could not find a compatible printer service. This device may not be a supported ESC/POS thermal printer.`,
      };
    }

    _connected = true;
    console.log(`[BT Printer] Connected to: ${_deviceName} (service: ${_serviceInfo.serviceUUID})`);
    return { success: true, deviceName: _deviceName };
  }

  /**
   * Disconnect from the currently connected printer.
   */
  async function disconnect() {
    _connected = false;
    _txChar = null;
    _serviceInfo = null;
    if (_device && _device.gatt && _device.gatt.connected) {
      await _device.gatt.disconnect().catch(() => {});
    }
    _server = null;
    const name = _deviceName;
    _deviceName = null;
    return { success: true, deviceName: name };
  }

  /**
   * Print a receipt to the connected Bluetooth printer.
   * @param {Object} sale     - The sale record
   * @param {Object} settings - POS settings
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  async function printReceipt(sale, settings) {
    if (!_connected || !_txChar) {
      return { success: false, error: 'No Bluetooth printer connected.' };
    }

    try {
      // Re-connect if GATT got disconnected in the background
      if (_device && !_device.gatt.connected) {
        _server = await _device.gatt.connect();
        const tx = await tryService(_server, _serviceInfo);
        if (!tx) {
          _connected = false;
          return { success: false, error: 'Printer disconnected. Please reconnect.' };
        }
        _txChar = tx;
        _connected = true;
      }

      const bytes = buildReceiptBytes(sale, settings);

      // Determine a safe chunk size
      // Most printers support 20 bytes MTU, some handle 100+
      let chunkSize = 20;
      try {
        // If the browser supports it, get the negotiated MTU
        if (_server && typeof _server.device !== 'undefined') {
          chunkSize = 20; // conservative default; MTU negotiation not widely exposed
        }
      } catch (e) {}

      await writeChunked(_txChar, bytes, chunkSize);
      console.log(`[BT Printer] Receipt sent (${bytes.length} bytes) to ${_deviceName}`);
      return { success: true };
    } catch (err) {
      console.error('[BT Printer] Print error:', err);
      _connected = false;
      return { success: false, error: 'Print failed: ' + (err.message || err) };
    }
  }

  /**
   * Get the current connection status.
   * @returns {{ connected: boolean, deviceName: string|null }}
   */
  function getStatus() {
    const actuallyConnected = _connected && !!(_device && _device.gatt.connected);
    if (!actuallyConnected && _connected) {
      // Reconcile state if GATT silently dropped
      _connected = false;
    }
    return {
      connected: _connected,
      deviceName: _deviceName,
    };
  }

  // Expose public interface
  return {
    isSupported,
    connect,
    disconnect,
    printReceipt,
    getStatus,
    buildReceiptBytes, // exposed for testing
    _onDisconnect: null, // set by app.js to handle surprise disconnections
  };
})();
