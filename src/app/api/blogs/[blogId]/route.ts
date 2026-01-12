import { connectDB } from "@/lib/connectDB";
import Blog from "@/models/Blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ blogId: string }> }) {
    try {

        await connectDB();

        const { blogId } = await params;

        if (!blogId) {
            return NextResponse.json(
                { error: "blogId is required" },
                { status: 400 }
            );
        }

        const blog = await Blog.findById(blogId).select("title slug content seoTitle seoDescription keywords status scheduledFor publishedAt createdAt updatedAt").lean();

        if (!blog) {
            return NextResponse.json(
                { error: "Blog not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { blog },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error fetching blog:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ blogId: string }> }) {
    try {
        await connectDB();
        const { blogId } = await params;
        const body = await req.json();

        if (!blogId) {
            return NextResponse.json({ error: "blogId is required" }, { status: 400 });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, body, { new: true }).lean();

        if (!updatedBlog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json({ blog: updatedBlog }, { status: 200 });
    } catch (error: any) {
        console.error("Error updating blog:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}