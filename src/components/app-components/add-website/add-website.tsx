"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Cpu, Link2, TextQuote, Plus, ArrowRight, ShieldCheck, Activity } from 'lucide-react';
import { useSession } from 'next-auth/react';

const AddWebsitePage = () => {
  const [formData, setFormData] = useState({ name: '', url: '', desc: '', endpoint: '' });
  const [isDeploying, setIsDeploying] = useState(false);
  const { data: session } = useSession();
  const [countdown, setCountdown] = useState(30);
  const inputStyle = "w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-500 font-mono text-sm";
  const labelStyle = "text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-2 block ml-1";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);

    try {
      const response = await fetch('/api/website/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, userId: session?.user?.id }),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error('Failed to add website');
      }

      const data = await response.json();
      console.log('Website added successfully:', data);
    } catch (error) {
      console.error('Error adding website:', error);
    } finally {
      setIsDeploying(false);
    }
  };

  useEffect(() => {
    let timer : NodeJS.Timeout;
    if (isDeploying && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (!isDeploying) {
      setCountdown(30); // Reset when not deploying
    }

    return () => clearInterval(timer);
  }, [isDeploying, countdown]);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center p-6 selection:bg-white selection:text-black">

      {/* 1. Cinematic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/2 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-white/1 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.1] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[80px_80px]" />
      </div>

      {/* 2. Main Terminal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-1 bg-white/2 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-3xl shadow-2xl"
      >

        {/* LEFT PANEL: Meta Information (4 cols) */}
        <div className="lg:col-span-4 p-10 bg-white/2 border-r border-white/5 flex flex-col justify-between">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg">
                <Plus size={20} className="text-black stroke-3" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tighter">Register Website</h2>
            </div>

            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-white/3 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-500">
                  <ShieldCheck size={14} />
                  <span className="text-[9px] uppercase font-bold tracking-widest">Protocol Verified</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Every website added to <span className="text-white">BlogTraffic</span> is indexed via high-speed crawlers to maximize SEO distribution.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-600">
                  <span>Connection Strength</span>
                  <span className="text-white">98.2%</span>
                </div>
                <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ duration: 2 }}
                    className="h-full w-full bg-linear-to-r from-transparent via-white/40 to-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-10">
            <Activity size={20} className="text-gray-700 animate-pulse" />
            <span className="text-[8px] uppercase tracking-[0.4em] text-gray-600 font-bold">Waiting for deployment...</span>
          </div>
        </div>

        {/* RIGHT PANEL: The Deployment Form (8 cols) */}
        <div className="lg:col-span-8 p-10 lg:p-16">
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Site Name */}
              <motion.div whileFocus={{ y: -2 }}>
                <label className={labelStyle}><Cpu size={12} className="inline mr-2" /> Website Name</label>
                <input
                  type="text"
                  placeholder="The Tech Catalyst"
                  className={inputStyle}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </motion.div>

              {/* URL */}
              <motion.div whileFocus={{ y: -2 }}>
                <label className={labelStyle}><Globe size={12} className="inline mr-2" /> Primary Domain</label>
                <input
                  type="url"
                  placeholder="https://catalog.io"
                  className={inputStyle}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
              </motion.div>
            </div>

            {/* Description */}
            <motion.div whileFocus={{ y: -2 }}>
              <label className={labelStyle}><TextQuote size={12} className="inline mr-2" /> Manifest / Description</label>
              <textarea
                rows={3}
                placeholder="Briefly define the purpose of this content hub..."
                className={inputStyle + " resize-none"}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              />
            </motion.div>

            {/* API Endpoint */}
            <motion.div whileFocus={{ y: -2 }}>
              <label className={labelStyle}><Link2 size={12} className="inline mr-2" /> Retrieval Endpoint</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="/api/v1/posts"
                  className={inputStyle + " pl-12"}
                  onChange={(e) => setFormData({ ...formData, endpoint: e.target.value })}
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-xs font-mono">/</div >
              </div>
              <p className="mt-3 text-[10px] text-gray-600 italic">This is where our system will fetch your JSON post data.</p>
            </motion.div>

            {/* Action Section */}
            <div className="pt-6 flex items-center justify-between">
              <div className="hidden sm:block">
                <p className="text-[10px] text-gray-600 uppercase tracking-widest">Pre-flight check: <span className="text-emerald-500">Passed</span></p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => handleSubmit(e)}
                className="flex items-center gap-4 bg-white text-black px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
              >
                Deploy Site <ArrowRight size={16} />
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* 3. Real-time Status Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex gap-12 text-[9px] uppercase tracking-[0.3em] font-bold text-gray-700"
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          Gateway: Tokyo_North
        </div>
        <div>Uptime: 99.99%</div>
        <div>Latency: 14ms</div>
      </motion.div>

      {/* Full Screen Deployment Overlay */}
      <AnimatePresence>
        {isDeploying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center space-y-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="relative w-24 h-24 border-2 border-white/10 border-t-white rounded-full flex items-center justify-center"
            >
              {/* Countdown inside the circle */}
              <span className="text-white font-mono text-xl">{countdown}s</span>
            </motion.div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black uppercase tracking-[0.5em]">Deploying Website</h2>
              <p className="text-gray-500 font-mono text-xs animate-pulse">
                {countdown > 0
                  ? `Finalizing build in ${countdown}s...`
                  : "Launch imminent..."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddWebsitePage;