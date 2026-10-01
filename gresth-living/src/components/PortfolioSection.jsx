import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInUp, staggerContainer, fadeIn, scaleIn } from '../utils/animations';

// Curated Unsplash URLs — all classic luxury interior rooms
const portfolioItems = [
  {
    id: 1,
    title: 'Kamar Utama Klasik',
    location: 'Cileungsi, Bogor',
    category: 'Kamar Tidur',
    size: 'large', // spans 2 rows
    url: '/master-bedroom-cileungsi.jpg',
  },
  {
    id: 2,
    title: 'Ruang Kantor Elegan',
    location: 'Cibubur',
    category: 'Ruang Kerja',
    size: 'normal',
    url: '/office-cibubur.jpg',
  },
  {
    id: 3,
    title: 'Kitchen Set Klasik',
    location: 'Andara, Jakarta',
    category: 'Dapur',
    size: 'normal',
    url: '/kitchen-andara.jpg',
  },
  {
    id: 4,
    title: 'Living Room Klasik',
    location: 'Jakarta',
    category: 'Ruang Tamu',
    size: 'normal',
    url: '/living-room-jakarta.jpg',
  },
  {
    id: 5,
    title: 'Classic Foyer & Lobby',
    location: 'Bogor',
    category: 'Foyer',
    size: 'normal',
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Presidential Suite',
    location: 'Depok',
    category: 'Suite Room',
    size: 'large',
    url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop',
  },
];

function PortfolioCard({ item, index, onClick }) {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <motion.article
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.08 }}
      onClick={onClick}
      className="portfolio-card group cursor-pointer w-full"
      aria-label={`Portofolio: ${item.title} di ${item.location}`}
    >
      <div className="relative overflow-hidden h-[400px] sm:h-[450px] rounded-xl shadow-lg border border-white/10">
        <img
          src={item.url}
          alt={`${item.title} — Portofolio Gresth Living`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Persistent bottom gradient for text legibility */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-6"
          style={{ background: 'linear-gradient(to top, rgba(7,13,28,0.9) 0%, rgba(7,13,28,0.2) 50%, transparent 100%)' }}
        >
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
            <span className="text-[10px] text-gold uppercase tracking-widest font-medium mb-1.5 block">
              {item.category}
            </span>
            <h3 className="font-playfair text-xl sm:text-2xl text-white font-semibold mb-1">{item.title}</h3>
            <p className="text-sm text-slate-300">{item.location}</p>
            
            {/* Action button that appears on hover */}
            <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400 text-gold">
              <span className="text-xs uppercase tracking-widest font-semibold">Lihat Detail</span>
              <ExternalLink size={14} />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function PortfolioSection() {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 });
  const [selectedItem, setSelectedItem] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedItem]);

  return (
    <section
      id="portofolio"
      className="relative py-28 px-0 sm:px-6 overflow-hidden"
      aria-labelledby="portfolio-heading"
    >
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={headerVisible ? 'visible' : 'hidden'}
          className="text-center mb-12 sm:mb-16 px-6"
        >
          <motion.div variants={fadeIn} className="section-label justify-center">
            <span>Hasil Karya Terbaik</span>
          </motion.div>

          <motion.h2
            id="portfolio-heading"
            variants={fadeInUp}
            className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2"
          >
            Karya <span className="gold-text">Klasik</span> Kami
          </motion.h2>

          <motion.div variants={fadeInUp} className="divider-gold mx-auto mt-5" />

          <motion.p
            variants={fadeInUp}
            className="max-w-xl mx-auto mt-5 text-slate-400 leading-relaxed text-sm sm:text-base"
          >
            Geser untuk melihat mahakarya kami. Klik pada proyek untuk melihat detail lengkap dan inspirasi untuk hunian Anda.
          </motion.p>
        </motion.div>

        {/* Horizontal Carousel */}
        <div className="pl-6 pr-6 sm:pr-0 pb-8 flex overflow-x-auto snap-x snap-mandatory gap-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {portfolioItems.map((item, i) => (
            <div key={item.id} className="min-w-[85vw] sm:min-w-[45vw] lg:min-w-[30vw] snap-center flex-shrink-0">
              <PortfolioCard item={item} index={i} onClick={() => setSelectedItem(item)} />
            </div>
          ))}
          {/* Spacer for the end of the scroll on mobile */}
          <div className="min-w-[20px] sm:hidden flex-shrink-0" aria-hidden="true"></div>
        </div>

        {/* CTA below grid */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex justify-center mt-6"
        >
          <button
            className="btn-outline-gold"
            aria-label="Lihat semua portofolio Gresth Living"
          >
            Lihat Semua Karya
          </button>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            style={{ background: 'rgba(13,13,13,0.95)', backdropFilter: 'blur(10px)' }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-[#141414] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-gold text-white rounded-full transition-colors backdrop-blur-md"
                onClick={() => setSelectedItem(null)}
                aria-label="Tutup Detail"
              >
                <X size={20} />
              </button>

              {/* Image side */}
              <div className="w-full md:w-3/5 h-[35vh] md:h-auto relative">
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text side */}
              <div className="w-full md:w-2/5 p-6 md:p-10 flex flex-col justify-center overflow-y-auto">
                <span className="text-gold text-xs font-bold tracking-widest uppercase mb-3 block">
                  {selectedItem.category}
                </span>
                <h2 className="font-playfair text-2xl sm:text-3xl text-white font-bold mb-2">
                  {selectedItem.title}
                </h2>
                <p className="text-slate-400 text-sm mb-6 flex items-center gap-2">
                  <span className="w-4 h-px bg-gold/50" />
                  {selectedItem.location}
                </p>

                <p className="font-manrope text-sm text-slate-300 leading-relaxed mb-8">
                  Konsep desain klasik mewah yang disesuaikan secara khusus dengan karakteristik ruang. Pemilihan material premium, detail ornamen yang presisi, serta tata cahaya eksklusif menciptakan harmoni yang sempurna pada {selectedItem.category.toLowerCase()} ini.
                </p>

                <button 
                  className="w-full py-3.5 bg-gold hover:bg-[#b09040] text-[#141414] font-bold text-sm tracking-wider uppercase rounded transition-colors"
                  onClick={() => {
                    setSelectedItem(null);
                    window.location.href = '/konsultasi';
                  }}
                >
                  Konsultasikan Gaya Ini
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
