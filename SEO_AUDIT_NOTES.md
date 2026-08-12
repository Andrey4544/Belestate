# BelEstateGroup SEO audit notes

## Verified production origin
The live site resolves at https://www.belestategroup.site/.

## Current strengths
- Bulgarian homepage copy clearly targets real-estate services in Plovdiv and surrounding areas.
- The page includes a single visible H1, contact phone, office address, map embed, services, portfolio, blog/guide content, and consultation CTAs.
- The app already renders the primary content in the DOM after JavaScript execution.

## Highest-impact gaps
- `index.html` only has the title `BelEstateGroup`; it lacks a descriptive meta description, canonical URL, Open Graph/Twitter tags, favicon/theme metadata, and language alternates.
- `html lang` is `en` even though the default visible page content is Bulgarian.
- Navigation is implemented with buttons that change local React state; content views do not have crawlable `href` URLs.
- Property detail pages and blog articles open in client-side modal/local state rather than standalone URLs, so the richest content is not cleanly indexable or shareable.
- There is no visible robots.txt or XML sitemap in the repository.
- Business and property structured data are not present.
- English property descriptions are largely generic placeholders, creating weak English-language relevance.
- Some listing images come from third-party portal URLs and include placeholder/no-photo assets.
- The site should use `https://www.belestategroup.site/` as the canonical production origin.

## Source references used for recommendations
- Google JavaScript SEO basics: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google structured data introduction: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Google canonical URL guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google localized versions / hreflang: https://developers.google.com/search/docs/specialty/international/localized-versions

## Live page snapshot
- Title observed: `BelEstateGroup`.
- Default language observed: Bulgarian; current HTML language is `en`.
- Visible homepage H1: `Вашата сигурна стъпка към мечтания нов дом`.
- Visible business positioning: real-estate agency, Plovdiv and Bulgaria, 20+ years experience, 1000+ transactions.
- Visible phone: `0898 573 681`; visible address: `ул. Даме Груев 18, Plovdiv, Bulgaria`.
