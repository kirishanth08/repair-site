/* ==========================================================================
   VOLTIX — Admin Panel (multi-page)
   Demo-only, localStorage-backed. Runs on every admin page and activates the
   relevant module from <body data-admin="...">:
   - dashboard: KPIs, revenue chart (week/month/year), recent repairs, messages
   - jobs:      searchable/filterable jobs table, new job modal, status updates
   - devices:   device catalog with repair counts, add/remove devices
   - technicians: technician roster with status toggles, add/remove
   - customers: customer directory, search, add/remove
   - invoices:  invoice table + itemized invoice modal (print)
   - messages:  inbox with read/unread, reply, delete, mark all read
   - settings:  store settings + toggles + change password
   Replace with a real backend for production.
   ========================================================================== */

(function () {
  'use strict';

  var JOBS_KEY = 'vx_jobs';
  var MSGS_KEY = 'vx_messages';
  var TECHS_KEY = 'vx_technicians';
  var DEVS_KEY = 'vx_devices';
  var CUSTS_KEY = 'vx_customers';
  var SETTINGS_KEY = 'vx_settings';

  var AVATARS = ['emma-lewis.jpg', 'marcus-lee.jpg', 'hannah-park.jpg', 'omar-farouk.jpg', 'grace-liu.jpg', 'laura-kim.jpg', 'david-stone.jpg', 'ava-moore.jpg', 'sarah-mitchell.jpg', 'fatima-haddad.jpg'];

  var STAGES = [
    { key: 'received', label: 'Received', icon: 'fa-solid fa-inbox' },
    { key: 'diagnosis', label: 'Diagnosis', icon: 'fa-solid fa-stethoscope' },
    { key: 'repair', label: 'Under Repair', icon: 'fa-solid fa-screwdriver-wrench' },
    { key: 'qa', label: 'Quality Check', icon: 'fa-solid fa-clipboard-check' },
    { key: 'ready', label: 'Ready for Pickup', icon: 'fa-solid fa-box-open' },
    { key: 'done', label: 'Completed', icon: 'fa-solid fa-circle-check' }
  ];

  function read(key) {
    try {
      var v = JSON.parse(localStorage.getItem(key));
      return v == null ? null : v;
    } catch (e) { return null; }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }
  function readJobs() { var v = read(JOBS_KEY); return Array.isArray(v) ? v : []; }
  function writeJobs(list) { write(JOBS_KEY, list); }
  function readMsgs() { var v = read(MSGS_KEY); return Array.isArray(v) ? v : []; }
  function readTechs() { var v = read(TECHS_KEY); return Array.isArray(v) ? v : []; }
  function readDevs() { var v = read(DEVS_KEY); return Array.isArray(v) ? v : []; }
  function readCusts() { var v = read(CUSTS_KEY); return Array.isArray(v) ? v : []; }
  function readSettings() { return read(SETTINGS_KEY) || {}; }
  function writeSettings(s) { write(SETTINGS_KEY, s); }

  function $id(id) { return document.getElementById(id); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
  }
  function fmtShort(ts) { return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }); }
  function fmtFull(ts) { return new Date(ts).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }); }

  function seed() {
    if (read(JOBS_KEY) == null) {
      var now = Date.now(), day = 86400000;
      var jobs = [
        { id: 'VX-2048', device: 'Smartphone', brand: 'Apple', model: 'iPhone 14', customer: 'Emma Lewis', technician: 'Dana Brooks', issue: 'screen', issueLabel: 'Cracked screen', desc: 'Cracked front glass, touch still works in some areas.', status: 3, createdAt: now - 2 * day, eta: now + 1 * day, cost: 149, parts: ['Genuine OLED display', 'Adhesive kit', 'Screen calibration'], invoice: { items: [['Genuine OLED display', 129], ['Screen calibration', 20]], tax: 0 } },
        { id: 'VX-2047', device: 'Laptop', brand: 'Dell', model: 'XPS 15', customer: 'Marcus Lee', technician: 'Leo Marsh', issue: 'battery', issueLabel: 'Battery draining fast', desc: 'Battery health at 52%, dies within an hour.', status: 2, createdAt: now - 1 * day, eta: now + 2 * day, cost: 119, parts: ['High-capacity cell (98Wh)', 'Thermal service'], invoice: { items: [['High-capacity battery cell', 109], ['Battery calibration', 10]], tax: 0 } },
        { id: 'VX-2046', device: 'Tablet', brand: 'Samsung', model: 'Galaxy Tab S8', customer: 'Hannah Park', technician: 'Rina Patel', issue: 'charging', issueLabel: 'Not charging', desc: 'Port is loose, only charges with pressure on the cable.', status: 1, createdAt: now - 3 * day, eta: now + 1 * day, cost: 89, parts: ['USB-C port assembly'], invoice: { items: [['USB-C port replacement', 79], ['Port cleaning', 10]], tax: 0 } },
        { id: 'VX-2045', device: 'Smartphone', brand: 'Google', model: 'Pixel 7', customer: 'Omar Farouk', technician: 'Sam Carter', issue: 'battery', issueLabel: 'Battery replacement', desc: 'Battery drains fast, phone restarts below 20%.', status: 5, createdAt: now - 6 * day, eta: now - 4 * day, cost: 69, parts: ['High-capacity cell'], invoice: { items: [['Battery replacement', 59], ['Health calibration', 10]], tax: 0 } },
        { id: 'VX-2044', device: 'Laptop', brand: 'HP', model: 'Pavilion 15', customer: 'Grace Liu', technician: 'Leo Marsh', issue: 'software', issueLabel: 'Virus / malware', desc: 'Ransomware locked the system, need cleanup and file recovery.', status: 5, createdAt: now - 9 * day, eta: now - 7 * day, cost: 189, parts: ['Malware removal', 'Data recovery', 'OS reinstall'], invoice: { items: [['Virus & malware removal', 79], ['Data recovery', 60], ['OS reinstall', 50]], tax: 0 } }
      ];
      write(JOBS_KEY, jobs);
    }

    if (read(MSGS_KEY) == null) {
      write(MSGS_KEY, [
        { id: 1, from: 'Laura Kim', email: 'laura.k@example.com', avatar: 'laura-kim.jpg', subject: 'Early pickup today', body: 'Can I pick up my laptop earlier today? I have a flight at 6pm.', time: '5m', read: false },
        { id: 2, from: 'David Stone', email: 'david.s@example.com', avatar: 'david-stone.jpg', subject: 'Warranty question', body: 'Do you offer a warranty on console repairs? Looking at a PS5 hdmi fix.', time: '32m', read: false },
        { id: 3, from: 'Marcus Lee', email: 'marcus.lee@example.com', avatar: 'marcus-lee.jpg', subject: 'XPS battery update', body: 'Please update me on the XPS battery status when you get a chance.', time: '1h', read: false },
        { id: 4, from: 'Ava Moore', email: 'ava.m@example.com', avatar: 'ava-moore.jpg', subject: 'Thank you!', body: 'Thanks for the quick screen fix — flawless work, five stars!', time: '2h', read: true },
        { id: 5, from: 'Hannah Park', email: 'hannah.p@example.com', avatar: 'hannah-park.jpg', subject: 'Charging port', body: 'The new charging port works great, thank you for the fast turnaround.', time: '2d', read: true }
      ]);
    }

    if (read(TECHS_KEY) == null) {
      write(TECHS_KEY, [
        { name: 'Dana Brooks', email: 'dana@voltixlab.com', role: 'Phone & Screen', skills: ['Screen', 'Battery', 'Camera'], status: 'available' },
        { name: 'Leo Marsh', email: 'leo@voltixlab.com', role: 'Laptop & Logic', skills: ['Motherboard', 'Charging', 'Data'], status: 'available' },
        { name: 'Rina Patel', email: 'rina@voltixlab.com', role: 'Tablets & Consoles', skills: ['Ports', 'Displays', 'Software'], status: 'available' },
        { name: 'Sam Carter', email: 'sam@voltixlab.com', role: 'QA & Diagnostics', skills: ['QA', 'Water damage', 'Software'], status: 'onbreak' }
      ]);
    }

    if (read(DEVS_KEY) == null) {
      write(DEVS_KEY, [
        { name: 'Smartphone', icon: 'fa-mobile-screen' },
        { name: 'Laptop', icon: 'fa-laptop' },
        { name: 'Tablet', icon: 'fa-tablet-screen-button' },
        { name: 'Console', icon: 'fa-gamepad' },
        { name: 'TV / Monitor', icon: 'fa-tv' },
        { name: 'Wearable', icon: 'fa-clock' },
        { name: 'Audio', icon: 'fa-headphones' }
      ]);
    }

    if (read(CUSTS_KEY) == null) {
      var now2 = Date.now(), d2 = 86400000;
      write(CUSTS_KEY, [
        { name: 'Emma Lewis', email: 'emma@example.com', phone: '(555) 010-2210', avatar: 'emma-lewis.jpg', since: now2 - 400 * d2 },
        { name: 'Marcus Lee', email: 'marcus@example.com', phone: '(555) 010-3311', avatar: 'marcus-lee.jpg', since: now2 - 260 * d2 },
        { name: 'Hannah Park', email: 'hannah@example.com', phone: '(555) 010-4412', avatar: 'hannah-park.jpg', since: now2 - 180 * d2 },
        { name: 'Omar Farouk', email: 'omar@example.com', phone: '(555) 010-5523', avatar: 'omar-farouk.jpg', since: now2 - 120 * d2 },
        { name: 'Grace Liu', email: 'grace@example.com', phone: '(555) 010-6634', avatar: 'grace-liu.jpg', since: now2 - 60 * d2 }
      ]);
    }

    if (read(SETTINGS_KEY) == null) {
      write(SETTINGS_KEY, {
        shopName: 'Voltix Repair Lab',
        address: '42 Circuit Ave, Tech Park, Metro City',
        phone: '+1 (555) 123-4567',
        email: 'support@voltixlab.com',
        warrantyMonths: 3,
        notifyEmail: true,
        notifySms: false,
        autoAssign: true,
        maintenance: false
      });
    }
  }

  function pickJob(id) {
    var jobs = readJobs();
    for (var i = 0; i < jobs.length; i++) if (jobs[i].id === id) return jobs[i];
    return null;
  }

  function statusInfo(j) {
    if (j.status >= 5) return { cls: 'status-done', txt: 'Completed' };
    if (j.status === 4) return { cls: 'status-inprogress', txt: 'Ready for pickup' };
    if (j.status === 3) return { cls: 'status-inprogress', txt: 'Quality check' };
    if (j.status === 2) return { cls: 'status-inprogress', txt: 'Under repair' };
    if (j.status === 1) return { cls: 'status-diagnosis', txt: 'Diagnosis' };
    return { cls: 'status-pending', txt: 'Received' };
  }

  function updateBadges() {
    var unread = readMsgs().filter(function (m) { return !m.read; }).length;
    var bell = $id('adBell');
    if (bell) bell.textContent = unread;
    var sb = $id('sideMsgBadge');
    if (sb) sb.textContent = unread;
  }

  /* ---------- Invoice modal ---------- */
  function renderInvoice(id) {
    var job = pickJob(id);
    var modal = $id('adminInvoiceModal');
    if (!job || !modal) return;

    var items = (job.invoice && job.invoice.items) || [];
    var subtotal = 0;
    items.forEach(function (it) { subtotal += it[1]; });
    if (subtotal === 0) subtotal = job.cost;
    var tax = Math.round(subtotal * 0.08 * 100) / 100;
    var total = subtotal + tax;

    $id('invNumber').textContent = 'INV-' + id;
    $id('invDate').textContent = fmtFull(job.createdAt);
    $id('invCustomer').textContent = job.customer || '—';
    $id('invDevice').textContent = job.brand + ' ' + job.model + ' (' + job.device + ')';
    $id('invJobId').textContent = id;
    $id('invIssue').textContent = job.issueLabel + ' — ' + job.desc;

    $id('invItems').innerHTML = items.map(function (it) {
      return '<tr><td>' + esc(it[0]) + '</td><td class="text-end">$' + it[1].toFixed(2) + '</td></tr>';
    }).join('') +
      '<tr><td class="fw-bold" style="color:var(--heading)">Subtotal</td><td class="text-end">$' + subtotal.toFixed(2) + '</td></tr>' +
      '<tr><td class="fw-bold" style="color:var(--heading)">Tax (8%)</td><td class="text-end">$' + tax.toFixed(2) + '</td></tr>' +
      '<tr class="border-top"><td class="fw-bold" style="color:var(--heading)">Total</td><td class="text-end fw-bold" style="color:var(--accent);font-size:1.05rem">$' + total.toFixed(2) + '</td></tr>';

    if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
      bootstrap.Modal.getOrCreateInstance(modal).show();
    }
  }

  function setupInvoiceButtons() {
    document.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('[data-ad-invoice]') : null;
      if (btn) renderInvoice(btn.getAttribute('data-ad-invoice'));
    });
    var print = $id('printInvoice');
    if (print) print.addEventListener('click', function () { window.print(); });
  }

  /* ---------- Dashboard ---------- */
  function renderAdKpis() {
    var jobs = readJobs();
    var revenue = 0;
    jobs.forEach(function (j) { if (j.status >= 4) revenue += j.cost; });
    var active = jobs.filter(function (j) { return j.status < 4; }).length;
    var ready = jobs.filter(function (j) { return j.status === 4; }).length;
    var el = $id('adKpiRevenue'); if (el) el.textContent = '$' + revenue;
    var el2 = $id('adKpiActive'); if (el2) el2.textContent = active;
    var el3 = $id('adKpiReady'); if (el3) el3.textContent = ready;
  }

  function renderAdChart(period) {
    var wrap = $id('adChart');
    if (!wrap) return;
    var jobs = readJobs();
    var now = new Date();
    var buckets = [], labels = [];

    if (period === 'week') {
      for (var i = 6; i >= 0; i--) {
        var d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
        buckets.push({ start: new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(), end: new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).getTime() });
        labels.push(d.toLocaleDateString(undefined, { weekday: 'short' }));
      }
    } else if (period === 'month') {
      var wStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7));
      for (var j = 3; j >= 0; j--) {
        var s = new Date(wStart.getFullYear(), wStart.getMonth(), wStart.getDate() - j * 7);
        buckets.push({ start: s.getTime(), end: new Date(s.getFullYear(), s.getMonth(), s.getDate() + 7).getTime() });
        labels.push('W' + (4 - j));
      }
    } else {
      for (var k = 11; k >= 0; k--) {
        var m = new Date(now.getFullYear(), now.getMonth() - k, 1);
        buckets.push({ start: m.getTime(), end: new Date(m.getFullYear(), m.getMonth() + 1, 1).getTime() });
        labels.push(m.toLocaleDateString(undefined, { month: 'short' }));
      }
    }

    var values = buckets.map(function () { return 0; });
    jobs.forEach(function (jb) {
      for (var n = 0; n < buckets.length; n++) {
        if (jb.createdAt >= buckets[n].start && jb.createdAt < buckets[n].end) { values[n] += jb.cost; break; }
      }
    });
    var max = Math.max.apply(null, values.concat([1]));
    wrap.innerHTML = values.map(function (v, n) {
      var h = Math.round((v / max) * 100);
      return '<div class="bar-col"><span>' + labels[n] + '</span><div class="bar" style="height:' + Math.max(h, 4) + '%" title="$' + v + '"></div></div>';
    }).join('');
  }

  function setupAdChartPills() {
    $$('[data-period]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        $$('[data-period]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderAdChart(btn.getAttribute('data-period'));
      });
    });
  }

  function renderAdRecent() {
    var tbody = $id('adRecentBody');
    if (!tbody) return;
    var jobs = readJobs().slice().reverse().slice(0, 6);
    tbody.innerHTML = jobs.length ? jobs.map(function (j) {
      var st = statusInfo(j);
      return '<tr>' +
        '<td><b style="color:var(--heading)">' + esc(j.id) + '</b></td>' +
        '<td>' + esc(j.customer || '—') + '</td>' +
        '<td>' + esc(j.brand) + ' ' + esc(j.model) + '</td>' +
        '<td>' + esc(j.issueLabel) + '</td>' +
        '<td><span class="status-dot ' + st.cls + '">' + st.txt + '</span></td>' +
        '<td><b style="color:var(--heading)">$' + j.cost + '</b></td>' +
        '<td><button class="btn btn-ghost btn-sm" type="button" data-ad-invoice="' + esc(j.id) + '" aria-label="View invoice"><i class="fa-solid fa-file-invoice-dollar"></i></button></td>' +
        '</tr>';
    }).join('') : '<tr><td colspan="7" class="text-center text-muted py-4">No repairs yet.</td></tr>';
  }

  function renderAdMessages() {
    var wrap = $id('adMsgList');
    if (!wrap) return;
    var msgs = readMsgs().slice(0, 3);
    wrap.innerHTML = msgs.length ? msgs.map(function (m) {
      return '<div class="d-flex gap-3 align-items-start neu-flat p-3 mb-3">' +
        '<img class="avatar-sm" src="../assets/img/reviews/' + esc(m.avatar) + '" alt="' + esc(m.from) + '">' +
        '<div class="flex-grow-1 min-w-0">' +
        '  <b class="small d-block" style="color:var(--heading)">' + esc(m.from) + ' <span class="text-muted fw-normal">· ' + esc(m.time) + '</span></b>' +
        '  <p class="small text-muted mb-0">' + esc(m.body) + '</p>' +
        '</div>' +
        (m.read ? '' : '<span class="status-dot status-pending"></span>') +
        '</div>';
    }).join('') : '<p class="text-muted text-center py-4 mb-0">No messages yet.</p>';
  }

  function renderDashboard() {
    renderAdKpis();
    renderAdChart('week');
    setupAdChartPills();
    renderAdRecent();
    renderAdMessages();
  }

  /* ---------- Jobs ---------- */
  function jobOptions(job) {
    return STAGES.map(function (s, i) {
      return '<option value="' + i + '"' + (job.status === i ? ' selected' : '') + '>' + s.label + '</option>';
    }).join('');
  }

  function renderJobs(filterFn) {
    var tbody = $id('jobsBody');
    if (!tbody) return;
    var jobs = readJobs().slice().reverse();
    if (filterFn) jobs = jobs.filter(filterFn);
    tbody.innerHTML = jobs.length ? jobs.map(function (j) {
      var st = statusInfo(j);
      return '<tr>' +
        '<td><b style="color:var(--heading)">' + esc(j.id) + '</b></td>' +
        '<td>' + esc(j.customer || '—') + '</td>' +
        '<td>' + esc(j.brand) + ' ' + esc(j.model) + '<small class="d-block text-muted">' + esc(j.device) + '</small></td>' +
        '<td>' + esc(j.issueLabel) + '</td>' +
        '<td style="min-width:170px"><select class="field field-sm" data-job-status="' + esc(j.id) + '" aria-label="Update status">' + jobOptions(j) + '</select></td>' +
        '<td><b style="color:var(--heading)">$' + j.cost + '</b></td>' +
        '<td><div class="d-flex gap-1 justify-content-end">' +
        '  <button class="btn btn-ghost btn-sm" type="button" data-ad-invoice="' + esc(j.id) + '" aria-label="View invoice"><i class="fa-solid fa-file-invoice-dollar"></i></button>' +
        '  <button class="btn btn-ghost btn-sm" type="button" data-ad-del="' + esc(j.id) + '" aria-label="Delete job"><i class="fa-solid fa-trash"></i></button>' +
        '</div></td>' +
        '</tr>';
    }).join('') : '<tr><td colspan="7" class="text-center text-muted py-4">No jobs match — adjust your filters.</td></tr>';
  }

  function setupJobs() {
    var search = $id('jb-search');
    var statusSel = $id('jb-status');
    var deviceSel = $id('jb-device');

    if (deviceSel) {
      var devs = {};
      readJobs().forEach(function (j) { devs[j.device] = true; });
      readDevs().forEach(function (d) { devs[d.name] = true; });
      Object.keys(devs).sort().forEach(function (d) {
        deviceSel.insertAdjacentHTML('beforeend', '<option value="' + esc(d) + '">' + esc(d) + '</option>');
      });
    }

    function apply() {
      var status = statusSel ? statusSel.value : 'all';
      var device = deviceSel ? deviceSel.value : 'all';
      var q = search ? search.value.trim().toLowerCase() : '';
      renderJobs(function (j) {
        if (status !== 'all') {
          if (status === 'active') { if (j.status >= 5) return false; }
          else if (j.status !== parseInt(status, 10)) return false;
        }
        if (device !== 'all' && j.device !== device) return false;
        if (q) {
          var hay = (j.id + ' ' + (j.customer || '') + ' ' + j.device + ' ' + j.brand + ' ' + j.model + ' ' + j.issueLabel).toLowerCase();
          if (hay.indexOf(q) === -1) return false;
        }
        return true;
      });
    }

    if (statusSel) statusSel.addEventListener('change', apply);
    if (deviceSel) deviceSel.addEventListener('change', apply);
    if (search) search.addEventListener('input', apply);

    document.addEventListener('change', function (e) {
      var sel = e.target && e.target.closest ? e.target.closest('[data-job-status]') : null;
      if (sel) {
        var job = pickJob(sel.getAttribute('data-job-status'));
        if (job) {
          var jobs = readJobs();
          for (var i = 0; i < jobs.length; i++) if (jobs[i].id === job.id) jobs[i].status = parseInt(sel.value, 10);
          writeJobs(jobs);
          apply();
        }
      }
    });

    document.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('[data-ad-del]') : null;
      if (btn && window.confirm('Delete this job permanently?')) {
        var id = btn.getAttribute('data-ad-del');
        var jobs = readJobs().filter(function (j) { return j.id !== id; });
        writeJobs(jobs);
        apply();
      }
    });

    var form = $id('newJobForm');
    if (form) {
      var deviceSel2 = $id('nf-device');
      readDevs().forEach(function (d) {
        if (deviceSel2) deviceSel2.insertAdjacentHTML('beforeend', '<option value="' + esc(d.name) + '">' + esc(d.name) + '</option>');
      });
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var req = ['nf-customer', 'nf-brand', 'nf-model', 'nf-issue', 'nf-cost'];
        var valid = true;
        req.forEach(function (id) {
          var f = $id(id);
          if (!f || !f.value.trim()) { if (f) f.classList.add('invalid'); valid = false; }
          else if (f) f.classList.remove('invalid');
        });
        if (deviceSel2 && !deviceSel2.value) { deviceSel2.classList.add('invalid'); valid = false; }
        if (!valid) return;

        var issueSel = $id('nf-issue');
        var cost = parseFloat($id('nf-cost').value) || 89;
        var job = {
          id: 'VX-' + (2100 + Math.floor(Math.random() * 8900)),
          device: deviceSel2.value,
          brand: $id('nf-brand').value.trim(),
          model: $id('nf-model').value.trim(),
          customer: $id('nf-customer').value.trim(),
          issue: issueSel.value,
          issueLabel: issueSel.options[issueSel.selectedIndex].text,
          desc: ($id('nf-desc').value || '').trim(),
          status: 0,
          createdAt: Date.now(),
          eta: Date.now() + 3 * 86400000,
          cost: cost,
          parts: ['Free diagnosis', 'Labour'],
          invoice: { items: [['Diagnosis & labour', cost]], tax: 0 }
        };
        var jobs = readJobs();
        jobs.push(job);
        writeJobs(jobs);
        apply();
        form.reset();
        if (deviceSel2) deviceSel2.classList.remove('invalid');
        var modal = $id('newJobModal');
        if (modal && typeof bootstrap !== 'undefined' && bootstrap.Modal) bootstrap.Modal.getOrCreateInstance(modal).hide();
      });
    }

    apply();
  }

  /* ---------- Devices ---------- */
  function renderDevices() {
    var wrap = $id('deviceList');
    if (!wrap) return;
    var devs = readDevs();
    var jobs = readJobs();
    if (!devs.length) {
      wrap.innerHTML = '<p class="text-muted text-center py-4 mb-0">No devices yet. Add your first device type.</p>';
      return;
    }
    wrap.innerHTML = devs.map(function (d) {
      var list = jobs.filter(function (j) { return j.device === d.name; });
      var spent = list.reduce(function (a, j) { return a + j.cost; }, 0);
      return '<div class="col-6 col-md-4 col-xl-3">' +
        '<div class="card-neu p-4 h-100 d-flex flex-column">' +
        '  <div class="d-flex justify-content-between align-items-start mb-3">' +
        '    <span class="icon-box" style="color:var(--accent)"><i class="' + esc(d.icon) + '"></i></span>' +
        '    <button class="btn btn-icon btn-sm" type="button" data-ad-del-device="' + esc(d.name) + '" aria-label="Remove device"><i class="fa-solid fa-trash"></i></button>' +
        '  </div>' +
        '  <h3 class="h6">' + esc(d.name) + '</h3>' +
        '  <p class="small text-muted mb-3">' + list.length + ' repair' + (list.length === 1 ? '' : 's') + ' · $' + spent + ' lifetime value</p>' +
        '  <a class="small fw-bold mt-auto" href="jobs.html"><i class="fa-solid fa-arrow-right me-1"></i>View jobs</a>' +
        '</div>' +
        '</div>';
    }).join('');
  }

  function setupDevices() {
    renderDevices();

    var form = $id('addDeviceForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = $id('ad-name');
        var icon = $id('ad-icon');
        if (!name || !name.value.trim()) { if (name) name.classList.add('invalid'); return; }
        var devs = readDevs();
        devs.push({ name: name.value.trim(), icon: icon ? icon.value : 'fa-microchip' });
        write(DEVS_KEY, devs);
        form.reset();
        renderDevices();
      });
    }

    document.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('[data-ad-del-device]') : null;
      if (btn && window.confirm('Remove this device type?')) {
        var name = btn.getAttribute('data-ad-del-device');
        write(DEVS_KEY, readDevs().filter(function (d) { return d.name !== name; }));
        renderDevices();
      }
    });
  }

  /* ---------- Technicians ---------- */
  function techStatusOptions(current) {
    return [
      { v: 'available', l: 'Available' },
      { v: 'onbreak', l: 'On break' },
      { v: 'off', l: 'Off duty' }
    ].map(function (o) {
      return '<option value="' + o.v + '"' + (current === o.v ? ' selected' : '') + '>' + o.l + '</option>';
    }).join('');
  }

  function renderTechs() {
    var wrap = $id('techList');
    if (!wrap) return;
    var techs = readTechs();
    var jobs = readJobs();
    if (!techs.length) {
      wrap.innerHTML = '<p class="text-muted text-center py-4 mb-0">No technicians yet. Add your first team member.</p>';
      return;
    }
    wrap.innerHTML = techs.map(function (t) {
      var count = jobs.filter(function (j) { return j.technician === t.name && j.status < 5; }).length;
      return '<div class="col-md-6">' +
        '<div class="card-neu p-4 h-100">' +
        '  <div class="d-flex align-items-center gap-3 mb-3">' +
        '    <span class="brand-logo" style="width:48px;height:48px;border-radius:50%;font-size:1.05rem"><i class="fa-solid fa-user-gear"></i></span>' +
        '    <div class="flex-grow-1 min-w-0">' +
        '      <b class="d-block" style="color:var(--heading)">' + esc(t.name) + '</b>' +
        '      <small class="text-muted">' + esc(t.role) + ' · ' + esc(t.email) + '</small>' +
        '    </div>' +
        '    <button class="btn btn-icon btn-sm" type="button" data-ad-del-tech="' + esc(t.name) + '" aria-label="Remove technician"><i class="fa-solid fa-trash"></i></button>' +
        '  </div>' +
        '  <div class="d-flex flex-wrap gap-2 mb-3">' + (t.skills || []).map(function (s) { return '<span class="badge-soft">' + esc(s) + '</span>'; }).join('') + '</div>' +
        '  <div class="d-flex flex-wrap align-items-center gap-2">' +
        '    <span class="small fw-bold" style="color:var(--heading)">Status</span>' +
        '    <select class="field field-sm" data-tech-status="' + esc(t.name) + '" aria-label="Technician status">' + techStatusOptions(t.status) + '</select>' +
        '    <span class="ms-auto badge-soft">' + count + ' active job' + (count === 1 ? '' : 's') + '</span>' +
        '  </div>' +
        '</div>' +
        '</div>';
    }).join('');
  }

  function setupTechnicians() {
    renderTechs();

    var form = $id('addTechForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = $id('tf-name');
        var email = $id('tf-email');
        var role = $id('tf-role');
        var skills = $id('tf-skills');
        if (!name || !name.value.trim() || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
          if (name && !name.value.trim()) name.classList.add('invalid');
          if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) email.classList.add('invalid');
          return;
        }
        var techs = readTechs();
        techs.push({
          name: name.value.trim(),
          email: email.value.trim(),
          role: (role && role.value.trim()) ? role.value.trim() : 'General repair',
          skills: skills ? skills.value.split(',').map(function (s) { return s.trim(); }).filter(Boolean) : [],
          status: 'available'
        });
        write(TECHS_KEY, techs);
        form.reset();
        renderTechs();
      });
    }

    document.addEventListener('change', function (e) {
      var sel = e.target && e.target.closest ? e.target.closest('[data-tech-status]') : null;
      if (sel) {
        var techs = readTechs();
        for (var i = 0; i < techs.length; i++) if (techs[i].name === sel.getAttribute('data-tech-status')) techs[i].status = sel.value;
        write(TECHS_KEY, techs);
        renderTechs();
      }
    });

    document.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('[data-ad-del-tech]') : null;
      if (btn && window.confirm('Remove this technician from the team?')) {
        var name = btn.getAttribute('data-ad-del-tech');
        write(TECHS_KEY, readTechs().filter(function (t) { return t.name !== name; }));
        renderTechs();
      }
    });
  }

  /* ---------- Customers ---------- */
  function renderCustomers(list) {
    var tbody = $id('cuBody');
    if (!tbody) return;
    var custs = list || readCusts();
    var jobs = readJobs();
    tbody.innerHTML = custs.length ? custs.map(function (c) {
      var rep = jobs.filter(function (j) { return (j.customer || '').toLowerCase() === c.name.toLowerCase(); });
      var spent = rep.reduce(function (a, j) { return a + j.cost; }, 0);
      return '<tr>' +
        '<td><span class="d-flex align-items-center gap-2"><img class="avatar-sm" src="../assets/img/reviews/' + esc(c.avatar) + '" alt=""><span><b class="small d-block" style="color:var(--heading)">' + esc(c.name) + '</b><small class="text-muted">' + esc(c.email) + '</small></span></span></td>' +
        '<td>' + esc(c.phone) + '</td>' +
        '<td>' + rep.length + '</td>' +
        '<td><b style="color:var(--heading)">$' + spent + '</b></td>' +
        '<td>' + fmtShort(c.since) + '</td>' +
        '<td><div class="d-flex gap-1 justify-content-end">' +
        '  <a class="btn btn-ghost btn-sm" href="jobs.html" aria-label="View jobs"><i class="fa-solid fa-briefcase"></i></a>' +
        '  <button class="btn btn-ghost btn-sm" type="button" data-ad-del-customer="' + esc(c.name) + '" aria-label="Delete customer"><i class="fa-solid fa-trash"></i></button>' +
        '</div></td>' +
        '</tr>';
    }).join('') : '<tr><td colspan="6" class="text-center text-muted py-4">No customers yet.</td></tr>';
  }

  function setupCustomers() {
    function apply() {
      var q = $id('cu-search') ? $id('cu-search').value.trim().toLowerCase() : '';
      renderCustomers(q ? readCusts().filter(function (c) {
        return (c.name + ' ' + c.email + ' ' + c.phone).toLowerCase().indexOf(q) !== -1;
      }) : null);
    }
    var search = $id('cu-search');
    if (search) search.addEventListener('input', apply);

    var form = $id('addCustomerForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = $id('cf-name');
        var email = $id('cf-email');
        var phone = $id('cf-phone');
        if (!name || !name.value.trim() || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
          if (name && !name.value.trim()) name.classList.add('invalid');
          if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) email.classList.add('invalid');
          return;
        }
        var custs = readCusts();
        custs.push({
          name: name.value.trim(),
          email: email.value.trim(),
          phone: (phone && phone.value.trim()) ? phone.value.trim() : '(555) 000-0000',
          avatar: AVATARS[custs.length % AVATARS.length],
          since: Date.now()
        });
        write(CUSTS_KEY, custs);
        form.reset();
        apply();
      });
    }

    document.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('[data-ad-del-customer]') : null;
      if (btn && window.confirm('Delete this customer record?')) {
        var name = btn.getAttribute('data-ad-del-customer');
        write(CUSTS_KEY, readCusts().filter(function (c) { return c.name !== name; }));
        apply();
      }
    });

    apply();
  }

  /* ---------- Invoices ---------- */
  function setupInvoices() {
    function render() {
      var tbody = $id('invBody');
      if (!tbody) return;
      var q = $id('in-search') ? $id('in-search').value.trim().toLowerCase() : '';
      var st = $id('in-status') ? $id('in-status').value : 'all';
      var jobs = readJobs().slice().reverse().filter(function (j) {
        if (st === 'active') { if (j.status >= 5) return false; }
        else if (st === 'completed') { if (j.status !== 5) return false; }
        else if (st !== 'all') return false;
        if (q) {
          var hay = (j.id + ' ' + (j.customer || '') + ' ' + j.brand + ' ' + j.model).toLowerCase();
          if (hay.indexOf(q) === -1) return false;
        }
        return true;
      });

      var paid = 0, pending = 0;
      jobs.forEach(function (j) { if (j.status >= 5) paid += j.cost; else pending += j.cost; });
      var el1 = $id('inPaid'); if (el1) el1.textContent = '$' + paid;
      var el2 = $id('inPending'); if (el2) el2.textContent = '$' + pending;

      tbody.innerHTML = jobs.length ? jobs.map(function (j) {
        var st2 = statusInfo(j);
        return '<tr>' +
          '<td><b style="color:var(--heading)">INV-' + esc(j.id) + '</b><small class="d-block text-muted">' + esc(j.id) + '</small></td>' +
          '<td>' + esc(j.customer || '—') + '</td>' +
          '<td>' + esc(j.brand) + ' ' + esc(j.model) + '</td>' +
          '<td>' + fmtShort(j.createdAt) + '</td>' +
          '<td><span class="status-dot ' + st2.cls + '">' + st2.txt + '</span></td>' +
          '<td><b style="color:var(--heading)">$' + j.cost + '</b></td>' +
          '<td><button class="btn btn-ghost btn-sm" type="button" data-ad-invoice="' + esc(j.id) + '"><i class="fa-solid fa-file-invoice-dollar"></i> View</button></td>' +
          '</tr>';
      }).join('') : '<tr><td colspan="7" class="text-center text-muted py-4">No invoices match your filters.</td></tr>';
    }

    var search = $id('in-search');
    var stSel = $id('in-status');
    if (search) search.addEventListener('input', render);
    if (stSel) stSel.addEventListener('change', render);
    render();
  }

  /* ---------- Messages ---------- */
  function renderMsgs() {
    var wrap = $id('msgList');
    if (!wrap) return;
    var q = $id('ms-search') ? $id('ms-search').value.trim().toLowerCase() : '';
    var msgs = readMsgs().filter(function (m) {
      return !q || (m.from + ' ' + m.subject + ' ' + m.body).toLowerCase().indexOf(q) !== -1;
    });
    wrap.innerHTML = msgs.length ? msgs.map(function (m) {
      return '<div class="card-neu p-3 mb-3 ' + (m.read ? '' : 'msg-unread') + '">' +
        '<div class="d-flex align-items-start gap-3">' +
        '  <img class="avatar-sm" src="../assets/img/reviews/' + esc(m.avatar) + '" alt="' + esc(m.from) + '">' +
        '  <div class="flex-grow-1 min-w-0">' +
        '    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2">' +
        '      <b class="small" style="color:var(--heading)">' + esc(m.from) + (m.read ? '' : ' <span class="badge-soft">New</span>') + '</b>' +
        '      <small class="text-muted">' + esc(m.time) + '</small>' +
        '    </div>' +
        '    <p class="mb-1 small"><b style="color:var(--text)">' + esc(m.subject) + '</b></p>' +
        '    <p class="small text-muted mb-0">' + esc(m.body) + '</p>' +
        '  </div>' +
        '  <div class="d-flex gap-1 flex-shrink-0">' +
        '    <button class="btn btn-ghost btn-sm" type="button" data-msg-open="' + m.id + '" aria-label="Reply"><i class="fa-solid fa-reply"></i></button>' +
        '    <button class="btn btn-ghost btn-sm" type="button" data-msg-del="' + m.id + '" aria-label="Delete message"><i class="fa-solid fa-trash"></i></button>' +
        '  </div>' +
        '</div>' +
        '</div>';
    }).join('') : '<p class="text-muted text-center py-4 mb-0">No messages found.</p>';
  }

  function setupMessages() {
    renderMsgs();
    var search = $id('ms-search');
    if (search) search.addEventListener('input', renderMsgs);

    document.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('[data-msg-open]') : null;
      if (btn) {
        var msgs = readMsgs();
        var msg = null;
        for (var i = 0; i < msgs.length; i++) if (String(msgs[i].id) === btn.getAttribute('data-msg-open')) msg = msgs[i];
        if (!msg) return;
        if (!msg.read) { msg.read = true; write(MSGS_KEY, msgs); updateBadges(); }
        var el = $id('msgFrom'); if (el) el.textContent = msg.from;
        var el2 = $id('msgEmail'); if (el2) el2.textContent = msg.email;
        var el3 = $id('msgSubject'); if (el3) el3.textContent = msg.subject;
        var el4 = $id('msgBody'); if (el4) el4.textContent = msg.body;
        var done = $id('replySent');
        if (done) done.classList.add('d-none');
        var reply = $id('msgReply');
        if (reply) reply.value = '';
        var modal = $id('replyModal');
        if (modal && typeof bootstrap !== 'undefined' && bootstrap.Modal) bootstrap.Modal.getOrCreateInstance(modal).show();
      }
    });

    document.addEventListener('click', function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('[data-msg-del]') : null;
      if (btn && window.confirm('Delete this message?')) {
        var id = btn.getAttribute('data-msg-del');
        write(MSGS_KEY, readMsgs().filter(function (m) { return String(m.id) !== id; }));
        renderMsgs();
        updateBadges();
      }
    });

    var markAll = $id('markAllRead');
    if (markAll) {
      markAll.addEventListener('click', function () {
        var msgs = readMsgs();
        msgs.forEach(function (m) { m.read = true; });
        write(MSGS_KEY, msgs);
        renderMsgs();
        updateBadges();
      });
    }

    var sendForm = $id('sendReplyForm');
    if (sendForm) {
      sendForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var reply = $id('msgReply');
        if (!reply || !reply.value.trim()) { if (reply) reply.classList.add('invalid'); return; }
        var done = $id('replySent');
        if (done) done.classList.remove('d-none');
        reply.value = '';
        updateBadges();
      });
    }
  }

  /* ---------- Settings ---------- */
  function setupSettings() {
    var s = readSettings();

    var map = {
      'st-shopName': 'shopName',
      'st-address': 'address',
      'st-phone': 'phone',
      'st-email': 'email',
      'st-warranty': 'warrantyMonths'
    };
    Object.keys(map).forEach(function (id) {
      var f = $id(id);
      if (f) f.value = s[map[id]] == null ? '' : s[map[id]];
    });

    function bindToggle(el) {
      var key = el.getAttribute('data-setting');
      el.classList.toggle('on', !!s[key]);
      el.setAttribute('aria-pressed', !!s[key]);
      el.addEventListener('click', function () {
        var cur = readSettings();
        cur[key] = !cur[key];
        writeSettings(cur);
        s = cur;
        el.classList.toggle('on', cur[key]);
        el.setAttribute('aria-pressed', cur[key]);
        var done = $id('settingsSaved');
        if (done) done.classList.remove('d-none');
      });
    }
    $$('[data-setting]').forEach(bindToggle);

    var form = $id('settingsForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var cur = readSettings();
        Object.keys(map).forEach(function (id) {
          var f = $id(id);
          if (f) cur[map[id]] = id === 'st-warranty' ? (parseInt(f.value, 10) || 3) : f.value.trim();
        });
        writeSettings(cur);
        s = cur;
        var done = $id('settingsSaved');
        if (done) done.classList.remove('d-none');
      });
    }

    var pwForm = $id('pwForm');
    if (pwForm) {
      pwForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var cur = $id('pw-current');
        var nw = $id('pw-new');
        var conf = $id('pw-confirm');
        var ok = $id('pwDone');
        var bad = $id('pwError');
        if (bad) bad.classList.add('d-none');
        if (ok) ok.classList.add('d-none');

        var users = read('vx_users') || [];
        var sess = null;
        try { sess = JSON.parse(localStorage.getItem('vx_session')); } catch (err) {}
        var match = users.filter(function (u) { return sess && u.email === sess.email; })[0];
        if (!match || match.password !== cur.value) {
          if (cur) cur.classList.add('invalid');
          if (bad) bad.classList.remove('d-none');
          return;
        }
        if (!nw.value || nw.value.length < 6 || nw.value !== conf.value) {
          if (nw) nw.classList.add('invalid');
          if (conf) conf.classList.add('invalid');
          if (bad) bad.classList.remove('d-none');
          return;
        }
        for (var i = 0; i < users.length; i++) if (users[i].email === match.email) users[i].password = nw.value;
        write('vx_users', users);
        pwForm.reset();
        if (ok) ok.classList.remove('d-none');
      });
    }
  }

  /* ---------- Init dispatcher ---------- */
  function init() {
    seed();
    updateBadges();
    setupInvoiceButtons();
    var page = document.body.getAttribute('data-admin') || 'dashboard';
    if (page === 'jobs') setupJobs();
    else if (page === 'devices') setupDevices();
    else if (page === 'technicians') setupTechnicians();
    else if (page === 'customers') setupCustomers();
    else if (page === 'invoices') setupInvoices();
    else if (page === 'messages') setupMessages();
    else if (page === 'settings') setupSettings();
    else renderDashboard();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
