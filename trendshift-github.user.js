// ==UserScript==
// @name         Trendshift → GitHub button
// @namespace    https://trendshift.io/
// @version      1.0.0
// @description  Adds a button next to each repo on trendshift.io to open it on GitHub
// @author       mreduar
// @license      MIT
// @match        https://trendshift.io/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==
(() => {
  "use strict";

  const GITHUB = "https://github.com/";
  const REPO_RE = /^[A-Za-z0-9][A-Za-z0-9._-]*\/[A-Za-z0-9._-]+$/;

  function makeButton(repoPath) {
    const btn = document.createElement("a");
    btn.href = GITHUB + repoPath;
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
    btn.textContent = "↗ GitHub";
    btn.setAttribute("aria-label", "Open " + repoPath + " on GitHub");
    btn.title = "Open on GitHub";
    btn.style.cssText = [
      "position:relative",
      "z-index:20",
      "display:inline-flex",
      "align-items:center",
      "gap:4px",
      "margin-left:8px",
      "padding:1px 8px",
      "font-size:12px",
      "font-weight:600",
      "line-height:1.5",
      "border-radius:6px",
      "border:1px solid rgba(127,127,127,0.4)",
      "background:rgba(127,127,127,0.08)",
      "color:inherit",
      "text-decoration:none",
      "white-space:nowrap",
      "vertical-align:middle",
      "cursor:pointer",
    ].join(";");
    btn.addEventListener("click", (e) => e.stopPropagation());
    return btn;
  }

  function process() {
    document.querySelectorAll('a[href^="/repositories/"]').forEach((link) => {
      if (link.dataset.tsGhDone) return;
      const text = link.textContent.trim();
      if (!REPO_RE.test(text)) return;
      link.dataset.tsGhDone = "1";
      link.insertAdjacentElement("afterend", makeButton(text));
    });
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      process();
    });
  }

  process();
  new MutationObserver(schedule).observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
