import { motion } from "framer-motion";

const ease = [0.77, 0, 0.175, 1];

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-arcadisOrange"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="relative flex items-center justify-center">

        {/* Architectural Circle */}
        <motion.svg
          className="absolute"
          width="320"
          height="320"
          viewBox="0 0 320 320"
          animate={{
            rotate: [0, 360, 360],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
        >
          <motion.circle
            cx="160"
            cy="160"
            r="146"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeOpacity="0.45"
            strokeDasharray="2 18"
            initial={{ strokeDashoffset: 400 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{
              duration: 3.5,
              ease,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        </motion.svg>

        {/* Identity */}
        <motion.div
          className="text-center text-white"
          initial={{ opacity: 0.85 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.8,
            ease: "easeOut",
          }}
        >
          {/* AK */}
          <div className="flex items-end justify-center leading-none">
            {/* a */}
            <motion.span
              className="text-5xl md:text-6xl font-light opacity-70"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              a
            </motion.span>

            {/* K */}
            <motion.span
              className="text-7xl md:text-8xl font-light tracking-[0.1em] ml-[-4px]"
              initial={{ opacity: 0, scaleY: 0.6 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{
                duration: 1,
                delay: 0.35,
                ease,
              }}
              style={{ transformOrigin: "bottom" }}
            >
              K
            </motion.span>
          </div>

          {/* Underline (appears with K) */}
          <motion.div
            className="mx-auto mt-4 h-[1px] w-24 bg-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.35,
              ease: "easeOut",
            }}
          />

          {/* Associates */}
          <motion.div
            className="mt-4 text-sm tracking-[0.45em] uppercase opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: 1.2,
              ease,
            }}
          >
            Associates
          </motion.div>
        </motion.div>

      </div>
    </motion.div>
  );
}
