/* ==========================================================================
   VOLTIX — Blog Details (per-post rendering)
   Renders the selected article from a ?post=<slug> query param. Defaults to
   the battery article when no (or an unknown) slug is provided.
   Load AFTER js/main.js.
   ========================================================================== */

(function () {
  'use strict';

  var POSTS = {
    'battery-drain': {
      title: 'Why your battery drains fast and how to fix it',
      tag: 'Batteries',
      author: 'Liam Carter',
      date: 'Aug 04, 2026',
      read: '6 min read',
      hero: 'assets/img/bd-1.jpg',
      desc: 'If your phone dies by lunchtime, here is how to tell a battery problem from a settings problem — and what actually fixes it.',
      body: [
        '<p>If your phone dies by lunchtime, your first instinct is usually to blame the battery — and often you\'d be right. But a fast-draining battery isn\'t always a battery problem. Here\'s how to tell the difference, and what actually fixes it.</p>',
        '<h3 class="h5 mt-4">1. Check screen brightness and background apps first</h3>',
        '<p class="text-muted">The display is the single biggest power consumer on any phone. Crank the brightness down below 50% and check which apps are running in the background. In iOS and Android both, Settings → Battery shows exactly what\'s eating power.</p>',
        '<h3 class="h5 mt-4">2. Watch for "Battery Health" warnings</h3>',
        '<p class="text-muted">Modern phones track battery capacity. If your health is under 80%, the cell has physically aged and no setting will save you — a replacement is the honest fix. At Voltix, a high-capacity cell with health calibration starts at $59 and takes about 30 minutes.</p>',
        '<blockquote class="neu-inset rounded p-4 my-4" style="border-inline-start:4px solid var(--accent)">' +
          '<p class="mb-0 fw-bold" style="color:var(--heading)">Rule of thumb: if a battery drops below 80% health, it\'s the cell. Above that, it\'s almost always settings.</p>' +
        '</blockquote>',
        '<h3 class="h5 mt-4">3. The $0 fixes worth trying</h3>',
        '<p class="text-muted">Before paying for anything, try: lowering screen brightness and timeout, disabling always-on display, closing background apps, updating the OS, and toggling dark mode. Many of our customers cancel their booking after these alone.</p>',
        '<h3 class="h5 mt-4">4. When it\'s a laptop instead</h3>',
        '<p class="text-muted">Laptops show the same pattern, but add another suspect: runaway background processes and failing fans. If your laptop runs hot and drains fast, it might be doing heavy work invisibly. Bring it in for a free diagnosis — we\'ll check the battery health, thermal paste and drive health together.</p>',
        '<img src="assets/img/bd-2.jpg" alt="Laptop battery check" class="rounded w-100 my-4" style="aspect-ratio:16/8;object-fit:cover">',
        '<h3 class="h5 mt-4">5. Fast charging isn\'t the enemy</h3>',
        '<p class="text-muted">There\'s a myth that fast charging ruins batteries. Modern batteries manage it fine — heat is the real killer. Avoid charging under your pillow or in a hot car, and keep the phone between 20% and 80% when you can.</p>'
      ]
    },
    'laptop-slow': {
      title: '7 reasons your laptop is slow (and cheap fixes)',
      tag: 'Laptops',
      author: 'Nina Patel',
      date: 'Jul 22, 2026',
      read: '5 min read',
      hero: 'assets/img/blog-details-2.webp',
      desc: 'A sluggish laptop is rarely beyond saving. Seven common culprits, from startup bloat to a dying drive — and the cheap fixes for each.',
      body: [
        '<p>A laptop that takes forever to boot and stutters on every app feels broken, but it\'s usually one of a handful of fixable problems. Here are the seven we see most at the bench, cheapest first.</p>',
        '<h3 class="h5 mt-4">1. Too much starting with Windows</h3>',
        '<p class="text-muted">Open Task Manager → Startup and disable everything you don\'t need every boot. Most people reclaim 30–60 seconds instantly.</p>',
        '<h3 class="h5 mt-4">2. Drive nearly full (or dying)</h3>',
        '<p class="text-muted">Under 15% free space slows everything down. Better yet, if you\'re still on a mechanical hard drive, a solid-state upgrade is the single biggest speed boost a laptop can get — typically $79 fitted.</p>',
        '<h3 class="h5 mt-4">3. Background apps hogging RAM</h3>',
        '<p class="text-muted">Chat apps, updaters and browser extensions quietly eat memory. Kill what you don\'t use, and consider a RAM upgrade if 8GB is your ceiling.</p>',
        '<blockquote class="neu-inset rounded p-4 my-4" style="border-inline-start:4px solid var(--accent)">' +
          '<p class="mb-0 fw-bold" style="color:var(--heading)">In 8 out of 10 slow laptops we see, the fix is free — it\'s just bloat, updates and dust.</p>' +
        '</blockquote>',
        '<h3 class="h5 mt-4">4. Outdated drivers and OS</h3>',
        '<p class="text-muted">GPU, chipset and storage drivers get speed fixes over time. Run a full Windows/macOS update, then check the manufacturer\'s site for the rest.</p>',
        '<h3 class="h5 mt-4">5. Overheating from dust</h3>',
        '<p class="text-muted">A clogged fan forces the CPU to throttle, making even new laptops feel old. A proper thermal service — clean, new paste, fan check — restores full speed for under $59.</p>',
        '<h3 class="h5 mt-4">6. Browser overload</h3>',
        '<p class="text-muted">Hundreds of tabs and aggressive extensions are a laptop\'s worst enemy. Trim to what you actually use and keep one browser window focused.</p>',
        '<h3 class="h5 mt-4">7. Malware you don\'t know about</h3>',
        '<p class="text-muted">Mining and adware scripts run silently in the background. If none of the above fits, a malware scan is the next stop — free at Voltix with any diagnosis.</p>'
      ]
    },
    'water-rescue': {
      title: 'Phone fell in water? Do these 3 things immediately',
      tag: 'Emergency',
      author: 'Omar Farouk',
      date: 'Jul 10, 2026',
      read: '4 min read',
      hero: 'assets/img/blog-details-3.webp',
      desc: 'The first 30 minutes decide whether your phone survives a swim. Three steps to take right now — and the rice myth to ignore.',
      body: [
        '<p>Every second counts after a phone takes a dip. The difference between a $129 repair and a $1,200 replacement is usually decided in the first half hour. Here\'s exactly what to do.</p>',
        '<h3 class="h5 mt-4">1. Power it off and remove the case</h3>',
        '<p class="text-muted">Shut the phone down immediately and take the case off. Resist the urge to test if it works — power flowing through wet circuits causes the shorts that kill boards.</p>',
        '<h3 class="h5 mt-4">2. Dry the outside, skip the rice</h3>',
        '<p class="text-muted">Pat it dry with a lint-free cloth and leave it upright so ports can drain. Skip the rice trick — it does nothing for the corrosion that sets in within hours. A silica-gel tub works better, but a pro clean is best.</p>',
        '<blockquote class="neu-inset rounded p-4 my-4" style="border-inline-start:4px solid var(--accent)">' +
          '<p class="mb-0 fw-bold" style="color:var(--heading)">The biggest mistake? Plugging it in. Charging a wet phone is the fastest way to kill it.</p>' +
        '</blockquote>',
        '<h3 class="h5 mt-4">3. Don\'t charge it — bring it in</h3>',
        '<p class="text-muted">Even if it seems fine, water finds its way under chips. A professional ultrasonic clean within 24 hours removes the moisture and stops corrosion before it spreads. At Voltix, water-damage diagnosis is free and most phones come back to life for under $129.</p>'
      ]
    },
    'controller-drift': {
      title: 'Fix controller drift without buying a new pad',
      tag: 'Gaming',
      author: 'Maya Chen',
      date: 'Jun 28, 2026',
      read: '5 min read',
      hero: 'assets/img/bd-2.jpg',
      desc: 'That character walking off on its own is annoying, but drift doesn\'t always mean a new controller. Try these before you spend anything.',
      body: [
        '<p>Stick drift — where your aim wanders or your character shuffles on its own — is the most common console complaint we hear. The good news: it\'s fixable in most cases without buying a new pad.</p>',
        '<h3 class="h5 mt-4">1. Clean the joystick housing</h3>',
        '<p class="text-muted">Dust and skin oils build up in the stick module and confuse the sensors. With the controller off, use a cotton swab and 99% isopropyl alcohol around the base of the stick, then rotate it fully a few times. Repeat and let it dry.</p>',
        '<h3 class="h5 mt-4">2. Calibrate and update firmware</h3>',
        '<p class="text-muted">Most consoles have built-in calibration. Deadzone settings alone hide most minor drift. Manufacturers also ship stick fixes in controller firmware updates — run the latest one.</p>',
        '<blockquote class="neu-inset rounded p-4 my-4" style="border-inline-start:4px solid var(--accent)">' +
          '<p class="mb-0 fw-bold" style="color:var(--heading)">A cleaning + calibration fixes roughly 60% of drift cases we see. The rest need new stick modules — a $29 swap at our bench.</p>' +
        '</blockquote>',
        '<h3 class="h5 mt-4">3. When it needs the screwdriver</h3>',
        '<p class="text-muted">If drift survives a thorough clean, the potentiometer inside the stick module has worn out. That means a module swap. It\'s a precision job — too much force and you crack the analog board — so most people let us do it. Thirty minutes, $29, and the controller feels new.</p>'
      ]
    },
    'ransomware': {
      title: 'Ransomware? What to do (and not to do)',
      tag: 'Software',
      author: 'James Okafor',
      date: 'Jun 12, 2026',
      read: '6 min read',
      hero: 'assets/img/blog-details-5.webp',
      desc: 'Files locked, screen demanding payment. Stay calm, follow these steps, and know when professional recovery is worth it.',
      body: [
        '<p>Ransomware turns your own files against you. The screen demands a payment in bitcoin, but panic is the real enemy. Here\'s what to do the moment you see the lock screen.</p>',
        '<h3 class="h5 mt-4">1. Don\'t pay — yet</h3>',
        '<p class="text-muted">Paying funds the attackers and there\'s no guarantee you\'ll get a key. In many modern attacks, the decryptor doesn\'t even work. Treat payment as a last resort, not a first reaction.</p>',
        '<h3 class="h5 mt-4">2. Disconnect and contain</h3>',
        '<p class="text-muted">Pull the network cable and disable Wi-Fi on the infected machine. Ransomware spreads through shared drives and backups, so isolating the PC may save everything else on your network.</p>',
        '<blockquote class="neu-inset rounded p-4 my-4" style="border-inline-start:4px solid var(--accent)">' +
          '<p class="mb-0 fw-bold" style="color:var(--heading)">A clean, disconnected backup is your only guarantee. Test your backups before you need them.</p>' +
        '</blockquote>',
        '<h3 class="h5 mt-4">3. Check your backups</h3>',
        '<p class="text-muted">If you have a recent offline backup, the best move is a full reinstall from a known-clean source, then restore your data. Never restore over a machine that\'s still infected.</p>',
        '<h3 class="h5 mt-4">4. Bring it to a lab</h3>',
        '<p class="text-muted">For critical files with no backup, professional recovery can sometimes extract data from encrypted systems or find a decryptor for known variants. At Voltix, malware removal and data recovery starts at $79, and we never charge for the initial assessment of your chances.</p>'
      ]
    },
    'screen-repair': {
      title: 'How much should a laptop screen repair really cost?',
      tag: 'Laptops',
      author: 'Daniel Reyes',
      date: 'May 30, 2026',
      read: '5 min read',
      hero: 'assets/img/blog-details-6.webp',
      desc: 'Laptop screen quotes vary wildly. Here\'s what drives the price — panel type, genuine vs aftermarket, and labour — so you don\'t overpay.',
      body: [
        '<p>Laptop screen prices are all over the map — one shop says $120, the next $450. Most of that spread comes from three things: the panel itself, where it comes from, and who fits it. Here\'s how to read the quote.</p>',
        '<h3 class="h5 mt-4">1. The panel is 70% of the cost</h3>',
        '<p class="text-muted">A standard 1080p IPS panel is cheap; a 4K OLED or touch panel isn\'t. Check your model\'s exact display specs before comparing quotes — quoting a TN panel against an OLED quote isn\'t a fair fight.</p>',
        '<h3 class="h5 mt-4">2. Genuine vs compatible</h3>',
        '<p class="text-muted">Genuine OEM panels carry a warranty and exact color accuracy. Compatible panels cost less but can have slightly different brightness or gamut. Decide what matters for your use — designers should always choose genuine.</p>',
        '<blockquote class="neu-inset rounded p-4 my-4" style="border-inline-start:4px solid var(--accent)">' +
          '<p class="mb-0 fw-bold" style="color:var(--heading)">Rule of thumb: if a screen quote is suspiciously low, ask what panel it actually is. If it\'s suspiciously high, ask why.</p>' +
        '</blockquote>',
        '<h3 class="h5 mt-4">3. Labour is where experience shows</h3>',
        '<p class="text-muted">Screen swaps damage more laptops than any other job when rushed. A shop that photographs your device before and after, uses the right adhesive and tests every port afterwards is worth the difference in labour.</p>',
        '<h3 class="h5 mt-4">4. What you should expect to pay</h3>',
        '<p class="text-muted">As a rough guide at Voltix: 1080p IPS from $119, 2K/144Hz from $179, 4K OLED from $249 — genuine panels, fitted and tested, with a 90-day warranty included.</p>'
      ]
    }
  };

  var DEFAULT = 'battery-drain';

  function $id(id) { return document.getElementById(id); }
  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
  }

  function postSlug() {
    var m = (window.location.search || '').match(/[?&]post=([^&]+)/);
    var slug = m ? decodeURIComponent(m[1]) : '';
    return POSTS[slug] ? slug : DEFAULT;
  }

  function relatedSlugs(slug) {
    var post = POSTS[slug];
    var keys = Object.keys(POSTS);
    var sameTag = keys.filter(function (k) { return k !== slug && POSTS[k].tag === post.tag; });
    var others = keys.filter(function (k) { return k !== slug && POSTS[k].tag !== post.tag; });
    return sameTag.concat(others).slice(0, 2);
  }

  function render() {
    var slug = postSlug();
    var post = POSTS[slug];

    document.title = post.title + ' — Blog | Voltix';
    var desc = $id('metaDesc');
    if (desc) desc.setAttribute('content', post.desc);

    var tag = $id('pdTag');
    if (tag) tag.innerHTML = '<i class="fa-solid fa-tag"></i> ' + esc(post.tag);
    var title = $id('pdTitle');
    if (title) title.textContent = post.title;
    var meta = $id('pdMeta');
    if (meta) {
      meta.innerHTML =
        '<span><i class="fa-regular fa-user me-1"></i>' + esc(post.author) + '</span>' +
        '<span><i class="fa-regular fa-calendar me-1"></i>' + esc(post.date) + '</span>' +
        '<span><i class="fa-regular fa-clock me-1"></i>' + esc(post.read) + '</span>';
    }
    var hero = $id('pdHero');
    if (hero) { hero.src = post.hero; hero.alt = post.title; }

    var body = $id('pdBody');
    if (body) body.innerHTML = post.body.join('');

    var rel = $id('pdRelated');
    if (rel) {
      rel.innerHTML = relatedSlugs(slug).map(function (k) {
        var p = POSTS[k];
        return '<div class="col-md-6">' +
          '<div class="d-flex gap-3">' +
          '<img src="' + p.hero + '" alt="' + esc(p.title) + '" style="width:92px;height:68px;object-fit:cover;border-radius:12px">' +
          '<div><a class="fw-bold" style="font-size:.9rem" href="blog-details.html?post=' + encodeURIComponent(k) + '">' + esc(p.title) + '</a>' +
          '<small class="text-muted d-block">' + esc(p.date) + '</small></div>' +
          '</div></div>';
      }).join('');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
