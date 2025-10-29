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
          <img src="/EL-3DP.png" alt="로고" className="w-[700px] object-contain rounded-[7px]" />
      </div>
      <div className="text-center py-4">
        <h1 className="text-[30px] font-bold">EL-3DP(엘쓰리디피)</h1>
        <h1 className="text-[20px] mt-2 mb-20">역설계로 동일한 모델 출력이 가능한 플라스틱 3D 프린팅 솔루션</h1>
      </div>
      <div className="py-4">
         <h1 className="text-[30px] font-bold">솔루션 정의</h1>
         <hr className="border-t-2 border-gray my-8" />
         <h1 className="text-[20px] text-gray-400">플라스틱 필라멘트를 사용하여 3D Printing 적층을 통한 조형체 제작</h1>
         <hr className="border-t-2 border-gray-400 my-8" />
         <h1 className="text-[20px] text-gray-400">Plastic 3D Printing 장비를 보유하고 있지 않은 대학교, 연구기관, 기업체로부터의 조형체 제작 의뢰 (전시용 또는 목업용 부품, 구조물 등)</h1>
         <div className="flex justify-center mt-10 items-center p-4 min-w-[250px]">
             <img src="/el3dp.png" alt="로고" className="w-[1280px] object-contain rounded-[7px]" />
         </div>
      </div>

      <div className="py-20">
         <h1 className="text-[30px] text-gray-400">(서비스 특징)</h1>
      </div>

      <div className="py-1">
          <h1 className="text-[30px] font-bold">특징 1. 역설계를 통한 실제 부품과 동일한 모델 출력 가능</h1>
          <hr className="border-t-2 border-gray my-8" />
          <h1 className="text-[20px] text-gray-400">3D 스캐닝을 활용하여 실부품 역설계를 통해 동일한 모델 제작 가능</h1>
      </div>

      <div className="py-15">
          <h1 className="text-[30px] font-bold">특징 2. 분말 자유도</h1>
          <hr className="border-t-2 border-gray my-8" />
          <h1 className="text-[20px] text-gray-400">국산 3D 프린팅 장비를 사용하여 분말 제약 없음(일부 외산 장비는 특정 분말만 사용해야하는 단점 존재)</h1>
      </div>

      <div className="py-15">
          <h1 className="text-[30px] font-bold">주요 고객군</h1>
          <hr className="border-t-2 border-gray my-8" />
          <h1 className="text-[20px] text-gray-400">대학교 및 연구기관, 기업</h1>
      </div>

      <div className="py-15">
          <h1 className="text-[30px] font-bold">활용 사례</h1>
          <hr className="border-t-2 border-gray my-8" />
          <h1 className="text-[20px] text-gray-400">조선소에서 금속 소재의 구조물 제작 전 축소 사이즈의 목업용 플라스틱 구조물 제작 의뢰</h1>
      </div>

      <div className="py-20">
         <h1 className="text-[30px] text-gray-400">(문의)</h1>
      </div>

      <div className="py-1">
          <h1 className="text-[30px] font-bold">EL-3DP에 관심이 있으신가요?</h1>
          <hr className="border-t-2 border-gray my-8" />
          <h1 className="text-[20px] text-gray-400">아래 링크를 통해 알려주세요. EL-3DP 관련 협업 문의도 환영합니다.</h1>
          <Link href="/ko/contact">
            <h1 className="mt-5 text-[20px] text-gray-400 hover:text-gray-200 cursor-pointer transition-colors duration-200">
              EL-3DP 문의하기 →
            </h1>
          </Link>
      </div>
    </section>
     </>
  );
}
