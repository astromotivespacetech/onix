/* Onix Lunar Corp — single-viewport landing.
   Numbers come from window.SITE_DATA (`lunar-gun generate site`). */

(function () {
  "use strict";

  var FORM_ENDPOINT = "";
  var data = window.SITE_DATA || {};

  function get(path) {
    return path.split(".").reduce(function (node, key) {
      return node == null ? null : node[key];
    }, data);
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ── Metrics ────────────────────────────────────────────── */

  var strip = document.getElementById("stat-strip");
  (get("stats") || []).forEach(function (stat, index) {
    var li = el("li");
    if (index === 0) li.className = "is-lead";
    li.appendChild(el("span", "stat-label", stat.label));
    li.appendChild(el("span", "stat-value", stat.value));
    li.appendChild(el("span", "stat-unit", stat.unit));
    strip.appendChild(li);
  });

  /* Keep the metrics band as wide as the title + lede block. */
  var copyInner = document.querySelector(".stage-copy-inner");
  function syncBand() {
    if (!copyInner) return;
    var width = Math.round(copyInner.getBoundingClientRect().width);
    if (width > 0) {
      document.documentElement.style.setProperty("--band", width + "px");
    }
  }
  syncBand();
  if (typeof ResizeObserver !== "undefined" && copyInner) {
    new ResizeObserver(syncBand).observe(copyInner);
  }
  window.addEventListener("resize", syncBand);

  /* ── Contact modal ──────────────────────────────────────── */

  var modal = document.getElementById("contact-modal");
  var openBtn = document.getElementById("open-contact");
  var closeBtn = document.getElementById("close-contact");
  var closeBackdrop = document.getElementById("close-contact-backdrop");
  var form = document.getElementById("contact-form");
  var note = document.getElementById("form-note");
  var submitBtn = form.querySelector("button[type=submit]");
  var restingHtml = note.innerHTML;
  var lastFocus = null;

  function openModal() {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    window.setTimeout(function () {
      var first = form.querySelector("input, textarea, button");
      if (first) first.focus();
    }, 40);
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  closeBackdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });

  function setNote(text, state) {
    if (state == null) {
      note.innerHTML = restingHtml;
    } else {
      note.textContent = text;
    }
    note.classList.toggle("is-error", state === "error");
    note.classList.toggle("is-done", state === "done");
  }

  function invalidField() {
    var fields = form.querySelectorAll("input[required], textarea[required]");
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      var bad = !field.value.trim() || (field.type === "email" && !field.checkValidity());
      field.setAttribute("aria-invalid", bad ? "true" : "false");
      if (bad) return field;
    }
    return null;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var bad = invalidField();
    if (bad) {
      setNote("Check the marked field.", "error");
      bad.focus();
      return;
    }

    submitBtn.disabled = true;
    setNote("Sending.");

    var payload = new FormData(form);
    var target = FORM_ENDPOINT || window.location.pathname;

    fetch(target, { method: "POST", body: payload, headers: { Accept: "application/json" } })
      .then(function (response) {
        if (!response.ok) throw new Error(String(response.status));
        form.reset();
        setNote("Message sent. We answer every message.", "done");
      })
      .catch(function () {
        setNote("Send failed. Try again later.", "error");
      })
      .finally(function () {
        submitBtn.disabled = false;
        window.setTimeout(function () {
          if (!note.classList.contains("is-done")) setNote();
        }, 6000);
      });
  });
})();
