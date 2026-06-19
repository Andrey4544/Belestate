import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Send, Facebook, Linkedin, Instagram, Twitter, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/mockData';

interface ContactProps {
  language: Language;
}

export const Contact: React.FC<ContactProps> = ({ language }) => {
  const t = translations[language];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send email using FormSubmit
    fetch("https://formsubmit.co/ajax/abelev48@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        _subject: `Ново Съобщение за Връзка: ${name}`,
        "Име на подател / Client Name": name,
        "Контактен Имейл / Client Email": email,
        "Телефон / Phone Number": phone,
        "Основно съобщение / Message Content": message
      })
    }).catch(err => console.error("Contact Dispatch Error:", err));

    // Save in LocalStorage to simulate backend archiving
    const savedContactMsgs = JSON.parse(localStorage.getItem('bel_estate_contacts') || '[]');
    const newMsg = { name, email, phone, message, date: new Date().toISOString() };
    localStorage.setItem('bel_estate_contacts', JSON.stringify([...savedContactMsgs, newMsg]));

    setSuccess(true);
    // Clear inputs
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    
    setTimeout(() => {
      setSuccess(false);
    }, 6000);
  };

  return (
    <section className="py-24 bg-white relative" id="contact-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold font-sans block mb-3">
            {language === 'bg' ? 'ГЕОГРАФИЯ И ВРЪЗКА' : 'HEADQUARTERS & DIRECTIONS'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A2B3C] tracking-tight mb-4">
            {t.sectionContact}
          </h2>
          <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-5" />
          <p className="font-sans text-slate-600 text-sm sm:text-base font-light">
            {t.sectionContactSub}
          </p>
        </div>

        {/* Visual Columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contacts-block-row">
          
          {/* Left panel: Info & Interactive Google Map - 5 cols */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between" id="contact-details-panel">
            
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#1A2B3C] border-b border-slate-100 pb-3 uppercase tracking-wide">
                {t.contactOfficeTitle}
              </h3>

              {/* Detail list items */}
              <div className="space-y-5" id="contact-details-list">
                <div className="flex items-start gap-4">
                  <div className="bg-[#1A2B3C]/5 p-2.5 rounded-full text-[#C5A059] shrink-0 mt-0.5">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-sans font-bold block mb-1">
                      {language === 'bg' ? 'Адрес' : 'Office Location'}
                    </span>
                    <span className="font-sans text-xs sm:text-sm text-slate-700 font-light">
                      {t.contactAddress}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#1A2B3C]/5 p-2.5 rounded-full text-[#C5A059] shrink-0 mt-0.5">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-sans font-bold block mb-1">
                      {language === 'bg' ? 'Телефон' : 'Call Directors'}
                    </span>
                    <div className="flex flex-col gap-1">
                      {t.contactPhoneVal.split(', ').map((phone: string, idx: number) => {
                        const rawPhone = phone.replace(/\s+/g, '');
                        return (
                          <a 
                            key={idx} 
                            href={`tel:${rawPhone}`} 
                            className="font-sans text-xs sm:text-sm text-[#1A2B3C] font-semibold hover:text-[#C5A059] transition-colors block"
                          >
                            {phone}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#1A2B3C]/5 p-2.5 rounded-full text-[#C5A059] shrink-0 mt-0.5">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-sans font-bold block mb-1">
                      {language === 'bg' ? 'Електронна поща' : 'Direct Email'}
                    </span>
                    <a href="mailto:estate_07@abv.bg" className="font-sans text-xs sm:text-sm text-[#1A2B3C] font-semibold hover:text-[#C5A059] transition-colors">
                      {t.contactEmailVal}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#1A2B3C]/5 p-2.5 rounded-full text-[#C5A059] shrink-0 mt-0.5">
                    <Globe className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-sans font-bold block mb-1">
                      {language === 'bg' ? 'Имотен портал' : 'Partner Portal'}
                    </span>
                    <a href="https://www.estate_07.imot.bg" target="_blank" rel="noreferrer" className="font-sans text-xs sm:text-sm text-[#1A2B3C] font-semibold hover:text-[#C5A059] transition-colors">
                      www.estate_07.imot.bg
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#1A2B3C]/5 p-2.5 rounded-full text-[#C5A059] shrink-0 mt-0.5">
                    <Clock className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-sans font-bold block mb-1">
                      {language === 'bg' ? 'Офис часове' : 'Work schedule'}
                    </span>
                    <span className="font-sans text-xs text-slate-600 font-light">
                      {t.contactWorktime}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Social widgets */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <span className="text-xs uppercase font-sans tracking-widest text-slate-400 font-semibold block">
                {t.followUs}
              </span>
              <div className="flex gap-3" id="social-links-row">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-[#1A2B3C] hover:bg-[#C5A059] text-white hover:text-[#1A2B3C] p-2.5 rounded-full transition-all duration-300">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bg-[#1A2B3C] hover:bg-[#C5A059] text-white hover:text-[#1A2B3C] p-2.5 rounded-full transition-all duration-300">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-[#1A2B3C] hover:bg-[#C5A059] text-white hover:text-[#1A2B3C] p-2.5 rounded-full transition-all duration-300">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="bg-[#1A2B3C] hover:bg-[#C5A059] text-white hover:text-[#1A2B3C] p-2.5 rounded-full transition-all duration-300">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right panel: Google Map and secure contact form - 7 cols */}
          <div className="lg:col-span-7 space-y-8" id="interactive-contact-actions">
            
            {/* Interactive Embedded Google Map */}
            <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-100 shadow-inner bg-slate-100 relative">
              <iframe 
                src="https://maps.google.com/maps?q=%D0%B4%D0%B0%D0%BC%D0%B5%20%D0%B3%D1%80%D1%83%D0%B5%D0%B2%2018%20%D0%BF%D0%BB%D0%BE%D0%B2%D0%B4%D0%B8%D0%B2&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Bel Estate Plovdiv Flagship Headquarters Location Map"
                className="absolute inset-0"
              />
            </div>

            {/* Direct message contact form context */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100">
              
              {success ? (
                <div className="bg-emerald-600/10 border border-emerald-500/30 p-6 rounded-xl text-center text-emerald-800 font-sans" id="contact-success-state">
                  <ShieldCheck className="h-10 w-10 text-emerald-600 mx-auto mb-3" />
                  <p className="text-sm font-bold">{t.contactSuccess}</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4" id="direct-contact-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-[#1A2B3C] uppercase tracking-wider mb-1.5 font-sans">
                        {t.contactName} *
                      </label>
                      <input 
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Георги Георгиев"
                        className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-sans text-slate-700 focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#1A2B3C] uppercase tracking-wider mb-1.5 font-sans">
                        {t.contactEmail} *
                      </label>
                      <input 
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="georgi@domain.bg"
                        className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-sans text-slate-700 focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-[#1A2B3C] uppercase tracking-wider mb-1.5 font-sans">
                      {t.contactPhone} *
                    </label>
                    <input 
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+359 877 777 777"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-sans text-slate-700 focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-[#1A2B3C] uppercase tracking-wider mb-1.5 font-sans">
                      {t.contactMessage} *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={language === 'bg' ? 'Желая да получа информация за къщи в София...' : 'I would like to acquire information on properties in Bulgaria...'}
                      className="w-full bg-white border border-slate-200 rounded-lg p-3.5 text-xs font-sans text-slate-700 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1A2B3C] hover:bg-[#C5A059] hover:text-[#1A2B3C] text-white font-bold text-xs tracking-wider uppercase py-3.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:shadow active:scale-95 cursor-pointer font-medium"
                    id="contact-send-btn"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{t.contactSendBtn}</span>
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
