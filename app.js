/* ViralLab — PorchWave LP interactions */
(function () {
  "use strict";

  // FAQ accordion
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var open = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (el) {
        el.classList.remove("open");
        el.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Prompt tabs
  var tabs = document.querySelectorAll(".prompt-tab");
  var panels = document.querySelectorAll(".prompt-panel");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var id = tab.getAttribute("data-tab");
      tabs.forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      panels.forEach(function (p) {
        p.classList.remove("active");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      var panel = document.getElementById("panel-" + id);
      if (panel) panel.classList.add("active");
    });
  });

  // Copy buttons
  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", async function () {
      var target = btn.getAttribute("data-copy");
      var el = document.getElementById(target);
      if (!el) return;
      var text = el.textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
      } catch (e) {
        var range = document.createRange();
        range.selectNodeContents(el);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand("copy");
        sel.removeAllRanges();
      }
      var label = btn.textContent;
      btn.textContent = "已复制";
      btn.classList.add("copied");
      setTimeout(function () {
        btn.textContent = label;
        btn.classList.remove("copied");
      }, 1600);
    });
  });

  // Smooth sticky nav shadow on scroll
  var nav = document.querySelector(".nav");
  if (nav) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 8) {
          nav.style.boxShadow = "0 4px 24px rgba(0,0,0,0.35)";
        } else {
          nav.style.boxShadow = "none";
        }
      },
      { passive: true }
    );
  }
})();
