import { motion } from 'framer-motion';
import { Palette, HardHat, Sofa } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInUp, staggerContainer, fadeIn } from '../utils/animations';

const services = [
  {
    icon: Palette,
    title: 'Desain Interior Klasik',
    description:
      'Kami menciptakan konsep desain interior klasik yang timeless dengan harmonisasi warna, proporsi, dan detail ornamen yang presisi. Dari moodboard hingga gambar kerja 3D.',
    features: ['Konsep & Moodboard', 'Gambar Kerja 3D', 'Pemilihan Material', 'Supervisi Proyek'],
  },
  {
    icon: HardHat,
    title: 'Kontraktor Fit-Out',
    description:
      'Tim kontraktor berpengalaman kami menangani eksekusi pembangunan dan renovasi dari awal hingga akhir. Tepat waktu, transparan, dan berkualitas tinggi.',
    features: ['Renovasi Total', 'Partisi & Plafon', 'Instalasi Listrik & Plumbing', 'Finishing Premium'],
  },
  {
    icon: Sofa,
    title: 'Custom Furniture',
    description:
      'Furniture buatan tangan yang disesuaikan secara eksklusif dengan dimensi, gaya, dan kebutuhan ruang Anda. Material pilihan, pengerjaan detail, sentuhan akhir tanpa kompromi.',
    features: ['Desain Custom', 'Material Import & Lokal', 'Ukiran & Detail Ornamen', 'Instalasi & Garansi'],
  },
];

export default function ServicesSection() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="layanan"
      className="relative py-28 px-6"
      ref={sectionRef}
      aria-labelledby="services-heading"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 80% 50%, #D4AF37 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <motion.div variants={fadeIn} className="section-label justify-center">
            <span>Apa yang Kami Tawarkan</span>
          </motion.div>

          <motion.h2
            id="services-heading"
            variants={fadeInUp}
            className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2"
          >
            Layanan <span className="gold-text">Eksklusif</span> Kami
          </motion.h2>

          <motion.div variants={fadeInUp} className="divider-gold mx-auto mt-5" />

          <motion.p
            variants={fadeInUp}
            className="max-w-xl mx-auto mt-5 text-slate-400 leading-relaxed text-sm sm:text-base"
          >
            Tiga pilar utama layanan kami yang saling melengkapi untuk mewujudkan hunian
            impian Anda dari konsep hingga kenyataan.
          </motion.p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                variants={fadeInUp}
                className="service-card group"
                aria-label={`Layanan ${service.title}`}
              >
                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className="w-14 h-14 rounded-sm flex items-center justify-center
                               bg-gold-DEFAULT/10 border border-gold-DEFAULT/20
                               group-hover:bg-gold-DEFAULT/15 group-hover:border-gold-DEFAULT/40
                               transition-all duration-400"
                  >
                    <Icon
                      size={24}
                      className="text-gold-DEFAULT"
                      aria-hidden="true"
                    />
                  </div>
                  {/* Number watermark */}
                  <span
                    className="absolute -top-2 -right-2 font-playfair text-5xl font-bold
                               text-white/5 select-none leading-none"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="font-playfair text-xl font-semibold text-white mb-3 relative z-10">
                  {service.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 relative z-10">
                  {service.description}
                </p>

                <ul className="space-y-2 relative z-10" aria-label={`Fitur ${service.title}`}>
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <span
                        className="flex-shrink-0 w-1 h-1 rounded-full bg-gold-DEFAULT"
                        aria-hidden="true"
                      />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* Bottom gold line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100
                             transition-transform duration-500 ease-out"
                  style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
                  aria-hidden="true"
                />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
