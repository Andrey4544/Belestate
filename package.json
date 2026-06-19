import React from 'react';
import { 
  Handshake, 
  Key, 
  Landmark, 
  Mountain, 
  Map, 
  Hammer, 
  Calculator, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';
import { Language, ViewType } from '../types';

interface ServicesProps {
  language: Language;
  setView: (view: ViewType) => void;
}

export const Services: React.FC<ServicesProps> = ({ language, setView }) => {
  const isBg = language === 'bg';

  const servicesList = [
    {
      icon: Handshake,
      titleBg: 'ПОСРЕДНИЧЕСКИ УСЛУГИ ПРИ ПОКУПКО-ПРОДАЖБА',
      titleEn: 'BROKERAGE SERVICES IN BUYING & SELLING',
      descBg: 'Пълно посредничество при покупка и продажба на жилищни, индустриални и ваканционни имоти. Изготвяне на пазарни анализи, водене на преговори и пълна координация до финализиране при Нотариус.',
      descEn: 'Comprehensive brokerage in acquisition and disposition of residential, commercial, and holiday estates. Market analysis, strategic negotiations, and complete guidance up to notary finalization.',
    },
    {
      icon: Key,
      titleBg: 'НАЕМИ И КОНСУЛТАЦИЯ',
      titleEn: 'RENTALS & PROPERTY CONSULTATIONS',
      descBg: 'Професионално управление на наемни отношения. Проучване на надеждни наематели, изготвяне на гъвкави договори за наем и юридически консултации за дългосрочна доходност.',
      descEn: 'Strategic mediation for landlord and tenant relationships. Background checks for tenants, customizable rental contracts, and expert consultations for sustainable long-term yields.',
    },
    {
      icon: Landmark,
      titleBg: 'СЪДЕЙСТВИЕ ПРИ КРЕДИТИРАНЕ',
      titleEn: 'MORTGAGE & CREDIT ASSISTANCE',
      descBg: 'Партньорство с водещи търговски банки в България. Финансова оценка за купувачи, подбор на най-благоприятните лихвени проценти, обслужване на рефинансиране и безплатни консултации.',
      descEn: 'Strategic partnerships with leading banks in Bulgaria. Financial evaluation of clients, mortgage comparison, refinancing audits, and zero-fee independent consulting sessions.',
    },
    {
      icon: Mountain,
      titleBg: 'ПРОМЯНА НА ПРЕДНАЗНАЧЕНИЕ НА ЗЕМЕДЕЛСКИ ИМОТИ',
      titleEn: 'CHANGING AGRICULTURAL LAND REZONING',
      descBg: 'Професионално водене на процедури по промяна статута на земеделски земи за строителни нужди. Комуникация с общински власти, изготвяне на подробни устройствени планове (ПУП).',
      descEn: 'Expert support in changing agricultural land status to industrial/residential zoning. Full collaboration with municipal departments, master layouts preparation, and PUP support.',
    },
    {
      icon: Map,
      titleBg: 'ГЕОДЕЗИЧЕСКИ УСЛУГИ И ПРОЕКТИРАНЕ',
      titleEn: 'GEODETIC SURVEY & ARCHITECTURALS',
      descBg: 'Изследвания и трасиране на граници, кадастрални планове, заснемания и изготвяне на инвестиционни архитектурни проекти. Изготвя се от лицензирани геодезисти с професионална прецизност.',
      descEn: 'Boundary tracing, cadastral record validation, high-accuracy surveying, and conceptual architectural designs. Produced by certified surveyors using top-tier tracking apparatus.',
    },
    {
      icon: Hammer,
      titleBg: 'СТРОИТЕЛНИ И РЕМОНТНИ ДЕЙНОСТИ',
      titleEn: 'CONSTRUCTION & RENOVATIONS',
      descBg: 'Координация и изпълнение на довършителни работи, интериорни ремонти и цялостно строителство. Контрол на качеството на материалите и отлично спазване на заложените срокове.',
      descEn: 'On-site execution of finishing details, interior improvements, and structural construction. Rigid materials quality supervision and certified timely project delivery.',
    },
    {
      icon: Calculator,
      titleBg: 'УПРАВЛЕНИЕ И ОЦЕНКИ НА ИМОТИ',
      titleEn: 'PROPERTY MANAGEMENT & CERTIFIED APPRAISALS',
      descBg: 'Определяне на точна пазарна стойност от лицензирани оценители. Управление на сграден фонд, плащания, поддръжка на общи части и данъчно-счетоводство.',
      descEn: 'Precise market valuations formulated by accredited financial experts. Complete facility administration, rent collection, common areas maintenance, and tax filings.',
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative" id="services-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold font-sans block mb-3">
            {isBg ? 'ПРОФЕСИОНАЛНО ПОРТФОЛИО' : 'PROFESSIONAL SPECTRUM'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A2B3C] tracking-tight mb-5">
            {isBg ? 'Нашите Професионални Услуги' : 'Our Professional Services'}
          </h1>
          <div className="w-20 h-1 bg-[#C5A059] mx-auto mb-6" />
          <p className="font-sans text-slate-600 text-sm sm:text-base font-light leading-relaxed">
            {isBg 
              ? 'BelEstateGroup предоставя затворен кръг от инженерингови, юридически и посреднически услуги за Вашия пълен комфорт и максимална защита на капиталите.'
              : 'BelEstateGroup provides a fully rounded ecosystem of structural engineering, real estate law, and brokering to ensure complete safety of your transactions.'}
          </p>
        </div>

        {/* Bento Grid Layer - 7 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="services-grid">
          {servicesList.map((srv, idx) => {
            const IconComponent = srv.icon;
            // Highlighting specific services visually by stretching or custom background
            const isSpecial = idx === 0 || idx === 3;
            
            return (
              <div 
                key={idx}
                className={`group p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isSpecial 
                    ? 'bg-[#1A2B3C] text-white border-[#C5A059]/40 shadow-xl lg:scale-[1.02]' 
                    : 'bg-white text-slate-800 border-slate-100 shadow-sm hover:shadow-md'
                }`}
                id={`service-item-${idx}`}
              >
                <div>
                  {/* Icon Frame */}
                  <div className={`p-4 rounded-xl w-fit mb-6 transition-transform duration-300 group-hover:scale-105 ${
                    isSpecial 
                      ? 'bg-[#C5A059] text-[#1A2B3C]' 
                      : 'bg-[#1A2B3C]/5 text-[#C5A059]'
                  }`}>
                    <IconComponent className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className={`font-serif text-base sm:text-lg font-bold tracking-tight mb-4 group-hover:text-[#C5A059] transition-colors ${
                    isSpecial ? 'text-white' : 'text-[#1A2B3C]'
                  }`}>
                    {isBg ? srv.titleBg : srv.titleEn}
                  </h3>

                  {/* Description */}
                  <p className={`font-sans text-xs sm:text-sm font-light leading-relaxed mb-6 ${
                    isSpecial ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {isBg ? srv.descBg : srv.descEn}
                  </p>
                </div>

                {/* Bottom CTA redirection anchor */}
                <button
                  onClick={() => setView('consultation')}
                  className={`mt-4 w-fit flex items-center gap-1.5 text-xs font-sans font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                    isSpecial 
                      ? 'text-[#C5A059] hover:text-white' 
                      : 'text-[#1A2B3C] hover:text-[#C5A059]'
                  }`}
                >
                  <span>{isBg ? 'Запази час' : 'Book a slot'}</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Secondary Trust Banner */}
        <div className="mt-20 bg-[#1A2B3C] text-white rounded-3xl p-8 sm:p-12 border border-[#C5A059]/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8" id="services-trust-banner">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="flex items-center gap-1.5 text-xs text-[#C5A059] uppercase tracking-widest font-bold font-sans justify-center lg:justify-start">
              <ShieldCheck className="h-4 w-4" />
              {isBg ? '100% Защита на клиентите' : '100% Buyer protection shield'}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
              {isBg 
                ? 'Имате нужда от индивидуален проект или инженерно решение?'
                : 'Require a unique structural layout or customized geodetic support?'}
            </h3>
            <p className="font-sans text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
              {isBg
                ? 'Свържете се с нашите брокери и строителни инженери за безплатна преценка на имота и изготвяне на конкретна оферта.'
                : 'Get in touch with our operations manager to outline custom technical blueprints or request a certified property status check.'}
            </p>
          </div>
          <button
            onClick={() => setView('consultation')}
            className="bg-[#C5A059] hover:bg-[#b48f48] text-[#1A2B3C] px-6 py-3.5 rounded-lg font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300 shrink-0 shadow-lg active:scale-95 cursor-pointer font-semibold"
          >
            {isBg ? 'Безплатна Консултация' : 'Schedule consultations'}
          </button>
        </div>

      </div>
    </section>
  );
};
