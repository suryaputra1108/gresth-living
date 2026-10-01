/**
 * Shared Framer Motion animation variants — slow, luxurious, no bounce.
 */
export const fadeInUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25,0.46,0.45,0.94] } },
};
export const fadeInDown = {
  hidden:  { opacity: 0, y: -28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25,0.46,0.45,0.94] } },
};
export const fadeInLeft = {
  hidden:  { opacity: 0, x: -44 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.85, ease: [0.25,0.46,0.45,0.94] } },
};
export const fadeInRight = {
  hidden:  { opacity: 0, x: 44 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.85, ease: [0.25,0.46,0.45,0.94] } },
};
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: 'easeOut' } },
};
export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
};
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: [0.25,0.46,0.45,0.94] } },
};
