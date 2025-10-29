'use client';

import React, { useState } from 'react';
import PageHeroAuto from "@/components/user/PageHeroAuto";

const alloyData = {
    'Stainless': {
        title: 'Alloy 930',
        description: `Alloy 930은 고온 내산화성 및 내열 크리프 특성이 뛰어난 니켈 기반 초합금으로, 터빈 블레이드 및 항공우주 분야에 주로 사용됩니다.`,
        features: [
            '최대 사용 온도 900°C 이상',
            '우수한 내산화 및 크리프 저항성',
            '적층제조용 분말 공급 가능',
        ],
        image: '/product/alloy_930.jpg',
    },

};


export default function AlloyIntroduction() {
    const [selectedAlloy, setSelectedAlloy] = useState<'Stainless'>('Stainless');
    const alloy = alloyData[selectedAlloy];

    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/techhero.jpg" />
            <main className="max-w-6xl mx-auto my-10 mb-30 p-3 bg-white rounded  space-y-16">


            </main>
        </>
    );
}
