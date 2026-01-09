import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import Website from "@/models/Website";
import { connectDB } from "@/lib/connectDB";

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

    const userId = body.userId;

    const updatedWebsite = await Website.findOneAndUpdate(
      { _id: websiteId, userId },
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

    const { userId } = await request.json();

    const deletedWebsite = await Website.findOneAndDelete({
      _id: websiteId,
      userId,
    });

    if (!deletedWebsite) {
      return NextResponse.json(
        { message: "Website not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Website deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete website" },
      { status: 500 }
    );
  }
}
