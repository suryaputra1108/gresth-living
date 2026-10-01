import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, MapPin, ArrowUpRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from '../utils/animations';
import { useLanguage } from '../context/LanguageContext';


const getPortfolio = (lang) => [
  { id:1, title:'MRS. A', fullName:'Mrs. A Residence - American Classic', location:'Jakarta Selatan', area:'350 m2', cat: lang === 'id' ? 'Interior' : 'Interior',
    desc: lang === 'id' ? 'Renovasi interior bergaya American Classic dengan kabinet custom sage green dan top table marmer premium. Memaksimalkan pencahayaan alami dan efisiensi ruang gerak secara elegan.' : 'American Classic style interior renovation with custom sage green cabinets and premium marble top table. Maximizing natural lighting and spatial efficiency elegantly.',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598928506311-c55dedbfc1a2?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  { id:2, title:'MR. B', fullName:'Mr. B House - Royal Mansion', location:'Tangerang', area:'500 m2', cat: lang === 'id' ? 'Arsitektur' : 'Architecture',
    desc: lang === 'id' ? 'Desain arsitektur fasad klasik dengan pilar-pilar kokoh dan jendela melengkung. Dilengkapi dengan lanskap taman yang simetris untuk memperkuat kesan megah.' : 'Classic facade architectural design with sturdy pillars and arched windows. Equipped with a symmetrical garden landscape to strengthen the majestic impression.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  { id:3, title:'MRS. C', fullName:'Mrs. C Mansion - Classic Dining', location:'Bekasi', area:'420 m2', cat: lang === 'id' ? 'Interior' : 'Interior',
    desc: lang === 'id' ? 'Ruang makan formal dengan lampu gantung kristal dan meja makan kayu mahoni berkapasitas 8 orang. Cocok untuk menjamu tamu kehormatan dalam suasana hangat.' : 'Formal dining room with crystal chandeliers and a mahogany wood dining table with an 8-person capacity. Suitable for entertaining guests of honor in a warm atmosphere.',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  { id:4, title:'MR. D', fullName:'Mr. D Villa - Executive Concept', location:'Jakarta Pusat', area:'280 m2', cat: lang === 'id' ? 'Interior' : 'Interior',
    desc: lang === 'id' ? 'Ruang kerja bernuansa kayu gelap dan kulit asli. Dilengkapi dengan built-in bookshelf klasik setinggi plafon yang memberikan aura maskulin dan profesional.' : 'Workspace with dark wood nuances and genuine leather. Equipped with ceiling-height classic built-in bookshelves that provide a masculine and professional aura.',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  { id:5, title:'MRS. E', fullName:'Mrs. E Residence - Elegant Foyer', location:'Bogor', area:'600 m2', cat: lang === 'id' ? 'Arsitektur' : 'Architecture',
    desc: lang === 'id' ? 'Area penyambutan tamu dengan lantai marmer berpola klasik dan meja konsol beraksen emas. Memberikan impresi pertama yang tak terlupakan dari pintu masuk utama.' : 'Guest welcoming area with classic patterned marble floors and a gold-accented console table. Provides an unforgettable first impression from the main entrance.',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  { id:6, title:'DR. F', fullName:'Dr. F House - Presidential Suite', location:'Depok', area:'310 m2', cat: lang === 'id' ? 'Interior' : 'Interior',
    desc: lang === 'id' ? 'Desain kamar tidur bernuansa putih bersih dengan sentuhan moulding klasik yang proporsional dan elegan, memberikan kenyamanan maksimal.' : 'Clean white nuanced bedroom design with a touch of proportional and elegant classic moulding, providing maximum comfort.',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1200&auto=format&fit=crop'
    ]
  },
];

function PortfolioCard({ item, onClick, lang }) {
  const [ref, vis] = useScrollAnimation({ threshold: 0.1 });
  return (
    <motion.article
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      animate={vis ? 'visible' : 'hidden'}
      className="group cursor-pointer relative overflow-hidden aspect-[3/4] md:aspect-[4/5] bg-charcoal"
      onClick={() => onClick(item)}
    >
      <img src={item.images[0]} alt={`${item.fullName}`}
        className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-75 transition-all duration-700 ease-out" loading="lazy" />
      
      {/* Dark gradient overlay covering the whole image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none"></div>

      {/* Content strictly centered vertically and horizontally */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 transition-transform duration-500 group-hover:-translate-y-2">
        <span className="text-[10px] font-medium tracking-widest uppercase px-4 py-1.5 rounded-full border border-white/50 text-white mb-4 backdrop-blur-sm">
          {item.cat}
        </span>
        <h3 className="font-playfair text-2xl md:text-3xl text-white font-bold tracking-[0.2em] uppercase mb-5">{item.title}</h3>
        <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
          <span className="text-[10px] text-white uppercase tracking-widest font-semibold border-b border-white/40 pb-0.5">{lang === 'id' ? 'Lihat portfolio' : 'View portfolio'}</span>
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center group-hover:bg-gold-DEFAULT transition-colors">
            <ArrowUpRight size={12} className="text-charcoal group-hover:text-white" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function PortfolioPage() {
  const [ref, vis] = useScrollAnimation({ threshold: 0.05 });
  const [activeItem, setActiveItem] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const { lang } = useLanguage();

  const portfolioData = getPortfolio(lang);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeItem]);

  const nextImage = () => {
    if (!activeItem) return;
    setActiveImageIdx((prev) => (prev + 1) % activeItem.images.length);
  };

  const prevImage = () => {
    if (!activeItem) return;
    setActiveImageIdx((prev) => (prev - 1 + activeItem.images.length) % activeItem.images.length);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen" style={{ background: '#0D0D0D' }}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.7 }}>
            <div className="section-label justify-center"><span>{lang === 'id' ? 'Mahakarya Kami' : 'Our Masterpieces'}</span></div>
            <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
              {lang === 'id' ? 'Galeri' : 'Portfolio'} <span className="gold-text">{lang === 'id' ? 'Portofolio' : 'Gallery'}</span>
            </h1>
            <div className="divider-gold mx-auto mt-5" />
            <p className="mt-5 max-w-xl mx-auto text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {lang === 'id'
                ? 'Jelajahi koleksi proyek interior dan arsitektur klasik terbaik kami. Setiap sudut dirancang dengan presisi untuk mewujudkan visi klien menjadi kenyataan.'
                : 'Explore our best collection of classic interior and architectural projects. Every corner is designed with precision to make the client\'s vision a reality.'}
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6"
        >
          <AnimatePresence>
            {portfolioData.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <PortfolioCard item={item} lang={lang} onClick={(it) => {
                  setActiveItem(it);
                  setActiveImageIdx(0);
                }} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8"
            style={{ background: 'rgba(0,0,0,0.80)', backdropFilter: 'blur(12px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) setActiveItem(null); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl flex flex-col lg:flex-row overflow-hidden shadow-2xl rounded-xl"
              style={{ maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-3 right-3 z-50 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.30)', color: '#C9A84C' }}
                aria-label={lang === 'id' ? 'Tutup' : 'Close'}
              >
                <X size={16} />
              </button>

              {/* Image Section */}
              <div className="w-full lg:w-3/5 h-[45vh] lg:h-[80vh] relative group" style={{ background: '#0D0D0D' }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIdx}
                    src={activeItem.images[activeImageIdx]}
                    alt={activeItem.fullName}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {/* Navigation Arrows */}
                {activeItem.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-gold-DEFAULT text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-gold-DEFAULT text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={24} />
                    </button>
                    {/* Dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                      {activeItem.images.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeImageIdx ? 'w-6 bg-gold-DEFAULT' : 'w-2 bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-1/3 p-6 lg:p-10 flex flex-col overflow-y-auto max-h-[50vh] lg:max-h-none" style={{ background: '#141414' }}>
                 <div className="mb-6">
                    <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full" style={{ color: '#C9A84C', background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)' }}>
                      {activeItem.cat}
                    </span>
                 </div>
                 <h2 className="font-playfair text-2xl font-bold text-white mb-4">{activeItem.fullName}</h2>
                 
                 <div className="flex flex-col gap-5 mt-2 mb-8">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full flex items-center justify-center text-gold-DEFAULT" style={{ background: 'rgba(201,168,76,0.10)' }}>
                       <MapPin size={16} />
                     </div>
                     <div>
                       <p className="text-[10px] uppercase tracking-widest font-semibold mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{lang === 'id' ? 'Lokasi' : 'Location'}</p>
                       <p className="text-sm font-medium text-white">{activeItem.location}</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full flex items-center justify-center text-gold-DEFAULT" style={{ background: 'rgba(201,168,76,0.10)' }}>
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>
                     </div>
                     <div>
                       <p className="text-[10px] uppercase tracking-widest font-semibold mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{lang === 'id' ? 'Luas Area' : 'Area Size'}</p>
                       <p className="text-sm font-medium text-white">{activeItem.area}</p>
                     </div>
                   </div>
                 </div>

                 <div className="divider-gold mb-6" />

                 <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.60)' }}>{activeItem.desc}</p>
                 
                 <div className="mt-auto pt-8">
                   <Link to="/konsultasi" className="btn-gold w-full flex justify-center text-sm py-3" onClick={() => setActiveItem(null)}>
                     {lang === 'id' ? 'Konsultasikan Proyek Serupa' : 'Consult Similar Project'}
                   </Link>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
