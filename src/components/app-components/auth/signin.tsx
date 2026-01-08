"use client"
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { signIn, useSession } from "next-auth/react";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ModernSignIn = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Redirect if already logged in
    useEffect(() => {
        if (status === "authenticated") {
            router.push('/dashboard'); // Change this to your desired route
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <motion.div 
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-white font-black tracking-[0.5em] uppercase text-xs"
                >
                    Authenticating...
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full bg-[#0a0a0a] text-white overflow-hidden font-sans">

            {/* Left Section: Cinematic Image */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:block w-1/2 relative overflow-hidden border-r border-white/5"
            >
                <img
                    src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
                    alt="Minimalist Architecture"
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 hover:scale-110 transition-transform duration-5000 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent" />

                <div className="absolute bottom-20 left-20 space-y-4">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: 60 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="h-px bg-white/50" 
                    />
                    <h2 className="text-6xl font-light tracking-tighter leading-[0.9]">
                        WRITE. <br /> CONNECT. <br /> <span className="font-black italic">TRAFFIC.</span>
                    </h2>
                </div>
            </motion.div>

            {/* Right Section: Sign In */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 relative"
            >
                {/* Subtle Grain Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                <div className="w-full max-w-sm space-y-16 relative z-10">

                    {/* Brand Header */}
                    <div className="space-y-3">
                        <motion.h1
                            initial={{ letterSpacing: "0.3em", opacity: 0 }}
                            animate={{ letterSpacing: "0.1em", opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="text-2xl font-black uppercase text-white"
                        >
                            BlogTraffic
                        </motion.h1>
                        <div className="h-px w-12 bg-white/20" />
                        <p className="text-gray-500 text-sm font-medium tracking-tight">
                            The minimalist standard for modern writers.
                        </p>
                    </div>

                    {/* Sign In Area */}
                    <div className="space-y-10">
                        <div className="space-y-2">
                            <h3 className="text-4xl font-bold tracking-tighter">Sign In</h3>
                            <p className="text-gray-500 text-sm">Use your Google account to access the dashboard.</p>
                        </div>

                        <motion.div
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <button
                                onClick={() => signIn("google", {callbackUrl: "/dashboard"})}
                                className="group cursor-pointer relative w-full flex items-center justify-center gap-4 bg-white text-black py-5 px-6 rounded-full font-black text-sm uppercase tracking-widest transition-all hover:bg-gray-100 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
                            >
                                <FcGoogle className="text-2xl" />
                                <span>Continue with Google</span>
                            </button>
                        </motion.div>
                    </div>

                    {/* Bottom Footer */}
                    <div className="pt-20 flex flex-col gap-8 border-t border-white/5">
                        <div className="flex flex-col gap-2">
                            <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-bold">Authorized Access Only</p>
                            <p className="text-[10px] text-gray-700 max-w-xs leading-relaxed">
                                By signing in, you agree to our automated traffic protocols and content distribution terms.
                            </p>
                        </div>
                        
                        <div className="flex gap-8 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                            <a href="#" className="hover:text-white transition-colors underline-offset-4 hover:underline">Support</a>
                            <a href="#" className="hover:text-white transition-colors underline-offset-4 hover:underline">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors underline-offset-4 hover:underline">API</a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ModernSignIn;