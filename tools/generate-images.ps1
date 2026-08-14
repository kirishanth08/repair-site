$ErrorActionPreference = 'Stop'
$imgDir = Join-Path $PSScriptRoot '..\assets\img'
$revDir = Join-Path $imgDir 'reviews'
New-Item -ItemType Directory -Force -Path $imgDir, $revDir | Out-Null

# name -> [color1, color2, shape]
$images = @{
  'logo'         = @('#A0113D', '#E8587A', 'logo')
  'hero1'        = @('#C7DBFF', '#7FAEFF', 'hero-1')
  'hero2'        = @('#BFE9F4', '#62C9E4', 'laptop')
  'about-hero'   = @('#D8C7FF', '#9B7BFF', 'bench')
  'about-1'      = @('#FFE4B8', '#F5B84A', 'chip')
  'team-1'       = @('#FFD0C2', '#F08C6A', 'portrait')
  'team-2'       = @('#BFE3F7', '#6FB4E0', 'portrait')
  'team-3'       = @('#C4E8DE', '#5FC0AE', 'portrait')
  'team-4'       = @('#FFD3DF', '#ED86A0', 'portrait')
  'srv-screen'   = @('#C9DBFF', '#7AA9FF', 'phone-crack')
  'srv-battery'  = @('#D4EFDD', '#6FCB92', 'battery')
  'srv-port'     = @('#FFE4B8', '#F3B648', 'plug')
  'srv-board'    = @('#C9E8F5', '#66BEE0', 'board')
  'srv-water'    = @('#C7E8FF', '#62B7F2', 'drop')
  'srv-camera'   = @('#D9C8FF', '#9C7BF2', 'camera')
  'srv-laptop'   = @('#BFE9F4', '#62C9E4', 'laptop')
  'srv-console'  = @('#FFD3DD', '#ED869F', 'gamepad')
  'srv-data'     = @('#D7E9FF', '#7FB4F0', 'data')
  'srv-home'     = @('#FFE9C4', '#F2C258', 'tv')
  'blog-1'       = @('#C9DBFF', '#7AA9FF', 'phone-crack')
  'blog-2'       = @('#BFE9F4', '#62C9E4', 'laptop')
  'blog-3'       = @('#D4EFDD', '#6FCB92', 'battery')
  'blog-4'       = @('#FFD3DF', '#ED869F', 'gamepad')
  'blog-5'       = @('#FFE4B8', '#F3B648', 'chip')
  'blog-6'       = @('#D9C8FF', '#9C7BF2', 'camera')
  'blog-details-1' = @('#C9DBFF', '#7AA9FF', 'bench')
  'blog-details-2' = @('#BFE9F4', '#62C9E4', 'board')
  'blog-details-3' = @('#D4EFDD', '#6FCB92', 'phone-crack')
  'gal-1'        = @('#C9DBFF', '#7AA9FF', 'phone')
  'gal-2'        = @('#BFE9F4', '#62C9E4', 'laptop')
  'gal-3'        = @('#D4EFDD', '#6FCB92', 'battery')
  'gal-4'        = @('#FFD3DF', '#ED869F', 'gamepad')
  'gal-5'        = @('#FFE4B8', '#F3B648', 'chip')
  'gal-6'        = @('#D9C8FF', '#9C7BF2', 'camera')
}

# name -> [color1, color2, shape] for review avatars
$avatars = @{
  'emma-lewis'     = @('#FFD0C2', '#F08C6A', 'avatar')
  'marcus-lee'     = @('#BFE3F7', '#6FB4E0', 'avatar')
  'hannah-park'    = @('#FFD3DF', '#ED86A0', 'avatar')
  'omar-farouk'    = @('#C4E8DE', '#5FC0AE', 'avatar')
  'grace-liu'      = @('#FFE4B8', '#F3B648', 'avatar')
  'fatima-haddad'  = @('#D9C8FF', '#9C7BF2', 'avatar')
  'david-stone'    = @('#BFE3F7', '#5C9BD4', 'avatar')
  'laura-kim'      = @('#FFD3DF', '#E86F8C', 'avatar')
  'ava-moore'      = @('#C4E8DE', '#54B6A2', 'avatar')
  'sarah-mitchell' = @('#FFD0C2', '#E57F5C', 'avatar')
}

