/* Kendra's Mobile Nurse Services — shared site behavior */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var navList = document.querySelector("#primary-nav");
  var backToTop = document.querySelector(".back-to-top");
  var yearEl = document.querySelector("#year");

  /* Mobile nav */
  if (navToggle && navList) {
    navToggle.addEventListener("click", function () {
      var isOpen = navList.classList.toggle("is-open");
      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    navList.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navList.classList.remove("is-open");
        navToggle.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Header shadow + back-to-top visibility */
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 10);
    if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Reveal-on-scroll animations */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { revealIO.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Active nav link highlighting */
  var navLinks = navList ? Array.prototype.slice.call(navList.querySelectorAll('a[href^="#"]')) : [];
  var sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window && navLinks.length && sections.length) {
    var navIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
              link.classList.toggle("is-active-link", link.getAttribute("href") === "#" + entry.target.id);
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (s) { navIO.observe(s); });
  }

  /* Contact form — front-end only.
     To receive submissions by email, hook this form up to a form backend
     (e.g. Formspree): set <form action="https://formspree.io/f/YOUR_ID" method="POST">
     and remove the preventDefault below. */
  var form = document.querySelector("#booking-form");
  var success = document.querySelector("#form-success");
  if (form && success) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      success.hidden = false;
      form.reset();
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* Dynamic footer year */
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
