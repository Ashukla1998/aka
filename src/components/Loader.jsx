// // import { motion } from "framer-motion";

// // const ease = [0.77, 0, 0.175, 1];

// // export default function Loader() {
// //   return (
// //     <motion.div
// //       className="fixed inset-0 z-[9999] flex items-center justify-center bg-arcadisOrange"
// //       initial={{ opacity: 1 }}
// //       exit={{ opacity: 0 }}
// //       transition={{ duration: 0.6, ease: "easeInOut" }}
// //     >
// //       <div className="relative flex items-center justify-center">

// //         {/* Architectural Circle */}
// //         <motion.svg
// //           className="absolute"
// //           width="320"
// //           height="320"
// //           viewBox="0 0 320 320"
// //           animate={{
// //             rotate: [0, 360, 360],
// //             scale: [1, 1.03, 1],
// //           }}
// //           transition={{
// //             duration: 6,
// //             ease: "easeInOut",
// //             repeat: Infinity,
// //             repeatDelay: 1.5,
// //           }}
// //         >
// //           <motion.circle
// //             cx="160"
// //             cy="160"
// //             r="146"
// //             fill="none"
// //             stroke="white"
// //             strokeWidth="1"
// //             strokeOpacity="0.45"
// //             strokeDasharray="2 18"
// //             initial={{ strokeDashoffset: 400 }}
// //             animate={{ strokeDashoffset: 0 }}
// //             transition={{
// //               duration: 3.5,
// //               ease,
// //               repeat: Infinity,
// //               repeatType: "mirror",
// //             }}
// //           />
// //         </motion.svg>

// //         {/* Identity */}
// //         <motion.div
// //           className="text-center text-white"
// //           initial={{ opacity: 0.85 }}
// //           animate={{ opacity: 1 }}
// //           transition={{
// //             duration: 1.8,
// //             ease: "easeOut",
// //           }}
// //         >
// //           {/* AK */}
// //           <div className="flex items-end justify-center leading-none">
// //             {/* a */}
// //             <motion.span
// //               className="text-5xl md:text-6xl font-light opacity-70"
// //               initial={{ opacity: 0, y: 16 }}
// //               animate={{ opacity: 0.7, y: 0 }}
// //               transition={{ duration: 0.9, ease }}
// //             >
// //               a
// //             </motion.span>

// //             {/* K */}
// //             <motion.span
// //               className="text-7xl md:text-8xl font-light tracking-[0.1em] ml-[-4px]"
// //               initial={{ opacity: 0, scaleY: 0.6 }}
// //               animate={{ opacity: 1, scaleY: 1 }}
// //               transition={{
// //                 duration: 1,
// //                 delay: 0.35,
// //                 ease,
// //               }}
// //               style={{ transformOrigin: "bottom" }}
// //             >
// //               K
// //             </motion.span>
// //           </div>

// //           {/* Underline (appears with K) */}
// //           <motion.div
// //             className="mx-auto mt-4 h-[1px] w-24 bg-white/80"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{
// //               duration: 0.6,
// //               delay: 0.35,
// //               ease: "easeOut",
// //             }}
// //           />

// //           {/* Associates */}
// //           <motion.div
// //             className="mt-4 text-sm tracking-[0.45em] uppercase opacity-80"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{
// //               duration: 0.9,
// //               delay: 1.2,
// //               ease,
// //             }}
// //           >
// //             Associates
// //           </motion.div>
// //         </motion.div>

// //       </div>
// //     </motion.div>
// //   );
// // }
// import { motion } from "framer-motion";

// const ease = [0.77, 0, 0.175, 1];