function Get-Shape {
  param([string]$id, [string]$kind)
  switch ($kind) {
    'logo' {
      return @"
<g>
  <rect x="285" y="235" width="230" height="250" rx="60" fill="rgba(255,255,255,0.92)" transform="rotate(-8 400 360)"/>
  <path d="M440 130 L300 385 L385 385 L360 590 L520 355 L430 355 Z" fill="rgba(255,255,255,0.95)"/>
</g>
"@
    }
    'phone' {
      return @"
<g fill="rgba(255,255,255,0.9)">
  <rect x="300" y="120" width="200" height="380" rx="34"/>
  <rect x="320" y="150" width="160" height="300" rx="12" fill="rgba(40,80,160,0.25)"/>
  <circle cx="400" cy="120" r="12" fill="rgba(255,255,255,0.9)"/>
  <rect x="368" y="520" width="64" height="10" rx="5"/>
</g>
"@
    }
    'phone-crack' {
      return @"
<g fill="rgba(255,255,255,0.9)">
  <rect x="300" y="110" width="200" height="400" rx="36"/>
  <rect x="320" y="135" width="160" height="330" rx="12" fill="rgba(255,255,255,0.35)"/>
  <circle cx="400" cy="108" r="12"/>
</g>
<g fill="none" stroke="rgba(120,160,255,0.85)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
  <path d="M330 170 L410 300 L360 400 L455 500"/>
  <path d="M410 300 L470 240"/>
  <path d="M360 400 L300 460"/>
</g>
"@
    }
    'laptop' {
      return @"
<g fill="rgba(255,255,255,0.9)">
  <rect x="150" y="180" width="500" height="300" rx="16"/>
  <rect x="180" y="210" width="440" height="240" rx="8" fill="rgba(40,80,160,0.25)"/>
  <path d="M80 520 L720 520 L660 600 L140 600 Z"/>
</g>
<g fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="10" stroke-linecap="round">
  <path d="M230 250 Q330 320 430 250"/>
  <path d="M470 250 Q530 285 590 250"/>
</g>
"@
    }
    'battery' {
      return @"
<g fill="rgba(255,255,255,0.9)">
  <rect x="240" y="230" width="330" height="200" rx="34"/>
  <rect x="560" y="290" width="40" height="80" rx="10"/>
  <rect x="275" y="265" width="230" height="130" rx="18" fill="rgba(40,80,160,0.3)"/>
</g>
<path d="M275 265 L430 380 L350 380 L400 470 L540 310 L440 310 L480 265 Z" fill="rgba(255,255,255,0.85)"/>
"@
    }
    'plug' {
      return @"
<g fill="rgba(255,255,255,0.9)">
  <rect x="300" y="120" width="200" height="70" rx="16"/>
  <rect x="330" y="190" width="140" height="180" rx="10"/>
  <rect x="310" y="370" width="40" height="70" rx="8"/>
  <rect x="450" y="370" width="40" height="70" rx="8"/>
  <circle cx="470" cy="150" r="26"/>
</g>
<path d="M360 250 Q330 320 370 380" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="12" stroke-linecap="round"/>
"@
    }
    'board' {
      return @"
<g fill="rgba(255,255,255,0.9)">
  <rect x="170" y="150" width="460" height="380" rx="24"/>
</g>
<g fill="rgba(40,80,160,0.28)">
  <rect x="300" y="240" width="200" height="200" rx="16"/>
  <rect x="210" y="190" width="60" height="60" rx="8"/>
  <rect x="530" y="190" width="60" height="60" rx="8"/>
  <rect x="210" y="430" width="60" height="60" rx="8"/>
  <rect x="530" y="430" width="60" height="60" rx="8"/>
</g>
<g fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="9" stroke-linecap="round">
  <path d="M270 220 L300 240"/>
  <path d="M500 240 L530 220"/>
  <path d="M270 460 L300 440"/>
  <path d="M500 440 L530 460"/>
  <path d="M400 220 L400 240"/>
  <path d="M400 440 L400 460"/>
</g>
<circle cx="400" cy="340" r="40" fill="rgba(40,80,160,0.35)"/>
"@
    }
    'drop' {
      return @"
<path d="M400 120 C 500 260 540 340 540 430 A 140 140 0 0 1 260 430 C 260 340 300 260 400 120 Z" fill="rgba(255,255,255,0.92)"/>
<path d="M400 210 C 460 300 490 350 490 405 A 90 90 0 0 1 310 405 C 310 350 340 300 400 210 Z" fill="rgba(80,170,255,0.4)"/>
"@
    }
    'camera' {
      return @"
<g fill="rgba(255,255,255,0.9)">
  <rect x="150" y="240" width="500" height="250" rx="40"/>
  <path d="M280 200 L320 150 L480 150 L520 200 Z"/>
  <circle cx="400" cy="360" r="90"/>
</g>
<circle cx="400" cy="360" r="52" fill="rgba(40,80,160,0.35)"/>
<circle cx="590" cy="300" r="18" fill="rgba(255,255,255,0.95)"/>
"@
    }
    'gamepad' {
      return @"
<g fill="rgba(255,255,255,0.92)">
  <rect x="160" y="280" width="480" height="150" rx="75"/>
  <rect x="160" y="300" width="480" height="60" rx="30"/>
  <path d="M290 360 v70 M250 395 h80 M530 360 v70 M490 395 h80" stroke="rgba(40,80,160,0.35)" stroke-width="22" fill="none" stroke-linecap="round"/>
</g>
<circle cx="360" cy="330" r="26" fill="rgba(40,80,160,0.35)"/>
<circle cx="470" cy="330" r="26" fill="rgba(255,255,255,0.55)"/>
"@
    }
    'data' {
      return @"
<g fill="rgba(255,255,255,0.9)">
  <ellipse cx="400" cy="180" rx="220" ry="70"/>
  <path d="M180 180 v240 a220 70 0 0 0 440 0 V180 a220 70 0 0 1 -440 0 Z" opacity="0.85"/>
  <path d="M180 300 a220 70 0 0 0 440 0" fill="none" stroke="rgba(40,80,160,0.35)" stroke-width="10"/>
  <ellipse cx="400" cy="180" rx="80" ry="26" fill="rgba(40,80,160,0.3)"/>
</g>
"@
    }
    'tv' {
      return @"
<g fill="rgba(255,255,255,0.9)">
  <rect x="140" y="150" width="520" height="330" rx="26"/>
  <rect x="170" y="180" width="460" height="270" rx="12" fill="rgba(40,80,160,0.28)"/>
  <rect x="380" y="480" width="40" height="50"/>
  <rect x="300" y="530" width="200" height="24" rx="12"/>
</g>
"@
    }
    'chip' {
      return @"
<g fill="rgba(255,255,255,0.9)">
  <rect x="260" y="190" width="280" height="280" rx="24"/>
  <rect x="340" y="290" width="120" height="120" rx="10" fill="rgba(40,80,160,0.35)"/>
</g>
<g fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="14" stroke-linecap="round">
  <path d="M300 190 v-50 M340 190 v-50 M380 190 v-50 M420 190 v-50 M460 190 v-50 M500 190 v-50"/>
  <path d="M300 470 v50 M340 470 v50 M380 470 v50 M420 470 v50 M460 470 v50 M500 470 v50"/>
  <path d="M260 240 h-50 M260 290 h-50 M260 340 h-50 M260 390 h-50"/>
  <path d="M540 240 h50 M540 290 h50 M540 340 h50 M540 390 h50"/>
</g>
"@
    }
    'bench' {
      return @"
<g fill="rgba(255,255,255,0.9)">
  <rect x="120" y="460" width="560" height="40" rx="16"/>
  <rect x="200" y="150" width="140" height="320" rx="18"/>
  <rect x="460" y="180" width="160" height="290" rx="14"/>
  <circle cx="470" cy="150" r="14"/>
</g>
<g fill="rgba(40,80,160,0.3)">
  <rect x="220" y="180" width="100" height="230" rx="8"/>
  <rect x="480" y="210" width="120" height="190" rx="8"/>
</g>
<g fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="8" stroke-linecap="round">
  <path d="M370 200 Q410 260 380 320 Q410 380 380 430"/>
</g>
"@
    }
    'portrait' {
      return @"
<g fill="rgba(255,255,255,0.9)">
  <circle cx="400" cy="260" r="120"/>
  <path d="M240,560 Q300,420 400,420 Q500,420 560,560 Z"/>
</g>
<g fill="rgba(255,255,255,0.55)">
  <circle cx="240" cy="560" r="46"/>
  <circle cx="560" cy="560" r="46"/>
  <circle cx="400" cy="600" r="52"/>
</g>
"@
    }
    'avatar' {
      return @"
<g fill="rgba(255,255,255,0.9)">
  <circle cx="400" cy="285" r="125"/>
  <path d="M250,560 Q300,430 400,430 Q500,430 550,560 Z"/>
</g>
"@
    }
    'hero-1' {
      return @"
<g fill="rgba(255,255,255,0.95)">
  <rect x="470" y="100" width="220" height="380" rx="40"/>
  <rect x="492" y="130" width="176" height="300" rx="16" fill="rgba(40,80,160,0.3)"/>
  <circle cx="580" cy="96" r="14"/>
  <rect x="120" y="300" width="180" height="240" rx="22"/>
  <rect x="138" y="324" width="144" height="180" rx="10" fill="rgba(40,80,160,0.3)"/>
  <circle cx="220" cy="296" r="10"/>
</g>
<g fill="rgba(255,255,255,0.9)">
  <rect x="60" y="130" width="320" height="200" rx="14"/>
  <rect x="82" y="150" width="276" height="160" rx="8" fill="rgba(40,80,160,0.3)"/>
  <path d="M20 400 L420 400 L380 460 L60 460 Z"/>
</g>
<g fill="none" stroke="rgba(40,80,160,0.3)" stroke-width="14" stroke-linecap="round">
  <path d="M360 300 q40 60 80 0"/>
  <path d="M260 310 q40 60 80 0"/>
</g>
"@
    }
    default { return '' }
  }
}

