'use client';

import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';

interface IntlProviderProps {
    children: ReactNode;
    locale: string;
    messages: Record<string, string>;
}

export default function IntlProvider({ children, locale, messages }: IntlProviderProps) {
    return (
        <NextIntlClientProvider
            locale={locale}
            messages={messages}
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
