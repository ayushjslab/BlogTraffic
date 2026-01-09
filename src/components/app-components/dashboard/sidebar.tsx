"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
  User,
  CreditCard,
  LogOut,
  Zap,
  FolderPlus,
  FolderCog
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: FolderPlus, label: 'Add Website', href: '/dashboard/add-website' },
  { icon: FolderCog, label: "Website Settings", href: '/dashboard/website-settings' },
  { icon: FileText, label: 'Blogs', href: '/dashboard/blogs' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const {data: session, status} = useSession();

  if(status === "loading") return null;

  if(status === "unauthenticated") return null;

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{ width: isHovered ? 280 : 80 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      className="fixed left-0 top-0 h-screen bg-[#0a0a0a] border-r border-white/5 flex flex-col z-50 overflow-hidden group"
    >

      <div className="h-24 flex items-center px-6 gap-4">
        <motion.div
          className="min-w-[32px] h-8 bg-white flex items-center justify-center rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          <Zap size={18} className="text-black fill-black" />
        </motion.div>
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="font-black text-xl tracking-tighter uppercase whitespace-nowrap bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent"
            >
              BlogTraffic
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="relative h-px w-full px-4">
        <div className="w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* MID: Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-5">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;

          return (
            <Link href={item.href} key={item.label}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-2 mt-1 p-3.5 rounded-xl cursor-pointer transition-all duration-300 group/item ${isActive ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-200 hover:bg-white/3'
                  }`}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 w-[3px] h-6 bg-white rounded-r-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                  />
                )}

                <item.icon
                  size={22}
                  className={`min-w-[22px] transition-colors duration-300 ${isActive ? 'text-white' : 'group-hover/item:text-white'
                    }`}
                />

                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`text-sm font-bold tracking-tight whitespace-nowrap ${isActive ? 'opacity-100' : 'opacity-70 group-hover/item:opacity-100'
                        }`}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 rounded-xl border border-white/0 group-hover/item:border-white/5 transition-all" />
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER: Profile & Billing */}
      <div className="p-4 mt-auto border-t border-white/5 bg-white/1">
        <div className="space-y-2">
          {/* Billing Link (Active State potential) */}
          <Link href="/dashboard/billing">
            <motion.div
              className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-colors group/bill ${pathname === '/dashboard/billing' ? 'bg-white/5 text-white' : 'text-gray-500'
                }`}
            >
              <CreditCard size={22} className="min-w-[22px] group-hover/bill:text-white" />
              {isHovered && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-bold uppercase tracking-[0.2em]">
                  Billing
                </motion.span>
              )}
            </motion.div>
          </Link>

          {/* Profile Pod */}
          <div className={`flex items-center gap-3 p-2 rounded-2xl hover:border-white/10 transition-colors ${isHovered ? 'bg-white/3' : 'bg-transparent'}`}>
            <div className="min-w-[36px] h-9 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center relative overflow-hidden">
            <Avatar>
              <AvatarImage src={session?.user?.image || ""} />
              <AvatarFallback>
                <User size={20} className="text-white/70" />
              </AvatarFallback>
            </Avatar>
              <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent" />
            </div>
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col min-w-0 flex-1"
                >
                  <span className="text-sm font-bold truncate">{session?.user?.name}</span>
                  <span className="text-[9px] text-gray-500 truncate tracking-widest font-black">{session?.user?.email}</span>
                </motion.div>
              )}
            </AnimatePresence>
            {isHovered && (
              <motion.div
                className="ml-auto mr-2 relative group/logout"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* The "Power-Off" Aura - Subtle red glow that appears on hover */}
                <div className="absolute inset-0 bg-red-500/0 group-hover/logout:bg-red-500/20 blur-md rounded-full transition-all duration-500" />

                <LogOut
                  onClick={() => signOut({ callbackUrl: "/sign-in" })}
                  size={18}
                  className="relative z-10 text-gray-600 group-hover/logout:text-red-500 group-hover/logout:rotate-12 transition-all duration-300 cursor-pointer"
                />

                {/* Sexy Tooltip - Only shows when sidebar is expanded or on icon hover */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/logout:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-red-500 text-white text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                    Terminate
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;