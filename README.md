# Himalayan Consultancy Website

A clean, developer-friendly static website for Himalayan Consultancy.

## Files

- `index.html` — Home
- `about.html` — About + two team member profiles
- `services.html` — Services
- `destinations.html` — Study destinations
- `contact.html` — Contact + enquiry form
- `css/style.css` — All styling
- `js/script.js` — Navigation, current year and WhatsApp form
- `robots.txt` — Search-engine crawling instructions
- `sitemap.xml` — Main sitemap
- `images/team/` — Team photo placeholders

## IMPORTANT: Replace these placeholders

Search the project for:

- `ADDRESS_HERE`
- `+977-XXXXXXXXXX`
- `977XXXXXXXXXX`
- `FACEBOOK_URL_HERE`
- `INSTAGRAM_URL_HERE`
- `TIKTOK_URL_HERE`
- `YOUTUBE_URL_HERE`
- `LINKEDIN_URL_HERE`
- `PASTE_GOOGLE_MAP_EMBED_URL_HERE`
- `TEAM MEMBER NAME`
- `POSITION / DESIGNATION`
- `BIOGRAPHY HERE`
- `COMPANY INTRODUCTION HERE`
- `COMPANY HISTORY / MISSION / VALUES HERE`
- `OFFICE HOURS HERE`
- `DESTINATION DESCRIPTION HERE`

## Adding real team photos

Replace:

- `images/team/person-1.svg`
- `images/team/person-2.svg`

with the real images. If the filenames are changed, update the `src` in `about.html`.

Recommended image format: WebP or JPG.

## WhatsApp

There are two places to update:

1. The `href="https://wa.me/977XXXXXXXXXX"` links in the HTML files.
2. `WHATSAPP_NUMBER` in `js/script.js`.

Use the international format without `+`, spaces or dashes.

Example:
`9779812345678`

## Google Map

In `index.html` and `contact.html`, replace the map placeholder with the iframe from:

Google Maps → Share → Embed a map → Copy HTML

Do not use a normal Google Maps webpage URL as the iframe source. Use the official Embed iframe code.

## SEO

Before launch:

1. Confirm the final domain is `https://himalayanconsultancy.com`.
2. Update the canonical URLs if the domain changes.
3. Replace all placeholder content.
4. Add a real logo and descriptive image alt text.
5. Create/verify the Google Business Profile.
6. Add the site to Google Search Console.
7. Submit `sitemap.xml`.
8. Make sure the business name, address and phone are consistent across the website and business profiles.
9. Add real social media URLs.
10. Test the website on mobile.

### SEO note

The site includes basic on-page SEO, semantic headings, page-specific titles/descriptions, canonical URLs, robots.txt and sitemap.xml. Ranking #1 for a brand or competitive keyword cannot be guaranteed by HTML alone; authority, content, business profile signals, links, competition and site quality also matter.

## Deployment

This is a static website and works well with:

- GitHub Pages
- Cloudflare Pages
- Netlify
- Vercel
- Hostinger static hosting
- Any normal web server

No database or login system is required.
