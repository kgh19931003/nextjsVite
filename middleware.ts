import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'ko'];
const defaultLocale = 'ko';


// 허용된 IP (단일 혹은 배열로 확장 가능)
const ALLOWED_IPS = ['121.144.71.183', '127.0.0.1', '::1'];

// next-intl 미들웨어 생성
const intlMiddleware = createMiddleware({
    locales: ['en', 'ko'],
    defaultLocale: 'ko',
});

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // ✅ 1️⃣ 에러 페이지는 예외 처리 (무한 리다이렉트 방지)
    /*
    if (pathname.startsWith('/error/prepare')) {
        return NextResponse.next();
    }
     */

    // ✅ 2️⃣ 클라이언트 IP 가져오기
    /*
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = forwardedFor
        ? forwardedFor.split(',')[0].trim()
        : '127.0.0.1'; // 로컬 환경일 경우 기본값

     */

    // ✅ 3️⃣ IP 제한
    /*
    if (!ALLOWED_IPS.includes(clientIp)) {
        const url = new URL('/error/prepare', request.url);
        return NextResponse.redirect(url);
    }
     */

    // 먼저 intl 처리
    const intlResponse = intlMiddleware(request);

    // locale 관련 설정이 끝난 후 새로운 Response 생성
    const response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    // next-intl의 locale 관련 설정 복사
    for (const [key, value] of intlResponse.headers.entries()) {
        response.headers.set(key, value);
    }



    // 정적 자산 경로 제외 처리
    const excludedPaths = [
        '/_next',
        '/favicon.ico',
        '/robots.txt',
        '/manifest.json',
        '/images',
        '/assets',
        '/static',
        '/public',
        '/sitemap.xml',
        '/error'
    ];
    const isStatic = excludedPaths.some((p) => pathname.startsWith(p)) ||
        /\.(png|jpg|jpeg|gif|svg|webp|ico|avif|html|mp4|mov|webm)$/.test(pathname);

    if (isStatic) {
        return NextResponse.next();
    }


    // 추가 헤더 설정
    response.headers.set('x-next-url', pathname + request.nextUrl.search);

    // 현재 경로 첫 세그먼트 확인
    const segments = pathname.split('/').filter(Boolean);
    const currentLocale = segments[0];

    // locale이 없는 경우 defaultLocale 붙여서 리다이렉트
    if (!locales.includes(currentLocale)) {
        const redirectUrl = new URL(request.url);
        redirectUrl.pathname = `/${defaultLocale}${pathname}`;
        return NextResponse.redirect(redirectUrl);
    }


    return response;
}

export const config = {
    matcher: ['/((?!_next|favicon.ico).*)'], // 정적 자산 제외
};
