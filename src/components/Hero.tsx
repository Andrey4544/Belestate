import React, { useState } from 'react';
import { Search, MapPin, Building2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/mockData';

interface HeroProps {
  language: Language;
  onSearch: (query: string, type: string, city: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onSearch }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [city, setCity] = useState('all');
  
  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, type, city);
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0f1a24]" id="hero-section">
      
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80" 
          alt="Premium Estate Background" 
          className="w-full h-full object-cover object-center opacity-40 scale-105 filter brightness-90 animate-subtle-zoom"
          referrerPolicy="no-referrer"
        />
        {/* Deep Navy/Charcoal gradients to melt with white background on the next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a24] via-[#1A2B3C]/80 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#0f1a24]/90" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        
        {/* Subtle Luxury Badge */}
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 border border-[#C5A059]/40 bg-[#1A2B3C]/90 rounded-full mb-8 animate-fade-in-up"
          id="hero-badge"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
          <span className="text-xs uppercase font-sans tracking-widest text-[#C5A059] font-semibold">
            {t.brandTagline}
          </span>
        </div>

        {/* Playfair Display High Impact Heading */}
        <h1 
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6 drop-shadow-md text-balance"
          id="hero-main-title"
        >
          {t.heroTitle}
        </h1>

        {/* Balanced Body text */}
        <p 
          className="font-sans text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          id="hero-subtitle"
        >
          {t.heroSubtitle}
        </p>

        {/* Luxurious Sticky/Floating Search Bar */}
        <div className="max-w-4xl mx-auto w-full" id="hero-search-wrapper">
          <form 
            onSubmit={handleSubmit}
            className="bg-[#1A2B3C] p-4 sm:p-5 rounded-xl border border-[#C5A059]/30 shadow-2xl flex flex-col md:flex-row gap-4 items-stretch"
            id="search-form"
          >
            
            {/* Location Input Field */}
            <div className="flex-1 min-w-0 relative flex items-center border-b md:border-b-0 md:border-r border-slate-700/50 pb-3 md:pb-0 md:pr-4">
              <Search className="h-5 w-5 text-[#C5A059] absolute left-3" />
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-11 pr-3 py-2 bg-transparent text-white font-sans text-sm placeholder-slate-400 focus:outline-none"
                id="search-input-field"
              />
            </div>

            {/* Property Type Filter dropdown */}
            <div className="relative flex items-center border-b md:border-b-0 md:border-r border-slate-700/50 pb-3 md:pb-0 md:pr-4 md:min-w-[170px]" id="filter-type-container">
              <Building2 className="h-4.5 w-4.5 text-[#C5A059] absolute left-3 pointer-events-none" />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full pl-10 pr-6 py-2 bg-transparent text-slate-200 font-sans text-sm focus:outline-none appearance-none cursor-pointer"
                id="search-type-dropdown"
              >
                <option value="all" className="bg-[#1A2B3C] text-white">{t.allTypes}</option>
                <option value="house" className="bg-[#1A2B3C] text-white">{t.house}</option>
                <option value="villa" className="bg-[#1A2B3C] text-white">{t.villa}</option>
                <option value="apartment" className="bg-[#1A2B3C] text-white">{t.apartment}</option>
                <option value="penthouse" className="bg-[#1A2B3C] text-white">{t.penthouse}</option>
              </select>
              <span className="absolute right-2 text-slate-300 pointer-events-none text-[10px]">▼</span>
            </div>

            {/* Location dropdown */}
            <div className="relative flex items-center border-b md:border-b-0 pb-3 md:pb-0 md:pr-4 md:min-w-[170px]" id="filter-city-container">
              <MapPin className="h-4.5 w-4.5 text-[#C5A059] absolute left-3 pointer-events-none" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full pl-10 pr-6 py-2 bg-transparent text-slate-200 font-sans text-sm focus:outline-none appearance-none cursor-pointer"
                id="search-city-dropdown"
              >
                <option value="all" className="bg-[#1A2B3C] text-white">{t.allCities}</option>
                <option value="sofia" className="bg-[#1A2B3C] text-white">{t.sofia}</option>
                <option value="varna" className="bg-[#1A2B3C] text-white">{t.varna}</option>
                <option value="plovdiv" className="bg-[#1A2B3C] text-white">{t.plovdiv}</option>
                <option value="bansko" className="bg-[#1A2B3C] text-white">{t.bansko}</option>
              </select>
              <span className="absolute right-2 text-slate-300 pointer-events-none text-[10px]">▼</span>
            </div>

            {/* Launch Search Button */}
            <button 
              type="submit"
              className="bg-[#C5A059] hover:bg-[#b48f48] text-[#1A2B3C] px-6 py-3.5 rounded-lg font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg active:scale-95 whitespace-nowrap"
              id="search-submit-btn"
            >
              <Search className="h-4 w-4" />
              <span>{t.btnSearch}</span>
            </button>

          </form>
        </div>

      </div>

    </section>
  );
};
