import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Palette, Ruler, Sofa, ChevronRight, ChevronLeft, ArrowRight, CheckCircle } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInUp, fadeInLeft, fadeInRight, fadeIn, staggerContainer, scaleIn } from '../utils/animations';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

/* ── Animated counter ── */
function CountUp({ to, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (isInView) motionVal.set(to);
  }, [isInView, motionVal, to]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const SERVICES = [
  {
    icon: Palette,
    title: 'Desain Interior Klasik',
    desc: 'Konsep desain yang timeless — dari moodboard, gambar 3D, hingga panduan visual yang detail dan terstruktur.',
    to: '/layanan#desain',
  },
  {
    icon: Ruler,
    title: 'Eksekusi & Instalasi',
    desc: 'Realisasi desain secara menyeluruh oleh tim ahli kami — mulai partisi, plafon, lighting, hingga serah terima sempurna.',
    to: '/layanan#instalasi',
  },
  {
    icon: Sofa,
    title: 'Custom Furniture',
    desc: 'Furniture buatan tangan yang disesuaikan dimensi, gaya, dan material pilihan Anda untuk setiap ruang.',
    to: '/layanan#furniture',
  },
];

const PORTFOLIO_PREVIEW = [
  { url: '/master-bedroom-cileungsi.jpg', title: 'Kamar Utama Klasik', loc: 'Cileungsi, Bogor' },
  { url: '/office-cibubur.jpg', title: 'Ruang Kantor Elegan', loc: 'Cibubur' },
  { url: '/kitchen-andara.jpg', title: 'Kitchen Set Klasik', loc: 'Andara, Jakarta' },
  { url: '/living-room-jakarta.jpg', title: 'Living Room Klasik', loc: 'Jakarta' },
];

const TESTIMONIALS = [
  {
    name: 'Mr. E House',
    location: 'Jakarta',
    text: '"Gresth Living mengubah rumah kami jauh melampaui ekspektasi. Detail ornamen, pilihan warna, dan furnitur kustom — semuanya sempurna dan mencerminkan kemewahan klasik yang kami impikan."',
  },
  {
    name: 'Mr. G House',
    location: 'Citra Garden Bintaro',
    text: '"Tim sangat profesional dan responsif. Hasil kerjanya sangat halus, terutama pada detail ukiran dan tata cahaya. Sangat direkomendasikan untuk interior klasik mewah!"',
  },
  {
    name: 'Mr. I House',
    location: 'Depok',
    text: '"Proses kerja transparan, tepat waktu, dan kualitas pengerjaan benar-benar premium. Setiap sudut ruangan kini terasa jauh lebih elegan dan berkelas. Puas sekali dengan hasilnya!"',
  },
  {
    name: 'Mrs. D House',
    location: 'Bogor',
    text: '"Saya sangat terkesan dengan desain dan material furnitur kustom yang digunakan. Semuanya dikerjakan dengan sangat teliti dan rapi. Ruang keluarga kami sekarang menjadi tempat favorit."',
  },
  {
    name: 'Mr. E House',
    location: 'Padang, Sumatra',
    text: '"Meski berada di luar kota, komunikasi berjalan sangat lancar. Hasil akhir instalasi interior di rumah kami sungguh luar biasa, memberi kesan megah bak istana Eropa klasik."',
  },
];

const STATS = [
  { to: 150, suffix: '+', label: 'Proyek Selesai' },
  { to: 14, suffix: '+', label: 'Tahun Pengalaman' },
  { to: 98, suffix: '%', label: 'Kepuasan Klien' },
  { to: 30, suffix: '+', label: 'Tim Profesional' },
];

/* ─── Brand Intro (CREAM / LIGHT section) ─── */
const BRAND_IMAGE = '/about-image.jpg';

function BrandIntro() {
  const [ref, vis] = useScrollAnimation({ threshold: 0.1 });
  return (
    <section ref={ref} className="py-16 md:py-28 px-6 section-light" aria-labelledby="brand-intro-heading">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Image */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          animate={vis ? 'visible' : 'hidden'}
          className="relative"
        >
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[#C9A84C] drop-shadow-md z-10">
            <svg width="50" height="34" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 0C32.1818 13.9091 42 20 60 20C42 20 32.1818 26.0909 30 40C27.8182 26.0909 18 20 0 20C18 20 27.8182 13.9091 30 0Z" fill="url(#paint0_linear)"/>
              <circle cx="30" cy="20" r="3" fill="#FFFFFF" />
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="20" x2="60" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E8C96A" />
                  <stop offset="0.5" stopColor="#C9A84C" />
                  <stop offset="1" stopColor="#9A7A30" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <div className="overflow-hidden rounded-t-full rounded-b-3xl border border-[#C9A84C]/30 shadow-[0_20px_40px_rgba(0,0,0,0.1)] relative" style={{ aspectRatio: '4/5' }}>
            <div className="absolute inset-0 bg-[#C9A84C]/10 mix-blend-multiply z-10 pointer-events-none" />
            <img
              src={BRAND_IMAGE}
              alt="Tim desainer Gresth Living"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={vis ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute -bottom-6 right-2 sm:right-6 w-32 h-32 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center shadow-card-hover text-center"
            style={{ background: '#0D0D0D', border: '1px solid rgba(201,168,76,0.30)' }}
          >
            <p className="font-playfair text-2xl sm:text-3xl font-bold gold-text"><CountUp to={150} suffix="+" /></p>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 mt-1">Proyek<br />Selesai</p>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={vis ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeIn} className="section-label-dark">
            <span>Mengenal Kami</span>
          </motion.div>
          <motion.h2
            id="brand-intro-heading"
            variants={fadeInUp}
            className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mt-2 uppercase"
            style={{ color: '#1A1414' }}
          >
            Selamat Datang di Dunia <span style={{ background: 'linear-gradient(135deg,#9A7A30,#C9A84C,#E8C96A)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Moderen Klasik</span>
            <br />Gresth Living
          </motion.h2>
          <motion.div variants={fadeInUp} className="divider-gold mt-5 mb-6" />
          <motion.p variants={fadeInUp} className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: '#4A4040' }}>
            Kami mengucapkan selamat datang di dunia modern Classic Gresth Living. Di dunia ini waktu mungkin
            seakan tak berjalan sebab dunia Gresth Living adalah dunia yang tidak akan pernah lekang oleh waktu <em>(timeless)</em>.
          </motion.p>
          <motion.p variants={fadeInUp} className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: '#4A4040' }}>
            Semoga karya kami benar-benar menjadi karya indah yang dapat dinikmati siapapun dan menjadi inspirasi sampai kapanpun.
          </motion.p>
          <motion.blockquote variants={fadeInUp} className="pl-5 py-2 border-l-2 mb-8" style={{ borderColor: '#C9A84C' }}>
            <p className="font-playfair text-lg" style={{ color: '#1A1414' }}>
              "Desain klasik identik dengan keagungan, kemewahan, dan orisinalitas."
            </p>
          </motion.blockquote>
          <motion.ul variants={staggerContainer} className="space-y-3 mb-10">
            {[
              'Desain interior 3D realistis sebelum eksekusi',
              'Material premium dengan garansi kualitas',
              'Tim kontraktor bersertifikat & berpengalaman',
              'Supervisi penuh dari awal hingga serah terima',
            ].map((item) => (
              <motion.li key={item} variants={fadeInUp} className="flex items-start gap-3 text-sm" style={{ color: '#4A4040' }}>
                <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#C9A84C' }} />
                {item}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div variants={fadeInUp}>
            <Link to="/tentang" className="btn-outline-gold" style={{ color: '#9A7A30', borderColor: '#C9A84C' }}>
              Pelajari Lebih Lanjut
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Stats strip ─── */
function StatsStrip() {
  const [ref, vis] = useScrollAnimation({ threshold: 0.2 });
  return (
    <section ref={ref} className="py-14 px-6" style={{ background: '#C9A84C' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={vis ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 + 0.1 }}
          >
            <p className="font-playfair text-4xl font-bold text-white"><CountUp to={s.to} suffix={s.suffix} /></p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-black/60 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── Services (DARK section) ─── */
function ServicesPreview() {
  const [ref, vis] = useScrollAnimation({ threshold: 0.1 });
  return (
    <section id="services-preview" ref={ref} className="py-16 md:py-28 px-6 section-dark" aria-labelledby="sp-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate={vis ? 'visible' : 'hidden'} className="text-center mb-16">
          <motion.div variants={fadeIn} className="section-label justify-center"><span>Apa yang Kami Tawarkan</span></motion.div>
          <motion.h2 id="sp-heading" variants={fadeInUp} className="font-playfair text-4xl sm:text-5xl font-bold text-white mt-2">
            Layanan <span className="gold-text">Eksklusif</span>
          </motion.h2>
          <motion.div variants={fadeInUp} className="divider-gold mx-auto mt-5" />
        </motion.div>

        <style>{`
          .homepage-services-swiper .swiper-pagination-bullet {
            background: rgba(255,255,255,0.3);
            width: 8px;
            height: 8px;
            transition: all 0.3s ease;
          }
          .homepage-services-swiper .swiper-pagination-bullet-active {
            background: #C9A84C;
            width: 24px;
            border-radius: 4px;
          }
          .homepage-services-swiper {
            padding-bottom: 50px !important;
            padding-top: 20px !important;
          }
        `}</style>
        
        <motion.div variants={fadeIn} initial="hidden" animate={vis ? 'visible' : 'hidden'} className="w-full">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 150,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="homepage-services-swiper w-full"
          >
            {[...SERVICES, ...SERVICES].map((s, i) => {
              const Icon = s.icon;
              return (
                <SwiperSlide key={`${s.title}-${i}`} className="w-[320px] sm:w-[380px]">
                  <div className="service-card group p-10 h-full flex flex-col mx-2" style={{ background: '#141414', border: '1px solid rgba(201,168,76,0.15)' }}>
                    <div className="w-12 h-12 flex items-center justify-center mb-8 border border-gold-DEFAULT/30 group-hover:border-gold-DEFAULT transition-colors">
                      <Icon size={22} className="text-gold-DEFAULT" aria-hidden="true" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-white mb-3">{s.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-8 flex-grow">{s.desc}</p>
                    <Link to={s.to}
                      className="inline-flex items-center gap-2 text-[10px] font-semibold text-gold-DEFAULT uppercase tracking-widest hover:gap-3 transition-all duration-300 mt-auto">
                      Selengkapnya <ArrowRight size={12} />
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" animate={vis ? 'visible' : 'hidden'}
          className="text-center mt-14">
          <Link to="/layanan" className="btn-outline-gold">Lihat Semua Layanan</Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Portfolio Preview (DARK-2 section) ─── */
function PortfolioPreview() {
  const [ref, vis] = useScrollAnimation({ threshold: 0.1 });
  return (
    <section ref={ref} className="py-16 md:py-28 px-6 section-dark-2" aria-labelledby="pp-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate={vis ? 'visible' : 'hidden'} className="text-center mb-16">
          <motion.div variants={fadeIn} className="section-label justify-center"><span>Hasil Karya Terbaik</span></motion.div>
          <motion.h2 id="pp-heading" variants={fadeInUp} className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
            Portofolio <span className="gold-text">Pilihan</span>
          </motion.h2>
          <motion.div variants={fadeInUp} className="divider-gold mx-auto mt-5" />
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate={vis ? 'visible' : 'hidden'}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 px-6 -mx-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PORTFOLIO_PREVIEW.map((p, i) => (
            <motion.div key={p.title} variants={scaleIn}
              className="portfolio-card group cursor-pointer relative overflow-hidden flex-none w-[70vw] sm:w-[45vw] lg:w-auto snap-center"
              style={{ aspectRatio: '3/4', borderRadius: '4px' }}>
              <img src={p.url} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                <p className="font-playfair text-sm sm:text-base font-bold text-white">{p.title}</p>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">{p.loc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" animate={vis ? 'visible' : 'hidden'}
          className="text-center mt-14">
          <Link to="/portofolio" className="btn-gold"><span>Lihat Semua Karya</span><ChevronRight size={16} /></Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Testimonials (LIGHT section) ─── */
function TestimonialsSection() {
  const [ref, vis] = useScrollAnimation({ threshold: 0.1 });
  const scrollRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      // Using clientWidth to estimate the width of a single card + gap
      const itemWidth = scrollRef.current.scrollWidth / TESTIMONIALS.length;
      const index = Math.round(scrollLeft / itemWidth);
      if (!isNaN(index) && index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };

  const scrollTo = (index) => {
    if (scrollRef.current) {
      const child = scrollRef.current.children[index];
      if (child) {
        // Use native scrollIntoView to perfectly center the item, letting CSS scroll-snap and scroll-smooth handle the rest
        child.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) scrollTo(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < TESTIMONIALS.length - 1) scrollTo(activeIndex + 1);
  };

  return (
    <section ref={ref} className="py-16 md:py-28 px-6 section-light" aria-labelledby="testi-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate={vis ? 'visible' : 'hidden'} className="text-center mb-16">
          <motion.div variants={fadeIn} className="section-label-dark justify-center"><span>Apa Kata Mereka</span></motion.div>
          <motion.h2 id="testi-heading" variants={fadeInUp}
            className="font-playfair text-4xl sm:text-5xl font-bold mt-2" style={{ color: '#1A1414' }}>
            <span style={{ background: 'linear-gradient(135deg,#9A7A30,#C9A84C)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Testimoni</span> Klien
          </motion.h2>
          <motion.div variants={fadeInUp} className="divider-gold mx-auto mt-5" />
          <motion.p variants={fadeInUp} className="text-[#5A4A4A] max-w-2xl mx-auto mt-6 text-sm sm:text-base leading-relaxed">
            Pengalaman nyata dari klien yang telah mewujudkan hunian impian mereka bersama Gresth Living. Kepuasan dan kepercayaan Anda adalah karya terbaik kami.
          </motion.p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate={vis ? 'visible' : 'hidden'} className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scroll-smooth -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {TESTIMONIALS.map((t) => (
              <motion.blockquote
                key={t.name}
                variants={fadeInUp}
                className="flex-shrink-0 w-[85vw] md:w-[400px] p-8 rounded-2xl snap-center hover:-translate-y-1 transition-transform duration-300"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(201,168,76,0.15)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.06)'
                }}
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#C9A84C' }}>★</span>)}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#5A4A4A' }}>{t.text}</p>
                <footer>
                  <cite className="not-italic font-semibold text-sm" style={{ color: '#1A1414' }}>{t.name}</cite>
                  <p className="text-xs uppercase tracking-widest mt-0.5" style={{ color: '#9A8080' }}>{t.location}</p>
                </footer>
              </motion.blockquote>
            ))}
          </div>

          {/* Pagination Dots & Arrows */}
          <div className="flex items-center justify-center mt-8 gap-4">
            <button 
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-[#1A1414]/20 text-[#1A1414]/50 hover:bg-[#1A1414]/10 hover:text-[#1A1414] disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex justify-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => scrollTo(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-8 bg-[#1A1414]' : 'w-2.5 bg-[#1A1414]/20 hover:bg-[#1A1414]/40'}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              disabled={activeIndex === TESTIMONIALS.length - 1}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-[#1A1414]/20 text-[#1A1414]/50 hover:bg-[#1A1414]/10 hover:text-[#1A1414] disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
              aria-label="Next Testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CTA Banner (DARK) ─── */
function CtaBanner() {
  const [ref, vis] = useScrollAnimation({ threshold: 0.2 });
  return (
    <section ref={ref} className="relative py-16 md:py-28 px-6 overflow-hidden">
      {/* Background image (Parallax) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url("/cta-bg-2.jpg")' }}
      />
      <div className="absolute inset-0" style={{ background: 'rgba(13,13,13,0.82)' }} />
      <motion.div
        variants={staggerContainer} initial="hidden" animate={vis ? 'visible' : 'hidden'}
        className="relative max-w-3xl mx-auto text-center"
      >
        <motion.div variants={fadeIn} className="section-label justify-center"><span>Langkah Berikutnya</span></motion.div>
        <motion.h2 variants={fadeInUp} className="font-playfair text-3xl sm:text-5xl font-bold text-white mt-2 mb-5 uppercase leading-tight">
          Mari Buat Rencana <span className="gold-text block sm:inline mt-2 sm:mt-0">Dapur Impian</span> Keluarga Anda
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-white/60 mb-10 text-sm leading-relaxed tracking-wide">
          Yuk, mari bersama-sama merencanakan dapur impian keluarga Anda! Kami menawarkan desain kustom yang
          sesuai dengan kebutuhan Anda, dengan harga yang sangat kompetitif. Kami juga memberikan garansi produk untuk memastikan kepuasan Anda.
          Dengan kami, Anda akan mendapatkan <em>best value</em> dengan hasil yang estetis dan memikat.
          Dapur impian Anda tinggal selangkah lagi, mari kita mulai rencanakan bersama!
        </motion.p>
        <motion.div variants={fadeInUp}>
          <Link to="/konsultasi" className="btn-gold text-sm py-4 px-12">
            <span>Dapatkan Penawaran</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <BrandIntro />
      <StatsStrip />
      <ServicesPreview />
      <PortfolioPreview />
      <TestimonialsSection />
      <CtaBanner />
    </main>
  );
}
