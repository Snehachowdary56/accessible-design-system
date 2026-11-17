/* Harbour Design System behaviour. Each function wires one component pattern
   from the WAI-ARIA Authoring Practices Guide. Exposed on window.DS for tests. */
(function () {
  "use strict";

  /** Buttons with aria-disabled stay focusable (so screen reader users can find them) but do nothing. */
  function initButtons(root) {
    root.addEventListener("click", function (event) {
      var btn = event.target.closest('.ds-button[aria-disabled="true"]');
      if (btn) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);
  }

  /** Switch: a button with role="switch"; Space and Enter toggle it (native button behaviour). */
  function initSwitches(root) {
    root.querySelectorAll('[role="switch"]').forEach(function (sw) {
      sw.addEventListener("click", function () {
        var on = sw.getAttribute("aria-checked") !== "true";
        sw.setAttribute("aria-checked", String(on));
        var state = sw.querySelector(".ds-switch__state");
        if (state) state.textContent = on ? "On" : "Off";
      });
    });
  }

  /** Tabs: arrow keys move between tabs, Home/End jump, only the selected tab is in the Tab order. */
  function initTabs(root) {
    root.querySelectorAll('[role="tablist"]').forEach(function (list) {
      var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));

      function select(tab, moveFocus) {
        tabs.forEach(function (t) {
          var selected = t === tab;
          t.setAttribute("aria-selected", String(selected));
          t.tabIndex = selected ? 0 : -1;
          var panel = document.getElementById(t.getAttribute("aria-controls"));
          if (panel) panel.hidden = !selected;
        });
        if (moveFocus) tab.focus();
      }

      tabs.forEach(function (tab, i) {
        tab.addEventListener("click", function () { select(tab, false); });
        tab.addEventListener("keydown", function (e) {
          var next = null;
          if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
          if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
          if (e.key === "Home") next = tabs[0];
          if (e.key === "End") next = tabs[tabs.length - 1];
          if (next) {
            e.preventDefault();
            select(next, true);
          }
        });
      });
    });
  }

  /** Dialog: opens with the native <dialog>, Escape closes it, focus returns to the button that opened it. */
  function initDialogs(root) {
    root.querySelectorAll("[data-dialog-open]").forEach(function (opener) {
      var dialog = document.getElementById(opener.getAttribute("data-dialog-open"));
      if (!dialog) return;
      opener.addEventListener("click", function () {
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
        var first = dialog.querySelector("button, [href], input, select, textarea");
        if (first) first.focus();
      });
      function close() {
        if (typeof dialog.close === "function") dialog.close();
        else dialog.removeAttribute("open");
        opener.focus();
      }
      dialog.querySelectorAll("[data-dialog-close]").forEach(function (b) { b.addEventListener("click", close); });
      dialog.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          e.preventDefault();
          close();
        }
      });
    });
  }

  /**
   * Form validation that is announced to screen readers:
   * errors are linked with aria-describedby, fields get aria-invalid, and an error summary
   * at the top receives focus and links to each field.
   */
  function validateForm(form) {
    var errors = [];
    form.querySelectorAll("[data-required], [data-pattern]").forEach(function (input) {
      var value = (input.value || "").trim();
      var message = "";
      if (input.hasAttribute("data-required") && !value) {
        message = input.getAttribute("data-required");
      } else if (value && input.hasAttribute("data-pattern") &&
                 !new RegExp(input.getAttribute("data-pattern")).test(value)) {
        message = input.getAttribute("data-pattern-message") || "Check the format.";
      }
      var errorEl = document.getElementById(input.id + "-error");
      if (errorEl) errorEl.textContent = message;
      if (message) {
        input.setAttribute("aria-invalid", "true");
        errors.push({ id: input.id, message: message });
      } else {
        input.removeAttribute("aria-invalid");
      }
    });

    var summary = form.querySelector(".js-error-summary");
    if (summary) {
      if (errors.length) {
        summary.hidden = false;
        var list = summary.querySelector("ul");
        list.innerHTML = "";
        errors.forEach(function (err) {
          var li = document.createElement("li");
          var a = document.createElement("a");
          a.href = "#" + err.id;
          a.textContent = err.message;
          li.appendChild(a);
          list.appendChild(li);
        });
        summary.focus();
      } else {
        summary.hidden = true;
      }
    }
    return errors;
  }

  function init(root) {
    root = root || document;
    if (root.__dsInitialised) return; // safe to call twice
    root.__dsInitialised = true;
    initButtons(root);
    initSwitches(root);
    initTabs(root);
    initDialogs(root);
  }

  window.DS = { init: init, validateForm: validateForm };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { init(document); });
  else init(document);
})();
