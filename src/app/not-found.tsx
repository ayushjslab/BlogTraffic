"use client"
import { motion } from 'framer-motion';
import { FiArrowLeft, FiHome } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] text-white overflow-hidden font-sans">
      
      {/* Background Giant Text - The "Ghost" 404 */}
      <motion.h1 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute select-none text-[30vw] font-black leading-none pointer-events-none"
      >
        404
      </motion.h1>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        
        {/* Animated Brand Badge */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 px-4 py-1 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.4em] text-gray-400"
        >
          BlogTraffic / Error
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter mb-4">
            LOST IN THE <span className="font-bold italic">VOID.</span>
          </h2>
          <p className="max-w-md mx-auto text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
            The page you are looking for has been moved, deleted, or never existed in this dimension.
          </p>
        </motion.div>

        {/* Navigation Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white rounded-full font-bold transition-colors duration-300"
            onClick={() => window.history.back()}
          >
            <FiArrowLeft /> Go Back
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold transition-all"
            onClick={() => window.location.href = '/'}
          >
            <FiHome /> Return Home
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom Aesthetic Bar */}
      <div className="absolute bottom-12 w-full max-w-7xl px-12 flex justify-between items-end">
        <div className="hidden md:block space-y-2">
          <div className="h-1 w-24 bg-linear-to-r from-white to-transparent" />
          <p className="text-[10px] text-gray-600 uppercase tracking-widest">Protocol: 404_NOT_FOUND</p>
        </div>
        
        <div className="flex gap-4">
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
              className="w-1 h-1 bg-white rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Modern Scanline Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150 brightness-150" />
    </div>
  );
};

export default NotFoundPage;