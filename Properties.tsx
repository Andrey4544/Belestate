import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles, CheckCircle2, ShieldCheck, Mail, Phone, ChevronRight, ChevronLeft } from 'lucide-react';
import { Language, ConsultationBooking } from '../types';
import { translations } from '../data/mockData';

interface BookingProps {
  language: Language;
  preselectedTopic?: string;
}

export const Booking: React.FC<BookingProps> = ({ language, preselectedTopic = '' }) => {
  const t = translations[language];

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [domain, setDomain] = useState('buy');
  const [notes, setNotes] = useState(preselectedTopic);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const getTodayDateStr = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:00');

  // Sync preselectedTopic if it comes from Properties details or Blog consult redirect
  useEffect(() => {
    if (preselectedTopic) {
      setNotes(preselectedTopic);
    }
  }, [preselectedTopic]);

  const getDayOfWeek = (dateStr: string) => {
    if (!dateStr) return -1;
    const parts = dateStr.split('-');
    if (parts.length !== 3) return -1;
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return d.getDay(); // 0 is Sunday, 1 is Monday, ... 6 is Saturday
  };

  const getAvailableTimeSlots = (dateStr: string) => {
    const day = getDayOfWeek(dateStr);
    if (day === 0) { // Sunday
      return [
        { time: '10:00', labelBg: '10:00 - Само по спешност', labelEn: '10:00 - Urgent Only' },
        { time: '11:00', labelBg: '11:00 - Само по спешност', labelEn: '11:00 - Urgent Only' },
        { time: '12:00', labelBg: '12:00 - Само по спешност', labelEn: '12:00 - Urgent Only' },
        { time: '13:00', labelBg: '13:00 - Само по спешност', labelEn: '13:00 - Urgent Only' },
        { time: '14:00', labelBg: '14:00 - Само по спешност', labelEn: '14:00 - Urgent Only' },
        { time: '15:00', labelBg: '15:00 - Само по спешност', labelEn: '15:00 - Urgent Only' },
        { time: '16:00', labelBg: '16:00 - Само по спешност', labelEn: '16:00 - Urgent Only' },
        { time: '17:00', labelBg: '17:00 - Само по спешност', labelEn: '17:00 - Urgent Only' },
      ];
    } else if (day === 6) { // Saturday
      return [
        { time: '10:00', labelBg: '10:00', labelEn: '10:00' },
        { time: '10:30', labelBg: '10:30', labelEn: '10:30' },
        { time: '11:00', labelBg: '11:00', labelEn: '11:00' },
        { time: '11:30', labelBg: '11:30', labelEn: '11:30' },
        { time: '12:00', labelBg: '12:00', labelEn: '12:00' },
        { time: '12:30', labelBg: '12:30', labelEn: '12:30' },
        { time: '13:00', labelBg: '13:00', labelEn: '13:00' },
        { time: '13:30', labelBg: '13:30', labelEn: '13:30' },
        { time: '14:00', labelBg: '14:00', labelEn: '14:00' },
        { time: '14:30', labelBg: '14:30', labelEn: '14:30' },
        { time: '15:00', labelBg: '15:00', labelEn: '15:00' },
        { time: '15:30', labelBg: '15:30', labelEn: '15:30' },
        { time: '16:00', labelBg: '16:00', labelEn: '16:00' },
        { time: '16:30', labelBg: '16:30', labelEn: '16:30' },
      ];
    } else { // Monday - Friday
      return [
        { time: '08:30', labelBg: '08:30', labelEn: '08:30' },
        { time: '09:00', labelBg: '09:00', labelEn: '09:00' },
        { time: '09:30', labelBg: '09:30', labelEn: '09:30' },
        { time: '10:00', labelBg: '10:00', labelEn: '10:00' },
        { time: '10:30', labelBg: '10:30', labelEn: '10:30' },
        { time: '11:00', labelBg: '11:00', labelEn: '11:00' },
        { time: '11:30', labelBg: '11:30', labelEn: '11:30' },
        { time: '12:00', labelBg: '12:00', labelEn: '12:00' },
        { time: '12:30', labelBg: '12:30', labelEn: '12:30' },
        { time: '13:00', labelBg: '13:00', labelEn: '13:00' },
        { time: '13:30', labelBg: '13:30', labelEn: '13:30' },
        { time: '14:00', labelBg: '14:00', labelEn: '14:00' },
        { time: '14:30', labelBg: '14:30', labelEn: '14:30' },
        { time: '15:00', labelBg: '15:00', labelEn: '15:00' },
        { time: '15:30', labelBg: '15:30', labelEn: '15:30' },
        { time: '16:00', labelBg: '16:00', labelEn: '16:00' },
        { time: '16:30', labelBg: '16:30', labelEn: '16:30' },
        { time: '17:00', labelBg: '17:00', labelEn: '17:00' },
        { time: '17:30', labelBg: '17:30', labelEn: '17:30' },
      ];
    }
  };

  // Sync hour slots to keep selection active and safe
  useEffect(() => {
    const slots = getAvailableTimeSlots(selectedDate);
    if (slots.length > 0) {
      const exists = slots.some(s => s.time === selectedTimeSlot);
      if (!exists) {
        setSelectedTimeSlot(slots[0].time);
      }
    }
  }, [selectedDate]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTimeSlot) return;

    const getDomainLabel = (dom: string) => {
      if (dom === 'buy') return language === 'bg' ? 'Покупка на Нов Дом' : 'Acquisition of Premium Real Estate';
      if (dom === 'sell') return language === 'bg' ? 'Продажба на Имот' : 'Selling Strategic Personal Assets';
      if (dom === 'legal') return language === 'bg' ? 'Правна консултация / Проверка на тежести' : 'Legal Auditing & Property Verification';
      if (dom === 'investment') return language === 'bg' ? 'Инвестиции в Зелена Енергия и Имоти' : 'Eco-Luxury & Solar Passive Development';
      return language === 'bg' ? 'Друго' : 'Other Content / Custom Inquiry';
    };

    const targetTopicLabel = getDomainLabel(domain);

    // Send dynamic email using FormSubmit
    fetch("https://formsubmit.co/ajax/abelev48@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        _subject: `Запазена Безплатна Консултация: ${name}`,
        "Име на контакт / Name": name,
        "Имейл адрес / Email": email,
        "Телефон / Phone": phone,
        "Тема на разговор / Domain": targetTopicLabel,
        "Желано време / Selected Slot": `${selectedDate} @ ${selectedTimeSlot}`,
        "Бележки и Детайли / Notes": notes || 'Без допълнителни бележки.'
      })
    }).catch(err => console.error("Booking Dispatch Error:", err));

    // Persist booking structure in LocalStorage
    const savedBookings = JSON.parse(localStorage.getItem('bel_estate_bookings') || '[]');
    const newBooking: ConsultationBooking = {
      name,
      email,
      phone,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      notes,
      type: domain
    };
    localStorage.setItem('bel_estate_bookings', JSON.stringify([...savedBookings, newBooking]));

    setBookingSuccess(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setDomain('buy');
    setNotes('');
    setBookingSuccess(false);
  };

  return (
    <section className="py-20 bg-slate-50 min-h-[90vh] relative" id="consultation-section">
      
      <div className="absolute top-0 left-0 w-full h-[300px] bg-[#1A2B3C] z-0 px-4">
        <div className="max-w-7xl mx-auto h-full flex flex-col justify-center text-center text-white relative z-10 pt-8">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold font-sans block mb-3">
            {language === 'bg' ? 'ДИГИТАЛНО ПЛАНИРАНЕ' : 'SECURE BOOKING PLATFORM'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            {t.sectionConsultation}
          </h2>
          <div className="w-16 h-[2px] bg-[#C5A059] mx-auto mb-4" />
          <p className="font-sans text-slate-300 text-xs sm:text-sm font-light max-w-2xl mx-auto">
            {t.sectionConsultationSub}
          </p>
        </div>
        {/* Slanted decoration */}
        <div className="absolute bottom-0 inset-x-0 h-10 bg-slate-50 transform skew-y-1 origin-bottom-right" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 mt-44 sm:mt-48 pb-10">
        
        {bookingSuccess ? (
          /* SUCCESS STATE OVERLAY CARD */
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 sm:p-12 text-center max-w-2xl mx-auto animate-scale-up" id="booking-success-container">
            <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-emerald-100">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            
            <h3 className="font-serif text-2xl font-bold text-[#1A2B3C] mb-4">
              {language === 'bg' ? 'Срещата е Запазена Успешно!' : 'Consultation Reserved Successfully!'}
            </h3>
            
            <div className="w-12 h-1 bg-[#C5A059] mx-auto mb-6" />

            {/* Resume Summary */}
            <div className="bg-slate-50 rounded-xl p-6 text-left space-y-4 mb-8 text-xs sm:text-sm border border-slate-100 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans font-medium">{language === 'bg' ? 'Клиент' : 'ClientName'}:</span>
                <span className="font-sans font-bold text-[#1A2B3C]">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans font-medium">{language === 'bg' ? 'Сесия' : 'Session Slot'}:</span>
                <span className="font-mono font-bold text-[#C5A059]">{selectedDate} @ {selectedTimeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans font-medium">{language === 'bg' ? 'Доверен партньор' : 'Advising Director'}:</span>
                <span className="font-sans font-semi-bold text-[#1A2B3C]">Bel Estate Advisory Team</span>
              </div>
            </div>

            <p className="font-sans text-xs text-slate-500 max-w-md mx-auto mb-8 leading-relaxed font-light">
              {t.bookingSuccess}
            </p>

            <button
              onClick={handleReset}
              className="bg-[#1A2B3C] hover:bg-[#C5A059] hover:text-[#1A2B3C] text-white font-sans text-xs font-bold tracking-wider uppercase px-6 py-3.5 rounded-lg transition-all duration-300 shadow"
              id="book-another-btn"
            >
              {language === 'bg' ? 'Запазете Друг Час' : 'Book Another Session'}
            </button>
          </div>
        ) : (
          /* DETAILED BOOKING FORM AND CUSTOM CALENDAR DOCKS */
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12" id="booking-flow-card">
            
            {/* Calendar & Time Selection Column - 5 cols */}
            <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col justify-between" id="booking-left-schedule-dock">
              
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
                  <Calendar className="h-5 w-5 text-[#C5A059]" />
                  <h3 className="font-serif text-sm font-bold text-[#1A2B3C] uppercase tracking-wider">
                    {t.bookingCalendarTitle}
                  </h3>
                </div>

                <div className="space-y-5">
                  {/* Date Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1A2B3C] uppercase tracking-wider mb-2 font-sans">
                      {language === 'bg' ? '1. Изберете Дата' : '1. Choose Date'} <span className="text-rose-500">*</span>
                    </label>
                    <input 
                      type="date"
                      required
                      min={getTodayDateStr()}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-sans text-slate-700 focus:outline-none focus:border-[#C5A059] cursor-pointer shadow-sm transition-all"
                      id="booking-date-picker"
                    />
                    
                    {/* Dynamic Weekday Confirmation Badge */}
                    {selectedDate && (
                      <div className="mt-2 text-[10.5px] font-sans font-medium text-slate-500 flex items-center gap-1.5 bg-slate-100/80 px-3 py-2 rounded-lg border border-slate-200/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                        <span>
                          {language === 'bg' ? 'Ден от седмицата: ' : 'Day of week: '}
                          <strong className="text-[#1A2B3C]">
                            {(() => {
                              const day = getDayOfWeek(selectedDate);
                              if (day === 0) return language === 'bg' ? 'Неделя (Само по спешност)' : 'Sunday (Urgent Only)';
                              if (day === 1) return language === 'bg' ? 'Понеделник' : 'Monday';
                              if (day === 2) return language === 'bg' ? 'Вторник' : 'Tuesday';
                              if (day === 3) return language === 'bg' ? 'Сряда' : 'Wednesday';
                              if (day === 4) return language === 'bg' ? 'Четвъртък' : 'Thursday';
                              if (day === 5) return language === 'bg' ? 'Петък' : 'Friday';
                              if (day === 6) return language === 'bg' ? 'Събота' : 'Saturday';
                              return '';
                            })()}
                          </strong>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Time Dropdown Menu */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1A2B3C] uppercase tracking-wider mb-2 font-sans">
                      {language === 'bg' ? '2. Изберете Час' : '2. Select Hour'} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={selectedTimeSlot}
                        onChange={(e) => setSelectedTimeSlot(e.target.value)}
                        className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-xs font-sans text-slate-700 focus:outline-none focus:border-[#C5A059] appearance-none cursor-pointer shadow-sm transition-all"
                        id="booking-time-select"
                      >
                        {getAvailableTimeSlots(selectedDate).map((slot) => (
                          <option key={slot.time} value={slot.time}>
                            {language === 'bg' ? slot.labelBg : slot.labelEn}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                        <Clock className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  {/* Operational Hours Badge Panel */}
                  <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm mt-6">
                    <h4 className="font-serif text-xs font-bold text-[#1A2B3C] uppercase tracking-wider mb-3 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-[#C5A059]" />
                      {language === 'bg' ? 'Работно Време' : 'Business Hours'}
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-sans">{language === 'bg' ? 'Понеделник - Петък' : 'Monday - Friday'}</span>
                        <span className="font-mono font-bold text-[#1A2B3C]">08:30 - 18:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-sans">{language === 'bg' ? 'Събота' : 'Saturday'}</span>
                        <span className="font-mono font-bold text-[#1A2B3C]">10:00 - 17:00</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-dashed border-slate-100">
                        <span className="text-slate-500 font-sans flex items-center gap-1">
                          {language === 'bg' ? 'Неделя' : 'Sunday'}
                          <span className="inline-block px-1.5 py-0.5 text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded">
                            {language === 'bg' ? 'Спешност' : 'Urgent'}
                          </span>
                        </span>
                        <span className="font-sans font-medium text-amber-700 text-[10.5px]">
                          {language === 'bg' ? 'По спешност' : 'Urgent cases'}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Secure statement */}
              <div className="pt-8 border-t border-slate-200/60 hidden lg:block">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-sans">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>{language === 'bg' ? 'Криптирано онлайн съхранение на данни' : '100% Secure Encrypted Connection'}</span>
                </div>
              </div>

            </div>

            {/* Inputs details Form Column - 7 cols */}
            <form onSubmit={handleBookingSubmit} className="lg:col-span-7 p-6 sm:p-8 space-y-6" id="consultation-form">
              
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Sparkles className="h-5 w-5 text-[#C5A059]" />
                <h3 className="font-serif text-sm font-bold text-[#1A2B3C] uppercase tracking-wider">
                  {language === 'bg' ? 'Вашият Инвестиционен Профил' : 'Your Requirements profile'}
                </h3>
              </div>

              {/* Row: Name */}
              <div>
                <label className="block text-xs font-semibold text-[#1A2B3C] uppercase tracking-wider mb-2 font-sans">
                  {t.bookingFormName} <span className="text-rose-500">*</span>
                </label>
                <input 
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'bg' ? 'Иван Иванов' : 'John Smith'}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-xs font-sans text-slate-700 focus:outline-none focus:border-[#C5A059]"
                  id="booking-name"
                />
              </div>

              {/* Row: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1A2B3C] uppercase tracking-wider mb-2 font-sans">
                    {t.bookingFormEmail} <span className="text-rose-500">*</span>
                  </label>
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@domain.com"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-xs font-sans text-slate-700 focus:outline-none focus:border-[#C5A059]"
                    id="booking-email"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A2B3C] uppercase tracking-wider mb-2 font-sans">
                    {t.bookingFormPhone} <span className="text-rose-500">*</span>
                  </label>
                  <input 
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+359 888 888 888"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-xs font-sans text-slate-700 focus:outline-none focus:border-[#C5A059]"
                    id="booking-phone"
                  />
                </div>
              </div>

              {/* Domain Switch Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-[#1A2B3C] uppercase tracking-wider mb-2 font-sans">
                  {t.bookingFormType}
                </label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-xs bg-white font-sans focus:outline-none focus:border-[#C5A059] appearance-none"
                  id="booking-domain-select"
                >
                  <option value="buy">{t.bookingTypeBuy}</option>
                  <option value="sell">{t.bookingTypeSell}</option>
                  <option value="legal">{t.bookingTypeLegal}</option>
                  <option value="investment">{t.bookingTypeInvestment}</option>
                  <option value="other">{t.bookingTypeOther}</option>
                </select>
              </div>

              {/* Custom message/notes */}
              <div>
                <label className="block text-xs font-semibold text-[#1A2B3C] uppercase tracking-wider mb-2 font-sans">
                  {t.bookingFormNotes}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={language === 'bg' ? 'Имате ли конкретен имот наум, желания за тераса, фитнес у дома или друго...' : 'Do you have preferences in mind: bedroom count, private solar batteries...'}
                  className="w-full p-4 border border-slate-200 rounded-lg text-xs font-sans text-slate-700 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                  id="booking-notes"
                />
              </div>

              {/* Time display recap */}
              <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl flex items-center justify-between text-xs">
                <span className="font-sans text-slate-500 font-medium">
                  {language === 'bg' ? 'Избран Слот:' : 'Selected Time Slot:'}
                </span>
                <span className="font-mono font-bold text-[#C5A059]">
                  {selectedDate} @ {selectedTimeSlot} (CET)
                </span>
              </div>

              {/* Submit triggers */}
              <button
                type="submit"
                className="w-full bg-[#1A2B3C] hover:bg-[#C5A059] hover:text-[#1A2B3C] text-white font-bold text-xs tracking-wider uppercase py-4 rounded-xl transition-all duration-300 shadow cursor-pointer text-center block font-medium"
                id="submit-booking-flow-btn"
              >
                {t.bookingBtn}
              </button>

            </form>

          </div>
        )}

      </div>

    </section>
  );
};
