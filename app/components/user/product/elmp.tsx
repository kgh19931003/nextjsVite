// src/About.js
'use client';

import React from 'react';
import Link from 'next/link';
import PageHeroAuto from "@/components/user/PageHeroAuto";

export default function Web() {
  return (
      <>
    <PageHeroAuto
        backgroundImage="/main/main_banner.avif" // 공개폴더에 이미지 넣기
    />
    <section className="bg-white dark:bg-neutral-900 max-w-screen-xl sm:px-2 px-4 mx-auto py-16 flex flex-col">
      {/* 상단 배경 헤더 */}
      <div className="flex justify-center items-center p-4 min-w-[250px]">
          <img src="/EL-MP.png" alt="로고" className="w-[700px] object-contain rounded-[7px]" />
      </div>
      <div className="text-center py-4">
        <h1 className="text-[30px] font-bold">EL-MP(엘엠피)</h1>
        <h1 className="text-[20px] mt-2 mb-20">고객 니즈 반영이 가능한 커스텀 금속 분말</h1>
      </div>
      <div className="py-4">
         <h1 className="text-[30px] font-bold">제품 정의</h1>
         <hr className="border-t-2 border-gray my-8" />
         <h1 className="text-[20px] text-gray-600">Metal 3D Printing 및 분말야금에 적용 가능한 금속 소재의 분말</h1>
         <div className="flex justify-center items-center p-4 min-w-[250px]">
             <img src="/elmp.png" alt="로고" className="w-[700px] object-contain rounded-[7px]" />
         </div>
      </div>
      <div>
          <h1 className="text-[30px] font-bold">종류</h1>
          <hr className="border-t-2 border-gray my-8" />
          <h1 className="text-[20px] text-gray-400">Stainless steel  </h1>
          <hr className="border-t-2 border-gray-400 my-8" />
          <h1 className="text-[20px] text-gray-400">Ni alloy</h1>
          <hr className="border-t-2 border-gray-400 my-8" />
          <h1 className="text-[20px] text-gray-400">Ti alloy</h1>
          <hr className="border-t-2 border-gray-400 my-8" />
          <h1 className="text-[20px] text-gray-400">etc</h1>
      </div>

      <div className="py-20">
          <h1 className="text-[30px] font-bold">사이즈</h1>
          <hr className="border-t-2 border-gray my-8" />
          <h1 className="text-[20px] text-gray-400">L-PBF(15~45μm)용</h1>
          <hr className="border-t-2 border-gray-400 my-8" />
          <h1 className="text-[20px] text-gray-400">DED(45~150μm)용</h1>
      </div>

      <div className="py-20">
         <h1 className="text-[30px] text-gray-400">(제품 특징)</h1>
      </div>

      <div className="py-1">
          <h1 className="text-[30px] font-bold">특징 1. 고객 맞춤 커스텀</h1>
          <hr className="border-t-2 border-gray my-8" />
          <h1 className="text-[20px] text-gray-400">화학적 커스텀을 거친 금속분말 생산 가능 → 생산 과정에서 고객의 니즈 반영</h1>
          <hr className="border-t-2 border-gray-400 my-8" />
          <h1 className="text-[20px] text-gray-400">화학적 커스텀을 위한 가탄제 관련 자체 기술 확보</h1>
          <hr className="border-t-2 border-gray-400 my-8" />
          <h1 className="text-[20px] text-gray-400">관련 인력 및 엘사이클만의 자체 노하우 확보</h1>
      </div>

      <div className="py-15">
          <h1 className="text-[30px] font-bold">특징 2. 상대적으로 낮은 단가</h1>
          <hr className="border-t-2 border-gray my-8" />
          <h1 className="text-[20px] text-gray-400">일정 비율은 폐금속의 재활용을 통해 생산 → 기존 신규 분말 제작 방식 대비 낮은 단가 → 이로 인해 상대적으로 낮은 시장 판매가</h1>
      </div>

      <div className="py-15">
          <h1 className="text-[30px] font-bold">특징 3. 간소화된 공정</h1>
          <hr className="border-t-2 border-gray my-8" />
          <h1 className="text-[20px] text-gray-400">일정 그레이드의 강종만을 모아 재활용 → 공정 간소화(서로 다른 그레이드를 맞추기 위한 공정 불필요)</h1>
      </div>

      <div className="py-15">
          <h1 className="text-[30px] font-bold">특징 4. 국내 수급 가능</h1>
          <hr className="border-t-2 border-gray my-8" />
          <h1 className="text-[20px] text-gray-400">외산 수입품의 경우 수입 프로세스가 복잡하고 까다로움. 또한 상대적으로 수급 리드타임이 오래 걸림 </h1>
          <h1 className="mt-3 text-[20px] text-gray-400">→ 국내 생산 및 공급이 가능해 질 경우 프로세스 단순화 및 도입시간 감소 등의 효과 발생</h1>
      </div>

      <div className="py-15">
          <h1 className="text-[30px] font-bold">주요 고객군</h1>
          <hr className="border-t-2 border-gray my-8" />
          <h1 className="text-[20px] text-gray-400">대학교 및 연구기관, 고기능 · 고성능 금속 부품의 제작 또는 보수가 필요한 기업 (우주항공, 발전 등)</h1>
      </div>

      <div className="py-20">
         <h1 className="text-[30px] text-gray-400">(문의)</h1>
      </div>

      <div className="py-1">
          <h1 className="text-[30px] font-bold">EL-MP에 관심이 있으신가요?</h1>
          <hr className="border-t-2 border-gray my-8" />
          <h1 className="text-[20px] text-gray-400">아래 링크를 통해 알려주세요. EL-MP 관련 협업 문의도 환영합니다.</h1>
          <Link href="/ko/contact">
            <h1 className="mt-5 text-[20px] text-gray-400 hover:text-gray-200 cursor-pointer transition-colors duration-200">
              EL-MP 문의하기 →
            </h1>
          </Link>
      </div>
    </section>
     </>
  );
}
