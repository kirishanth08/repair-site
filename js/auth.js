/* ==========================================================================
   VOLTIX — Client-side Auth (demo)
   Stores accounts in localStorage (key: vx_users) and the active session
   in localStorage (key: vx_session). Passwords are stored as a hash so they
   are not kept in plain text. For a production site replace this module with
   server-side authentication.
   ========================================================================== */

(function () {
  'use strict';

  var USERS_KEY = 'vx_users';
  var SESSION_KEY = 'vx_session';

  function readUsers() {
    try {
      var list = JSON.parse(localStorage.getItem(USERS_KEY));
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function writeUsers(list) {
    try { localStorage.setItem(USERS_KEY, JSON.stringify(list)); } catch (e) {}
  }

  function hash(str) {
    var h1 = 0xdeadbeef, h2 = 0x41c6ce57, ch;
    for (var i = 0; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
  }

  var Auth = {
    USERS_KEY: USERS_KEY,
    SESSION_KEY: SESSION_KEY,

    hash: hash,

    register: function (data) {
      var users = readUsers();
      var email = data.email.trim().toLowerCase();
      for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) {
          return { ok: false, error: 'An account with this email already exists.' };
        }
      }
      users.push({
        fname: data.fname.trim(),
        lname: data.lname.trim(),
        phone: data.phone || '',
        email: email,
        pass: hash(data.password),
        role: 'customer'
      });
      writeUsers(users);
      return { ok: true };
    },

    login: function (email, password, role) {
      var users = readUsers();
      var u = null;
      email = email.trim().toLowerCase();
      for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) { u = users[i]; break; }
      }
      if (!u || u.pass !== hash(password)) {
        return { ok: false, error: 'Incorrect email or password.' };
      }
      var session = { fname: u.fname, lname: u.lname, phone: u.phone || '', email: u.email, role: role === 'admin' ? 'admin' : 'customer' };
      try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch (e) {}
      return { ok: true, user: session };
    },

    logout: function () {
      try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
    },

    current: function () {
      try {
        var s = JSON.parse(localStorage.getItem(SESSION_KEY));
        return s && s.email ? s : null;
      } catch (e) {
        return null;
      }
    },

    isAuthed: function () {
      return !!Auth.current();
    }
  };

  window.Auth = Auth;

  /* ---------- Auth page wiring ---------- */

  function $(id) {
    return document.getElementById(id.charAt(0) === '#' ? id.slice(1) : id);
  }
  function emailOk(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }
  function showMsg(id, text, ok) {
    var el = $(id);
    if (!el) return;
    el.textContent = text;
    el.classList.remove('alert-danger', 'alert-success', 'd-none');
    el.classList.add(ok ? 'alert-success' : 'alert-danger');
  }
  function hideMsg(id) {
    var el = $(id);
    if (el) el.classList.add('d-none');
  }
  function clearInvalid(form) {
    var els = form.querySelectorAll('.invalid');
    for (var i = 0; i < els.length; i++) els[i].classList.remove('invalid');
  }

  /* Register */
  var regForm = document.querySelector('form[data-auth-form="register"]');
  if (regForm) {
    regForm.addEventListener('submit', function (e) {
      e.preventDefault();
      hideMsg('authMsg');
      clearInvalid(regForm);
      var valid = true;

      var fname = $('#rg-fname'), lname = $('#rg-lname'), email = $('#rg-email');
      var phone = $('#rg-phone');
      var pass = $('#registerPassword'), conf = $('#registerConfirm');
      var terms = regForm.querySelector('[required][type="checkbox"]');

      [[fname, 'Please enter your first name.'],
       [lname, 'Please enter your last name.']].forEach(function (pair) {
        var bad = !pair[0] || !pair[0].value.trim();
        if (pair[0]) { pair[0].classList.toggle('invalid', bad); if (bad) valid = false; }
      });

      if (!email || !email.value.trim() || !emailOk(email.value)) {
        if (email) email.classList.add('invalid');
        valid = false;
      }
      if (!pass || !pass.value || pass.value.length < 8) {
        if (pass) pass.classList.add('invalid');
        valid = false;
      }
      if (!conf || !conf.value || conf.value !== pass.value) {
        if (conf) conf.classList.add('invalid');
        valid = false;
      }
      if (terms && !terms.checked) { terms.classList.add('invalid'); valid = false; }

      if (!valid) return;

      var roleInput = regForm.querySelector('[name="role"]');
      var res = Auth.register({
        fname: fname.value,
        lname: lname.value,
        phone: phone ? phone.value : '',
        email: email.value,
        password: pass.value,
        role: roleInput ? roleInput.value : 'customer'
      });

      if (!res.ok) {
        showMsg('authMsg', res.error, false);
        if (email) email.classList.add('invalid');
        return;
      }
      showMsg('authMsg', 'Account created successfully! Redirecting you to sign in…', true);
      var btn = regForm.querySelector('[type="submit"]');
      if (btn) btn.disabled = true;
      setTimeout(function () {
        window.location.href = 'login.html?registered=1';
      }, 1800);
    });

    var pass = $('#registerPassword'), conf = $('#registerConfirm');
    if (pass && conf) {
      conf.addEventListener('input', function () {
        var bad = conf.value && conf.value !== pass.value;
        conf.classList.toggle('invalid', bad);
      });
    }
  }

  /* Login */
  var loginForm = document.querySelector('form[data-auth-form="login"]');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      hideMsg('authMsg');
      clearInvalid(loginForm);
      var valid = true;

      var email = $('#lg-email'), pass = $('#passwordField');

      if (!email || !email.value.trim() || !emailOk(email.value)) {
        if (email) email.classList.add('invalid');
        valid = false;
      }
      if (!pass || !pass.value) {
        if (pass) pass.classList.add('invalid');
        valid = false;
      }
      if (!valid) return;

      var roleInput = loginForm.querySelector('[name="role"]');
      var res = Auth.login(email.value, pass.value, roleInput ? roleInput.value : 'customer');

      if (!res.ok) {
        showMsg('authMsg', res.error, false);
        if (email) email.classList.add('invalid');
        return;
      }
      var redirect = $('#redirectTo');
      var next = redirect ? redirect.value : 'dashboard.html';
      window.location.href = next;
    });
  }

  /* "registered" success notice shown on the login page */
  if (document.body.getAttribute('data-page') === 'login') {
    if (window.location.search.indexOf('registered=1') !== -1) {
      showMsg('authMsg', 'Account created! Sign in below to continue.', true);
    }
  }
})();
