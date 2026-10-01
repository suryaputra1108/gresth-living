import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Palette, Ruler, Sofa, CheckCircle, ChevronRight, MessageCircle, Map, FileText, Monitor, Handshake, Hammer, CreditCard, Search, Award, CheckSquare, ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInUp, fadeInLeft, fadeInRight, fadeIn, staggerContainer } from '../utils/animations';

const SERVICES = [
  {
    id: 'desain',
    icon: Palette,
    title: 'Desain Interior Klasik',
    desc: 'Kami merancang setiap ruang dengan kedalaman estetika klasik — harmoni warna, proporsi, dan detail ornamen yang presisi. Dari konsultasi awal, moodboard, hingga gambar kerja 3D realistis yang siap eksekusi.',
    features: [
      'Konsultasi & Site Survey Awal',
      'Moodboard & Konsep Warna',
      'Gambar Kerja 3D Realistis',
      'Detail Ornamen & Molding',
      'Pemilihan Material & Finishes',
      'Panduan Teknis Pelaksanaan',
    ],
    image: '/layanan-desain.jpg',
  },
  {
    id: 'instalasi',
    icon: Ruler,
    title: 'Eksekusi & Instalasi',
    desc: 'Tim ahli kami merealisasikan setiap detail desain secara menyeluruh — mulai dari persiapan ruang, instalasi partisi, plafon, sistem pencahayaan, hingga finishing akhir dan serah terima sempurna.',
    features: [
      'Persiapan & Site Preparation',
      'Partisi, Plafon & Wall Treatment',
      'Instalasi Sistem Pencahayaan',
      'Instalasi Listrik & Tata Udara',
      'Plumbing & Sanitasi',
      'Quality Control & Serah Terima',
    ],
    image: '/layanan-instalasi.jpg',
  },
  {
    id: 'furniture',
    icon: Sofa,
    title: 'Custom Furniture',
    desc: 'Furniture buatan tangan yang dirancang eksklusif sesuai dimensi dan karakter ruang Anda. Material pilihan terbaik, ukiran detail klasik, sentuhan akhir premium tanpa kompromi.',
    features: [
      'Desain Custom per Ruangan',
      'Material Kayu Import & Lokal',
      'Ukiran & Detail Ornamen Klasik',
      'Upholstery Fabric Premium',
      'Finishing Duco & Melamine',
      'Instalasi & Garansi 1 Tahun',
    ],
    image: '/layanan-furniture.jpg',
  },
];

const WORKFLOW = [
  { step: '01', icon: MessageCircle, title: 'Klien → Marketing', desc: 'Klien menghubungi untuk menyampaikan kebutuhan. Marketing melakukan komunikasi awal (konsep, lokasi, estimasi) lalu menjadwalkan survei.' },
  { step: '02', icon: Map, title: 'Survei Lokasi', desc: 'Tim melakukan survei lapangan untuk mengetahui kondisi ruang dan faktor biaya. Diikuti perhitungan estimasi biaya awal.' },
  { step: '03', icon: FileText, title: 'Penawaran Awal', desc: 'Penyampaian estimasi harga. Dilakukan penyesuaian jika perlu, dan lanjut ke desain jika disetujui.' },
  { step: '04', icon: Monitor, title: 'Tahap Desain', desc: 'Pembuatan rancangan interior dengan deposit desain. Desain dipresentasikan dan direvisi hingga mencapai persetujuan klien.' },
  { step: '05', icon: Handshake, title: 'Persetujuan & Termin 1', desc: 'Setelah desain disetujui, klien membayar Termin 1 (40%). Dokumen desain kemudian diteruskan ke workshop.' },
  { step: '06', icon: Hammer, title: 'Produksi di Workshop', desc: 'Produksi berjalan diawasi tim pengawas untuk memastikan kesesuaian desain, kualitas, dan timeline.' },
  { step: '07', icon: CreditCard, title: 'Termin 2', desc: 'Setelah progres produksi mencapai target yang disepakati, dilakukan pembayaran Termin 2 (40%).' },
  { step: '08', icon: Search, title: 'Penyelesaian Produksi', desc: 'Pemeriksaan akhir pasca produksi. Perbaikan dilakukan bila ada kekurangan, lalu masuk tahap finalisasi.' },
  { step: '09', icon: Award, title: 'Termin 3', desc: 'Pekerjaan selesai dan memenuhi ketentuan. Klien melakukan pelunasan Termin 3 (20%).' },
  { step: '10', icon: CheckSquare, title: 'Checklist & BAST', desc: 'Checklist akhir bersama klien. Setelah diterima, dilakukan penandatanganan Berita Acara Serah Terima (BAST).' },
];

