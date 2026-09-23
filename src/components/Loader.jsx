import { motion } from 'framer-motion';
// If ak.png is in src/assets or src/, adjust the relative path accordingly:
// e.g. import akLogo from '../assets/ak.png'; 
// Or if it is in the public folder, you can keep src="/ak.png"

const easeEditorial = [0.76, 0, 0.24, 1];

const containerVariants = {
  initial: { opacity: 1 },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.8, ease: easeEditorial },
  },
};

const maskVariant = {
  hidden: { y: '115%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.9, ease: easeEditorial },
  },
};

const lineVariant = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, delay: 0.65, ease: easeEditorial },
  },
};

const wordContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.9,
      staggerChildren: 0.04,
    },
  },
};

const letterVariant = {
  hidden: { opacity: 0, y: 8, filter: 'blur(3px)' },
  visible: {
    opacity: 0.85,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: easeEditorial },
  },
};

export default function Loader() {
  const brandSubtext = 'ASSOCIATES'.split('');

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1d1f21] text-neutral-100 select-none overflow-hidden"
    >
      {/* Subtle radial ambient spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Identity Box */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Animated ak.png Image Container */}
        <div className="overflow-hidden p-2">
          <motion.div
            variants={maskVariant}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center"
          >
            <img
              src="/ak.png"
              alt="AK Logo"
              className="w-44 sm:w-52 md:w-64 h-auto object-contain block"
            />
          </motion.div>
        </div>

        {/* Precision Gradient Horizontal Line */}
        <div className="relative w-48 sm:w-60 md:w-72 h-[1px] my-5 flex items-center justify-center">
          <motion.div
            variants={lineVariant}
            initial="hidden"
            animate="visible"
            className="w-full h-full bg-gradient-to-r from-transparent via-neutral-300/70 to-transparent"
            style={{ transformOrigin: 'center' }}
          />
        </div>

        {/* "A S S O C I A T E S" with Wide Geometric Tracking */}
        <motion.div
          variants={wordContainer}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-[0.8em] sm:gap-[1.1em] text-[10px] sm:text-[12px] uppercase font-light tracking-[0.55em] text-neutral-300/90 pl-[0.55em]"
        >
          {brandSubtext.map((char, index) => (
            <motion.span key={index} variants={letterVariant}>
              {char}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}