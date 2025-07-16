// app/layout.tsx

import "./globals.css";
import Link from "next/link";
import Header from "@/components/user/Header";
import Footer from "@/components/user/Footer";
import {NextIntlClientProvider} from "next-intl";
import {headers} from "next/headers";
import PageHeroAuto from "@/components/user/PageHeroAuto";

export const metadata = {
    title: "(주) 갓테크",
    description: "고부가가치 금속을 재활용하여 산업의 재활성화를 도모하는 갓테크입니다."
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default async function RootLayout({
                                       children, params
                                   }: {
    children: React.ReactNode;
}) {
    const headersList = await headers();
    const path = headersList.get("x-next-url")
    const segments = path.split('/'); // ['', 'ko', 'admin', 'dashboard']
    const isAdmin = segments[2] === 'admin';
    const locale = params.lang;
    const messages = {}


    return (
        <html lang="ko" className="scroll-smooth">
            <body className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {/* 상단바 */}
                    {!isAdmin ? <Header /> : null}


                    {/* 본문 */}
                    <main>{children}</main>

                    {/* 하단바 */}
                    {!isAdmin ? <Footer /> : null}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
