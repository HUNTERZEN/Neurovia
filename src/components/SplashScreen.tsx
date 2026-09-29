import { motion } from 'framer-motion';

interface SplashScreenProps {
  message?: string;
}

export function SplashScreen({ message = "Loading..." }: SplashScreenProps) {
  return (
    <div className="fixed inset-0 bg-[#080808] z-50 flex items-center justify-center">
      {/* Main content */}
      <div className="relative text-center">
        {/* Brand */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-lg bg-white text-[#080808] flex items-center justify-center font-['Syne'] font-black text-sm">
              N
            </span>
          </div>
          <div className="font-['Syne'] text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Neurovia Nexus
          </div>
          <p className="text-xs uppercase tracking-widest text-[#888888] mt-2 font-mono">Expert Tech Support Platform</p>
        </motion.div>

        {/* Minimal White Spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-6 flex justify-center"
        >
          <div className="relative w-10 h-10">
            {[...Array(12)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute w-0.5 h-2.5 bg-white rounded-full"
                style={{
                  left: '50%',
                  top: '0%',
                  transformOrigin: '50% 20px',
                  transform: `rotate(${index * 30}deg) translateX(-50%)`,
                }}
                animate={{
                  opacity: [0.15, 1, 0.15]
                }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  delay: index * 0.09,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-xs text-[#888888] tracking-wide"
        >
          {message}
        </motion.p>
      </div>
    </div>
  );
}
