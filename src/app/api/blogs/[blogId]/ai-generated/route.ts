import { generateWithChatGPT } from "@/lib/chatgpt";
import { connectDB } from "@/lib/connectDB";
import Blog from "@/models/Blog";
import Scrape from "@/models/Scrape";
import Website from "@/models/Website";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ blogId: string }> }) {
    try {
        await connectDB();
        const { blogId } = await params;

        const givenBlog = await Blog.findById(blogId);;

        const {searchParams} = new URL(req.url);
        const websiteId = searchParams.get("websiteId");

        const website = await Website.findById(websiteId).select("url").lean();
        const scrapedData = await Scrape.findOne({websiteId: websiteId}).lean();

        const prompt = `
You are a professional content writer and SEO expert.

Generate a high-quality, human-written blog post using the information below.

CONTENT REQUIREMENTS:
- Output must be valid, clean HTML only
- The writing should sound natural, engaging, and written by a human (not robotic)
- Optimize fully for SEO and readability
- Use a friendly, authoritative tone

BLOG STRUCTURE:
1. SEO-optimized <title> and <meta name="description">
2. A compelling introduction that hooks the reader
3. Properly structured headings using <h1>, <h2>, and <h3>
4. Each heading must include a clear explanation with examples where relevant
5. Short paragraphs and scannable content
6. A conclusion that summarizes key takeaways
7*. Always Include the Valide Related Public Image URL in the <img> tag
8*. Always Include the Valide Related Public Video URL in the <iframe> tag

SEO & ENHANCEMENTS:
- Naturally include all provided keywords throughout the content
- Add relevant internal and external backlinks (use authoritative, public sources)
- Embed at least:
  • 1 public image per major section (use royalty-free/public image URLs)
  • 1 relevant YouTube video embed where appropriate
- Use semantic HTML tags (<article>, <section>, <figure>, <figcaption>)

STYLING:
- Include a small embedded <style> block
- Use modern, clean CSS for typography, spacing, headings, and media
- Keep styling lightweight and blog-friendly

BACKLINKS:
- Reference credible public websites (blogs, documentation, industry leaders)
- Use descriptive anchor text (no spammy links)

INPUT DATA:
Title: ${givenBlog.title}
SEO Title: ${givenBlog.seoTitle}
SEO Description: ${givenBlog.seoDescription}
Keywords: ${givenBlog.keywords.map((keyword) => keyword.name).join(", ")}

IMPORTANT:
- Do NOT mention that you are an AI
- Do NOT explain the prompt or your process
- Return only the final HTML blog content
`;

        console.log(prompt)

        if (!blogId) {
            return NextResponse.json({ error: "blogId is required" }, { status: 400 });
        }

        const rawGPT = await generateWithChatGPT(prompt);

        if (!rawGPT) {
            return NextResponse.json(
                { error: "Empty AI response" },
                { status: 500 }
            );
        }

        console.log(rawGPT)


        // const updatedBlog = await Blog.findByIdAndUpdate(blogId, body, { new: true }).lean();

        // if (!updatedBlog) {
        //     return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        // }

        // return NextResponse.json({ blog: updatedBlog }, { status: 200 });
    } catch (error: any) {
        console.error("Error updating blog:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}