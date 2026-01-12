'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Youtube from '@tiptap/extension-youtube'
import { useEffect, useState } from 'react'
import { Bold, Italic, Strikethrough, Code, List, ListOrdered, Quote, Undo, Redo, Heading1, Heading2, Heading3, Minus, Link2, ImageIcon, X, Video, TerminalSquare, SeparatorHorizontal } from 'lucide-react'
import { motion } from 'framer-motion';
import { HiSparkles } from 'react-icons/hi2';

const TiptapEditor = ({ onChange, initialContent }: { onChange: (html: string) => void, initialContent?: string }) => {
    const [mount, setMount] = useState(false);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: {
                    HTMLAttributes: {
                        class: 'bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm my-4 overflow-x-auto',
                    }
                }
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-500 underline hover:text-blue-600 cursor-pointer',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto',
                },
            }),
            Youtube.configure({
                controls: true,
                nocookie: true,
                HTMLAttributes: {
                    class: 'rounded-lg w-full aspect-video',
                },
            }),
        ],
        content: initialContent || '<p>Start typing something amazing...</p>',
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'tiptap-editor focus:outline-none p-6 min-h-[400px] outline-none',
            },
        },
    })

    useEffect(() => {
        setMount(true)
    }, [])

    const addLink = () => {
        if (linkUrl && editor) {
            editor.chain().focus().setLink({ href: linkUrl }).run()
            setLinkUrl('')
            setShowLinkModal(false)
        }
    }

    const addImage = () => {
        if (imageUrl && editor) {
            editor.chain().focus().setImage({ src: imageUrl }).run()
            setImageUrl('')
            setShowImageModal(false)
        }
    }

    const addVideo = () => {
        if (videoUrl && editor) {
            editor.commands.setYoutubeVideo({
                src: videoUrl,
                width: 640,
                height: 360,
            })
            setVideoUrl('')
            setShowVideoModal(false)
        }
    }

    if (!editor || !mount) return null

    const ToolbarButton = ({ onClick, isActive, children, title }: any) => (
        <button
            onClick={onClick}
            title={title}
            className={`p-2 rounded-lg cursor-pointer transition-all duration-200 ${isActive
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg scale-105'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700 dark:hover:text-white hover:scale-105'
                }`}
        >
            {children}
        </button>
    )

    return (
        <div className="flex flex-col rounded-2xl bg-white dark:bg-black shadow-sm border border-zinc-200 dark:border-zinc-800">
            <style jsx global>{`
                .tiptap-editor {
                    font-family: ui-sans-serif, system-ui, sans-serif;
                }
                
                .tiptap-editor > * + * {
                    margin-top: 0.75em;
                }
                
                /* Headings - Let Prose Handle Colors or inherit */
                .tiptap-editor h1 {
                    font-size: 2.5em;
                    font-weight: 700;
                    line-height: 1.2;
                    margin-top: 1em;
                    margin-bottom: 0.5em;
                }
                
                .tiptap-editor h2 {
                    font-size: 2em;
                    font-weight: 600;
                    line-height: 1.3;
                    margin-top: 0.9em;
                    margin-bottom: 0.4em;
                }
                
                .tiptap-editor h3 {
                    font-size: 1.5em;
                    font-weight: 600;
                    line-height: 1.4;
                    margin-top: 0.8em;
                    margin-bottom: 0.3em;
                }
                
                .tiptap-editor p {
                    font-size: 1em;
                    line-height: 1.7;
                }
                
                .tiptap-editor strong {
                    font-weight: 700;
                }
                
                .tiptap-editor em {
                    font-style: italic;
                }
                
                .tiptap-editor code {
                    background-color: var(--tw-prose-pre-bg);
                    padding: 0.2em 0.4em;
                    border-radius: 0.25em;
                    font-size: 0.9em;
                    font-family: 'Courier New', monospace;
                }
                
                .tiptap-editor pre {
                    background-color: #18181b; 
                    color: #d1d5db;
                    padding: 1em;
                    border-radius: 0.5em;
                    overflow-x: auto;
                    border: 1px solid #3f3f46;
                }
                
                .tiptap-editor pre code {
                    background: none;
                    color: inherit;
                    font-size: 0.9em;
                    padding: 0;
                    border: none;
                }
                
                .tiptap-editor blockquote {
                    border-left: 4px solid currentColor;
                    padding-left: 1.5em;
                    margin-left: 0;
                    font-style: italic;
                    opacity: 0.8;
                }
                
                .tiptap-editor ul,
                .tiptap-editor ol {
                    padding-left: 2em;
                    margin-top: 0.5em;
                    margin-bottom: 0.5em;
                }
                
                .tiptap-editor ul {
                    list-style-type: disc;
                }
                
                .tiptap-editor ol {
                    list-style-type: decimal;
                }
                
                .tiptap-editor li {
                    margin-top: 0.25em;
                    margin-bottom: 0.25em;
                    line-height: 1.7;
                }
                
                .tiptap-editor li > p {
                    margin: 0;
                }
                
                .tiptap-editor hr {
                    border: none;
                    border-top: 2px solid currentColor;
                    opacity: 0.2;
                    margin: 2em 0;
                }
                
                .tiptap-editor a {
                    color: #3b82f6;
                    text-decoration: underline;
                }
                
                .tiptap-editor a:hover {
                    color: #2563eb;
                }
                
                .tiptap-editor s {
                    text-decoration: line-through;
                    opacity: 0.6;
                }
                
                .tiptap-editor img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.5em;
                    margin: 1em 0;
                }
                
                .tiptap-editor iframe {
                    border-radius: 0.5em;
                    margin: 1em 0;
                    width: 100%;
                    aspect-ratio: 16/9;
                }
            `}</style>

            {/* Toolbar */}
            <div className='flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-4 py-2 sticky top-36 z-10 rounded-t-2xl'>
                <div className="flex flex-wrap gap-1 rounded-lg">
                    {/* Text Formatting */}
                    <div className="flex gap-1 items-center">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            isActive={editor.isActive('bold')}
                            title="Bold (Ctrl+B)"
                        >
                            <Bold size={16} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            isActive={editor.isActive('italic')}
                            title="Italic (Ctrl+I)"
                        >
                            <Italic size={16} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            isActive={editor.isActive('strike')}
                            title="Strikethrough"
                        >
                            <Strikethrough size={16} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleCode().run()}
                            isActive={editor.isActive('code')}
                            title="Inline Code"
                        >
                            <Code size={16} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            isActive={editor.isActive('codeBlock')}
                            title="Code Block"
                        >
                            <TerminalSquare size={16} />
                        </ToolbarButton>
                    </div>

                    <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700 mx-2 self-center" />

                    {/* Headings */}
                    <div className="flex gap-1 items-center">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            isActive={editor.isActive('heading', { level: 1 })}
                            title="Heading 1"
                        >
                            <Heading1 size={16} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            isActive={editor.isActive('heading', { level: 2 })}
                            title="Heading 2"
                        >
                            <Heading2 size={16} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            isActive={editor.isActive('heading', { level: 3 })}
                            title="Heading 3"
                        >
                            <Heading3 size={16} />
                        </ToolbarButton>
                    </div>

                    <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700 mx-2 self-center" />

                    {/* Lists and Quotes */}
                    <div className="flex gap-1 items-center">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            isActive={editor.isActive('bulletList')}
                            title="Bullet List"
                        >
                            <List size={16} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            isActive={editor.isActive('orderedList')}
                            title="Numbered List"
                        >
                            <ListOrdered size={16} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            isActive={editor.isActive('blockquote')}
                            title="Quote"
                        >
                            <Quote size={16} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setHorizontalRule().run()}
                            isActive={false}
                            title="Divider Line"
                        >
                            <SeparatorHorizontal size={16} />
                        </ToolbarButton>
                    </div>

                    <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700 mx-2 self-center" />

                    {/* Link and Image */}
                    <div className="flex gap-1 items-center">
                        <ToolbarButton
                            onClick={() => setShowLinkModal(true)}
                            isActive={editor.isActive('link')}
                            title="Add Link"
                        >
                            <Link2 size={16} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => setShowImageModal(true)}
                            isActive={false}
                            title="Add Image"
                        >
                            <ImageIcon size={16} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => setShowVideoModal(true)}
                            isActive={false}
                            title="Add Video"
                        >
                            <Video size={16} />
                        </ToolbarButton>
                    </div>

                    <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-700 mx-2 self-center" />

                    {/* Undo/Redo */}
                    <div className="flex gap-1 items-center">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().undo().run()}
                            isActive={false}
                            title="Undo (Ctrl+Z)"
                        >
                            <Undo size={16} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().redo().run()}
                            isActive={false}
                            title="Redo (Ctrl+Y)"
                        >
                            <Redo size={16} />
                        </ToolbarButton>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-4 py-2 cursor-pointer bg-white dark:bg-black text-black dark:text-white rounded-full font-bold text-sm overflow-hidden transition-all duration-300 shadow-sm border border-zinc-200 dark:border-zinc-800"
                >
                    {/* Animated Background Gradient Layer */}
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -inset-full bg-[conic-gradient(from_0deg,transparent_0%,transparent_40%,#000_50%,transparent_60%,transparent_100%)] dark:bg-[conic-gradient(from_0deg,transparent_0%,transparent_40%,#fff_50%,transparent_60%,transparent_100%)] opacity-5 group-hover:opacity-20 transition-opacity"
                    />

                    {/* Content Wrapper */}
                    <div className="relative flex items-center gap-2">
                        <motion.div
                            animate={{
                                filter: ["drop-shadow(0 0 2px rgba(0,0,0,0.5))", "drop-shadow(0 0 8px rgba(0,0,0,0.5))", "drop-shadow(0 0 2px rgba(0,0,0,0.5))"]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <HiSparkles className="text-lg" />
                        </motion.div>

                        <span className="tracking-tighter uppercase italic text-xs">
                            AI
                        </span>
                    </div>
                </motion.button>
            </div>

            {/* Link Modal */}
            {showLinkModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 w-full max-w-md shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-zinc-900 dark:text-white font-semibold text-lg">Add Link</h3>
                            <button
                                onClick={() => setShowLinkModal(false)}
                                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <input
                            type="url"
                            placeholder="https://example.com"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addLink()}
                            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-3 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/20 mb-4"
                            autoFocus
                        />
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={() => setShowLinkModal(false)}
                                className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-gray-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addLink}
                                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-colors font-medium"
                            >
                                Add Link
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Modal */}
            {showImageModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 w-full max-w-md shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-zinc-900 dark:text-white font-semibold text-lg">Add Image</h3>
                            <button
                                onClick={() => setShowImageModal(false)}
                                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <input
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addImage()}
                            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-3 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/20 mb-4"
                            autoFocus
                        />
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={() => setShowImageModal(false)}
                                className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-gray-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addImage}
                                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-colors font-medium"
                            >
                                Add Image
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Video Modal */}
            {showVideoModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 w-full max-w-md shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-zinc-900 dark:text-white font-semibold text-lg">Add Video</h3>
                            <button
                                onClick={() => setShowVideoModal(false)}
                                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <input
                            type="url"
                            placeholder="https://example.com/video.mp4"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addVideo()}
                            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-3 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/20 mb-4"
                            autoFocus
                        />
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={() => setShowVideoModal(false)}
                                className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-gray-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addVideo}
                                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-colors font-medium"
                            >
                                Add Video
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Editor Content */}
            <div className="relative">
                <EditorContent editor={editor} />
                {/* Subtle gradient overlay at bottom for depth - adapted */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-white/80 dark:from-black/50 to-transparent pointer-events-none rounded-b-2xl" />
            </div>
        </div>
    )
}
export default TiptapEditor;