'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import React, { useEffect, useState } from 'react';
import PageHeroAuto from "@/components/user/PageHeroAuto";
import {swrFetcher} from "@/lib/function";
import {useLocale} from "next-intl";

interface PolicyItem {
    idx: number;
    type: string;
    content: string;
}

export default function TermsPage() {
    const searchParams = useSearchParams();
    const locale = useLocale();
    const [currentLocale, setCurrentLocale] = useState(locale);

    const type = searchParams.get('type') || '';
    const [policy, setPolicy] = useState<PolicyItem>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPolicy() {
            setLoading(true);
            setError(null);
            try {
                const res = await swrFetcher(
                    `/${currentLocale}/api/policy/one?language=${currentLocale}&type=email`,
                    { method: 'GET' }
                );

                console.log(res);

                setPolicy(res);
            } catch (err) {
                setError('약관을 불러오는 중 오류가 발생했습니다.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchPolicy();
    }, [currentLocale]);

    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/techhero.jpg" />

            <div className="max-w-5xl mx-auto px-4 py-20">

                {loading && <p>로딩 중...</p>}
                {error && !loading && <p>{error}</p>}
                {!loading && !error && !policy && (
                    <p className="text-center py-20">약관 정보가 없습니다.</p>
                )}
                {!loading && !error && policy && (
                    <>
                        <div key={policy.idx} className="mb-4" dangerouslySetInnerHTML={{ __html: policy.content }}>

                        </div>
                    </>
                )}
            </div>
        </>
    );
}
