# KSU AI Club website

The website for the AI Club at Kennesaw State University. It's plain HTML, CSS and JavaScript,
with no build step and no dependencies. Originally built with Next.js by
[Ryan Tran](https://www.linkedin.com/in/ryantren/).

## Run it locally

```bash
npx serve .
```

Then open http://localhost:3000. `serve` handles the clean URLs (`/about` → `about.html`) the
same way Vercel does.

## Layout

```
index.html              home
about.html              officers
events.html             events (2026 hackathon + past events)
sponsors.html           sponsor info
hackathon.html          Hackathon 2026 site ("Campus OS" theme, its own look)
css/style.css           club site styles; brand colors are CSS variables at the top
css/hackathon.css       hackathon page styles
js/main.js              club site: header, menu, hero animation, carousel, lightbox
js/hackathon.js         hackathon page: boot screen, clock, countdown, rendering
js/hackathon-data.js    hackathon content that changes (prizes, schedule, sponsors)
assets/                 images
vercel.json             clean URLs; old /blog links redirect home
```

The header and footer are copied into each club page (not the hackathon page). If you change
a nav link, change it in all four files.

## Update the hackathon page

Edit `js/hackathon-data.js`. It has the prize pool, each track's prize, the day-by-day
schedule (time, title, room), partners, sponsors, and the countdown target. Anything left as
`'TBA'` shows as "TBA" on the site. The registration link is in `hackathon.html` and
`events.html`.

## Images

Resize photos before you add them. Around 1800px on the long edge is plenty. On macOS:

```bash
sips -Z 1800 -s formatOptions 80 assets/new-photo.jpg
```

## Deploying

**GitHub Pages:** in the repo go to Settings → Pages → Build and deployment, choose
"Deploy from a branch", branch `main`, folder `/ (root)`. Every push to `main` redeploys.
All paths in the site are relative, so it works at `<user>.github.io/KSU-AI-Club-Site/` and on
a custom domain. `.nojekyll` tells GitHub to serve the files as-is.

**Vercel (alternative):** Root Directory = repo root, Framework Preset = Other, no build
command. `vercel.json` adds clean URLs and redirects old `/blog` links.
