"use client";
import { useWebsiteStore } from "@/lib/store";
import { motion } from "framer-motion";
import { ArrowUpRight, MoreHorizontal, Clock, CheckCircle2, CircleDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Blog {
  _id: string;
  title: string;
  status: "draft" | "scheduled" | "published" | "failed";
  updatedAt: string;
}

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [latestUpdate, setLatestUpdate] = useState<string | null>(null);

  const currentWebsiteId = useWebsiteStore((state) => state.currentWebsiteId);

  const router = useRouter()

  useEffect(() => {
    if (!currentWebsiteId) return;

    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/api/blogs?websiteId=${currentWebsiteId}`);
        const data = await response.json();
        setBlogs(data.blogs);
        setLatestUpdate(data.latestUpdate);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [currentWebsiteId]); // refetch when website changes

  // Helper to format ISO date
  const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="w-full mt-10 space-y-8 selection:bg-white selection:text-black">
      {/* HEADER */}
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">
              Archives
            </span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter uppercase italic">
            Recent_Entries
          </h2>
        </div>
        <button className="text-[10px] uppercase tracking-widest font-black border-b-2 border-white pb-1 hover:text-gray-400 hover:border-gray-400 transition-all">
          View All
        </button>
      </div>

      {/* BLOG LIST */}
      <div className="grid grid-cols-1 gap-px bg-white/5 border border-white/5 rounded-[2rem] overflow-hidden">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push(`/blogs/${blog._id}`)}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative cursor-pointer bg-[#050505] hover:bg-white/2 transition-all duration-500 p-6 md:px-10 flex items-center justify-between"
          >
            {/* Left */}
            <div className="flex items-center gap-6 z-10">
              <span className="text-gray-800 font-mono text-sm hidden md:block">
                0{index + 1}
              </span>
              <div className="space-y-1">
                <h3 className="text-lg font-bold tracking-tight group-hover:text-white transition-colors flex items-center gap-2">
                  {blog.title}
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1"
                  />
                </h3>
                <div className="flex items-center gap-4 text-[10px] text-gray-600 uppercase tracking-widest font-medium">
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} /> {formatDate(blog.updatedAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Status & Actions */}
            <div className="flex items-center gap-8 z-10">
              <div
                className={`
                  flex items-center gap-2 px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-[0.2em]
                  ${blog.status === "published"
                    ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-500"
                    : "bg-white/5 border-white/10 text-gray-400"}
                `}
              >
                {blog.status === "published" ? (
                  <CheckCircle2 size={10} />
                ) : (
                  <CircleDashed size={10} className="animate-spin-slow" />
                )}
                {blog.status}
              </div>

              <button className="p-2 rounded-full hover:bg-white/5 text-gray-700 hover:text-white transition-all">
                <MoreHorizontal size={20} />
              </button>
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-linear-to-r from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
