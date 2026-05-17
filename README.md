# Saaya — Wedding Atelier

A single-page Pakistani wedding atelier built in React (in-browser, no build).
Five-step checkout with a live session log designed to be hooked into a voice
sales agent backend.

## Stack

- React 18 + Babel Standalone (no build step — everything is transpiled in the
  browser, so a static host like Netlify or GitHub Pages can serve it directly)
- Custom design system: cream + walnut + saffron-gold, Cormorant Garamond +
  Inter, Foyer-style image-slot drop zones for real photography

## Routes

| URL                | Page                                |
|--------------------|-------------------------------------|
| `/`                | Home                                |
| `/shop`            | Full catalogue                      |
| `/shop/bridal`     | Bridal collection                   |
| `/shop/daily-wear` | Daily-wear lawn                     |
| `/shop/formal`     | Anarkali + saree                    |
| `/shop/mens`       | Men's — sherwani + kurta            |
| `/product/<id>`    | Product detail page                 |
| `/checkout`        | 5-step checkout flow with event log |

Client-side routing uses `pushState` + `popstate`; Netlify is configured via
`_redirects` and `netlify.toml` to serve `index.html` for every path so deep
links don't 404.

## Local development

No build step. Just serve the folder over HTTP — any static server works.

```bash
# Python
python3 -m http.server 8000

# Node (npx)
npx serve .

# PHP
php -S localhost:8000
```

Then open <http://localhost:8000>.

Opening `index.html` via `file://` partially works but the cross-origin script
loader for the JSX files may misbehave — prefer a real HTTP server.

## Deploy to GitHub + Netlify

### 1 · Push to GitHub

From the project root:

```bash
git init
git add .
git commit -m "Initial commit — Saaya wedding atelier"
git branch -M main
git remote add origin git@github.com:<your-username>/saaya.git
git push -u origin main
```

(Replace `<your-username>` with your handle. Create the empty repo on GitHub
first via <https://github.com/new>.)

### 2 · Connect to Netlify

1. Sign in at <https://app.netlify.com>.
2. **Add new site → Import an existing project → GitHub → pick `saaya`**.
3. When asked for build settings:
   - **Build command**: *(leave blank)*
   - **Publish directory**: `.`  (a single dot — the repo root)
4. Click **Deploy site**.

Netlify reads `netlify.toml` for headers and `_redirects` for the SPA fallback,
so deep links like `tryf.netlify.app/checkout` and
`tryf.netlify.app/product/zara-bridal-lehenga` work out of the box.

### 3 · Custom domain (optional)

In Netlify: **Site settings → Domain management → Add custom domain**. Netlify
provisions free Let's Encrypt SSL automatically.

## File layout

```
.
├── index.html               ← entry point (loaded by Netlify root)
├── _redirects               ← SPA fallback for Netlify
├── netlify.toml             ← Netlify build + header config
├── saaya/
│   ├── main.jsx             ← App + URL router
│   ├── header.jsx           ← Nav, cart drawer, toast
│   ├── pages.jsx            ← Home, Shop, PDP, Footer
│   ├── checkout.jsx         ← 5-step checkout + live event log
│   ├── products.jsx         ← Catalogue + tone-on-tone silhouettes
│   ├── styles.css           ← All styles
│   ├── tweaks-panel.jsx     ← In-page tweak controls
│   └── image-slot.js        ← Drop-in image placeholder web component
├── uploads/                 ← Real product photography
└── README.md
```

## Voice-agent integration

The checkout fires a `saaya:event` `CustomEvent` on `window` for every action
(step transitions, field changes, country/city selection, shipping
calculation, abandonment, order placement). A voice agent or analytics SDK
can listen with no code changes here:

```js
window.addEventListener('saaya:event', (e) => {
  // e.detail = { id, ts, type, detail, meta }
  fetch('/api/events', { method: 'POST', body: JSON.stringify(e.detail) });
});
```

Every event is also mirrored to `console.log` so you can verify the stream
during development.
