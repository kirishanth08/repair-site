/* ==========================================================================
   VOLTIX — Shared Customer Dashboard Sidebar
   Injects the left icon sidebar on every customer dashboard page.
   Active item is driven by <body data-dash="...">.
   Load this file BEFORE js/main.js so the sidebar toggle wires up.
   ========================================================================== */

(function () {
  'use strict';

  var dash = document.body.getAttribute('data-dash') || 'overview';

  function getSession() {
    try {
      var s = JSON.parse(localStorage.getItem('vx_session'));
      return s && s.email ? s : null;
    } catch (e) {
      return null;
    }
  }

  function sidebarHtml() {
    return '' +
      '<aside class="admin-side" aria-label="Customer dashboard navigation">' +
      '  <div class="side-head">' +
      '    <a class="brand" href="index.html" aria-label="Back to site">' +
      '      <span class="brand-logo" style="width:40px;height:40px;border-radius:13px;font-size:1.1rem"><i class="fa-solid fa-bolt"></i></span>' +
      '      <span><span class="brand-name" style="font-size:1.15rem">Voltix</span><span class="brand-tag">My Account</span></span>' +
      '    </a>' +
      '    <button class="btn btn-icon side-toggle" id="sideClose" type="button" aria-label="Close sidebar"><i class="fa-solid fa-xmark"></i></button>' +
      '  </div>' +
      '  <ul class="admin-nav">' +
      '    <li class="side-label">Main</li>' +
      '    <li><a href="dashboard.html" data-dash-link="overview"><i class="fa-solid fa-gauge-high"></i> Dashboard</a></li>' +
      '    <li><a href="dashboard-new-repair.html" data-dash-link="new-repair"><i class="fa-solid fa-microchip"></i> New Repair</a></li>' +
      '    <li><a href="dashboard-track.html" data-dash-link="track"><i class="fa-solid fa-screwdriver-wrench"></i> Track Repair</a></li>' +
      '    <li><a href="dashboard-eta.html" data-dash-link="eta"><i class="fa-solid fa-clock"></i> Estimated Time</a></li>' +
      '    <li class="side-label">Account</li>' +
      '    <li><a href="dashboard-account.html" data-dash-link="account"><i class="fa-solid fa-user-gear"></i> My Account</a></li>' +
      '  </ul>' +
      '  <div class="mt-auto pt-3">' +
      '    <div class="d-flex align-items-center gap-3 neu-inset p-3" style="border-radius:var(--r-md)">' +
      '      <span class="brand-logo" style="width:44px;height:44px;border-radius:50%;font-size:1rem"><i class="fa-solid fa-user"></i></span>' +
      '      <div class="flex-grow-1">' +
      '        <b class="small d-block" style="color:var(--heading)" id="sideUserName">Guest</b>' +
      '        <small class="text-muted">Customer</small>' +
      '      </div>' +
      '      <a href="login.html" class="btn btn-icon" id="sideLogout" aria-label="Log out"><i class="fa-solid fa-right-from-bracket"></i></a>' +
      '    </div>' +
      '  </div>' +
      '</aside>';
  }

  function mount() {
    var host = document.getElementById('dashSide');
    if (host) host.innerHTML = sidebarHtml();

    var active = document.querySelector('[data-dash-link="' + dash + '"]');
    if (active) active.classList.add('active');

    var s = getSession();
    var uname = document.getElementById('sideUserName');
    if (uname) uname.textContent = (s && s.fname) ? s.fname : 'Guest';
    var greet = document.getElementById('topGreeting');
    if (greet) greet.textContent = (s && s.fname) ? 'Welcome back, ' + s.fname : 'Welcome back';

    var lo = document.getElementById('sideLogout');
    if (lo) {
      lo.addEventListener('click', function (e) {
        e.preventDefault();
        try { localStorage.removeItem('vx_session'); } catch (err) {}
        window.location.href = lo.getAttribute('href');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
