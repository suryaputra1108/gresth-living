import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, MapPin, ArrowUpRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from '../utils/animations';
import { useLanguage } from '../context/LanguageContext';


const getPortfolio = (lang) => [
  { id:1, title:'MRS. G', fullName:'Mrs. G House - Classic Blue-Grey Kitchen', location:'Andara, Jakarta Selatan', region: 'Jakarta', area:'200 m2', year: '2024', cat: lang === 'id' ? 'Interior' : 'Interior',
    desc: lang === 'id' 
      ? 'Dengan kombinasi palet biru-abu, dapur klasik ini menciptakan suasana yang abadi, menawarkan harmoni antara keanggunan klasik dan ketenangan warna-warna yang dipilih. Desain simpel namun memberikan sentuhan kemewahan kelas atas.' 
      : 'With a blue-grey palette combination, this classic kitchen creates a timeless atmosphere, offering harmony between classic elegance and the serenity of the chosen colors. Simple design yet offers a touch of high-class luxury.',
    images: [
      '/mrs-g-house-1.jpg',
      '/mrs-g-house-2.jpg',
      '/mrs-g-house-3.jpg',
      '/mrs-g-house-4.jpg'
    ]
  },
  { id:2, title:'MRS. H', fullName:'Mrs. H House - Soft Classic Kitchen Set', location:'Pejaten, Jakarta Selatan', region: 'Jakarta', area:'200 m2', year: '2022', cat: lang === 'id' ? 'Interior' : 'Interior',
    desc: lang === 'id' 
      ? 'Didominasi oleh warna putih, dapur klasik ini menampilkan keindahan dalam kesederhanaan, memberikan kesan elegan yang abadi. Warna putih menciptakan dasar yang sempurna untuk mencapai tampilan dapur klasik yang bersih dan indah.' 
      : 'Dominated by white, this classic kitchen displays beauty in simplicity, providing a timeless elegant impression. White creates the perfect foundation to achieve a clean and beautiful classic kitchen look.',
    images: [
      '/mrs-h-house-1.jpg',
      '/mrs-h-house-2.jpg',
      '/mrs-h-house-3.jpg',
      '/mrs-h-house-4.jpg'
    ]
  },
  { id:3, title:'MR. E', fullName:'Mr. E House - Klasik Kontemporer', location:'Pati, Jawa Tengah', region: 'Luar Jabodetabek', area:'400 m2', year: '2023', cat: lang === 'id' ? 'Interior' : 'Interior',
    desc: lang === 'id' 
      ? 'Dinding putih bersih menciptakan latar belakang yang damai. Ruang makan open space ini memamerkan keanggunan warna putih yang cerah, sementara ruang keluarga memancarkan kehangatan dengan dominasi warna putih dan furnitur coklat yang elegan.' 
      : 'Clean white walls create a peaceful background. This open space dining room showcases the elegance of bright white colors, while the living room exudes warmth with the dominance of white and elegant brown furniture.',
    images: [
      '/mr-e-house-1.jpg',
      '/mr-e-house-2.jpg',
      '/mr-e-house-3.jpg',
      '/mr-e-house-4.jpg',
      '/mr-e-house-5.jpg',
      '/mr-e-house-6.jpg'
    ]
  },
  { id:4, title:'MR. EN', fullName:'Mr. EN House - Kemewahan Modern', location:'Batusangkar, Sumatera Barat', region: 'Luar Jabodetabek', area:'600 m2', year: '2023', cat: lang === 'id' ? 'Interior' : 'Interior',
    desc: lang === 'id' 
      ? 'Dinding ruang tamu dicat dengan warna abu-abu yang lembut dan netral, memberikan latar belakang yang bersih dan mencerahkan ruangan. Lantai marmer menciptakan kilauan alami yang memancarkan kemewahan nan elegan tak tertandingi.' 
      : 'The living room walls are painted in a soft and neutral gray, providing a clean background that brightens the room. The marble floor creates a natural shine that radiates an unparalleled elegant luxury.',
    images: [
      '/mr-en-house-1.jpg',
      '/mr-en-house-2.jpg',
      '/mr-en-house-3.jpg',
      '/mr-en-house-4.jpg'
    ]
  },
  { id:5, title:'MRS. R', fullName:'Mrs. R House - Nuansa Mewah Keanggunan Sentuhan Pink dan Kemewahan Emas', location:'BSD, Semarang', region: 'Luar Jabodetabek', area:'800 m2', year: '2022', cat: lang === 'id' ? 'Interior' : 'Interior',
    desc: lang === 'id' 
      ? 'Warna pink yang lembut memberikan kehangatan, aksen emas yang berkilauan memberikan kemewahan, dan elemen putih yang bersih menciptakan harmoni sempurna. Suasana klasik yang memukau memenuhi setiap sudut interior ini, diwarnai dengan sentuhan mewah dari palet warna yang khas.' 
      : 'The soft pink color provides warmth, sparkling gold accents provide luxury, and clean white elements create perfect harmony. A stunning classic atmosphere fills every corner of this interior, colored with a luxurious touch from a distinctive color palette.',
    images: [
      '/mrs-raden-house-1.jpg',
      '/mrs-raden-house-2.jpg',
      '/mrs-raden-house-3.jpg',
      '/mrs-raden-house-4.jpg',
      '/mrs-raden-house-5.jpg',
      '/mrs-raden-house-6.jpg',
      '/mrs-raden-house-7.jpg',
      '/mrs-raden-house-8.jpg'
    ]
  },
  { id:6, title:'MR. A', fullName:'Mr. A House - Eksklusifitas Marmer', location:'Rancamaya, Bogor', region: 'Bogor', area:'1000 m2', year: '2022', cat: lang === 'id' ? 'Interior' : 'Interior',
    desc: lang === 'id' 
      ? 'Keanggunan warna putih dan kemewahan marmer dalam dapur ini melampaui fungsi memasak. Dapur ini bukan hanya tempat untuk mengolah bahan makanan, tetapi juga ruang di mana kreativitas dan kebersamaan bersatu. Warna putih menciptakan atmosfer yang tenang, memberikan keleluasaan bagi pikiran untuk melayang dan kreasi untuk berkembang. Marmer hitam menjadi pondasi yang kokoh, mengingatkan kita bahwa setiap momen di dapur ini adalah bagian dari kisah panjang kehidupan.' 
      : 'The elegance of white and the luxury of marble in this kitchen go beyond the function of cooking. This kitchen is not just a place to prepare food, but also a space where creativity and togetherness unite. The white color creates a calm atmosphere, giving freedom for the mind to wander and creations to develop. The black marble becomes a solid foundation, reminding us that every moment in this kitchen is part of the long story of life.',
    images: [
      '/mr-andry-house-1.jpg',
      '/mr-andry-house-2.jpg',
      '/mr-andry-house-3.jpg',
      '/mr-andry-house-4.jpg'
    ]
  },
  { id:7, title:'MRS. AN', fullName:'Mrs. AN House - Putih Murni dengan Aksen Kayu', location:'Citragrand, Cibubur', region: 'Bekasi', area:'850 m2', year: '2021', cat: lang === 'id' ? 'Interior' : 'Interior',
    desc: lang === 'id' 
      ? 'Tempat ini sempurna untuk menyimpan dan mengekspresikan jati diri fashion Anda. Sementara itu, suasana dapur yang merangkul keindahan alam tercipta melalui kitchen set putih klasik dengan aksen kayu coklat, memberikan ruang yang ramah dan hangat. Menjelajahi keanggunan dalam setiap detail, begitu Anda melangkah masuk ke dalam dunia keindahan dapur yang abadi, menciptakan suasana yang memancarkan ketenangan dan kemewahan melalui setiap detailnya.' 
      : 'This place is perfect for storing and expressing your fashion identity. Meanwhile, a kitchen atmosphere that embraces natural beauty is created through a classic white kitchen set with brown wood accents, providing a friendly and warm space. Exploring elegance in every detail, as soon as you step into the timeless world of kitchen beauty, it creates an atmosphere that radiates tranquility and luxury through every detail.',
    images: [
      '/mrs-anna-house-1.jpg',
      '/mrs-anna-house-2.jpg',
      '/mrs-anna-house-3.jpg',
      '/mrs-anna-house-4.jpg'
    ]
  },
  { id:8, title:'MR. END', fullName:'Mr. End House - Modern Classic Specialist', location:'Jakarta', region: 'Jakarta', area:'-', year: '-', cat: lang === 'id' ? 'Interior' : 'Interior',
    desc: lang === 'id' 
      ? 'Sebuah mahakarya spesialis dapur klasik modern yang menghadirkan nuansa elegan dan bersih. Perpaduan warna dominan putih dengan furnitur bernuansa gelap menciptakan keseimbangan visual yang sempurna, memberikan kesan mewah yang timeless di jantung rumah Anda.' 
      : 'A masterpiece of modern classic kitchen specialist that brings an elegant and clean feel. The combination of dominant white color with dark-nuanced furniture creates a perfect visual balance, providing a timeless luxurious impression in the heart of your home.',
    images: [
      '/mr-end-house-1.jpg',
      '/mr-end-house-2.jpg',
      '/mr-end-house-3.jpg',
      '/mr-end-house-4.jpg'
    ]
  },
  { id:9, title:'MRS. D', fullName:'Mrs. D House - Nuansa Putih, Coklat, Emas', location:'Kota Wisata Cibubur', region: 'Bogor', area:'250 m2', year: '2022', cat: lang === 'id' ? 'Interior' : 'Interior',
    desc: lang === 'id' 
      ? 'Ruangan ini memadukan keindahan klasik modern dengan palet warna yang penuh kehangatan. Dinding putih bersih bertindak sebagai kanvas yang sempurna untuk menonjolkan keindahan detail klasik, sementara sentuhan coklat hangat memberikan nuansa yang nyaman dan mewah. Desain klasik modern ini memancarkan pesona ruang keluarga dengan dinding putih yang bersih, furnitur coklat yang nyaman, dan aksen emas yang melambangkan kemewahan. Suatu santapan mata yang memikat dari paduan desain klasik yang mempesona.' 
      : 'This room blends modern classic beauty with a palette full of warmth. The clean white walls act as a perfect canvas to highlight the beauty of classic details, while warm brown touches provide a comfortable and luxurious feel. This modern classic design exudes the charm of a living room with clean white walls, comfortable brown furniture, and gold accents that symbolize luxury. A captivating feast for the eyes from the blend of mesmerizing classic design.',
    images: [
      '/mrs-dewi-house-1.jpg',
      '/mrs-dewi-house-2.jpg',
      '/mrs-dewi-house-3.jpg',
      '/mrs-dewi-house-4.jpg'
    ]
  },
  { id:10, title:'MRS. G', fullName:'Mrs. G House - Kontras Yang Anggun', location:'Kemang, Jakarta Selatan', region: 'Jakarta', area:'300 m2', year: '2022', cat: lang === 'id' ? 'Interior' : 'Interior',
    desc: lang === 'id' 
      ? 'Kitchen set klasik berwarna putih dan hitam menjadi panggung bagi kemegahan dengan aksen furnitur emas yang berkilauan. Suasana dapur ini menciptakan perasaan kerajaan disetiap sudutnya. Dapur ini menjadi pusat perhatian dengan kitchen set klasik yang bermain dengan palet warna putih dan hitam, sementara furnitur emas memberikan sentuhan megah yang tak terlupakan. Suatu ruang yang menciptakan pengalaman kuliner dalam suasana kemewahan.' 
      : 'The classic white and black kitchen set sets the stage for grandeur with sparkling gold furniture accents. The atmosphere of this kitchen creates a royal feeling in every corner. This kitchen becomes the center of attention with a classic kitchen set playing with a white and black color palette, while gold furniture provides an unforgettable majestic touch. A space that creates a culinary experience in an atmosphere of luxury.',
    images: [
      '/mrs-gadis-house-1.jpg',
      '/mrs-gadis-house-2.jpg',
      '/mrs-gadis-house-3.jpg',
      '/mrs-gadis-house-4.jpg'
    ]
  },
  { id:11, title:'MRS. N', fullName:'Mrs. N House - Dapur Bergaya Modern yang Megah', location:'BSD, Tangerang Selatan', region: 'Tangerang', area:'600 m2', year: '2021', cat: lang === 'id' ? 'Interior' : 'Interior',
    desc: lang === 'id' 
      ? 'Dapur ini adalah perwujudan keanggunan klasik dengan kitchen set berwarna putih yang mempesona, menyatu dengan lantai marmer yang memancarkan kemewahan. Sebuah ruang dapur yang memberikan pengalaman visual yang tak terlupakan. Kitchen set dengan warna putih yang murni ditemani oleh lantai marmer yang megah, menciptakan ruang dapur yang menawan. Keindahan klasik bersatu dengan unsur kemewahan, menciptakan suatu karya seni yang dapat dinikmati setiap hari.' 
      : 'This kitchen is an embodiment of classic elegance with a dazzling white kitchen set, blending with a marble floor that radiates luxury. A kitchen space that provides an unforgettable visual experience. The pure white kitchen set accompanied by a magnificent marble floor creates a captivating kitchen space. Classic beauty unites with elements of luxury, creating a work of art that can be enjoyed every day.',
    images: [
      '/mrs-nana-house-1.jpg',
      '/mrs-nana-house-2.jpg',
      '/mrs-nana-house-3.jpg',
      '/mrs-nana-house-4.jpg',
      '/mrs-nana-house-5.jpg',
      '/mrs-nana-house-6.jpg',
      '/mrs-nana-house-7.jpg'
    ]
  },
  { id:12, title:'MRS. AS', fullName:'Mrs. AS House - Klasik Yang Bersinar', location:'Cibubur, Jakarta Timur', region: 'Jakarta', area:'300 m2', year: '2021', cat: lang === 'id' ? 'Interior' : 'Interior',
    desc: lang === 'id' 
      ? 'Dapur ini memancarkan keanggunan klasik dalam desain minimalis yang indah. Kitchen set putih bersih dipasangkan dengan aksen emas yang menawan, menciptakan harmoni visual yang mengagumkan. Dapur ini adalah pameran keindahan minimalis dengan kitchen set putih yang menawan dan sentuhan aksen emas yang lembut. Desain yang menciptakan suasana tenang, tetapi tak kehilangan keanggunan. Kitchen set minimalis dengan warna putih yang memukau dan sentuhan emas yang diselipkan dengan penuh kelembutan. Desain yang mengekspresikan keanggunan dalam kesederhanaan.' 
      : 'This kitchen radiates classic elegance in a beautiful minimalist design. A clean white kitchen set is paired with charming gold accents, creating an amazing visual harmony. This kitchen is an exhibition of minimalist beauty with a charming white kitchen set and a soft touch of gold accents. A design that creates a calm atmosphere, without losing its elegance. A minimalist kitchen set with stunning white color and gold touches inserted with full tenderness. A design that expresses elegance in simplicity.',
    images: [
      '/mrs-asep-house-1.jpg',
      '/mrs-asep-house-2.jpg',
      '/mrs-asep-house-3.jpg',
      '/mrs-asep-house-4.jpg'
    ]
  },
  { id:13, title:'MR. I', fullName:'Mr. I House - Sentuhan Putih Klasik', location:'Depok', region: 'Depok', area:'200 m2', year: '2026', cat: lang === 'id' ? 'Interior' : 'Interior',
    desc: lang === 'id' 
      ? 'Hunian di Depok ini menonjolkan desain klasik yang bersih dengan dominasi warna putih cerah dan lantai marmer yang elegan. Area dapur memancarkan pesona modern-klasik melalui kitchen set putih beraksen emas, dipadukan dengan kabinet abu-abu yang memberikan kontras visual yang menawan. Setiap ruangan, termasuk kamar mandi berlapis marmer abu-abu, dirancang untuk memberikan kesan luas, mewah, namun tetap nyaman untuk keseharian.' 
      : 'This residence in Depok highlights a clean classic design with a dominance of bright white colors and elegant marble floors. The kitchen area radiates a modern-classic charm through a white kitchen set with gold accents, combined with a grey cabinet that provides a captivating visual contrast. Every room, including the grey marble-clad bathroom, is designed to give a spacious, luxurious, yet comfortable impression for everyday life.',
    images: [
      '/mr-i-house-1.jpg',
      '/mr-i-house-2.jpg',
      '/mr-i-house-3.jpg',
      '/mr-i-house-4.jpg'
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
  const [activeFilter, setActiveFilter] = useState('Semua');
  const { lang } = useLanguage();

  const portfolioData = getPortfolio(lang);
  const filteredPortfolio = portfolioData.filter(item => {
    if (activeFilter === 'Semua') return true;
    return item.region === activeFilter;
  });

  const regions = ['Semua', 'Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi', 'Luar Jabodetabek'];

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

        {/* Filter UI */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
        >
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setActiveFilter(region)}
              className={`px-4 py-2 rounded-full text-[10px] md:text-xs font-semibold tracking-wider uppercase transition-all duration-300 border ${
                activeFilter === region 
                ? 'bg-[#C9A84C] text-white border-[#C9A84C]' 
                : 'bg-transparent text-white/50 border-white/20 hover:border-[#C9A84C] hover:text-[#C9A84C]'
              }`}
            >
              {region}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredPortfolio.map(item => (
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
                className="absolute top-3 right-3 lg:top-4 lg:right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all bg-red-600/80 backdrop-blur-md border border-red-400/50 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:bg-red-500/90"
                aria-label={lang === 'id' ? 'Tutup' : 'Close'}
              >
                <X size={20} strokeWidth={2.5} />
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-gold-DEFAULT text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all shadow-md"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-gold-DEFAULT text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all shadow-md"
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
                 
                 <div className="flex flex-col gap-5 mt-2 mb-8 text-left">
                   <div>
                     <p className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>INTERIOR DESIGNER</p>
                     <p className="font-playfair text-lg text-white">GRESTH LIVING</p>
                   </div>
                   <div>
                     <p className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>CONSTRUCTION INTERIOR</p>
                     <p className="font-playfair text-lg text-white">GRESTH LIVING</p>
                   </div>
                   <div>
                     <p className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>PROJECT YEAR</p>
                     <p className="font-playfair text-lg text-white">{activeItem.year}</p>
                   </div>
                   <div>
                     <p className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>LUASAN</p>
                     <p className="font-playfair text-lg text-white">{activeItem.area}</p>
                   </div>
                   <div>
                     <p className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>ALAMAT</p>
                     <p className="font-playfair text-lg text-white uppercase">{activeItem.location}</p>
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
