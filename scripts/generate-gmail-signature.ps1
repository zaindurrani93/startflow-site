Add-Type -AssemblyName System.Drawing

$root = "C:\Users\Ramsha\Documents\StartFlow Business"
$publicDir = Join-Path $root "public"
$sourcePath = Join-Path $publicDir "StartFlow-logo-email.png"
$outputPath = Join-Path $publicDir "startflow-gmail-signature.png"

if (-not (Test-Path $sourcePath)) {
  throw "Source image not found: $sourcePath"
}

$targetWidth = 360
$padding = 8
$alphaThreshold = 8

$sourceImage = [System.Drawing.Image]::FromFile($sourcePath)
$sourceBitmap = New-Object System.Drawing.Bitmap($sourceImage.Width, $sourceImage.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$sourceGraphics = [System.Drawing.Graphics]::FromImage($sourceBitmap)
$sourceGraphics.Clear([System.Drawing.Color]::Transparent)
$sourceGraphics.DrawImage($sourceImage, 0, 0, $sourceImage.Width, $sourceImage.Height)
$sourceGraphics.Dispose()
$sourceImage.Dispose()

for ($y = 0; $y -lt $sourceBitmap.Height; $y++) {
  for ($x = 0; $x -lt $sourceBitmap.Width; $x++) {
    $pixel = $sourceBitmap.GetPixel($x, $y)
    $isNeutral = ([Math]::Abs($pixel.R - $pixel.G) -le 2) -and ([Math]::Abs($pixel.G - $pixel.B) -le 2)
    if ($isNeutral -and $pixel.R -ge 248) {
      $sourceBitmap.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, $pixel.R, $pixel.G, $pixel.B))
    }
  }
}

$minX = $sourceBitmap.Width
$minY = $sourceBitmap.Height
$maxX = -1
$maxY = -1

