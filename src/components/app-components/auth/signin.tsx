"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';

const ModernSignIn = () => {
  return (
    <div className="flex min-h-screen w-full bg-[#0a0a0a] text-white overflow-hidden">
      
      {/* Left Section: The Image */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block w-1/2 relative overflow-hidden border-r border-white/10"
      >
        <img 
          src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" 
          alt="Minimalist Architecture"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 hover:scale-105 transition-transform duration-3000"
        />
        <div className="absolute inset-0 bg-linear-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        
        <div className="absolute bottom-12 left-12">
          <h2 className="text-5xl font-light tracking-tighter leading-none">
            WRITE. <br /> CONNECT. <br /> <span className="font-bold">TRAFFIC.</span>
          </h2>
        </div>
      </motion.div>

      {/* Right Section: Sign In */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12"
      >
        <div className="w-full max-w-sm space-y-12">
          
          {/* Brand Header */}
          <div className="space-y-2 text-center lg:text-left">
            <motion.h1 
              initial={{ letterSpacing: "0.2em", opacity: 0 }}
              animate={{ letterSpacing: "0.05em", opacity: 1 }}
              className="text-2xl font-black uppercase tracking-widest text-white"
            >
              BlogTraffic
            </motion.h1>
            <p className="text-gray-500 text-sm font-medium">The minimalist standard for modern writers.</p>
          </div>

          {/* Sign In Area */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-3xl font-semibold tracking-tight">Sign In</h3>
              <p className="text-gray-400 text-sm">Welcome back. Please use your Google account to continue.</p>
            </div>

            <motion.div
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <button 
                className="group cursor-pointer relative w-full flex items-center justify-center gap-4 bg-white text-black py-4 px-6 rounded-full font-bold text-lg transition-all hover:bg-gray-200 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              >
                <FcGoogle className="text-2xl" />
                <span>Continue with Google</span>
              </button>
            </motion.div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-20 flex flex-col items-center lg:items-start gap-6 border-t border-white/5">
            <p className="text-xs text-gray-600 uppercase tracking-[0.3em]">Authorized Access Only</p>
            <div className="flex gap-8 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">API</a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModernSignIn;