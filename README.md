# South Shore Junk Removal Website

Static, mobile-first marketing site for South Shore Junk Removal, built in the
same approach as the Diamond Finish Detailing site (static HTML/CSS/JS, shared
header/footer injected by `shared.js`, Web3Forms contact form, clean URLs on
Vercel, LocalBusiness JSON-LD). Recolored to the brand blues sampled from the
logo.

## Brand palette (sampled from the logo)
| Token          | Hex       | Use                                            |
|----------------|-----------|------------------------------------------------|
| `--brand-dark` | `#1C3D5E` | Navy: headings, structure, dark sections       |
| `--brand-light`| `#4FA3DD` | Sky blue accent: buttons, links, highlights    |
| `--white`      | `#FFFFFF` | Dominant background                            |

Defined as CSS variables at the top of `styles.css`.

## Local preview
The site uses **clean URLs** (e.g. `/contact`, not `/contact.html`), so preview
it with a server that resolves extensionless routes:

```bash
cd "Junk Removal Website Folder"
npx serve .
```

Then open the printed URL (e.g. http://localhost:3000). `npx serve` maps
`/contact` → `contact.html` exactly like Vercel's `cleanUrls` will in production.

> Plain `python3 -m http.server` works too, but you'd visit `/contact.html`
> directly since it doesn't rewrite clean URLs.

## Pages (5 core)
| URL             | File                | Meta title (from copy PDF)                       |
|-----------------|---------------------|-------------------------------------------------|
| `/`             | `index.html`        | South Shore Junk Removal \| Scituate, MA        |
| `/how-it-works` | `how-it-works.html` | How It Works \| South Shore Junk Removal        |
| `/services`     | `services.html`     | Junk Removal Services \| South Shore MA         |
| `/faq`          | `faq.html`          | Junk Removal FAQ \| South Shore Junk Removal    |
| `/contact`      | `contact.html`      | Contact & Free Quote \| South Shore Junk Removal|

## Town landing pages (16, built)
All 16 town pages are live at `/junk-removal-<town>` and are linked from the
**Our Service Areas** grid on the home page (and listed in `sitemap.xml`):

`scituate`, `cohasset`, `hingham`, `norwell`, `marshfield`, `hull`, `duxbury`,
`hanover`, `pembroke`, `hanson`, `rockland`, `weymouth`, `braintree`, `quincy`,
`plymouth`, `kingston` — e.g. `/junk-removal-scituate`
(file `junk-removal-scituate.html`).

Town hero photos are used where available (scituate, cohasset, hull, duxbury,
marshfield, quincy, weymouth); the other 9 towns use a clean generic junk-removal
photo as a placeholder until you supply a town-specific image.

All page copy and meta titles/descriptions are taken verbatim from
`South_Shore_Junk_Removal_Website_Copy.pdf`.

## Project structure
```
index.html, how-it-works.html, services.html, faq.html, contact.html
junk-removal-*.html        # 16 town landing pages (built, linked from home)
_town-template.html        # scaffold for adding MORE towns later (NOT live)
styles.css                 # full stylesheet, CSS variables for the palette
shared.js                  # injects header/nav + footer, mobile menu, sticky call
images.js                  # graceful broken-image handling (handleImgError)
vercel.json                # cleanUrls + asset caching headers
sitemap.xml, robots.txt, site.webmanifest
favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png,
android-chrome-192x192.png, android-chrome-512x512.png
assets/
  logo.png, logo-small.png # trimmed/optimized logo for header & footer
  og-image.jpg / .png      # 1200x630 social/OG image (logo on white)
  opt/                     # optimized service images (webp + jpg, 540/810/1080)
  towns/                   # optimized town hero images (webp + jpg, 600/1080)
gen-images notes           # see "Regenerating images" below
```

## Adding MORE town pages later (architecture is ready)
The 16 PDF towns are already built and linked. To add another town:
- Copy `_town-template.html` → `junk-removal-<town>.html` (served at
  `/junk-removal-<town>`). Instructions + placeholder list are in the file's
  top comment.
- Header/footer come from `shared.js`, so town pages need zero nav markup.
- Drop a hero image at `assets/towns/<slug>-junk-removal-1080.(webp|jpg)` and
  `-600.(webp|jpg)`, or it will fall back to a generic junk-removal photo.
- Add its URL to `sitemap.xml` and a linked box in the home-page
  **Our Service Areas** grid (`index.html`).

## Regenerating images
The favicons, OG image, and optimized service/town images were generated from
the logo + source PNGs with a one-off Python (Pillow) script. The source PNGs
(`furniture-removal.png`, `*-junk-removal.png`, etc.) remain in the folder root.
If you change the logo or want different crops, regenerate with Pillow
(`pip install pillow`). Ask and I can drop the script back in.

---

## ⚠️ Open items: need your decision / a real value

### 1. Production domain: `[JUNK_REMOVAL_DOMAIN]` placeholder
Every spot that needs the live domain uses the literal placeholder
**`[JUNK_REMOVAL_DOMAIN]`**. Find-and-replace it with the real domain
(e.g. `southshorejunkremoval.com`) across these files:

- `index.html`
- `how-it-works.html`
- `services.html`
- `faq.html`
- `contact.html`
- `_town-template.html` (for future town pages)
- `sitemap.xml`
- `robots.txt`

(It appears in canonical tags, OG/Twitter URLs + image URLs, and the JSON-LD
`url`/`logo`/`image`/`@id` fields.)

### 2. Contact form: Web3Forms access key (REQUIRED before launch)
The quote form uses **Web3Forms**, the same submission method as the detailing
site. I did **not** reuse the detailing site's key (that would send junk-removal
leads to the detailing inbox). In `contact.html` replace:

