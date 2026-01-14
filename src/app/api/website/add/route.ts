import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Website from "@/models/Website";
import { scrapeWebsite } from "./scrape";
import Scrape from "@/models/Scrape";
import { geminiModel } from "@/lib/gemini";
import Blog, { IPost } from "@/models/Blog";
import { generateWithChatGPT } from "@/lib/chatgpt";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const session = await mongoose.startSession();
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
    const scrapeData = await scrapeWebsite(url);


    const prompt = `
You are a senior SaaS content strategist and technical SEO writer with expertise in keyword research and search intent analysis.

Use the scraped data ONLY to understand the domain and concepts.
DO NOT mention brand, product, or company names.

CONTEXT:
- Description: ${scrapeData.seo.description}
- Core Theme: ${scrapeData.seo.topicTheme}
- Concepts: ${scrapeData.services.join(", ")}

TASK:
Generate EXACTLY 15 blog post objects with HIGH-SEO potential and realistic keyword metrics.

TITLE REQUIREMENTS:
- Insight-driven, knowledge-sharing perspective
- Promises new understanding or conceptual clarity
- General, industry-wide (not company-specific)
- Avoid how-to, step-by-step, or marketing tone
- Each title explores a DIFFERENT insight with NO repeated wording
- 50–70 characters optimal length
- Use patterns like: "Why X Matters for Y", "Understanding X in Y", "The Role of X in Y"

KEYWORD RESEARCH REQUIREMENTS (CRITICAL):
Use REALISTIC search volumes based on actual B2B SaaS keyword data:
- Primary keywords: 1,000–10,000 monthly volume (competitive head terms)
- Secondary keywords: 500–3,000 monthly volume (specific variants)
- Long-tail keywords: 100–800 monthly volume (specific problem/solution queries)

IMPORTANT: B2B technical terms typically have LOWER volumes than consumer keywords. 
A volume of 5,000/month for a technical SaaS term is already considered HIGH volume.
Adjust expectations accordingly - most authentic B2B keywords are in the 200-2,000 range.

KEYWORD SELECTION RULES:
- Primary: Core topic term that people actually search (e.g., "user authentication", "SSO implementation")
- Secondary: Related concept or variant (e.g., "authentication methods", "secure login")
- Long-tail: Specific user query with clear intent (e.g., "authentication best practices 2024")
- All keywords must be DIRECTLY relevant to the article topic
- Avoid generic business terms like "best practices" or "user experience" alone
- Include technical terms where appropriate (OAuth, SAML, API, etc.)
- Focus on informational and commercial investigation intent

SLUG REQUIREMENTS:
- 3–6 words maximum
- Include primary keyword or close variant
- Use kebab-case
- Be specific and descriptive

SEO METADATA REQUIREMENTS:
- seoTitle: Include primary keyword naturally, 50–60 characters
- seoDescription: Compelling benefit/promise, include primary keyword, 140–160 characters
- Both should focus on user benefit and search intent

OUTPUT RULES:
- Return ONLY a valid JavaScript array
- Exactly 15 unique objects
- No explanations, markdown, or extra text
- Ensure proper JSON formatting with double quotes

OBJECT STRUCTURE (MANDATORY):
{
  "title": "Insightful blog title (50–70 chars)",
  "slug": "primary-keyword-based-slug",
  "seoTitle": "SEO title with primary keyword (50–60 chars)",
  "seoDescription": "Compelling meta description with keyword (140–160 chars)",
  "keywords": [
    { "name": "primary keyword phrase", "volume": 3200 },
    { "name": "secondary related phrase", "volume": 1400 },
    { "name": "specific long-tail query", "volume": 450 }
  ]
}

QUALITY CHECKS BEFORE GENERATING:
1. Are all keyword volumes realistic for B2B SaaS? (Most should be under 5,000)
2. Are keywords specific to the actual topic, not generic business terms?
3. Does each article cover a distinct angle with no title repetition?
4. Do slugs include the primary keyword or variant?
5. Are search intents clear and aligned with user needs?

TONE:
Insightful, modern, developer-first, technically credible, SEO-informed

EXAMPLE OF GOOD VS BAD KEYWORDS:
✅ GOOD: { "name": "OAuth implementation", "volume": 2400 }
❌ BAD: { "name": "best practices", "volume": 45000 }

✅ GOOD: { "name": "SSO authentication flow", "volume": 890 }
❌ BAD: { "name": "user experience", "volume": 22000 }


RETURN FORMAT:
[
  {
    "title": "Understanding the Security Implications of Session Management",
    "slug": "session-management-security",
    "seoTitle": "Session Management Security: Key Implications",
    "seoDescription": "Explore how session management impacts application security and learn the critical factors that determine safe user authentication flows.",
    "keywords": [
      { "name": "session management security", "volume": 1800 },
      { "name": "authentication session", "volume": 920 },
      { "name": "secure session handling", "volume": 340 }
    ]
  }
]
`;
    // const result = await geminiModel.generateContent(prompt);
    //   const response = await result.response;

    const rawGPT = await generateWithChatGPT(prompt);

    if (!rawGPT) {
      return NextResponse.json(
        { error: "Empty AI response" },
        { status: 500 }
      );
    }

    const gptData = parseGPTJSON<IPost[]>(rawGPT);

    if (!Array.isArray(gptData)) {
      throw new Error("AI response is not an array");
    }

    if (gptData.length !== 15) {
      throw new Error(
        `Expected exactly 15 blogs, got ${gptData.length}`
      );
    }

    const isValid = gptData.every(
      (p) =>
        p.title &&
        p.slug &&
        p.seoTitle &&
        p.seoDescription &&
        Array.isArray(p.keywords) &&
        p.keywords.length > 0
    );

    if (!isValid) {
      throw new Error("Invalid AI blog structure");
    }

    session.startTransaction();

    const [website] = await Website.create(
      [
        {
          name,
          logo: scrapeData.brand.logo,
          url,
          description: desc,
          blogPostEndPoint: endpoint,
          userId,
        },
      ],
      { session }
    );

    await Scrape.create(
      [
        {
          websiteId: website._id,
          brand: scrapeData.brand,
          seo: scrapeData.seo,
          services: scrapeData.services,
        },
      ],
      { session }
    );

    const baseDate = new Date();

    const blogs = await Blog.insertMany(
      gptData.map((data, index) => {
        const scheduledFor = new Date(baseDate);
        scheduledFor.setDate(baseDate.getDate() + index + 1);

        return {
          websiteId: website._id,
          userId,
          title: data.title,
          slug: data.slug,
          seoTitle: data.seoTitle,
          seoDescription: data.seoDescription,
          scheduledFor,
          keywords: data.keywords,
          status: "draft",
        };
      }),
      { session }
    );

    await session.commitTransaction();

    return NextResponse.json(
      {
        message: "Website added successfully",
        website,
        blogsCreated: blogs.length,
      },
      { status: 201 }
    );

  } catch (error: any) {
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


function parseGPTJSON<T>(raw: string): T {
  const cleaned = raw
    .replace(/```(?:json|javascript)?/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Raw GPT response:", raw);
    throw new Error("Failed to parse GPT JSON");
  }
}
