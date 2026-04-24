Add-Type -AssemblyName System.Drawing

$root = "C:\Users\Ramsha\Documents\StartFlow Business"
$publicDir = Join-Path $root "public"
$markPath = Join-Path $publicDir "startflow-logo-mark.png"
$outputPath = Join-Path $publicDir "startflow-gmail-signature.png"

$width = 290
$height = 70

$bitmap = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$graphics.Clear([System.Drawing.Color]::Transparent)

function New-RoundedRectPath {
  param(
    [float]$x,
    [float]$y,
    [float]$w,
    [float]$h,
    [float]$r
  )

  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $diameter = $r * 2
  $path.AddArc($x, $y, $diameter, $diameter, 180, 90)
  $path.AddArc($x + $w - $diameter, $y, $diameter, $diameter, 270, 90)
  $path.AddArc($x + $w - $diameter, $y + $h - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($x, $y + $h - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()
  return $path
}

$bgPath = New-RoundedRectPath 2 2 ($width - 4) ($height - 4) 18
$bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#fffdf9"))
$borderPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#eadfce"), 1)
$graphics.FillPath($bgBrush, $bgPath)
$graphics.DrawPath($borderPen, $bgPath)

$markBoxPath = New-RoundedRectPath 10 10 50 50 14
$markBoxBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#fbf6ee"))
$markBoxPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#eadfce"), 1)
$graphics.FillPath($markBoxBrush, $markBoxPath)
$graphics.DrawPath($markBoxPen, $markBoxPath)

$markImage = [System.Drawing.Image]::FromFile($markPath)
$markTarget = New-Object System.Drawing.RectangleF(22, 22, 26, 26)
$graphics.DrawImage($markImage, $markTarget)

$fontFamily = New-Object System.Drawing.FontFamily("Segoe UI")
$startFont = New-Object System.Drawing.Font($fontFamily, 19, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$flowFont = New-Object System.Drawing.Font($fontFamily, 19, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$startBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#2f2b27"))
$flowGradient = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  (New-Object System.Drawing.PointF(130, 0)),
  (New-Object System.Drawing.PointF(220, 0)),
  ([System.Drawing.ColorTranslator]::FromHtml("#e5d0ab")),
  ([System.Drawing.ColorTranslator]::FromHtml("#c9a765"))
)

$format = New-Object System.Drawing.StringFormat
$format.Alignment = [System.Drawing.StringAlignment]::Near
$format.LineAlignment = [System.Drawing.StringAlignment]::Center

$wordmarkY = 19
$startText = "Start"
$flowText = "Flow"

$startLayout = New-Object System.Drawing.RectangleF(74, $wordmarkY, 80, 32)
$graphics.DrawString($startText, $startFont, $startBrush, $startLayout, $format)

$startWidth = $graphics.MeasureString($startText, $startFont).Width
$flowLayout = New-Object System.Drawing.RectangleF((74 + $startWidth - 8), $wordmarkY, 90, 32)
$graphics.DrawString($flowText, $flowFont, $flowGradient, $flowLayout, $format)

$subBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#6b5b4a"))
$subFont = New-Object System.Drawing.Font($fontFamily, 10.1, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$graphics.DrawString(
  "Business setup, made simple",
  $subFont,
  $subBrush,
  (New-Object System.Drawing.RectangleF(76, 40, 180, 16)),
  $format
)

$bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$subFont.Dispose()
$subBrush.Dispose()
$flowGradient.Dispose()
$startBrush.Dispose()
$startFont.Dispose()
$flowFont.Dispose()
$fontFamily.Dispose()
$markImage.Dispose()
$markBoxBrush.Dispose()
$markBoxPen.Dispose()
$bgBrush.Dispose()
$borderPen.Dispose()
$bgPath.Dispose()
$markBoxPath.Dispose()
$graphics.Dispose()
$bitmap.Dispose()
