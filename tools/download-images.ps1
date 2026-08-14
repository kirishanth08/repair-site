param(
  [switch]$Clean
)

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$root = Split-Path -Parent $PSScriptRoot
$imgDir = Join-Path $root 'assets\img'
$reviewsDir = Join-Path $imgDir 'reviews'
$adminDir = Join-Path $imgDir 'admin'
New-Item -ItemType Directory -Force -Path $adminDir | Out-Null

function Pexels($id, $w) {
  return "https://images.pexels.com/photos/$id/pexels-photo-$id.jpeg?auto=compress&cs=tinysrgb&w=$w"
}

# name -> url
$map = [ordered]@{}

# ---- hero / about / turnaround (w=1600) ----
$map['hero1.jpg'] = Pexels 6755075 1600
$map['hero2.jpg'] = Pexels 33531806 1600
$map['about.jpg'] = Pexels 31869847 1600
$map['about-home.jpg'] = Pexels 12741849 1600
$map['turnaround.jpg'] = Pexels 37258057 1600

# ---- service cards (w=1600) ----
$map['srv-screen.jpg'] = 'https://images.pexels.com/photos/1388947/technology-telephone-mobile-smart-1388947.jpeg?auto=compress&cs=tinysrgb&w=1600'
$map['srv-battery.jpg'] = Pexels 719399 1600
$map['srv-port.jpg'] = Pexels 4219866 1600
$map['srv-board.jpg'] = Pexels 38145576 1600
$map['srv-water.jpg'] = Pexels 8481921 1600
$map['srv-camera.jpg'] = Pexels 5587333 1600
$map['srv-laptop.jpg'] = Pexels 7639374 1600
$map['srv-console.jpg'] = Pexels 7773745 1600
$map['srv-data.jpg'] = Pexels 32892856 1600
$map['srv-home.jpg'] = Pexels 37492292 1600

# ---- service-details (w=1600) ----
$map['sd-screen.jpg'] = Pexels 11921157 1600
$map['sd-battery.jpg'] = Pexels 1028674 1600
$map['sd-port.jpg'] = Pexels 4195333 1600
$map['sd-board.jpg'] = Pexels 2628105 1600
$map['sd-water.jpg'] = Pexels 8481931 1600
$map['sd-camera.jpg'] = Pexels 12738910 1600
$map['sd-laptop.jpg'] = Pexels 16385070 1600
$map['sd-console.jpg'] = Pexels 4714924 1600
$map['sd-data.jpg'] = Pexels 18734876 1600
$map['sd-home.jpg'] = Pexels 32208771 1600

# ---- blog cards (w=1600) ----
$map['blog-1.jpg'] = Pexels 10366330 1600
$map['blog-2.jpg'] = Pexels 28380001 1600
$map['blog-3.jpg'] = Pexels 8481972 1600
$map['blog-4.jpg'] = Pexels 7047323 1600
$map['blog-5.jpg'] = Pexels 2036656 1600
$map['blog-6.jpg'] = Pexels 288479 1600

# ---- blog-details featured (w=1600) ----
$map['bd-1.jpg'] = Pexels 37475677 1600
$map['bd-2.jpg'] = Pexels 15554492 1600

# ---- blog sidebar thumbs (w=800) ----
$map['side-1.jpg'] = Pexels 5475752 800
$map['side-2.jpg'] = Pexels 8481936 800
$map['side-3.jpg'] = Pexels 12006804 800
$map['side-4.jpg'] = Pexels 3272280 800
$map['side-5.jpg'] = Pexels 5483240 800
$map['side-6.jpg'] = Pexels 8481951 800
$map['side-7.jpg'] = Pexels 5961044 800
$map['side-8.jpg'] = Pexels 5380792 800

