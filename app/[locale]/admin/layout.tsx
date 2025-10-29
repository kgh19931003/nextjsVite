import React, {ReactNode} from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import {cookies, headers} from "next/headers";
import {getLocales} from "@/lib/function";
import IntlProvider from "@/providers/IntlProvider";
import {redirect} from "next/navigation";

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

    const headersList = await headers(); // ✅ 비동기 호출
    const pathname = headersList.get('x-next-url') || `/${params.locale}`;

    const segments = pathname.split('/').filter(Boolean);
    const locale = segments[0];
    const subPath = segments.slice(1).join('/'); // user/history
    const localeData = await getLocales(locale, subPath); // 메시지도 Promise → use로 처리
    const isLoginPage = segments[2] === 'login';


    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value ?? '';

    if(!token && segments[2] !== "login"){
        redirect(`/${locale}/admin/login`);
    }

    // 토큰 검사 제외할 경로
    const hideLayoutPaths = ['/admin/login'];
    if (hideLayoutPaths.includes(pathname)) return <>{children}</>;

    return (
        <IntlProvider
            key={locale}
            locale={locale}
            messages={localeData}

        >
            <div className="flex h-screen bg-gray-100">
                {!isLoginPage ? <Sidebar /> : null}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {!isLoginPage ? <Header user={user} /> : null}

                    <main className="flex-1 overflow-y-auto p-6">
                        {children}
                    </main>
                </div>
            </div>
        </IntlProvider>
    );
}
