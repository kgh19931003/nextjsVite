
import { ReactNode, use } from 'react';
import { headers } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getLocales } from '@/lib/function';
import {getProviderConfig} from "@/lib/intl/getProviderConfig";
import IntlProvider from "@/providers/IntlProvider";

export const metadata = {
    title: "포트폴리오",
    description: "고부가가치 금속을 재활용하여 산업의 재활성화를 도모하는 갓테크입니다."
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

interface Props {
    children: ReactNode;
    params: { locale: string }; // ✅ 수정
}

export default async function LocaleLayout({ children, params }: Props) {
    const headersList = await headers(); // ✅ 비동기 호출
    const pathname = headersList.get('x-next-url') || `/${params.locale}`;

    const segments = pathname.split('/').filter(Boolean);
    const locale = segments[0];
    const subPath = segments.slice(1).join('/'); // user/history
    const localeData = await getLocales(locale, subPath); // 메시지도 Promise → use로 처리

    return (
                <IntlProvider
                    locale={locale}
                    messages={localeData}
                >
                    {children}
                </IntlProvider>
    );
}
