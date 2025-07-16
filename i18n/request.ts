// src/i18n/getRequestConfig.ts

import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = await requestLocale; // string 타입이어야 함

    let localeData = {};

    return {
        locale,
        localeData
    };
});
