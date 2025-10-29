// app/layout.tsx

import "./globals.css";
import Link from "next/link";
import Header from "@/components/user/Header";
import Footer from "@/components/user/Footer";
import {NextIntlClientProvider} from "next-intl";
import {headers} from "next/headers";
import PageHeroAuto from "@/components/user/PageHeroAuto";
import {getLocales} from "@/lib/function";
import ToastRemover from './components/ToastRemover'
import {getMergedLocaleMessages} from "@/lib/localeUtils";
import React from "react"; // 클라이언트 컴포넌트 import
import IntlProvider from "@/providers/IntlProvider";

export const metadata = {
    title: "(주)갓테크",
    description: "고부가가치 금속을 재활용하여 산업의 재활성화를 도모하는 갓테크(GODTECH)입니다.",
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default async function RootLayout({
                                       children
                                   }: {
    children: React.ReactNode;
}) {
    const headersList = await headers();
    const pathname = headersList.get('x-next-url') ?? '';
    const segments = pathname!!.split('/').filter(Boolean);
    const isAdmin = segments[1] === 'admin';
    const locale = segments[0] || 'ko';

    const subPath = segments.slice(1).join('/'); // user/history
    const localeData = await getMergedLocaleMessages(locale) as Record<string, any>; // 메시지도 Promise → use로 처리


    return (
        <html lang="ko" className="scroll-smooth">
            <body className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">
            <IntlProvider key={subPath} locale={locale} messages={localeData}>

                {/* 본문 */}
                <main>{children}</main>

            </IntlProvider>
            </body>
        </html>
    );
}
