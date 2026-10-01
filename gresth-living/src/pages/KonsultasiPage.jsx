import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../utils/animations';

const INITIAL = { nama:'', whatsapp:'', properti:'', lokasi:'', luas:'' };

const TRUST = [
  { icon: ShieldCheck, label: 'Kerahasiaan Data Terjamin' },
  { icon: Clock,       label: 'Respons Cepat dalam 2×24 Jam' },
  { icon: Sparkles,    label: 'Sesi Diskusi Awal Tanpa Biaya' },
];

export default function KonsultasiPage() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [ref, vis] = useScrollAnimation({ threshold: 0.05 });

  const validate = () => {
    const e = {};
    if (!form.nama.trim())                                   e.nama = 'Nama wajib diisi.';
    if (!form.whatsapp.trim() || !/^\d{9,15}$/.test(form.whatsapp.trim()))
                                                             e.whatsapp = 'Nomor WhatsApp tidak valid.';
    if (!form.properti)                                      e.properti = 'Pilih tipe properti.';
    if (!form.lokasi)                                        e.lokasi = 'Pilih lokasi proyek.';
    if (!form.luas)                                          e.luas = 'Pilih estimasi luas area.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) { setErrors(v); return; }
    
    // Construct the WhatsApp message with the form data
    const message = `Halo tim Gresth Living, saya ingin konsultasi proyek:

*Nama:* ${form.nama}
*WhatsApp:* ${form.whatsapp}
*Tipe Properti:* ${form.properti}
*Lokasi Proyek:* ${form.lokasi}
*Estimasi Luas:* ${form.luas}

Mohon informasi lebih lanjut. Terima kasih!`;

    // Choose the primary marketing number here
    const waNumber = '6281313437299'; // Note: update to actual number if different
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new tab
    window.open(waUrl, '_blank');
    
    // Show success state on the form as well
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      {/* Hero Background */}
      <div className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-[center_140%] bg-fixed"
          style={{ backgroundImage: 'url("/konsultasi-image.jpg")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/40 via-[#0D0D0D]/80 to-[#0D0D0D]" />
        
        <div className="relative max-w-7xl mx-auto z-10 text-center">
          <motion.div initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.7 }}>
            <div className="section-label justify-center"><span>Langkah Pertama</span></div>
            <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
              Mulai <span className="gold-text">Proyek</span> Anda
            </h1>
            <div className="divider-gold mx-auto mt-5" />
            <p className="mt-5 max-w-xl mx-auto text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.80)' }}>
              Isi formulir di bawah dan tim konsultan kami akan menghubungi Anda untuk sesi
              diskusi awal secara <strong className="text-gold-DEFAULT">GRATIS</strong> dan tanpa komitmen.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="relative pt-8 pb-24 overflow-hidden">
        {/* Parallax Marble Background */}
        <div 
          className="absolute inset-0 bg-center bg-fixed bg-repeat opacity-60 bg-[length:100%_auto] sm:bg-contain"
          style={{ backgroundImage: 'url("/marble-bg.jpg")' }}
        />
        {/* Soft overlay for readability */}
        <div className="absolute inset-0 bg-[#F5F0E8]/80 backdrop-blur-sm" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* ── Left: Info ── */}
            <motion.div variants={staggerContainer} initial="hidden" animate={vis ? 'visible' : 'hidden'}>
              {/* Trust signals */}
              <motion.ul variants={staggerContainer} className="flex flex-col gap-3 mb-10">
                {TRUST.map((t) => {
                  const Icon = t.icon;
                  return (
                    <motion.li key={t.label} variants={fadeInLeft} className="flex items-center gap-3 group">
                      <div className="w-8 h-8 rounded-full bg-gold-DEFAULT/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-gold-DEFAULT/20">
                        <Icon size={16} strokeWidth={2} className="text-gold-DEFAULT" />
                      </div>
                      <span className="text-charcoal/80 text-sm font-medium tracking-wide">{t.label}</span>
                    </motion.li>
                  );
                })}
              </motion.ul>

              {/* Steps */}
              <motion.div variants={fadeInUp} className="mb-10">
                <h2 className="font-playfair text-xl font-bold text-charcoal mb-6">Proses Konsultasi Kami</h2>
                <div className="space-y-6 relative">
                  {/* Vertical line connecting steps */}
                  <div className="absolute left-5 top-2 bottom-2 w-px bg-gold-DEFAULT/30" />
                  
                  {[
                    { title:'Isi Formulir', desc:'Lengkapi data diri dan kebutuhan proyek Anda.' },
                    { title:'Tim Menghubungi Anda', desc:'Marketing kami akan merespons & menjadwalkan survei lokasi.' },
                    { title:'Survei & Penawaran', desc:'Kami melakukan perhitungan estimasi biaya awal dari hasil survei.' },
                    { title:'Proses Desain & Eksekusi', desc:'Dari gambar 3D hingga serah terima di lapangan.' },
                  ].map((s,i) => (
                    <div key={s.title} className="flex gap-4 relative z-10">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 font-bold text-xs shadow-card"
                        style={{ border: '1px solid #C9A84C', color: '#C9A84C' }}>
                        {String(i+1).padStart(2,'0')}
                      </div>
                      <div>
                        <h3 className="font-bold text-charcoal text-sm mt-1">{s.title}</h3>
                        <p className="text-xs mt-1 text-charcoal/70">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Direct Contacts */}
              <motion.div variants={fadeInUp}>
                <motion.div 
                  className="p-6 rounded-xl border relative cursor-pointer overflow-hidden group shadow-2xl" 
                  style={{ 
                    background: 'linear-gradient(135deg, #1A1A1A 0%, #080808 100%)', 
                    borderColor: 'rgba(201,168,76,0.5)',
                    boxShadow: '0 10px 40px -10px rgba(201,168,76,0.3)'
                  }}
                  animate={{
                    rotate: [0, -3, 3, -2, 2, 0],
                    scale: [1, 1.03, 1.03, 1.01, 1.01, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2.5,
                    ease: "easeInOut"
                  }}
                  onClick={() => window.open('https://wa.me/6281313437299', '_blank')}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gold-DEFAULT/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <h3 className="font-playfair font-bold text-white mb-4 relative z-10">Ingin langsung berbicara?</h3>
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-4 text-sm text-white/90 group-hover:text-gold-DEFAULT transition-colors">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-tr from-[#25D366]/20 to-[#128C7E]/20 border border-[#25D366]/50 flex items-center justify-center transition-colors shadow-[0_0_15px_rgba(37,211,102,0.4)] group-hover:shadow-[0_0_20px_rgba(37,211,102,0.6)]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#25D366" className="transition-transform group-hover:scale-110">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold tracking-wide">Marketing (WA)</span>
                        <span className="text-white/70 text-sm mt-0.5 tracking-wider">+62 813-1343-7299</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ── Right: Form ── */}
            <motion.div variants={fadeInRight} initial="hidden" animate={vis ? 'visible' : 'hidden'}>
              <div className="p-8 rounded-2xl shadow-xl border bg-white" style={{ borderColor: 'rgba(201,168,76,0.30)' }}>
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6" style={{ background: 'rgba(201,168,76,0.12)' }}>
                      <ShieldCheck size={40} className="text-gold-DEFAULT" />
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-charcoal mb-3">Mengarahkan ke WhatsApp...</h3>
                    <p className="text-sm text-charcoal/70">
                      Formulir berhasil diproses. Jika WhatsApp tidak otomatis terbuka,{' '}
                      <button onClick={handleSubmit} className="text-gold-DEFAULT hover:underline font-medium">klik di sini</button>.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="btn-outline-gold w-full mt-8 py-3">
                      Kembali
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="font-playfair text-2xl font-bold text-charcoal">Formulir Kualifikasi Klien</h2>
                      <p className="text-xs mt-1 text-charcoal/50">Semua field bertanda * wajib diisi</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                      {/* Nama */}
                      <div>
                        <label htmlFor="nama" className="block text-[10px] font-bold tracking-widest text-charcoal/60 uppercase mb-2">Nama Lengkap *</label>
                        <input type="text" id="nama" name="nama" value={form.nama} onChange={handleChange}
                          className={`form-input w-full px-4 py-3 bg-[#F9F9F9] border rounded-lg text-charcoal text-sm focus:outline-none transition-colors ${errors.nama ? 'border-red-500 focus:border-red-500' : 'border-black/10 focus:border-gold-DEFAULT'}`}
                          placeholder="contoh: Budi Santoso" />
                        {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
                      </div>

                      {/* WhatsApp */}
                      <div>
                        <label htmlFor="whatsapp" className="block text-[10px] font-bold tracking-widest text-charcoal/60 uppercase mb-2">Nomor WhatsApp *</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40 text-sm font-medium">+62</span>
                          <input type="tel" id="whatsapp" name="whatsapp" value={form.whatsapp} onChange={handleChange}
                            className={`form-input w-full pl-12 pr-4 py-3 bg-[#F9F9F9] border rounded-lg text-charcoal text-sm focus:outline-none transition-colors ${errors.whatsapp ? 'border-red-500 focus:border-red-500' : 'border-black/10 focus:border-gold-DEFAULT'}`}
                            placeholder="81234567890" />
                        </div>
                        {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
                      </div>

                      {/* Tipe Properti */}
                      <div>
                        <label htmlFor="properti" className="block text-[10px] font-bold tracking-widest text-charcoal/60 uppercase mb-2">Tipe Properti *</label>
                        <select id="properti" name="properti" value={form.properti} onChange={handleChange}
                          className={`form-input w-full px-4 py-3 bg-[#F9F9F9] border rounded-lg text-charcoal text-sm appearance-none focus:outline-none transition-colors ${errors.properti ? 'border-red-500 focus:border-red-500' : 'border-black/10 focus:border-gold-DEFAULT'}`}>
                          <option value="" disabled className="text-charcoal/30">Pilih tipe properti...</option>
                          <option value="Rumah Tinggal">Rumah Tinggal</option>
                          <option value="Apartemen">Apartemen</option>
                          <option value="Kantor / Komersial">Kantor / Komersial</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                        {errors.properti && <p className="text-red-500 text-xs mt-1">{errors.properti}</p>}
                      </div>

                      {/* Lokasi */}
                      <div>
                        <label htmlFor="lokasi" className="block text-[10px] font-bold tracking-widest text-charcoal/60 uppercase mb-2">Lokasi Proyek *</label>
                        <select id="lokasi" name="lokasi" value={form.lokasi} onChange={handleChange}
                          className={`form-input w-full px-4 py-3 bg-[#F9F9F9] border rounded-lg text-charcoal text-sm appearance-none focus:outline-none transition-colors ${errors.lokasi ? 'border-red-500 focus:border-red-500' : 'border-black/10 focus:border-gold-DEFAULT'}`}>
                          <option value="" disabled>Pilih lokasi...</option>
                          <option value="Jakarta Selatan">Jakarta Selatan</option>
                          <option value="Jakarta Pusat">Jakarta Pusat</option>
                          <option value="Jakarta Barat">Jakarta Barat</option>
                          <option value="Jakarta Utara">Jakarta Utara</option>
                          <option value="Jakarta Timur">Jakarta Timur</option>
                          <option value="Tangerang / Banten">Tangerang / Banten</option>
                          <option value="Bekasi">Bekasi</option>
                          <option value="Depok / Bogor">Depok / Bogor</option>
                          <option value="Luar Jabodetabek">Luar Jabodetabek</option>
                        </select>
                        {errors.lokasi && <p className="text-red-500 text-xs mt-1">{errors.lokasi}</p>}
                      </div>

                      {/* Luas */}
                      <div>
                        <label htmlFor="luas" className="block text-[10px] font-bold tracking-widest text-charcoal/60 uppercase mb-2">Estimasi Luas Area *</label>
                        <select id="luas" name="luas" value={form.luas} onChange={handleChange}
                          className={`form-input w-full px-4 py-3 bg-[#F9F9F9] border rounded-lg text-charcoal text-sm appearance-none focus:outline-none transition-colors ${errors.luas ? 'border-red-500 focus:border-red-500' : 'border-black/10 focus:border-gold-DEFAULT'}`}>
                          <option value="" disabled>Pilih luasan...</option>
                          <option value="< 50 m2">&lt; 50 m2</option>
                          <option value="50 - 100 m2">50 - 100 m2</option>
                          <option value="101 - 200 m2">101 - 200 m2</option>
                          <option value="> 200 m2">&gt; 200 m2</option>
                          <option value="Belum Tahu">Belum Tahu</option>
                        </select>
                        {errors.luas && <p className="text-red-500 text-xs mt-1">{errors.luas}</p>}
                      </div>

                      <button type="submit" className="btn-gold w-full mt-4 flex justify-center py-4">
                        <span>Kirim Permintaan Konsultasi</span>
                      </button>
                      <p className="text-center text-[10px] mt-4 text-charcoal/40">
                        Dengan mengirimkan form ini, Anda menyetujui untuk dihubungi oleh tim Gresth Living.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}
