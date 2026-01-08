"use client"
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UltraSexyLoader = () => {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["INITIALIZING", "OPTIMIZING", "INJECTING", "AMPLIFYING"];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 30);

    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(wordTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-999 bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* Background Noise Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] contrast-150" />

      {/* Central Brand Mark */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-12 left-12 flex items-center gap-2"
      >
        <div className="w-2 h-2 bg-white rounded-full animate-ping" />
        <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/40">
          BlogTraffic / Engine v2.0
        </span>
      </motion.div>

      {/* The Main Content */}
      <div className="relative flex flex-col items-center">
        
        {/* Rapid Word Cycle */}
        <div className="h-6 mb-2 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={wordIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="text-xs uppercase tracking-[0.6em] text-white/50 font-medium"
            >
              {words[wordIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Big Counter */}
        <motion.div 
          className="relative flex items-baseline overflow-hidden"
        >
          <motion.span 
            className="text-[12vw] md:text-[8vw] font-black leading-none tracking-tighter tabular-nums"
          >
            {progress}
          </motion.span>
          <span className="text-3xl font-light text-white/20 ml-2">%</span>
        </motion.div>

        {/* Liquid Progress Bar */}
        <div className="relative mt-8 w-64 md:w-96 h-[2px] bg-white/5 overflow-hidden rounded-full">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          />
        </div>
      </div>

      {/* Vertical Side Decals */}
      <div className="absolute right-12 bottom-12 flex flex-col items-end space-y-4">
         <div className="h-24 w-px bg-linear-to-b from-transparent via-white/20 to-transparent" />
         <p className="[writing-mode:vertical-rl] text-[8px] uppercase tracking-[0.8em] text-white/30 font-light">
           Loading System Architecture
         </p>
      </div>

      {/* Diagonal Screen Swipe (Visual Interest) */}
      <motion.div 
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/2 to-transparent skew-x-12 pointer-events-none"
      />

    </div>
  );
};

export default UltraSexyLoader;