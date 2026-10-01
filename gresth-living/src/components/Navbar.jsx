import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { label: lang === 'id' ? 'Beranda' : 'Home', to: '/' },
    { label: lang === 'id' ? 'Layanan' : 'Services', to: '/layanan' },
    { label: lang === 'id' ? 'Portofolio' : 'Portfolio', to: '/portofolio' },
    { label: lang === 'id' ? 'Tentang' : 'About', to: '/tentang' },
    { label: lang === 'id' ? 'Konsultasi' : 'Consultation', to: '/konsultasi' },
  ];

  useEffect(() => setMenuOpen(false), [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-nav py-3 shadow-nav' : 'bg-transparent py-5'
        }`}
        role="navigation"
        aria-label="Navigasi Utama"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* ── Logo ── */}
          <NavLink 
            to="/" 
            aria-label="Gresth Living — Halaman Utama" 
            className="flex-shrink-0 flex items-center gap-2 md:gap-2.5 group"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <img
              src="/logo-white.png"
              alt="Logo Gresth Living"
              className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 ${scrolled ? 'h-9 md:h-11' : 'h-12 md:h-14'}`}
            />
            <span className={`absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 font-playfair font-bold uppercase tracking-widest silver-text transition-all duration-300 ${scrolled ? 'text-sm md:text-xl' : 'text-base md:text-2xl whitespace-nowrap'}`}>
              Gresth Living
            </span>
          </NavLink>

          {/* ── Desktop Links ── */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative text-xs tracking-[0.12em] uppercase font-medium transition-colors duration-300 group py-1 ${
                      isActive
                        ? 'text-gold-DEFAULT'
                        : 'text-white/70 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive ? (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 right-0 h-px bg-gold-DEFAULT"
                        />
                      ) : (
                        <span
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px group-hover:w-full transition-all duration-300 bg-white/40"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ── CTA & Lang Toggle ── */}
          <div className="hidden md:flex items-center gap-4">
            <NavLink
              to="/konsultasi"
              className="btn-gold text-[10px] py-2.5 px-5"
              aria-label={lang === 'id' ? "Mulai Konsultasi" : "Start Consultation"}
            >
              <span>{lang === 'id' ? 'Mulai Konsultasi' : 'Start Consultation'}</span>
            </NavLink>
            <motion.button
              whileTap={{ scale: 0.8 }}
              animate={{ rotateY: lang === 'id' ? 0 : 360 }}
              transition={{ duration: 0.5, type: 'spring' }}
              onClick={toggleLang}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[18px] bg-white/10 border border-white/15 hover:bg-white/20 hover:border-gold-DEFAULT transition-colors"
              title={lang === 'id' ? 'Switch to English' : 'Ubah ke Bahasa Indonesia'}
            >
              {lang === 'id' ? '🇮🇩' : '🇺🇸'}
            </motion.button>
          </div>

          {/* ── Hamburger ── */}
          <div className="md:hidden flex items-center gap-3">
            <button
              className="p-2 text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
              onClick={() => setMenuOpen(false)}
            />
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 md:hidden w-72 flex flex-col"
              style={{ background: '#141414', borderLeft: '1px solid rgba(201,168,76,0.20)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
                <div className="flex items-center gap-2.5">
                  <img src="/logo-white.png" alt="Gresth Living" className="h-9 w-auto" />
                  <span className="font-playfair text-base font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gold-gradient">
                    Gresth Living
                  </span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Tutup menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        `block py-3 font-playfair text-sm tracking-[0.15em] uppercase border-b transition-colors ${
                          isActive
                            ? 'text-gold-DEFAULT border-gold-DEFAULT/30'
                            : 'text-white/60 border-white/8 hover:text-white hover:border-white/20'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
                
                {/* Language Toggle Below Konsultasi */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.06 + 0.1 }}
                  className="mt-4"
                >
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleLang}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[20px] bg-white/5 border border-white/10 shadow-sm hover:bg-white/10 hover:border-gold-DEFAULT transition-all overflow-hidden"
                    title={lang === 'id' ? 'Switch to English' : 'Ubah ke Bahasa Indonesia'}
                  >
                    {lang === 'id' ? '🇮🇩' : '🇺🇸'}
                  </motion.button>
                </motion.div>
              </nav>

              {/* CTA */}
              <div className="p-8 border-t" style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
                <NavLink to="/konsultasi" className="btn-gold w-full flex justify-center">
                  <span>{lang === 'id' ? 'Mulai Konsultasi' : 'Start Consultation'}</span>
                </NavLink>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
