import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/Blog"; // adjust path to your Mongoose model

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const websiteId = searchParams.get("websiteId");

    if (!websiteId) {
      return NextResponse.json(
        { error: "websiteId is required" },
        { status: 400 }
      );
    }

    const blogs = await Blog.find({ websiteId })
      .sort({ publishDate: 1 })
      .select("_id title status updatedAt scheduledFor keywords createdAt").lean();

    const latestUpdate =
      blogs.length > 0 ? blogs[blogs.length - 1].updatedAt.toString() : null;

    return NextResponse.json(
      { latestUpdate, blogs },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
