import { motion } from 'framer-motion';
import { Award, Users, Lightbulb } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, fadeIn } from '../utils/animations';

const ABOUT_IMAGE = '/about-image.jpg';

const values = [
  {
    icon: Award,
    title: 'Keunggulan Tanpa Kompromi',
    desc: 'Standar kualitas kami tidak pernah kami turunkan, dari material hingga sentuhan akhir.',
  },
  {
    icon: Users,
    title: 'Kemitraan Sejati',
    desc: 'Kami tidak sekadar kontraktor — kami menjadi mitra perjalanan transformasi hunian Anda.',
  },
  {
    icon: Lightbulb,
    title: 'Solusi Kreatif & Fungsional',
    desc: 'Keindahan klasik yang kami ciptakan selalu berlandaskan kegunaan dan kenyamanan hidup.',
  },
];

export default function AboutSection() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="tentang"
      className="relative py-28 px-6 overflow-hidden"
      ref={sectionRef}
      aria-labelledby="about-heading"
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 0% 50%, #D4AF37 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="relative"
          >
            <div className="relative overflow-hidden" style={{ borderRadius: '3px' }}>
              <img
                src={ABOUT_IMAGE}
                alt="Tim Gresth Living sedang mengerjakan desain interior klasik"
                className="w-full h-[480px] object-cover"
                loading="lazy"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(7,13,28,0.3), rgba(7,13,28,0.05))' }}
              />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="absolute -bottom-6 -right-4 sm:-right-8 p-5"
              style={{
                background: 'rgba(11,19,43,0.92)',
                border: '1px solid rgba(212,175,55,0.3)',
                backdropFilter: 'blur(16px)',
                borderRadius: '3px',
                minWidth: '160px',
              }}
              aria-label="Statistik pengalaman Gresth Living"
            >
              <p className="font-playfair text-3xl font-bold gold-text">14+</p>
              <p className="text-slate-400 text-xs tracking-widest uppercase mt-1">
                Tahun Membangun<br />Kepercayaan
              </p>
            </motion.div>

            {/* Gold frame accent */}
            <div
              className="absolute -top-3 -left-3 w-16 h-16 opacity-40"
              aria-hidden="true"
              style={{
                borderTop: '2px solid #D4AF37',
                borderLeft: '2px solid #D4AF37',
              }}
            />
            <div
              className="absolute -bottom-3 -right-3 w-16 h-16 opacity-40"
              aria-hidden="true"
              style={{
                borderBottom: '2px solid #D4AF37',
                borderRight: '2px solid #D4AF37',
              }}
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            <motion.div variants={fadeIn} className="section-label">
              <span>Siapa Kami</span>
            </motion.div>

            <motion.h2
              id="about-heading"
              variants={fadeInUp}
              className="font-playfair text-3xl sm:text-4xl font-bold text-white mt-2 leading-tight"
            >
              Lebih dari Sekadar{' '}
              <span className="gold-text">Desainer</span> Interior
            </motion.h2>

            <motion.div variants={fadeInUp} className="divider-gold mt-5" />

            <motion.p
              variants={fadeInUp}
              className="text-slate-400 leading-relaxed mt-6 text-sm sm:text-base"
            >
              Gresth Living lahir dari kecintaan mendalam terhadap keindahan desain klasik
              yang melampaui zaman. Selama lebih dari 14 tahun, kami telah mempercayakan
              nama kami pada lebih dari 150 proyek residensial di seluruh Jabodetabek.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-slate-400 leading-relaxed mt-4 text-sm sm:text-base"
            >
              Kami percaya bahwa setiap ruang mempunyai jiwa tersendiri. Tugas kami adalah
              mendengarkan, memahami, dan menuangkannya ke dalam desain yang tidak hanya
              indah secara visual, tetapi juga berfungsi sempurna untuk kehidupan sehari-hari.
            </motion.p>

            {/* Values */}
            <motion.ul
              variants={staggerContainer}
              className="mt-10 space-y-6"
              aria-label="Nilai-nilai Gresth Living"
            >
              {values.map((val) => {
                const Icon = val.icon;
                return (
                  <motion.li
                    key={val.title}
                    variants={fadeInUp}
                    className="flex items-start gap-4"
                  >
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-sm flex items-center justify-center mt-0.5"
                      style={{
                        background: 'rgba(212,175,55,0.1)',
                        border: '1px solid rgba(212,175,55,0.2)',
                      }}
                    >
                      <Icon size={18} className="text-gold-DEFAULT" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-playfair text-white text-sm font-semibold mb-1">
                        {val.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed">{val.desc}</p>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