# ---- gallery (w=1600) ----
$map['gal-1.jpg'] = Pexels 31862953 1600
$map['gal-2.jpg'] = Pexels 10558598 1600
$map['gal-3.jpg'] = Pexels 31862950 1600
$map['gal-4.jpg'] = Pexels 9242280 1600
$map['gal-5.jpg'] = Pexels 7286009 1600
$map['gal-6.jpg'] = Pexels 12738912 1600

# ---- banners (w=1600) ----
$map['banner-1.jpg'] = Pexels 6755053 1600
$map['banner-2.jpg'] = Pexels 270572 1600

# ---- portraits (w=600) ----
$map['team-1.jpg'] = 'https://randomuser.me/api/portraits/men/1.jpg'
$map['team-2.jpg'] = 'https://randomuser.me/api/portraits/women/2.jpg'
$map['team-3.jpg'] = 'https://randomuser.me/api/portraits/men/3.jpg'
$map['team-4.jpg'] = 'https://randomuser.me/api/portraits/women/4.jpg'
$map['reviews\emma-lewis.jpg'] = 'https://randomuser.me/api/portraits/women/6.jpg'
$map['reviews\marcus-lee.jpg'] = 'https://randomuser.me/api/portraits/men/5.jpg'
$map['reviews\hannah-park.jpg'] = 'https://randomuser.me/api/portraits/women/8.jpg'
$map['reviews\omar-farouk.jpg'] = 'https://randomuser.me/api/portraits/men/7.jpg'
$map['reviews\grace-liu.jpg'] = 'https://randomuser.me/api/portraits/women/10.jpg'
$map['reviews\david-stone.jpg'] = 'https://randomuser.me/api/portraits/men/9.jpg'
$map['reviews\laura-kim.jpg'] = 'https://randomuser.me/api/portraits/women/12.jpg'
$map['reviews\ava-moore.jpg'] = 'https://randomuser.me/api/portraits/women/14.jpg'
$map['reviews\fatima-haddad.jpg'] = 'https://randomuser.me/api/portraits/women/16.jpg'
$map['reviews\sarah-mitchell.jpg'] = 'https://randomuser.me/api/portraits/women/18.jpg'
$map['admin\av-1.jpg'] = 'https://randomuser.me/api/portraits/women/20.jpg'
$map['admin\av-2.jpg'] = 'https://randomuser.me/api/portraits/men/11.jpg'
$map['admin\av-3.jpg'] = 'https://randomuser.me/api/portraits/women/22.jpg'
$map['admin\av-4.jpg'] = 'https://randomuser.me/api/portraits/men/13.jpg'
$map['admin\av-5.jpg'] = 'https://randomuser.me/api/portraits/women/24.jpg'
$map['admin\av-6.jpg'] = 'https://randomuser.me/api/portraits/women/26.jpg'
$map['admin\av-7.jpg'] = 'https://randomuser.me/api/portraits/men/15.jpg'
$map['admin\av-8.jpg'] = 'https://randomuser.me/api/portraits/women/28.jpg'
$map['admin\av-9.jpg'] = 'https://randomuser.me/api/portraits/women/30.jpg'

$ok = 0; $fail = 0
foreach ($k in $map.Keys) {
  $dest = Join-Path $imgDir $k
  if (-not $Clean -and (Test-Path -LiteralPath $dest)) { $ok++; continue }
  try {
    Invoke-WebRequest -Uri $map[$k] -OutFile $dest -UseBasicParsing -TimeoutSec 60
    $len = (Get-Item -LiteralPath $dest).Length
    if ($len -lt 2000) { throw "Too small ($len bytes)" }
    $ok++
    Write-Host "OK   $k ($len bytes)"
  } catch {
    $fail++
    Write-Host "FAIL $k  $($_.Exception.Message)"
    if (Test-Path -LiteralPath $dest) { Remove-Item -LiteralPath $dest -Force }
  }
  Start-Sleep -Milliseconds 250
}
Write-Host ""
Write-Host "Downloaded OK: $ok  Failed: $fail"
if ($fail -gt 0) { exit 1 }
