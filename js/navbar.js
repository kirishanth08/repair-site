/* ==========================================================================
   VOLTIX — Reusable Navbar Module
   Include via <div id="navbar"></div> and <script src="js/navbar.js"></script>
   Edit this single file to update the menu on every page.

   On auth pages (body[data-page="login|register"]) only the brand, theme
   toggle and RTL toggle are shown — no menu, no CTA buttons.
   ========================================================================== */

(function () {
  'use strict';

  var base = /\/admin\//.test(window.location.pathname) ? '../' : '';

  var brandIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M13 2 4.5 13.5H11L9.5 22 19 9.5h-6.5L13 2Z"/>' +
    '</svg>';

  var brand =
    '<a class="brand" href="' + base + 'index.html" aria-label="Voltix - Home">' +
    '  <span class="brand-logo">' + brandIcon + '</span>' +
    '  <span><span class="brand-name">Voltix</span><span class="brand-tag">Repair Lab</span></span>' +
    '</a>';

  var toggles =
    '<button class="theme-toggle" type="button" aria-label="Toggle dark mode">' +
    '  <span class="icon-sun"><i class="fa-solid fa-sun"></i></span>' +
    '  <span class="icon-moon"><i class="fa-solid fa-moon"></i></span>' +
    '</button>' +
    '<button class="rtl-toggle" type="button" data-rtl-toggle aria-label="Toggle text direction">' +
    '  <span data-rtl-label>RTL</span>' +
    '</button>';

  var dataPage = document.body.getAttribute('data-page');
  var isAuth = dataPage === 'login' || dataPage === 'register';
  var isCompact = isAuth || dataPage === 'dashboard';

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
  }

  function getSession() {
    try {
      var s = JSON.parse(localStorage.getItem('vx_session'));
      return s && s.email ? s : null;
    } catch (e) {
      return null;
    }
  }

  var session = isCompact ? null : getSession();
  var isAdmin = !!(session && session.role === 'admin');
  var dashUrl = base + (isAdmin ? 'admin/dashboard.html' : 'dashboard.html');
  var userLabel = isAdmin ? 'Admin' : (session ? session.fname : 'there');

  var authBtns = session
    ? '<div class="user-menu">' +
      '  <button class="btn btn-accent btn-sm" type="button" data-user-menu aria-haspopup="true" aria-expanded="false"><i class="fa-solid fa-user"></i> Hi, ' + esc(userLabel) + ' <i class="caret fa-solid fa-chevron-down"></i></button>' +
      '  <div class="dropdown user-dropdown" role="menu">' +
      '    <a href="' + dashUrl + '" role="menuitem"><i class="fa-solid fa-gauge-high"></i> Dashboard</a>' +
      '    <button type="button" data-auth-logout role="menuitem"><i class="fa-solid fa-right-from-bracket"></i> Sign out</button>' +
      '  </div>' +
      '</div>'
    : '<a class="btn btn-ghost btn-sm" href="' + base + 'login.html"><i class="fa-solid fa-right-to-bracket"></i> Login</a>' +
      '<a class="btn btn-accent btn-sm" href="' + base + 'register.html"><i class="fa-solid fa-user-plus"></i> Sign Up</a>';

  var menu =
    '<ul class="nav-menu">' +
    '  <li class="has-dropdown">' +
    '    <a href="' + base + 'index.html">Home <i class="caret fa-solid fa-chevron-down"></i></a>' +
    '    <ul class="dropdown">' +
    '      <li><a href="' + base + 'index.html"><span class="d-ico"><i class="fa-solid fa-bolt"></i></span><span>Home Page 1<small class="d-sub">General services landing</small></span></a></li>' +
    '      <li><a href="' + base + 'home-2.html"><span class="d-ico"><i class="fa-solid fa-screwdriver-wrench"></i></span><span>Home Page 2<small class="d-sub">Repair shop niche</small></span></a></li>' +
    '    </ul>' +
    '  </li>' +
    '  <li><a href="' + base + 'about.html">About</a></li>' +
    '  <li><a href="' + base + 'services.html">Services</a></li>' +
    '  <li><a href="' + base + 'pricing.html">Pricing</a></li>' +
    '  <li><a href="' + base + 'blog.html">Blog</a></li>' +
    '  <li><a href="' + base + 'contact.html">Contact</a></li>' +
    '</ul>';

  var html = isCompact
    ? '<nav class="main-navbar" aria-label="Main navigation">' +
      '  <div class="container">' +
      '    <div class="navbar-wrap">' +
      brand +
      '      <div class="nav-actions">' + toggles + '</div>' +
      '    </div>' +
      '  </div>' +
      '</nav>'
    : '<nav class="main-navbar" aria-label="Main navigation">' +
      '  <div class="container">' +
      '    <div class="navbar-wrap">' +
      brand +
      '      <div class="nav-actions nav-actions-bar">' + toggles +
      '        <a class="btn btn-accent btn-sm" href="' + base + 'home-2.html#booking"><i class="fa-solid fa-wrench"></i> Book a Repair</a>' +
      '      </div>' +
      '      <button class="nav-toggle" type="button" aria-label="Toggle menu" aria-expanded="false" aria-controls="siteMenu">' +
      '        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/></svg>' +
      '      </button>' +
      '      <div class="nav-collapse" id="siteMenu">' +
      menu +
      '        <div class="nav-actions">' +
      toggles +
      '          ' + authBtns +
      '        </div>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</nav>' +
      '<div class="nav-backdrop"></div>';

  function mount() {
    var host = document.getElementById('navbar');
    if (!host) return;
    host.innerHTML = html;

    var toggle = host.querySelector('.nav-toggle');
    var backdrop = host.querySelector('.nav-backdrop');

    function setOpen(open) {
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    if (toggle && backdrop) {
      toggle.addEventListener('click', function () {
        setOpen(!document.body.classList.contains('nav-open'));
      });
      backdrop.addEventListener('click', function () { setOpen(false); });
    }

    host.querySelectorAll('.has-dropdown > a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth < 1200) {
          e.preventDefault();
          link.parentElement.classList.toggle('open');
        }
      });
    });

    host.querySelectorAll('a').forEach(function (a) {
      if (a.href) {
        var current = window.location.pathname.replace(/\/+$/, '');
        var target = a.pathname.replace(/\/+$/, '');
        if (current === target && target !== '') a.classList.add('active');
      }
    });

    var userMenu = host.querySelector('.user-menu');
    var userBtn = userMenu ? userMenu.querySelector('[data-user-menu]') : null;
    if (userMenu && userBtn) {
      userBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = userMenu.classList.toggle('open');
        userBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      userMenu.addEventListener('click', function (e) { e.stopPropagation(); });
      document.addEventListener('click', function () {
        userMenu.classList.remove('open');
        userBtn.setAttribute('aria-expanded', 'false');
      });
    }

    var logoutBtn = host.querySelector('[data-auth-logout]');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        try { localStorage.removeItem('vx_session'); } catch (e) {}
        window.location.reload();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
