'use client';

import React from 'react';
import PageHeroAuto from "@/components/user/PageHeroAuto";

export default function AlloyIntroduction() {
    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/producthero.jpg"/>
            <main className="max-w-6xl mx-auto my-20 p-8 bg-white rounded shadow space-y-16">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900">
                        특수 합금 소재 소개 (Ni Alloy , STS)
                    </h1>
                    <p className="text-lg text-gray-600">
                        고온·고강도 환경에 최적화된 산업용 니켈 기반 초합금
                    </p>
                </header>



                <section className="space-y-12">

                    {/* Ni Alloy */}
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <img src="/product/ni_alloy.jpg" alt="Ni Alloy" className="w-full rounded shadow" />
                        <div>
                            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Ni Alloy (니켈 합금)</h2>
                            <p className="text-gray-700 mb-4">
                                니켈 합금은 **우수한 내식성, 내열성, 기계적 강도**를 지닌 고성능 금속 소재로, 항공우주, 화학 공정,
                                발전 설비 등 극한 환경에 널리 활용됩니다.
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                                <li>고온 산화 및 부식 저항성이 뛰어남</li>
                                <li>열충격에 강하고 크리프 성능 우수</li>
                                <li>주요 합금군: Inconel, Hastelloy, Monel 등</li>
                                <li>적층제조용 분말로도 다양하게 공급</li>
                            </ul>
                        </div>
                    </div>

                    {/* Stainless.tsx Steel */}
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <img src="/product/stainless_steel.jpg" alt="Stainless Steel" className="w-full rounded shadow" />
                        <div>
                            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Stainless Steel (스테인리스강)</h2>
                            <p className="text-gray-700 mb-4">
                                스테인리스강은 **부식에 강하고 가공이 용이한 범용 금속 재료**로, 식품가공, 의료기기, 자동차, 산업용
                                구조물에 폭넓게 사용됩니다.
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                                <li>크롬 함량이 10.5% 이상으로 내식성 우수</li>
                                <li>열처리 및 가공을 통한 기계적 성질 조절 가능</li>
                                <li>대표 강종: 316L, 304L, 17-4PH 등</li>
                                <li>적층제조용 파우더로 매우 보편적 사용</li>
                            </ul>
                        </div>
                    </div>

                </section>


            </main>
        </>
    );
}
