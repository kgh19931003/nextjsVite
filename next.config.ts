import withNextIntl from 'next-intl/plugin';
import nextIntlConfig from './next-intl.config';

export default withNextIntl(nextIntlConfig)({
    reactStrictMode: true,
    // 여기에 추가 설정 필요하면 넣기
});
