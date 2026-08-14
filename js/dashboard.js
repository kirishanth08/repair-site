/* ==========================================================================
   VOLTIX — Customer Repair Dashboard (multi-page)
   Demo-only, localStorage-backed. Runs on every customer dashboard page and
   activates the relevant module from <body data-dash="...">:
   - overview: KPIs, status at a glance, spending trend, recent repairs
    - new-repair: device repair request form
    - track: live status stepper (diagnosis → under repair → ready for pickup)
    - eta: estimated completion time
    - account: profile, notification preferences, security
    Replace with a real backend for production.
   ========================================================================== */

(function () {
  'use strict';

  var JOBS_KEY = 'vx_jobs';
  var STAGES = [
    { key: 'received', label: 'Received', icon: 'fa-solid fa-inbox' },
    { key: 'diagnosis', label: 'Diagnosis', icon: 'fa-solid fa-stethoscope' },
    { key: 'repair', label: 'Under Repair', icon: 'fa-solid fa-screwdriver-wrench' },
    { key: 'qa', label: 'Quality Check', icon: 'fa-solid fa-clipboard-check' },
    { key: 'ready', label: 'Ready for Pickup', icon: 'fa-solid fa-box-open' },
    { key: 'done', label: 'Completed', icon: 'fa-solid fa-circle-check' }
  ];

  function readJobs() {
    try {
      var list = JSON.parse(localStorage.getItem(JOBS_KEY));
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }
  function writeJobs(list) {
    try { localStorage.setItem(JOBS_KEY, JSON.stringify(list)); } catch (e) {}
  }
  function $id(id) { return document.getElementById(id); }
  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
  }
  function fmtShort(ts) { return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }); }
  function fmtFull(ts) { return new Date(ts).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }); }
  function daysLeft(ts) { return Math.ceil((ts - Date.now()) / 86400000); }

  function seed() {
    if (readJobs().length) return;
    var now = Date.now();
    var day = 86400000;
    var jobs = [
      {
        id: 'VX-2048',
        device: 'Smartphone', brand: 'Apple', model: 'iPhone 14',
        customer: 'Emma Lewis', technician: 'Dana Brooks',
        issue: 'screen', issueLabel: 'Cracked screen',
        desc: 'Cracked front glass, touch still works in some areas.',
        status: 3, createdAt: now - 2 * day, eta: now + 1 * day,
        cost: 149, parts: ['Genuine OLED display', 'Adhesive kit', 'Screen calibration'],
        invoice: { items: [['Genuine OLED display', 129], ['Screen calibration', 20]], tax: 0 }
      },
      {
        id: 'VX-2047',
        device: 'Laptop', brand: 'Dell', model: 'XPS 15',
        customer: 'Marcus Lee', technician: 'Leo Marsh',
        issue: 'battery', issueLabel: 'Battery draining fast',
        desc: 'Battery health at 52%, dies within an hour.',
        status: 2, createdAt: now - 1 * day, eta: now + 2 * day,
        cost: 119, parts: ['High-capacity cell (98Wh)', 'Thermal service'],
        invoice: { items: [['High-capacity battery cell', 109], ['Battery calibration', 10]], tax: 0 }
      },
      {
        id: 'VX-2046',
        device: 'Tablet', brand: 'Samsung', model: 'Galaxy Tab S8',
        customer: 'Hannah Park', technician: 'Rina Patel',
        issue: 'charging', issueLabel: 'Not charging',
        desc: 'Port is loose, only charges with pressure on the cable.',
        status: 1, createdAt: now - 3 * day, eta: now + 1 * day,
        cost: 89, parts: ['USB-C port assembly'],
        invoice: { items: [['USB-C port replacement', 79], ['Port cleaning', 10]], tax: 0 }
      },
      {
        id: 'VX-2045',
        device: 'Smartphone', brand: 'Google', model: 'Pixel 7',
        customer: 'Omar Farouk', technician: 'Sam Carter',
        issue: 'battery', issueLabel: 'Battery replacement',
        desc: 'Battery drains fast, phone restarts below 20%.',
        status: 5, createdAt: now - 6 * day, eta: now - 4 * day,
        cost: 69, parts: ['High-capacity cell'],
        invoice: { items: [['Battery replacement', 59], ['Health calibration', 10]], tax: 0 }
      },
      {
        id: 'VX-2044',
        device: 'Laptop', brand: 'HP', model: 'Pavilion 15',
        customer: 'Grace Liu', technician: 'Leo Marsh',
        issue: 'software', issueLabel: 'Virus / malware',
        desc: 'Ransomware locked the system, need cleanup and file recovery.',
        status: 5, createdAt: now - 9 * day, eta: now - 7 * day,
        cost: 189, parts: ['Malware removal', 'Data recovery', 'OS reinstall'],
        invoice: { items: [['Virus & malware removal', 79], ['Data recovery', 60], ['OS reinstall', 50]], tax: 0 }
      }
    ];
    writeJobs(jobs);
  }

  function lastActive() {
    var jobs = readJobs();
    for (var i = 0; i < jobs.length; i++) if (jobs[i].status < 5) return jobs[i];
    return null;
  }
  function activeJobs() {
    return readJobs().filter(function (j) { return j.status < 5; });
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

  /* ---------- Status stepper ---------- */
  function renderStepper(job) {
    var wrap = $id('statusStepper');
    var info = $id('activeJobInfo');
    if (!wrap) return;

    if (!job) {
      wrap.innerHTML =
        '<div class="text-center py-5">' +
        '  <i class="fa-solid fa-inbox" style="font-size:2.4rem;color:var(--text-muted)"></i>' +
        '  <p class="text-muted mt-3 mb-0">No active repairs. Submit a new request below.</p>' +
        '</div>';
      if (info) info.innerHTML = '';
      return;
    }

    var idx = job.status;
    wrap.style.setProperty('--progress', ((idx) / (STAGES.length - 1)) * 100 + '%');

    wrap.innerHTML = STAGES.map(function (s, i) {
      var cls = i < idx ? 'done' : (i === idx ? 'current' : '');
      return '<div class="status-step ' + cls + '">' +
        '<div class="dot"><i class="' + s.icon + '"></i></div>' +
        '<b>' + s.label + '</b>' +
        '<small>' + (i < idx ? 'Complete' : (i === idx ? 'In progress' : 'Pending')) + '</small>' +
        '</div>';
    }).join('');

    if (info) {
      var stageName = STAGES[idx].label;
      info.innerHTML =
        '<span class="badge-soft"><i class="fa-solid fa-circle-info me-1"></i>Job ' + esc(job.id) + '</span> ' +
        '<span class="badge-soft ms-2"><i class="fa-solid fa-box me-1"></i>' + esc(job.device) + ' · ' + esc(job.brand) + ' ' + esc(job.model) + '</span>' +
        '<p class="mt-3 mb-2 fw-bold" style="color:var(--heading)">Current stage: <span style="color:var(--accent)">' + stageName + '</span></p>' +
        '<p class="mb-0 text-muted small"><i class="fa-solid fa-bolt me-1" style="color:var(--gold)"></i> Issue: ' + esc(job.issueLabel) + '</p>';
    }

    var eta = $id('etaDate');
    var etaChip = $id('etaChip');
    if (eta) eta.textContent = fmtFull(job.eta);
    if (etaChip) etaChip.textContent = 'Estimated completion: ' + fmtShort(job.eta);
  }

  /* ---------- KPI cards ---------- */
  function renderKpis() {
    var jobs = readJobs();
    var active = jobs.filter(function (j) { return j.status < 4; }).length;
    var ready = jobs.filter(function (j) { return j.status === 4; }).length;
    var spent = 0;
    jobs.forEach(function (j) { spent += j.cost; });
    var el = $id('kpiActive'); if (el) el.textContent = active;
    var el2 = $id('kpiReady'); if (el2) el2.textContent = ready;
    var el3 = $id('kpiSpent'); if (el3) el3.textContent = '$' + spent;
    var el4 = $id('kpiJobs'); if (el4) el4.textContent = jobs.length;
  }

  /* ---------- Overview: status summary chips ---------- */
  function renderStatusSummary() {
    var wrap = $id('statusSummary');
    if (!wrap) return;
    var counts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    readJobs().forEach(function (j) { counts[j.status] = (counts[j.status] || 0) + 1; });
    wrap.innerHTML = STAGES.map(function (s, i) {
      return '<div class="col-6 col-md-4 col-lg-2">' +
        '<div class="stage-chip neu-flat p-3">' +
        '  <i class="' + s.icon + '"></i>' +
        '  <div><b>' + (counts[i] || 0) + '</b><small>' + s.label + '</small></div>' +
        '</div>' +
        '</div>';
    }).join('');
  }

  /* ---------- Overview: spending trend (last 6 months) ---------- */
  function renderSpendingChart() {
    var wrap = $id('spendChart');
    if (!wrap) return;
    var jobs = readJobs();
    var now = new Date();
    var months = [];
    var names = [];
    for (var i = 5; i >= 0; i--) {
      var d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      names.push(d.toLocaleDateString(undefined, { month: 'short' }));
      months.push(d.getTime());
    }
    var buckets = months.map(function () { return 0; });
    jobs.forEach(function (j) {
      var t = new Date(j.createdAt);
      for (var k = 0; k < months.length; k++) {
        var m = new Date(months[k]);
        if (t.getFullYear() === m.getFullYear() && t.getMonth() === m.getMonth()) { buckets[k] += j.cost; break; }
      }
    });
    var max = Math.max.apply(null, buckets.concat([1]));
    wrap.innerHTML = buckets.map(function (v, k) {
      var h = Math.round((v / max) * 100);
      return '<div class="bar-col"><span>' + names[k] + '</span>' +
        '<div class="bar" style="height:' + Math.max(h, 4) + '%" title="$' + v + '"></div></div>';
    }).join('');
  }

  /* ---------- Overview: recent repairs ---------- */
  function renderRecent() {
    var wrap = $id('recentJobs');
    if (!wrap) return;
    var jobs = readJobs().slice().reverse().slice(0, 5);
    if (!jobs.length) {
      wrap.innerHTML = '<p class="text-muted text-center py-4 mb-0">No repairs yet. Submit your first request to get started.</p>';
      return;
    }
    wrap.innerHTML = jobs.map(function (j) {
      var st = statusInfo(j);
      return '<div class="recent-item neu-flat p-3 d-flex align-items-center gap-3">' +
        '<span class="brand-logo" style="width:46px;height:46px;border-radius:14px;font-size:1.05rem"><i class="fa-solid fa-microchip"></i></span>' +
        '<div class="flex-grow-1 min-w-0">' +
        '  <b class="small d-block" style="color:var(--heading)">' + esc(j.brand) + ' ' + esc(j.model) + '</b>' +
        '  <small class="text-muted d-block">' + esc(j.id) + ' · ' + esc(j.issueLabel) + '</small>' +
        '</div>' +
        '<span class="status-dot ' + st.cls + '">' + st.txt + '</span>' +
        '</div>';
    }).join('');
  }

  /* ---------- Overview: next pickup / ETA ---------- */
  function renderNextPickup() {
    var wrap = $id('nextPickup');
    if (!wrap) return;
    var ready = null, soonest = null;
    readJobs().forEach(function (j) {
      if (j.status === 4) { if (!ready || j.eta < ready.eta) ready = j; }
      else if (j.status < 4) { if (!soonest || j.eta < soonest.eta) soonest = j; }
    });
    var target = ready || soonest;
    if (!target) {
      wrap.innerHTML = '<div class="text-center py-4"><p class="text-muted mb-0">No repairs in progress.</p></div>';
      return;
    }
    var d = daysLeft(target.eta);
    wrap.innerHTML =
      '<div class="text-center py-2">' +
      '  <div class="icon-box mx-auto mb-3" style="width:64px;height:64px;font-size:1.5rem"><i class="fa-regular fa-calendar-check"></i></div>' +
      '  <h3 class="h5 mb-1">' + fmtFull(target.eta) + '</h3>' +
      '  <p class="text-muted mb-3">' + esc(target.brand) + ' ' + esc(target.model) + ' (' + esc(target.id) + ')</p>' +
      '  <span class="badge-soft">' + (target.status === 4 ? 'Ready for pickup' : (d > 0 ? 'ETA in ' + d + (d === 1 ? ' day' : ' days') : 'Due soon')) + '</span>' +
      '  <div class="mt-4"><a class="btn btn-accent btn-block" href="dashboard-track.html"><i class="fa-solid fa-screwdriver-wrench"></i> Track now</a></div>' +
      '</div>';
  }

  function renderOverview() {
    renderStepper(lastActive());
    renderStatusSummary();
    renderSpendingChart();
    renderRecent();
    renderNextPickup();
  }

  /* ---------- New repair request ---------- */
  function setupForm() {
    var form = $id('repairForm');
    if (!form) return;

    var deviceInput = $id('rf-device');
    var cards = document.querySelectorAll('.device-card[data-device]');
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        cards.forEach(function (c) { c.classList.remove('active', 'invalid'); });
        card.classList.add('active');
        if (deviceInput) deviceInput.value = card.getAttribute('data-device');
      });
    });

    var brandInput = $id('rf-brand');
    var modelInput = $id('rf-model');
    var issueInput = $id('rf-issue');
    var descInput = $id('rf-desc');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      [brandInput, modelInput, issueInput, descInput].forEach(function (f) {
        if (!f || !f.value.trim()) { if (f) f.classList.add('invalid'); valid = false; }
      });
      if (!deviceInput || !deviceInput.value) {
        cards.forEach(function (c) { c.classList.add('invalid'); });
        valid = false;
      }
      if (!valid) return;

      var issueLabel = issueInput.options[issueInput.selectedIndex].text;
      var cost = { screen: 99, battery: 69, charging: 89, motherboard: 149, water: 129, camera: 79, software: 99, general: 89 }[issueInput.value] || 89;

      var job = {
        id: 'VX-' + (2000 + 100 + Math.floor(Math.random() * 9000)),
        device: deviceInput.value,
        brand: brandInput.value.trim(),
        model: modelInput.value.trim(),
        issue: issueInput.value,
        issueLabel: issueLabel,
        desc: descInput.value.trim(),
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

      form.classList.add('d-none');
      var done = $id('repairDone');
      if (done) {
        done.classList.remove('d-none');
        var num = $id('newJobId');
        if (num) num.textContent = job.id;
        var track = $id('newJobTrack');
        if (track) track.setAttribute('href', 'dashboard-track.html');
      }
      renderKpis();
    });

    var startNew = $id('startNewRepair');
    if (startNew) {
      startNew.addEventListener('click', function () {
        var done = $id('repairDone');
        if (done) done.classList.add('d-none');
        form.classList.remove('d-none');
        form.reset();
        cards.forEach(function (c) { c.classList.remove('active', 'invalid'); });
        if (deviceInput) deviceInput.value = '';
      });
    }
  }

  /* ---------- Track page ---------- */
  function setupTrack() {
    var current = lastActive();
    var pick = $id('trackJob');

    function render() {
      var jobs = readJobs();
      var fresh = null;
      for (var i = 0; i < jobs.length; i++) if (current && jobs[i].id === current.id) { fresh = jobs[i]; break; }
      if (!fresh) fresh = jobs.filter(function (j) { return j.status < 5; })[0] || null;
      current = fresh;
      renderStepper(current);
      renderKpis();
    }

    var actives = activeJobs();
    if (pick && actives.length > 1) {
      pick.innerHTML = actives.map(function (j) {
        return '<option value="' + esc(j.id) + '">' + esc(j.id) + ' — ' + esc(j.brand) + ' ' + esc(j.model) + '</option>';
      }).join('');
      var pickWrap = pick.parentElement;
      if (pickWrap) pickWrap.classList.remove('d-none');
      pick.addEventListener('change', function () {
        current = pickJob(pick.value);
        renderStepper(current);
      });
    }

    render();
  }

  /* ---------- ETA page ---------- */
  function setupEta() {
    var actives = activeJobs();
    var wrap = $id('etaActive');
    if (wrap) {
      if (!actives.length) {
        wrap.innerHTML =
          '<div class="text-center py-5">' +
          '  <i class="fa-solid fa-clock" style="font-size:2.4rem;color:var(--text-muted)"></i>' +
          '  <p class="text-muted mt-3 mb-4">No repairs in progress right now.</p>' +
          '  <a class="btn btn-accent" href="dashboard-new-repair.html"><i class="fa-solid fa-plus"></i> Request a repair</a>' +
          '</div>';
      } else {
        var j = actives[0];
        var d = daysLeft(j.eta);
        var st = statusInfo(j);
        wrap.innerHTML =
          '<div class="text-center py-3">' +
          '  <span class="badge-soft mb-3 d-inline-flex"><i class="fa-solid fa-clock me-1"></i>' + st.txt + '</span>' +
          '  <div class="icon-box mx-auto my-3" style="width:84px;height:84px;font-size:1.9rem"><i class="fa-regular fa-calendar-check"></i></div>' +
          '  <h3 class="h4 mb-1">' + fmtFull(j.eta) + '</h3>' +
          '  <p class="text-muted mb-3">' + esc(j.brand) + ' ' + esc(j.model) + ' · ' + esc(j.id) + '</p>' +
          '  <span class="badge-soft" style="background:linear-gradient(135deg,var(--accent),var(--accent-2));color:#fff">' +
          (d > 0 ? d + (d === 1 ? ' day left' : ' days left') : (j.status === 4 ? 'Ready for pickup' : 'Due soon')) +
          '</span>' +
          '</div>';
      }
    }

    var list = $id('etaList');
    if (list) {
      list.innerHTML = actives.length ? actives.map(function (j) {
        var d = daysLeft(j.eta);
        var st = statusInfo(j);
        return '<tr>' +
          '<td><b style="color:var(--heading)">' + esc(j.id) + '</b></td>' +
          '<td>' + esc(j.brand) + ' ' + esc(j.model) + '</td>' +
          '<td><span class="status-dot ' + st.cls + '">' + st.txt + '</span></td>' +
          '<td>' + fmtFull(j.eta) + '</td>' +
          '<td><span class="badge-soft">' + (d > 0 ? d + (d === 1 ? ' day left' : ' days left') : (j.status === 4 ? 'Ready now' : 'Due soon')) + '</span></td>' +
          '<td><a class="btn btn-ghost btn-sm" href="dashboard-track.html"><i class="fa-solid fa-arrow-right"></i> Track</a></td>' +
          '</tr>';
      }).join('') : '<tr><td colspan="6" class="text-center text-muted py-4">No active repairs.</td></tr>';
    }
  }

  /* ---------- Account page (profile, preferences, security) ---------- */
  function setupAccount() {
    if (typeof Auth === 'undefined' || !Auth.current()) {
      window.location.href = 'login.html';
      return;
    }
    var s = Auth.current();
    var users = [];
    try { users = JSON.parse(localStorage.getItem(Auth.USERS_KEY)) || []; } catch (e) {}
    var idx = -1;
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === s.email) { idx = i; break; }
    }
    if (idx === -1) {
      window.location.href = 'login.html';
      return;
    }
    var user = users[idx];

    function save() {
      try { localStorage.setItem(Auth.USERS_KEY, JSON.stringify(users)); } catch (e) {}
    }

    /* Profile form */
    var fName = $id('acctFname'), lName = $id('acctLname');
    var phone = $id('acctPhone'), email = $id('acctEmail');
    if (fName) fName.value = user.fname || '';
    if (lName) lName.value = user.lname || '';
    if (phone) phone.value = user.phone || '';
    if (email) email.value = user.email || '';

    function flash(id, text, ok) {
      var el = $id(id);
      if (!el) return;
      el.textContent = text;
      el.className = 'alert ' + (ok ? 'alert-success' : 'alert-danger');
      el.classList.remove('d-none');
      clearTimeout(el._t);
      el._t = setTimeout(function () { el.classList.add('d-none'); }, 3500);
    }

    var acctForm = $id('acctForm');
    if (acctForm) {
      acctForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var ok = true;
        [fName, lName].forEach(function (f) {
          if (!f || !f.value.trim()) { if (f) f.classList.add('invalid'); ok = false; }
        });
        var mailOk = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        if (email) {
          if (!mailOk) { email.classList.add('invalid'); ok = false; }
          else email.classList.remove('invalid');
        }
        [fName, lName, phone].forEach(function (f) { if (f && f.value.trim()) f.classList.remove('invalid'); });
        if (!ok) { flash('acctMsg', 'Please check the highlighted fields.', false); return; }

        var newEmail = email.value.trim().toLowerCase();
        if (newEmail !== user.email) {
          for (var k = 0; k < users.length; k++) {
            if (users[k].email === newEmail) {
              email.classList.add('invalid');
              flash('acctMsg', 'That email is already linked to another account.', false);
              return;
            }
          }
        }

        user.fname = fName.value.trim();
        user.lname = lName.value.trim();
        user.phone = phone ? phone.value.trim() : '';
        user.email = newEmail;
        save();
        try {
          localStorage.setItem(Auth.SESSION_KEY, JSON.stringify({
            fname: user.fname, lname: user.lname, phone: user.phone, email: user.email, role: user.role
          }));
        } catch (err) {}
        var uname = $id('sideUserName');
        if (uname) uname.textContent = user.fname;
        var greet = $id('topGreeting');
        if (greet) greet.textContent = 'Welcome back, ' + user.fname;
        flash('acctMsg', 'Profile updated successfully.', true);
      });
    }

    /* Notification preferences */
    var prefs = user.prefs || {};
    function renderPrefs() {
      document.querySelectorAll('.switch[data-pref]').forEach(function (sw) {
        sw.classList.toggle('on', !!prefs[sw.getAttribute('data-pref')]);
        sw.setAttribute('aria-pressed', !!prefs[sw.getAttribute('data-pref')] ? 'true' : 'false');
      });
    }
    function bindPrefs() {
      document.querySelectorAll('.switch[data-pref]').forEach(function (sw) {
        sw.addEventListener('click', function () {
          var key = sw.getAttribute('data-pref');
          prefs[key] = !prefs[key];
          sw.classList.toggle('on', prefs[key]);
          sw.setAttribute('aria-pressed', prefs[key] ? 'true' : 'false');
          user.prefs = prefs;
          save();
        });
      });
    }
    renderPrefs();
    bindPrefs();

    /* Change password */
    var pwForm = $id('pwForm');
    if (pwForm) {
      pwForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var cur = $id('pwCurrent'), np = $id('pwNew'), cf = $id('pwConfirm');
        var ok = true;
        [cur, np, cf].forEach(function (f) {
          if (f) f.classList.remove('invalid');
        });
        if (!cur || !cur.value) { if (cur) cur.classList.add('invalid'); ok = false; }
        if (typeof Auth.hash === 'function' && cur && cur.value && Auth.hash(cur.value) !== user.pass) {
          cur.classList.add('invalid');
          flash('pwMsg', 'Your current password is incorrect.', false);
          return;
        }
        if (!np || !np.value || np.value.length < 8) {
          if (np) np.classList.add('invalid');
          flash('pwMsg', 'New password must be at least 8 characters.', false);
          return;
        }
        if (!cf || !cf.value || cf.value !== np.value) {
          if (cf) cf.classList.add('invalid');
          flash('pwMsg', 'New passwords do not match.', false);
          return;
        }
        if (typeof Auth.hash === 'function') {
          user.pass = Auth.hash(np.value);
          save();
          pwForm.reset();
          flash('pwMsg', 'Password changed successfully.', true);
        }
      });
    }

    /* Account stats */
    var stats = $id('acctStats');
    if (stats) {
      var jobs = readJobs();
      var total = jobs.length;
      var active = jobs.filter(function (j) { return j.status < 5; }).length;
      var spent = 0;
      jobs.forEach(function (j) { spent += j.cost; });
      stats.innerHTML =
        '<div class="acct-stat"><span class="icon-box"><i class="fa-solid fa-microchip"></i></span><div><b>' + total + '</b><small>Total repairs</small></div></div>' +
        '<div class="acct-stat"><span class="icon-box"><i class="fa-solid fa-gears"></i></span><div><b>' + active + '</b><small>In progress</small></div></div>' +
        '<div class="acct-stat"><span class="icon-box"><i class="fa-solid fa-dollar-sign"></i></span><div><b>$' + spent + '</b><small>Total billed</small></div></div>';
    }
  }

  /* ---------- Init dispatcher ---------- */
  function init() {
    seed();
    var page = document.body.getAttribute('data-dash') || 'overview';
    if (page === 'new-repair') setupForm();
    else if (page === 'track') setupTrack();
    else if (page === 'eta') setupEta();
    else if (page === 'account') setupAccount();
    else { renderKpis(); renderOverview(); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
