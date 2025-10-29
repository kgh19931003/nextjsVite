'use client';

import React, { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import PageHeroAuto from '@/components/user/PageHeroAuto';
import {useSafeTranslations} from "@/lib/intl/useSafeTranslations";

const printerData = {
    metal: {
        printers: [
            {
                src: '3dPrinter_03.jpg',
                name: 'MX-Fab DED',
                description: '레이저, 냉각기, 공기 청정기, 진공 펌프가 통합된 올인원 시스템이며, 멀티 소재 제조가 가능하도록 설계된 DED(직접 에너지 적층) 방식을 사용하여 금속 부품을 생산하는 산업용 3D 프린터',
            },
            {
                src: 'creaform_handyscan_silver_transparent.png',
                name: 'Creaform HandySCAN 3D | SILVER Series',
                description: 'HandySCAN Silver 시리즈는 휴대 가능하면서도 고정밀 포터블 3D 스캐닝을 지원하는 모델로, 산업용 계측 및 리버스 엔지니어링에 주로 사용',
            },
        ],
        tasks: [


        ],
        basePath: '/business/threeDsPrintingRepair/metalPrinter/',
    },
    plastic: {
        printers: [],
        tasks: [
            { src: '/business/threeDsPrinterLamination/cooling_pass_2.png', name: '쿨링 패스' },
            { src: '/business/threeDsPrinterLamination/injector.png', name: '인젝터' },
        ],
        basePath: '/business/threeDsPrintingRepair/plasticPrinter/',
    },
};


interface commonTableProps {
    typeColumn: boolean
    name: {typeName?: string; modelName: string; makerName: string;}
    sizeTypeName: string;
    stroke: { x: number; y: number; z: number };
}

function CommonPrinterTable({ typeColumn, name, sizeTypeName, stroke }: commonTableProps) {
    return (
        <div className="  my-10">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-green-100">
                    { typeColumn && <th className="border border-gray-300 px-4 py-2">Type</th>}
                    <th className="border border-gray-300 px-4 py-2">Model</th>
                    <th className="border border-gray-300 px-4 py-2">Maker</th>
                    <th className="border border-gray-300 px-4 py-2" colSpan={3}>{sizeTypeName}</th>
                </tr>
                </thead>
                <tbody>
                <tr className="">
                    { typeColumn && <td className="border border-gray-300 px-4 py-2 text-center" rowSpan={2}>{name.typeName}</td>}
                    <td className="border border-gray-300 px-4 py-2 text-center" rowSpan={2}>{name.modelName}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center" rowSpan={2}>{name.makerName}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center">X</td>
                    <td className="border border-gray-300 px-2 py-1 text-center">Y</td>
                    <td className="border border-gray-300 px-2 py-1 text-center">Z</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-2 py-2 text-center">{stroke.x}</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">{stroke.y}</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">{stroke.z}</td>
                </tr>

                </tbody>
            </table>
        </div>
    );
}



interface scanTableProps {
    name: {typeName?: string; modelName: string; makerName: string; Characteristic: string;}
    sizeTypeName: string;
}

function ScanPrinterTable({ name, sizeTypeName }: scanTableProps) {
    return (
        <div className="  my-10">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-green-100">
                    <th className="border border-gray-300 px-4 py-2">Model</th>
                    <th className="border border-gray-300 px-4 py-2">Maker</th>
                    <th className="border border-gray-300 px-4 py-2" colSpan={3}>{sizeTypeName}</th>
                </tr>
                </thead>
                <tbody>
                <tr className="">
                    <td className="border border-gray-300 px-2 py-2 text-center text-sm" rowSpan={2}>{name.modelName}</td>
                    <td className="border border-gray-300 px-2 py-2 text-center text-sm" rowSpan={2}>{name.makerName}</td>
                    <td className="border border-gray-300 px-2 py-2 text-center text-sm" rowSpan={2}>{name.Characteristic}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}


export default function PrintingServices() {
    const t = useSafeTranslations("repair");
    const [mainTab, setMainTab] = useState<'metal' | 'plastic'>('metal');
    const [subTab, setSubTab] = useState<'printers' | 'tasks'>('printers');

    const currentData = printerData[mainTab];
    const { printers, tasks, basePath } = currentData;

    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/repair.png" />

            <main className="max-w-6xl my-20 mx-auto p-8 bg-white rounded space-y-16 relative">


                {/* Sub Tab Navigation */}
                <div className="flex mb-6 space-x-4 border-b border-gray-300">
                    {(['printers', 'tasks'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setSubTab(tab)}
                            className={`px-4 py-1 text-lg font-medium transition ${
                                subTab === tab
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab === 'printers' ? t('보유 장비') : t('적용 사례')}
                        </button>
                    ))}
                </div>

                {/* Content by Sub Tab */}
                {subTab === 'printers' && (
                    <div className="flex flex-col gap-6">
                        {printers.map(({ src, name, description }, idx) => (
                            <div
                                key={idx}
                                className="flex w-full py-10 border-b border-gray-200 justify-center cursor-zoom-in rounded overflow-hidden bg-white dark:bg-neutral-800"
                            >
                                <div className="w-2/6 justify-center items-center flex">
                                    <img
                                        src={`${basePath}${src}`}
                                        alt={name}
                                        className="object-cover w-3/6 max-w-[300px] h-auto min-h-[200px]"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-6 flex flex-col justify-center w-4/6">

                                    {src === '3dPrinter_03.jpg' && <CommonPrinterTable
                                        typeColumn={true}
                                        name={{ typeName: 'DED', modelName: 'MX-Fab', makerName: 'InssTek' }}
                                        sizeTypeName="Stroke (mm)"
                                        stroke={{ x: 500, y: 600, z: 385 }}
                                    /> }

                                    {src === 'creaform_handyscan_silver_transparent.png' && <ScanPrinterTable
                                        name={{ modelName: 'HandySCAN 3D', makerName: 'CREAFORM', Characteristic: 'Accuracy : Up to 0.030 mm, ' +
                                                'Volumetric accuracy : 0.020 ± 0.060 mm/m' }}
                                        sizeTypeName="Characteristic"
                                    /> }

                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {subTab === 'tasks' && (
                    <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {tasks.map(({ src, name }, idx) => (
                            <div
                                key={idx}
                                className="overflow-hidden rounded shadow-md hover:scale-105 transition-transform  flex flex-col items-center"
                            >

                                    <div className="h-[180px] w-full flex items-center justify-center bg-white">
                                        <img
                                            src={src}
                                            alt={`${mainTab} task image ${idx + 1}`}
                                            className="h-[160px] object-contain"
                                            loading="lazy"
                                        />
                                    </div>

                                <div className="my-2 text-center text-gray-500 dark:text-gray-300 font-medium">{name}</div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}
