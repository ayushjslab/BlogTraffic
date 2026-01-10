"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Network, Waypoints, HardDrive } from 'lucide-react';

const InternalLinking: React.FC = () => {
  return (
    <section className="py-32 bg-white dark:bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: The "Spider" Visualization */}
          <div className="relative order-2 lg:order-1 flex justify-center items-center h-[500px]">
            {/* Center Node (The "Money" Page) */}
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative z-20 w-32 h-32 bg-black dark:bg-white rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.2)] dark:shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
              <Network size={48} className="text-white dark:text-black" />
            </motion.div>

            {/* Orbiting Satellite Posts */}
            {[
              { icon: <HardDrive size={20} />, delay: 0, x: -160, y: -100, label: "Tech Guide" },
              { icon: <Share2 size={20} />, delay: 0.5, x: 160, y: -80, label: "Case Study" },
              { icon: <Waypoints size={20} />, delay: 1, x: 0, y: 180, label: "LSI Pillar" },
            ].map((node, i) => (
              <React.Fragment key={i}>
                {/* Connecting Line Animation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <motion.line 
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.2 }}
                    transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                    x1="50%" y1="50%" 
                    x2={`calc(50% + ${node.x}px)`} y2={`calc(50% + ${node.y}px)`} 
                    stroke="currentColor" strokeWidth="2"
                    className="text-black dark:text-white"
                  />
                </svg>

                {/* Satellite Node */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.2 }}
                  className="absolute bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/10 p-4 rounded-2xl flex items-center gap-3 shadow-sm group hover:border-black dark:hover:border-white transition-colors"
                  style={{ transform: `translate(${node.x}px, ${node.y}px)` }}
                >
                  <div className="text-black dark:text-white opacity-40 group-hover:opacity-100 transition-opacity">
                    {node.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-black/50 dark:text-white/40 group-hover:text-black dark:group-hover:text-white">
                    {node.label}
                  </span>
                </motion.div>
              </React.Fragment>
            ))}
          </div>

          {/* Right Side: Copy */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-black/30 dark:text-white/30">
                Architectural SEO
              </h2>
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-black dark:text-white">
                Cluster <br /> <span className="text-outline italic opacity-20">Authority.</span>
              </h3>
              <p className="text-lg text-black/50 dark:text-white/40 font-medium leading-relaxed max-w-lg">
                Google doesn't rank pages; it ranks **entities**. Our AI automatically creates a semantic web between your posts, passing "Link Juice" to your most important converters without you lifting a finger.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Silo Structure", desc: "Prevents keyword cannibalization." },
                { title: "Contextual Anchors", desc: "Dynamic alt-text and link placement." }
              ].map((feature, i) => (
                <div key={i} className="p-6 border-l-2 border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white transition-colors">
                  <h4 className="text-xs font-black uppercase tracking-widest text-black dark:text-white mb-2">{feature.title}</h4>
                  <p className="text-xs text-black/40 dark:text-white/40 font-medium">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      <style jsx>{`
        .text-outline {
          -webkit-text-stroke: 1px black;
        }
        @media (prefers-color-scheme: dark) {
          .text-outline { -webkit-text-stroke: 1px white; }
        }
      `}</style>
    </section>
  );
};

export default InternalLinking;