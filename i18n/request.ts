import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = (await requestLocale) ?? 'ko'; // 기본 로케일을 'en'으로 지정

    let localeData = {};

    // localeData 로드 로직 추가 가능

    return {
        locale,
        localeData
    };
});
