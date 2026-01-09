"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Globe, Zap } from 'lucide-react';

const StatsConsole: React.FC = () => {
  const stats = [
    {
      label: "Articles Generated",
      value: "1.2M+",
      description: "SEO-perfected content pieces.",
      icon: <Zap className="text-yellow-500" size={20} />,
    },
    {
      label: "Traffic Delivered",
      value: "850M",
      description: "Organic visits to client blogs.",
      icon: <TrendingUp className="text-emerald-500" size={20} />,
    },
    {
      label: "Active Empires",
      value: "12,400",
      description: "Individual blogs on autopilot.",
      icon: <Users className="text-blue-500" size={20} />,
    },
    {
      label: "Global Reach",
      value: "142",
      description: "Countries ranking on Page 1.",
      icon: <Globe className="text-purple-500" size={20} />,
    }
  ];

  return (
    <section className="py-24 bg-neutral-50 dark:bg-[#050505] relative overflow-hidden">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header - "The Pulse" */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-20 border-b border-black/5 dark:border-white/5 pb-12">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-black/40 dark:text-white/30 mb-4">
              Live Network Pulse
            </h2>
            <p className="text-4xl md:text-5xl font-black tracking-tighter text-black dark:text-white">
              The Numbers Behind <br /> The <span className="italic opacity-40">Dominance.</span>
            </p>
          </div>
          <div className="hidden md:block text-right">
            <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm uppercase tracking-widest">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              System Live: 99.9% Uptime
            </div>
          </div>
        </div>

        {/* The Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-black p-10 group hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors"
            >
              <div className="mb-8 p-3 w-fit rounded-xl bg-black/5 dark:bg-white/5 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              
              <div className="space-y-1">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-5xl font-black tracking-tighter text-black dark:text-white block"
                >
                  {stat.value}
                </motion.span>
                <span className="text-[10px] font-black uppercase tracking-widest text-black/30 dark:text-white/30">
                  {stat.label}
                </span>
              </div>

              <p className="mt-6 text-sm font-medium text-black/50 dark:text-white/40 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Performance Footer */}
        <div className="mt-12 flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
           {/* You can put subtle partner logos or tech stack here */}
           <span className="text-xs font-bold uppercase tracking-widest">Powered by GPT-4o</span>
           <span className="text-xs font-bold uppercase tracking-widest">Indexed by Google</span>
           <span className="text-xs font-bold uppercase tracking-widest">Verified by Stripe</span>
        </div>

      </div>
    </section>
  );
};

export default StatsConsole;