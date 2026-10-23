# savesnakes.org

Static site for Save Snakes, Jay's Virginia snake rescue and education effort (licensed wildlife control operator). Hand-written HTML, one `styles.css`, `support.js`, hosted on GitHub Pages (`CNAME`). No build step, no framework; keep it that way. `nonprofit/` holds 501(c)(3) formation drafts. `_to_delete/` is a pending-delete folder; ignore it.

## Content rules (safety-critical)

- Virginia has three venomous natives: copperhead, timber rattlesnake, cottonmouth. Identification and safety pages must never imply a species is harmless without that framing, and never give medical advice beyond "call 911 / Poison Control 1-800-222-1222".
- Species facts need a source (VHS, VDWR, or a herpetology reference). No source, no claim.
- Image alt text names the species and venomous/non-venomous.

## Working on pages

- New page: copy the head block from an existing page, change title/description/canonical/OG, add to `sitemap.xml` with today's lastmod, add nav/footer links if top-level.
- Check at 375px width and in a real browser before shipping (`python3 -m http.server` in this folder).
- Commit to the branch Pages serves; never force-push.
- Skills: `static-site-publish` for the ship checklist; `.agents/skills/fish-audio-api` (vendored, hash in `skills-lock.json`) for TTS of educational audio. Do not edit the vendored skill; re-fetch it.

## No commands

No package.json, no tests. Delivery summaries say "static, rendered and checked in browser" instead of claiming a build passed.
