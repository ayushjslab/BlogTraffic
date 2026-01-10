"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Link as LinkIcon, Activity, Layers } from 'lucide-react';

const ModernInternalLinking: React.FC = () => {
  return (
    <section className="py-32 bg-white dark:bg-black relative overflow-hidden">
      {/* Background Decorative Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-neutral-200/20 dark:bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="px-4 py-1.5 rounded-full border border-black/5 dark:border-white/10 bg-black/2 dark:bg-white/2 text-[10px] font-black uppercase tracking-[0.4em] text-black/40 dark:text-white/40 mb-8"
          >
            Structure Architecture
          </motion.div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-black dark:text-white">
            Unbreakable <br /> 
            <span className="opacity-20 italic">Topic Silos.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          {/* Left: Tactical Stats */}
          <div className="space-y-12 order-2 lg:order-1">
            {[
              { label: "Crawl Depth", value: "0.8s", desc: "Bots find your content faster." },
              { label: "Link Juice", value: "Max", desc: "Automated equity distribution." }
            ].map((stat, i) => (
              <div key={i} className="group cursor-default">
                <div className="text-4xl font-black tracking-tighter text-black dark:text-white mb-2">{stat.value}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-black/30 dark:text-white/30 mb-4">{stat.label}</div>
                <p className="text-sm text-black/50 dark:text-white/40 max-w-[200px]">{stat.desc}</p>
                <div className="mt-6 w-12 h-[2px] bg-black/10 dark:bg-white/10 group-hover:w-full transition-all duration-700" />
              </div>
            ))}
          </div>

          {/* Center: The Neural Mesh (The Sexy Part) */}
          <div className="relative h-[450px] flex items-center justify-center order-1 lg:order-2">
            {/* The Main Pillar */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-20 w-48 h-64 bg-black dark:bg-white rounded-[3rem] p-1 shadow-2xl overflow-hidden"
            >
              <div className="w-full h-full bg-white dark:bg-black rounded-[2.8rem] flex flex-col items-center justify-center p-6 border border-black/5 dark:border-white/10">
                <div className="w-12 h-12 bg-black dark:bg-white rounded-2xl flex items-center justify-center mb-4">
                  <Layers className="text-white dark:text-black" size={24} />
                </div>
                <div className="w-12 h-1 bg-black/10 dark:bg-white/10 rounded-full mb-2" />
                <div className="w-8 h-1 bg-black/5 dark:bg-white/5 rounded-full" />
              </div>
            </motion.div>

            {/* Connecting Web Lines */}
            <svg className="absolute inset-0 w-full h-full z-10 opacity-30">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                  <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.circle 
                cx="50%" cy="50%" r="180" 
                fill="none" stroke="url(#lineGrad)" 
                strokeWidth="0.5" strokeDasharray="10 20"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="text-black dark:text-white"
              />
            </svg>

            {/* Floating Contextual Nodes */}
            {[
              { icon: <Zap size={14}/>, x: -140, y: -120 },
              { icon: <Activity size={14}/>, x: 160, y: 100 },
              { icon: <LinkIcon size={14}/>, x: 120, y: -140 },
            ].map((node, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                animate={{ x: node.x, y: [node.y, node.y - 20, node.y] }}
                transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                className="absolute w-10 h-10 bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-xl flex items-center justify-center shadow-xl text-black dark:text-white"
              >
                {node.icon}
              </motion.div>
            ))}
          </div>

          {/* Right: Technical Explanation */}
          <div className="lg:text-right space-y-12 order-3">
             <div className="space-y-4">
                <h4 className="text-xl font-bold text-black dark:text-white uppercase tracking-tighter italic">Dynamic Anchors</h4>
                <p className="text-sm text-black/50 dark:text-white/40 leading-relaxed">
                  BlogTraffic scans your existing library and injects links into new posts using natural, high-converting anchor text.
                </p>
             </div>
             <div className="space-y-4">
                <h4 className="text-xl font-bold text-black dark:text-white uppercase tracking-tighter italic">Zero Orphan Pages</h4>
                <p className="text-sm text-black/50 dark:text-white/40 leading-relaxed">
                  Every post is part of a cluster. No content is left isolated, ensuring Google indexes 100% of your empire.
                </p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ModernInternalLinking;