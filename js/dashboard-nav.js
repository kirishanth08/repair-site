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
    var firstName = (s && s.fname) ? s.fname : 'User';
    var fullName = (s && s.fname && s.lname) ? (s.fname + ' ' + s.lname) : (s && s.fname ? s.fname : 'Customer');
    var email = (s && s.email) ? s.email : 'customer@voltix.com';

    // Update sidebar user name
    var uname = document.getElementById('sideUserName');
    if (uname) uname.textContent = firstName;

    // Update right-top welcome note
    var greet = document.getElementById('topGreeting');
    if (greet) greet.textContent = 'Welcome back, ' + firstName;

    // Update welcome note banner name if present
    var bannerName = document.getElementById('custWelcomeBannerName');
    if (bannerName) bannerName.textContent = firstName;

    // Update top dropdown details
    var dropName = document.getElementById('dropUserName');
    if (dropName) dropName.textContent = fullName;
    var dropMail = document.getElementById('dropUserEmail');
    if (dropMail) dropMail.textContent = email;

    // Wire top profile dropdown
    var profileBtn = document.getElementById('topProfileBtn');
    var profileDropdown = document.getElementById('topProfileDropdown');
    if (profileBtn && profileDropdown) {
      profileBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = profileDropdown.classList.toggle('show');
        profileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      profileDropdown.addEventListener('click', function (e) {
        e.stopPropagation();
      });
      document.addEventListener('click', function () {
        profileDropdown.classList.remove('show');
        profileBtn.setAttribute('aria-expanded', 'false');
      });
    }

    // Wire logout buttons
    function doLogout(e) {
      if (e) e.preventDefault();
      try { localStorage.removeItem('vx_session'); } catch (err) {}
      window.location.href = 'login.html';
    }

    var sideLo = document.getElementById('sideLogout');
    if (sideLo) sideLo.addEventListener('click', doLogout);

    var topLo = document.getElementById('topLogoutBtn');
    if (topLo) topLo.addEventListener('click', doLogout);

    var quickLo = document.getElementById('quickLogoutBtn');
    if (quickLo) quickLo.addEventListener('click', doLogout);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