```
YOUR_WEB3FORMS_ACCESS_KEY_HERE
```

with a key created at https://web3forms.com using **southshorejunkremoval@gmail.com**.
Web3Forms delivers submissions to the email tied to the key, so this is how
quote requests reach the junk-removal inbox. (Until it's replaced, the form
shows a friendly "setup step needed" alert instead of failing silently. No keys
or secrets are hardcoded anywhere else.)

### 3. Photo upload field: needs a decision ⬅️ the one you asked me to flag
The PDF's form includes an optional **photo upload**. I built the field and it's
wired into the submission (multipart `attachment`), **but the free Web3Forms
plan does not deliver file attachments; that requires Web3Forms Pro (paid).**
Right now it degrades gracefully: the field is present, and the hint tells users
"Trouble uploading? Just text photos to 781-470-4245," so no lead is lost.

Your options:
- **(a) Upgrade to Web3Forms Pro**: keeps the current form as-is; photos arrive
  as email attachments. Simplest if you want photos in-inbox. *(Recommended if
  photos matter to you.)*
- **(b) Switch the form to a service with uploads on the free/cheap tier**:
  e.g. Formspree or Basin. Small change to the form action + hidden fields.
- **(c) Keep it free / no real upload**: leave the graceful fallback (text
  photos to the phone), or remove the upload field entirely and rely on the
  "text us a photo" line.

Tell me which and I'll wire it up. Default if you don't decide: **(c)**, the
field stays with the text-a-photo fallback, so nothing breaks.

### 4. Map pin coordinates in schema (verify)
The LocalBusiness JSON-LD `geo` uses **approximate** Scituate coordinates
(`42.1956, -70.7256`) as a placeholder for 12 Sassamon Rd. Google's map pin
comes from your Google Business Profile, not this, but it's worth dropping in
the exact lat/long for 12 Sassamon Rd when convenient (search the address on
Google Maps → right-click → copy coordinates). Appears in all 5 pages + the
town template.

### 5. Favicon note
The logo is a wide wordmark, which is unreadable at 16–32px, so the favicon /
app icons are a clean square **"SS"** mark in the brand navy + sky blue (derived
from the logo's colors and "South Shore" pill). The full logo is used in the
header, footer, and OG image. Swap the icon files if you'd prefer a different
mark.

---

## Guardrails honored
- Everything built inside the **Junk Removal Website Folder** only.
- `Website Folder Claude Code (2)` was used as **read-only reference** and left
  untouched (its 7 HTML files are byte-for-byte as delivered).
- The live Diamond Finish Detailing project was never opened, edited, or deployed.
