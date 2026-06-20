import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyTrustUs } from './components/WhyTrustUs';
import { Properties } from './components/Properties';
import { Blog } from './components/Blog';
import { Booking } from './components/Booking';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Services } from './components/Services';

import { Language, ViewType, Property } from './types';
import { properties, translations, blogPosts } from './data/mockData';
import { Maximize2, BedDouble, Bath, Calendar, ChevronRight, Phone, Clock, ArrowRight, ShieldCheck, Building2 } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('bg');
  const [currentView, setView] = useState<ViewType>('home');

  // Search parameters pre-loaded from Hero search to Listings portfolio
  const [initialSearchQuery, setInitialSearchQuery] = useState('');
  const [initialSearchType, setInitialSearchType] = useState('all');
  const [initialSearchCity, setInitialSearchCity] = useState('all');

  // Consultation preselected notes topic
  const [consultationTopic, setConsultationTopic] = useState('');

  // Selected property for homepage featured listings viewing popup redirect (linked to Properties modal)
  const [homepageSelectedProperty, setHomepageSelectedProperty] = useState<Property | null>(null);

  const t = translations[language];

  // Scroll to top on tab change for excellent UX
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView]);

  // Handle search submit on hero
  const handleHeroSearch = (query: string, type: string, city: string) => {
    setInitialSearchQuery(query);
    setInitialSearchType(type);
    setInitialSearchCity(city);
    setView('listings');
  };

  // Handle consultation booking redirect from other tabs
  const handleConsultationRedirect = (topic: string) => {
    setConsultationTopic(topic);
    setView('consultation');
  };

  // Read only featured listings for homepage preview
  const featuredProperties = properties.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-[#C5A059] selection:text-[#1A2B3C]" id="bel-estate-root">
      
      {/* 100% Bilingual Header Navigation bar with language switcher */}
      <Header 
        currentView={currentView}
        setView={setView}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main View router */}
      <main className="flex-1" id="main-content-scroller">
        
        {currentView === 'home' && (
          <div id="view-homepage" className="animate-fade-in">
            {/* Hero Section with Quick Search properties form */}
            <Hero 
              language={language}
              onSearch={handleHeroSearch}
            />

            {/* WHY TRUST US (Core Brand Values & Corporate Stats) */}
            <WhyTrustUs language={language} />

            {/* FEATURED PROPERTIES SECTION (Legacy Houses / Estates) */}
            <section className="py-20 bg-slate-50 border-t border-b border-slate-100" id="homepage-featured-estates">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Visual Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold font-sans block mb-3">
                    {language === 'bg' ? 'ОГРАНИЧЕНА СЕЛЕКЦИЯ' : 'REPRESENTATIVE EDITION'}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A2B3C] tracking-tight mb-4">
                    {t.sectionFeatured}
                  </h2>
                  <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-5" />
                  <p className="font-sans text-slate-600 text-sm sm:text-base font-light">
                    {t.sectionFeaturedSub}
                  </p>
                </div>

                {/* Grid items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {featuredProperties.map((property) => (
                    <div 
                      key={property.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full"
                    >
                      {/* Image section with category badge */}
                      <div className="relative h-64 overflow-hidden bg-slate-900">
                        <img 
                          src={property.image} 
                          alt={language === 'bg' ? property.titleBg : property.titleEn} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 bg-[#1A2B3C] text-[#C5A059] px-3 py-1 text-[10px] font-sans font-bold tracking-widest uppercase rounded border border-[#C5A059]/30 rounded-full">
                          {language === 'bg' 
                            ? (property.typeKey === 'villa' ? t.villa : property.typeKey === 'penthouse' ? t.penthouse : property.typeKey === 'apartment' ? t.apartment : t.house)
                            : (property.typeKey === 'villa' ? t.villa : property.typeKey === 'penthouse' ? t.penthouse : property.typeKey === 'apartment' ? t.apartment : t.house)
                          }
                        </div>
                      </div>

                      {/* Info details */}
                      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1 text-slate-400 text-xs font-sans mb-2 font-medium">
                            <span className="text-slate-500">{language === 'bg' ? property.locationBg : property.locationEn}</span>
                          </div>
                          
                          <h3 className="font-serif text-lg font-bold text-[#1A2B3C] tracking-tight mb-4 group-hover:text-[#C5A059] transition-colors leading-snug line-clamp-1">
                            {language === 'bg' ? property.titleBg : property.titleEn}
                          </h3>

                          {/* Quick spec checklist */}
                          <div className={`grid ${['apartment', 'house', 'villa', 'penthouse'].includes(property.typeKey) ? 'grid-cols-4' : 'grid-cols-2'} gap-2 py-3 border-t border-b border-slate-100 mb-5 text-center text-[11px] font-medium text-slate-500`}>
                            <div className="flex flex-col items-center">
                              <Maximize2 className="h-4 w-4 text-[#C5A059] mb-1" />
                              <span className="font-mono text-xs font-bold text-[#1A2B3C]">{property.sqMeters}</span>
                              <span className="uppercase text-[9px] text-slate-400 font-sans">{t.sqmLabel}</span>
                            </div>
                            {['apartment', 'house', 'villa', 'penthouse'].includes(property.typeKey) && (
                              <>
                                <div className="flex flex-col items-center">
                                  <BedDouble className="h-4 w-4 text-[#C5A059] mb-1" />
                                  <span className="font-mono text-xs font-bold text-[#1A2B3C]">{property.rooms}</span>
                                  <span className="uppercase text-[9px] text-slate-400 font-sans">{t.roomsLabel}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <Bath className="h-4 w-4 text-[#C5A059] mb-1" />
                                  <span className="font-mono text-xs font-bold text-[#1A2B3C]">{property.bathrooms}</span>
                                  <span className="uppercase text-[9px] text-slate-400 font-sans">{t.bathroomsLabel}</span>
                                </div>
                              </>
                            )}
                            <div className="flex flex-col items-center">
                              <Calendar className="h-4 w-4 text-[#C5A059] mb-1" />
                              <span className="font-mono text-xs font-bold text-[#1A2B3C]">{property.yearBuilt}</span>
                              <span className="uppercase text-[9px] text-slate-400 font-sans">{t.yearLabel}</span>
                            </div>
                          </div>
                        </div>

                        {/* Price & view redirect button */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex flex-col">
                            <span className="text-[9px] text-slate-400 uppercase font-sans tracking-wider font-semibold">{language === 'bg' ? 'ОЦЕНКА' : 'VALUATION'}</span>
                            <span className="font-serif text-lg font-bold text-[#1A2B3C]">
                              {property.price === 0 
                                ? (language === 'bg' ? 'При запитване' : 'Price on Request')
                                : `€${property.price.toLocaleString()}`
                              }
                            </span>
                          </div>
                          
                          <button
                            onClick={() => {
                              // Load search parameter to filter list or just take them directly to listings to inspect details
                              setInitialSearchQuery(language === 'bg' ? property.titleBg : property.titleEn);
                              setInitialSearchType(property.typeKey);
                              setInitialSearchCity(property.cityKey);
                              setView('listings');
                            }}
                            className="inline-flex items-center gap-1 bg-[#1A2B3C] hover:bg-[#C5A059] text-white hover:text-[#1A2B3C] px-3.5 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors"
                          >
                            <span>{t.viewDetails}</span>
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>

                {/* Inline link to all properties page view */}
                <div className="text-center">
                  <button
                    onClick={() => {
                      setInitialSearchQuery('');
                      setInitialSearchType('all');
                      setInitialSearchCity('all');
                      setView('listings');
                    }}
                    className="inline-flex items-center gap-2 border-2 border-[#1A2B3C] hover:bg-[#1A2B3C] text-[#1A2B3C] hover:text-white px-6 py-3.5 rounded-lg font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300"
                    id="homepage-view-all-portfolio"
                  >
                    <span>{language === 'bg' ? 'Разгледайте Цялото Портфолио' : 'View Complete Portfolio'}</span>
                    <Building2 className="h-4 w-4" />
                  </button>
                </div>

              </div>
            </section>

            {/* INSTANT TRUST-BUILDING EDITORIAL PROMOTION ON HOME */}
            <section className="py-20 bg-white" id="homepage-editorial-teaser">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#1A2B3C] text-white p-8 sm:p-12 md:p-16 rounded-3xl border border-[#C5A059]/30 relative overflow-hidden flex flex-col md:flex-row gap-10 items-center shadow-2xl">
                  {/* Backdrop gold grid */}
                  <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                  
                  {/* Left block teaser illustration */}
                  <div className="w-full md:w-1/2 space-y-6 relative z-10">
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold font-sans block">
                      {language === 'bg' ? 'СБОРНИК ПРАВНИ НОРМИ 2026' : 'LEGAL MANUAL 2026'}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-white">
                      {blogPeaks()[0].title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {blogPeaks()[0].excerpt}
                    </p>
                    <button
                      onClick={() => setView('blog')}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A059] hover:text-white uppercase tracking-widest pt-2"
                    >
                      <span>{language === 'bg' ? 'Прочетете статията за безопасност →' : 'Read legal guide →'}</span>
                    </button>
                  </div>

                  {/* Right teaser decoration image or quick stats */}
                  <div className="w-full md:w-1/2 relative bg-[#0f1a24] h-72 rounded-xl overflow-hidden border border-[#C5A059]/10">
                    <img 
                      src={blogPeaks()[0].image} 
                      alt="law contract signing" 
                      className="w-full h-full object-cover opacity-80"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a24] to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-white/50">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-[#C5A059]" /> 5 min read</span>
                      <span className="bg-[#1A2B3C] border border-[#C5A059]/20 text-[#C5A059] px-2.5 py-0.5 rounded text-[10px] font-bold font-sans uppercase">Legal Advice</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* INSTANT INTERACTIVE VIDEO ADVISORY CALL TO ACTION */}
            <section className="py-20 bg-slate-100/50 border-t border-slate-200" id="homepage-recap-cta">
              <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
                <div className="bg-[#C5A059]/10 p-3 rounded-full w-fit mx-auto border border-[#C5A059]/20 mb-2 animate-bounce">
                  <Phone className="h-6 w-6 text-[#C5A059]" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A2B3C] tracking-tight">
                  {language === 'bg' ? 'Предварителна юридическа оценка на Вашия бюджет' : 'Complimentary Assessment on Acquisition Capital'}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-light leading-relaxed">
                  {language === 'bg' 
                    ? 'Планирайте 15-минутна лична или телефонна консултация в нашия централен офис, за да проверим държавните тежести на желания от Вас имот.'
                    : 'Schedule a private 15-minute personal or phone consultation to audit building structures and check ownership histories.'}
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setConsultationTopic(language === 'bg' ? 'Обща покупка / Финансов анализ' : 'Acquisition of premium Bulgarian property');
                      setView('consultation');
                    }}
                    className="bg-[#1A2B3C] hover:bg-[#C5A059] hover:text-[#1A2B3C] text-white px-8 py-4 rounded-xl font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow shadow-md"
                    id="homepage-book-consult-btn"
                  >
                    {t.navConsultation}
                  </button>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* View Router listings */}
        {currentView === 'listings' && (
          <Properties 
            language={language}
            initialQuery={initialSearchQuery}
            initialType={initialSearchType}
            initialCity={initialSearchCity}
            onBookPropertyConsultation={handleConsultationRedirect}
          />
        )}

        {/* View Router Services catalog */}
        {currentView === 'services' && (
          <Services 
            language={language}
            setView={setView}
          />
        )}

        {/* View Router Blog Editorial articles */}
        {currentView === 'blog' && (
          <Blog 
            language={language}
            onConsult={handleConsultationRedirect}
          />
        )}

        {/* View Router Booking Consultation forms calendar */}
        {currentView === 'consultation' && (
          <Booking 
            language={language}
            preselectedTopic={consultationTopic}
          />
        )}

        {/* View Router Directory Contact forms maps */}
        {currentView === 'contact' && (
          <Contact language={language} />
        )}

      </main>

      {/* Main Bottom Footer block */}
      <Footer 
        language={language}
        setView={setView}
      />

    </div>
  );

  // Helper to retrieve translated teasers
  function blogPeaks() {
    return blogPosts.map(post => ({
      title: language === 'bg' ? post.titleBg : post.titleEn,
      excerpt: language === 'bg' ? post.excerptBg : post.excerptEn,
      image: post.image
    }));
  }
}
