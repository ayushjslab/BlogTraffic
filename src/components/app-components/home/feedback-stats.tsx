"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, CheckCircle, TrendingUp, MessageSquare } from 'lucide-react';

const FeedbackStats: React.FC = () => {
  const feedbacks = [
    {
      user: "Alex Rivera",
      role: "SaaS Founder",
      text: "We went from 200 to 45k monthly uniques in 60 days. The AI doesn't just write; it targets.",
      stat: "+2,150%",
      label: "Traffic Lift"
    },
    {
      user: "Sarah Chen",
      role: "SEO Director",
      text: "The cleanest LSI integration I've ever seen. It passes every AI detection and human quality test.",
      stat: "Top 3",
      label: "Avg. Ranking"
    }
  ];

  return (
    <section className="py-32 bg-white dark:bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-24">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-black/40 dark:text-white/30 mb-4">
              <MessageSquare size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Client Intelligence</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-black dark:text-white">
              The Proof is in <br />
              <span className="italic opacity-30 text-outline">The Results.</span>
            </h2>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} className="fill-black dark:fill-white text-black dark:text-white" />
              ))}
            </div>
            <p className="text-sm font-bold uppercase tracking-widest opacity-40">4.9/5 Average Rating</p>
          </div>
        </div>

        {/* Feedback Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {feedbacks.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group relative p-12 rounded-[3rem] bg-neutral-50 dark:bg-neutral-900 border border-black/5 dark:border-white/5 overflow-hidden transition-all duration-500"
            >
              {/* Massive Background Stat */}
              <div className="absolute -right-4 -bottom-4 text-[12rem] font-black tracking-tighter text-black/3 dark:text-white/3 leading-none select-none group-hover:scale-110 transition-transform duration-700">
                {item.stat}
              </div>

              <div className="relative z-10">
                <Quote className="text-black dark:text-white mb-8 opacity-20" size={40} />
                <p className="text-2xl md:text-3xl font-medium tracking-tight text-black dark:text-white mb-12 leading-snug">
                  "{item.text}"
                </p>

                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center font-black text-xs border border-black/5 dark:border-white/5">
                      {item.user[0]}
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-tight text-sm text-black dark:text-white">{item.user}</h4>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40">{item.role}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-black tracking-tighter text-emerald-500">{item.stat}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{item.label}</div>
                  </div>
                </div>
              </div>
              
              {/* "Verified" Watermark */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                 <CheckCircle size={14} className="text-emerald-500" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Verified Growth Data</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick-Stats Row */}
        <div className="mt-20 flex flex-wrap justify-center gap-16 md:gap-32 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
          <div className="text-center">
            <div className="text-4xl font-black tracking-tighter mb-1">98%</div>
            <div className="text-[10px] font-black uppercase tracking-widest">Retention</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black tracking-tighter mb-1">4.2M</div>
            <div className="text-[10px] font-black uppercase tracking-widest">Keywords Tracked</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black tracking-tighter mb-1">Instant</div>
            <div className="text-[10px] font-black uppercase tracking-widest">Deployment</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeedbackStats;