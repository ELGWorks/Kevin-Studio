# Portfolio

One-page portfolio built with Next.js (App Router), Tailwind CSS v4 and Lenis smooth scrolling.
Two sections: Logos (6) and Sketches (24).

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Add the real artwork

1. Put 6 logo files in `public/logos/` named `01.png` to `06.png` (square, transparent PNG works best).
2. Put 24 sketch files in `public/sketches/` named `01.jpg` to `24.jpg` (any shape; keep each under about 500 KB).
3. In `data/portfolio.ts`, set `USE_REAL_FILES` to `true`.
4. Change the name, role, intro, email, socials, and each logo's title, description and panel colors in the same file.

The order of the files is the order on the page.

## What's where

- `components/Hero.tsx`: the name with the lens that follows the cursor (press to enlarge).
- `components/Logos.tsx`: the pinned side-scrolling logo gallery.
- `components/Sketches.tsx`: the sketch wall with parallax and the full-size viewer (arrow keys and Esc work).
- `components/SmoothScroll.tsx`: Lenis, via the `lenis/react` build that replaced the older `react-lenis` package. It turns off when the visitor has "reduce motion" on.
- Colors are at the top of `app/globals.css`.

Deploy to Vercel by pushing to GitHub and importing the repo.
