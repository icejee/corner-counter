/**
 * Corner Counter POS — Continuous Cosmic Starfield & Nebula Particle Engine
 * Features: Multi-layered twinkling stars, gentle 3D parallax drift,
 * shooting star meteor streaks, soft nebula stardust aura, and battery-friendly auto-pausing.
 */

(function () {
  let canvas, ctx;
  let width = 0, height = 0;
  let stars = [];
  let shootingStars = [];
  let animationFrameId = null;
  let isVisible = true;
  let lastShootingStarTime = Date.now();

  const STAR_COLORS = [
    "rgba(255, 255, 255, ",
    "rgba(6, 182, 212, ",   // Cyan
    "rgba(56, 189, 248, ",  // Sky blue
    "rgba(16, 185, 129, ",  // Emerald
    "rgba(168, 85, 247, ",  // Violet
    "rgba(251, 191, 36, "   // Amber
  ];

  class Star {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * (width || window.innerWidth || 800);
      this.y = initial ? Math.random() * (height || window.innerHeight || 600) : -10;
      this.size = Math.random() * 1.8 + 0.5; // size 0.5px to 2.3px
      this.speed = Math.random() * 0.25 + 0.08; // slow drift
      this.baseAlpha = Math.random() * 0.6 + 0.25;
      this.alpha = this.baseAlpha;
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
      this.twinkleOffset = Math.random() * Math.PI * 2;
      this.colorPrefix = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
      this.hasGlow = Math.random() > 0.85; // some stars have a halo glow
    }

    update(time) {
      this.y += this.speed;
      this.x += Math.sin(time * 0.0005 + this.twinkleOffset) * 0.1;

      // Twinkle pulsation
      this.alpha = this.baseAlpha + Math.sin(time * this.twinkleSpeed + this.twinkleOffset) * 0.25;
      if (this.alpha < 0.1) this.alpha = 0.1;
      if (this.alpha > 1) this.alpha = 1;

      if (this.y > height + 10) {
        this.reset(false);
      }
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
    }

    draw(isDark) {
      const alphaMult = isDark ? 1.0 : 0.45;
      const finalAlpha = Math.min(1, Math.max(0, this.alpha * alphaMult));

      ctx.fillStyle = this.colorPrefix + finalAlpha + ")";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();

      if (this.hasGlow && isDark) {
        ctx.fillStyle = this.colorPrefix + (finalAlpha * 0.25) + ")";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  class ShootingStar {
    constructor() {
      this.x = Math.random() * width * 0.8;
      this.y = Math.random() * height * 0.4;
      this.len = Math.random() * 80 + 50;
      this.speed = Math.random() * 8 + 6;
      this.angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1); // ~45 deg
      this.alpha = 1.0;
      this.color = Math.random() > 0.5 ? "rgba(6, 182, 212," : "rgba(255, 255, 255,";
      this.decay = Math.random() * 0.02 + 0.015;
    }

    update() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.alpha -= this.decay;
    }

    draw() {
      if (this.alpha <= 0) return;
      ctx.strokeStyle = this.color + this.alpha + ")";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(
        this.x - Math.cos(this.angle) * this.len,
        this.y - Math.sin(this.angle) * this.len
      );
      ctx.stroke();
    }
  }

  function resize() {
    if (!canvas) return;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    if (stars.length === 0) {
      const count = Math.min(180, Math.max(60, Math.floor((width * height) / 8000)));
      for (let i = 0; i < count; i++) {
        stars.push(new Star());
      }
    }
  }

  function drawNebulaGlow(isDark) {
    if (!isDark) return;
    // Soft radial ambient nebula glows
    const grad1 = ctx.createRadialGradient(width * 0.2, height * 0.15, 10, width * 0.2, height * 0.15, width * 0.45);
    grad1.addColorStop(0, "rgba(6, 182, 212, 0.035)");
    grad1.addColorStop(1, "rgba(6, 182, 212, 0)");
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, width, height);

    const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.75, 10, width * 0.8, height * 0.75, width * 0.5);
    grad2.addColorStop(0, "rgba(139, 92, 246, 0.03)");
    grad2.addColorStop(1, "rgba(139, 92, 246, 0)");
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, width, height);
  }

  function animate(now) {
    if (!isVisible) return;

    const isDark = document.body.getAttribute("data-theme") !== "light";

    ctx.clearRect(0, 0, width, height);

    drawNebulaGlow(isDark);

    // Update & draw stars
    for (let i = 0; i < stars.length; i++) {
      stars[i].update(now);
      stars[i].draw(isDark);
    }

    // Spawn occasional shooting stars (every 5-9 seconds)
    if (isDark && now - lastShootingStarTime > 5000 + Math.random() * 4000) {
      shootingStars.push(new ShootingStar());
      lastShootingStarTime = now;
    }

    // Update & draw shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];
      s.update();
      s.draw();
      if (s.alpha <= 0) {
        shootingStars.splice(i, 1);
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  function initStarfield() {
    canvas = document.getElementById("stars-canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "stars-canvas";
      canvas.className = "cosmic-stars-canvas";
      document.body.prepend(canvas);
    }
    ctx = canvas.getContext("2d");

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("orientationchange", () => setTimeout(resize, 200), { passive: true });

    document.addEventListener("visibilitychange", () => {
      isVisible = document.visibilityState === "visible";
      if (isVisible) {
        lastShootingStarTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      } else if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    });

    animationFrameId = requestAnimationFrame(animate);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initStarfield);
  } else {
    initStarfield();
  }
})();
