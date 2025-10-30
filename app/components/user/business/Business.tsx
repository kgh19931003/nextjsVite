'use client'

import { Metadata } from 'next';
import { Section } from '@/components/user/common/Section';
import { FeatureGrid } from '@/components/user/common/FeatureGrid';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from "next/link";
import PageHeroAuto from "@/components/user/PageHeroAuto";
import React from "react";

export const metadata: Metadata = {
    title: '사업소개',
    description: '(주) Portfolio의 주요 사업 영역을 소개합니다.',
};

export default function BusinessPage() {
    const reasons = [
        '10년 이상의 재활용 기술 노하우와 고도화된 공정',
        '투명한 정산 및 실시간 처리 현황 제공 시스템',
        '친환경 공정을 통한 탄소 배출 최소화',
        '전문 연구진 기반의 품질 분석 및 맞춤형 컨설팅',
    ];

    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/businesshero_2.jpg"/>

            <Section title="주요 사업 영역" subtitle="당사의 전문성을 확인해보세요.">
                <FeatureGrid
                    items={[
                        {
                            title: '귀금속 재활용',
                            desc: '산업 부산물 및 폐기물에서 금, 은, 팔라듐 등 귀금속을 정밀 추출합니다.',
                        },
                        {
                            title: '희소금속 회수',
                            desc: '전자부품, 촉매 등에서 리튬, 코발트, 니켈 등 고부가가치 금속을 효율적으로 회수합니다.',
                        },
                        {
                            title: '정밀 분석 서비스',
                            desc: '최신 분석장비로 구성된 연구소에서 정확한 금속 함량 및 가치를 측정합니다.',
                        },
                    ]}
                />
            </Section>

            <Section title="신소재 정밀 처리 기술" subtitle="고온 합금 및 초합금도 정밀하게 처리합니다.">
                <div className="space-y-12 max-w-4xl mx-auto mt-8 text-gray-700 dark:text-gray-200 text-base leading-relaxed">

                    <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-gray-100 dark:border-neutral-700 shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-brand-600 mb-2">Alloy 230</h3>
                        <p>
                            Alloy 230은 고온 산화 및 탄화에 대한 탁월한 저항성을 가진 니켈-크롬 기반 초합금입니다.
                            고온 환경에서 기계적 강도와 내식성을 유지하기 때문에 화학공정, 열처리로 부품, 연소기 내부 부품 등에 활용됩니다.
                        </p>
                        <p className="mt-3">
                            Portfolio는 고온 특수합금인 Alloy 230의 재활용 및 귀금속 회수를 위한 전처리 공정 및 열분해 기술을 보유하고 있으며,
                            구성 성분의 손실 없이 고순도 회수를 실현합니다.
                        </p>
                    </div>

                    <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-gray-100 dark:border-neutral-700 shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-brand-600 mb-2">Alloy 939</h3>
                        <p>
                            Alloy 939는 주조형 니켈 기반 초합금으로서, 고온 크리프 강도 및 피로 수명이 뛰어나 항공우주, 가스터빈 블레이드 등 극한 환경에 사용됩니다.
                            내산화성 및 고온 안정성이 매우 우수합니다.
                        </p>
                        <p className="mt-3">
                            Portfolio는 Alloy 939와 같은 고내열 합금의 표면 오염물 제거 및 정밀 성분 분석을 통해,
                            회수 가능한 희소금속 (예: 니켈, 코발트 등)의 효율적인 추출을 지원하고 있습니다.
                        </p>
                    </div>

                </div>
            </Section>

            <Section title="왜 Portfolio인가?" subtitle="다음의 이유로 고객들은 Portfolio를 선택합니다.">
                <ul className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
                    {reasons.map((reason, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15, ease: 'easeOut' }}
                            className="flex items-start gap-5 p-6 bg-white rounded-xl border border-gray-100 shadow-sm
                                       hover:shadow-lg transition-shadow duration-300 cursor-default select-none"
                        >
                            <CheckCircle className="w-7 h-7 text-green-500 flex-shrink-0 mt-1" />
                            <p className="text-gray-800 text-base leading-relaxed font-medium">{reason}</p>
                        </motion.li>
                    ))}
                </ul>
            </Section>

            <Section title="사업 문의">
                <Link href="/contact" passHref legacyBehavior>
                    <a
                        className="block max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-transparent
                                   transition-shadow duration-300 hover:shadow-xl hover:border-brand-500 cursor-pointer
                                   focus:outline-none focus:ring-4 focus:ring-brand-300 text-center"
                        aria-label="문의 페이지로 이동"
                    >
                        <h3 className="flex justify-center items-center text-2xl font-semibold text-brand-600 mb-6 gap-4">
                            <span role="img" aria-label="전화 아이콘">📞</span> 문의 및 상담
                        </h3>
                        <p className="mb-6 text-gray-700 leading-relaxed text-lg">
                            자세한 사업 정보나 협업 문의는 아래 연락처 또는 문의 페이지를 통해 연락 부탁드립니다.
                        </p>
                        <p className="text-sm text-gray-600 space-y-1">
                            <span>📧 contact@Portfolionology.co.kr</span><br />
                            <span>☎️ 055-724-0426</span>
                        </p>
                        <div className="mt-8 inline-block text-brand-600 font-semibold underline tracking-wide text-lg">
                            문의 페이지로 이동 →
                        </div>
                    </a>
                </Link>
            </Section>
        </>
    );
}
