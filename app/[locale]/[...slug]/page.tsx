// app/[locale]/[...slug]/Form.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import * as UserPages from '@/components/user';

// URL 세그먼트 배열 → PascalCase 변환
function toComponentNameFromSlug(slug: string[]) {
    return slug
        .map(seg =>
            seg
                .split(/[-_]/g)
                .map(p => p.charAt(0).toUpperCase() + p.slice(1))
                .join('')
        )
        .join('');
}


export const metadata = {
    title: "Portfolio",
    description: "고부가가치 금속을 재활용하여 산업의 재활성화를 도모하는 Portfolio(Portfolio)입니다."
};

interface PageProps {
    params: Promise<{ locale: string; slug: string[] }>;
}

export default async function Page({ params }: PageProps) {
    const { locale, slug } = await params;

    if (!slug || slug.length === 0) notFound();

    const slugForComponent = [...slug];
    let idx: string | undefined;

    const last = slugForComponent[slugForComponent.length - 1];

    // 숫자, "new", "draft" 등을 idx로 처리
    if (/^\d+$/.test(last) || ['new', 'draft'].includes(last.toLowerCase())) {
        idx = last;
        slugForComponent.pop(); // 컴포넌트 이름에서는 제거
    }

    const componentName = toComponentNameFromSlug(slugForComponent);
    const Pages = UserPages as Record<string, React.ComponentType<any>>;
    const PageComponent = Pages[componentName];

    if (!PageComponent) {
        console.error(
            `[Dynamic Route] Unknown path "${slug.join('/')}" -> "${componentName}" not exported in "@/components/user".`
        );
        notFound();
    }

    // locale + idx props로 전달
    return <PageComponent locale={locale} idx={idx} />;
}