// export default function Loader() {
//   return (
//     <motion.div
//       className="fixed inset-0 z-[9999] flex items-center justify-center bg-arcadisOrange"
//       initial={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.6, ease: "easeInOut" }}
//     >
//       <div className="relative flex flex-col items-center justify-center text-white bg-neutral-900 rounded-lg px-6 py-4 backdrop-blur-sm">
//         {/* 'a' & 'K' Letters */}
//         <div className="flex items-end justify-center leading-none">
//           {/* 'a' */}
//           <motion.span
//             className="text-6xl md:text-7xl font-light text-neutral-300"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 0.85, y: 0 }}
//             transition={{ duration: 0.8, ease }}
//           >
//             a
//           </motion.span>

//           {/* 'K' */}
//           <motion.span
//             className="text-8xl md:text-9xl font-light tracking-[0.08em] ml-[-4px] text-white"
//             initial={{ opacity: 0, scaleY: 0.7, y: 15 }}
//             animate={{ opacity: 1, scaleY: 1, y: 0 }}
//             transition={{
//               duration: 0.9,
//               delay: 0.25,
//               ease,
//             }}
//             style={{ transformOrigin: "bottom" }}
//           >
//             K
//           </motion.span>
//         </div>

//         {/* Underline expanding outward underneath aK */}
//         <motion.div
//           className="mt-3 h-[1px] w-28 bg-neutral-400/60"
//           initial={{ scaleX: 0, opacity: 0 }}
//           animate={{ scaleX: 1, opacity: 1 }}
//           transition={{
//             duration: 0.7,
//             delay: 0.7,
//             ease,
//           }}
//           style={{ transformOrigin: "center" }}
//         />

//         {/* Associates */}
//         <motion.div
//           className="mt-3.5 text-xs sm:text-sm tracking-[0.55em] uppercase text-neutral-300/80 pl-[0.55em]"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{
//             duration: 0.8,
//             delay: 1.0,
//             ease,
//           }}
//         >
//           Associates
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// }

// 'use client';

// import { motion } from 'framer-motion';

// const easeEditorial = [0.76, 0, 0.24, 1];

// const containerVariants = {
//   initial: { opacity: 1 },
//   exit: {
//     opacity: 0,
//     y: -20,
//     transition: { duration: 0.8, ease: easeEditorial },
//   },
// };

// const maskVariant = {
//   hidden: { y: '110%' },
//   visible: {
//     y: '0%',
//     transition: { duration: 0.9, ease: easeEditorial },
//   },
// };

// const lineVariant = {
//   hidden: { scaleX: 0, opacity: 0 },
//   visible: {
//     scaleX: 1,
//     opacity: 1,
//     transition: { duration: 0.8, delay: 0.65, ease: easeEditorial },
//   },
// };

// const wordContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       delayChildren: 0.95,
//       staggerChildren: 0.045,
//     },
//   },
// };

// const letterVariant = {
//   hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
//   visible: {
//     opacity: 0.75,
//     y: 0,
//     filter: 'blur(0px)',
//     transition: { duration: 0.6, ease: easeEditorial },
//   },
// };

// export default function LuxuryArchitectureLoader() {
//   const brandSubtext = 'ASSOCIATES'.split('');

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="initial"
//       exit="exit"
//       className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#111215] text-neutral-100 select-none overflow-hidden"
//     >
//       {/* Subtle architectural radial lighting */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035)_0%,transparent_70%)] pointer-events-none" />

//       {/* Main Identity Box */}
//       <div className="relative flex flex-col items-center justify-center">
//         {/* Masked "aK" Monogram */}
//         <div className="flex items-end justify-center leading-none overflow-hidden pb-1">
//           {/* Lowercase 'a' */}
//           <div className="overflow-hidden">
//             <motion.span
//               variants={maskVariant}
//               initial="hidden"
//               animate="visible"
//               className="inline-block text-6xl md:text-7xl font-extralight tracking-tight text-neutral-300/80"
//             >
//               a
//             </motion.span>
//           </div>

