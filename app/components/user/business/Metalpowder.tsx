'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import PageHeroAuto from '@/components/user/PageHeroAuto';
import React from 'react';
import Zoom from "react-medium-image-zoom";

export const metadata: Metadata = {
    title: '사업소개',
    description: '(주) 갓테크의 주요 사업 영역을 소개합니다.',
};

const alloys = [
    {
        name: 'Alloy 939',
        image: '/business/metalPowder/alloy_939_100um.png', // public 폴더 기준 경로
        description: '고온 강도와 산화 저항성이 뛰어난 니켈 기반 초합금으로, 터빈 블레이드 및 고온 부품에 사용됩니다.',
    },
    {
        name: 'Alloy 230',
        image: '/business/metalPowder/alloy_230_100um.png',
        description: '우수한 내산화성과 고온 강도를 지닌 니켈-크롬-텅스텐 합금으로, 열처리 장비 및 고온 구조물에 적합합니다.',
    },
    {
        name: 'Alloy 625',
        image: '/business/metalPowder/alloy_625_100um.png',
        description: '내식성과 강도 균형이 뛰어나 해양 구조물, 화학 공정 및 고압 환경에서 널리 사용됩니다.',
    },
    {
        name: 'Alloy 718',
        image: '/business/metalPowder/alloy_718_100um.png',
        description: '고온 크리프 및 피로 특성이 우수하며 항공우주 및 원자력 산업에 사용되는 대표적인 초합금입니다.',
    },
];

export default function BusinessPage() {
    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/businesshero_2.jpg" />

            <section className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">프리미엄 합금 재활용 대상</h2>

                <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {alloys.map((alloy, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center transition hover:shadow-lg"
                        >
                            <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">

                                    <Image
                                        src={alloy.image}
                                        alt={alloy.name}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                    />


                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-900">{alloy.name}</h3>
                            <p className="text-sm text-gray-600">{alloy.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
