import useSWR from "swr";
import {json} from "node:stream/consumers";

export function isTokenExpired(token: string): boolean {
    if (!token) return true;

    try {
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64)); // 브라우저용 base64 디코딩

        if (!payload.exp) return true;

        const now = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
        return payload.exp < now;
    } catch (error) {
        console.error('JWT 디코드 실패:', error);
        return true; // 잘못된 토큰이면 만료된 것으로 간주
    }
}


export type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
};

export function isJsonString(str: string): boolean {
    try {
        JSON.parse(str);
        return true;
    } catch {
        return false;
    }
}


export function numberWithCommas(x: number | string): string {
    return Number(x).toLocaleString();
}


export function makeArray(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
}


export function isFile(item: any): item is File {
    return item instanceof File;
}


export function isNumeric(value: any): boolean {
    return !isNaN(value) && !isNaN(parseFloat(value));
}

export const swrFetcher = async <T>(
    url: string,
    options: FetchOptions = {}
): Promise<string | Response> => {
    const token = localStorage.getItem('token');

    const fetchOptions: RequestInit = {
        method: options.method || 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    if (options.body) {
        if (options.body instanceof FormData) {
            fetchOptions.body = options.body; // ✅ FormData 그대로 넣기
            // ✅ Content-Type 생략 => 브라우저가 자동으로 multipart/form-data + boundary 설정
        } else {
            fetchOptions.headers['Content-Type'] = 'application/json';
            fetchOptions.body = isJsonString(options.body) ? options.body : JSON.stringify(options.body);
        }
    }

    const res = await fetch(url, fetchOptions);

    if (res.status === 401) {
        throw new Error('Unauthorized');
    }

    if (!res.ok) {
        throw new Error('Fetch error');
    }

    const contentType = res.headers.get('content-type') || '';


    if (contentType.includes('application/json')) {
        return await res.json();
    }


    if (
        contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ||
        contentType.includes('application/vnd.ms-excel')
    ) {
        return await res; // ✅ 엑셀 파일은 blob으로 처리
    }


    return await res.text(); // 그 외 일반 텍스트
};


export async function getLocales(locale: string, routePath: string) {
    // 예: locale = 'ko', routePath = 'user/history'
    try {
        if(!routePath) routePath = 'main'
        console.log(`@/locale/${locale}/${routePath}.json`)
        return (await import(`@/locale/${locale}/${routePath}.json`)).default;
    } catch (err) {
        console.warn(`⚠️ Could not load locale for ${locale}/${routePath}`);
        return (await import(`@/locale/common.json`)).default;
    }
}


export function generateSafeKey(text: string) {
    return text
        .replace(/[.]/g, "_")               // 점 -> _ 로 대체
}