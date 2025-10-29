'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { swrFetcher } from "@/lib/function";

interface formData {
    category: string;
    companyName: string;
    manager: string;
    tel: string;
    email: string;
    content: string;
    imageUrl: string;
    createdAt: string;
}

const ViewPage = ({ locale, idx }: { locale: string; idx?: string }) => {
    const pathname = usePathname();
    const currentLocale = useMemo(() => pathname?.split('/')[1], [pathname]);
    const [form, setForm] = useState<formData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!idx || idx === 'new') return;
            try {
                const res = await swrFetcher<formData>(`/${currentLocale}/api/admin/inquiry/one/${idx}`);
                setForm(res);
            } catch (err) {
                alert('문의 정보를 불러오는 데 실패했습니다.');
            }
        };
        fetchData();
    }, [idx, currentLocale]);

    if (!form) return <div className="text-center py-20 text-gray-500">로딩 중...</div>;

    const categoryMap: Record<string, string> = {
        '3d_printing_manufacturing': '적층 제조 - 제작',
        '3d_printing_repair': '적층 제조 - 보수',
        'powder_ni_alloy': '금속 분말 - Ni Alloy',
        'powder_stainless': '금속 분말 - Stainless',
        'etc': '기타',
    };

    // 카드 스타일 통일
    const cardClass = "bg-white p-6 rounded-2xl shadow-md w-full flex flex-col gap-2";

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* 헤더 */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">문의 상세보기</h1>
                <p className="text-gray-500 mt-1 text-sm">고객이 남긴 문의 내용을 확인하세요.</p>
            </div>

            {/* 정보 카드 */}
            <div className="flex flex-col gap-4">
                {/* 문의 유형 + 회사명 */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className={cardClass}>
                        <span className="font-semibold text-gray-600">문의유형</span>
                        <span className="text-gray-800">{categoryMap[form.category] || '기타'}</span>
                    </div>
                    <div className={cardClass}>
                        <span className="font-semibold text-gray-600">회사명</span>
                        <span className="text-gray-800">{form.companyName}</span>
                    </div>
                </div>

                {/* 담당자 + 전화번호 */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className={cardClass}>
                        <span className="font-semibold text-gray-600">담당자</span>
                        <span className="text-gray-800">{form.manager}</span>
                    </div>
                    <div className={cardClass}>
                        <span className="font-semibold text-gray-600">전화번호</span>
                        <span className="text-gray-800">{form.tel}</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    {/* 이메일 */}
                    <div className={cardClass}>
                        <span className="font-semibold text-gray-600">이메일</span>
                        <span className="text-gray-800">{form.email}</span>
                    </div>
                    <div className={cardClass}>
                        <span className="font-semibold text-gray-600">작성일</span>
                        <span className="text-gray-800">{form.createdAt}</span>
                    </div>
                </div>

                {/* 첨부파일 */}
                <div className={cardClass}>
                    <span className="font-semibold text-gray-600">첨부파일</span>
                    <div className="mt-2">
                        {form.imageUrl ? (
                            <img
                                src={form.imageUrl}
                                alt="첨부 이미지"
                                className="w-full max-h-72 object-contain rounded-md border"
                                onError={(e) => {
                                    const target = e.currentTarget;
                                    if (!target.dataset.retried) {
                                        target.dataset.retried = "true";
                                        target.src = `http://localhost:9090${form.imageUrl}`;
                                    }
                                }}
                            />
                        ) : (
                            <span className="text-gray-400">첨부된 파일 없음</span>
                        )}
                    </div>
                </div>

                {/* 문의 내용 */}
                <div className={cardClass}>
                    <span className="font-semibold text-gray-600">문의 내용</span>
                    <div className="mt-2 text-gray-800 whitespace-pre-line min-h-[150px]">
                        {form.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPage;
