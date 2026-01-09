import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Website from "@/models/Website";
import { scrapeWebsite } from "./scrape";
import Scrape from "@/models/Scrape";
import { geminiModel } from "@/lib/gemini";
import Blog from "@/models/Blog";

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


    const scrape = await Scrape.create({
      websiteId: website._id,
      brand: scrapeData.brand,
      seo: scrapeData.seo,
      services: scrapeData.services,
    });


    const prompt = `
You are an expert SaaS content strategist and senior technical SEO writer.

Below is scraped data from a website. Use it ONLY to understand the theme, domain, and concepts.
DO NOT reference the brand name directly in the titles.

Scraped Context (FOR UNDERSTANDING ONLY):
- Brand Description: ${scrapeData.seo.description}
- Core Topic Theme: ${scrapeData.seo.topicTheme}
- Key Concepts & Services: ${scrapeData.services.join(", ")}

TASK:
Create EXACTLY 15 blog titles that are THEMATICALLY related to the website.

PRIMARY POV (VERY IMPORTANT):
👉 Every title MUST be written from a **knowledge-sharing / insight-revealing perspective**.
👉 Each title should promise **new understanding**, **fresh insight**, or **a conceptual takeaway**.
👉 Titles should feel like: “you’ll learn something you didn’t know before.”

CRITICAL RULES:
1. Return ONLY a JavaScript array of strings.
2. The array MUST contain exactly 15 items.
3. ALL titles must be GENERAL and CONCEPT-LEVEL.
4. ❌ DO NOT mention:
   - brand names
   - product names
   - company names
   - proprietary terms
5. Titles must feel applicable to ANY company in this domain.
6. Every title must be UNIQUE in:
   - wording
   - insight
   - conceptual angle
7. Each title must explore a DIFFERENT INSIGHT, such as:
   - hidden backend patterns
   - misunderstood real-time concepts
   - non-obvious architecture trade-offs
   - emerging backend design philosophies
   - how AI/LLMs influence backend thinking
   - why certain backend ideas are evolving
   - mental models developers overlook
   - systemic problems and their root causes
8. Avoid “how-to”, “step-by-step”, or marketing language.
9. Do NOT repeat phrases verbatim.
10. Do NOT add explanations, numbering, or extra text.

TONE:
- Insightful
- Thought-provoking
- Developer-first
- Modern
- Blog-ready
- SEO-aware but natural

OUTPUT FORMAT (MANDATORY):
[
  "Title 1",
  "Title 2",
  "Title 3"
]
`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;

    // Use the .text() method to get the actual string
    const rawText = response.text();

    const titlesArray = extractTitlesArray(rawText);
    console.log(titlesArray)

    const blogs = titlesArray.map((title, index) => ({
      websiteId: website._id,
      userId,
      title,
      status: "draft",
    }));

    await Blog.insertMany(blogs);
    return NextResponse.json(
      { message: "Website added successfully", website },
      { status: 201 }
    );
  } catch (error: any) {
    // Duplicate website error
    console.log(error)
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


function extractTitlesArray(rawText: string): string[] {
  // 1. Remove code fences if present
  const cleaned = rawText
    .replace(/```(?:javascript|json)?/gi, "")
    .replace(/```/g, "")
    .trim();

  // 2. Parse JSON safely
  let parsed: any;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("Failed to parse titles JSON");
  }

  // 3. Validate structure
  if (!Array.isArray(parsed)) {
    throw new Error("AI response is not an array");
  }

  // 4. Clean + validate titles
  const titles = parsed
    .filter((t) => typeof t === "string")
    .map((t) => t.trim())
    .filter(Boolean);

  if (titles.length !== 15) {
    throw new Error(`Expected 15 titles, got ${titles.length}`);
  }

  return titles;
}
