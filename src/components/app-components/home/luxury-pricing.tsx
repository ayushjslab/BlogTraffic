"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Zap, Crown } from 'lucide-react';

const LuxuryPricing: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      price: '49',
      features: ['10 AI Articles/mo', 'Basic SEO Keywords', 'Auto-Publishing', 'Email Support'],
      icon: <Zap size={20} />,
      accent: 'border-white/10'
    },
    {
      name: 'Dominator',
      price: '149',
      features: ['Unlimited AI Articles', 'Neural Keyword Research', 'Competitor Spying', 'Priority Rendering', 'Ghost Mode'],
      icon: <Crown size={20} />,
      accent: 'border-black dark:border-white shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(255,255,255,0.1)]',
      popular: true
    }
  ];

  return (
    <section className="py-32 bg-white dark:bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Area */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-6xl md:text-8xl font-black tracking-[ -0.05em] uppercase text-black dark:text-white leading-[0.85]">
              Pick Your <br /> <span className="opacity-20 italic">Weapon.</span>
            </h2>
          </div>
          <p className="text-black/50 dark:text-white/40 font-medium text-right max-w-[240px]">
            No hidden fees. Just pure, unadulterated traffic. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className={`relative group p-12 rounded-[3rem] border ${plan.accent} bg-neutral-50 dark:bg-neutral-900/50 flex flex-col justify-between overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-8 right-8 bg-black dark:bg-white text-white dark:text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Most Lethal
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-black dark:bg-white text-white dark:text-black rounded-2xl">
                    {plan.icon}
                  </div>
                  <span className="text-2xl font-black uppercase tracking-tighter">{plan.name}</span>
                </div>

                <div className="flex items-baseline gap-1 mb-12">
                  <span className="text-6xl font-black tracking-tighter">$</span>
                  <span className="text-9xl font-black tracking-tighter">{plan.price}</span>
                  <span className="text-xl font-bold opacity-30">/mo</span>
                </div>

                <div className="space-y-4 mb-12">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center">
                        <Check size={12} className="text-black dark:text-white" />
                      </div>
                      <span className="text-sm font-medium text-black/60 dark:text-white/60">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className={`w-full py-6 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 ${
                plan.popular 
                ? 'bg-black dark:bg-white text-white dark:text-black hover:scale-[1.02]' 
                : 'bg-transparent border border-black/10 dark:border-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
              }`}>
                Deploy Now
              </button>

              {/* Decorative Subtle Gradient */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-black/5 dark:bg-white/5 blur-[100px] rounded-full group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors" />
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 flex justify-center items-center gap-2 text-black/40 dark:text-white/30">
          <ShieldCheck size={18} />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Secure Checkout • Encrypted by Stripe</span>
        </div>
      </div>
    </section>
  );
};

export default LuxuryPricing;