function New-Image {
  param([string]$name, [string[]]$c, [string]$shape, [string]$label, [int]$w = 800, [int]$h = 600)
  $shapeSvg = Get-Shape -id $name -kind $shape
  $svg = @"
<svg xmlns="http://www.w3.org/2000/svg" width="$w" height="$h" viewBox="0 0 $w $h" role="img" aria-label="$name placeholder">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="$($c[0])"/>
      <stop offset="1" stop-color="$($c[1])"/>
    </linearGradient>
  </defs>
  <rect width="$w" height="$h" fill="url(#bg)"/>
  <g opacity="0.18">
    <circle cx="0" cy="0" r="260" fill="#ffffff"/>
    <circle cx="$w" cy="$h" r="300" fill="#ffffff"/>
  </g>
  <g opacity="0.12" fill="none" stroke="#ffffff" stroke-width="3">
    <path d="M0 60 H800 M0 120 H800 M0 180 H800 M0 240 H800 M0 300 H800 M0 360 H800 M0 420 H800 M0 480 H800 M0 540 H800"/>
    <path d="M60 0 V600 M120 0 V600 M180 0 V600 M240 0 V600 M300 0 V600 M360 0 V600 M420 0 V600 M480 0 V600 M540 0 V600 M600 0 V600 M660 0 V600 M720 0 V600"/>
  </g>
  $shapeSvg
  <text x="400" y="575" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="20" font-weight="700" letter-spacing="2" fill="rgba(255,255,255,0.85)">VOLTIX - PLACEHOLDER</text>
</svg>
"@
  Set-Content -Path (Join-Path $imgDir "$name.svg") -Value $svg -Encoding UTF8
  Write-Host "Created $name.svg"
}

