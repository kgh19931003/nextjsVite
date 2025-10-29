'use client';

import React from 'react';
import PageHeroAuto from "@/components/user/PageHeroAuto";

export default function ThreeDScanning() {
    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/techhero.jpg" />

            <main className="max-w-5xl my-20 mx-auto p-8 bg-white rounded shadow-md">
            <h1 className="text-4xl font-bold mb-6 text-center text-teal-700">
                3D 스캔 기술 소개
            </h1>

            <section className="mb-8 text-gray-800 leading-relaxed space-y-6">
                <p>
                    3D 스캔은 현실 세계의 물체를 디지털 데이터로 변환하는 기술로, 정밀한
                    3차원 모델을 생성하는 데 사용됩니다. 산업 디자인, 의료, 고고학, 제조 등
                    다양한 분야에서 핵심적인 역할을 하고 있습니다.
                </p>

                <p>
                    최신 3D 스캐너는 레이저, 구조광, 포토그래메트리 등 다양한 방식으로
                    물체의 형상과 표면 정보를 고해상도로 캡처합니다. 이렇게 획득한 데이터는
                    CAD 모델링, 품질 검사, 맞춤형 제작 등에 활용됩니다.
                </p>

                <ul className="list-disc list-inside space-y-2">
                    <li>고정밀 측정을 위한 비접촉식 데이터 수집</li>
                    <li>복잡한 형상의 신속한 디지털화</li>
                    <li>3D 프린팅과 연계한 맞춤형 제조 지원</li>
                    <li>역설계 및 품질 관리 프로세스 강화</li>
                    <li>다양한 산업 분야에서 활용 가능</li>
                </ul>

                <p>
                    3D 스캔은 물체의 디지털 트윈을 생성하여, 설계와 제조 과정의 효율성을
                    극대화하며 혁신적인 제품 개발을 가능하게 합니다.
                </p>
            </section>

            {/* 이미지 갤러리 */}
            <section className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <img
                    src="/service/threeDsPrinting/metalPrinter/3dPrinter_01.png"
                    alt="3D 스캔 장비 이미지 1"
                    className="rounded shadow-md object-cover w-full h-48"
                    loading="lazy"
                />
                <img
                    src="/service/threeDsPrinting/metalPrinter/3dPrinter_02.png"
                    alt="3D 스캔 장비 이미지 2"
                    className="rounded shadow-md object-cover w-full h-48"
                    loading="lazy"
                />
                <img
                    src="/service/threeDsPrinting/3dPrinter_03.png"
                    alt="3D 스캔 장비 이미지 3"
                    className="rounded shadow-md object-cover w-full h-48"
                    loading="lazy"
                />
            </section>

            <section className="mt-10 text-center">
                <h2 className="text-2xl font-semibold mb-4 text-teal-600">문의 및 상담</h2>
                <p>
                    3D 스캔 기술과 서비스에 대해 궁금하신 점이 있으면 언제든지 문의해 주세요.
                </p>
                <button
                    onClick={() => alert('문의 페이지로 이동 예정')}
                    className="mt-4 px-6 py-3 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
                    type="button"
                >
                    상담 신청하기
                </button>
            </section>
        </main>
            </>
    );
}
