import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer } from '../utils/animations';

const HERO_IMAGE = '/hero-image.jpg';

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

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero — Gresth Living"
    >
      {/* Fixed Background image for Parallax effect */}
      <div className="fixed inset-0 z-[-1]">
        <img
          src={HERO_IMAGE}
          alt="Interior klasik mewah Gresth Living"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchpriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(13,13,13,0.88) 0%, rgba(13,13,13,0.55) 50%, rgba(13,13,13,0.82) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-28 pb-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-5"
        >
          {/* H1 */}
          <motion.h1
            variants={fadeInUp}
            className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-extrabold tracking-tight
                       leading-tight text-white text-balance drop-shadow-2xl"
            style={{ textShadow: '0 4px 15px rgba(0,0,0,0.7)' }}
          >
            Wujudkan Kemewahan{' '}
            <motion.span
              className="gold-text inline-block"
              animate={{ 
                textShadow: ['0 4px 15px rgba(0,0,0,0.7)', '0 4px 25px rgba(201,168,76,0.6)', '0 4px 15px rgba(0,0,0,0.7)'],
                scale: [1, 1.02, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Interior Klasik
            </motion.span>
            <br className="hidden sm:block" />
            di Hunian Anda
          </motion.h1>

          <motion.div variants={fadeInUp} className="divider-gold mx-auto drop-shadow-md" />

          {/* Desc */}
          <motion.p
            variants={fadeInUp}
            className="max-w-2xl text-base sm:text-lg leading-relaxed font-light drop-shadow-md"
            style={{ color: 'rgba(255,255,255,0.80)', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}
          >
            Spesialis jasa desain, eksekusi instalasi, dan custom furniture bergaya klasik
            elegan di Jabodetabek. Proporsi sempurna, material premium.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center gap-4 mt-1"
          >
            <Link to="/konsultasi" className="btn-gold">
              <span>Konsultasi Gratis</span>
            </Link>
            <Link to="/portofolio" className="btn-outline">
              Lihat Portofolio
            </Link>
          </motion.div>

          {/* Stats with count-up */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-10 mt-6 pt-6 border-t border-white/10"
          >
            {[
              { to: 150, suffix: '+', label: 'Proyek Selesai' },
              { to: 14,   suffix: '+', label: 'Tahun Pengalaman' },
              { to: 98,  suffix: '%', label: 'Klien Puas' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-playfair text-3xl gold-text font-bold">
                  <CountUp to={s.to} suffix={s.suffix} />
                </p>
                <p className="text-[10px] tracking-widest uppercase mt-1" style={{ color: 'rgba(255,255,255,0.40)' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