function New-Avatar {
  param([string]$name, [string[]]$c)
  $shapeSvg = Get-Shape -id $name -kind 'avatar'
  $svg = @"
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 800 800" role="img" aria-label="$name avatar placeholder">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="$($c[0])"/>
      <stop offset="1" stop-color="$($c[1])"/>
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="url(#bg)"/>
  $shapeSvg
</svg>
"@
  Set-Content -Path (Join-Path $revDir "$name.svg") -Value $svg -Encoding UTF8
  Write-Host "Created reviews/$name.svg"
}

# Banner (page header background) - wide circuit pattern
$banner = @"
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="520" viewBox="0 0 1400 520" role="img" aria-label="Voltix banner background">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#A0113D"/>
      <stop offset="1" stop-color="#E8587A"/>
    </linearGradient>
  </defs>
  <rect width="1400" height="520" fill="url(#bg)"/>
  <g opacity="0.10" fill="none" stroke="#ffffff" stroke-width="4">
    <path d="M0 60 H1400 M0 120 H1400 M0 180 H1400 M0 240 H1400 M0 300 H1400 M0 360 H1400 M0 420 H1400 M0 480 H1400"/>
    <path d="M70 0 V520 M140 0 V520 M210 0 V520 M280 0 V520 M350 0 V520 M420 0 V520 M490 0 V520 M560 0 V520 M630 0 V520 M700 0 V520 M770 0 V520 M840 0 V520 M910 0 V520 M980 0 V520 M1050 0 V520 M1120 0 V520 M1190 0 V520 M1260 0 V520 M1330 0 V520"/>
  </g>
  <g fill="#ffffff" opacity="0.16">
    <circle cx="150" cy="90" r="70"/>
    <circle cx="1250" cy="120" r="90"/>
    <circle cx="1150" cy="430" r="60"/>
    <circle cx="260" cy="440" r="80"/>
  </g>
  <path d="M1080 60 L1240 260 L1180 260 L1300 460 L1100 460 L1120 300 L1030 300 Z" fill="rgba(255,255,255,0.28)"/>
</svg>
"@
Set-Content -Path (Join-Path $imgDir 'banner.svg') -Value $banner -Encoding UTF8
Write-Host 'Created banner.svg'

foreach ($name in $images.Keys) {
  $c = $images[$name]
  New-Image -name $name -c $c -shape $c[2] -label $name
}

foreach ($name in $avatars.Keys) {
  $c = $avatars[$name]
  New-Avatar -name $name -c $c
}

Write-Host "Done: $($images.Count) images + $($avatars.Count) avatars"
