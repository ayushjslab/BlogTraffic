import { connectDB } from "@/lib/connectDB";
import Blog from "@/models/Blog";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ blogId: string }> }) {
    try {
        await connectDB();
        const { blogId } = await params;
        const body = await req.json();

        const prompt = `
        Generate a blog post based on the following information:
        Title: ${body.title}
        SEO Title: ${body.seoTitle}
        SEO Description: ${body.seoDescription}
        Keywords: ${body.keywords.join(", ")}
        `

        console.log(prompt)

        if (!blogId) {
            return NextResponse.json({ error: "blogId is required" }, { status: 400 });
        }

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