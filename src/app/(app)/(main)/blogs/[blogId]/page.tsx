"use client"

import { IPost } from "@/models/Blog"
import dynamic from "next/dynamic"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { toast } from "sonner"
import { 
  ArrowLeft, 
  Save, 
  Globe, 
  Settings, 
  Loader2, 
  Send, 
  Tag, 
  FileText, 
  Eye,
  X 
} from "lucide-react"
import Link from "next/link"

// Dynamic import with a sleek skeleton loader
const TiptapEditor = dynamic(
  () => import("@/components/app-components/blogs/tiptap-editor"),
  { 
    ssr: false, 
    loading: () => (
      <div className="w-full space-y-4 animate-pulse pt-10">
        <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-3/4" />
        <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-full" />
        <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-5/6" />
      </div>
    ) 
  }
)

export default function BlogEditorPage() {
  const router = useRouter()
  const { blogId } = useParams()
  const titleRef = useRef<HTMLTextAreaElement>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Blog Data State
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [slug, setSlug] = useState("")
  const [seoTitle, setSeoTitle] = useState("")
  const [seoDescription, setSeoDescription] = useState("")
  const [keywords, setKeywords] = useState<string[]>([])
  const [status, setStatus] = useState<IPost["status"]>("draft")
  const [currentKeyword, setCurrentKeyword] = useState("")

  // Auto-resize title textarea
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto"
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`
    }
  }, [title])

  useEffect(() => {
    if (!blogId) return

    const fetchBlog = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/blogs/${blogId}`)
        if (!response.ok) throw new Error("Failed to fetch blog")

        const data = await response.json()
        const blog: IPost = data.blog

        setTitle(blog.title || "")
        setContent(blog.content || "")
        setSlug(blog.slug || "")
        setSeoTitle(blog.seoTitle || "")
        setSeoDescription(blog.seoDescription || "")
        setStatus(blog.status || "draft")
        setKeywords(blog.keywords || [])
      } catch (error) {
        toast.error("Error loading blog post")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlog()
  }, [blogId])

  const handleSave = async (newStatus?: IPost["status"]) => {
    if (!blogId) return
    setIsSaving(true)

    const finalStatus = newStatus || status

    try {
      const payload: Partial<IPost> = {
        title,
        content,
        slug,
        seoTitle,
        seoDescription,
        keywords,
        status: finalStatus,
      }

      const res = await fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Failed to save")
      
      setStatus(finalStatus)
      toast.success(finalStatus === "published" ? "Post Published!" : "Progress Saved")
    } catch (error) {
      toast.error("Failed to save changes")
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddKeyword = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentKeyword.trim()) {
      e.preventDefault()
      if (!keywords.includes(currentKeyword.trim())) {
        setKeywords([...keywords, currentKeyword.trim()])
      }
      setCurrentKeyword("")
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-zinc-300" />
        <p className="text-sm text-zinc-500 font-medium">Initializing editor...</p>
      </div>
    )
  }

  return (
    <div className=" mt-20 bg-white dark:bg-black transition-colors duration-300">
      {/* --- MODERN HEADER --- */}
      <header className="sticky top-20 z-50 bg-white/70 dark:bg-black backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="w-full px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/blogs"
              className="group p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100" />
            </Link>
            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-2 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${status === 'published' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-zinc-400'}`} />
              <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 capitalize">
                {status}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSave("draft")}
              disabled={isSaving}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Draft
            </button>
            <button
              onClick={() => handleSave("published")}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2 text-sm font-bold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-black dark:hover:bg-zinc-200 rounded-full transition-all shadow-lg shadow-zinc-200 dark:shadow-none disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {status === 'published' ? 'Update Post' : 'Publish'}
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* LEFT: Editor */}
        <div className="lg:col-span-8 xl:col-span-9 px-6 lg:px-12 py-10 lg:border-r border-zinc-100 dark:border-zinc-900">
          <div className="max-w-4xl mx-auto">
            <textarea
              ref={titleRef}
              rows={1}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post Title..."
              className="w-full bg-transparent text-4xl lg:text-6xl font-black tracking-tight outline-none placeholder:text-zinc-200 dark:placeholder:text-zinc-800 text-zinc-900 dark:text-white resize-none mb-8"
            />
            
            <div className="min-h-[500px]">
              <TiptapEditor
                initialContent={content}
                onChange={setContent}
              />
            </div>
          </div>
        </div>

        {/* RIGHT: Sidebar */}
        <aside className="lg:col-span-4 xl:col-span-3 p-6 lg:p-8 space-y-8 bg-zinc-50/50 dark:bg-zinc-950/50 h-fit lg:sticky lg:top-16">
          
          <section className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold uppercase text-xs tracking-widest">
              <Settings className="w-4 h-4" />
              Metadata
            </div>

            {/* URL Slug */}
            <div className="group">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mb-1.5 ml-1">Enter Slug</label>
              <div className="flex items-center px-3 py-2.5 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl focus-within:border-zinc-400 dark:focus-within:border-zinc-600 transition-all shadow-sm">
                <Globe className="w-3.5 h-3.5 text-zinc-400 mr-2" />
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="url-slug"
                  className="w-full bg-transparent outline-none text-sm text-zinc-800 dark:text-zinc-200"
                />
              </div>
            </div>

            {/* SEO Title */}
            <div className="group">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mb-1.5 ml-1">SEO Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Meta title for Google"
                className="w-full px-3 py-2.5 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:border-zinc-400 dark:focus:border-zinc-600 text-sm transition-all shadow-sm text-zinc-800 dark:text-zinc-200"
              />
            </div>

            {/* SEO Description */}
            <div className="group">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mb-1.5 ml-1">Meta Description</label>
              <textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="SEO description..."
                rows={4}
                className="w-full px-3 py-2.5 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:border-zinc-400 dark:focus:border-zinc-600 text-sm transition-all shadow-sm resize-none text-zinc-800 dark:text-zinc-200"
              />
            </div>

            {/* Keywords */}
            <div className="group">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mb-1.5 ml-1">Keywords</label>
              <div className="p-3 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {keywords.map((keyword, i) => (
                    <span key={i} className="inline-flex items-center pl-2 pr-1 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[11px] font-bold text-zinc-600 dark:text-zinc-400 transition-all hover:bg-zinc-200">
                      {keyword}
                      <button 
                        onClick={() => setKeywords(keywords.filter(k => k !== keyword))}
                        className="ml-1 p-0.5 rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 border-t border-zinc-100 dark:border-zinc-900 pt-2">
                  <Tag className="w-3.5 h-3.5 text-zinc-400" />
                  <input
                    type="text"
                    value={currentKeyword}
                    onChange={(e) => setCurrentKeyword(e.target.value)}
                    onKeyDown={handleAddKeyword}
                    placeholder="Hit Enter to add..."
                    className="w-full bg-transparent outline-none text-xs text-zinc-800 dark:text-zinc-200"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Quick Stats or Preview Link */}
          <div className="p-4 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-between group cursor-pointer hover:border-zinc-400 transition-colors" onClick={() => router.push(`/preview/${blogId}`)}>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-zinc-400" />
              <span className="text-sm font-medium text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">Preview Post</span>
            </div>
            <Link href={`/blog/${slug}`} target="_blank" className="text-zinc-300 group-hover:text-zinc-900 transition-colors">
               ↗
            </Link>
          </div>
        </aside>
      </main>
    </div>
  )
}