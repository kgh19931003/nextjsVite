// TranslationProvider.tsx (Context 제공자)
'use client';
import { createContext, useContext } from 'react';
import { useSafeTranslations } from '@/lib/intl/useSafeTranslations';

const TranslationContext = createContext<(key: string, opts?: any) => string>(() => '');

export function TranslationProvider({ namespace = 'main', children }: { namespace?: string; children: React.ReactNode }) {
    const t = useSafeTranslations(namespace);
    return <TranslationContext.Provider value={t}>{children}</TranslationContext.Provider>;
}

export function useT() {
    const ctx = useContext(TranslationContext);
    if (!ctx) throw new Error('useT must be used within TranslationProvider');
    return ctx;
}
