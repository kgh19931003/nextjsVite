'use client';

import React, { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import PageHeroAuto from "@/components/user/PageHeroAuto";
import {useSafeTranslations} from "@/lib/intl/useSafeTranslations";

const metalPrinters = [
    {
        src: '3dPrinter_01.png',
        name: '',
        description: 'PBF(Powder Bed Fusion) 방식을 사용하는 대규모/고정밀 금속 분말 3D 프린터입니다.',
    },
    {
        src: '3dPrinter_03.jpg',
        name: '',
        description: '레이저, 냉각기, 공기 청정기, 진공 펌프가 통합된 올인원 시스템이며, 멀티 소재 제조가 가능하도록 설계된 DED(직접 에너지 적층) 방식을 사용하여 금속 부품을 생산하는 산업용 3D 프린터',
    },
    {
        src: '3dPrinter_02.png',
        name: '',
        description: '3D 프린팅 관련 기술 및 재료개발을 통해 교육/기술/산업 등의 다양한 적용이 가능하며 카메라를 통해 실시간으로 적층 높이를 제어 할 수 있는 프린터입니다.',
    },

];


const plasticPrinters = [
    {
        src: 'anycubic_kobra_2_plus.png',
        name: 'anycubic_kobra_2_plus',
        description: '오토 레벨링과 Z 오프셋 조정 기능 및 대형 출력, 고속 프린팅, 자동 레벨링 기능을 갖춘 사용자 친화적',
    },
    {
        src: 'anycubic_kobra_2_max.png',
        name: 'anycubic_kobra_2_max',
        description: '초대형 부품 출력이 가능하며 다품종 출력도 부담 없이 처리 가능한 산업용 프린터',
    },
    {
        src: 'anycubic_photon_m3_max.png',
        name: 'anycubic_photon_m3_max',
        description: '일러스트, 아키텍처 모델, 코스프레용 대형 출력물 등 구현에 적합하며 장시간 프린팅 시 중단 없이 지속 출력 가능',
    },
    {
        src: 'creality_k-1_max.png',
        name: 'creality_k-1_max',
        description: 'G‑sensor 기반 입력 성형(Input Shaping)으로 링잉 감소 및 Z‑밴딩 완화 및 안정적인 출력관리, 원격 클라우드 제어 기능 제공',
    }

];

const metalTaskImages = [
    { src: '/business/threeDsPrinterLamination/cooling_pass_1.png', name: '쿨링 패스' },
    { src: '/business/threeDsPrinterLamination/cylinder_ball.png', name: '실린더 볼' },
    { src: '/business/threeDsPrinterLamination/cylinder_sample.png', name: '실린더 샘플' },
    { src: '/business/threeDsPrinterLamination/impeller.png', name: '임펠러' },
    { src: '/business/threeDsPrinterLamination/tube.png', name: '튜브' },
];

const plasticTaskImages = [
    { src: '/business/threeDsPrinterLamination/cooling_pass_2.png', name: '쿨링 패스' },
    { src: '/business/threeDsPrinterLamination/injector.png', name: '인젝터' },
    { src: '/business/threeDsPrinterLamination/turbin_blade.png', name: '터빈 블레이드' },
    { src: '/business/threeDsPrinterLamination/motor.png', name: '모터' },
];


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





export default function PrintingServices() {
    const t = useSafeTranslations("manufacturing");
    // 1단 탭: 'metal' or 'plastic'
    const [mainTab, setMainTab] = useState<'metal' | 'plastic'>('metal');
    // 2단 탭: 'printers' or 'tasks'
    const [subTab, setSubTab] = useState<'printers' | 'tasks'>('printers');

    // 탭별 제목/내용
    const tabTitles = {
        metal: t('금속'),
        plastic: t('플라스틱'),
    };

    const subTabTitles = {
        printers: t('보유 장비'),
        tasks: t('적용 사례'),
    };

    // 탭에 따른 이미지/과제 리스트 선택
    const images = mainTab === 'metal' ? metalPrinters : plasticPrinters;
    const tasks = mainTab === 'metal' ? metalTaskImages : plasticTaskImages;

    // 이미지 경로 기본 폴더
    const basePath = mainTab === 'metal'
        ? '/business/threeDsPrintingRepair/metalPrinter/'
        : '/business/threeDsPrintingRepair/plasticPrinter/';

    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/producthero_2.png" />

            <main className="max-w-5xl my-10 mx-auto p-8 bg-white rounded  space-y-16 relative">

                {/* 1단 탭 */}
                <div className="flex justify-center mb-8 gap-4">
                    {(['metal', 'plastic'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => {
                                setMainTab(tab);
                                setSubTab('printers');
                            }}
                            type="button"
                            className={`px-6 py-2 rounded-full border font-medium shadow-sm transition-all duration-200
        ${
                                mainTab === tab
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-400'
                            }`}
                        >
                            {tabTitles[tab]}
                        </button>
                    ))}
                </div>

                {/* 2단 탭 */}
                <div className="flex  mb-6  border-b border-gray-300">
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
                {subTab === 'printers' && (
                    <div className="flex flex-col gap-6">
                        {images.map(({src, name, description}, idx) => (
                            <div
                                key={idx}
                                className="flex w-full py-10 border-b-1 border-gray-200 justify-center  rounded overflow-hidden bg-white dark:bg-neutral-800 "
                            >
                                <div className="w-2/5 justify-center items-center flex">
                                    <img
                                        src={`${basePath}${src}`}
                                        alt={name}
                                        className="object-cover w-3/5 max-w-[300px] h-auto min-h-[200px]"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-6 flex flex-col justify-center w-3/5">


                                    {src === '3dPrinter_01.png' && <CommonPrinterTable
                                        typeColumn={true}
                                        name={{ typeName: 'L-PBF', modelName: 'AnyX-250', makerName: 'CSCAM' }}
                                        sizeTypeName="Build Volume (mm)"
                                        stroke={{ x: 250, y: 250, z: 200 }}
                                    /> }

                                    {src === '3dPrinter_03.jpg' && <CommonPrinterTable
                                        typeColumn={true}
                                        name={{ typeName: 'DED', modelName: 'MX-Fab', makerName: 'InssTek' }}
                                        sizeTypeName="Build Volume (mm)"
                                        stroke={{ x: 500, y: 600, z: 385 }}
                                    /> }

                                    {src === '3dPrinter_02.png' && <CommonPrinterTable
                                        typeColumn={true}
                                        name={{ typeName: 'DED', modelName: 'MX-Lab', makerName: 'InssTek' }}
                                        sizeTypeName="Build Volume (mm)"
                                        stroke={{ x: 150, y: 150, z: 150 }}
                                    /> }



                                    {src === 'anycubic_kobra_2_plus.png' && <CommonPrinterTable
                                        typeColumn={false}
                                        name={{ modelName: 'Kobra 2 Plus', makerName: 'Anycubic' }}
                                        sizeTypeName="Build Volume (mm)"
                                        stroke={{ x: 320, y: 320, z: 400 }}
                                    /> }

                                    {src === 'anycubic_kobra_2_max.png' && <CommonPrinterTable
                                        typeColumn={false}
                                        name={{ modelName: 'Kobra 2 Max', makerName: 'Anycubic' }}
                                        sizeTypeName="Build Volume (mm)"
                                        stroke={{ x: 420, y: 420, z: 500 }}
                                    /> }

                                    {src === 'anycubic_photon_m3_max.png' && <CommonPrinterTable
                                        typeColumn={false}
                                        name={{ modelName: 'Photon M3 Max', makerName: 'Anycubic' }}
                                        sizeTypeName="Build Volume (mm)"
                                        stroke={{ x: 298, y: 164, z: 300 }}
                                    /> }



                                    {src === 'creality_k-1_max.png' && <CommonPrinterTable
                                        typeColumn={false}
                                        name={{ modelName: 'Creality K1 Max', makerName: 'Creality' }}
                                        sizeTypeName="Build Volume (mm)"
                                        stroke={{ x: 300, y: 300, z: 300 }}
                                    /> }



                                </div>
                            </div>
                        ))}
                    </div>
                )}


                {subTab === 'tasks' && (
                    <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {(mainTab === 'metal' ? metalTaskImages : plasticTaskImages).map(({src, name}, idx) => (
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

                                {/*<div className="my-2 text-center text-gray-500 dark:text-gray-300 font-medium">{name}</div>*/}
                            </div>
                        ))}
                    </div>
                )}


            </main>
        </>
    );
}
