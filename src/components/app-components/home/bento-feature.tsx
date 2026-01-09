"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, BarChart3, Globe, Command, Fingerprint } from 'lucide-react';

const BentoFeatures: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-20 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-black dark:text-white">
            Engineered for <br /> 
            <span className="opacity-30 italic">Total Dominance</span>
          </h2>
          <p className="max-w-md text-black/50 dark:text-white/40 font-medium">
            We don't just post content. We orchestrate a digital takeover.
          </p>
        </div>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 h-full md:h-[800px]">
          
          {/* Main Feature: AI Writer */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="col-span-1 md:col-span-8 row-span-1 relative overflow-hidden rounded-[2.5rem] bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/5 p-10 flex flex-col justify-between"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 bg-black dark:bg-white rounded-2xl flex items-center justify-center mb-6">
                <PenTool className="text-white dark:text-black" size={24} />
              </div>
              <h3 className="text-3xl font-bold tracking-tight dark:text-white mb-4">Neural Content Engine</h3>
              <p className="max-w-sm text-black/60 dark:text-white/50 leading-relaxed">
                Our LLMs are fine-tuned on top-ranking SEO structures. It's not just writing; it's conversion-optimized architecture.
              </p>
            </div>
            {/* Visual Decoration */}
            <div className="absolute bottom-0 right-0 w-2/3 h-1/2 bg-linear-to-tl from-black/10 dark:from-white/5 to-transparent rounded-tl-[3rem] p-8 flex items-end justify-end">
               <div className="flex gap-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-1 h-12 bg-black/20 dark:bg-white/20 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
               </div>
            </div>
          </motion.div>

          {/* Feature: Analytics */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="col-span-1 md:col-span-4 row-span-1 rounded-[2.5rem] bg-black text-white dark:bg-white dark:text-black p-10 flex flex-col justify-between"
          >
            <BarChart3 size={32} />
            <div>
              <h3 className="text-2xl font-bold mb-2 uppercase tracking-tighter">Real-time <br/> Surge</h3>
              <p className="text-sm opacity-60">Watch your impressions climb with our live ranking tracker.</p>
            </div>
          </motion.div>

          {/* Feature: Keywords */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="col-span-1 md:col-span-4 row-span-1 rounded-[2.5rem] border border-black/10 dark:border-white/10 p-10 flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <Search size={20} className="opacity-40" />
              <span className="text-xs font-black uppercase tracking-widest opacity-40">Keyword Hunter</span>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                <motion.div initial={{ x: '-100%' }} whileInView={{ x: '0%' }} transition={{ duration: 2 }} className="h-full w-[85%] bg-black dark:bg-white" />
              </div>
              <div className="h-2 w-3/4 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                <motion.div initial={{ x: '-100%' }} whileInView={{ x: '0%' }} transition={{ duration: 2, delay: 0.2 }} className="h-full w-[60%] bg-black dark:bg-white" />
              </div>
            </div>
            <h3 className="mt-auto text-xl font-bold dark:text-white leading-tight">Zero-Volume <br/> Goldmines</h3>
          </motion.div>

          {/* Feature: Automation */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="col-span-1 md:col-span-8 row-span-1 relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-neutral-50 to-neutral-200 dark:from-neutral-900 dark:to-black border border-black/5 dark:border-white/5 p-10"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-3xl font-bold tracking-tight dark:text-white mb-2">Ghost Mode</h3>
                <p className="max-w-xs text-black/60 dark:text-white/50 text-sm">
                  Schedule, automate, and relax. BlogTraffic handles everything from research to the "Publish" button.
                </p>
              </div>
              <Command className="opacity-20" size={80} />
            </div>
            {/* Minimalist Floating Card UI */}
            <div className="mt-8 flex gap-4 overflow-hidden">
              <div className="min-w-[200px] h-32 bg-white dark:bg-black/50 rounded-2xl border border-black/5 dark:border-white/10 shadow-xl p-4 flex flex-col justify-between">
                <div className="w-1/2 h-2 bg-black/10 dark:bg-white/10 rounded" />
                <div className="w-full h-8 bg-black/5 dark:bg-white/5 rounded-lg" />
              </div>
              <div className="min-w-[200px] h-32 bg-white dark:bg-black/50 rounded-2xl border border-black/5 dark:border-white/10 shadow-xl p-4 flex flex-col justify-between opacity-50">
                <div className="w-1/2 h-2 bg-black/10 dark:bg-white/10 rounded" />
                <div className="w-full h-8 bg-black/5 dark:bg-white/5 rounded-lg" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BentoFeatures;