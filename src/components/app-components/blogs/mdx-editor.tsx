"use client"
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Bold, Italic, Strikethrough, Code, Image, Heading1, Heading2, Heading3, List, ListOrdered, Quote, Link, Undo, Redo, Download, Table, Minus, CheckSquare, Code2, Maximize, Minimize, Eye, Edit3, Columns, Keyboard, Copy, Check, Upload } from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';
import { MdVideoLibrary } from 'react-icons/md';
import hljs from 'highlight.js';

type ViewMode = 'split' | 'editor' | 'preview';

interface HistoryState {
    past: string[];
    present: string;
    future: string[];
}

export default function MDXEditor() {
    const [history, setHistory] = useState<HistoryState>({
        past: [],
        present: '# Welcome to Advanced MDX Editor\n\nStart writing your **MDX** content here...\n\n## Features\n\n- ✅ Full markdown support\n- ✅ Live preview with syntax highlighting\n- ✅ Code blocks with language detection\n- ✅ Tables and checkboxes\n- ✅ Undo/Redo functionality\n\n```javascript\nconst greeting = "Hello, MDX!";\nconsole.log(greeting);\n```\n\n| Feature | Status |\n|---------|--------|\n| Images | ✅ |\n| Tables | ✅ |\n| Code | ✅ |\n\n- [x] Completed task\n- [ ] Pending task',
        future: []
    });

    const [viewMode, setViewMode] = useState<ViewMode>('split');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showShortcuts, setShowShortcuts] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showImageDialog, setShowImageDialog] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);

    const content = history.present;

    const setContent = useCallback((newContent: string, addToHistory = true) => {
        if (addToHistory && newContent !== history.present) {
            setHistory(prev => ({
                past: [...prev.past.slice(-50), prev.present],
                present: newContent,
                future: []
            }));
        } else if (!addToHistory) {
            setHistory(prev => ({ ...prev, present: newContent }));
        }
    }, [history.present]);

    const undo = useCallback(() => {
        setHistory(prev => {
            if (prev.past.length === 0) return prev;
            const newPast = [...prev.past];
            const previous = newPast.pop()!;
            return {
                past: newPast,
                present: previous,
                future: [prev.present, ...prev.future]
            };
        });
    }, []);

    const redo = useCallback(() => {
        setHistory(prev => {
            if (prev.future.length === 0) return prev;
            const newFuture = [...prev.future];
            const next = newFuture.shift()!;
            return {
                past: [...prev.past, prev.present],
                present: next,
                future: newFuture
            };
        });
    }, []);

    const insertMarkdown = useCallback((before: string, after = '', placeholder = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end) || placeholder;
        const newText = content.substring(0, start) + before + selectedText + after + content.substring(end);
        setContent(newText);
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
        }, 0);
    }, [content, setContent]);

    const insertAtCursor = useCallback((text: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const newText = content.substring(0, start) + text + content.substring(start);
        setContent(newText);
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + text.length, start + text.length);
        }, 0);
    }, [content, setContent]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'b': e.preventDefault(); toolbarActions.bold(); break;
                case 'i': e.preventDefault(); toolbarActions.italic(); break;
                case 'k': e.preventDefault(); e.shiftKey ? toolbarActions.codeBlock() : toolbarActions.link(); break;
                case 'z': e.preventDefault(); undo(); break;
                case 'y': e.preventDefault(); redo(); break;
                case 's': e.preventDefault(); downloadMDX(); break;
            }
            return;
        }
        if (e.key === 'F11') { e.preventDefault(); setIsFullscreen(f => !f); return; }
        if (e.key === 'Tab') {
            e.preventDefault();
            insertAtCursor('  ');
            return;
        }
        if (e.key === 'Enter') {
            const textarea = textareaRef.current;
            if (!textarea) return;
            const start = textarea.selectionStart;
            const textBeforeCursor = content.substring(0, start);
            const lines = textBeforeCursor.split('\n');
            const currentLine = lines[lines.length - 1];
            const ulMatch = currentLine.match(/^(\s*)-\s(\[[ x]\]\s)?/);
            if (ulMatch) {
                e.preventDefault();
                const indent = ulMatch[1];
                const checkbox = ulMatch[2] || '';
                const newText = content.substring(0, start) + '\n' + indent + '- ' + checkbox + content.substring(start);
                setContent(newText);
                setTimeout(() => { textarea.setSelectionRange(start + indent.length + 3 + checkbox.length, start + indent.length + 3 + checkbox.length); }, 0);
                return;
            }
            const olMatch = currentLine.match(/^(\s*)(\d+)\.\s/);
            if (olMatch) {
                e.preventDefault();
                const indent = olMatch[1];
                const nextNumber = parseInt(olMatch[2]) + 1;
                const newText = content.substring(0, start) + '\n' + indent + nextNumber + '. ' + content.substring(start);
                setContent(newText);
                setTimeout(() => { textarea.setSelectionRange(start + indent.length + nextNumber.toString().length + 3, start + indent.length + nextNumber.toString().length + 3); }, 0);
                return;
            }
        }
    };

    const toolbarActions = {
        bold: () => insertMarkdown('**', '**', 'bold text'),
        italic: () => insertMarkdown('*', '*', 'italic text'),
        strikethrough: () => insertMarkdown('~~', '~~', 'strikethrough'),
        code: () => insertMarkdown('`', '`', 'code'),
        codeBlock: () => insertMarkdown('\n```javascript\n', '\n```\n', '// your code here'),
        image: () => setShowImageDialog(true),
        h1: () => insertMarkdown('\n# ', '\n', 'Heading 1'),
        h2: () => insertMarkdown('\n## ', '\n', 'Heading 2'),
        h3: () => insertMarkdown('\n### ', '\n', 'Heading 3'),
        ul: () => insertMarkdown('\n- ', '\n', 'List item'),
        ol: () => insertMarkdown('\n1. ', '\n', 'List item'),
        quote: () => insertMarkdown('\n> ', '\n', 'Quote'),
        link: () => insertMarkdown('[', '](https://)', 'link text'),
        youtube: () => insertAtCursor('\n<iframe\n  width="560"\n  height="315"\n  src="https://www.youtube.com/embed/VIDEO_ID"\n  title="YouTube video player"\n  frameborder="0"\n  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"\n  allowfullscreen>\n</iframe>\n'),
        video: () => insertMarkdown('\n<video src="', '" controls className="w-full rounded-lg">\n  Your browser does not support the video tag.\n</video>\n', 'video-url.mp4'),
        table: () => insertAtCursor('\n| Header 1 | Header 2 | Header 3 |\n|----------|----------|----------|\n| Cell 1   | Cell 2   | Cell 3   |\n| Cell 4   | Cell 5   | Cell 6   |\n'),
        hr: () => insertAtCursor('\n---\n'),
        checkbox: () => insertMarkdown('\n- [ ] ', '\n', 'Task item'),
    };

    const insertImage = () => {
        if (imageUrl) {
            insertAtCursor(`\n![${imageAlt || 'image'}](${imageUrl})\n`);
            setShowImageDialog(false);
            setImageUrl('');
            setImageAlt('');
        }
    };

    const downloadMDX = () => {
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.mdx';
        a.click();
        URL.revokeObjectURL(url);
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const readingTime = Math.ceil(content.split(/\s+/).filter(Boolean).length / 200);

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) setIsFullscreen(false);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    useEffect(() => {
        if (isFullscreen && editorRef.current) {
            editorRef.current.requestFullscreen?.();
        } else if (!isFullscreen && document.fullscreenElement) {
            document.exitFullscreen?.();
        }
    }, [isFullscreen]);

    const shortcuts = [
        { keys: 'Ctrl+B', action: 'Bold' },
        { keys: 'Ctrl+I', action: 'Italic' },
        { keys: 'Ctrl+K', action: 'Link' },
        { keys: 'Ctrl+Shift+K', action: 'Code Block' },
        { keys: 'Ctrl+Z', action: 'Undo' },
        { keys: 'Ctrl+Y', action: 'Redo' },
        { keys: 'Ctrl+S', action: 'Download' },
        { keys: 'F11', action: 'Fullscreen' },
        { keys: 'Tab', action: 'Indent' },
    ];

    return (
        <div ref={editorRef} className={`${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 p-4 md:p-6 transition-colors duration-300`}>
            <div className="max-w-[1800px] mx-auto h-full flex flex-col">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                            Advanced MDX Editor
                        </h1>
                        <p className="text-zinc-500 text-sm mt-1">Pro markdown editing experience</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setShowShortcuts(s => !s)} className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-all" title="Keyboard Shortcuts">
                            <Keyboard size={20} />
                        </button>
                        <button onClick={copyToClipboard} className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-all" title="Copy to Clipboard">
                            {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                        </button>
                        <button onClick={downloadMDX} className="px-4 py-2 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all font-medium flex items-center gap-2 shadow-sm">
                            <Download size={16} />
                            Export
                        </button>
                    </div>
                </div>

                {/* Shortcuts Panel */}
                {showShortcuts && (
                    <div className="mb-4 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-lg">
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-3">Keyboard Shortcuts</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {shortcuts.map(s => (
                                <div key={s.keys} className="flex items-center gap-2">
                                    <kbd className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded text-xs font-mono border border-zinc-200 dark:border-zinc-700">{s.keys}</kbd>
                                    <span className="text-sm text-zinc-600 dark:text-zinc-400">{s.action}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Editor Container */}
                <div className="flex-1 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl flex flex-col">
                    {/* Toolbar */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-2 md:p-3 sticky top-0 z-30 rounded-t-2xl">
                        <div className="flex items-center gap-1 flex-wrap">
                            <ToolButton icon={<Bold size={18} />} onClick={toolbarActions.bold} title="Bold (Ctrl+B)" />
                            <ToolButton icon={<Italic size={18} />} onClick={toolbarActions.italic} title="Italic (Ctrl+I)" />
                            <ToolButton icon={<Strikethrough size={18} />} onClick={toolbarActions.strikethrough} title="Strikethrough" />
                            <Divider />
                            <ToolButton icon={<Heading1 size={18} />} onClick={toolbarActions.h1} title="Heading 1" />
                            <ToolButton icon={<Heading2 size={18} />} onClick={toolbarActions.h2} title="Heading 2" />
                            <ToolButton icon={<Heading3 size={18} />} onClick={toolbarActions.h3} title="Heading 3" />
                            <Divider />
                            <ToolButton icon={<Code size={18} />} onClick={toolbarActions.code} title="Inline Code" />
                            <ToolButton icon={<Code2 size={18} />} onClick={toolbarActions.codeBlock} title="Code Block (Ctrl+Shift+K)" />
                            <Divider />
                            <ToolButton icon={<List size={18} />} onClick={toolbarActions.ul} title="Bullet List" />
                            <ToolButton icon={<ListOrdered size={18} />} onClick={toolbarActions.ol} title="Numbered List" />
                            <ToolButton icon={<CheckSquare size={18} />} onClick={toolbarActions.checkbox} title="Checkbox" />
                            <ToolButton icon={<Quote size={18} />} onClick={toolbarActions.quote} title="Quote" />
                            <Divider />
                            <ToolButton icon={<Link size={18} />} onClick={toolbarActions.link} title="Link (Ctrl+K)" />
                            <ToolButton icon={<Image size={18} />} onClick={toolbarActions.image} title="Image" />
                            <ToolButton icon={<FaYoutube size={18} />} onClick={toolbarActions.youtube} title="YouTube Embed" />
                            <ToolButton icon={<MdVideoLibrary size={18} />} onClick={toolbarActions.video} title="Video File" />
                            <Divider />
                            <ToolButton icon={<Table size={18} />} onClick={toolbarActions.table} title="Table" />
                            <ToolButton icon={<Minus size={18} />} onClick={toolbarActions.hr} title="Horizontal Rule" />
                            <Divider />
                            <ToolButton icon={<Undo size={18} />} onClick={undo} title="Undo (Ctrl+Z)" disabled={history.past.length === 0} />
                            <ToolButton icon={<Redo size={18} />} onClick={redo} title="Redo (Ctrl+Y)" disabled={history.future.length === 0} />
                            <div className="flex-1" />
                            <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                                <button onClick={() => setViewMode('editor')} className={`p-1.5 rounded ${viewMode === 'editor' ? 'bg-white dark:bg-zinc-700 shadow text-zinc-900 dark:text-zinc-50' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`} title="Editor Only">
                                    <Edit3 size={16} />
                                </button>
                                <button onClick={() => setViewMode('split')} className={`p-1.5 rounded ${viewMode === 'split' ? 'bg-white dark:bg-zinc-700 shadow text-zinc-900 dark:text-zinc-50' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`} title="Split View">
                                    <Columns size={16} />
                                </button>
                                <button onClick={() => setViewMode('preview')} className={`p-1.5 rounded ${viewMode === 'preview' ? 'bg-white dark:bg-zinc-700 shadow text-zinc-900 dark:text-zinc-50' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`} title="Preview Only">
                                    <Eye size={16} />
                                </button>
                            </div>
                            <ToolButton icon={isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />} onClick={() => setIsFullscreen(f => !f)} title="Fullscreen (F11)" />
                        </div>
                    </div>

                    {/* Editor Area */}
                    <div className={`flex-1 grid ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} divide-x divide-zinc-200 dark:divide-zinc-800 min-h-0`}>
                        {(viewMode === 'editor' || viewMode === 'split') && (
                            <div className="relative flex flex-col min-h-0 min-w-0">
                                <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Editor</span>
                                    <span className="text-xs text-zinc-400 font-mono">.mdx</span>
                                </div>
                                <div className="flex-1 relative min-h-0">
                                    <textarea
                                        ref={textareaRef}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="absolute inset-0 w-full h-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-4 font-mono text-sm resize-none focus:outline-none leading-relaxed selection:bg-zinc-200 dark:selection:bg-zinc-700 wrap-break-word whitespace-pre-wrap"
                                        placeholder="Start writing your MDX content..."
                                        spellCheck="false"
                                    />
                                </div>
                            </div>
                        )}
                        {(viewMode === 'preview' || viewMode === 'split') && (
                            <div className="relative flex flex-col min-h-0 min-w-0 bg-white dark:bg-zinc-900 overflow-x-hidden">
                                <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Preview</span>
                                    <span className="text-xs text-zinc-400 font-mono">LIVE</span>
                                </div>
                                <div className="flex-1 p-6 overflow-auto min-h-0">
                                    <MDXPreview content={content} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 px-4 py-2 flex items-center justify-between text-xs text-zinc-500">
                        <div className="flex items-center gap-4">
                            <span>{content.split('\n').length} lines</span>
                            <span>{content.length} chars</span>
                            <span>{content.split(/\s+/).filter(Boolean).length} words</span>
                            <span>{readingTime} min read</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${history.past.length > 0 ? 'bg-zinc-400' : 'bg-green-500 animate-pulse'}`} />
                            <span>{history.past.length > 0 ? `${history.past.length} changes` : 'Ready'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Dialog */}
            {showImageDialog && (
                <div className="fixed inset-0 bg-black/50 dark:bg-black/80 flex items-center justify-center z-100 p-4 backdrop-blur-sm" onClick={() => setShowImageDialog(false)}>
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-md border border-zinc-200 dark:border-zinc-800 shadow-2xl" onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6">Insert Image</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Image URL</label>
                                <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Alt Text</label>
                                <input type="text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} placeholder="Description of the image" className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500" />
                            </div>
                            {imageUrl && (
                                <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-2 overflow-hidden bg-zinc-50 dark:bg-zinc-800/50">
                                    <img src={imageUrl} alt={imageAlt} className="max-h-40 mx-auto rounded-lg" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                </div>
                            )}
                            <div className="flex gap-3 pt-4">
                                <button onClick={() => setShowImageDialog(false)} className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">Cancel</button>
                                <button onClick={insertImage} disabled={!imageUrl} className="flex-1 px-4 py-2 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all font-medium disabled:opacity-50">Insert</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Divider() {
    return <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1" />;
}

function ToolButton({ icon, onClick, title, disabled = false }: { icon: React.ReactNode; onClick: () => void; title: string; disabled?: boolean }) {
    return (
        <button onClick={onClick} disabled={disabled} title={title} className={`p-2 rounded-lg transition-all duration-200 ${disabled ? 'text-zinc-300 dark:text-zinc-700 cursor-not-allowed' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95'}`}>
            {icon}
        </button>
    );
}

function MDXPreview({ content }: { content: string }) {
    const renderMarkdown = (text: string): string => {
        let html = text;

        // Frontmatter
        html = html.replace(/^---\n([\s\S]*?)\n---/m, '<div class="mb-6 p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl"><div class="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2"></div><pre class="text-sm text-zinc-700 dark:text-zinc-300 font-mono whitespace-pre-wrap wrap-break-word">$1</pre></div>');

        // Code blocks with syntax highlighting
        html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
            const language = lang || 'plaintext';
            let highlighted: string;
            try {
                highlighted = hljs.highlight(code.trim(), { language }).value;
            } catch {
                highlighted = hljs.highlightAuto(code.trim()).value;
            }
            return `<div class="my-6 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm bg-zinc-950"><div class="bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex items-center justify-between"><span class="text-xs text-zinc-400 font-mono tracking-wider uppercase">${language}</span></div><pre class="p-4 overflow-x-auto"><code class="text-sm font-mono text-zinc-100 leading-relaxed">${highlighted}</code></pre></div>`;
        });

        // Tables
        html = html.replace(/^\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)*)/gm, (match, header, body) => {
            const headers = header.split('|').map((h: string) => h.trim()).filter(Boolean);
            const rows = body.trim().split('\n').map((row: string) => row.split('|').map((c: string) => c.trim()).filter(Boolean));
            let table = '<div class="my-6 overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm"><table class="min-w-full border-collapse"><thead class="bg-zinc-50 dark:bg-zinc-800/50"><tr>';
            headers.forEach((h: string) => { table += `<th class="px-4 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">${h}</th>`; });
            table += '</tr></thead><tbody class="divide-y divide-zinc-200 dark:divide-zinc-800">';
            rows.forEach((row: string[], i: number) => {
                table += `<tr class="bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">`;
                row.forEach((c: string) => { table += `<td class="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300 border-r border-zinc-100 dark:border-zinc-800/50 last:border-0">${c}</td>`; });
                table += '</tr>';
            });
            table += '</tbody></table></div>';
            return table;
        });

        // Checkboxes
        html = html.replace(/^- \[x\] (.+)$/gm, '<div class="flex items-center gap-3 my-2"><div class="w-5 h-5 flex items-center justify-center bg-zinc-900 dark:bg-zinc-100 rounded text-zinc-100 dark:text-zinc-900 font-bold text-[10px]">✓</div><span class="text-zinc-500 line-through decoration-zinc-300 wrap-break-word">$1</span></div>');
        html = html.replace(/^- \[ \] (.+)$/gm, '<div class="flex items-center gap-3 my-2"><div class="w-5 h-5 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded"></div><span class="text-zinc-700 dark:text-zinc-300 wrap-break-word">$1</span></div>');

        // Horizontal rule
        html = html.replace(/^---$/gm, '<hr class="my-10 border-t border-zinc-200 dark:border-zinc-800" />');

        // Headers
        html = html.replace(/^###\s+(.+)$/gm, '<h3 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-4 wrap-break-word">$1</h3>');
        html = html.replace(/^##\s+(.+)$/gm, '<h2 class="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-12 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-2 wrap-break-word">$1</h2>');
        html = html.replace(/^#\s+(.+)$/gm, '<h1 class="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-10 mb-6 wrap-break-word">$1</h1>');

        // Bold, Italic, Strikethrough
        html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-zinc-900 dark:text-zinc-50 wrap-break-word">$1</strong>');
        html = html.replace(/\*(.+?)\*/g, '<em class="italic text-zinc-800 dark:text-zinc-200 wrap-break-word">$1</em>');
        html = html.replace(/~~(.+?)~~/g, '<del class="line-through decoration-zinc-400 text-zinc-400 dark:text-zinc-500 wrap-break-word">$1</del>');

        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-300 rounded font-mono text-sm border border-zinc-200 dark:border-zinc-700 wrap-break-word">$1</code>');

        // YouTube URLs - convert to embeds (before iframe processing)
        // Handle youtube.com/watch?v=VIDEO_ID
        html = html.replace(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)(?:[^\s<]*)?/g, (match, videoId) => {
            return `<div class="my-8 rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800"><iframe src="https://www.youtube.com/embed/${videoId}" class="w-full aspect-video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
        });

        // Handle youtu.be/VIDEO_ID
        html = html.replace(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)(?:[^\s<]*)?/g, (match, videoId) => {
            return `<div class="my-8 rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800"><iframe src="https://www.youtube.com/embed/${videoId}" class="w-full aspect-video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
        });

        // iframes (for YouTube and other video embeds)
        html = html.replace(/<iframe[\s\S]*?src="([^"]+)"[\s\S]*?<\/iframe>/gi, (match, src) => {
            return `<div class="my-8 rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800"><iframe src="${src}" class="w-full aspect-video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
        });

        // Video tags (for direct video files)
        html = html.replace(/<video[\s\S]*?src="([^"]+)"[\s\S]*?<\/video>/gi, (match, src) => {
            return `<div class="my-8 rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800"><video src="${src}" controls class="w-full">Your browser does not support the video tag.</video></div>`;
        });

        // Images (before links)
        html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<div class="my-8 rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800"><img src="$2" alt="$1" class="max-w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" onerror="this.onerror=null;this.src=\'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22><rect fill=%22%23eee%22 width=%22400%22 height=%22200%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23999%22 font-family=%22sans-serif%22 font-weight=%22bold%22>IMAGE NOT FOUND</text></svg>\'" /><p class="p-4 text-xs font-medium text-zinc-500 text-center italic border-t border-zinc-100 dark:border-zinc-800 wrap-break-word">$1</p></div>');

        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-zinc-900 dark:text-zinc-50 font-semibold underline decoration-zinc-300 hover:decoration-zinc-900 dark:decoration-zinc-700 dark:hover:decoration-zinc-50 transition-all wrap-break-word" target="_blank" rel="noopener">$1</a>');

        // Lists
        const lines = html.split('\n');
        const result: string[] = [];
        let inUL = false, inOL = false;

        for (const line of lines) {
            if (line.match(/^- (?!\[)/)) {
                if (!inUL) { result.push('<ul class="list-disc ml-6 my-6 space-y-3">'); inUL = true; }
                result.push(line.replace(/^- (.+)$/, '<li class="text-zinc-700 dark:text-zinc-300">$1</li>'));
            } else if (line.match(/^\d+\. /)) {
                if (inUL) { result.push('</ul>'); inUL = false; }
                if (!inOL) { result.push('<ol class="list-decimal ml-6 my-6 space-y-3">'); inOL = true; }
                result.push(line.replace(/^\d+\. (.+)$/, '<li class="text-zinc-700 dark:text-zinc-300">$1</li>'));
            } else {
                if (inUL) { result.push('</ul>'); inUL = false; }
                if (inOL) { result.push('</ol>'); inOL = false; }
                result.push(line);
            }
        }
        if (inUL) result.push('</ul>');
        if (inOL) result.push('</ol>');
        html = result.join('\n');

        // Blockquotes
        html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-zinc-900 dark:border-zinc-50 pl-6 my-8 py-3 italic text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-800/50 rounded-r-lg font-medium">$1</blockquote>');

        // Paragraphs and Newlines
        // First, handle double newlines as paragraph breaks
        html = html.replace(/\n\n(?!<)/g, '</p><p class="mb-5 text-zinc-700 dark:text-zinc-300 leading-relaxed wrap-break-word">');

        // Then, handle single newlines within paragraphs by converting them to <br />
        // This ensures that single Enter presses in the editor reflect in the preview.
        html = html.replace(/(?<!>)\n(?!<)/g, '<br />');

        if (!html.startsWith('<')) html = '<p class="mb-5 text-zinc-700 dark:text-zinc-300 leading-relaxed wrap-break-word">' + html;
        if (!html.endsWith('>')) html += '</p>';

        return html;
    };

    return (
        <div className="prose prose-slate max-w-full wrap-break-word dark:prose-invert" dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
    );
}