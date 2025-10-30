// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";

const baseUrl = "https://Portfolionology.co.kr";
const locales = ["ko", "en"];
const pages = [
    "",
    "/contact",
    "/company/Vision", "/company/Timeline", "/company/Certification", "/company/Locations",
    "/business/Manufacturing", "/business/Repair",
    "/powder/NiAlloy",
    "/Blog/Lists"];


export async function GET() {
    // sitemap XML 생성
    const urls = pages.flatMap((page) =>
        locales.map(
            (locale) =>
                `<url><loc>${baseUrl}/${locale}${page}</loc><lastmod>${new Date().toISOString()}</lastmod></url>`
        )
    );

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join("\n")}
  </urlset>`;

    return new NextResponse(sitemapXml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
