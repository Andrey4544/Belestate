import React from 'react';
import { Shield, FileText, Sparkles, Key, Landmark, Award, Star, Compass } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/mockData';

interface WhyTrustUsProps {
  language: Language;
}

export const WhyTrustUs: React.FC<WhyTrustUsProps> = ({ language }) => {
  const t = translations[language];

  const valueCards = [
    {
      icon: <Shield className="h-8 w-8 text-[#C5A059]" />,
      title: t.value1Title,
      description: t.value1Desc
    },
    {
      icon: <FileText className="h-8 w-8 text-[#C5A059]" />,
      title: t.value2Title,
      description: t.value2Desc
    },
    {
      icon: <Sparkles className="h-8 w-8 text-[#C5A059]" />,
      title: t.value3Title,
      description: t.value3Desc
    },
    {
      icon: <Key className="h-8 w-8 text-[#C5A059]" />,
      title: t.value4Title,
      description: t.value4Desc
    }
  ];

  const stats = [
    { number: t.stat1No, label: t.stat1Lb, icon: <Compass className="h-5 w-5 text-[#C5A059]" /> },
    { number: t.stat2No, label: t.stat2Lb, icon: <Landmark className="h-5 w-5 text-[#C5A059]" /> },
    { number: t.stat3No, label: t.stat3Lb, icon: <Award className="h-5 w-5 text-[#C5A059]" /> },
    { number: t.stat4No, label: t.stat4Lb, icon: <Star className="h-5 w-5 text-[#C5A059]" /> }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="why-trust-us-section">
      
      {/* Decorative Golden Corner Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-radial-gradient from-[#C5A059]/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-radial-gradient from-[#1A2B3C]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold font-sans block mb-3">
            {language === 'bg' ? 'КОРПОРАТИВНИ ПРИНЦИПИ' : 'CORPORATE STANDARDS'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A2B3C] tracking-tight mb-4">
            {t.trustTitle}
          </h2>
          <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-5" />
          <p className="font-sans text-slate-600 text-sm sm:text-base font-light">
            {t.trustSubtitle}
          </p>
        </div>

        {/* Value Core Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20" id="values-grid">
          {valueCards.map((card, index) => (
            <div 
              key={index}
              className="bg-[#1A2B3C] p-8 rounded-xl shadow-md border-b-4 border-[#C5A059]/40 hover:border-[#C5A059] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-white group flex flex-col justify-between"
              id={`value-card-${index}`}
            >
              <div>
                <div className="mb-6 bg-white/5 p-3 rounded-lg w-fit transition-transform duration-300 group-hover:scale-105">
                  {card.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#C5A059] mb-4">
                  {card.title}
                </h3>
                <p className="font-sans text-xs text-slate-300 leading-relaxed font-light">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Stats Grid */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 sm:p-12 shadow-inner" id="stats-block">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12" id="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="text-center flex flex-col items-center" id={`stat-col-${index}`}>
                <div className="bg-[#1A2B3C]/5 p-2.5 rounded-full mb-3 flex items-center justify-center">
                  {stat.icon}
                </div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1A2B3C] block mb-1">
                  {stat.number}
                </span>
                <span className="font-sans text-[11px] sm:text-xs text-slate-500 uppercase tracking-widest max-w-[150px] font-medium leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};
