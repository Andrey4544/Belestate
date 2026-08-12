import { useEffect } from 'react';
import { Language, ViewType } from '../types';
import { properties } from '../data/mockData';

const SITE_URL = 'https://www.belestategroup.site/';

const copy = {
  bg: {
    home: ['BelEstateGroup | Недвижими имоти в Пловдив и региона', 'BelEstateGroup е агенция за недвижими имоти в Пловдив и региона. Разгледайте апартаменти, къщи, вили и парцели с професионална юридическа подкрепа.'],
    listings: ['Имоти за продажба в Пловдив и региона | BelEstateGroup', 'Разгледайте проверени апартаменти, къщи, вили, парцели и търговски имоти в Пловдив и околните населени места.'],
    services: ['Услуги при покупка и продажба на имот | BelEstateGroup', 'Професионално посредничество, юридическа проверка, оценки и консултации при сделки с недвижими имоти в Пловдив.'],
    blog: ['Полезно за недвижимите имоти | BelEstateGroup', 'Практични ръководства за покупка на имот, проверка на документи, финансиране и сигурни сделки в България.'],
    consultation: ['Безплатна консултация за недвижими имоти | BelEstateGroup', 'Запазете консултация с екипа на BelEstateGroup за покупка, продажба или инвестиция в недвижим имот.'],
    contact: ['Контакти | BelEstateGroup недвижими имоти Пловдив', 'Свържете се с BelEstateGroup в Пловдив за огледи, оферти и професионална помощ при сделки с недвижими имоти.'],
  },
  en: {
    home: ['BelEstateGroup | Real Estate in Plovdiv and Bulgaria', 'BelEstateGroup is a real estate agency in Plovdiv and the surrounding region. Browse apartments, houses, villas and land with professional legal support.'],
    listings: ['Properties for Sale in Plovdiv and the Region | BelEstateGroup', 'Browse verified apartments, houses, villas, land plots and commercial properties in Plovdiv and nearby locations.'],
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

export function SeoHead({ language, view, listingId }: { language: Language; view: ViewType; listingId?: number | null }) {
  useEffect(() => {
    const [title, description] = copy[language][view];
    const canonicalUrl = listingId ? `${SITE_URL}?listing=${listingId}` : view === 'home' ? SITE_URL : `${SITE_URL}?view=${view}`;
    document.documentElement.lang = language;
    document.title = title;
    setMeta('description', description);
    setProperty('og:title', title);
    setProperty('og:description', description);
    setProperty('og:locale', language === 'bg' ? 'bg_BG' : 'en_GB');
    setProperty('og:url', canonicalUrl);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setLink('canonical', canonicalUrl);
    setLink('alternate', `${canonicalUrl}${canonicalUrl.includes('?') ? '&' : '?'}lang=bg`, { hreflang: 'bg' });
    setLink('alternate', `${canonicalUrl}${canonicalUrl.includes('?') ? '&' : '?'}lang=en`, { hreflang: 'en' });
    setLink('alternate', canonicalUrl, { hreflang: 'x-default' });

    const businessSchema = {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      '@id': `${SITE_URL}#organization`,
      name: 'BelEstateGroup',
      url: SITE_URL,
      telephone: '+359898573681',
      email: 'estate_07@abv.bg',
      description,
      address: { '@type': 'PostalAddress', streetAddress: 'ул. Даме Груев 18', addressLocality: 'Пловдив', postalCode: '4000', addressCountry: 'BG' },
      areaServed: ['Пловдив', 'Марково', 'Белащица', 'Храбрино', 'Първенец'],
      priceRange: '€€€',
    };
    const itemListSchema = view === 'listings' ? {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: language === 'bg' ? 'Имоти за продажба в Пловдив и региона' : 'Properties for sale in Plovdiv and the region',
      numberOfItems: properties.length,
      itemListElement: properties.slice(0, 20).map((property, index) => ({
        '@type': 'ListItem', position: index + 1,
        url: `${SITE_URL}?listing=${property.id}`,
        name: language === 'bg' ? `${property.titleBg}, ${property.locationBg}` : `${property.titleEn}, ${property.locationEn}`,
      })),
    } : null;

    let script = document.head.querySelector<HTMLScriptElement>('script[data-seo-schema]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoSchema = 'true';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(itemListSchema ? [businessSchema, itemListSchema] : businessSchema);
  }, [language, view, listingId]);

  return null;
}
