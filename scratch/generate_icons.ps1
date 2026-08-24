Add-Type -AssemblyName System.Drawing

$src = 'C:\Users\DELL\.gemini\antigravity-ide\brain\fd6ac375-5658-46bd-9d70-ef3d7541728f\.user_uploaded\media_1787553922911.png'
Copy-Item $src 'c:\Users\DELL\Desktop\corner-counter\icons\logo.png' -Force

function Resize-ImageFile {
    param(
        [string]$sourcePath,
        [string]$targetPath,
        [int]$width,
        [int]$height
    )
    $img = [System.Drawing.Image]::FromFile($sourcePath)
    $bmp = New-Object System.Drawing.Bitmap($width, $height)
    $graph = [System.Drawing.Graphics]::FromImage($bmp)
    $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graph.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graph.DrawImage($img, 0, 0, $width, $height)
    $bmp.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $graph.Dispose()
    $bmp.Dispose()
    $img.Dispose()
}

Resize-ImageFile -sourcePath $src -targetPath 'c:\Users\DELL\Desktop\corner-counter\icons\icon-512.png' -width 512 -height 512
Resize-ImageFile -sourcePath $src -targetPath 'c:\Users\DELL\Desktop\corner-counter\icons\icon-192.png' -width 192 -height 192
Resize-ImageFile -sourcePath $src -targetPath 'c:\Users\DELL\Desktop\corner-counter\icons\favicon-32.png' -width 32 -height 32
Resize-ImageFile -sourcePath $src -targetPath 'c:\Users\DELL\Desktop\corner-counter\icons\favicon-16.png' -width 16 -height 16

Write-Host "Icon generation completed successfully!"
