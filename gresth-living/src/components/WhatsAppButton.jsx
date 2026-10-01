import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WA_MESSAGE = encodeURIComponent(
  'Halo Gresth Living! Saya tertarik untuk berkonsultasi mengenai desain interior / renovasi. Bisakah kami mendiskusikan lebih lanjut?'
);

const marketingContacts = [
  { name: 'Adelina', role: 'Marketing Executive', phone: '6281234567890' },
  { name: 'Noval Caesar', role: 'Marketing Executive', phone: '6281234567891' },
  { name: 'Arif Widiyanto', role: 'Marketing Executive', phone: '6281234567892' },
];

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [pulsing, setPulsing] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  
  const containerRef = useRef(null);

  // Show button after 1.5s, hide pulse after 6s
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 1500);
    const t2 = setTimeout(() => setPulsing(false), 8000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {visible && (
        <div
          ref={containerRef}
          className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3"
          aria-label="Hubungi via WhatsApp"
        >
          {/* Popup Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="bg-white rounded-2xl rounded-br-[4px] shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-cream-border overflow-hidden mb-1 flex flex-col min-w-[200px]"
              >
                <div className="px-4 py-2.5 bg-[#FAFAF7] border-b border-cream-border">
                   <p className="text-[11px] text-charcoal/70 font-semibold tracking-wide text-center">Pilih Kontak Konsultasi:</p>
                </div>
                <div className="flex flex-col p-1.5">
                  {marketingContacts.map((contact, idx) => (
                    <a
                      key={idx}
                      href={`https://wa.me/${contact.phone}?text=${WA_MESSAGE}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#FAFAF7] transition-all duration-300 group border border-transparent hover:border-cream-border"
                    >
                      <div className="w-8 h-8 rounded-full bg-cream-border flex items-center justify-center shrink-0 shadow-inner group-hover:bg-gold-DEFAULT transition-colors">
                         <span className="font-bold text-xs text-charcoal group-hover:text-white">{contact.name.charAt(0)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-charcoal group-hover:text-gold-DEFAULT transition-colors leading-tight">{contact.name}</span>
                        <span className="text-[9px] text-gray-500 uppercase tracking-wide mt-0.5 leading-tight">{contact.role}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tooltip (Only show if menu is closed) */}
          <AnimatePresence>
            {!isOpen && showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.92 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="relative max-w-[190px] px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white leading-snug shadow-lg"
                style={{ background: 'linear-gradient(135deg,#1a1a1a,#2d2d2d)' }}
                role="tooltip"
                id="wa-tooltip"
              >
                💬 Chat langsung via WhatsApp!
                {/* Tail */}
                <span
                  className="absolute -bottom-1.5 right-10 w-3 h-3 rotate-45"
                  style={{ background: '#2d2d2d' }}
                  aria-hidden="true"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <motion.button
            onClick={() => { setIsOpen(!isOpen); setShowTooltip(false); }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: isOpen ? 0 : [0, -6, 0] }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              scale: { type: 'spring', stiffness: 300, damping: 20, delay: 0.1 },
              opacity: { duration: 0.3 },
              y: isOpen ? { duration: 0.2 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
            className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-400 cursor-pointer border border-white/20 group"
            style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}
            aria-label={isOpen ? "Tutup menu WhatsApp" : "Hubungi Gresth Living via WhatsApp"}
            aria-expanded={isOpen}
          >
            {/* Pulse rings — only while pulsing = true and menu is closed */}
            {pulsing && !isOpen && (
              <>
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'rgba(37,211,102,0.4)' }}
                  animate={{ scale: [1, 1.55], opacity: [0.6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                  aria-hidden="true"
                />
              </>
            )}

            {/* Avatar only */}
            <div className="relative w-11 h-11 z-10">
               <div className="w-full h-full rounded-full overflow-hidden shadow-inner border-2 border-white/90 bg-white group-hover:border-gold-DEFAULT transition-colors duration-300">
                  <img src="/wa-3d.jpg" alt="WhatsApp" className="w-full h-full object-cover scale-[1.15]" />
               </div>
               {/* Online Indicator Dot */}
               <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#4ade80] border-2 border-white rounded-full animate-pulse shadow-sm" />
            </div>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
