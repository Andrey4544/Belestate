import React, { useState } from 'react';
import { ShieldCheck, Menu, X, Globe, Phone } from 'lucide-react';
import { Language, ViewType } from '../types';
import { translations } from '../data/mockData';

interface HeaderProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setView,
  language,
  setLanguage
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  const handleNavClick = (view: ViewType) => {
    setView(view);
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'bg' ? 'en' : 'bg');
  };

  const navItems: { view: ViewType; label: string }[] = [
    { view: 'home', label: t.navHome },
    { view: 'listings', label: t.navListings },
    { view: 'services', label: t.navServices },
    { view: 'blog', label: t.navBlog },
    { view: 'consultation', label: t.navConsultation },
    { view: 'contact', label: t.navContact }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#1A2B3C] text-white shadow-xl border-b border-[#C5A059]/20" id="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Brand Section */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
            id="brand-logo-container"
          >
            <div className="bg-[#C5A059] p-2 rounded-md shadow-md transition-transform duration-300 group-hover:scale-105">
              <ShieldCheck className="h-6 w-6 text-[#1A2B3C]" id="brand-logo-shield" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-widest font-bold text-white uppercase group-hover:text-[#C5A059] transition-colors duration-200">
                BelEstateGroup
              </span>
              <span className="text-[10px] tracking-wider text-[#C5A059] font-sans font-light -mt-1 uppercase">
                {language === 'bg' ? 'агенция - недвижими имоти' : 'real estate agency'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Navigation */}
          <nav className="hidden lg:flex space-x-1 xl:space-x-4" id="desktop-nav-menu">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`px-3 py-2 text-sm font-sans tracking-wide transition-all duration-200 relative group font-medium ${
                    isActive ? 'text-[#C5A059]' : 'text-slate-300 hover:text-white'
                  }`}
                  id={`nav-link-${item.view}`}
                >
                  {item.label}
                  {/* Glowing Underline Accent */}
                  <span className={`absolute bottom-0 left-3 right-3 h-[2px] bg-[#C5A059] transform transition-transform duration-300 origin-center ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-70'
                  }`} />
                </button>
              );
            })}
          </nav>

          {/* Call-to-Actions (Language switcher, Quick Phone, Consultation CTA Button) */}
          <div className="hidden lg:flex items-center space-x-6" id="desktop-actions-container">
            {/* Quick Contact phone */}
            <div className="flex items-center text-slate-300 gap-2">
              <Phone className="h-4 w-4 text-[#C5A059]" />
              <a href="tel:0898573681" className="text-xs hover:text-white font-sans transition-colors duration-200 font-medium">
                0898 573 681
              </a>
            </div>

            {/* Language toggle element */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#C5A059]/40 hover:border-[#C5A059] hover:bg-slate-800 rounded-md text-xs font-sans font-semibold tracking-wider text-slate-200 hover:text-white transition-all duration-300"
              id="language-switcher-btn"
              title={language === 'bg' ? 'Премини на Английски' : 'Switch to Bulgarian'}
            >
              <Globe className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>{language === 'bg' ? 'БГ' : 'EN'}</span>
            </button>

            {/* Main Call to action Booking Button */}
            <button
              onClick={() => handleNavClick('consultation')}
              className="bg-[#C5A059] hover:bg-[#b48f48] text-[#1A2B3C] px-4 py-2.5 rounded-md font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg font-medium active:scale-95"
              id="header-consultation-cta"
            >
              {language === 'bg' ? 'Запази Час' : 'Book Session'}
            </button>
          </div>

          {/* Mobile Menu Action Triggers */}
          <div className="flex lg:hidden items-center space-x-3" id="mobile-controls-container">
            {/* Quick Language Toggle on Mobile too */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center p-2 border border-[#C5A059]/30 rounded-md text-[#C5A059] hover:bg-slate-800"
              id="mobile-language-toggler"
            >
              <span className="text-xs font-bold font-sans tracking-tight">
                {language === 'bg' ? 'БГ' : 'EN'}
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2 border border-slate-700 rounded-md"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1D3246] border-t border-[#C5A059]/10 animate-fade-in" id="mobile-dropdown-menu">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`block w-full text-left px-4 py-3 rounded-md text-base font-sans tracking-wide transition-colors ${
                    isActive 
                      ? 'bg-[#1A2B3C] text-[#C5A059] font-bold border-l-4 border-[#C5A059]' 
                      : 'text-slate-300 hover:bg-[#152535] hover:text-white'
                  }`}
                  id={`mobile-nav-link-${item.view}`}
                >
                  {item.label}
                </button>
              );
            })}
            
            <div className="pt-4 px-4 border-t border-slate-700/50 space-y-4">
              <div className="flex items-center text-slate-300 gap-3">
                <Phone className="h-4 w-4 text-[#C5A059]" />
                <a href="tel:0898573681" className="text-sm font-sans font-medium">
                  0898 573 681
                </a>
              </div>
              <button
                onClick={() => handleNavClick('consultation')}
                className="w-full bg-[#C5A059] text-[#1A2B3C] py-3 rounded-md text-sm font-bold tracking-wider uppercase text-center block"
                id="mobile-consultation-cta"
              >
                {language === 'bg' ? 'Безплатна Консултация' : 'Free Consultation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
