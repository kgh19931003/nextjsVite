import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'ko'];
const defaultLocale = 'ko';

// next-intl 미들웨어 생성
const intlMiddleware = createMiddleware({
    locales: ['en', 'ko'],
    defaultLocale: 'ko',
});

export function middleware(request: NextRequest) {
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

    // 현재 경로
    const pathname = request.nextUrl.pathname;


    // 정적 자산 경로 제외 처리
    const excludedPaths = [
        '/_next',
        '/favicon.ico',
        '/robots.txt',
        '/manifest.json',
        '/images',
        '/assets',
        '/static',
    ];
    const isStatic = excludedPaths.some((p) => pathname.startsWith(p)) ||
        /\.(png|jpg|jpeg|gif|svg|webp|ico|avif)$/.test(pathname);

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
