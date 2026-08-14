# Voltix Repair Lab — Electronics Repair Shop HTML Template

A complete, marketplace-ready HTML template for an electronics repair shop. Neomorphic tech UI, dark/light themes, RTL support, and demo-only localStorage features for auth, repair tracking and invoices.

Built with **Bootstrap 5**, **Font Awesome 6**, **Google Fonts** and vanilla JavaScript — no build step required.

## Pages

| Page | File | Notes |
| --- | --- | --- |
| Home 1 (general services) | `index.html` | Hero, brand strip, services, why us, process, counters, reviews, blog preview |
| Home 2 (repair shop niche) | `home-2.html` | Instant quote estimator, device grid, booking form, live tracking promo |
| About | `about.html` | Story, stats, values, team |
| Services | `services.html` | Filterable service grid + gallery |
| Service Details | `service-details.html` | Dynamic content via `?service=<slug>` |
| Brands | `brands.html` | Brand chips + specialist repairs |
| Pricing | `pricing.html` | Standard/Express toggle + rate table |
| Turnaround | `turnaround.html` | Timeline + estimated times table |
| Blog | `blog.html` | Live search, category filters, pagination |
| Blog Post | `blog-details.html` | Article + sidebar |
| Contact | `contact.html` | Info cards, form, map |
| Sign In / Sign Up | `login.html` / `register.html` | localStorage demo auth |
| Customer Dashboard | `dashboard.html` | Repair tracking, stepper, history, invoices, new repair form |
| Admin Dashboard | `admin/dashboard.html` | Analytics, KPIs, chart, jobs table, messages |
| 404 | `404.html` | — |
| Coming Soon | `coming-soon.html` | Live countdown + notify form |

## Quick start

Open any `.html` file directly in a browser, or serve the folder:

```bash
npx serve .
```

## Features

- **Neomorphic UI** with circuit pattern, ambient parallax orbs and reveal-on-scroll animations
- **Dark / light mode** — persisted in `localStorage` (`theme`), no-FOUC inline init
- **RTL support** — persisted in `localStorage` (`dir`), full `[dir="rtl"]` overrides
- **Reusable navbar & footer** — edit `js/navbar.js` and `js/footer.js` once, applies site-wide
- **Instant quote estimator** (`home-2.html#quote`) — device × issue price map in `js/main.js`
- **Booking form** with client-side validation (`home-2.html#booking`)
- **Demo auth** (`js/auth.js`) — accounts in `localStorage` (`vx_users`), session in `vx_session`
- **Repair tracking** (`js/dashboard.js`) — jobs in `vx_jobs`, status stepper, ETA, printable invoice modal, demo stage control
- **Dynamic service pages** (`js/service-details.js`) — 10 services keyed by slug

## Service slugs

`screen-replacement` · `battery-replacement` · `charging-port` · `motherboard-repair` · `water-damage` · `camera-repair` · `laptop-repair` · `gaming-repair` · `software-data` · `home-electronics`

```html
<a href="service-details.html?service=water-damage">Water Damage</a>
```

## Tools

- `tools/generate-images.ps1` — regenerates the SVG placeholder images in `assets/img/`
- `tools/check-links.js` — validates every `href`/`src` and required component per page

```bash
node tools/check-links.js
```

## File structure

```
voltix-template/
├── index.html, home-2.html, about.html, services.html, …
├── admin/
│   └── dashboard.html
├── assets/
│   └── img/          # generated SVG placeholders (+ reviews/)
├── css/
│   └── style.css     # full theme (dark/light, RTL, responsive)
├── js/
│   ├── navbar.js     # reusable navigation + auth-aware CTA
│   ├── footer.js     # footer + legal modal + newsletter
│   ├── main.js       # global interactions
│   ├── auth.js       # demo register/login
│   ├── service-details.js
│   └── dashboard.js  # repair tracking / invoices
└── tools/
    ├── generate-images.ps1
    └── check-links.js
```

## License

Free to use for personal and commercial projects. Placeholder images are generated SVGs — replace them with real photography for production.
