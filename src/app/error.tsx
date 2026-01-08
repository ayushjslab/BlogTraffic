"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiRefreshCw, FiAlertCircle, FiTerminal } from 'react-icons/fi';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an analytics provider
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden font-sans">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-[120px] pointer-events-none" />

      {/* Error Content */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl px-6 text-center">
        
        {/* Animated Icon Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10"
        >
          <FiAlertCircle className="text-4xl text-white/40" />
        </motion.div>

        {/* Glitch Typography */}
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, letterSpacing: "1em" }}
            animate={{ opacity: 1, letterSpacing: "0.2em" }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mix-blend-difference"
          >
            FAULT
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-gray-500 text-lg font-light tracking-wide max-w-sm">
              A synchronization error occurred within the <span className="text-white">BlogTraffic</span> core. The current operation was terminated.
            </p>
            
            {/* Error Code Tag */}
            <div className="flex items-center gap-2 px-3 py-1 bg-white/3 border border-white/5 rounded-md">
              <FiTerminal className="text-xs text-gray-600" />
              <span className="text-[10px] font-mono text-gray-500 uppercase">
                ID: {error.digest?.slice(0, 8) || "SYSTEM_RUNTIME_EXCEPTION"}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => reset()}
            className="group flex items-center justify-center gap-3 px-10 py-4 bg-white text-black rounded-full font-black transition-all"
          >
            <FiRefreshCw className="group-hover:rotate-180 transition-transform duration-500" />
            ATTEMPT REPAIR
          </motion.button>

          <button 
            onClick={() => window.location.href = '/'}
            className="px-10 py-4 bg-transparent border border-white/10 hover:border-white/40 rounded-full font-bold text-gray-400 hover:text-white transition-all"
          >
            ABORT MISSION
          </button>
        </motion.div>
      </div>

      {/* Side "System Status" Decorative Text */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-1">
        <div className="w-8 h-px bg-red-500/50" />
        <span className="text-[8px] font-mono tracking-widest text-red-500/50 uppercase">Critical Failure</span>
      </div>

      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[40px_40px]" />
    </div>
  );
}