//           {/* Uppercase 'K' */}
//           <div className="overflow-hidden ml-[-2px]">
//             <motion.span
//               variants={maskVariant}
//               initial="hidden"
//               animate="visible"
//               transition={{ delay: 0.15, duration: 1, ease: easeEditorial }}
//               className="inline-block text-8xl md:text-9xl font-light tracking-[0.06em] text-white"
//             >
//               K
//             </motion.span>
//           </div>
//         </div>

//         {/* Minimal Drafting Underline */}
//         <div className="relative w-36 h-[1px] my-3.5 flex items-center justify-center">
//           <motion.div
//             variants={lineVariant}
//             initial="hidden"
//             animate="visible"
//             className="w-full h-full bg-gradient-to-r from-transparent via-neutral-400 to-transparent"
//             style={{ transformOrigin: 'center' }}
//           />
//         </div>

//         {/* Staggered "A S S O C I A T E S" */}
//         <motion.div
//           variants={wordContainer}
//           initial="hidden"
//           animate="visible"
//           className="flex items-center gap-[0.45em] sm:gap-[0.55em] text-[10px] sm:text-xs uppercase font-light tracking-[0.3em] pl-[0.3em]"
//         >
//           {brandSubtext.map((char, index) => (
//             <motion.span key={index} variants={letterVariant}>
//               {char}
//             </motion.span>
//           ))}
//         </motion.div>
//       </div>

//       {/* Subtle Corner Drafting Tick Marks */}
//       <div className="absolute bottom-8 left-8 text-[10px] tracking-widest text-neutral-600 font-mono uppercase opacity-40">
//         01 / ARCHITECTURE
//       </div>
//       <div className="absolute bottom-8 right-8 text-[10px] tracking-widest text-neutral-600 font-mono opacity-40">
//         EST. STUDIO
//       </div>
//     </motion.div>
//   );
// }

'use client';

import { motion } from 'framer-motion';

const ease = [0.77, 0, 0.175, 1];

export default function BrandLoader() {
  const associatesLetters = 'ASSOCIATES'.split('');

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1A1A1A] text-white select-none overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.65, ease: 'easeInOut' }}
    >
      {/* Subtle architectural radial lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_65%)] pointer-events-none" />

      {/* Main Logo Container */}
      <div className="relative flex flex-col items-center justify-center z-10">
        
        {/* Monogram Section: A + K */}
        <div className="flex items-center justify-center gap-2">
          {/* 1. 'A' in #E85C0D */}
          <div className="overflow-hidden">
            <motion.span
              className="inline-block text-7xl md:text-8xl font-light leading-none text-[#E85C0D]"
              initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.85,
                ease,
              }}
            >
              A
            </motion.span>
          </div>

          {/* 2. 'K' with White Background Badge */}
          <motion.div
            className="flex items-center justify-center bg-white text-[#1A1A1A] w-14 h-14 md:w-16 md:h-16 rounded-md shadow-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.45,
              ease,
            }}
          >
            <motion.span
              className="text-4xl md:text-5xl font-semibold leading-none text-[#1A1A1A]"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.65,
                ease,
              }}
            >
              K
            </motion.span>
          </motion.div>
        </div>

        {/* Architectural Divider Line */}
        <motion.div
          className="h-[1px] w-36 bg-gradient-to-r from-transparent via-[#E85C0D]/70 to-transparent my-4"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.95,
            ease,
          }}
          style={{ transformOrigin: 'center' }}
        />

        {/* 3. 'ASSOCIATES' (Staggered or Smooth Slide-Up) */}
        <div className="overflow-hidden">
          <motion.div
            className="flex items-center gap-[0.45em] sm:gap-[0.55em] text-xs sm:text-sm font-light uppercase tracking-[0.45em] text-neutral-300 pl-[0.45em]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.25,
              ease,
            }}
          >
            {associatesLetters.map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Architectural Corner Tag (Optional minimal detail) */}
      <div className="absolute bottom-8 text-[11px] tracking-[0.3em] uppercase text-neutral-500 font-mono">
        Studio &bull; Architecture
      </div>
    </motion.div>
  );
}