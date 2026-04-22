Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

function New-RoundedRectPath {
  param(
    [float]$X,
    [float]$Y,
    [float]$Width,
    [float]$Height,
    [float]$Radius
  )

  $diameter = $Radius * 2
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddArc($X, $Y, $diameter, $diameter, 180, 90)
  $path.AddArc($X + $Width - $diameter, $Y, $diameter, $diameter, 270, 90)
  $path.AddArc($X + $Width - $diameter, $Y + $Height - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($X, $Y + $Height - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()
  return $path
}

function Draw-GradientText {
  param(
    [System.Drawing.Graphics]$Graphics,
    [string]$Text,
    [System.Drawing.Font]$Font,
    [float]$X,
    [float]$Y,
    [string]$StartColor,
    [string]$EndColor
  )

  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddString(
    $Text,
    $Font.FontFamily,
    [int]$Font.Style,
    $Font.Size,
    [System.Drawing.PointF]::new($X, $Y),
    [System.Drawing.StringFormat]::GenericTypographic
  )

  $bounds = $path.GetBounds()
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    [System.Drawing.PointF]::new($bounds.Left, $bounds.Top),
    [System.Drawing.PointF]::new($bounds.Right, $bounds.Top),
    [System.Drawing.ColorTranslator]::FromHtml($StartColor),
    [System.Drawing.ColorTranslator]::FromHtml($EndColor)
  )

  $Graphics.FillPath($brush, $path)
  $brush.Dispose()
  $path.Dispose()
}

function Get-TintedBitmap {
  param(
    [System.Drawing.Image]$Source,
    [string]$HexColor
  )

  $target = [System.Drawing.ColorTranslator]::FromHtml($HexColor)
  $sourceBitmap = [System.Drawing.Bitmap]$Source
  $tinted = New-Object System.Drawing.Bitmap($sourceBitmap.Width, $sourceBitmap.Height)

  for ($x = 0; $x -lt $sourceBitmap.Width; $x++) {
    for ($y = 0; $y -lt $sourceBitmap.Height; $y++) {
      $pixel = $sourceBitmap.GetPixel($x, $y)

      if ($pixel.A -eq 0) {
        $tinted.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        continue
      }

      $tinted.SetPixel(
        $x,
        $y,
        [System.Drawing.Color]::FromArgb($pixel.A, $target.R, $target.G, $target.B)
      )
    }
  }

  return $tinted
}

$root = Split-Path -Parent $PSScriptRoot
$publicDir = Join-Path $root "public"
$outputPath = Join-Path $publicDir "startflow-share-card-v2.png"
$logoPath = Join-Path $publicDir "startflow-logo-mark.png"

$width = 1200
$height = 630

$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$backgroundBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  [System.Drawing.Point]::new(0, 0),
  [System.Drawing.Point]::new(0, $height),
  [System.Drawing.ColorTranslator]::FromHtml("#fffdf9"),
  [System.Drawing.ColorTranslator]::FromHtml("#f7f0e3")
)
$graphics.FillRectangle($backgroundBrush, 0, 0, $width, $height)

$glowBrushLeft = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(44, 229, 210, 175))
$glowBrushRight = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(52, 244, 232, 212))
$graphics.FillEllipse($glowBrushLeft, -70, -80, 430, 360)
$graphics.FillEllipse($glowBrushRight, 810, 380, 360, 220)

$panelPath = New-RoundedRectPath -X 108 -Y 120 -Width 254 -Height 254 -Radius 56
$panelBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  [System.Drawing.Point]::new(0, 120),
  [System.Drawing.Point]::new(0, 374),
  [System.Drawing.ColorTranslator]::FromHtml("#fffaf1"),
  [System.Drawing.ColorTranslator]::FromHtml("#f7efdf")
)
$panelBorderPen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#e8dbc3"), 6)
$graphics.FillPath($panelBrush, $panelPath)
$graphics.DrawPath($panelBorderPen, $panelPath)

$logo = [System.Drawing.Image]::FromFile($logoPath)
$tintedLogo = Get-TintedBitmap -Source $logo -HexColor "#9d7440"
$logoMaxWidth = 164.0
$logoMaxHeight = 128.0
$logoScale = [Math]::Min($logoMaxWidth / $tintedLogo.Width, $logoMaxHeight / $tintedLogo.Height)
$logoDrawWidth = [int][Math]::Round($tintedLogo.Width * $logoScale)
$logoDrawHeight = [int][Math]::Round($tintedLogo.Height * $logoScale)
$logoDrawX = 108 + [int][Math]::Round((254 - $logoDrawWidth) / 2)
$logoDrawY = 120 + [int][Math]::Round((254 - $logoDrawHeight) / 2)
$graphics.DrawImage($tintedLogo, $logoDrawX, $logoDrawY, $logoDrawWidth, $logoDrawHeight)

$eyebrowFont = New-Object System.Drawing.Font("Segoe UI", 24, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$wordmarkFont = New-Object System.Drawing.Font("Segoe UI", 74, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$headlineFont = New-Object System.Drawing.Font("Segoe UI", 34, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$goldBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#9d6f29"))
$darkBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#2f2b27"))
$accentBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#e7d4ae"))

$format = [System.Drawing.StringFormat]::GenericTypographic
$format.FormatFlags = [System.Drawing.StringFormatFlags]::NoClip

$graphics.DrawString("BEGINNER-FRIENDLY BUSINESS SETUP", $eyebrowFont, $goldBrush, 434, 132, $format)
$graphics.FillRectangle($accentBrush, 434, 174, 176, 4)

$startX = 434
$wordmarkY = 206
$graphics.DrawString("Start", $wordmarkFont, $darkBrush, $startX, $wordmarkY, $format)
$startSize = $graphics.MeasureString("Start", $wordmarkFont, 1000, $format)
$flowX = $startX + $startSize.Width - 12
Draw-GradientText -Graphics $graphics -Text "Flow" -Font $wordmarkFont -X $flowX -Y $wordmarkY -StartColor "#e5d0ab" -EndColor "#c9a765"

$headlineRect = [System.Drawing.RectangleF]::new(434, 314, 650, 96)

$graphics.DrawString(
  "Build your business with clarity - not confusion.",
  $headlineFont,
  $darkBrush,
  $headlineRect
)

$bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$tintedLogo.Dispose()
$logo.Dispose()
$accentBrush.Dispose()
$darkBrush.Dispose()
$goldBrush.Dispose()
$headlineFont.Dispose()
$wordmarkFont.Dispose()
$eyebrowFont.Dispose()
$panelBorderPen.Dispose()
$panelBrush.Dispose()
$panelPath.Dispose()
$glowBrushRight.Dispose()
$glowBrushLeft.Dispose()
$backgroundBrush.Dispose()
$graphics.Dispose()
$bitmap.Dispose()