for ($y = 0; $y -lt $sourceBitmap.Height; $y++) {
  for ($x = 0; $x -lt $sourceBitmap.Width; $x++) {
    $pixel = $sourceBitmap.GetPixel($x, $y)
    if ($pixel.A -gt $alphaThreshold) {
      if ($x -lt $minX) { $minX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}

if ($maxX -lt 0 -or $maxY -lt 0) {
  throw "No visible pixels found in source image."
}

$cropX = [Math]::Max(0, $minX - $padding)
$cropY = [Math]::Max(0, $minY - $padding)
$cropWidth = [Math]::Min($sourceBitmap.Width - $cropX, ($maxX - $minX + 1) + ($padding * 2))
$cropHeight = [Math]::Min($sourceBitmap.Height - $cropY, ($maxY - $minY + 1) + ($padding * 2))

$targetHeight = [int][Math]::Round(($cropHeight / [double]$cropWidth) * $targetWidth)

$outputBitmap = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($outputBitmap)
$graphics.Clear([System.Drawing.Color]::Transparent)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$graphics.DrawImage(
  $sourceBitmap,
  (New-Object System.Drawing.Rectangle(0, 0, $targetWidth, $targetHeight)),
  (New-Object System.Drawing.Rectangle($cropX, $cropY, $cropWidth, $cropHeight)),
  [System.Drawing.GraphicsUnit]::Pixel
)

for ($y = 0; $y -lt $outputBitmap.Height; $y++) {
  for ($x = 0; $x -lt $outputBitmap.Width; $x++) {
    $pixel = $outputBitmap.GetPixel($x, $y)
    $isNeutral = ([Math]::Abs($pixel.R - $pixel.G) -le 2) -and ([Math]::Abs($pixel.G - $pixel.B) -le 2)
    if ($pixel.A -gt 0 -and $isNeutral -and $pixel.R -ge 248) {
      $outputBitmap.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, $pixel.R, $pixel.G, $pixel.B))
    }
  }
}

for ($pass = 0; $pass -lt 2; $pass++) {
  $removePoints = New-Object 'System.Collections.Generic.List[System.Drawing.Point]'

  for ($y = 1; $y -lt ($outputBitmap.Height - 1); $y++) {
    for ($x = 1; $x -lt ($outputBitmap.Width - 1); $x++) {
      $pixel = $outputBitmap.GetPixel($x, $y)
      if ($pixel.A -le $alphaThreshold) {
        continue
      }

      $neighborCount = 0
      for ($ny = -1; $ny -le 1; $ny++) {
        for ($nx = -1; $nx -le 1; $nx++) {
          if ($nx -eq 0 -and $ny -eq 0) {
            continue
          }

          $neighbor = $outputBitmap.GetPixel($x + $nx, $y + $ny)
          if ($neighbor.A -gt $alphaThreshold) {
            $neighborCount++
          }
        }
      }

      if ($neighborCount -le 1) {
        $removePoints.Add((New-Object System.Drawing.Point($x, $y)))
      }
    }
  }

  foreach ($point in $removePoints) {
    $outputBitmap.SetPixel($point.X, $point.Y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
  }
}

$finalMinX = $outputBitmap.Width
$finalMinY = $outputBitmap.Height
$finalMaxX = -1
$finalMaxY = -1
$rowThreshold = 8
$columnThreshold = 8

for ($y = 0; $y -lt $outputBitmap.Height; $y++) {
  $rowCount = 0
  for ($x = 0; $x -lt $outputBitmap.Width; $x++) {
    $pixel = $outputBitmap.GetPixel($x, $y)
    if ($pixel.A -gt $alphaThreshold) {
      $rowCount++
    }
  }

  if ($rowCount -ge $rowThreshold) {
    if ($y -lt $finalMinY) { $finalMinY = $y }
    if ($y -gt $finalMaxY) { $finalMaxY = $y }
  }
}

for ($x = 0; $x -lt $outputBitmap.Width; $x++) {
  $columnCount = 0
  for ($y = 0; $y -lt $outputBitmap.Height; $y++) {
    $pixel = $outputBitmap.GetPixel($x, $y)
    if ($pixel.A -gt $alphaThreshold) {
      $columnCount++
    }
  }

  if ($columnCount -ge $columnThreshold) {
    if ($x -lt $finalMinX) { $finalMinX = $x }
    if ($x -gt $finalMaxX) { $finalMaxX = $x }
  }
}

if ($finalMaxX -ge 0 -and $finalMaxY -ge 0) {
  $finalPadding = 4
  $trimX = [Math]::Max(0, $finalMinX - $finalPadding)
  $trimY = [Math]::Max(0, $finalMinY - $finalPadding)
  $trimWidth = [Math]::Min($outputBitmap.Width - $trimX, ($finalMaxX - $finalMinX + 1) + ($finalPadding * 2))
  $trimHeight = [Math]::Min($outputBitmap.Height - $trimY, ($finalMaxY - $finalMinY + 1) + ($finalPadding * 2))

  $trimmedBitmap = New-Object System.Drawing.Bitmap($trimWidth, $trimHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $trimmedGraphics = [System.Drawing.Graphics]::FromImage($trimmedBitmap)
  $trimmedGraphics.Clear([System.Drawing.Color]::Transparent)
  $trimmedGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $trimmedGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $trimmedGraphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $trimmedGraphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $trimmedGraphics.DrawImage(
    $outputBitmap,
    (New-Object System.Drawing.Rectangle(0, 0, $trimWidth, $trimHeight)),
    (New-Object System.Drawing.Rectangle($trimX, $trimY, $trimWidth, $trimHeight)),
    [System.Drawing.GraphicsUnit]::Pixel
  )

  $trimmedBitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $trimmedGraphics.Dispose()
  $trimmedBitmap.Dispose()
} else {
  $outputBitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
}

$graphics.Dispose()
$outputBitmap.Dispose()
$sourceBitmap.Dispose()
