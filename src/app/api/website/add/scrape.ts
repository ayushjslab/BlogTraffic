import * as cheerio from "cheerio";

export type ScrapedWebsiteData = {
    brand: {
        name: string;
        logo: string | null;
    };
    seo: {
        topicTheme: string;
        description?: string;
    };
    services: string[];
};

export async function scrapeWebsite(url: string): Promise<ScrapedWebsiteData> {
    if (!url) {
        throw new Error("URL is required");
    }

    const response = await fetch(url, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebkit/537.36",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch website");
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // 🔹 Logo extraction (priority order)
    const logo =
        $('link[rel="icon"]').attr("href") ||
        $('link[rel="shortcut icon"]').attr("href") ||
        $('link[rel="apple-touch-icon"]').attr("href") ||
        $('link[rel="apple-touch-icon-precomposed"]').attr("href") ||
        $('link[rel="icon"][sizes]').attr("href") ||
        $('meta[name="msapplication-TileImage"]').attr("content") ||
        "/favicon.ico";

    const resolvedLogo =
        logo && logo.startsWith("http") ? logo : new URL(logo, url).href;

    // 🔹 SEO data
    const description = $('meta[name="description"]').attr("content");

    const pageContext = $("h1, h2")
        .map((_, el) => $(el).text().trim())
        .get()
        .join(" ");

    // 🔹 Services extraction
    const services: string[] = [];
    $("h2, h3").each((_, el) => {
        if (services.length >= 20) return false;
        const text = $(el).text().trim();
        if (text.length > 5 && text.length < 50) {
            services.push(text);
        }
    });

    return {
        brand: {
            name: $("title").text().split("|")[0].trim(),
            logo: resolvedLogo || null,
        },
        seo: {
            topicTheme: pageContext.substring(0, 200),
            description,
        },
        services: services.slice(0, 10),
    };
}
