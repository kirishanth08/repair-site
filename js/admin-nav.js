/* ==========================================================================
   VOLTIX — Shared Admin Sidebar + Invoice Modal
   Injects the left icon sidebar (and the invoice modal) on every admin page.
   Active item is driven by <body data-admin="...">.
   Load this file BEFORE js/main.js so the sidebar toggle wires up.
   ========================================================================== */

(function () {
  'use strict';

  var adm = document.body.getAttribute('data-admin') || 'dashboard';

  function getSession() {
    try {
      var s = JSON.parse(localStorage.getItem('vx_session'));
      return s && s.email ? s : null;
    } catch (e) {
      return null;
    }
  }

  function unreadCount() {
    try {
      var list = JSON.parse(localStorage.getItem('vx_messages'));
      if (!Array.isArray(list)) return 0;
      return list.filter(function (m) { return !m.read; }).length;
    } catch (e) {
      return 0;
    }
  }

  function greeting() {
    var s = getSession();
    var name = s && s.fname ? s.fname : 'Admin';
    var h = new Date().getHours();
    var part = h < 12 ? 'Good morning' : (h < 18 ? 'Good afternoon' : 'Good evening');
    return part + ', ' + name;
  }

  function sidebarHtml() {
    return '' +
      '<aside class="admin-side" aria-label="Admin navigation">' +
      '  <div class="side-head">' +
      '    <a class="brand" href="../index.html" aria-label="Back to site">' +
      '      <span class="brand-logo" style="width:40px;height:40px;border-radius:13px;font-size:1.1rem"><i class="fa-solid fa-bolt"></i></span>' +
      '      <span><span class="brand-name" style="font-size:1.15rem">Voltix</span><span class="brand-tag">Admin</span></span>' +
      '    </a>' +
      '    <button class="btn btn-icon side-toggle" id="sideClose" type="button" aria-label="Close sidebar"><i class="fa-solid fa-xmark"></i></button>' +
      '  </div>' +
      '  <ul class="admin-nav">' +
      '    <li class="side-label">Main</li>' +
      '    <li><a href="dashboard.html" data-admin-link="dashboard"><i class="fa-solid fa-gauge-high"></i> Dashboard</a></li>' +
      '    <li><a href="jobs.html" data-admin-link="jobs"><i class="fa-solid fa-screwdriver-wrench"></i> Jobs</a></li>' +
      '    <li><a href="devices.html" data-admin-link="devices"><i class="fa-solid fa-microchip"></i> Devices</a></li>' +
      '    <li><a href="technicians.html" data-admin-link="technicians"><i class="fa-solid fa-user-gear"></i> Technicians</a></li>' +
      '    <li class="side-label">System</li>' +
      '    <li><a href="customers.html" data-admin-link="customers"><i class="fa-solid fa-users"></i> Customers</a></li>' +
      '    <li><a href="invoices.html" data-admin-link="invoices"><i class="fa-solid fa-file-invoice-dollar"></i> Invoices</a></li>' +
      '    <li><a href="messages.html" data-admin-link="messages"><i class="fa-solid fa-envelope"></i> Messages <span class="badge-soft ms-auto" id="sideMsgBadge">0</span></a></li>' +
      '    <li><a href="settings.html" data-admin-link="settings"><i class="fa-solid fa-gear"></i> Settings</a></li>' +
      '  </ul>' +
      '  <div class="mt-auto pt-3">' +
      '    <div class="d-flex align-items-center gap-3 neu-inset p-3" style="border-radius:var(--r-md)">' +
      '      <span class="brand-logo" style="width:44px;height:44px;border-radius:50%;font-size:1rem"><i class="fa-solid fa-user-shield"></i></span>' +
      '      <div class="flex-grow-1 min-w-0">' +
      '        <b class="small d-block" style="color:var(--heading)" id="adUserName">Admin</b>' +
      '        <small class="text-muted">Administrator</small>' +
      '      </div>' +
      '      <a href="login.html" class="btn btn-icon" id="adLogout" aria-label="Log out"><i class="fa-solid fa-right-from-bracket"></i></a>' +
      '    </div>' +
      '  </div>' +
      '</aside>';
  }

  function modalHtml() {
    return '' +
      '<div class="modal fade" id="adminInvoiceModal" tabindex="-1" aria-hidden="true">' +
      '  <div class="modal-dialog modal-lg modal-dialog-centered">' +
      '    <div class="modal-content">' +
      '      <div class="modal-header">' +
      '        <h5 class="modal-title"><i class="fa-solid fa-file-invoice-dollar me-2" style="color:var(--accent)"></i>Invoice</h5>' +
      '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
      '      </div>' +
      '      <div class="modal-body">' +
      '        <div class="invoice neu p-4 p-md-5">' +
      '          <div class="invoice-head d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">' +
      '            <div class="d-flex align-items-center gap-3">' +
      '              <span class="brand-logo"><i class="fa-solid fa-bolt"></i></span>' +
      '              <div><b class="d-block" style="font-family:var(--font-head);font-size:1.15rem;color:var(--heading)">Voltix Repair Lab</b><small class="text-muted">42 Circuit Ave, Tech Park, Metro City</small></div>' +
      '            </div>' +
      '            <div class="text-end">' +
      '              <h5 class="mb-1" id="invNumber">INV-VX-0000</h5>' +
      '              <small class="text-muted d-block">Date: <span id="invDate">—</span></small>' +
      '              <small class="text-muted d-block">Repair ID: <span id="invJobId">—</span></small>' +
      '            </div>' +
      '          </div>' +
      '          <p class="mb-4"><b style="color:var(--heading)">Customer:</b> <span id="invCustomer">—</span><br><b style="color:var(--heading)">Device:</b> <span id="invDevice">—</span><br><b style="color:var(--heading)">Work performed:</b> <span id="invIssue">—</span></p>' +
      '          <table class="table table-gh mb-0"><tbody id="invItems"></tbody></table>' +
      '          <p class="text-muted small mt-4 mb-0"><i class="fa-solid fa-shield-halved me-1" style="color:var(--teal)"></i>This repair is covered by our 90-day written warranty (parts &amp; labour).</p>' +
      '        </div>' +
      '      </div>' +
      '      <div class="modal-footer no-print">' +
      '        <button type="button" class="btn btn-ghost" data-bs-dismiss="modal">Close</button>' +
      '        <button type="button" class="btn btn-accent" id="printInvoice"><i class="fa-solid fa-print"></i> Print / Save PDF</button>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</div>';
  }

  function mount() {
    var host = document.getElementById('adminSide');
    if (host) host.innerHTML = sidebarHtml();

    var active = document.querySelector('[data-admin-link="' + adm + '"]');
    if (active) active.classList.add('active');

    var s = getSession();
    var uname = document.getElementById('adUserName');
    if (uname) uname.textContent = (s && s.fname) ? s.fname : 'Admin';
    var greet = document.getElementById('adGreeting');
    if (greet) greet.textContent = greeting();

    var badge = document.getElementById('sideMsgBadge');
    if (badge) badge.textContent = unreadCount();

    var lo = document.getElementById('adLogout');
    if (lo) {
      lo.addEventListener('click', function (e) {
        e.preventDefault();
        try { localStorage.removeItem('vx_session'); } catch (err) {}
        window.location.href = lo.getAttribute('href');
      });
    }

    var mhost = document.getElementById('adminModal');
    if (mhost) mhost.innerHTML = modalHtml();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
