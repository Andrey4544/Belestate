export type Language = 'bg' | 'en';

export type ViewType = 'home' | 'listings' | 'services' | 'blog' | 'consultation' | 'contact';

export interface PropertyParameter {
  label: string;
  value: string;
  raw: string;
}

export interface Property {
  id: number;
  sourceId: string;
  sourceUrl: string;
  titleBg: string;
  titleEn: string;
  descriptionBg: string;
  descriptionEn: string;
  price: number;
  priceDisplay: string;
  currency: string;
  pricePerSqm: string;
  vatStatus: string;
  publishedAt: string;
  views: number | null;
  locationBg: string;
  locationEn: string;
  cityKey: string;
  typeKey: string;
  propertyTypeBg: string;
  transactionBg: string;
  sqMeters: number;
  areaRaw: string;
  rooms: number;
  bathrooms: number;
  yearBuilt: number;
  image: string;
  gallery: string[];
  galleryAlt: string[];
  featured: boolean;
  featuresBg: string[];
  featuresEn: string[];
  parameters: PropertyParameter[];
  agencyName: string;
  agencyPhones: string;
  agencyAddress: string;
  contactPhone: string;
  agentProfileUrl: string;
  sourceText: string;
}

export interface BlogPost {
  id: number;
  titleBg: string;
  titleEn: string;
  excerptBg: string;
  excerptEn: string;
  contentBg: string;
  contentEn: string;
  date: string;
  categoryBg: string;
  categoryEn: string;
  readTimeBg: string;
  readTimeEn: string;
  image: string;
}

export interface ConsultationBooking {
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  notes?: string;
  type: string;
}

export interface ContactInquiry {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyTitle?: string;
}
