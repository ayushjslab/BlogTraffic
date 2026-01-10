import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import Website from "@/models/Website";
import { connectDB } from "@/lib/connectDB";
import Blog from "@/models/Blog";
import Scrape from "@/models/Scrape";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const websiteId = (await params).id;
    if (!Types.ObjectId.isValid(websiteId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const body = await request.json();


    const updatedWebsite = await Website.findOneAndUpdate(
      { _id: websiteId },
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedWebsite) {
      return NextResponse.json(
        { message: "Website not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedWebsite, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update website" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const websiteId = (await params).id;
    if (!Types.ObjectId.isValid(websiteId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    await Blog.deleteMany({
      websiteId
    })

    await Scrape.deleteOne({
      websiteId
    })

    const deletedWebsite = await Website.findOneAndDelete({
      _id: websiteId,
    });

    if (!deletedWebsite) {
      return NextResponse.json(
        { message: "Website not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Website deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete website" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const websiteId = (await params).id;

    if (!websiteId) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 })
    }

    await connectDB();

    const website = await Website.findById(websiteId);

    if (!website) {
      return NextResponse.json({ message: "Website not found" }, { status: 404 })
    }

    return NextResponse.json({
      website: {
        name: website.name,
        description: website.description,
        url: website.url,
        logo: website.logo,
        blogPostEndPoint: website.blogPostEndPoint
      }
    }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Failed to fetch website" }, { status: 500 })
  }
}