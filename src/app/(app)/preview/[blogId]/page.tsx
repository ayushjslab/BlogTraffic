"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Loader2, Calendar, Clock, Tag, ChevronLeft, Share2 } from "lucide-react"
import { format } from "date-fns"
import parse, { DOMNode, Element } from 'html-react-parser'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from "next/link"

interface BlogPost {
    title: string;
    content: string;
    updatedAt: string;
    keywords: string[];
    readTime?: number; // Estimated read time
}

const PreviewPage = () => {
    const { blogId } = useParams()
    const [blog, setBlog] = useState<BlogPost | null>(null)
    const [loading, setLoading] = useState(true)
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    useEffect(() => {
        if (!blogId) return

        const fetchData = async () => {
            try {
                const res = await fetch(`/api/blogs/${blogId}`)
                if (!res.ok) throw new Error("Failed to fetch")
                const data = await res.json()
                // simple read time calc: 200 words per minute
                const words = data.blog.content?.replace(/<[^>]*>?/gm, '').split(/\s+/).length || 0;
                const readTime = Math.ceil(words / 200);
                setBlog({ ...data.blog, readTime })
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [blogId])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#050505]">
                <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-tr from-purple-500 to-blue-500 blur-xl opacity-20 animate-pulse" />
                    <Loader2 className="w-10 h-10 animate-spin text-zinc-900 dark:text-white relative z-10" />
                </div>
                <p className="mt-4 text-sm font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-widest animate-pulse">Loading Experience</p>
            </div>
        )
    }

    if (!blog) return <div className="min-h-screen flex items-center justify-center text-zinc-500 dark:text-zinc-400">Content unavailable</div>

    // Configure sanitization
    const sanitizeContent = (content: string) => {
        return DOMPurify.sanitize(content, {
            ADD_TAGS: ['iframe'],
            ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
        })
    }

    // Custom parsing options
    const options = {
        replace: (domNode: DOMNode) => {
            if (domNode instanceof Element && domNode.name === 'pre') {
                const codeNode = domNode.children[0] as Element;
                if (codeNode && codeNode.name === 'code' && codeNode.children.length > 0) {
                    return (
                        <div className="relative group my-8">
                            <div className="absolute -inset-1 bg-linear-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            <div className="relative rounded-xl bg-[#0d1117] border border-zinc-800 shadow-2xl overflow-hidden">
                                <div className="flex items-center justify-between px-4 py-3 bg-[#0d1117] border-b border-zinc-800">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                                    </div>
                                    <div className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider">Code</div>
                                </div>
                                <pre className="bg-transparent! m-0! p-0!">
                                    <code
                                        className="hljs block p-6 text-sm overflow-x-auto font-mono leading-relaxed text-zinc-300"
                                        dangerouslySetInnerHTML={{
                                            __html: hljs.highlightAuto(
                                                (codeNode.children[0] as any)?.data || ''
                                            ).value
                                        }}
                                    />
                                </pre>
                            </div>
                        </div>
                    );
                }
            }
        }
    };

    const cleanContent = sanitizeContent(blog.content || "");

    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 transition-colors duration-500 selection:bg-purple-500/30">

            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-20" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-20" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            {/* Navigation Element */}
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center pointer-events-none"
            >
                <Link href={`/blogs/${blogId}`} className="pointer-events-auto flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors group backdrop-blur-md bg-white/50 dark:bg-black/50 px-4 py-2 rounded-full border border-zinc-200/50 dark:border-zinc-800/50">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to Editor</span>
                </Link>

                <button className="pointer-events-auto flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors group backdrop-blur-md bg-white/50 dark:bg-black/50 px-3 py-2 rounded-full border border-zinc-200/50 dark:border-zinc-800/50">
                    <Share2 className="w-4 h-4" />
                </button>
            </motion.nav>

            <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-32">

                {/* Hero Section */}
                <motion.header
                    style={{ opacity, scale }}
                    className="mb-20 text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold tracking-wider uppercase mb-6 border border-purple-500/20">
                            Blog Post Preview
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent mb-8 leading-[1.05] bg-clip-text bg-linear-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500">
                            {blog.title || "Untitled Masterpiece"}
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500 dark:text-zinc-400 font-medium"
                    >
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-zinc-400" />
                            <time>{format(new Date(blog.updatedAt), "MMMM d, yyyy")}</time>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-zinc-400" />
                            <span>{blog.readTime} min read</span>
                        </div>
                    </motion.div>

                    {blog.keywords && blog.keywords.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="flex flex-wrap justify-center gap-2 mt-8"
                        >
                            {blog.keywords.map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 text-xs font-semibold border border-zinc-200 dark:border-zinc-800">
                                    #{tag}
                                </span>
                            ))}
                        </motion.div>
                    )}
                </motion.header>

                <hr className="border-0 h-px bg-linear-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent mb-20" />

                {/* Content */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="prose prose-lg md:prose-xl dark:prose-invert max-w-none mx-auto
                    
                    /* Headings */
                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-zinc-900 dark:prose-headings:text-white
                    
                    /* Paragraphs */
                    prose-p:text-zinc-600 dark:prose-p:text-zinc-300 prose-p:leading-relaxed
                    
                    /* Links */
                    prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline prose-a:font-semibold
                    
                    /* Blockquotes */
                    prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-500/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                    
                    /* Images */
                    prose-img:rounded-2xl prose-img:shadow-2xl prose-img:border prose-img:border-zinc-200 dark:prose-img:border-zinc-800/50 prose-img:w-full prose-img:object-cover
                    
                    /* Reset Pre for Custom Component */
                    prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0 prose-pre:border-none prose-pre:shadow-none
                    
                    /* Lists - Force Override */
                    [&_ul]:list-disc! [&_ol]:list-decimal! [&_ul]:pl-6! [&_ol]:pl-6! [&_li]:pl-1! [&_li]:marker:text-zinc-400 dark:[&_li]:marker:text-zinc-500
                    "
                >
                    {parse(cleanContent, options)}
                </motion.article>

                {/* Footer / End Mark */}
                <div className="mt-32 flex justify-center opacity-50">
                    <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700 mx-1" />
                    <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700 mx-1" />
                    <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700 mx-1" />
                </div>
            </main>
        </div>
    )
}

export default PreviewPage
