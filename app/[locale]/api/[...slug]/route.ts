import { NextRequest, NextResponse } from "next/server";
import { swrFetcher } from "@/lib/function";

const baseUrl =
    process.env.PROFILE === "DOCKER" ? "http://godtech-api:9090" : "http://localhost:9090";

interface Params {
    slug: string[];
    locale: string;
}

// URL segments 안전하게 합치는 helper
const buildUrl = (segments: (string | undefined)[], queryString?: string) => {
    const path = segments.filter(Boolean).join("/");
    return queryString ? `${path}?${queryString}` : path;
};

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<Params> }
) {
    const { slug } = await params;
    const queryString = req.nextUrl.searchParams.toString();

    const url = `${baseUrl}/${buildUrl(slug, queryString)}`;

    try {
        const res = await swrFetcher(url, { method: "GET" });
        return NextResponse.json(res);
    } catch (error: any) {
        return NextResponse.json({ message: error.message });
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<Params> }
) {
    const { slug } = await params;

    try {
        const contentType = req.headers.get("content-type") || "";
        let body: any;

        if (contentType.includes("multipart/form-data")) {
            body = await req.formData();
        } else {
            body = await req.json();
        }

        const url = `${baseUrl}/${buildUrl(slug)}`;
        const res = await swrFetcher(url, { method: "POST", body });

        return NextResponse.json(res);
    } catch (error: any) {
        return NextResponse.json({ message: error.message });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<Params> }
) {
    const { slug } = await params;

    try {
        const contentType = req.headers.get("content-type") || "";
        let body: any;

        if (contentType.includes("multipart/form-data")) {
            body = await req.formData();
        } else {
            body = await req.json();
        }

        const url = `${baseUrl}/${buildUrl(slug)}`;
        const res = await swrFetcher(url, { method: "PUT", body });

        return NextResponse.json(res);
    } catch (error: any) {
        return NextResponse.json({ message: error.message });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<Params> }
) {
    const { slug } = await params;

    try {
        const url = `${baseUrl}/${buildUrl(slug)}`;
        await swrFetcher(url, { method: "DELETE" });

        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ message: error.message });
    }
}
