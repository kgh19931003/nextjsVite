'use client';

import React from 'react';
import PageHeroAuto from "@/components/user/PageHeroAuto";

export default function AdditivePrinterDesign() {
    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/repairhero.jpg" />

            <main className="max-w-5xl mx-auto my-20 p-8 bg-white rounded shadow-md">
            <h1 className="text-4xl font-bold mb-6 text-center text-indigo-700">
                적층프린터 디자인 설계 소개
            </h1>

            <section className="mb-8 space-y-6 text-gray-800 leading-relaxed">
                <p>
                    적층프린터(Additive Manufacturing Printer)의 설계는 고성능, 정밀도, 내구성
                    등 다양한 요구 사항을 충족해야 합니다. 효율적인 구조 설계와 소재 선택,
                    그리고 모듈화된 시스템 설계가 성공적인 적층프린터 개발의 핵심입니다.
                </p>

                <p>
                    설계 단계에서는 프린터 헤드, 빌드 플랫폼, 모터 및 구동장치, 센서, 제어 시스템
                    등 각 구성 요소의 역할과 상호 작용을 면밀히 분석합니다. 이를 통해 높은
                    적층 품질과 안정적인 작동을 보장할 수 있습니다.
                </p>

                <ul className="list-disc list-inside space-y-2">
                    <li>경량화 및 강도 최적화를 위한 프레임 설계</li>
                    <li>고정밀 적층을 위한 정밀 모션 컨트롤 시스템</li>
                    <li>효율적인 열 관리와 소재 공급 시스템</li>
                    <li>유지보수가 편리한 모듈화 설계</li>
                    <li>사용자 친화적 인터페이스 및 소프트웨어 통합</li>
                </ul>

                <p>
                    최신 적층프린터 설계는 3D CAD 툴과 시뮬레이션을 활용하여
                    설계 오류를 최소화하고, 제조 공정을 최적화합니다.
                    이러한 통합 설계 프로세스를 통해 고객 맞춤형 솔루션을 제공합니다.
                </p>
            </section>

            <section>
                <img
                    src="/images/printer-design.jpg"
                    alt="적층프린터 디자인 이미지"
                    className="w-full rounded shadow-md mb-6"
                    loading="lazy"
                />
                <p className="text-center text-sm text-gray-500 italic">
                    3D 적층프린터 설계 예시 이미지
                </p>
            </section>

            <section className="mt-10 text-center">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-600">문의 및 상담</h2>
                <p>
                    적층프린터 설계에 관한 자세한 정보나 맞춤 상담을 원하시면
                    언제든 연락주세요.
                </p>
                <button
                    onClick={() => alert('문의 페이지로 이동 예정')}
                    className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    type="button"
                >
                    상담 신청하기
                </button>
            </section>
        </main>
            </>
    );
}
