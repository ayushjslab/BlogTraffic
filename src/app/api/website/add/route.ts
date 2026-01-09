import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Website from "@/models/Website";
import { scrapeWebsite } from "./scrape";
import Scrape from "@/models/Scrape";

// POST: Add a website
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, url, desc, endpoint, userId } = body;

    // Basic validation
    if (!name || !url || !endpoint || !userId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const website = await Website.create({
      name,
      url,
      description: desc,
      blogPostEndPoint: endpoint,
      userId,
    });

    const scrapeData = await scrapeWebsite(url);

    await Scrape.create({
      websiteId: website._id,
      brand: scrapeData.brand,
      seo: scrapeData.seo,
      services: scrapeData.services,
    });

    return NextResponse.json(
      { message: "Website added successfully", website },
      { status: 201 }
    );
  } catch (error: any) {
    // Duplicate website error
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Website already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
