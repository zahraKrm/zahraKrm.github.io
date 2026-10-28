/* ==========================================================================
   Zahra Karami - small interactions. The site works without JavaScript;
   this file only adds the theme switch, the mobile menu, the active
   section in the navigation and the "copy BibTeX" buttons.
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var darkQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  /* ---- theme switch ---------------------------------------------------- */
  function storedTheme(value) {
    try {
      if (value) {
        localStorage.setItem("theme", value);
      }
      return localStorage.getItem("theme");
    } catch (e) {
      return null;
    }
  }

  function currentTheme() {
    var t = root.getAttribute("data-theme");
    if (t === "dark" || t === "light") {
      return t;
    }
    return darkQuery && darkQuery.matches ? "dark" : "light";
  }

  var themeButton = document.querySelector("[data-theme-toggle]");

  function syncThemeButton() {
    if (!themeButton) {
      return;
    }
    var dark = currentTheme() === "dark";
    themeButton.setAttribute("aria-pressed", dark ? "true" : "false");
    themeButton.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    themeButton.setAttribute("title", dark ? "Light theme" : "Dark theme");
  }

  if (themeButton) {
    themeButton.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      storedTheme(next);
      syncThemeButton();
    });
  }
  if (darkQuery && darkQuery.addEventListener) {
    darkQuery.addEventListener("change", syncThemeButton);
  }
  syncThemeButton();

  /* ---- mobile menu ----------------------------------------------------- */
  var nav = document.getElementById("site-nav");
  var navButton = document.querySelector("[data-nav-toggle]");

  function setMenu(open) {
    if (!nav || !navButton) {
      return;
    }
    nav.classList.toggle("is-open", open);
    navButton.setAttribute("aria-expanded", open ? "true" : "false");
    navButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (nav && navButton) {
    navButton.addEventListener("click", function () {
      setMenu(!nav.classList.contains("is-open"));
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setMenu(false);
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setMenu(false);
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 880) {
        setMenu(false);
      }
    });
  }

  /* ---- header border once the page scrolls ------------------------------ */
  var header = document.querySelector(".site-header");

  function onScroll() {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 4);
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- highlight the section that is on screen -------------------------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
  var sections = navLinks
    .map(function (a) {
      return document.getElementById(a.getAttribute("href").slice(1));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }
          navLinks.forEach(function (a) {
            if (a.getAttribute("href") === "#" + entry.target.id) {
              a.setAttribute("aria-current", "true");
            } else {
              a.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (s) {
      observer.observe(s);
    });
  }

  /* ---- copy buttons (BibTeX) -------------------------------------------- */
  function copyText(text, fallbackNode) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        function () {
          return true;
        },
        function () {
          return legacyCopy(fallbackNode);
        }
      );
    }
    return Promise.resolve(legacyCopy(fallbackNode));
  }

  function legacyCopy(node) {
    var ok = false;
    try {
      var range = document.createRange();
      range.selectNodeContents(node);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      ok = document.execCommand("copy");
      selection.removeAllRanges();
    } catch (e) {
      ok = false;
    }
    return ok;
  }

  document.querySelectorAll("[data-copy]").forEach(function (button) {
    var label = button.querySelector("[data-label]") || button;
    var original = label.textContent;
    button.addEventListener("click", function () {
      var source = document.getElementById(button.getAttribute("data-copy"));
      if (!source) {
        return;
      }
      copyText(source.textContent.trim(), source).then(function (ok) {
        label.textContent = ok ? "Copied" : "Copy failed";
        window.setTimeout(function () {
          label.textContent = original;
        }, 1800);
      });
    });
  });

  /* ---- current year in the footer --------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
