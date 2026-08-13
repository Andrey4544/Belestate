import { useEffect } from 'react';
import { Language, Property, ViewType } from '../types';
import { properties } from '../data/mockData';
import { listingCanonicalUrl, propertySeoDescription, propertySeoTitle, SITE_URL } from '../lib/seo';

const copy = {
  bg: {
    home: ['BelEstateGroup | Недвижими имоти в Пловдив и региона', 'BelEstateGroup е агенция за недвижими имоти в Пловдив и региона. Разгледайте апартаменти, къщи, вили и парцели с професионална юридическа подкрепа.'],
    listings: ['Имоти за продажба и под наем в Пловдив и региона | BelEstateGroup', 'Разгледайте актуални апартаменти, къщи, вили, парцели и търговски имоти в Пловдив и околните населени места.'],
    services: ['Услуги при покупка и продажба на имот | BelEstateGroup', 'Професионално посредничество, юридическа проверка, оценки и консултации при сделки с недвижими имоти в Пловдив.'],
    blog: ['Полезно за недвижимите имоти | BelEstateGroup', 'Практични ръководства за покупка на имот, проверка на документи, финансиране и сигурни сделки в България.'],
    consultation: ['Безплатна консултация за недвижими имоти | BelEstateGroup', 'Запазете консултация с екипа на BelEstateGroup за покупка, продажба или инвестиция в недвижим имот.'],
    contact: ['Контакти | BelEstateGroup недвижими имоти Пловдив', 'Свържете се с BelEstateGroup в Пловдив за огледи, оферти и професионална помощ при сделки с недвижими имоти.'],
  },
  en: {
    home: ['BelEstateGroup | Real Estate in Plovdiv and Bulgaria', 'BelEstateGroup is a real estate agency in Plovdiv and the surrounding region. Browse apartments, houses, villas and land with professional legal support.'],
    listings: ['Properties for Sale and Rent in Plovdiv | BelEstateGroup', 'Browse current apartments, houses, villas, land plots and commercial properties in Plovdiv and nearby locations.'],
    services: ['Real Estate Buying and Selling Services | BelEstateGroup', 'Professional brokerage, legal checks, valuations and consultations for real estate transactions in Plovdiv, Bulgaria.'],
    blog: ['Real Estate Guides and Advice | BelEstateGroup', 'Practical guides to buying property, checking documents, financing and completing secure real estate transactions in Bulgaria.'],
    consultation: ['Free Real Estate Consultation | BelEstateGroup', 'Book a consultation with BelEstateGroup for buying, selling or investing in real estate in Plovdiv and Bulgaria.'],
    contact: ['Contact BelEstateGroup Real Estate Agency in Plovdiv', 'Contact BelEstateGroup in Plovdiv for viewings, property offers and professional support with real estate transactions.'],
  },
} as const;

function setMeta(name: string, content: string) {
  let element = document.head.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setProperty(property: string, content: string) {
  let element = document.head.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setLink(rel: string, href: string, attributes: Record<string, string> = {}) {
  const selector = Object.entries({ rel, ...attributes }).map(([key, value]) => `[${key}="${value}"]`).join('');
  let element = document.head.querySelector<HTMLLinkElement>(`link${selector}`);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    document.head.appendChild(element);
  }
  element.href = href;
}

function listingSchema(property: Property, canonicalUrl: string) {
  const address = property.locationBg.includes('Пловдив')
    ? { '@type': 'PostalAddress', addressLocality: 'Пловдив', addressRegion: 'Пловдив', addressCountry: 'BG' }
    : { '@type': 'PostalAddress', addressCountry: 'BG', streetAddress: property.locationBg };

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': `${canonicalUrl}#listing`,
    url: canonicalUrl,
    name: property.titleBg,
    description: property.descriptionBg,
    image: property.gallery,
    provider: { '@id': `${SITE_URL}/#organization` },
    itemOffered: {
      '@type': 'Place',
      name: `${property.propertyTypeBg} — ${property.locationBg}`,
      address,
      floorSize: property.sqMeters ? { '@type': 'QuantitativeValue', value: property.sqMeters, unitCode: 'MTK' } : undefined,
    },
    offers: property.price > 0 ? {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: canonicalUrl,
    } : undefined,
  };
}

export function SeoHead({ language, view, listingId }: { language: Language; view: ViewType; listingId?: number | null }) {
  useEffect(() => {
    const property = listingId ? properties.find(item => item.id === listingId) ?? null : null;
    const [defaultTitle, defaultDescription] = copy[language][view];
    const title = property ? propertySeoTitle(property) : defaultTitle;
    const description = property ? propertySeoDescription(property) : defaultDescription;
    const canonicalUrl = property ? listingCanonicalUrl(property) : view === 'home' ? `${SITE_URL}/` : `${SITE_URL}/?view=${view}`;
    const socialImage = property?.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80';

    document.documentElement.lang = language;
    document.title = title;
    setMeta('description', description);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', socialImage);
    setMeta('twitter:image:alt', property ? property.titleBg : 'BelEstateGroup недвижими имоти');
    setProperty('og:type', 'website');
    setProperty('og:title', title);
    setProperty('og:description', description);
    setProperty('og:locale', language === 'bg' ? 'bg_BG' : 'en_GB');
    setProperty('og:url', canonicalUrl);
    setProperty('og:image', socialImage);
    setProperty('og:image:alt', property ? property.titleBg : 'BelEstateGroup недвижими имоти');
    setLink('canonical', canonicalUrl);

    const businessSchema = {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      '@id': `${SITE_URL}/#organization`,
      name: 'BelEstateGroup',
      url: `${SITE_URL}/`,
      telephone: '+359898573681',
      email: 'estate_07@abv.bg',
      description: copy.bg.home[1],
      image: socialImage,
      address: { '@type': 'PostalAddress', streetAddress: 'ул. Даме Груев 18', addressLocality: 'Пловдив', postalCode: '4000', addressCountry: 'BG' },
      areaServed: ['Пловдив', 'Марково', 'Белащица', 'Храбрино', 'Първенец', 'Брестник', 'Царацово', 'Съединение'],
      priceRange: '€€€',
      sameAs: ['https://estate_07.imot.bg/'],
    };

    const itemListSchema = view === 'listings' && !property ? {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: language === 'bg' ? 'Актуални имотни обяви от BelEstateGroup' : 'Current BelEstateGroup property listings',
      numberOfItems: properties.length,
      itemListElement: properties.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: listingCanonicalUrl(item),
        name: `${item.titleBg}, ${item.locationBg}`,
      })),
    } : null;

    const schemas = [businessSchema, ...(property ? [listingSchema(property, canonicalUrl)] : []), ...(itemListSchema ? [itemListSchema] : [])];
    let script = document.head.querySelector<HTMLScriptElement>('script[data-seo-schema]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoSchema = 'true';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemas);
  }, [language, view, listingId]);

  return null;
}
