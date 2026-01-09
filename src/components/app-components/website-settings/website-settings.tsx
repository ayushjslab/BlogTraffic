"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Cpu, Settings2, Trash2, Save, ArrowLeft, 
  Activity, Fingerprint, ExternalLink, AlertTriangle, ShieldAlert
} from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const WebsiteSettingsPage = () => {
  const [formData, setFormData] = useState({
    name: "Aether Design Journal",
    url: "https://aether.journal",
    desc: "A minimalist space for architectural critiques and digital art exploration.",
    endpoint: "/api/posts/v1"
  });

  const [isSaving, setIsSaving] = useState(false);

  const inputClasses = "w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-white/40 focus:bg-white/[0.05] transition-all duration-500 font-medium";

  return (
    <div className="min-h-screen w-full bg-[#030303] text-white p-4 md:p-12 lg:p-24 selection:bg-white selection:text-black font-sans">
      
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-white/2 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-red-500/1 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* TOP NAV */}
        <header className="flex justify-between items-center mb-16">
          <motion.button 
            whileHover={{ x: -5 }}
            className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors group"
          >
            <div className="p-2 rounded-full border border-white/5 group-hover:border-white/20">
              <ArrowLeft size={18} />
            </div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Back to Console</span>
          </motion.button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT: Configuration & Danger Zone */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 space-y-20"
          >
            {/* Form Section */}
            <div className="space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Settings2 className="text-gray-500" size={18} />
                  <span className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-bold">Node Settings</span>
                </div>
                <h1 className="text-5xl font-black tracking-tighter uppercase">Configure <br /> <span className="text-gray-500">Node_ID_99</span></h1>
              </div>

              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 ml-2 font-bold">Identity Name</label>
                    <input 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={inputClasses}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 ml-2 font-bold">Root Domain</label>
                    <input 
                      value={formData.url}
                      onChange={(e) => setFormData({...formData, url: e.target.value})}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 ml-2 font-bold">Manifest / Description</label>
                  <textarea 
                    rows={4}
                    value={formData.desc}
                    onChange={(e) => setFormData({...formData, desc: e.target.value})}
                    className={inputClasses + " resize-none"}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01, boxShadow: "0 0 40px rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => { e.preventDefault(); setIsSaving(true); setTimeout(() => setIsSaving(false), 2000); }}
                  className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all"
                >
                  {isSaving ? <Activity className="animate-spin" size={18} /> : <Save size={18} />}
                  {isSaving ? "Syncing..." : "Push Changes"}
                </motion.button>
              </form>
            </div>

            {/* DANGER ZONE */}
            <div className="pt-12 border-t border-white/5 space-y-6">
              <div className="flex items-center gap-3">
                <ShieldAlert className="text-red-500" size={18} />
                <span className="text-[10px] uppercase tracking-[0.5em] text-red-500/80 font-bold">Danger Zone</span>
              </div>
              
              <div className="bg-red-500/2 border border-red-500/10 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center md:text-left">
                  <h3 className="text-lg font-bold text-red-500/90">Decommission Node</h3>
                  <p className="text-xs text-gray-500 max-w-sm">This action is irreversible. All traffic logs, synced posts, and SEO metadata will be purged from the grid.</p>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-300"
                    >
                      Delete Node
                    </motion.button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#0a0a0a] border-white/10 text-white rounded-[2rem]">
                    <DialogHeader className="space-y-4">
                      <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
                        <AlertTriangle className="text-red-500" />
                      </div>
                      <DialogTitle className="text-2xl font-black uppercase tracking-tighter">Confirm Deletion</DialogTitle>
                      <DialogDescription className="text-gray-500">
                        You are about to delete <span className="text-white font-bold">{formData.name}</span>. This will terminate all active traffic pipelines. Type <span className="text-red-400 italic">"confirm"</span> to proceed.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="my-6">
                        <input 
                            placeholder="type 'confirm'"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500/50 transition-all font-mono"
                        />
                    </div>
                    <DialogFooter className="flex gap-3 sm:justify-start">
                      <button className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-all">
                        Terminate Node
                      </button>
                      <button className="flex-1 py-3 rounded-xl bg-white/5 text-gray-400 font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                        Abort
                      </button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Visual Node Card */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 lg:sticky lg:top-24 hidden lg:block"
          >
            <div className="relative overflow-hidden bg-linear-to-br from-white/10 to-transparent border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl shadow-2xl">
              <div className="flex flex-col h-[400px] justify-between">
                <div className="space-y-8">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg transform -rotate-6">
                    <Globe size={28} className="text-black" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold">Node Identity</p>
                    <h3 className="text-4xl font-black tracking-tighter truncate leading-tight italic">
                      {formData.name || "UNNAMED"}
                    </h3>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="h-px w-full bg-white/5" />
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-bold">Status</p>
                      <div className="flex items-center gap-2 text-emerald-500">
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                        <span className="text-[10px] font-black tracking-widest">ACTIVE_LINK</span>
                      </div>
                    </div>
                    <Fingerprint size={40} strokeWidth={1} className="text-white/10" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default WebsiteSettingsPage;