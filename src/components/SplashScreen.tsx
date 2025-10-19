import { motion } from 'framer-motion';

interface SplashScreenProps {
  message?: string;
}

export function SplashScreen({ message = "Loading..." }: SplashScreenProps) {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      {/* Main content */}
      <div className="relative text-center">
        {/* Logo/Brand */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Neurovia
          </div>
          <p className="text-gray-400 mt-2 text-lg">Expert Tech Support</p>
        </motion.div>

        {/* Apple-Style Professional Spinner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 flex justify-center"
        >
          {/* Apple-style spinner */}
          <div className="relative w-12 h-12">
            {[...Array(12)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute w-1 h-3 bg-gradient-to-t from-purple-500 to-blue-500 rounded-full"
                style={{
                  left: '50%',
                  top: '0%',
                  transformOrigin: '50% 24px',
                  transform: `rotate(${index * 30}deg) translateX(-50%)`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: index * 0.1,
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
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-gray-300 text-lg"
        >
          {message}
        </motion.p>
      </div>
    </div>
  );
}
