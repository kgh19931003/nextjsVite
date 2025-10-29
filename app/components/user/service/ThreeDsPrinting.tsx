'use client';

import React, { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import PageHeroAuto from "@/components/user/PageHeroAuto";

const metalPrinters = [
    {
        src: '3dPrinter_01.png',
        name: '금속 프린터 A',
        description: '고성능 적층 제조가 가능한 금속 프린터입니다.',
    },
    {
        src: '3dPrinter_02.png',
        name: '금속 프린터 B',
        description: '정밀도가 높은 금속 부품 제작용 프린터입니다.',
    },
    {
        src: '3dPrinter_03.jpg',
        name: '금속 프린터 C',
        description: '대형 부품 적층에 적합한 산업용 프린터입니다.',
    },
];
const metalTasks = [
    "항공기 부품 적층 제조",
    "자동차 엔진 부품 제작",
    "의료용 맞춤형 임플란트 제작",
];


const plasticPrinters = [
    {
        src: 'anycubic_kobra_2_plus.png',
        name: 'anycubic_kobra_2_plus',
        description: '고성능 적층 제조가 가능한 금속 프린터입니다.',
    },
    {
        src: 'anycubic_photon_m3_max.png',
        name: 'anycubic_photon_m3_max',
        description: '정밀도가 높은 금속 부품 제작용 프린터입니다.',
    },
    {
        src: 'creality_k-1_max.png',
        name: 'creality_k-1_max',
        description: '대형 부품 적층에 적합한 산업용 프린터입니다.',
    },
    {
        src: 'anycubic_kobra_2_max.png',
        name: 'anycubic_kobra_2_max',
        description: '대형 부품 적층에 적합한 산업용 프린터입니다.',
    },
];

const plasticTasks = [
    "신속한 프로토타입 제작",
    "소규모 맞춤 부품 생산",
    "디자인 검증용 시제품 제작",
];

export default function PrintingServices() {
    // 1단 탭: 'metal' or 'plastic'
    const [mainTab, setMainTab] = useState<'metal' | 'plastic'>('metal');
    // 2단 탭: 'printers' or 'tasks'
    const [subTab, setSubTab] = useState<'printers' | 'tasks'>('printers');

    // 탭별 제목/내용
    const tabTitles = {
        metal: '금속',
        plastic: '플라스틱',
    };

    const subTabTitles = {
        printers: '보유장비',
        tasks: '수행 과제',
    };

    // 탭에 따른 이미지/과제 리스트 선택
    const images = mainTab === 'metal' ? metalPrinters : plasticPrinters;
    const tasks = mainTab === 'metal' ? metalTasks : plasticTasks;

    // 이미지 경로 기본 폴더
    const basePath = mainTab === 'metal'
        ? '/service/threeDsPrinting/metalPrinter/'
        : '/service/threeDsPrinting/plasticPrinter/';

    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/techhero.jpg" />

            <main className="max-w-5xl my-20 mx-auto p-8 bg-white rounded shadow-md space-y-16 relative">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
                    3D 프린팅 서비스 소개
                </h1>

                {/* 1단 탭 */}
                <div className="flex justify-center mb-8 space-x-6">
                    {(['metal', 'plastic'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => { setMainTab(tab); setSubTab('printers'); }}
                            className={`px-6 py-2 rounded-md font-semibold transition 
                ${mainTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            type="button"
                        >
                            {tabTitles[tab]}
                        </button>
                    ))}
                </div>

                {/* 2단 탭 */}
                <div className="flex  mb-12 space-x-4 border-b border-gray-300">
                    {(['printers', 'tasks'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setSubTab(tab)}
                            className={`px-4 py-1 text-lg font-medium transition
                ${subTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            type="button"
                        >
                            {subTabTitles[tab]}
                        </button>
                    ))}
                </div>

                {/* 2단 탭 내용 */}
                {/* 2단 탭 내용 */}
                {subTab === 'printers' && (
                    <div className="flex flex-col gap-6">
                        {images.map(({ src, name, description }, idx) => (
                            <div
                                key={idx}
                                className="flex w-full py-10 justify-center cursor-zoom-in rounded overflow-hidden bg-white dark:bg-neutral-800 "
                            >

                                    <img
                                        src={`${basePath}${src}`}
                                        alt={name}
                                        className="object-cover w-3/5 h-auto min-h-[200px]"
                                        loading="lazy"
                                    />

                                <div className="p-6 flex flex-col justify-center w-2/5">
                                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{name}</h3>
                                    <p className="text-gray-700 dark:text-gray-300">{description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}


                {subTab === 'tasks' && (
                    <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg max-w-3xl mx-auto">
                        {tasks.map((task, idx) => (
                            <li key={idx}>{task}</li>
                        ))}
                    </ul>
                )}


            </main>
        </>
    );
}
