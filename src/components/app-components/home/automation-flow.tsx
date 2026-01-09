"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, PenTool, Share2, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <BrainCircuit size={24} />,
    title: "AI Analysis",
    desc: "Scans search intent and competitor gaps in milliseconds.",
    tag: "Phase 01"
  },
  {
    icon: <PenTool size={24} />,
    title: "Neural Write",
    desc: "Generates high-retention content with perfect SEO density.",
    tag: "Phase 02"
  },
  {
    icon: <Share2 size={24} />,
    title: "Auto-Deploy",
    desc: "Seamlessly injects posts into WordPress, Webflow, or Ghost.",
    tag: "Phase 03"
  },
  {
    icon: <Rocket size={24} />,
    title: "Rank Surge",
    desc: "Submits sitemaps and triggers instant indexing pings.",
    tag: "Phase 04"
  }
];

const AutomationFlow: React.FC = () => {
  return (
    <section className="py-32 bg-black text-white overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-24 text-center">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-6">
            The Workflow
          </h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            From Zero to <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-white/20">Omnipresence.</span>
          </h3>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[45px] left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Icon Circle */}
              <div className="relative z-10 w-24 h-24 mb-8 mx-auto md:mx-0 bg-neutral-900 border border-white/10 rounded-[2rem] flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-2xl">
                {step.icon}
                {/* Connector Dot */}
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
              </div>

              <div className="text-center md:text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2 block">
                  {step.tag}
                </span>
                <h4 className="text-xl font-bold mb-3 tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                  {step.title}
                </h4>
                <p className="text-sm text-white/50 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>

              {/* Hover Effect Light */}
              <div className="absolute -inset-4 bg-white/5 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 p-8 rounded-[2rem] border border-white/5 bg-white/2 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-sm font-bold uppercase tracking-widest opacity-60">
            Current system velocity: <span className="text-white">4.2 posts / minute</span>
          </p>
          <div className="flex -space-x-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-neutral-800 flex items-center justify-center text-[10px] font-black">
                {i === 4 ? '+2k' : ''}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AutomationFlow;