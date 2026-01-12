"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/shared/sidebar';
import WebsiteDropdown from '@/components/shared/website-dropdown'; // Adjust path

const DashboardLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">

      {/* 1. LEFT: Fixed Sidebar */}
      <Sidebar />

      {/* 2. RIGHT: Main Scrollable Area */}
      <div className="flex-1 flex flex-col ml-24 relative">

        {/* TOP FIXED NAVIGATION BAR */}
        <header className="fixed top-0 right-0 left-24 z-40 h-20 px-8 flex items-center justify-between border-b border-white/5 backdrop-blur-md bg-[#050505]/40">

          <WebsiteDropdown />
        </header>

        {/* CONTENT AREA */}
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className=""
        >
          <div className="relative z-10">
            {children}
          </div>
        </motion.main>
      </div>

    </div>
  );
};

export default DashboardLayoutPage;