import { readFile, writeFile } from 'node:fs/promises';

const SITE_URL = 'https://www.belestategroup.site';
const source = await readFile(new URL('./src/data/mockData.ts', import.meta.url), 'utf8');
const prefix = 'export const properties: Property[] = ';
const start = source.indexOf(prefix) + prefix.length;
const end = source.indexOf(';\n\nexport const blogPosts', start);

if (start < prefix.length || end < 0) {
  throw new Error('Unable to locate the properties catalogue in src/data/mockData.ts');
}

const properties = JSON.parse(source.slice(start, end));
const transliteration = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y',
  'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
  'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sht', 'ъ': 'a', 'ь': 'y', 'ю': 'yu', 'я': 'ya',
};

const slugify = (value) => value
  .toLowerCase()
  .split('')
  .map((character) => transliteration[character] ?? character)
  .join('')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .replace(/-+/g, '-')
  .slice(0, 110) || 'imot';

const listingPath = (property) => `/imot/${property.sourceId}-${slugify(`${property.titleBg} ${property.propertyTypeBg} ${property.cityKey}`)}`;
const today = new Date().toISOString().slice(0, 10);
const escapeXml = (value) => String(value).replace(/[<>&'\"]/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character]);
const imageXml = (property) => [...new Set((property.gallery?.length ? property.gallery : [property.image]).filter(Boolean))]
  .map((imageUrl, index) => `    <image:image>\n      <image:loc>${escapeXml(imageUrl)}</image:loc>\n      <image:title>${escapeXml(`${property.titleBg} — ${property.locationBg} — снимка ${index + 1}`)}</image:title>\n    </image:image>`)
  .join('\n');

const staticUrls = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/?view=listings', priority: '0.9', changefreq: 'daily' },
  { path: '/?view=services', priority: '0.8', changefreq: 'monthly' },
  { path: '/?view=blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/?view=consultation', priority: '0.7', changefreq: 'monthly' },
  { path: '/?view=contact', priority: '0.7', changefreq: 'monthly' },
];

const entries = [
  ...staticUrls,
  ...properties.map((property) => ({ path: listingPath(property), priority: '0.8', changefreq: 'daily', property })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries.map((entry) => `  <url>\n    <loc>${escapeXml(`${SITE_URL}${entry.path}`)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>${entry.property ? `\n${imageXml(entry.property)}` : ''}\n  </url>`).join('\n')}\n</urlset>\n`;

await writeFile(new URL('./public/sitemap.xml', import.meta.url), xml, 'utf8');
const imageCount = properties.reduce((total, property) => total + new Set((property.gallery?.length ? property.gallery : [property.image]).filter(Boolean)).size, 0);
console.log(`Generated sitemap.xml with ${entries.length} URLs, including ${properties.length} listing pages and ${imageCount} image entries.`);
