"use client"

import React from 'react';
import { motion } from 'framer-motion';

const VelocitySection: React.FC = () => {
  return (
    <section className="relative py-24 bg-black text-white overflow-hidden">
      {/* Background Decorative Text - The "Moving Wall" */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex flex-col justify-center">
        <div className="whitespace-nowrap text-[20vh] font-black uppercase tracking-tighter leading-none flex gap-20 animate-marquee">
          <span>SEO OPTIMIZED • AUTOMATED GROWTH • NO LIMITS • </span>
          <span>SEO OPTIMIZED • AUTOMATED GROWTH • NO LIMITS • </span>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: The "Hype" Content */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block px-4 py-1 rounded-full border border-white/20 bg-white/5 text-[10px] font-black uppercase tracking-[0.3em]"
            >
              Performance Metrics
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight uppercase leading-[0.9]">
              Faster than <br />
              <span className="italic text-transparent bg-clip-text bg-linear-to-r from-white via-white/50 to-white/10">
                Manual Humanly
              </span> <br />
              Possible.
            </h2>
            <p className="max-w-md text-white/50 text-lg font-light leading-relaxed">
              We've clocked our AI generating 12 months of SEO-perfect content in under 4 minutes. Your competitors aren't just losing; they're standing still.
            </p>
          </div>

          {/* Right Side: The Sexy Stat Cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Avg. Growth', value: '420%', sub: 'Within 3 months' },
              { label: 'Efficiency', value: '24/7', sub: 'Non-stop posting' },
              { label: 'Trust Score', value: '99.9', sub: 'SEO Accuracy' },
              { label: 'Manual Effort', value: '0.0', sub: 'Just click start' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                className="p-8 rounded-[2rem] border border-white/10 bg-white/2 backdrop-blur-sm flex flex-col justify-between aspect-square group"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                  {stat.label}
                </span>
                <div>
                  <div className="text-4xl md:text-5xl font-black tracking-tighter mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-medium text-white/30 uppercase tracking-tight">
                    {stat.sub}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default VelocitySection;