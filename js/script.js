/* =========================================================
   HIMALAYAN CONSULTANCY — Main JavaScript
   ---------------------------------------------------------
   1.  Sticky top bar / header behaviour.
   2.  Mobile navigation toggle.
   3.  Current page highlight in nav.
   4.  Footer year.
   5.  Scroll reveal animations (IntersectionObserver).
   6.  Animated stat counters.
   7.  WhatsApp enquiry form.
   8.  3D cursor (dot + trailing ring).
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ------------------------------------------------------
     1. Sticky header + hiding top bar
     ------------------------------------------------------ */
  const siteTop = document.getElementById("siteTop");

  function updateStickyState() {
    if (!siteTop) return;
    siteTop.classList.toggle("sticky", window.scrollY > 40);
  }

  updateStickyState();
  window.addEventListener("scroll", updateStickyState, { passive: true });

  /* ------------------------------------------------------
     2. Mobile navigation
     ------------------------------------------------------ */
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("open");
      document.body.classList.toggle("menu-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        document.body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ------------------------------------------------------
     3. Current page highlight
     ------------------------------------------------------ */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".main-nav a").forEach(function (link) {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  /* ------------------------------------------------------
     4. Footer year
     ------------------------------------------------------ */
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------
     5. Scroll reveal
     ------------------------------------------------------ */
  const revealTargets = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealTargets.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

    revealTargets.forEach(function (el) { observer.observe(el); });

    document.querySelectorAll(".reveal-stagger").forEach(function (parent) {
      Array.from(parent.children).forEach(function (child, i) {
        child.style.transitionDelay = (i * 0.08) + "s";
      });
    });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ------------------------------------------------------
     6. Animated stat counters
     ------------------------------------------------------
     Add data-count="120" to a .stat-number element and it
     will count up from 0 when it enters the viewport. */
  const counters = document.querySelectorAll(".stat-number[data-count]");

  if (counters.length && "IntersectionObserver" in window) {
    const countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = parseInt(el.getAttribute("data-count"), 10);
        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 1600;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (c) { countObserver.observe(c); });
  }

  /* ------------------------------------------------------
     7. WhatsApp enquiry form
     ------------------------------------------------------ */
  const WHATSAPP_NUMBER = "9779851344574";
  const form = document.getElementById("enquiryForm");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const data = new FormData(form);
      const name = data.get("name") || "";
      const phone = data.get("phone") || "";
      const email = data.get("email") || "";
      const destination = data.get("destination") || "Not specified";
      const message = data.get("message") || "";

      const lines = [
        "Hello Himalayan Consultancy,",
        "",
        "*New Website Enquiry*",
        "Name: " + name,
        "Phone: " + phone,
        "Email: " + email,
        "Destination: " + destination,
        "Message: " + message
      ];

      const text = encodeURIComponent(lines.join("\n"));
      const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text;

      window.open(url, "_blank", "noopener");
    });
  }

  /* ------------------------------------------------------
     8. 3D cursor
     ------------------------------------------------------
     • Dot snaps to the pointer instantly.
     • Ring trails behind with lerp and tilts based on
       movement speed — gives a 3D feel.
     • Skipped entirely on touch devices.
     • Skipped when the user prefers reduced motion. */
  (function initCursor() {
    // Skip on touch-only devices
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    // Respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot  = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;      // real pointer position
    let dotX = 0,   dotY = 0;        // dot lerped position
    let ringX = 0,  ringY = 0;       // ring lerped position
    let ringVX = 0, ringVY = 0;      // ring velocity (for skew)
    let firstMove = false;

    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!firstMove) {
        firstMove = true;
        dotX = ringX = mouseX;
        dotY = ringY = mouseY;
        document.body.classList.add("cursor-ready");
      }
    });

    // Grow the ring on interactive elements
    document.addEventListener("mouseover", function (e) {
      const t = e.target;
      if (!t || t.nodeType !== 1) return;
      if (t.closest("a, button, .btn, input[type=submit], input[type=button]")) {
        document.body.classList.add("cursor-hover");
      }
    });
    document.addEventListener("mouseout", function (e) {
      const t = e.target;
      if (!t || t.nodeType !== 1) return;
      if (t.closest("a, button, .btn, input[type=submit], input[type=button]")) {
        document.body.classList.remove("cursor-hover");
      }
    });

    // Hide when pointer leaves the window, show when it comes back
    document.addEventListener("mouseleave", function () {
      document.body.classList.remove("cursor-ready");
    });
    document.addEventListener("mouseenter", function () {
      if (firstMove) document.body.classList.add("cursor-ready");
    });

    function tick() {
      // Lerp positions — dot is snappier, ring is smoother
      dotX  += (mouseX - dotX) * 0.35;
      dotY  += (mouseY - dotY) * 0.35;
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;

      // Velocity for skew — difference between dot and ring
      ringVX = (dotX - ringX) * 0.6;
      ringVY = (dotY - ringY) * 0.6;

      // Clamp so fast flicks don't over-skew
      const maxSkew = 14;
      const skewX = Math.max(-maxSkew, Math.min(maxSkew, -ringVY * 0.6));
      const skewY = Math.max(-maxSkew, Math.min(maxSkew,  ringVX * 0.6));

      // Slight rotateZ based on horizontal velocity
      const rotateZ = Math.max(-12, Math.min(12, ringVX * 0.4));

      dot.style.transform  = "translate3d(" + dotX + "px," + dotY + "px,0) translate(-50%,-50%)";
      ring.style.transform =
        "translate3d(" + ringX + "px," + ringY + "px,0) " +
        "perspective(400px) " +
        "rotateX(" + skewX + "deg) " +
        "rotateY(" + skewY + "deg) " +
        "rotateZ(" + rotateZ + "deg)";

      requestAnimationFrame(tick);
    }

    tick();
  })();

});