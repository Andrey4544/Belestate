import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, ArrowLeft, ShieldAlert } from 'lucide-react';
import { Language, BlogPost } from '../types';
import { blogPosts, translations } from '../data/mockData';

interface BlogProps {
  language: Language;
  onConsult: (topicTitle: string) => void;
}

export const Blog: React.FC<BlogProps> = ({ language, onConsult }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const t = translations[language];

  return (
    <section className="py-20 bg-white min-h-screen relative" id="blog-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!selectedPost ? (
          /* EDITORIAL ARTICLE DIRECTORY VIEW */
          <div id="blog-directory-view">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold font-sans block mb-3">
                {language === 'bg' ? 'НОУ-ХАУ И ИНВЕСТИЦИОННА БЕЗОПАСНОСТ' : 'INTELLIGENCE & LAWS'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A2B3C] tracking-tight mb-4">
                {t.sectionBlog}
              </h2>
              <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-5" />
              <p className="font-sans text-slate-600 text-sm sm:text-base font-light">
                {t.sectionBlogSub}
              </p>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10" id="blog-posts-grid">
              {blogPosts.map((post) => (
                <div 
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col group h-full cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                  id={`blog-card-${post.id}`}
                >
                  {/* Article Thumbnail */}
                  <div className="relative h-64 sm:h-72 bg-slate-900 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={language === 'bg' ? post.titleBg : post.titleEn} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-[#C5A059] text-[#1A2B3C] px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider shadow">
                      {language === 'bg' ? post.categoryBg : post.categoryEn}
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs font-sans text-slate-400 mb-4 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-[#C5A059]" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-[#C5A059]" />
                          {language === 'bg' ? post.readTimeBg : post.readTimeEn}
                        </span>
                      </div>

                      {/* Header */}
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A2B3C] tracking-tight group-hover:text-[#C5A059] transition-colors duration-200 mb-4 leading-tight">
                        {language === 'bg' ? post.titleBg : post.titleEn}
                      </h3>

                      {/* Excerpt */}
                      <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed font-light mb-6">
                        {language === 'bg' ? post.excerptBg : post.excerptEn}
                      </p>
                    </div>

                    {/* Expand click */}
                    <button className="text-xs font-bold text-[#C5A059] tracking-widest uppercase flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform duration-300 pointer-events-none mt-auto">
                      <span>{t.readPost}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        ) : (
          /* PERSISTENT FULL EDITORIAL POST SCREEN */
          <div className="max-w-4xl mx-auto" id="blog-editorial-view">
            
            {/* Back button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#1A2B3C] hover:text-[#C5A059] tracking-widest uppercase mb-8 cursor-pointer transition-colors"
              id="back-to-blog-btn"
            >
              <ArrowLeft className="h-4 w-4 text-[#C5A059]" />
              <span>{t.backToBlog}</span>
            </button>

            {/* Editorial Metadata elements */}
            <div className="space-y-4 mb-8">
              <span className="inline-block bg-[#1A2B3C]/5 border border-[#1A2B3C]/10 text-[#C5A059] px-4 py-1 rounded-full text-xs font-sans font-bold tracking-widest uppercase">
                {language === 'bg' ? selectedPost.categoryBg : selectedPost.categoryEn}
              </span>
              
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2B3C] leading-tight tracking-tight">
                {language === 'bg' ? selectedPost.titleBg : selectedPost.titleEn}
              </h1>

              <div className="flex items-center gap-6 text-sm font-sans text-slate-400 font-medium pt-2">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-[#C5A059]" />
                  {selectedPost.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[#C5A059]" />
                  {language === 'bg' ? selectedPost.readTimeBg : selectedPost.readTimeEn}
                </span>
              </div>
            </div>

            {/* Elegant Main Cover photo */}
            <div className="w-full h-80 sm:h-[450px] rounded-2xl overflow-hidden shadow-md border border-slate-100 mb-10">
              <img 
                src={selectedPost.image} 
                alt="article cover file" 
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Editorial Body Segment */}
            <div className="prose max-w-none prose-slate mr-auto" id="article-prose-content">
              {/* Splitting paragraphs to insert modern typography classes */}
              {(language === 'bg' ? selectedPost.contentBg : selectedPost.contentEn)
                .split('\n\n')
                .map((para, paraIdx) => {
                  // If it starts with numeric steps, we render styled items
                  if (para.startsWith('1.') || para.startsWith('2.') || para.startsWith('3.') || para.startsWith('4.') || para.startsWith('5.')) {
                    const lines = para.split('\n');
                    const title = lines[0];
                    const text = lines.slice(1).join(' ');
                    
                    return (
                      <div key={paraIdx} className="bg-slate-50 border-l-4 border-[#C5A059] p-6 rounded-r-xl my-6 space-y-2">
                        <h4 className="font-serif text-base font-bold text-[#1A2B3C]">{title}</h4>
                        <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-light">{text}</p>
                      </div>
                    );
                  }
                  
                  return (
                    <p key={paraIdx} className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed font-light mb-6 text-justify">
                      {para}
                    </p>
                  );
                })}
            </div>

            {/* Integrated Trust Quote block */}
            <div className="bg-[#1A2B3C] text-white p-8 rounded-2xl border border-[#C5A059]/30 my-10 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
              <div className="bg-[#C5A059]/15 p-4 rounded-full flex items-center justify-center">
                <ShieldAlert className="h-10 w-10 text-[#C5A059]" />
              </div>
              <div className="space-y-2 text-center sm:text-left flex-1">
                <h4 className="font-serif text-lg font-bold text-[#C5A059]">
                  {language === 'bg' ? 'Гаранция за чисто застрояване' : 'Legal Auditing Guarantee'}
                </h4>
                <p className="font-sans text-xs text-slate-300 leading-relaxed font-light">
                  {language === 'bg' 
                    ? 'Ние осигуряваме комплексно правно обслужване на 100% за всяка клиентска поръчка без допълнителни адвокатски хонорари.'
                    : 'We guarantee absolute legal clarity covering all real estate in our portfolio with no secret expenses or broker markups.'}
                </p>
              </div>
              <button
                onClick={() => {
                  const title = language === 'bg' ? selectedPost.titleBg : selectedPost.titleEn;
                  onConsult(title);
                }}
                className="bg-[#C5A059] hover:bg-[#b48f48] text-[#1A2B3C] px-5 py-3 rounded-lg font-sans text-xs font-bold tracking-wider uppercase transition-colors shrink-0 shadow-md font-medium"
                id="blog-consult-cta"
              >
                {t.navConsultation}
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
