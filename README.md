# Trendshift → GitHub button

A userscript that adds a **↗ GitHub** button next to every repository on
[trendshift.io](https://trendshift.io/), opening the matching
`https://github.com/owner/repo` in a new tab.

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) or
   [Violentmonkey](https://violentmonkey.github.io/).
2. Install the script:
   [`trendshift-github.user.js`](./trendshift-github.user.js).
3. Open https://trendshift.io/ — a **↗ GitHub** button appears next to each repo.

### Chrome / Edge

Enable **"Allow User Scripts"** in the Tampermonkey card at
`chrome://extensions`, otherwise userscripts won't run. (Not needed on Firefox.)

## How it works

Trendshift shows each repo as `owner/repo` but links to its own page
(`/repositories/<id>`). The script reads that text and builds the GitHub URL
directly. It uses a `MutationObserver` to handle dynamically loaded content, and
renders the button above Trendshift's full-card overlay so the click isn't
hijacked.

## License

MIT © mreduar
