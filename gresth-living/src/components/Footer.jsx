import { Link } from 'react-router-dom';
import { MessageCircle, Mail, MapPin, Instagram, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();
  const year = new Date().getFullYear();

  const FOOTER_LINKS = {
    layanan: [
      { label: lang === 'id' ? 'Desain Interior Klasik' : 'Classic Interior Design', to: '/layanan#desain' },
      { label: lang === 'id' ? 'Kontraktor Fit-Out' : 'Fit-Out Contractor',      to: '/layanan#kontraktor' },
      { label: 'Custom Furniture',        to: '/layanan#furniture' },
      { label: lang === 'id' ? 'Konsultasi Gratis' : 'Free Consultation',       to: '/konsultasi' },
    ],
    info: [
      { label: lang === 'id' ? 'Beranda' : 'Home',          to: '/' },
      { label: lang === 'id' ? 'Tentang Kami' : 'About Us',     to: '/tentang' },
      { label: lang === 'id' ? 'Portofolio' : 'Portfolio',       to: '/portofolio' },
      { label: lang === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy',to: '#' },
    ],
  };

  return (
    <footer
      className="bg-charcoal text-white pt-20 pb-8 px-6"
      aria-label="Footer Gresth Living"
      style={{ borderTop: '2px solid #D4AF37' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div className="lg:col-span-1">
            <img src="/logo-white.png" alt="Logo Gresth Living" className="h-16 w-auto mb-5" />
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              {lang === 'id' 
                ? 'Spesialis desain interior klasik, kontraktor fit-out, dan custom furniture premium di Jabodetabek. Keindahan klasik yang timeless untuk hunian Anda.' 
                : 'Specialists in classic interior design, fit-out contractors, and premium custom furniture in Jabodetabek. Timeless classic beauty for your home.'}
            </p>
            <div className="flex gap-3" aria-label="Media sosial">
              {[
                { href:'https://instagram.com/greszthliving', Icon: Instagram, label:'Instagram' },
                { href:'https://wa.me/6281234567890',         Icon: Phone,     label:'WhatsApp' },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 hover:border-gold-DEFAULT hover:bg-gold-DEFAULT/10 transition-all duration-300"
                  aria-label={label}>
                  <Icon size={16} className="text-gold-DEFAULT" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Layanan */}
          <nav aria-label={lang === 'id' ? "Link Layanan" : "Service Links"}>
            <h3 className="font-playfair text-lg font-bold text-white mb-5">{lang === 'id' ? 'Layanan' : 'Services'}</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.layanan.map(l => (
                <li key={l.label}>
                  <Link to={l.to}
                    className="text-white/50 text-sm hover:text-gold-DEFAULT transition-colors duration-300 flex items-center gap-2 group">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Info */}
          <nav aria-label={lang === 'id' ? "Link Informasi" : "Information Links"}>
            <h3 className="font-playfair text-lg font-bold text-white mb-5">{lang === 'id' ? 'Informasi' : 'Information'}</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.info.map(l => (
                <li key={l.label}>
                  <Link to={l.to}
                    className="text-white/50 text-sm hover:text-gold-DEFAULT transition-colors duration-300 flex items-center gap-2 group">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontak + Maps */}
          <div>
            <h3 className="font-playfair text-lg font-bold text-white mb-5">{lang === 'id' ? 'Hubungi Kami' : 'Contact Us'}</h3>
            <address className="not-italic space-y-4 text-white/50 text-sm mb-5">
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-gold-DEFAULT transition-colors group">
                <MessageCircle size={15} className="text-gold-DEFAULT mt-0.5 flex-shrink-0" aria-hidden="true" />
                +62 812-3456-7890
              </a>
              <a href="mailto:hello@greszthliving.com"
                className="flex items-start gap-3 hover:text-gold-DEFAULT transition-colors group">
                <Mail size={15} className="text-gold-DEFAULT mt-0.5 flex-shrink-0" aria-hidden="true" />
                hello@greszthliving.com
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-gold-DEFAULT mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Jl. Contoh Lokasi No. 1,<br />Jakarta Selatan 12345</span>
              </div>
            </address>

            {/* ── Google Maps Embed (Local SEO) ── */}
            <div
              className="rounded-xl overflow-hidden border border-white/10"
              aria-label="Lokasi Gresth Living di Google Maps"
            >
              <iframe
                src="https://maps.google.com/maps?q=-6.352075,106.9646592&z=17&hl=id&output=embed"
                width="100%"
                height="160"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Gresth Living di Google Maps"
              />
            </div>
            <a
              href="https://maps.app.goo.gl/gXJxD9j364cYA6XG6"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-1.5 text-xs text-gold-DEFAULT/60 hover:text-gold-DEFAULT transition-colors"
              aria-label={lang === 'id' ? "Buka di Google Maps" : "Open in Google Maps"}
            >
              <MapPin size={11} aria-hidden="true" />
              {lang === 'id' ? 'Buka di Google Maps' : 'Open in Google Maps'}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <p className="text-white/30 text-xs">© {year} <span className="text-white/50">Gresth Living</span>. {lang === 'id' ? 'Hak Cipta Dilindungi.' : 'All Rights Reserved.'}</p>
          <p className="text-white/20 text-xs">{lang === 'id' ? 'Desain Interior Klasik Premium — Jabodetabek' : 'Premium Classic Interior Design — Jabodetabek'}</p>
        </div>
      </div>
    </footer>
  );
}
