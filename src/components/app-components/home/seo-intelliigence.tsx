"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Search, BarChart, Globe, Zap, CheckCircle2 } from 'lucide-react';

const SEOIntelligence: React.FC = () => {
  return (
    <section className="py-32 bg-white dark:bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Left Side: The "Radar" Visualization */}
          <div className="relative order-2 lg:order-1">
            {/* The Radar Circle */}
            <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
              {/* Spinning Rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-black/5 dark:border-white/5 rounded-full" 
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-10 border border-dashed border-black/10 dark:border-white/10 rounded-full" 
              />
              
              {/* Floating Keywords (The "SEO Targets") */}
              {[
                { label: 'High Intent', top: '10%', left: '20%' },
                { label: 'Long Tail', bottom: '15%', right: '10%' },
                { label: 'LSI Keywords', top: '40%', right: '0%' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                  className="absolute px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-2xl z-20"
                  style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
                >
                  {item.label}
                </motion.div>
              ))}

              {/* The "SEO Score" Center Piece */}
              <div className="relative z-10 text-center bg-white dark:bg-black p-10 rounded-[3rem] border border-black/5 dark:border-white/10 shadow-2xl">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mb-2">SEO Score</div>
                <div className="text-8xl font-black tracking-tighter text-black dark:text-white leading-none">99</div>
                <div className="mt-4 flex gap-1 justify-center">
                  {[1,2,3,4,5].map(star => <Zap key={star} size={12} className="fill-black dark:fill-white" />)}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="order-1 lg:order-2 space-y-12">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Algorithm Sync Active
              </motion.div>

              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-black dark:text-white">
                Engineered <br /> for the <br /> 
                <span className="opacity-30">First Page.</span>
              </h2>
            </div>

            <div className="grid gap-8">
              {[
                { title: "Latent Semantic Indexing", desc: "Our AI maps keyword relationships that Google's BERT loves." },
                { title: "Dynamic Internal Linking", desc: "Automated link structures that keep bots crawling your site longer." },
                { title: "Zero-Volume Sniping", desc: "Find low-competition keywords before they go viral." }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className="text-black/20 dark:text-white/20 font-black text-2xl group-hover:text-black dark:group-hover:text-white transition-colors">
                    0{i + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-black dark:text-white mb-2 uppercase tracking-tight">{feature.title}</h4>
                    <p className="text-black/50 dark:text-white/40 text-sm leading-relaxed max-w-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SEOIntelligence;