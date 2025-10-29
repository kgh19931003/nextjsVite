'use client';

import React from 'react';
import PageHeroAuto from "@/components/user/PageHeroAuto";

export default function AdditiveRepair() {
    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/repairhero.jpg" />

            <main className="max-w-5xl mx-auto p-8 my-20 bg-white rounded shadow-md">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
                적층수리 (Additive Repair) 소개
            </h1>

            <section className="mb-8 space-y-6 text-gray-800 leading-relaxed">
                <p>
                    적층수리(Additive Repair)는 3D 프린팅 기술을 활용하여 손상된 부품이나 제품을
                    정밀하게 수리하는 혁신적인 방법입니다. 기존의 부품 교체나 용접 방식과 달리,
                    필요한 부분만 선택적으로 증착하여 원래의 기능과 강도를 회복할 수 있습니다.
                </p>

                <p>
                    이 기술은 항공우주, 자동차, 산업용 기계 등 고가의 정밀 부품이 사용되는 분야에서
                    비용 절감과 신속한 수리를 가능하게 하여, 유지보수 효율성을 크게 향상시키고 있습니다.
                </p>

                <p>
                    적층수리는 다음과 같은 장점을 가지고 있습니다:
                </p>

                <ul className="list-disc list-inside space-y-2">
                    <li>정밀하고 맞춤화된 수리 가능</li>
                    <li>부품 폐기 및 교체 비용 절감</li>
                    <li>복잡한 형상의 부품에도 적용 가능</li>
                    <li>친환경적인 수리 방법</li>
                    <li>신속한 현장 수리 지원</li>
                </ul>

                <p>
                    최신 적층수리 장비와 소재를 통해, 기존 수리 한계를 극복하고 고성능 부품의
                    수명을 연장할 수 있습니다. 당사의 전문 엔지니어팀이 맞춤형 수리 솔루션을
                    제공합니다.
                </p>
            </section>

            <section>
                <img
                    src="/images/additive-repair.jpg"
                    alt="적층수리 3D 프린터 이미지"
                    className="w-full rounded shadow-md mb-6"
                    loading="lazy"
                />

                <p className="text-center text-sm text-gray-500 italic">
                    적층수리 작업 현장 이미지
                </p>
            </section>

            <section className="mt-10">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">문의 및 상담</h2>
                <p>
                    적층수리에 대해 궁금하신 사항이 있으시면 언제든지 연락 주세요.
                    전문가가 친절하게 상담해드립니다.
                </p>
                <button
                    onClick={() => alert('문의 페이지로 이동 예정')}
                    className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    type="button"
                >
                    상담 신청하기
                </button>
            </section>
        </main>
            </>
    );
}
