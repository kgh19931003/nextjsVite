import { useTranslations } from 'next-intl';
import { generateSafeKey } from '@/lib/function';

export function useSafeTranslations(namespace?: string) {
    const t = useTranslations(namespace);

    return (input: string, options?: any) => {
        const key = generateSafeKey(input);

        // key가 존재하면 해당 번역 반환, 없으면 input 그대로 출력
        try {
            const translated = t(key, options);
            if (translated === key) {
                // 번역된 값이 키와 같으면 존재하지 않는 것으로 간주
                return input;
            }
            return translated;
        } catch (err) {
            return input;
        }
    };
}
