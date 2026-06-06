# Trendshift → GitHub button

Adds a **↗ GitHub** button next to each repository listed on
[trendshift.io](https://trendshift.io/) so you can open the matching repo on
GitHub, in a new tab, with no extra steps.

On Trendshift, each repo is shown as `owner/repo` (for example
`pewdiepie-archdaemon/odysseus`), but the link takes you to Trendshift's own
page (`/repositories/43167`), not to GitHub. This script reads that
`owner/repo` and builds `https://github.com/owner/repo` directly.

---

## ✨ What it does

- Inserts a **↗ GitHub** button to the right of each repository in the list.
- Clicking it opens `https://github.com/owner/repo` in a **new tab**.
- Works with content loaded dynamically (scrolling, client-side navigation)
  thanks to a `MutationObserver`.
- Keeps you on Trendshift: clicking the button does not trigger the card link.

## 🚀 Installation

1. Install a userscript manager:
   [Tampermonkey](https://www.tampermonkey.net/) or
   [Violentmonkey](https://violentmonkey.github.io/).
2. Install the script: click the **install** button wherever you found it
   (e.g. Greasy Fork) or open the raw `.user.js` file directly.
3. Confirm the installation in your userscript manager.
4. Open [trendshift.io](https://trendshift.io/) and you'll see the button next
   to each repo.

### ⚠️ Important on Chrome / Edge (Tampermonkey)

Recent versions of Chrome and Edge require
[enabling a permission for userscripts to run](https://www.tampermonkey.net/faq.php?q=Q209#Q209).
If **no button appears**:

1. Go to `chrome://extensions` (or `edge://extensions`).
2. Open the **Tampermonkey** card.
3. Enable **"Allow User Scripts"**.
4. Reload trendshift.io.

> This step is not needed on Firefox.

## 🖱️ Usage

There is nothing to configure. Once installed, browse Trendshift as usual and
use the **↗ GitHub** button on any repository you want to open.

## 🔒 Privacy and permissions

- Runs **only** on `https://trendshift.io/*`.
- `@grant none`: no privileged manager APIs are used.
- It does **not** collect, send or store any data. Everything happens in your
  browser.
- It makes no network requests of its own; it just adds a regular link to
  GitHub.

## 🧩 Compatibility

| Browser     | Tampermonkey  | Violentmonkey |
|-------------|:-------------:|:-------------:|
| Chrome      | ✅ (see note) | ✅ |
| Edge        | ✅ (see note) | ✅ |
| Firefox     | ✅            | ✅ |
| Brave/Opera | ✅ (see note) | ✅ |

## 🛠️ How it works (technical)

- Selects the links `a[href^="/repositories/"]`.
- Filters only those whose text matches the `owner/repo` pattern
  (`/^[A-Za-z0-9][A-Za-z0-9._-]*\/[A-Za-z0-9._-]+$/`), ignoring icons or other
  links to the same page.
- Marks each processed link with `data-ts-gh-done` to avoid duplicate buttons.
- The button uses `position: relative; z-index` to sit above the
  `::after { inset: 0 }` overlay that Trendshift places over the cards, and
  `stopPropagation()` so the click does not activate the card.

## 📝 Notes

- If Trendshift changes the repo text format, the button might stop appearing in
  some cases; open a report and I'll adjust it.

---

**Author:** mreduar · **License:** MIT
