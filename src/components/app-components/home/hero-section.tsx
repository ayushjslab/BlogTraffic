"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Zap } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-white dark:bg-black">
      
      {/* Background "Aura" - The sexy ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gray-200/50 dark:bg-white/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gray-100/50 dark:bg-white/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Top Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/5 dark:border-white/10 bg-black/2 dark:bg-white/2 mb-8"
          >
            <Sparkles size={14} className="text-black dark:text-white" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/50 dark:text-white/50">
              AI-Powered SEO Autopilot
            </span>
          </motion.div>

          {/* Main Headline - Massive & Brutalist */}
          <motion.h1 
            initial={{ opacity: 0, filter: 'blur(10px)', y: 40 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] md:text-[8vw] leading-[0.85] font-black tracking-[-0.05em] uppercase text-black dark:text-white"
          >
            Blog <br />
            <span className="text-transparent bg-clip-text bg-linear-to-b from-black to-black/40 dark:from-white dark:to-white/20">
              Traffic
            </span>
          </motion.h1>

          {/* Subtext & CTA Grid */}
          <div className="mt-12 flex flex-col md:flex-row items-center gap-12 max-w-5xl w-full">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex-1 text-left"
            >
              <p className="text-xl md:text-2xl font-light leading-relaxed text-black/60 dark:text-white/60">
                Stop manual posting. <strong className="font-bold text-black dark:text-white">Automate</strong> your growth with high-intent keywords and SEO-optimized content that ranks while you sleep.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col gap-4 w-full md:w-auto"
            >
              <button className="group relative bg-black dark:bg-white text-white dark:text-black px-10 py-6 rounded-2xl flex items-center justify-between gap-8 hover:scale-[1.02] active:scale-95 transition-all duration-300">
                <span className="text-xl font-bold italic uppercase tracking-tighter">Start the Engine</span>
                <div className="bg-white/20 dark:bg-black/20 p-2 rounded-lg group-hover:rotate-45 transition-transform duration-500">
                  <ArrowUpRight size={24} />
                </div>
              </button>
              
              <div className="flex items-center gap-4 px-2">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-black bg-gray-200 dark:bg-neutral-800" />
                  ))}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                  Joined by 2k+ Bloggers
                </p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* The "Money Shot" - Dashboard Preview Overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 relative group"
        >
          <div className="absolute -inset-1 bg-linear-to-r from-black/10 to-transparent dark:from-white/10 dark:to-transparent blur-2xl rounded-[3rem] opacity-50 group-hover:opacity-100 transition duration-1000" />
          <div className="relative border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-950 rounded-[2rem] aspect-video overflow-hidden shadow-2xl">
            {/* Minimalist Dashboard UI Placeholder */}
            <div className="absolute top-0 left-0 w-full h-12 border-b border-black/5 dark:border-white/5 flex items-center px-6 gap-2">
              <div className="w-2 h-2 rounded-full bg-black/10 dark:bg-white/10" />
              <div className="w-2 h-2 rounded-full bg-black/10 dark:bg-white/10" />
              <div className="w-2 h-2 rounded-full bg-black/10 dark:bg-white/10" />
            </div>
            <div className="p-12 pt-20 grid grid-cols-3 gap-8">
              <div className="h-32 rounded-2xl bg-black/3 dark:bg-white/3 animate-pulse" />
              <div className="h-32 rounded-2xl bg-black/3 dark:bg-white/3 animate-pulse" />
              <div className="h-32 rounded-2xl bg-black/3 dark:bg-white/3 animate-pulse" />
              <div className="col-span-3 h-64 rounded-2xl bg-black/2 dark:bg-white/2" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;