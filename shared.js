/* =========================================================================
   South Shore Junk Removal - shared.js
   Injects the shared header/nav and footer into every page (matching the
   reference site's #site-header / #site-footer pattern), plus the mobile
   nav drawer and the sticky mobile call button. Centralizing this here is
   what lets future town pages drop in with zero header/footer duplication.
   ========================================================================= */
(function () {
  "use strict";

  var PHONE_DISPLAY = "781-470-4245";
  var PHONE_TEL = "7814704245";
  var EMAIL = "junkremovalsouthshore@gmail.com";

  // Primary navigation. Clean URLs (no .html), served by Vercel cleanUrls.
  var NAV = [
    { href: "/", label: "Home", match: ["/", "/index"] },
    { href: "/how-it-works", label: "How It Works", match: ["/how-it-works"] },
    { href: "/services", label: "Services", match: ["/services"] },
    { href: "/faq", label: "FAQ", match: ["/faq"] },
    { href: "/contact", label: "Contact", match: ["/contact"] }
  ];

  // Town pages (added later) link here under "Service Areas" in the footer.
  var TOWNS = [
    "Scituate", "Cohasset", "Hingham", "Norwell", "Marshfield", "Hull",
    "Duxbury", "Hanover", "Pembroke", "Hanson", "Rockland", "Weymouth",
    "Braintree", "Quincy", "Plymouth", "Kingston"
  ];

  var phoneIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>';
  var pinIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';

  // Normalize the current path for active-link detection (strip .html + trailing slash)
  function currentPath() {
    var p = window.location.pathname.replace(/\.html$/, "").replace(/\/index$/, "/");
    if (p.length > 1 && p.charAt(p.length - 1) === "/") p = p.slice(0, -1);
    return p === "" ? "/" : p;
  }

  function isActive(item, path) {
    return item.match.indexOf(path) !== -1;
  }

  function navLinksHTML(path, cls) {
    return NAV.map(function (n) {
      var active = isActive(n, path) ? " active" : "";
      var aria = isActive(n, path) ? ' aria-current="page"' : "";
      return '<a class="' + (cls || "") + active + '" href="' + n.href + '"' + aria + ">" + n.label + "</a>";
    }).join("");
  }

  function buildHeader() {
    var path = currentPath();
    return '' +
      '<header class="site-header">' +
      '  <div class="container header-inner">' +
      '    <a class="brand" href="/" aria-label="South Shore Junk Removal home">' +
      '      <img src="/assets/logo.png" alt="South Shore Junk Removal logo" width="640" height="auto" onerror="this.style.display=\'none\';this.insertAdjacentHTML(\'afterend\',\'<span class=&quot;brand-fallback&quot;>South Shore Junk Removal</span>\')">' +
      '    </a>' +
      '    <nav class="nav" aria-label="Primary">' + navLinksHTML(path) + '</nav>' +
      '    <div class="header-cta">' +
      '      <a class="header-phone d-only" href="tel:' + PHONE_TEL + '">' + phoneIcon + " " + PHONE_DISPLAY + "</a>" +
      '      <a class="btn btn-primary d-only" href="/contact#quote-form">Get a Quote</a>' +
      '      <a class="btn btn-secondary m-only-btn" href="tel:' + PHONE_TEL + '">' + phoneIcon + ' Call</a>' +
      '      <a class="btn btn-primary m-only-btn" href="/contact#quote-form">Quote</a>' +
      '      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false">' +
      '        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
      '      </button>' +
      '    </div>' +
      '  </div>' +
      '</header>' +
      // Mobile nav drawer
      '<div class="mobile-nav" id="mobileNav" role="dialog" aria-modal="true" aria-label="Site menu">' +
      '  <div class="mobile-nav-panel">' +
      '    <div class="mobile-nav-head">' +
      '      <img src="/assets/logo.png" alt="South Shore Junk Removal">' +
      '      <button class="mobile-nav-close" type="button" aria-label="Close menu">&times;</button>' +
      '    </div>' +
      navLinksHTML(path) +
      '    <a class="btn btn-primary" href="/contact#quote-form">Get a Free Quote</a>' +
      '    <a class="btn btn-secondary m-call" href="tel:' + PHONE_TEL + '">' + phoneIcon + " Call " + PHONE_DISPLAY + "</a>" +
      '  </div>' +
      '</div>';
  }

  function buildFooter() {
    var year = new Date().getFullYear();
    var areas = TOWNS.join(", ") + ", and all of Massachusetts";
    return '' +
      '<footer class="site-footer">' +
      '  <div class="container">' +
      '    <div class="footer-grid">' +
      '      <div class="footer-brand">' +
      '        <img src="/assets/logo-white.png" alt="South Shore Junk Removal logo">' +
      '        <p>Local junk removal based in Scituate, serving the South Shore and all of Massachusetts. Same-day pickup, free onsite quotes, no hidden fees.</p>' +
      '      </div>' +
      '      <div>' +
      '        <h4>Company</h4>' +
      '        <ul class="footer-links">' +
      '          <li><a href="/">Home</a></li>' +
      '          <li><a href="/how-it-works">How It Works</a></li>' +
      '          <li><a href="/services">Services</a></li>' +
      '          <li><a href="/faq">FAQ</a></li>' +
      '          <li><a href="/contact">Contact / Get a Quote</a></li>' +
      '        </ul>' +
      '      </div>' +
      '      <div>' +
      '        <h4>Contact</h4>' +
      '        <div class="footer-contact">' +
      '          <p>' + pinIcon + ' 12 Sassamon Rd<br>Scituate, MA 02066</p>' +
      '          <p><a href="tel:' + PHONE_TEL + '">' + PHONE_DISPLAY + "</a></p>" +
      '          <p><a href="mailto:' + EMAIL + '">' + EMAIL + "</a></p>" +
      '          <p>Open every day · 7am–7pm</p>' +
      '        </div>' +
      '      </div>' +
      '      <div>' +
      '        <h4>Service Areas</h4>' +
      '        <p class="footer-areas">' + areas + ".</p>" +
      '      </div>' +
      '    </div>' +
      '    <div class="footer-bottom">' +
      '      <span>&copy; ' + year + ' South Shore Junk Removal. All rights reserved.</span>' +
      '      <span>Licensed &amp; Insured · Scituate, MA</span>' +
      '    </div>' +
      '  </div>' +
      '</footer>';
  }

  function wireMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("mobileNav");
    if (!toggle || !nav) return;
    var closeBtn = nav.querySelector(".mobile-nav-close");

    function open() {
      nav.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    function close() {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    toggle.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);
    nav.addEventListener("click", function (e) { if (e.target === nav) close(); });
    nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  function init() {
    var promoStrip = document.querySelector(".promo-strip");
    var headerMount = document.getElementById("site-header");
    var footerMount = document.getElementById("site-footer");
    
    if (headerMount) {
      headerMount.outerHTML = buildHeader();
      var actualHeader = document.querySelector(".site-header");
      if (actualHeader && promoStrip) {
        actualHeader.insertBefore(promoStrip, actualHeader.firstChild);
      }
    }
    
    if (footerMount) footerMount.outerHTML = buildFooter();
    wireMobileNav();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
