import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ShieldCheck, Star } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, fadeIn } from '../utils/animations';

const INITIAL_FORM = {
  nama: '',
  whatsapp: '',
  properti: '',
  lokasi: '',
  luas: '',
};

const trustSignals = [
  { icon: ShieldCheck, label: 'Data 100% Aman & Terjaga' },
  { icon: Star, label: 'Respons dalam 2×24 Jam' },
  { icon: Send, label: 'Konsultasi Pertama GRATIS' },
];

export default function ConsultationSection() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });

  const validate = () => {
    const newErrors = {};
    if (!formData.nama.trim()) newErrors.nama = 'Nama wajib diisi.';
    if (!formData.whatsapp.trim() || !/^\d{9,15}$/.test(formData.whatsapp.trim()))
      newErrors.whatsapp = 'Nomor WhatsApp tidak valid.';
    if (!formData.properti) newErrors.properti = 'Pilih tipe properti.';
    if (!formData.lokasi) newErrors.lokasi = 'Pilih lokasi proyek.';
    if (!formData.luas) newErrors.luas = 'Pilih estimasi luas area.';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // In production: send to CRM / WhatsApp API
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <section
      id="konsultasi"
      className="relative py-28 px-6"
      ref={sectionRef}
      aria-labelledby="consultation-heading"
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* ── Left Column — Messaging ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            <motion.div variants={fadeIn} className="section-label">
              <span>Langkah Pertama</span>
            </motion.div>

            <motion.h2
              id="consultation-heading"
              variants={fadeInLeft}
              className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2 leading-tight"
            >
              Mulai <span className="gold-text">Proyek</span> Anda
            </motion.h2>

            <motion.div variants={fadeInLeft} className="divider-gold mt-5" />

            <motion.p
              variants={fadeInLeft}
              className="text-slate-400 leading-relaxed mt-6 text-sm sm:text-base"
            >
              Isi formulir di samping untuk memulai perjalanan transformasi hunian Anda.
              Tim konsultan kami akan menghubungi Anda untuk sesi diskusi awal secara
              <strong className="text-gold-DEFAULT/80"> GRATIS</strong> dan tanpa komitmen.
            </motion.p>

            {/* Trust signals */}
            <motion.ul
              variants={staggerContainer}
              className="mt-10 space-y-4"
              aria-label="Keuntungan konsultasi dengan Gresth Living"
            >
              {trustSignals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <motion.li
                    key={signal.label}
                    variants={fadeInLeft}
                    className="flex items-center gap-4"
                  >
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-sm flex items-center justify-center"
                      style={{
                        background: 'rgba(212,175,55,0.1)',
                        border: '1px solid rgba(212,175,55,0.2)',
                      }}
                    >
                      <Icon size={18} className="text-gold-DEFAULT" aria-hidden="true" />
                    </div>
                    <span className="text-slate-300 text-sm">{signal.label}</span>
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* Testimonial quote */}
            <motion.blockquote
              variants={fadeInLeft}
              className="mt-12 pl-5 border-l-2 border-gold-DEFAULT/40"
              cite="Klien Gresth Living"
            >
              <p className="text-slate-400 text-sm leading-relaxed">
                "Gresth Living benar-benar mengubah rumah kami menjadi sesuatu yang jauh
                melampaui ekspektasi. Detail ornamen, pilihan warna, hingga furnitur kustom
                — semuanya sempurna."
              </p>
              <footer className="mt-3">
                <cite className="text-gold-DEFAULT/70 text-xs not-italic tracking-wide">
                  — Bapak Hendra S., Jakarta Selatan
                </cite>
              </footer>
            </motion.blockquote>
          </motion.div>

          {/* ── Right Column — Form ── */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16 px-8"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  borderRadius: '4px',
                }}
                role="status"
                aria-live="polite"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}
                >
                  <ShieldCheck size={32} className="text-gold-DEFAULT" />
                </div>
                <h3 className="font-playfair text-2xl text-white font-semibold mb-3">
                  Terima Kasih!
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Permohonan konsultasi Anda telah kami terima. Tim kami akan menghubungi Anda
                  melalui WhatsApp dalam waktu 2×24 jam.
                </p>
                <div className="divider-gold mx-auto mt-6" />
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(212,175,55,0.15)',
                  borderRadius: '4px',
                  padding: '2.5rem',
                }}
                aria-label="Formulir Kualifikasi Klien Gresth Living"
              >
                <div className="mb-2">
                  <h3 className="font-playfair text-xl text-white font-semibold">
                    Formulir Kualifikasi Klien
                  </h3>
                  <p className="text-slate-500 text-xs mt-1 tracking-wide">
                    Semua field bertanda * wajib diisi
                  </p>
                </div>

                {/* Nama Lengkap */}
                <div>
                  <label htmlFor="nama" className="block text-xs text-slate-400 tracking-widest uppercase mb-2">
                    Nama Lengkap <span className="text-gold-DEFAULT" aria-label="wajib">*</span>
                  </label>
                  <input
                    id="nama"
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="contoh: Budi Santoso"
                    className="form-input"
                    autoComplete="name"
                    aria-required="true"
                    aria-describedby={errors.nama ? 'error-nama' : undefined}
                  />
                  {errors.nama && (
                    <p id="error-nama" className="text-red-400 text-xs mt-1.5" role="alert">
                      {errors.nama}
                    </p>
                  )}
                </div>

                {/* Nomor WhatsApp */}
                <div>
                  <label htmlFor="whatsapp" className="block text-xs text-slate-400 tracking-widest uppercase mb-2">
                    Nomor WhatsApp <span className="text-gold-DEFAULT" aria-label="wajib">*</span>
                  </label>
                  <div className="relative">
                    <span
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm select-none"
                      aria-hidden="true"
                    >
                      +62
                    </span>
                    <input
                      id="whatsapp"
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="81234567890"
                      className="form-input pl-14"
                      autoComplete="tel"
                      inputMode="numeric"
                      aria-required="true"
                      aria-describedby={errors.whatsapp ? 'error-whatsapp' : undefined}
                    />
                  </div>
                  {errors.whatsapp && (
                    <p id="error-whatsapp" className="text-red-400 text-xs mt-1.5" role="alert">
                      {errors.whatsapp}
                    </p>
                  )}
                </div>

                {/* Tipe Properti */}
                <div>
                  <label htmlFor="properti" className="block text-xs text-slate-400 tracking-widest uppercase mb-2">
                    Tipe Properti <span className="text-gold-DEFAULT" aria-label="wajib">*</span>
                  </label>
                  <select
                    id="properti"
                    name="properti"
                    value={formData.properti}
                    onChange={handleChange}
                    className="form-input"
                    aria-required="true"
                    aria-describedby={errors.properti ? 'error-properti' : undefined}
                  >
                    <option value="" disabled>Pilih tipe properti...</option>
                    <option value="rumah">Rumah</option>
                    <option value="apartemen">Apartemen</option>
                    <option value="villa">Villa</option>
                  </select>
                  {errors.properti && (
                    <p id="error-properti" className="text-red-400 text-xs mt-1.5" role="alert">
                      {errors.properti}
                    </p>
                  )}
                </div>

                {/* Lokasi Proyek */}
                <div>
                  <label htmlFor="lokasi" className="block text-xs text-slate-400 tracking-widest uppercase mb-2">
                    Lokasi Proyek <span className="text-gold-DEFAULT" aria-label="wajib">*</span>
                  </label>
                  <select
                    id="lokasi"
                    name="lokasi"
                    value={formData.lokasi}
                    onChange={handleChange}
                    className="form-input"
                    aria-required="true"
                    aria-describedby={errors.lokasi ? 'error-lokasi' : undefined}
                  >
                    <option value="" disabled>Pilih kota / wilayah...</option>
                    <option value="jakarta">Jakarta</option>
                    <option value="bogor">Bogor</option>
                    <option value="depok">Depok</option>
                    <option value="tangerang">Tangerang</option>
                    <option value="bekasi">Bekasi</option>
                  </select>
                  {errors.lokasi && (
                    <p id="error-lokasi" className="text-red-400 text-xs mt-1.5" role="alert">
                      {errors.lokasi}
                    </p>
                  )}
                </div>

                {/* Estimasi Luas */}
                <div>
                  <label htmlFor="luas" className="block text-xs text-slate-400 tracking-widest uppercase mb-2">
                    Estimasi Luas Area <span className="text-gold-DEFAULT" aria-label="wajib">*</span>
                  </label>
                  <select
                    id="luas"
                    name="luas"
                    value={formData.luas}
                    onChange={handleChange}
                    className="form-input"
                    aria-required="true"
                    aria-describedby={errors.luas ? 'error-luas' : undefined}
                  >
                    <option value="" disabled>Pilih estimasi luas...</option>
                    <option value="lt50">{'< 50 m²'}</option>
                    <option value="50-100">50 – 100 m²</option>
                    <option value="gt100">{'> 100 m²'}</option>
                  </select>
                  {errors.luas && (
                    <p id="error-luas" className="text-red-400 text-xs mt-1.5" role="alert">
                      {errors.luas}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-gold w-full mt-2 justify-center"
                  aria-label="Kirim formulir konsultasi"
                >
                  <span>Kirim & Mulai Konsultasi</span>
                  <Send size={14} className="relative z-10" aria-hidden="true" />
                </button>

                <p className="text-center text-slate-600 text-[11px] leading-relaxed">
                  Dengan mengirim formulir ini, Anda menyetujui bahwa tim Gresth Living
                  dapat menghubungi Anda melalui WhatsApp yang tertera.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
