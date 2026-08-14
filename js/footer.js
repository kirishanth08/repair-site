/* ==========================================================================
   VOLTIX — Reusable Footer Module
   Include via <div id="footer"></div> and <script src="js/footer.js"></script>
   Edit this single file to update the footer on every page.
   ========================================================================== */

(function () {
  'use strict';

  var brandIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M13 2 4.5 13.5H11L9.5 22 19 9.5h-6.5L13 2Z"/>' +
    '</svg>';

  var html =
    '<footer class="main-footer bg-soft" aria-label="Site footer">' +
    '  <div class="container">' +
    '    <div class="footer-top">' +
    '      <div class="footer-brand footer-col">' +
    '        <a class="brand" href="index.html" aria-label="Voltix - Home">' +
    '          <span class="brand-logo">' + brandIcon + '</span>' +
    '          <span><span class="brand-name">Voltix</span><span class="brand-tag">Repair Lab</span></span>' +
    '        </a>' +
    '        <p>Voltix is a certified electronics repair lab fixing smartphones, laptops, tablets and home electronics — with a 6-month warranty, transparent pricing and live repair tracking.</p>' +
    '        <div class="d-flex gap-2">' +
    '          <a class="soc" href="https://www.facebook.com" target="_blank" rel="noopener" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>' +
    '          <a class="soc" href="https://www.instagram.com" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>' +
    '          <a class="soc" href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter / X"><i class="fa-brands fa-x-twitter"></i></a>' +
    '          <a class="soc" href="https://www.youtube.com" target="_blank" rel="noopener" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>' +
    '        </div>' +
    '      </div>' +
    '      <div class="footer-col">' +
    '        <h3 class="footer-head">Quick Links</h3>' +
    '        <ul class="footer-links">' +
    '          <li><a href="index.html"><i class="fa-solid fa-angle-right"></i> Home</a></li>' +
    '          <li><a href="about.html"><i class="fa-solid fa-angle-right"></i> About Us</a></li>' +
    '          <li><a href="services.html"><i class="fa-solid fa-angle-right"></i> Services</a></li>' +
    '          <li><a href="pricing.html"><i class="fa-solid fa-angle-right"></i> Pricing</a></li>' +
    '          <li><a href="blog.html"><i class="fa-solid fa-angle-right"></i> Blog</a></li>' +
    '          <li><a href="contact.html"><i class="fa-solid fa-angle-right"></i> Contact</a></li>' +
    '        </ul>' +
    '      </div>' +
    '      <div class="footer-col">' +
    '        <h3 class="footer-head">Repair Services</h3>' +
    '        <ul class="footer-links">' +
    '          <li><a href="service-details.html?service=screen-replacement"><i class="fa-solid fa-angle-right"></i> Screen Replacement</a></li>' +
    '          <li><a href="service-details.html?service=battery-replacement"><i class="fa-solid fa-angle-right"></i> Battery Replacement</a></li>' +
    '          <li><a href="service-details.html?service=motherboard-repair"><i class="fa-solid fa-angle-right"></i> Motherboard Repair</a></li>' +
    '          <li><a href="service-details.html?service=water-damage"><i class="fa-solid fa-angle-right"></i> Water Damage</a></li>' +
    '          <li><a href="service-details.html?service=laptop-repair"><i class="fa-solid fa-angle-right"></i> Laptop Repair</a></li>' +
    '          <li><a href="turnaround.html"><i class="fa-solid fa-angle-right"></i> Turnaround Times</a></li>' +
    '        </ul>' +
    '      </div>' +
    '      <div class="footer-col footer-news">' +
    '        <h3 class="footer-head">Get Repair Tips</h3>' +
    '        <p class="text-muted small mb-3">Subscribe for device-care guides and exclusive offers — no spam, just chips.</p>' +
    '        <form class="news-form" data-newsletter aria-label="Newsletter subscription">' +
    '          <input class="field" type="email" placeholder="Your email address" aria-label="Email address" required>' +
    '          <button class="btn btn-accent btn-sm" type="submit"><i class="fa-solid fa-paper-plane"></i></button>' +
    '        </form>' +
    '        <p class="news-ok text-muted small mt-2" style="display:none">Thanks! You will hear from us soon.</p>' +
    '        <div class="mt-4">' +
    '          <p class="mb-1 small fw-bold text-muted"><i class="fa-solid fa-phone me-2"></i>+1 (555) 010-7722</p>' +
    '          <p class="mb-1 small fw-bold text-muted"><i class="fa-solid fa-envelope me-2"></i>hello@voltixrepair.com</p>' +
    '          <p class="mb-0 small fw-bold text-muted"><i class="fa-solid fa-location-dot me-2"></i>48 Circuit Ave, Austin</p>' +
    '        </div>' +
    '      </div>' +
    '    </div>' +
    '    <div class="footer-bottom">' +
    '      <p>© <span data-year>2025</span> Voltix Repair Lab. All rights reserved.</p>' +
    '      <ul class="footer-links d-inline-flex gap-4 flex-row" style="display:inline-flex">' +
    '        <li><a href="#" data-legal="privacy">Privacy Policy</a></li>' +
    '        <li><a href="#" data-legal="terms">Terms of Service</a></li>' +
    '        <li><a href="#" data-legal="cookies">Cookies</a></li>' +
    '      </ul>' +
    '    </div>' +
    '  </div>' +
    '</footer>';

  var legalModalHtml =
    '<div class="modal fade" id="legalModal" tabindex="-1" role="dialog" aria-labelledby="legalModalTitle" aria-hidden="true">' +
    '  <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">' +
    '    <div class="modal-content">' +
    '      <div class="modal-header">' +
    '        <h5 class="modal-title" id="legalModalTitle">Privacy Policy</h5>' +
    '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
    '      </div>' +
    '      <div class="modal-body">' +
    '        <section data-legal-doc="privacy">' +
    '          <h4 class="h5 mb-2">Privacy Policy</h4>' +
    '          <p class="text-muted small mb-3">Last updated: January 2026</p>' +
    '          <p class="mb-3">Voltix respects your privacy and is committed to protecting the personal information you share with us when you visit our website or submit a device for repair.</p>' +
    '          <h5 class="h6 fw-bold mb-1">Information we collect</h5>' +
    '          <p class="mb-3">We collect information you provide directly, such as your name, email address, phone number, device details and the issue you describe. We also collect limited usage data to help improve our website.</p>' +
    '          <h5 class="h6 fw-bold mb-1">How we use your information</h5>' +
    '          <p class="mb-3">We use your information to schedule repairs, send status updates, respond to enquiries, and — with your consent — send occasional device-care tips and offers.</p>' +
    '          <h5 class="h6 fw-bold mb-1">Sharing your information</h5>' +
    '          <p class="mb-3">We never sell your personal information. We only share it with trusted service providers when necessary to deliver a repair, and only to the extent required.</p>' +
    '          <h5 class="h6 fw-bold mb-1">Data security and retention</h5>' +
    '          <p class="mb-3">We use reasonable safeguards to protect your data and keep it only as long as needed for the purposes described in this policy or as required by law.</p>' +
    '          <h5 class="h6 fw-bold mb-1">Your rights</h5>' +
    '          <p class="mb-0">You may request access to, correction of, or deletion of your personal information at any time by contacting us at hello@voltixrepair.com.</p>' +
    '        </section>' +
    '        <section data-legal-doc="terms" hidden>' +
    '          <h4 class="h5 mb-2">Terms of Service</h4>' +
    '          <p class="text-muted small mb-3">Last updated: January 2026</p>' +
    '          <p class="mb-3">By using the Voltix website or submitting a device for repair, you agree to these Terms of Service. Please read them carefully.</p>' +
    '          <h5 class="h6 fw-bold mb-1">Diagnosis and estimates</h5>' +
    '          <p class="mb-3">All repairs begin with a free diagnosis. The final quote is confirmed with you before any work begins. Prices shown on the site are estimates and may vary based on the exact device model.</p>' +
    '          <h5 class="h6 fw-bold mb-1">Data protection</h5>' +
    '          <p class="mb-3">Before handing in a device, you must back up your data and remove any sensitive information. Voltix is not responsible for data loss, though we take every care during repair.</p>' +
    '          <h5 class="h6 fw-bold mb-1">Warranty</h5>' +
    '          <p class="mb-3">All repairs are covered by a 6-month warranty on parts and labour. The warranty covers repair workmanship; it does not cover accidental damage, water ingress or unauthorised modification after repair.</p>' +
    '          <h5 class="h6 fw-bold mb-1">Limitation of liability</h5>' +
    '          <p class="mb-0">Repairs are performed with the utmost care. Voltix is not liable for pre-existing damage, undisclosed issues, or data stored on devices submitted for repair.</p>' +
    '        </section>' +
    '        <section data-legal-doc="cookies" hidden>' +
    '          <h4 class="h5 mb-2">Cookie Policy</h4>' +
    '          <p class="text-muted small mb-3">Last updated: January 2026</p>' +
    '          <p class="mb-3">This section explains what cookies are, how Voltix uses them, and how you can control them.</p>' +
    '          <h5 class="h6 fw-bold mb-1">What are cookies?</h5>' +
    '          <p class="mb-3">Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and understand how it is used.</p>' +
    '          <h5 class="h6 fw-bold mb-1">Cookies we use</h5>' +
    '          <ul class="list-unstyled text-muted small mb-3">' +
    '            <li class="mb-2"><i class="fa-solid fa-bolt me-2" style="color:var(--accent)"></i><b class="text">Essential cookies</b> - keep the site working, such as remembering your theme preference and session state.</li>' +
    '            <li class="mb-2"><i class="fa-solid fa-bolt me-2" style="color:var(--accent)"></i><b class="text">Analytics cookies</b> - help us understand how visitors use the site so we can improve it.</li>' +
    '            <li class="mb-0"><i class="fa-solid fa-bolt me-2" style="color:var(--accent)"></i><b class="text">Preference cookies</b> - remember choices such as your preferred language or layout.</li>' +
    '          </ul>' +
    '          <h5 class="h6 fw-bold mb-1">Managing cookies</h5>' +
    '          <p class="mb-0">You can block or delete cookies through your browser settings. Note that disabling essential cookies may affect how the website functions.</p>' +
    '        </section>' +
    '      </div>' +
    '      <div class="modal-footer">' +
    '        <button type="button" class="btn btn-ghost" data-bs-dismiss="modal">Close</button>' +
    '      </div>' +
    '    </div>' +
    '  </div>' +
    '</div>';

  function mount() {
    var host = document.getElementById('footer');
    if (!host) return;
    host.innerHTML = html;

    var modalWrap = document.createElement('div');
    modalWrap.innerHTML = legalModalHtml;
    document.body.appendChild(modalWrap.firstElementChild);

    var legalTitles = { privacy: 'Privacy Policy', terms: 'Terms of Service', cookies: 'Cookie Policy' };
    document.addEventListener('click', function (e) {
      var link = e.target && e.target.closest ? e.target.closest('a[data-legal]') : null;
      if (!link) return;
      e.preventDefault();
      var key = link.getAttribute('data-legal');
      if (!legalTitles[key]) key = 'privacy';
      var modal = document.getElementById('legalModal');
      if (!modal || typeof bootstrap === 'undefined' || !bootstrap.Modal) return;
      var titleEl = modal.querySelector('#legalModalTitle');
      if (titleEl) titleEl.textContent = legalTitles[key];
      modal.querySelectorAll('[data-legal-doc]').forEach(function (sec) {
        sec.hidden = sec.getAttribute('data-legal-doc') !== key;
      });
      bootstrap.Modal.getOrCreateInstance(modal).show();
    });

    var year = host.querySelector('[data-year]');
    if (year) year.textContent = new Date().getFullYear();

    var form = host.querySelector('[data-newsletter]');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input');
        var ok = host.querySelector('.news-ok');
        if (!input.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          input.classList.add('invalid');
          return;
        }
        input.classList.remove('invalid');
        form.style.display = 'none';
        if (ok) ok.style.display = 'block';
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
