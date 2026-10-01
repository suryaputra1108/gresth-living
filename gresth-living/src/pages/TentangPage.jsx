import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInUp, fadeInLeft, fadeInRight, fadeIn, staggerContainer, scaleIn } from '../utils/animations';

const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=900&auto=format&fit=crop';

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

const MATERIALS = [
  { name: 'Kayu Sonokeling', img: '/kayu-sonokeling.png' },
  { name: 'Kayu Jati',       img: '/kayu-jati.png' },
  { name: 'Logam',           img: '/logam.png' },
  { name: 'Marmer Hitam',    img: '/marmer-hitam.png' },
  { name: 'Marmer Putih',    img: '/marmer-putih.png' },
  { name: 'Cat Duco',        img: '/cat-duco.png' },
];

export default function TentangPage() {
  const [s1Ref, s1Vis] = useScrollAnimation({ threshold: 0.1 });
  const [s2Ref, s2Vis] = useScrollAnimation({ threshold: 0.1 });
  const [s3Ref, s3Vis] = useScrollAnimation({ threshold: 0.1 });

  return (
    <main style={{ background: '#0D0D0D' }}>
      {/* ── Hero ── */}
      <section className="pt-36 pb-20 px-6" style={{ background: '#141414' }} aria-labelledby="tentang-h1">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.7 }}>
            <div className="section-label justify-center"><span>Profil Kami</span></div>
            <h1 id="tentang-h1" className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2 leading-tight">
              Perusahaan Interior <span className="gold-text">Spesialis Moderen Klasik</span> Sejak 2012
            </h1>
            <div className="divider-gold mx-auto mt-6" />
            <p className="mt-6 leading-relaxed max-w-3xl mx-auto text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.60)' }}>
              Gresth adalah perusahaan spesialis dalam desain interior modern klasik sejak tahun 2012. 
              Kami selalu berkomitmen untuk berinovasi, meningkatkan kualitas produk, dan terus memperbarui pelayanan kami. 
              Dengan dedikasi terhadap desain yang indah dan berkualitas, kami siap membantu mewujudkan ruang impian Anda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Story Section (Witness The Parenial Beauty) ── */}
      <section ref={s1Ref} className="py-24 px-6 section-light">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeInLeft} initial="hidden" animate={s1Vis ? 'visible' : 'hidden'} className="relative">
            <div className="overflow-hidden rounded-xl shadow-card-hover" style={{ aspectRatio: '4/5' }}>
              <img src={ABOUT_IMAGE} alt="Interior Gresth Living" className="w-full h-full object-cover" loading="lazy" />
            </div>
            {/* Floating stat */}
            <motion.div
              initial={{ opacity:0, y:20 }} animate={s1Vis ? { opacity:1, y:0 } : {}}
              transition={{ delay:0.5, duration:0.6 }}
              className="absolute -bottom-6 -right-4 sm:-right-8 p-6 rounded-xl shadow-card-hover bg-white"
              style={{ border: '1px solid rgba(201,168,76,0.20)' }}
            >
              <p className="font-playfair text-4xl font-bold gold-text">
                <CountUp to={2012} duration={2.5} />
              </p>
              <p className="text-xs tracking-widest uppercase mt-1 text-charcoal/50">
                Tahun Berdiri
              </p>
            </motion.div>
            {/* Corner accents */}
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-sm"
              style={{ borderTop:'2px solid #C9A84C', borderLeft:'2px solid #C9A84C' }} aria-hidden="true" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-sm"
              style={{ borderBottom:'2px solid #C9A84C', borderRight:'2px solid #C9A84C' }} aria-hidden="true" />
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" animate={s1Vis ? 'visible' : 'hidden'}>
            <motion.div variants={fadeIn} className="section-label-dark"><span>Filosofi Kami</span></motion.div>
            <motion.h2 variants={fadeInUp} className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mt-2 leading-tight">
              WITNESS THE <span className="gold-text uppercase">Parenial Beauty</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="divider-gold mt-5 mb-6" />
            
            <motion.p variants={fadeInUp} className="text-sm sm:text-base leading-relaxed mb-4 text-charcoal/70">
              Menyaksikan atau membuktikan kecantikan yang abadi, begitulah makna dari <strong>Witness the Parenial Beauty</strong>. 
              Filosofinya lebih kepada tujuan kami membuat karya-karya yang selain difungsikan sebagaimana fungsi ruang itu sendiri, 
              tetapi juga memiliki value lain yang estetik atau cantik disetiap detailnya yang dapat dinikmati sampai kapanpun dan tak lekang oleh waktu.
            </motion.p>
            
            <motion.p variants={fadeInUp} className="text-sm leading-relaxed mb-4 text-charcoal/70">
              Slogan ini muncul sebagai visi, setelah kami mendapatkan kenyamanan dalam berkarya di <em>home decor</em> dengan genre <em>modern classic</em>.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-sm leading-relaxed mb-8 text-charcoal/70">
              Menyaksikan keindahan yang abadi sejalan dengan konsep Gresth Living, bahwa kami selalu ingin membuat setiap karya menjadi sebuah keindahan yang tidak lekang oleh jaman. 
              Maka Gresth Living memilih tema <em>modern classic</em> yang memang dari dulu hingga sekarang masih tetap eksis dan banyak disukai orang dari lintas generasi.
            </motion.p>

            <motion.blockquote variants={fadeInUp} className="pl-6 py-2 border-l-2 mb-8" style={{ borderColor: '#C9A84C' }}>
              <p className="font-playfair text-lg text-charcoal/90">
                "Witness the parenial beauty yakni menyaksikan atau membuktikan kecantikan yang abadi."
              </p>
            </motion.blockquote>
            
            <motion.div variants={fadeInUp}>
              <Link to="/konsultasi" className="btn-outline-gold"><span>Wujudkan Ruang Impian</span><ChevronRight size={15}/></Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Materials ── */}
      <section ref={s2Ref} className="py-24 px-6 section-dark-2" aria-labelledby="materials-heading">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" animate={s2Vis ? 'visible' : 'hidden'} className="text-center mb-16">
            <motion.div variants={fadeIn} className="section-label justify-center"><span>Komposisi Karya</span></motion.div>
            <motion.h2 id="materials-heading" variants={fadeInUp} className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
              Ragam <span className="gold-text">Material</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="divider-gold mx-auto mt-5" />
            <motion.p variants={fadeInUp} className="mt-6 text-sm leading-relaxed max-w-3xl mx-auto text-white/60">
              Dalam perjalanan melalui dunia desain interior, kita menemui beragam material yang menjadi kunci keberhasilan 
              untuk menciptakan ruang yang indah dan fungsional. Mulai dari kehangatan kayu yang memberikan sentuhan alami dan klasik, 
              hingga kemewahan marmer yang melambangkan keanggunan, ragam material interior membawa karakter dan nuansa unik.
            </motion.p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" animate={s2Vis ? 'visible' : 'hidden'}
            className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            {MATERIALS.map((m, i) => (
              <motion.div key={m.name} variants={scaleIn} className="flex flex-col items-center">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden mb-5 border-2 hover:scale-105 transition-transform duration-500"
                  style={{ borderColor: 'rgba(201,168,76,0.30)' }}>
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="font-playfair text-sm md:text-lg font-bold text-white tracking-wider">{m.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Anti Rayap ── */}
      <section ref={s3Ref} className="py-24 px-6 section-light" aria-labelledby="quality-heading">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate={s3Vis ? 'visible' : 'hidden'}>
            <motion.div variants={scaleIn} className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 bg-white"
              style={{ border: '1px solid rgba(201,168,76,0.25)' }}>
              <ShieldCheck size={40} className="text-gold-DEFAULT" />
            </motion.div>
            
            <motion.h2 id="quality-heading" variants={fadeInUp} className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mb-6 leading-tight uppercase tracking-widest">
              Bahan Material 100% <span className="gold-text block sm:inline mt-2 sm:mt-0">Anti Rayap</span> & Berkualitas Tinggi
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-sm sm:text-base leading-relaxed text-charcoal/70">
              Komitmen kami untuk selalu menggunakan bahan material yang sepenuhnya anti rayap dan memiliki kualitas tinggi. 
              Bahan composite kayu dan PVC yang kami gunakan memiliki ketahanan yang luar biasa, bahkan bisa bertahan hingga puluhan tahun. 
              Dengan ini, kami memastikan produk kami tidak hanya tahan terhadap gangguan rayap, tetapi juga memberikan kualitas yang prima 
              dalam jangka waktu yang panjang.
            </motion.p>
          </motion.div>
        </div>
      </section>
      {/* ── Tim Ahli ── */}
      <section className="py-24 px-6 section-dark-3" aria-labelledby="team-heading">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}>
            <motion.h2 id="team-heading" variants={fadeInUp} className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 leading-tight uppercase tracking-widest">
              Pekerja <span className="gold-text">Yang Ahli</span> Di Bidangnya,<br />Gaya Yang Unik
            </motion.h2>
            <motion.div variants={fadeInUp} className="divider-gold mx-auto mb-6" />
            <motion.p variants={fadeInUp} className="text-sm sm:text-base leading-relaxed text-white/60">
              Kami bangga memiliki tim pekerja yang ahli dalam bidangnya, yang menghadirkan gaya unik dalam setiap proyek. 
              Kami mengusung konsep modern klasik dengan sentuhan khas Indonesia, menggabungkan bahan-bahan berkualitas tinggi 
              seperti kayu solid jati dan sonokeling. Hasilnya adalah kreasi yang memadukan keindahan estetika modern dengan kehangatan 
              unsur tradisional, menciptakan desain yang istimewa dan tak terlupakan.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
