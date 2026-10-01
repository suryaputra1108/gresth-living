import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar   from './components/Navbar';
import Footer   from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage       from './pages/HomePage';
import LayananPage    from './pages/LayananPage';
import PortfolioPage  from './pages/PortfolioPage';
import TentangPage    from './pages/TentangPage';
import KonsultasiPage from './pages/KonsultasiPage';

/* Scroll to top on route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

/* Page transition wrapper */
const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25,0.46,0.45,0.94] } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.25, ease: 'easeIn' } },
};

function AnimatedPage({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.div>
  );
}

/* Page-level SEO meta per route */
const PAGE_META = {
  '/':           { title: 'Gresth Living | Jasa Interior Klasik & Kontraktor Jabodetabek',              desc: 'Wujudkan hunian elegan dengan jasa desain interior klasik dan kontraktor fit-out premium di Jabodetabek. Konsultasi dan custom furniture. Hubungi kami!' },
  '/layanan':    { title: 'Layanan Interior Klasik & Fit-Out | Gresth Living Jabodetabek',              desc: 'Layanan lengkap desain interior klasik, kontraktor fit-out, dan custom furniture premium. Tim profesional berpengalaman di Jabodetabek.' },
  '/portofolio': { title: 'Portofolio Proyek Interior Klasik | Gresth Living',                          desc: 'Lihat hasil karya interior klasik mewah Gresth Living — ruang tamu, kamar tidur, ruang makan, dan lebih dari 150 proyek di Jabodetabek.' },
  '/tentang':    { title: 'Tentang Gresth Living | Tim Desainer & Kontraktor Interior Profesional',     desc: 'Kenali Gresth Living — tim desainer interior dan kontraktor profesional dengan pengalaman 14+ tahun mengerjakan 150+ proyek residensial di Jabodetabek.' },
  '/konsultasi': { title: 'Konsultasi Gratis Desain Interior & Kontraktor | Gresth Living',             desc: 'Mulai proyek interior impian Anda dengan konsultasi gratis bersama tim Gresth Living. Isi formulir dan kami akan menghubungi Anda dalam 2×24 jam.' },
};

function AppInner() {
  const location = useLocation();
  const meta = PAGE_META[location.pathname] ?? PAGE_META['/'];

  return (
    <>
      {/* Global SEO */}
      <Helmet>
        <html lang="id" />
        <title>{meta.title}</title>
        <meta name="description" content={meta.desc} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Gresth Living" />
        <link rel="canonical" href={`https://greszthliving.com${location.pathname}`} />

        {/* Open Graph */}
        <meta property="og:type"        content="website" />
        <meta property="og:site_name"   content="Gresth Living" />
        <meta property="og:title"       content={meta.title} />
        <meta property="og:description" content={meta.desc} />
        <meta property="og:image"       content="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop" />
        <meta property="og:url"         content={`https://greszthliving.com${location.pathname}`} />
        <meta property="og:locale"      content="id_ID" />

        {/* Twitter */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={meta.title} />
        <meta name="twitter:description" content={meta.desc} />
        <meta name="twitter:image"       content="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop" />

        {/* JSON-LD Local Business */}
        <script type="application/ld+json">{JSON.stringify({
          '@context':   'https://schema.org',
          '@type':      'InteriorDesigner',
          name:         'Gresth Living',
          description:  'Spesialis jasa desain interior klasik, kontraktor fit-out, dan custom furniture premium di Jabodetabek.',
          url:          'https://greszthliving.com',
          logo:         'https://greszthliving.com/logo-black.png',
          telephone:    '+62812-3456-7890',
          email:        'hello@greszthliving.com',
          address: {
            '@type':          'PostalAddress',
            streetAddress:    'Jl. Contoh Lokasi No. 1',
            addressLocality:  'Jakarta Selatan',
            addressRegion:    'DKI Jakarta',
            postalCode:       '12345',
            addressCountry:   'ID',
          },
          areaServed: ['Jakarta','Bogor','Depok','Tangerang','Bekasi'],
          priceRange: '$$$',
          sameAs: ['https://instagram.com/greszthliving'],
        })}</script>
      </Helmet>

      <ScrollToTop />

      {/* Skip to content a11y */}
      <a href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50
                   focus:px-4 focus:py-2 focus:bg-gold-DEFAULT focus:text-charcoal
                   focus:font-semibold focus:rounded-xl focus:outline-none">
        Lewati ke konten utama
      </a>

      <Navbar />

      <div id="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"           element={<AnimatedPage><HomePage /></AnimatedPage>} />
            <Route path="/layanan"    element={<AnimatedPage><LayananPage /></AnimatedPage>} />
            <Route path="/portofolio" element={<AnimatedPage><PortfolioPage /></AnimatedPage>} />
            <Route path="/tentang"    element={<AnimatedPage><TentangPage /></AnimatedPage>} />
            <Route path="/konsultasi" element={<AnimatedPage><KonsultasiPage /></AnimatedPage>} />
            {/* 404 fallback */}
            <Route path="*" element={
              <AnimatedPage>
                <div className="min-h-screen flex items-center justify-center bg-cream-DEFAULT pt-24">
                  <div className="text-center">
                    <p className="font-playfair text-7xl font-bold gold-text mb-4">404</p>
                    <h1 className="font-playfair text-2xl text-charcoal mb-4">Halaman Tidak Ditemukan</h1>
                    <a href="/" className="btn-gold inline-flex"><span>Kembali ke Beranda</span></a>
                  </div>
                </div>
              </AnimatedPage>
            } />
          </Routes>
        </AnimatePresence>
      </div>

      <Footer />

      {/* WhatsApp floating button — visible on all pages */}
      <WhatsAppButton />
    </>
  );
}

export default function App() {
  return <AppInner />;
}
