'use client';

import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';

interface IntlProviderProps {
    children: ReactNode;
    key: string;
    locale: string;
    messages: Record<string, string>;
}

export default function IntlProvider({ children, key, locale, messages }: IntlProviderProps) {
    return (
        <NextIntlClientProvider
            key={key}
            locale={locale}
            messages={messages}
            timeZone="Asia/Seoul"   // 여기에 기본 시간대 설정
            onError={(error) => {
                if (error.code === 'MISSING_MESSAGE') {
                    // MISSING_MESSAGE 에러 무시
                    return;
                }
                // 그 외 에러는 콘솔에 출력
                console.error(error);
            }}
        >
            {children}
        </NextIntlClientProvider>
    );
}
