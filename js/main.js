/* ==========================================================================
   VOLTIX — Main Scripts
   Preloader, navbar scroll, reveal, counters, back-to-top, tabs, pricing
   toggle, filters, blog search, quick quote, booking, forms, countdown.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Theme init (fallback; also set inline in <head>) ---------- */
  (function initTheme() {
    var root = document.documentElement;
    if (!root.getAttribute('data-theme')) {
      var saved = null;
      try { saved = localStorage.getItem('theme'); } catch (e) {}
      var theme = saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      root.setAttribute('data-theme', theme);
    }
    if (!root.getAttribute('dir')) {
      var dir = null;
      try { dir = localStorage.getItem('dir'); } catch (e) {}
      if (dir === 'rtl' || dir === 'ltr') root.setAttribute('dir', dir);
    }
  })();

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------- Preloader ---------- */
  function preloader() {
    var el = $('#preloader');
    if (!el) return;
    window.addEventListener('load', function () {
      setTimeout(function () { el.classList.add('hidden'); }, 350);
    });
    setTimeout(function () { el.classList.add('hidden'); }, 3000);
  }

  /* ---------- Navbar scroll state ---------- */
  function navbarScroll() {
    var nav = $('.main-navbar');
    if (!nav) return;
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Theme toggle (all .theme-toggle buttons) ---------- */
  function themeToggle() {
    $$('.theme-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var root = document.documentElement;
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) {}
      });
    });
  }

  /* ---------- LTR / RTL toggle (all [data-rtl-toggle] buttons) ---------- */
  function rtlToggle() {
    var root = document.documentElement;
    function sync() {
      var isRtl = root.getAttribute('dir') === 'rtl';
      $$('[data-rtl-toggle]').forEach(function (btn) {
        var label = btn.querySelector('[data-rtl-label]');
        if (label) label.textContent = isRtl ? 'LTR' : 'RTL';
        btn.setAttribute('aria-pressed', isRtl ? 'true' : 'false');
      });
    }
    $$('[data-rtl-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var isRtl = root.getAttribute('dir') === 'rtl';
        root.setAttribute('dir', isRtl ? 'ltr' : 'rtl');
        try { localStorage.setItem('dir', isRtl ? 'ltr' : 'rtl'); } catch (e) {}
        sync();
      });
    });
    sync();
  }

  /* ---------- Scroll reveal ---------- */
  function reveals() {
    var items = $$('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Animated counters ---------- */
  function counters() {
    $$('[data-count]').forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1600;
      var start = null;
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      }
      if (!('IntersectionObserver' in window)) { el.textContent = target + suffix; return; }
      var io = new IntersectionObserver(function (entries, obs) {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      }, { threshold: 0.4 });
      io.observe(el);
    });
  }

  /* ---------- Back to top ---------- */
  function backTop() {
    var btn = $('#backTop');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Tabs (data-tab-toggle) ---------- */
  function tabs() {
    $$('[data-tab-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var group = btn.closest('[data-tab-group]');
        var target = document.getElementById(btn.getAttribute('data-tab-toggle'));
        if (!group || !target) return;
        $$('[data-tab-toggle]', group).forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        $$('[data-tab-panel]', group).forEach(function (p) { p.classList.add('d-none'); });
        target.classList.remove('d-none');
      });
    });
  }

  /* ---------- Pricing standard/express toggle ---------- */
  function priceToggle() {
    var sw = $('#priceSwitch');
    if (!sw) return;
    sw.addEventListener('click', function () {
      var express = sw.classList.toggle('on');
      $$('[data-price]').forEach(function (el) {
        var ex = parseFloat(el.getAttribute('data-price-express'));
        var st = parseFloat(el.getAttribute('data-price'));
        el.textContent = (express ? ex : st);
      });
      $$('[data-billing]').forEach(function (el) {
        el.textContent = express ? 'Express' : 'Standard';
      });
    });
  }

  /* ---------- Filter buttons (blog / gallery) ---------- */
  function filters() {
    $$('[data-filter-group]').forEach(function (group) {
      var btns = $$('[data-filter]', group);
      var items = $$('[data-filter-item]');
      function apply(f) {
        btns.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-filter') === f); });
        items.forEach(function (it) {
          var match = f === 'all' || it.getAttribute('data-filter-item') === f;
          it.classList.toggle('d-none', !match);
          if (match) { it.classList.remove('reveal'); void it.offsetWidth; it.classList.add('reveal', 'in'); }
        });
      }
      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          apply(btn.getAttribute('data-filter'));
        });
      });
      var cat = new URLSearchParams(location.search).get('cat');
      if (cat) {
        var matchBtn = btns.filter(function (b) { return b.getAttribute('data-filter') === cat; })[0];
        if (matchBtn) apply(cat);
      }
    });
  }

  /* ---------- Blog live search ---------- */
  function blogSearch() {
    var input = $('#blogSearch');
    if (!input) return;
    var items = $$('[data-filter-item]');
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      items.forEach(function (it) {
        var match = it.textContent.toLowerCase().indexOf(q) !== -1;
        it.classList.toggle('d-none', !match);
      });
    });
  }

  /* ---------- Coming soon countdown ---------- */
  function countdown() {
    var wrap = $('#countdown');
    if (!wrap) return;
    var target = new Date();
    target.setDate(target.getDate() + 28);
    target.setHours(0, 0, 0, 0);
    var boxes = {
      d: $('#cd-days'), h: $('#cd-hours'), m: $('#cd-mins'), s: $('#cd-secs')
    };
    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    function tick() {
      var diff = Math.max(0, target - new Date());
      if (boxes.d) boxes.d.textContent = pad(Math.floor(diff / 86400000));
      if (boxes.h) boxes.h.textContent = pad(Math.floor(diff / 3600000) % 24);
      if (boxes.m) boxes.m.textContent = pad(Math.floor(diff / 60000) % 60);
      if (boxes.s) boxes.s.textContent = pad(Math.floor(diff / 1000) % 60);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Quick quote estimator ---------- */
  function quickQuote() {
    var form = $('#quoteForm');
    if (!form) return;
    var rates = {
      'phone':    { screen: 89, battery: 59, charging: 69, camera: 79, motherboard: 129, speaker: 49 },
      'laptop':   { screen: 149, battery: 99, charging: 89, camera: 119, motherboard: 199, speaker: 79 },
      'tablet':   { screen: 109, battery: 79, charging: 75, camera: 95, motherboard: 149, speaker: 65 },
      'tv':       { screen: 179, battery: 129, charging: 119, camera: 139, motherboard: 229, speaker: 99 },
      'gaming':   { screen: 129, battery: 89, charging: 85, camera: 105, motherboard: 169, speaker: 75 },
      'audio':    { screen: 0,   battery: 39, charging: 35, camera: 0,  motherboard: 69,  speaker: 45 },
      'watch':    { screen: 79,  battery: 49, charging: 45, camera: 59, motherboard: 99,  speaker: 39 }
    };
    var device = $('#quoteDevice');
    var issue = $('#quoteIssue');
    var out = $('#quoteOutput');
    var outVal = $('#quoteValue');
    var outNote = $('#quoteNote');
    function update() {
      if (!device || !issue) return;
      var r = rates[device.value] || {};
      var price = r[issue.value];
      if (typeof price === 'number' && price > 0) {
        if (out) out.classList.remove('d-none');
        if (outVal) outVal.textContent = '$' + price;
        if (outNote) outNote.textContent = 'Estimate for a ' + device.options[device.selectedIndex].text + ' ' +
          issue.options[issue.selectedIndex].text.toLowerCase().replace(/^estimate:?\s*/i, '') + '. Final quote confirmed after free diagnosis.';
      } else {
        if (out) out.classList.add('d-none');
      }
    }
    if (device) device.addEventListener('change', update);
    if (issue) issue.addEventListener('change', update);
    update();
  }

  /* ---------- Booking form ---------- */
  function booking() {
    var form = $('#bookingForm');
    if (!form) return;
    var done = $('#bookingDone');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      $$('[required]', form).forEach(function (f) {
        var bad = !f.value.trim() || (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
        f.classList.toggle('invalid', bad);
        if (bad) valid = false;
      });
      if (!valid) return;
      form.classList.add('d-none');
      if (done) done.classList.remove('d-none');
    });
    $$('[required]', form).forEach(function (f) {
      f.addEventListener('input', function () { f.classList.remove('invalid'); });
    });
  }

  /* ---------- Generic contact form ---------- */
  function forms() {
    $$('form[data-validate]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var valid = true;
        $$('[required]', form).forEach(function (f) {
          var bad = !f.value.trim() || (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
          f.classList.toggle('invalid', bad);
          if (bad) valid = false;
        });
        if (!valid) return;
        var ok = $('#formDone');
        if (ok) { form.classList.add('d-none'); ok.classList.remove('d-none'); }
      });
      $$('[required]', form).forEach(function (f) {
        f.addEventListener('input', function () { f.classList.remove('invalid'); });
      });
    });

    $$('form[data-newsletter]').forEach(function (form) {
      if (form.closest('#footer')) return;
      var ok = form.parentElement.querySelector('.news-ok');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        if (!input || !input.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          if (input) input.classList.add('invalid');
          return;
        }
        if (input) input.classList.remove('invalid');
        form.style.display = 'none';
        if (ok) ok.style.display = 'block';
      });
    });

    var pass = $('#registerPassword');
    var conf = $('#registerConfirm');
    if (pass && conf) {
      conf.addEventListener('input', function () {
        var bad = conf.value && conf.value !== pass.value;
        conf.classList.toggle('invalid', bad);
      });
    }

    var pwToggle = $('#pwToggle');
    var pwField = $('#passwordField');
    if (pwToggle && pwField) {
      pwToggle.addEventListener('click', function () {
        var show = pwField.type === 'password';
        pwField.type = show ? 'text' : 'password';
        pwToggle.innerHTML = show
          ? '<i class="fa-solid fa-eye-slash"></i>'
          : '<i class="fa-solid fa-eye"></i>';
      });
    }
  }

  /* ---------- Admin sidebar ---------- */
  function adminSidebar() {
    var open = $('#sideOpen');
    var close = $('#sideClose');
    var backdrop = $('.admin-backdrop');
    function setOpen(o) { document.body.classList.toggle('admin-open', o); }
    if (open) open.addEventListener('click', function () { setOpen(true); });
    if (close) close.addEventListener('click', function () { setOpen(false); });
    if (backdrop) backdrop.addEventListener('click', function () { setOpen(false); });
  }

  /* ---------- Ambient background parallax ---------- */
  function ambientBg() {
    var bg = document.querySelector('.ambient-bg');
    if (!bg) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var orbs = bg.querySelectorAll('.orb');
    var glyphs = bg.querySelectorAll('.fx-glyphs i');
    if (!orbs.length && !glyphs.length) return;
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    window.addEventListener('pointermove', function (e) {
      tx = e.clientX / window.innerWidth - .5;
      ty = e.clientY / window.innerHeight - .5;
      if (!raf) raf = requestAnimationFrame(step);
    }, { passive: true });
    function step() {
      cx += (tx - cx) * .05;
      cy += (ty - cy) * .05;
      orbs.forEach(function (o, i) {
        var d = 20 * (i + 1);
        o.style.translate = (-cx * d) + 'px ' + (-cy * d) + 'px';
      });
      glyphs.forEach(function (g, i) {
        var d = 14 * (i + 1);
        g.style.translate = (cx * d) + 'px ' + (cy * d) + 'px';
      });
      if (Math.abs(tx - cx) > .002 || Math.abs(ty - cy) > .002) {
        raf = requestAnimationFrame(step);
      } else {
        cx = tx; cy = ty;
        raf = null;
      }
    }
  }

  /* ---------- Site-wide ambient background (inject if missing) ---------- */
  function siteBg() {
    var bg = document.querySelector('.ambient-bg');
    if (!bg) {
      bg = document.createElement('div');
      bg.className = 'ambient-bg';
      bg.setAttribute('aria-hidden', 'true');
      document.body.insertAdjacentElement('afterbegin', bg);
    }
    if (!bg.querySelector('.orb')) {
      ['o1', 'o2', 'o3', 'o4'].forEach(function (c) {
        var s = document.createElement('span');
        s.className = 'orb ' + c;
        bg.appendChild(s);
      });
    }
    if (!bg.querySelector('.fx-glyphs')) {
      var fx = document.createElement('div');
      fx.className = 'fx-glyphs';
      var glyphIcons = ['fa-bolt', 'fa-microchip', 'fa-battery-three-quarters', 'fa-plug',
        'fa-mobile-screen', 'fa-charging-station', 'fa-gears', 'fa-bolt-lightning'];
      for (var k = 0; k < glyphIcons.length; k++) {
        var gi = document.createElement('i');
        gi.className = 'fa-solid ' + glyphIcons[k];
        fx.appendChild(gi);
      }
      bg.appendChild(fx);
    }
    if (!document.querySelector('.cursor-glow')) {
      var g = document.createElement('div');
      g.className = 'cursor-glow';
      document.body.appendChild(g);
    }
  }

  /* ---------- Animated circuit-board background ---------- */
  function circuitTraces() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var bg = document.querySelector('.ambient-bg');
    if (!bg || bg.querySelector('.fx-circuit')) return;
    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'fx-circuit');
    svg.setAttribute('viewBox', '0 0 1440 900');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg.setAttribute('aria-hidden', 'true');
    var traces = [
      { pts: '80,180 320,180 320,420 680,420 680,60', cls: '' },
      { pts: '200,780 200,540 560,540 560,300 900,300 900,540', cls: 'cyan' },
      { pts: '1360,140 1000,140 1000,380 760,380 760,660 1160,660', cls: 'gold' },
      { pts: '520,120 760,120 760,380', cls: 'cyan' },
      { pts: '1200,780 1200,540 900,540', cls: 'gold' }
    ];
    traces.forEach(function (t, i) {
      var p = document.createElementNS(NS, 'polyline');
      p.setAttribute('class', 'trace ' + t.cls);
      p.setAttribute('points', t.pts);
      svg.appendChild(p);
      var pulse = document.createElementNS(NS, 'circle');
      pulse.setAttribute('class', 'pulse ' + t.cls);
      pulse.setAttribute('r', 3.4);
      var am = document.createElementNS(NS, 'animateMotion');
      am.setAttribute('path', 'M' + t.pts.replace(/ /g, ' L'));
      am.setAttribute('dur', (10 + i * 3) + 's');
      am.setAttribute('begin', (i * 1.5) + 's');
      am.setAttribute('repeatCount', 'indefinite');
      pulse.appendChild(am);
      svg.appendChild(pulse);
    });
    bg.appendChild(svg);
  }

  /* ---------- Cursor-follow glow (interactive) ---------- */
  function cursorGlow() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var g = document.querySelector('.cursor-glow');
    if (!g) return;
    var x = -999, y = -999, cx = -999, cy = -999, raf = null;
    window.addEventListener('pointermove', function (e) {
      x = e.clientX; y = e.clientY;
      g.classList.add('on');
      if (!raf) raf = requestAnimationFrame(step);
    }, { passive: true });
    document.addEventListener('pointerleave', function () { g.classList.remove('on'); });
    function step() {
      cx += (x - cx) * .12;
      cy += (y - cy) * .12;
      g.style.translate = cx + 'px ' + cy + 'px';
      if (Math.abs(x - cx) > .5 || Math.abs(y - cy) > .5) {
        raf = requestAnimationFrame(step);
      } else {
        cx = x; cy = y;
        raf = null;
      }
    }
  }

  /* ---------- Interactive FX ---------- */
  function fxSpots() {    var sel = '.service-card, .blog-card, .team-card, .brand-chip, .info-card, ' +
              '.price-card, .device-card, .step-card, .t-card, .kpi-card, .why-grid .service-card, ' +
              '.bento-item';
    $$(sel).forEach(function (card) {
      card.classList.add('fx-spot');
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  function heroTilt() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    $$('.hero-visual, .hero-media').forEach(function (wrap) {
      wrap.classList.add('fx-tilt');
      wrap.addEventListener('pointermove', function (e) {
        var r = wrap.getBoundingClientRect();
        var rx = ((e.clientY - r.top) / r.height - .5) * -8;
        var ry = ((e.clientX - r.left) / r.width - .5) * 8;
        wrap.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
      });
      wrap.addEventListener('pointerleave', function () {
        wrap.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
      });
    });
  }

  /* ---------- Init ---------- */
  function init() {
    adminSidebar();
    themeToggle();
    rtlToggle();
    preloader();
    navbarScroll();
    reveals();
    counters();
    backTop();
    tabs();
    priceToggle();
    filters();
    blogSearch();
    countdown();
    quickQuote();
    booking();
    forms();
    siteBg();
    circuitTraces();
    ambientBg();
    cursorGlow();
    fxSpots();
    heroTilt();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
