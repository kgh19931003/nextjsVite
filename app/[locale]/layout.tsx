
import { ReactNode, use } from 'react';
import { headers } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getLocales } from '@/lib/function';
import {getProviderConfig} from "@/lib/intl/getProviderConfig";
import IntlProvider from "@/providers/IntlProvider";
import {getMergedLocaleMessages} from "@/lib/localeUtils";
import ToastRemover from "@/components/ToastRemover";
import {TranslationProvider} from "@/lib/intl/TranslationProvider";
import Header from "@/components/user/Header";
import Footer from "@/components/user/Footer";

export const metadata = {
    title: "Portfolio",
    description: "고부가가치 금속을 재활용하여 산업의 재활성화를 도모하는 Portfolio(Portfolio)입니다."
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

interface Props {
    children: ReactNode;
}

export default async function LocaleLayout({ children }: Props) {
    const headersList = await headers(); // ✅ 비동기 호출
    const pathname = headersList.get('x-next-url') ;

    const segments = pathname!!.split('/').filter(Boolean);
    const locale = segments[0] || 'ko';
    const namespace = segments[1] ?? 'main'; // 두번째 경로를 namespace로, 없으면 'main' 기본값
    const subPath = segments.slice(1).join('/'); // user/history
    const localeData = await getMergedLocaleMessages(locale) as Record<string, any>; // 메시지도 Promise → use로 처리
    const isAdmin = segments[1] === 'admin';
    //console.log('localeData:', localeData);
    return (
        <IntlProvider
            key={subPath}
            locale={locale}
            messages={localeData}
        >
            {/* 상단바 */}
            {!isAdmin ? <Header/> : null}
            {/* 본문 */}
            {children}
            {/* 하단바 */}
            {!isAdmin ? <Footer/> : null}
        </IntlProvider>
    );
}
