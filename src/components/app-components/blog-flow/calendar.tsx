import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Plus,
  Calendar as CalendarIcon
} from 'lucide-react';
import { useWebsiteStore } from '@/lib/store';
import axios from 'axios';

interface Blog {
  _id: string;
  title: string;
  status: "draft" | "scheduled" | "published" | "failed";
  scheduledFor: string;
  createdAt: string;
}

const ModernCalendar = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentWebsiteId = useWebsiteStore((state) => state.currentWebsiteId);
  const [isDark] = useState(true);

  const { days, monthName, year } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysArray: (Date | null)[] = Array(firstDay).fill(null);
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(new Date(year, month, i));
    }

    return {
      days: daysArray,
      monthName: currentDate.toLocaleString('default', { month: 'long' }),
      year
    };
  }, [currentDate]);

  useEffect(() => {
    if (!currentWebsiteId) return;

    const fetchBlogs = async () => {
      try {
        const res = await fetch(`/api/blogs?websiteId=${currentWebsiteId}`);
        const data = await res.json();
        setBlogs(data.blogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, [currentWebsiteId]);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  async function geterateBlog(blog: Blog){
    try {
      console.log(blog)
      const res = await axios.post(`/api/blogs/${blog._id}/ai-generated`, blog)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className={`${isDark ? 'bg-[#050505] text-white' : 'bg-[#f8f9fa] text-zinc-900'} min-h-screen p-6 md:p-12`}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-8">
          <div>
            <div className="flex items-center gap-3 text-blue-500 mb-2">
              <CalendarIcon size={20} strokeWidth={2.5} />
              <span className="text-xs font-black uppercase tracking-[0.3em]">
                Editorial Flow
              </span>
            </div>

            <motion.h1
              key={monthName}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl font-black tracking-tighter"
            >
              {monthName.toUpperCase()}{" "}
              <span className="text-zinc-500">
                ’{year.toString().slice(-2)}
              </span>
            </motion.h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800">
              <button
                onClick={() => setCurrentDate(new Date())}
                className="p-2 hover:bg-blue-500/10 rounded-xl text-blue-500"
              >
                Today
              </button>
              <div className="h-4 w-px bg-zinc-700 mx-2" />
              <button
                onClick={() => setCurrentDate(new Date(year, currentDate.getMonth() - 1))}
                className="p-2 hover:bg-blue-500/10 rounded-xl text-blue-500"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="h-4 w-px bg-zinc-700 mx-2" />

              <button
                onClick={() => setCurrentDate(new Date(year, currentDate.getMonth() + 1))}
                className="p-2 hover:bg-blue-500/10 rounded-xl text-blue-500"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-3">
          {weekDays.map(day => (
            <div
              key={day}
              className="pb-4 text-center text-[11px] font-black uppercase tracking-widest opacity-40"
            >
              {day}
            </div>
          ))}

          {days.map((date, idx) => {
            const isToday =
              date &&
              date.toDateString() === new Date().toDateString();

            const blog = date
              ? blogs.find(b => {
                const blogDate = new Date(b.scheduledFor);
                return (
                  blogDate.getFullYear() === date.getFullYear() &&
                  blogDate.getMonth() === date.getMonth() &&
                  blogDate.getDate() === date.getDate()
                );
              })
              : null;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.01 }}
                whileHover={date ? { y: -4 } : {}}
                className={`relative min-h-[220px] p-5 rounded-[2rem]
                  ${!date ? 'opacity-0 bg-gray-800/10' : 'opacity-100 bg-zinc-900/40 border border-zinc-800 hover:bg-zinc-900'}
                  `}
              >
                {date && (
                  <div className="h-full flex flex-col justify-between">

                    <div className="flex justify-between items-start">
                      <span
                        className={`text-xl font-black transition-colors 
                          ${isToday ? 'text-blue-500 scale-110' : 'text-zinc-500'}`}
                      >
                        {date.getDate()}
                      </span>

                      {blog && (
                        <div className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[9px] font-black uppercase">
                          {blog.status}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 grow relative pb-12">
                      <p className="text-sm font-bold leading-tight line-clamp-3 text-zinc-100">
                        {blog?.title}
                      </p>
                      {blog?.status === "published" ? (
                        <>

                          <button className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-blue-500/30 bg-blue-500/5 cursor-pointer text-blue-400 hover:bg-blue-500 hover:text-white text-[10px] font-black uppercase">
                            <Eye size={14} />
                            View Article
                          </button>
                        </>
                      ) : blog?.status === "draft" ? (
                        <>
                        <button onClick={() => geterateBlog(blog)} className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-zinc-800 cursor-pointer text-zinc-500 hover:text-blue-500 text-[10px] font-black uppercase">
                            <Plus size={18} />
                            Pre Generate
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>

                    {blog && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-t-full" />
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModernCalendar;