function PageHero() {
  const { scrollY } = useScroll();
  // Move the background down slightly slower than the scroll to create parallax
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <section className="relative pt-40 pb-32 px-6 overflow-hidden" aria-labelledby="layanan-h1">
      {/* Background Image */}
      <motion.div 
        className="absolute -top-[20%] -bottom-[20%] left-0 right-0 z-0 bg-cover bg-[center_80%]"
        style={{ backgroundImage: 'url("/service-hero.jpg")', y }}
      />
      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0D0D0D]" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.7 }}>
          <div className="section-label justify-center"><span>Yang Kami Kerjakan</span></div>
          <h1 id="layanan-h1" className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2 drop-shadow-md">
            Layanan <span className="gold-text">Eksklusif</span> Kami
          </h1>
          <div className="divider-gold mx-auto mt-5" />
          <p className="mt-6 leading-relaxed max-w-2xl mx-auto text-sm drop-shadow" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Tiga pilar layanan kami yang saling melengkapi untuk mewujudkan hunian impian
            Anda — dari konsep desain, eksekusi & instalasi, hingga furniture custom.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceDetail({ service, index }) {
  const [ref, vis] = useScrollAnimation({ threshold: 0.1 });
  const isEven = index % 2 === 0;
  const isLight = isEven; // Make even items light like in Beranda
  const bgClass = isLight ? 'section-light' : 'section-dark';
  
  const titleColor = isLight ? '#1A1414' : '#FFFFFF';
  const descColor = isLight ? '#4A4040' : 'rgba(255,255,255,0.55)';
  const liColor = isLight ? '#4A4040' : 'rgba(255,255,255,0.70)';

  const Icon = service.icon;

  return (
    <section id={service.id} ref={ref} className={`py-24 px-6 ${bgClass}`}>
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
          {/* Image */}
          <motion.div
            variants={isEven ? fadeInLeft : fadeInRight}
            initial="hidden" animate={vis ? 'visible' : 'hidden'}
            className={`relative ${!isEven ? 'lg:order-2' : ''}`}
          >
            <div className="overflow-hidden rounded-xl shadow-card-hover" style={{ aspectRatio: '4/3' }}>
              <img src={service.image} alt={service.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
            {/* Gold corner accents */}
            <div className="absolute -top-4 -left-4 w-14 h-14"
              style={{ borderTop:'2px solid #C9A84C', borderLeft:'2px solid #C9A84C' }} aria-hidden="true" />
            <div className="absolute -bottom-4 -right-4 w-14 h-14"
              style={{ borderBottom:'2px solid #C9A84C', borderRight:'2px solid #C9A84C' }} aria-hidden="true" />
          </motion.div>

          {/* Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden" animate={vis ? 'visible' : 'hidden'}
            className={!isEven ? 'lg:order-1' : ''}
          >
            <motion.div variants={fadeIn} className="section-label mb-2"><span>Layanan 0{index + 1}</span></motion.div>
            <motion.div variants={fadeInUp} className="mb-6">
              <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ color: titleColor }}>{service.title}</h2>
            </motion.div>

            <motion.div variants={fadeInUp} className="divider-gold mb-6" />
            <motion.p variants={fadeInUp} className="leading-relaxed text-sm sm:text-base mb-8"
              style={{ color: descColor }}>
              {service.desc}
            </motion.p>

            <motion.ul variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {service.features.map((f) => (
                <motion.li key={f} variants={fadeInUp}
                  className="flex items-center gap-3 text-sm" style={{ color: liColor }}>
                  <CheckCircle size={14} className="text-gold-DEFAULT flex-shrink-0" aria-hidden="true" />
                  {f}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeInUp}>
              <Link to="/konsultasi" className={isLight ? "btn-outline-gold" : "btn-gold"} style={isLight ? { color: '#9A7A30', borderColor: '#C9A84C' } : {}}>
                <span>Konsultasikan Kebutuhan Ini</span>
                <ChevronRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BusinessProcess() {
  const containerRef = useRef(null);
  const [ref, vis] = useScrollAnimation({ threshold: 0.05 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="py-20 px-6 section-dark-2" aria-labelledby="workflow-heading">
      <div className="max-w-3xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate={vis ? 'visible' : 'hidden'} className="text-center mb-16">
          <motion.div variants={fadeIn} className="section-label justify-center"><span>Cara Kerja Kami</span></motion.div>
          <motion.h2 id="workflow-heading" variants={fadeInUp} className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
            Alur <span className="gold-text">Proses Bisnis</span>
          </motion.h2>
          <motion.div variants={fadeInUp} className="divider-gold mx-auto mt-5 mb-4" />
          <motion.p variants={fadeInUp} className="font-manrope text-sm text-white/60 max-w-2xl mx-auto">
            10 langkah transparan dan terstruktur dari Gresth Living untuk memastikan kepuasan Anda dari awal hingga serah terima.
          </motion.p>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Static background line */}
          <div className="absolute left-5 sm:left-9 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />
          
          {/* Animated fill line */}
          <motion.div 
            className="absolute left-5 sm:left-9 top-0 w-[2px] bg-gold -translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />
          
          <div className="space-y-10 sm:space-y-12">
            {WORKFLOW.map((item, index) => {
              return (
                <motion.div 
                  key={item.step}
                  variants={fadeInRight}
                  initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-10%" }}
                  className="relative flex items-start gap-6 sm:gap-8"
                >
                  {/* Step Number Circle */}
                  <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ml-0 sm:ml-3 mt-1"
                       style={{ background: 'linear-gradient(135deg, #E8C96A 0%, #C9A84C 50%, #9A7A30 100%)', boxShadow: '0 4px 12px rgba(201,168,76,0.3)' }}>
                    <span className="font-playfair font-bold text-white text-lg sm:text-xl tracking-wider">{item.step}</span>
                  </div>

                  {/* Content - Borderless & Editorial */}
                  <div className="flex-1 pt-1 sm:pt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-manrope text-sm sm:text-base font-bold text-white tracking-wide">{item.title}</h3>
                    </div>
                    <p className="font-manrope text-xs sm:text-[13px] text-white/50 leading-relaxed max-w-lg">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: 'Berapa lama estimasi waktu pengerjaan interior?',
    a: 'Bergantung pada luas area dan tingkat kesulitan detail. Rata-rata memakan waktu 4-8 minggu sejak desain disetujui hingga serah terima.'
  },
  {
    q: 'Apakah Gresth Living melayani proyek di luar Jabodetabek?',
    a: 'Saat ini fokus utama kami adalah area Jabodetabek. Namun, untuk proyek berskala besar, kami dapat mempertimbangkannya dengan biaya akomodasi tambahan.'
  },
  {
    q: 'Bagaimana sistem pembayarannya?',
    a: 'Pembayaran dibagi menjadi 3 termin yang transparan: 40% setelah desain disetujui, 40% saat progres produksi mencapai target, dan 20% pelunasan setelah serah terima.'
  },
  {
    q: 'Apakah saya bisa menggunakan desain saya sendiri untuk dieksekusi?',
    a: 'Tentu. Tim instalasi kami siap merealisasikan desain yang sudah Anda miliki dengan standar kualitas Gresth Living, dengan catatan gambar kerja sudah lengkap.'
  },
  {
    q: 'Apakah ada garansi untuk custom furniture dan instalasi?',
    a: 'Ya, kami memberikan garansi 1 tahun untuk cacat produksi dan instalasi agar investasi Anda terjamin.'
  }
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [ref, vis] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 px-6" style={{ background: '#0D0D0D' }} aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate={vis ? 'visible' : 'hidden'} className="text-center mb-16">
          <motion.div variants={fadeIn} className="section-label justify-center"><span>Tanya Jawab</span></motion.div>
          <motion.h2 id="faq-heading" variants={fadeInUp} className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
            Pertanyaan yang <span className="gold-text">Sering Diajukan</span>
          </motion.h2>
          <motion.div variants={fadeInUp} className="divider-gold mx-auto mt-5" />
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate={vis ? 'visible' : 'hidden'} className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div key={index} variants={fadeInUp} 
                className={`border rounded-xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-gold-DEFAULT/50 bg-[#1E1E1E]' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'}`}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-playfair text-base sm:text-lg font-bold text-white">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 flex-shrink-0 text-gold-DEFAULT"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-8 pt-2 text-sm sm:text-base leading-relaxed text-white/60">
                    {faq.a}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default function LayananPage() {
  return (
    <main style={{ background: '#0D0D0D' }}>
      <PageHero />
      {SERVICES.map((s, i) => <ServiceDetail key={s.id} service={s} index={i} />)}
      
      <BusinessProcess />
      
      <FaqSection />

      {/* CTA */}
      <section className="py-24 px-6 text-center" style={{ background: '#141414', borderTop: '1px solid rgba(201,168,76,0.12)' }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.7 }}>
          <div className="section-label justify-center"><span>Mulai Perjalanan Anda</span></div>
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
            Ada Pertanyaan tentang <span className="gold-text">Layanan Kami?</span>
          </h2>
          <p className="text-sm mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Hubungi tim konsultan kami dan dapatkan sesi diskusi awal secara gratis.
          </p>
          <Link to="/konsultasi" className="btn-gold py-4 px-12">
            <span>Hubungi Kami Sekarang</span>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
