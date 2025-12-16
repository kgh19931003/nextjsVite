import { NextRequest, NextResponse } from "next/server";
import { swrFetcher } from "@/lib/function";

const baseUrl =
    process.env.PROFILE === "DOCKER" ? "http://portfolio-api:9090" : "http://localhost:9090";

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
        // ⭐ 엑셀 다운로드 경로 감지
        const isExcelDownload = slug.includes('excel');

        if (isExcelDownload) {
            // 바이너리 응답 처리
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // 응답을 ArrayBuffer로 읽기
            const arrayBuffer = await response.arrayBuffer();

            // Content-Disposition 헤더 추출
            const contentDisposition = response.headers.get('Content-Disposition');

            // NextResponse로 바이너리 데이터 반환
            return new NextResponse(arrayBuffer, {
                status: 200,
                headers: {
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': contentDisposition || 'attachment; filename="download.xlsx"',
                    'Access-Control-Expose-Headers': 'Content-Disposition'
                }
            });
        }

        // 일반 JSON 응답
        const res = await swrFetcher(url, { method: "GET" });
        return NextResponse.json(res);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
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
