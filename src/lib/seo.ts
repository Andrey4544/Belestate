import { Property } from '../types';

export const SITE_URL = 'https://www.belestategroup.site';

const transliteration: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y',
  к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u',
  ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sht', ъ: 'a', ь: 'y', ю: 'yu', я: 'ya',
};

export function slugify(value: string): string {
  const transliterated = value
    .toLowerCase()
    .split('')
    .map((character) => transliteration[character] ?? character)
    .join('');

  return transliterated
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')
    .slice(0, 110) || 'imot';
}

export function listingSlug(property: Property): string {
  return slugify(`${property.titleBg} ${property.propertyTypeBg} ${property.cityKey}`);
}

export function listingPath(property: Property): string {
  return `/imot/${property.sourceId}-${listingSlug(property)}`;
}

export function listingCanonicalUrl(property: Property): string {
  return `${SITE_URL}${listingPath(property)}`;
}

export function propertySeoTitle(property: Property): string {
  const price = property.priceDisplay ? ` — ${property.priceDisplay}` : '';
  const area = property.areaRaw || (property.sqMeters ? `${property.sqMeters} кв.м.` : '');
  const areaPart = area ? `, ${area}` : '';
  return `${property.titleBg}${areaPart} в ${property.locationBg}${price} | BelEstateGroup`.slice(0, 120);
}

export function propertySeoDescription(property: Property): string {
  const prefix = `${property.titleBg} в ${property.locationBg}. ${property.areaRaw || `${property.sqMeters} кв.м.`}${property.priceDisplay ? `, ${property.priceDisplay}` : ''}. `;
  const description = property.descriptionBg.replace(/\s+/g, ' ').trim();
  return `${prefix}${description}`.slice(0, 158).replace(/[\s,;:-]+$/, '');
}
