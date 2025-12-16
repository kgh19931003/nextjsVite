import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // 요청 URL에서 path 추출
        const url = new URL(req.url);
        const originalPath = url.pathname; // /uploads/fileUpload/...
        const springPath = originalPath;   // 그대로 Spring Boot 경로 사용

        // Spring Boot 이미지 URL
        const SPRING_BOOT_URL = `http://localhost:9090${springPath}`;

        const response = await fetch(SPRING_BOOT_URL);

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to fetch image: ${response.statusText}` },
                { }
            );
        }

        const arrayBuffer = await response.arrayBuffer();
        const contentType = response.headers.get("content-type") || "image/png";

        return new Response(arrayBuffer, {
            headers: {
                "Content-Type": contentType,
            },
        });
    } catch (err) {
        console.error("Image proxy error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
