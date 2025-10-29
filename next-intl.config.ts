import type { IntlConfig } from 'next-intl';

const nextIntlConfig: IntlConfig = {
    locale: 'ko',
    //defaultLocale: 'ko',
    //localePrefix: 'always',

    onError: (error) => {
        if (error.code === 'MISSING_MESSAGE') {
            console.warn(`[next-intl] ❗️누락된 메시지: ${error.message}`);
            // 에러 무시 (throw 안 함)
            return;
        }

        // 나머지 에러는 그대로 throw
        throw error;
    }
};

export default nextIntlConfig;