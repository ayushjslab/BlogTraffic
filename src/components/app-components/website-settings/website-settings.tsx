"use client";
import { useEffect, useState } from 'react';
import { motion} from 'framer-motion';
import {
  Settings2, Trash2, Save,
  Activity, Fingerprint, AlertTriangle, ShieldAlert
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
import { useWebsiteStore } from '@/lib/store';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UrlPreview } from '@/components/ui/url-preview';

const WebsiteSettingsPage = () => {
  const [formData, setFormData] = useState({
    name: "Aether Design Journal",
    logo: "",
    url: "https://aether.journal",
    description: "A minimalist space for architectural critiques and digital art exploration.",
    blogPostEndPoint: "/api/posts/v1"
  });

  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDelete, setOpenDelete] = useState(false)
  const [confirm, setConfirm] = useState("")

  const { currentWebsiteId } = useWebsiteStore((state) => state)

  async function fetch() {
    try {
      const res = await axios.get(`/api/website/${currentWebsiteId}`)
      if (res.data.website) {
        setFormData(res.data.website)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (currentWebsiteId) {
      fetch();
    }
  }, [currentWebsiteId])

  async function updateWebsite() {
    try {

      setIsSaving(true)
      const res = await axios.patch(`/api/website/${currentWebsiteId}`, formData)
      if (res.data) {
        toast.success("Website update successfully")
        setFormData(res.data)
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to update")
    } finally {
      setIsSaving(false)
    }
  }

  async function deleteWebsite() {
    try {
      setIsDeleting(true)
      const res = await axios.delete(`/api/website/${currentWebsiteId}`)
      if (res.data.success) {
        toast.success("Website deleted successfully")
        router.push("/add-website")
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete")
    } finally {
      setIsDeleting(false)
    }
  }

  const inputClasses = "w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-white/40 focus:bg-white/[0.05] transition-all duration-500 font-medium";

  return (
    <div className="min-h-screen w-full text-white p-4 md:p-12 lg:p-24 selection:bg-white selection:text-black font-sans">

      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-white/2 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-red-500/1 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">


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
                  <span className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-bold">Website Settings</span>
                </div>
                <h1 className="text-5xl font-black tracking-tighter uppercase">Configure <br /> <span className="text-gray-500">Website</span></h1>
              </div>

              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 ml-2 font-bold">Identity Name</label>
                    <input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClasses}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 ml-2 font-bold">Root Domain</label>
                    <input
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 ml-2 font-bold">Manifest / Description</label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className={inputClasses + " resize-none"}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01, boxShadow: "0 0 40px rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => { e.preventDefault(); updateWebsite() }}
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
                  <h3 className="text-lg font-bold text-red-500/90">Decommission Website</h3>
                  <p className="text-xs text-gray-500 max-w-sm">This action is irreversible. All traffic logs, synced posts, and SEO metadata will be purged from the grid.</p>
                </div>

                <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                  <DialogTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setOpenDelete(true)}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-300"
                    >
                      Delete Website
                    </motion.button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#0a0a0a] border-white/10 text-white rounded-[2rem]">
                    <DialogHeader className="space-y-4">
                      <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
                        <AlertTriangle className="text-red-500" />
                      </div>
                      <DialogTitle className="text-2xl font-black uppercase tracking-tighter">Confirm Deletion</DialogTitle>
                      <DialogDescription className="text-gray-500">
                        You are about to delete <span className="text-white font-bold">{formData.name}</span>. This will terminate all active traffic pipelines. Type <span className="text-red-400 italic">{formData.name}</span> to proceed.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="my-6">
                      <input
                        placeholder={`type ${formData.name}`}
                        onChange={(e) => setConfirm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500/50 transition-all font-mono"
                      />
                    </div>
                    <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-8">
                      {/* The Termination Button */}
                      <button
                        onClick={() => deleteWebsite()}
                        disabled={isDeleting || confirm !== formData.name}
                        className="relative flex-1 group overflow-hidden h-14 rounded-2xl bg-red-600 dark:bg-red-500/10 border border-red-600 dark:border-red-500/20 text-white dark:text-red-500 font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-red-700 dark:hover:bg-red-500 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="relative z-10 flex items-center justify-center gap-2">
                          {isDeleting ? (
                            <>
                              <Activity className="animate-pulse" size={16} />
                              <span>Purging Node...</span>
                            </>
                          ) : (
                            <>
                              <Trash2 size={14} className="group-hover:-translate-y-1 transition-transform" />
                              <span>Confirm Termination</span>
                            </>
                          )}
                        </div>

                        {/* Subtle hover glow for Dark Mode */}
                        <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity" />
                      </button>

                      {/* The Abort Button */}
                      <button
                        onClick={() => setOpenDelete(false)}
                        className="flex-1 h-14 rounded-2xl bg-neutral-100 dark:bg-white/3 border border-black/5 dark:border-white/5 text-neutral-500 dark:text-neutral-400 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-neutral-200 dark:hover:bg-white/8 hover:text-black dark:hover:text-white transition-all duration-300"
                      >
                        Abort Mission
                      </button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Visual Website Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 lg:sticky lg:top-24 hidden lg:block"
          >
            <div className="relative overflow-hidden bg-linear-to-br from-white/10 to-transparent border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl shadow-2xl">
              <div className="flex flex-col h-[400px] justify-between">
                <div className="space-y-8">
                  <div className="relative group">
                    {/* 1. The Background Glow - Reactive to hover */}
                    <div className="absolute inset-0 bg-black/20 dark:bg-white/10 blur-2xl rounded-full scale-50 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />

                    {/* 2. The Main Container */}
                    <motion.div
                      initial={{ rotate: -6 }}
                      whileHover={{ rotate: 0, scale: 1.05, y: -5 }}
                      className="relative w-16 h-16 rounded-[1.5rem] bg-white dark:bg-neutral-900 flex items-center justify-center 
               shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.05)]
               border border-black/5 dark:border-white/10 overflow-hidden transition-all duration-500"
                    >
                      {/* 3. Inner Glass Reflection Layer */}
                      <div className="absolute inset-0 bg-linear-to-br from-white/40 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none" />

                      <div className="w-12 h-12 relative z-10">
                        <Avatar className="w-full h-full rounded-xl border border-black/5 dark:border-white/5 shadow-inner">
                          <AvatarImage
                            src={formData?.logo}
                            alt={formData?.name}
                            className="object-cover"
                          />
                          <AvatarFallback className="rounded-xl bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white font-black text-xl tracking-tighter">
                            {formData?.name?.[0]?.toUpperCase() || "N"}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      {/* 4. The "System Status" Corner Dot */}
                      <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] border border-white dark:border-black" />
                    </motion.div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold">Website Identity</p>
                    <h3 className="text-4xl font-black tracking-tighter truncate leading-tight italic">
                      {formData.name || "UNNAMED"}
                    </h3>
                  </div>
                </div>

                <UrlPreview url={formData.url}/>

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