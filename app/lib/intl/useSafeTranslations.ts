import { useTranslations } from 'next-intl';
import { generateSafeKey } from '@/lib/function';

export function useSafeTranslations(namespace?: string) {
    const t = useTranslations(namespace);

    return (input: string, options?: any) => {
        // 밑줄을 점(.)으로 치환
        const safeString = input ?? '';
        const key = safeString.replace(/\./g, '_');

        try {
            const translated = t(key as any, options);
            //console.log("translated : "+translated)
            // 번역값이 key와 같으면 원문 반환
            if (translated === key || translated === `${namespace}.${key}`) {
                return input;
            }
            return translated;
        } catch {
            return input;
        }
    };
}