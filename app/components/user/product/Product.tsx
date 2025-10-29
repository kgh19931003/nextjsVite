'use client';

import React from 'react';
import Head from "next/head";
import PageHeroAuto from "@/components/user/PageHeroAuto";

export default function AdditiveManufacturingProduct() {
    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/producthero.jpg"/>
        <main className="max-w-6xl mx-auto my-20 p-8 bg-white rounded shadow space-y-16">
            <header className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">
                    적층제조 (Additive Manufacturing) 제품 소개
                </h1>
                <p className="text-lg text-gray-600">
                    혁신적인 설계와 생산을 가능케 하는 차세대 적층제조 기술
                </p>
            </header>

            {/* 소개 섹션 */}
            <section className="grid md:grid-cols-2 gap-8 items-center">
                <img
                    src="/product/am_printer.png"
                    alt="적층제조 3D 프린터"
                    className="w-full rounded shadow-lg"
                />
                <div>
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">제품 특징</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>복잡한 형상을 손쉽게 구현 가능</li>
                        <li>재료 낭비 최소화, 친환경 제조</li>
                        <li>설계-시제품-생산까지 통합 프로세스 지원</li>
                        <li>금속, 플라스틱, 복합소재까지 다양한 소재 지원</li>
                        <li>다품종 소량생산에 최적화</li>
                    </ul>
                </div>
            </section>

            {/* 기술 사양 */}
            <section className="bg-gray-50 p-6 rounded shadow-inner">
                <h2 className="text-xl font-bold mb-4 text-gray-800">기술 사양</h2>
                <table className="w-full text-left text-sm text-gray-700 table-auto">
                    <tbody>
                    <tr className="border-b">
                        <th className="py-2 pr-4 font-medium">제조 방식</th>
                        <td>Powder Bed Fusion, Material Extrusion</td>
                    </tr>
                    <tr className="border-b">
                        <th className="py-2 pr-4 font-medium">지원 재료</th>
                        <td>티타늄, 알루미늄, 스테인리스, 나일론, PLA, PEEK 등</td>
                    </tr>
                    <tr className="border-b">
                        <th className="py-2 pr-4 font-medium">최대 제작 크기</th>
                        <td>300 × 300 × 400 mm</td>
                    </tr>
                    <tr>
                        <th className="py-2 pr-4 font-medium">정밀도</th>
                        <td>±0.05 mm</td>
                    </tr>
                    </tbody>
                </table>
            </section>

            {/* 활용 사례 */}
            <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">주요 활용 분야</h2>
                <div className="grid md:grid-cols-3 gap-6 text-gray-700 text-sm">
                    <div className="bg-white border rounded shadow p-4">
                        <h3 className="font-bold text-blue-600 mb-2">항공/우주</h3>
                        <p>복잡한 엔진 부품 및 경량 구조물 제작</p>
                    </div>
                    <div className="bg-white border rounded shadow p-4">
                        <h3 className="font-bold text-blue-600 mb-2">의료</h3>
                        <p>환자 맞춤형 임플란트 및 수술 가이드</p>
                    </div>
                    <div className="bg-white border rounded shadow p-4">
                        <h3 className="font-bold text-blue-600 mb-2">산업/자동차</h3>
                        <p>생산 라인 부품, 금형, 툴링 제작</p>
                    </div>
                </div>
            </section>

            {/* 상담 */}
            <section className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">문의 및 상담</h2>
                <p className="text-gray-700 mb-4">
                    적층제조 솔루션 및 장비 도입에 대해 더 궁금하신가요?
                </p>
                <button
                    onClick={() => alert('문의 페이지로 이동 예정')}
                    className="px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    상담 신청하기
                </button>
            </section>
        </main>
            </>
    );
}
