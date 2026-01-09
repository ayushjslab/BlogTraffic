"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Target, BarChart3, Fingerprint, Search } from 'lucide-react';

const SEODominance: React.FC = () => {
  return (
    <section className="py-32 bg-white dark:bg-black relative overflow-hidden">
      {/* Background Vertical Text */}
      <div className="absolute left-4 top-0 bottom-0 flex items-center pointer-events-none opacity-[0.03]">
        <span className="rotate-90 text-[10vh] font-black uppercase tracking-[0.5em] whitespace-nowrap text-black dark:text-white">
          ALGORITHM SYNC • ALGORITHM SYNC
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: The "Intelligence" List */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40 dark:text-white/30 mb-6">
                Deep SEO Intelligence
              </h2>
              <h3 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-black dark:text-white">
                Kill the <br /> 
                <span className="italic opacity-30">Guesswork.</span>
              </h3>
            </div>

            <div className="space-y-4">
              {[
                { icon: <Target size={18} />, title: "Intent Mapping", desc: "Our AI distinguishes between 'Buy' and 'Learn' intent to capture the right traffic." },
                { icon: <Fingerprint size={18} />, title: "Semantic Fingerprinting", desc: "Natural Language Processing that mimics expert human authority (E-E-A-T)." },
                { icon: <Search size={18} />, title: "Keyword Difficulty Gap", desc: "Finds the 'Sweet Spot' keywords your competitors overlooked." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 10 }}
                  className="p-6 rounded-2xl border border-black/5 dark:border-white/5 bg-neutral-50 dark:bg-neutral-900/50 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-default group"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <span className="opacity-50 group-hover:opacity-100">{item.icon}</span>
                    <h4 className="font-bold uppercase tracking-tight text-sm">{item.title}</h4>
                  </div>
                  <p className="text-sm opacity-60 leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: The "Live" SEO Analysis Terminal */}
          <div className="lg:col-span-7 h-full">
            <div className="relative p-1 bg-black dark:bg-white rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="bg-white dark:bg-black rounded-[2.3rem] p-8 md:p-12">
                
                {/* Simulated SEO Dashboard UI */}
                <div className="flex items-center justify-between mb-12">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500" />
                  </div>
                  <span className="text-[10px] font-black opacity-30 tracking-widest uppercase italic">Analyzing Market Gaps...</span>
                </div>

                <div className="space-y-8">
                  {/* Visual Progress Bars */}
                  {[
                    { label: "Content Optimization", val: "98%", color: "bg-emerald-500" },
                    { label: "Keyword Density", val: "1.2%", color: "bg-blue-500" },
                    { label: "LSI Saturation", val: "High", color: "bg-purple-500" },
                  ].map((bar, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span>{bar.label}</span>
                        <span className="opacity-40">{bar.val}</span>
                      </div>
                      <div className="h-1.5 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          transition={{ duration: 1.5, delay: i * 0.2 }}
                          className={`h-full ${bar.color}`} 
                        />
                      </div>
                    </div>
                  ))}

                  {/* High SEO Focus Graphic */}
                  <div className="mt-12 p-6 rounded-3xl bg-black dark:bg-white text-white dark:text-black">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2 rounded-lg bg-white/20 dark:bg-black/20">
                        <BarChart3 size={20} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest">Probability of Page 1</span>
                    </div>
                    <div className="text-6xl font-black tracking-tighter">94.2%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SEODominance;