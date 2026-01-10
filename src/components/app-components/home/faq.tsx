"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Is the content truly undetectable by AI scanners?",
    answer: "Yes. Our Neural Engine doesn't just predict the next word; it structures arguments, varies sentence length, and injects 'burstiness' like a human expert. It passes Originality.ai and GPTZero with 98%+ human scores."
  },
  {
    question: "How many blogs can I connect to one account?",
    answer: "Our Starter plan supports 3 domains, while the Dominator plan allows for unlimited connections via our API or native WordPress/Webflow integrations."
  },
  {
    question: "Do I need to provide the keywords?",
    answer: "You can, but you don't have to. BlogTraffic's Hunter Engine scans your niche, identifies 'Zero-Volume' goldmines, and creates a 12-month content roadmap automatically."
  },
  {
    question: "Does this work with Shopify or custom sites?",
    answer: "Absolutely. We have a headless API and a custom Webhook system that allows BlogTraffic to push SEO-perfected HTML or JSON to any platform on earth."
  }
];

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-white dark:bg-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/5 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900 mb-6"
          >
            <HelpCircle size={14} className="text-black dark:text-white" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/50 dark:text-white/40">Knowledge Base</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-black dark:text-white">
            Common <br /> <span className="opacity-20 italic text-outline">Queries.</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`border-b border-black/5 dark:border-white/5 transition-all duration-500 ${activeIndex === i ? 'bg-neutral-50 dark:bg-white/2 rounded-3xl px-8' : 'px-0'}`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <span className={`text-xl md:text-2xl font-bold tracking-tight transition-all duration-300 ${activeIndex === i ? 'text-black dark:text-white' : 'text-black/40 dark:text-white/30 group-hover:text-black dark:group-hover:text-white'}`}>
                  {faq.question}
                </span>
                <div className={`p-2 rounded-full transition-all duration-500 ${activeIndex === i ? 'bg-black dark:bg-white text-white dark:text-black rotate-180' : 'bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white'}`}>
                  {activeIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-lg text-black/60 dark:text-white/50 leading-relaxed font-medium max-w-2xl">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Support Callout */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="mt-20 p-8 rounded-[2.5rem] border border-dashed border-black/10 dark:border-white/10 flex flex-col md:row items-center justify-between gap-6 text-center md:text-left"
        >
          <div>
            <h4 className="font-black uppercase tracking-tighter text-black dark:text-white">Still curious?</h4>
            <p className="text-sm text-black/40 dark:text-white/40">Our engineers are standing by 24/7.</p>
          </div>
          <button className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-2xl transition-all">
            Open Support Ticket
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default FAQSection;