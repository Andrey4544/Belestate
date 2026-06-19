import React, { useState, useEffect } from 'react';
import { Search, MapPin, Maximize2, BedDouble, Bath, Calendar, X, Building2, SlidersHorizontal, ArrowUpDown, ChevronRight, CheckCircle2, Phone, Mail } from 'lucide-react';
import { Language, Property, ContactInquiry } from '../types';
import { properties, translations } from '../data/mockData';

interface PropertiesProps {
  language: Language;
  initialQuery?: string;
  initialType?: string;
  initialCity?: string;
  onBookPropertyConsultation?: (propertyTitle: string) => void;
}

export const Properties: React.FC<PropertiesProps> = ({
  language,
  initialQuery = '',
  initialType = 'all',
  initialCity = 'all',
  onBookPropertyConsultation
}) => {
  const t = translations[language];

  // Filter States
  const [search, setSearch] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [sortBy, setSortBy] = useState('price-desc');
  
  // Track Active Modal Property
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // Inquiry Form inside the detailing modal
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Synchronize initial search fields when they trigger from Hero
  useEffect(() => {
    setSearch(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setSelectedType(initialType);
  }, [initialType]);

  useEffect(() => {
    setSelectedCity(initialCity);
  }, [initialCity]);

  // Handle inquiry submission
  const handleInquirySubmit = (e: React.FormEvent, property: Property) => {
    e.preventDefault();
    const title = language === 'bg' ? property.titleBg : property.titleEn;
    
    // Send dynamic email using FormSubmit
    fetch("https://formsubmit.co/ajax/abelev48@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        _subject: `Ново Запитване за Имот: ${title}`,
        "Избран Имот / Property": title,
        "Цена / Price": property.price === 0 ? "При запитване / Price on Request" : `€${property.price.toLocaleString()}`,
        "Име на контакт / Contact Name": inquiryName,
        "Имейл / Email": inquiryEmail,
        "Телефон / Phone": inquiryPhone,
        "Съобщение / Message": inquiryMsg
      })
    }).catch(err => console.error("Inquiry Dispatch Error:", err));

    // Store in LocalStorage or memory to simulate state saving
    const savedInquiries = JSON.parse(localStorage.getItem('bel_estate_inquiries') || '[]');
    const newInquiry: ContactInquiry = {
      name: inquiryName,
      email: inquiryEmail,
      phone: inquiryPhone,
      message: inquiryMsg,
      propertyTitle: title
    };
    localStorage.setItem('bel_estate_inquiries', JSON.stringify([...savedInquiries, newInquiry]));

    setInquirySuccess(true);
    // Reset form after timer
    setTimeout(() => {
      setInquiryName('');
      setInquiryEmail('');
      setInquiryPhone('');
      setInquiryMsg('');
      setInquirySuccess(false);
    }, 5000);
  };

  // Helper selectors for dynamic types and cities extraction
  const getUniqueTypes = () => {
    const types = new Set<string>();
    properties.forEach(p => {
      if (p.typeKey) types.add(p.typeKey);
    });
    return Array.from(types);
  };

  const getPropertyTypeLabel = (typeKey: string) => {
    if (language === 'bg') {
      if (typeKey === 'apartment') return 'Стандартен Апартамент';
      if (typeKey === 'house') return 'Фамилна Къща';
      if (typeKey === 'villa') return 'Луксозна Вила';
      if (typeKey === 'penthouse') return 'Пентхаус / Мезонет';
      if (typeKey === 'land') return 'Парцел / УПИ / Земя';
      if (typeKey === 'commercial') return 'Търговски обект / Офис';
      if (typeKey === 'garage') return 'Собствен Гараж';
      if (typeKey === 'industrial') return 'Склад / Промишлено помещение';
    } else {
      if (typeKey === 'apartment') return 'Standard Apartment';
      if (typeKey === 'house') return 'Family Country House';
      if (typeKey === 'villa') return 'Luxury Villa';
      if (typeKey === 'penthouse') return 'Luxury Penthouse';
      if (typeKey === 'land') return 'Plot / Development Land';
      if (typeKey === 'commercial') return 'Commercial Store / Office';
      if (typeKey === 'garage') return 'Secure Garage Box';
      if (typeKey === 'industrial') return 'Warehouse / Industrial Yard';
    }
    return typeKey.toUpperCase();
  };

  const getUniqueCities = () => {
    const cities = new Set<string>();
    properties.forEach(p => {
      if (p.cityKey) cities.add(p.cityKey);
    });
    return Array.from(cities).sort((a, b) => a.localeCompare(b, 'bg'));
  };

  const getPropertyCityLabel = (cityKey: string) => {
    if (language === 'bg') {
      return cityKey;
    } else {
      if (cityKey === 'Пловдив') return 'Plovdiv';
      if (cityKey === 'с. Храбрино') return 'Hrabrino Village';
      if (cityKey === 'с. Марково') return 'Markovo Village';
      if (cityKey === 'с. Белащица') return 'Belashtitsa Village';
      if (cityKey === 'с. Първенец') return 'Parvenets Village';
      if (cityKey === 'с. Брестник') return 'Brestnik Village';
      if (cityKey === 'Съединение') return 'Saedinenie Town';
      if (cityKey === 'с. Царацово') return 'Tsaratsovo Village';
      return cityKey;
    }
  };

  // Filter & Sort Logic
  const filteredProperties = properties.filter((property) => {
    const title = language === 'bg' ? property.titleBg.toLowerCase() : property.titleEn.toLowerCase();
    const description = language === 'bg' ? property.descriptionBg.toLowerCase() : property.descriptionEn.toLowerCase();
    const location = language === 'bg' ? property.locationBg.toLowerCase() : property.locationEn.toLowerCase();
    const searchQuery = search.toLowerCase();

    const matchesSearch = title.includes(searchQuery) || 
                          description.includes(searchQuery) || 
                          location.includes(searchQuery);

    const matchesType = selectedType === 'all' || property.typeKey === selectedType;
    const matchesCity = selectedCity === 'all' || property.cityKey === selectedCity;
    const matchesPrice = maxPrice === 2000000 ? true : property.price <= maxPrice;

    return matchesSearch && matchesType && matchesCity && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'sqm-asc') return a.sqMeters - b.sqMeters;
    if (sortBy === 'sqm-desc') return b.sqMeters - a.sqMeters;
    return 0;
  });

  const resetAllFilters = () => {
    setSearch('');
    setSelectedType('all');
    setSelectedCity('all');
    setMaxPrice(2000000);
    setSortBy('price-desc');
  };

  return (
    <section className="py-20 bg-slate-50 min-h-screen relative" id="listings-sectionOff">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold font-sans block mb-3">
            {language === 'bg' ? 'ПРОВЕРЕН КАТАЛОГ СГРАДИ' : 'CERTIFIED PORTFOLIO'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A2B3C] tracking-tight mb-4">
            {t.portfolioTitle}
          </h2>
          <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-5" />
          <p className="font-sans text-slate-600 text-sm sm:text-base font-light">
            {t.portfolioSubtitle}
          </p>
        </div>

        {/* Filter Console Panel */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 mb-10" id="filter-console">
          
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
            <SlidersHorizontal className="h-5 w-5 text-[#C5A059]" />
            <h3 className="font-serif text-lg font-bold text-[#1A2B3C] uppercase tracking-wide">
              {language === 'bg' ? 'Разширено търсене' : 'Advanced Filters'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Direct Input Search */}
            <div>
              <label className="block text-xs font-semibold text-[#1A2B3C] uppercase tracking-wider mb-2 font-sans">
                {language === 'bg' ? 'Текст / Ключова дума' : 'Keyword Search'}
              </label>
              <div className="relative">
                <Search className="h-4.5 w-4.5 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={language === 'bg' ? 'Бояна, камина, вила...' : 'Boyana, fireplace, sea view...'}
                  className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm font-sans focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                  id="filter-term"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-xs font-semibold text-[#1A2B3C] uppercase tracking-wider mb-2 font-sans">
                {t.filterType}
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white font-sans focus:outline-none focus:border-[#C5A059] appearance-none"
                id="filter-type"
              >
                <option value="all">{t.allTypes}</option>
                {getUniqueTypes().map(type => (
                  <option key={type} value={type}>{getPropertyTypeLabel(type)}</option>
                ))}
              </select>
            </div>

            {/* City Location Filter */}
            <div>
              <label className="block text-xs font-semibold text-[#1A2B3C] uppercase tracking-wider mb-2 font-sans">
                {t.filterCity}
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white font-sans focus:outline-none focus:border-[#C5A059] appearance-none"
                id="filter-city"
              >
                <option value="all">{t.allCities}</option>
                {getUniqueCities().map(city => (
                  <option key={city} value={city}>{getPropertyCityLabel(city)}</option>
                ))}
              </select>
            </div>

            {/* Budget range slider */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-semibold text-[#1A2B3C] uppercase tracking-wider font-sans">
                  {t.priceRange}
                </label>
                <span className="text-xs font-mono font-bold text-[#C5A059]">
                  {maxPrice === 2000000 
                    ? (language === 'bg' ? 'Без лимит' : 'No Limit') 
                    : `€${maxPrice.toLocaleString()}`}
                </span>
              </div>
              <input 
                type="range"
                min="0"
                max="2000000"
                step="50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
                id="filter-price-slider"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>€0</span>
                <span>€2.0M+</span>
              </div>
            </div>

          </div>

          {/* Sorting and quick console resetting buttons */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <ArrowUpDown className="h-4.5 w-4.5 text-[#C5A059]" />
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-sans font-medium">{t.sortBy}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-sm font-sans text-[#1A2B3C] font-semibold focus:outline-none focus:underline"
                  id="sort-select"
                >
                  <option value="price-desc">{t.sortPriceDesc}</option>
                  <option value="price-asc">{t.sortPriceAsc}</option>
                  <option value="sqm-desc">{t.sortSqmDesc}</option>
                  <option value="sqm-asc">{t.sortSqmAsc}</option>
                </select>
              </div>
            </div>

            {/* Clear filters buttons if fields are active */}
            {(search !== '' || selectedType !== 'all' || selectedCity !== 'all' || maxPrice !== 1500000) && (
              <button
                onClick={resetAllFilters}
                className="text-xs font-semibold text-rose-600 hover:text-rose-800 tracking-wider uppercase flex items-center justify-center gap-1 cursor-pointer transition-colors"
                id="reset-filters-btn"
              >
                <X className="h-3.5 w-3.5" />
                <span>{t.resetFilters}</span>
              </button>
            )}

          </div>

        </div>

        {/* Counter of properties found */}
        <div className="mb-6 flex justify-between items-center px-2">
          <span className="text-xs font-sans text-slate-500 font-light">
            {language === 'bg' 
              ? `Намерени са ${filteredProperties.length} премиум обекта`
              : `Found ${filteredProperties.length} luxury properties`}
          </span>
        </div>

        {/* Listings Portfolio Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="properties-portfolio-grid">
            {filteredProperties.map((property) => (
              <div 
                key={property.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full"
                id={`property-card-${property.id}`}
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img 
                    src={property.image} 
                    alt={language === 'bg' ? property.titleBg : property.titleEn} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category Golden Tag */}
                  <div className="absolute top-4 left-4 bg-[#1A2B3C] text-[#C5A059] px-3.5 py-1 text-[10px] font-sans font-bold tracking-widest uppercase rounded border border-[#C5A059]/30 rounded-full shadow-md">
                    {getPropertyTypeLabel(property.typeKey)}
                  </div>
                  {/* Energy standard status in top-right */}
                  <div className="absolute top-4 right-4 bg-emerald-600 border border-emerald-500 text-white px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase font-bold">
                    Class A+
                  </div>
                  {/* Transparent overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Geographic Location Label */}
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs font-sans mb-3 font-medium">
                      <MapPin className="h-3.5 w-3.5 text-[#C5A059]" />
                      <span>{language === 'bg' ? property.locationBg : property.locationEn}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg font-bold text-[#1A2B3C] tracking-tight group-hover:text-[#C5A059] transition-colors duration-200 mb-4 line-clamp-1">
                      {language === 'bg' ? property.titleBg : property.titleEn}
                    </h3>

                    {/* Property Specs Parameters Bar */}
                    <div className={`grid ${['apartment', 'house', 'villa', 'penthouse'].includes(property.typeKey) ? 'grid-cols-4' : 'grid-cols-2'} gap-2 py-4 border-t border-b border-slate-100 mb-5 text-center`}>
                      <div className="flex flex-col items-center">
                        <Maximize2 className="h-4.5 w-4.5 text-[#C5A059] mb-1.5" />
                        <span className="font-mono text-xs font-bold text-[#1A2B3C]">{property.sqMeters}</span>
                        <span className="text-[9px] text-[#333333] font-sans uppercase font-medium">{t.sqmLabel}</span>
                      </div>
                      {['apartment', 'house', 'villa', 'penthouse'].includes(property.typeKey) && (
                        <>
                          <div className="flex flex-col items-center">
                            <BedDouble className="h-4.5 w-4.5 text-[#C5A059] mb-1.5" />
                            <span className="font-mono text-xs font-bold text-[#1A2B3C]">{property.rooms}</span>
                            <span className="text-[9px] text-[#333333] font-sans uppercase font-medium">{t.roomsLabel}</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <Bath className="h-4.5 w-4.5 text-[#C5A059] mb-1.5" />
                            <span className="font-mono text-xs font-bold text-[#1A2B3C]">{property.bathrooms}</span>
                            <span className="text-[9px] text-[#333333] font-sans uppercase font-medium">{t.bathroomsLabel}</span>
                          </div>
                        </>
                      )}
                      <div className="flex flex-col items-center">
                        <Calendar className="h-4.5 w-4.5 text-[#C5A059] mb-1.5" />
                        <span className="font-mono text-xs font-bold text-[#1A2B3C]">{property.yearBuilt}</span>
                        <span className="text-[9px] text-[#333333] font-sans uppercase font-medium">{t.yearLabel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 uppercase font-sans font-semibold tracking-wider">
                        {language === 'bg' ? 'ИНВЕСТИЦИЯ' : 'VALUATION'}
                      </span>
                      <span className="font-serif text-lg sm:text-xl font-bold text-[#1A2B3C]">
                        {property.price === 0 
                          ? (language === 'bg' ? 'При запитване' : 'Price on Request')
                          : `€${property.price.toLocaleString()}`
                        }
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedProperty(property);
                        setActiveGalleryIndex(0);
                      }}
                      className="inline-flex items-center gap-1.5 bg-[#1A2B3C] hover:bg-[#C5A059] text-white hover:text-[#1A2B3C] px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm cursor-pointer"
                      id={`view-details-btn-${property.id}`}
                    >
                      <span>{t.viewDetails}</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty Search Fallback */
          <div className="text-center bg-white border border-slate-100 rounded-2xl p-12 max-w-lg mx-auto shadow-sm" id="empty-listings-fallback">
            <Building2 className="h-12 w-12 text-[#C5A059]/40 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-bold text-[#1A2B3C] mb-2">
              {language === 'bg' ? 'Няма намерени обекти' : 'No Estates Found'}
            </h3>
            <p className="font-sans text-xs text-slate-500 mb-6 font-light">
              {t.noResults}
            </p>
            <button
              onClick={resetAllFilters}
              className="bg-[#1A2B3C] hover:bg-[#C5A059] text-white hover:text-[#1A2B3C] font-sans text-xs font-bold tracking-wider uppercase px-5 py-3 rounded-lg transition-all duration-200"
              id="reset-fallback-btn"
            >
              {t.resetFilters}
            </button>
          </div>
        )}

      </div>

      {/* DETAILED PROPERTY DETAILS MODAL ACCORDION */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6" id="details-modal-wrapper">
          {/* Black high transparency backdrop */}
          <div 
            className="fixed inset-0 bg-[#0f1a24]/90 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedProperty(null)}
          />

          <div 
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-auto overflow-hidden border border-slate-100 z-10 animate-scale-up max-h-[90vh] flex flex-col"
            id="details-modal-card"
          >
            {/* Modal sticky bar */}
            <div className="sticky top-0 bg-[#1A2B3C] text-white px-6 py-4 flex items-center justify-between border-b border-[#C5A059]/20 z-20">
              <span className="font-serif text-sm tracking-widest font-bold text-[#C5A059] uppercase">
                {getPropertyTypeLabel(selectedProperty.typeKey)}
              </span>
              <button 
                onClick={() => setSelectedProperty(null)}
                className="text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition-colors"
                id="close-modal-btn"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
              
              {/* Photo Slider */}
              <div className="space-y-3">
                <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-slate-900 border border-slate-100 shadow-inner relative">
                  <img 
                    src={selectedProperty.gallery[activeGalleryIndex]} 
                    alt="Gallery slider detail" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 right-4 bg-[#1A2B3C]/80 px-3 py-1 rounded text-[10px] font-mono text-[#C5A059] border border-[#C5A059]/30">
                    {activeGalleryIndex + 1} / {selectedProperty.gallery.length}
                  </div>
                </div>

                {/* Micro thumbnails row */}
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {selectedProperty.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveGalleryIndex(idx)}
                      className={`relative w-20 h-14 rounded-md overflow-hidden bg-slate-100 flex-shrink-0 cursor-pointer border-2 transition-all ${
                        idx === activeGalleryIndex ? 'border-[#C5A059] scale-95 shadow-md' : 'border-slate-200 hover:border-slate-400'
                      }`}
                      id={`thumb-btn-${idx}`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Title Location & Price Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A2B3C] mb-2 tracking-tight">
                    {language === 'bg' ? selectedProperty.titleBg : selectedProperty.titleEn}
                  </h3>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs font-sans font-medium">
                    <MapPin className="h-4 w-4 text-[#C5A059]" />
                    <span>{language === 'bg' ? selectedProperty.locationBg : selectedProperty.locationEn}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl max-w-xs text-left sm:text-right">
                  <span className="text-[10px] text-slate-400 font-sans tracking-wider uppercase block font-semibold">
                    {language === 'bg' ? 'ОЦЕНКА НА ИМОТА' : 'ESTIMATE VALUATION'}
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#1A2B3C]">
                    {selectedProperty.price === 0 
                      ? (language === 'bg' ? 'При запитване' : 'Price on Request')
                      : `€${selectedProperty.price.toLocaleString()}`
                    }
                  </span>
                </div>
              </div>

              {/* Property Descriptions */}
              <div className="space-y-4">
                <h4 className="font-serif text-base font-bold text-[#1A2B3C] uppercase tracking-wide">
                  {t.descriptionTitle}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-light whitespace-pre-line">
                  {language === 'bg' ? selectedProperty.descriptionBg : selectedProperty.descriptionEn}
                </p>
              </div>

              {/* Core Specs Grid */}
              <div className="space-y-4 bg-slate-50 border border-slate-100 p-6 rounded-xl">
                <h4 className="font-serif text-sm font-bold text-[#1A2B3C] uppercase tracking-wide">
                  {t.specificationsTitle}
                </h4>
                <div className={`grid grid-cols-2 ${['apartment', 'house', 'villa', 'penthouse'].includes(selectedProperty.typeKey) ? 'sm:grid-cols-4' : 'sm:grid-cols-2'} gap-4 text-center mt-2`}>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-sans font-semibold tracking-wider block mb-1">
                      {language === 'bg' ? 'Квадратура' : 'Square Area'}
                    </span>
                    <span className="font-mono text-sm font-bold text-[#1A2B3C]">
                      {selectedProperty.sqMeters} {t.sqmLabel}
                    </span>
                  </div>
                  {['apartment', 'house', 'villa', 'penthouse'].includes(selectedProperty.typeKey) && (
                    <>
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                        <span className="text-[10px] text-slate-400 uppercase font-sans font-semibold tracking-wider block mb-1">
                          {language === 'bg' ? 'Помещения' : 'Rooms Count'}
                        </span>
                        <span className="font-mono text-sm font-bold text-[#1A2B3C]">
                          {selectedProperty.rooms} {t.roomsLabel}
                        </span>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                        <span className="text-[10px] text-slate-400 uppercase font-sans font-semibold tracking-wider block mb-1">
                          {language === 'bg' ? 'Санитарни възли' : 'Bathrooms'}
                        </span>
                        <span className="font-mono text-sm font-bold text-[#1A2B3C]">
                          {selectedProperty.bathrooms} {t.bathroomsLabel}
                        </span>
                      </div>
                    </>
                  )}
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-sans font-semibold tracking-wider block mb-1">
                      {language === 'bg' ? 'Построена' : 'Year Built'}
                    </span>
                    <span className="font-mono text-sm font-bold text-[#1A2B3C]">
                      {selectedProperty.yearBuilt}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rich Features checklist */}
              <div className="space-y-4">
                <h4 className="font-serif text-base font-bold text-[#1A2B3C] uppercase tracking-wide">
                  {t.featuresTitle}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="features-list-grid">
                  {(language === 'bg' ? selectedProperty.featuresBg : selectedProperty.featuresEn).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-sans text-slate-600 font-medium">
                      <CheckCircle2 className="h-4.5 w-4.5 text-[#C5A059] flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Integrated Instant Inquiry Form */}
              <div className="border-t border-slate-100 pt-8" id="inquiry-form-container">
                <div className="bg-[#1A2B3C] text-white p-6 sm:p-8 rounded-xl border border-[#C5A059]/30">
                  <h4 className="font-serif text-base font-bold text-[#C5A059] uppercase tracking-wide mb-2">
                    {t.inquiryTitle}
                  </h4>
                  <p className="font-sans text-[11px] sm:text-xs text-slate-300 mb-6 font-light">
                    {language === 'bg' 
                      ? 'След изпращане, наш юрист ще подготви вещно техническия замер на имота и ще Ви изпрати официално писмо за планиране на частен оглед.'
                      : 'After submission, our legal advisory executives will finalize all ownership registries and respond to confirm private tour opportunities.'}
                  </p>

                  {inquirySuccess ? (
                    <div className="bg-emerald-600/20 border border-emerald-500/50 p-6 rounded-lg text-center text-emerald-200 font-sans" id="inquiry-success-block">
                      <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
                      <p className="text-sm font-semibold">{t.contactSuccess}</p>
                    </div>
                  ) : (
                    <form onSubmit={(e) => handleInquirySubmit(e, selectedProperty)} className="space-y-4" id="modal-inquiry-form">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <input 
                          type="text" 
                          required
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          placeholder={t.bookingFormName}
                          className="w-full bg-white/5 border border-[#C5A059]/30 rounded-lg px-3.5 py-2 text-xs font-sans text-slate-100 focus:outline-none focus:border-[#C5A059] placeholder-slate-400"
                        />
                        <input 
                          type="email" 
                          required
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          placeholder={t.bookingFormEmail}
                          className="w-full bg-white/5 border border-[#C5A059]/30 rounded-lg px-3.5 py-2 text-xs font-sans text-slate-100 focus:outline-none focus:border-[#C5A059] placeholder-slate-400"
                        />
                        <input 
                          type="tel" 
                          required
                          value={inquiryPhone}
                          onChange={(e) => setInquiryPhone(e.target.value)}
                          placeholder={t.bookingFormPhone}
                          className="w-full bg-white/5 border border-[#C5A059]/30 rounded-lg px-3.5 py-2 text-xs font-sans text-slate-100 focus:outline-none focus:border-[#C5A059] placeholder-slate-400"
                        />
                      </div>
                      <textarea
                        required
                        rows={3}
                        value={inquiryMsg}
                        onChange={(e) => setInquiryMsg(e.target.value)}
                        placeholder={language === 'bg' ? 'Здравейте, желая да получа пълно досие за имота и да запланираме оглед...' : 'Hello, I would like to receive the legal dossier of this property and schedule a private tour...'}
                        className="w-full bg-white/5 border border-[#C5A059]/30 rounded-lg p-3.5 text-xs font-sans text-slate-100 focus:outline-none focus:border-[#C5A059] placeholder-slate-400 focus:ring-1 focus:ring-[#C5A059]"
                      />
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 text-[10px] text-slate-300 font-sans">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-[#C5A059]" />
                            <a href="tel:0898573681" className="hover:text-[#C5A059] transition-colors">0898 573 681</a>
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-[#C5A059]" />
                            <a href="mailto:estate_07@abv.bg" className="hover:text-[#C5A059] transition-colors">estate_07@abv.bg</a>
                          </span>
                        </div>
                        <button
                          type="submit"
                          className="bg-[#C5A059] hover:bg-[#b48f48] text-[#1A2B3C] font-semibold text-xs tracking-wider uppercase px-5 py-3 rounded-lg transition-all duration-300 shadow-md font-medium"
                          id="submit-inquiry-btn"
                        >
                          {language === 'bg' ? 'Изпрати Моментално Запитване' : 'Submit Fast Inquiry'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Extra button to switch to consultative tab */}
              <div className="text-center pt-4">
                <button
                  onClick={() => {
                    setSelectedProperty(null);
                    if (onBookPropertyConsultation) {
                      const title = language === 'bg' ? selectedProperty.titleBg : selectedProperty.titleEn;
                      onBookPropertyConsultation(title);
                    }
                  }}
                  className="text-xs font-sans font-bold uppercase tracking-wider text-[#C5A059] hover:text-[#b48f48] transition-colors"
                  id="modal-consultation-redirect"
                >
                  {language === 'bg' ? 'Или запазете специален час за личен оглед или консултация за този имот →' : 'Or book a private tour or detailed consultation regarding this estate →'}
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
