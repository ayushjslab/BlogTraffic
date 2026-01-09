"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe, Check, Plus, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import { useSession } from 'next-auth/react';

interface Website {
  id: string;
  name: string;
  url: string;
}

const WebsiteDropdown = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [selected, setSelected] = useState<Website | null>(null);

  // 1. Fetch websites
  useEffect(() => {
    const fetchAllWebsites = async () => {
      if (!session?.user?.id) return;
      try {
        const response = await axios.get(`/api/website/fetch-all?userId=${session.user.id}`);
        const fetchedWebsites = response.data.websites;
        setWebsites(fetchedWebsites);
        
        // 2. Auto-select the first website if none selected
        if (fetchedWebsites.length > 0 && !selected) {
          setSelected(fetchedWebsites[0]);
        }
      } catch (error) {
        console.error("Error fetching nodes:", error);
      }
    };

    fetchAllWebsites();
  }, [session, selected]); // Added selected check to prevent infinite loop but ensure sync

  return (
    <div className="relative z-100 selection:bg-white selection:text-black">
      {/* TRIGGER BUTTON */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative flex items-center gap-4 bg-white/5 border border-white/10 hover:border-white/20 px-5 py-3 rounded-2xl backdrop-blur-xl transition-all duration-500 shadow-2xl"
      >
        <div className="relative flex items-center justify-center">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <Globe size={16} className="text-black" />
          </div>
          {/* Signal Pulse */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </div>

        <div className="text-left min-w-[100px]">
          <p className="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-bold leading-none mb-1 text-nowrap">Active Node</p>
          <h3 className="text-sm font-black tracking-tight text-white uppercase italic truncate">
            {selected ? selected.name : "No Node Active"}
          </h3>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="ml-2 text-gray-600 group-hover:text-white transition-colors"
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>

      {/* DROPDOWN MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop to close */}
            <div className="fixed inset-0 z-[-1]" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 mt-4 w-72 bg-[#0a0a0a]/95 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] p-2"
            >
              <div className="px-4 py-3 border-b border-white/5 mb-2 flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-black text-nowrap">Switch Connection</span>
                <Activity size={12} className="text-gray-800 animate-pulse" />
              </div>

              <div className="max-h-64 overflow-y-auto custom-scrollbar">
                {websites.length === 0 ? (
                    <p className="text-[10px] text-gray-500 text-center py-4 uppercase tracking-widest">No nodes found</p>
                ) : (
                  websites.map((site) => (
                    <motion.div
                      key={site.id}
                      onClick={() => {
                        setSelected(site);
                        setIsOpen(false);
                      }}
                      className="relative group/item flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors"
                    >
                      <motion.div
                        whileHover={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        className="absolute inset-0 bg-white/5 rounded-xl z-[-1]"
                      />

                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${selected?.id === site.id ? 'bg-white shadow-[0_0_10px_white]' : 'bg-gray-800'}`} />
                        <div>
                          <p className={`text-xs font-bold transition-colors ${selected?.id === site.id ? 'text-white' : 'text-gray-500 group-hover/item:text-gray-200'}`}>
                            {site.name}
                          </p>
                          <p className="text-[9px] text-gray-700 font-mono tracking-tighter">{site.url}</p>
                        </div>
                      </div>

                      {selected?.id === site.id && (
                        <Check size={14} className="text-white" />
                      )}
                    </motion.div>
                  ))
                )}
              </div>

              <div className="mt-2 pt-2 border-t border-white/5">
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/dashboard/add-website');
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all group/add"
                >
                  <div className="w-6 h-6 rounded-md border border-dashed border-gray-700 flex items-center justify-center group-hover/add:border-white/40 group-hover/add:bg-white group-hover/add:text-black transition-all">
                    <Plus size={14} />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Deploy New Site</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WebsiteDropdown;