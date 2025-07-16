// src/i18n/request.tsx 또는 i18n/request.tsx 위치에 생성

import { NextIntlClientProvider  } from 'next-intl';
import {ReactNode, use} from 'react';
import {headers} from "next/headers";

interface Props {
    children: ReactNode;
    params: { locale: string };
}

export default async function IntlProvider({
                                               children,
                                               params,
                                           }: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    // request.tsx에서 현재 URL을 알 수 없으므로 Next.js에서 제공하는
    // 새로운 방식인 `headers()` API를 사용하거나 별도로 `request.url`을 받아야 함.
    const headersList = await headers(); // ✅ 비동기 호출
    const pathname = headersList.get('x-next-url') || `/${params.locale}`;

    // 예: /ko/user/history → ['ko', 'user', 'history']
    const segments = pathname.split('/').filter(Boolean);
    const locale = segments[0];
    const subPath = segments.slice(1).join('/'); // user/history

    let localeData = {};
    try {
        localeData = (await import(`@/locale/${locale}/${subPath}.json`)).default;
    } catch {
        console.warn(`No localeData found for: ${locale}/${subPath}`);
    }

    const { NextIntlClientProvider } = await import('next-intl');

    return (
        <NextIntlClientProvider locale={locale} messages={localeData}>
            {children}
        </NextIntlClientProvider>
    );
}
