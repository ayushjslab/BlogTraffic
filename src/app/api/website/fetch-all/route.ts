import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import Website from "@/models/Website";
import { connectDB } from "@/lib/connectDB";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") as string;

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid or missing userId" },
        { status: 400 }
      );
    }

    const websites = await Website.find({ userId })
      .sort({ createdAt: -1 });

    const websitesData = websites.map((website) => ({
      id: website._id.toString(),
      name: website.name,
      url: website.url,
      logo: website.logo,
    }));

    return NextResponse.json({websites: websitesData}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch websites" },
      { status: 500 }
    );
  }
}
