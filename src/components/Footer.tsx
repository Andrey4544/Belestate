import React from 'react';
import { ShieldCheck, ArrowUp, Calendar, Phone, Mail } from 'lucide-react';
import { Language, ViewType } from '../types';
import { translations } from '../data/mockData';

interface FooterProps {
  language: Language;
  setView: (view: ViewType) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, setView }) => {
  const t = translations[language];

  const handleNav = (v: ViewType) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0f1a24] text-slate-300 pt-16 pb-8 border-t border-[#C5A059]/20" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core grids */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800" id="footer-gird-wrapper">
          
          {/* Col 1: Brand details - 5 cols */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav('home')}>
              <div className="bg-[#C5A059] p-1.5 rounded">
                <ShieldCheck className="h-5 w-5 text-[#1A2B3C]" />
              </div>
              <span className="font-serif text-base tracking-widest font-bold text-white uppercase">
                BelEstateGroup
              </span>
            </div>
            
            <p className="font-sans text-[11px] sm:text-xs text-slate-400 leading-relaxed font-light max-w-sm">
              {t.footerLegalInfo}
            </p>

            <div className="flex flex-col space-y-1 pt-2 font-sans text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5"><Phone className="h-3 w-3 text-[#C5A059]" /> {t.contactPhoneVal}</span>
              <span className="flex items-center gap-1.5"><Mail className="h-3 w-3 text-[#C5A059]" /> {t.contactEmailVal}</span>
            </div>
          </div>

          {/* Col 2: Quick Links - 3 cols */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-serif text-xs font-bold text-[#C5A059] uppercase tracking-wider block">
              {t.footerQuickLinks}
            </span>
            <div className="flex flex-col space-y-2.5 text-xs font-sans font-light">
              <button onClick={() => handleNav('home')} className="hover:text-[#C5A059] text-left transition-colors cursor-pointer">{t.navHome}</button>
              <button onClick={() => handleNav('listings')} className="hover:text-[#C5A059] text-left transition-colors cursor-pointer">{t.navListings}</button>
              <button onClick={() => handleNav('services')} className="hover:text-[#C5A059] text-left transition-colors cursor-pointer">{t.navServices}</button>
              <button onClick={() => handleNav('blog')} className="hover:text-[#C5A059] text-left transition-colors cursor-pointer">{t.navBlog}</button>
              <button onClick={() => handleNav('consultation')} className="hover:text-[#C5A059] text-left transition-colors cursor-pointer">{t.navConsultation}</button>
              <button onClick={() => handleNav('contact')} className="hover:text-[#C5A059] text-left transition-colors cursor-pointer">{t.navContact}</button>
            </div>
          </div>

          {/* Col 3: Safe buying action prompt - 4 cols */}
          <div className="md:col-span-4 bg-slate-800/20 border border-slate-700/50 p-6 rounded-xl space-y-4">
            <span className="font-serif text-xs font-bold text-white uppercase tracking-wider block">
              {language === 'bg' ? 'ИНВЕСТИРАЙТЕ С ДОКУМЕНТИ' : 'TRANSACT SECURELY'}
            </span>
            <p className="font-sans text-[11px] text-slate-400 leading-relaxed font-light">
              {language === 'bg' 
                ? 'Нашите брокери съгласуват всяко придобиване изцяло с Имотния регистър. Планирайте среща свободно.'
                : 'Every acquisition is verified by professional national real estate attorneys prior to any initial deposit.'}
            </p>
            <button
               onClick={() => handleNav('consultation')}
               className="w-full bg-[#C5A059] hover:bg-[#b48f48] text-[#1A2B3C] text-[10px] font-sans font-bold tracking-widest uppercase py-2.5 rounded text-center block transition-colors shadow-md"
             >
               {language === 'bg' ? 'БЕЗПЛАТНА КОНСУЛТАЦИЯ' : 'FREE CONSULTATION'}
             </button>
          </div>

        </div>

        {/* Slanted Bottom Copyright info */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 font-sans font-light" id="copyright-footer-line">
          <span>
            © {new Date().getFullYear()} {t.footerRights}
          </span>
          <span className="mt-2 md:mt-0 italic divide-x divide-slate-800">
            {language === 'bg' 
              ? 'Професионално застрахован агент за недвижими имоти' 
              : 'Professionally Insured Real Estate Brokerage Firm in Bulgaria'}
          </span>
          <button 
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-4 md:mt-0 flex items-center gap-1 hover:text-[#C5A059] cursor-pointer transition-colors"
          >
            <span>Top</span>
            <ArrowUp className="h-3 w-3 text-[#C5A059]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
