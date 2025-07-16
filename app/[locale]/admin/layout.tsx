import React, {ReactNode} from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import {headers} from "next/headers";
import {getLocales} from "@/lib/function";
import {NextIntlClientProvider} from "next-intl";

// Mock user data
const user = {
    name: '관리자',
    role: '시스템 관리자',
};

interface Props {
    children: ReactNode;
    params: { locale: string }; // ✅ 수정
}

export default async function adminLocaleLayout({ children, params }: Props) {


    /*
    useEffect(() => {
        // 로그인 페이지일 땐 검사하지 않음
        if (hideLayout) return;

        const token = localStorage.getItem('token');

        // 토큰 없으면 로그인 페이지로 이동
        if (!token) {
            router.replace('/admin/login');
        }
    }, [pathname, router, hideLayout]);
    */
    // 로그인 페이지면 레이아웃 없이 children만 렌더


    // 토큰 없으면 아마 redirect중일테니 빈 화면 보여주거나 로딩표시 가능
    /*
    if (!localStorage.getItem('token')) {
        return <div>Loading...</div>;
    }

     */

    const headersList = await headers(); // ✅ 비동기 호출
    const pathname = headersList.get('x-next-url') || `/${params.locale}`;

    const segments = pathname.split('/').filter(Boolean);
    const locale = segments[0];
    const subPath = segments.slice(1).join('/'); // user/history
    const localeData = await getLocales(locale, subPath); // 메시지도 Promise → use로 처리

    // 토큰 검사 제외할 경로
    const hideLayoutPaths = ['/admin/login'];
    if (hideLayoutPaths.includes(pathname)) return <>{children}</>;

    return (
        <NextIntlClientProvider
            locale={locale}
            messages={localeData}

        >
            <div className="flex h-screen bg-gray-100">
                <Sidebar />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header user={user} />

                    <main className="flex-1 overflow-y-auto p-6">
                        {children}
                    </main>
                </div>
            </div>
        </NextIntlClientProvider>
    );
}
