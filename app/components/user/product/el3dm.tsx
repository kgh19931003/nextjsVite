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
          <img src="/EL-3DM.png" alt="로고" className="w-[700px] object-contain rounded-[7px]" />
      </div>
      <div className="text-center py-4">
        <h1 className="text-[30px] font-bold">EL-3DM(엘쓰리디엠)</h1>
        <h1 className="text-[20px] mt-2 mb-20">치수 검증이 가능한 금속분말 3D 프린팅 솔루션</h1>
      </div>
      <div className="py-4">
         <h1 className="text-[30px] font-bold">솔루션 정의</h1>
         <hr className="border-t-2 border-gray my-8" />
         <h1 className="text-[20px] text-gray-400">금속분말을 사용하여 3D Printing 적층을 통한 조형체 제작</h1>
         <hr className="border-t-2 border-gray-400 my-8" />
         <h1 className="text-[20px] text-gray-400">Metal 3D Printing 장비를 보유하고 있지 않은 대학교, 연구기관, 기업체로부터의 조형체 제작 의뢰(시제품, 구조용 부품, 테스트용 샘플 등)</h1>
         <hr className="border-t-2 border-gray-400 my-8" />
         <h1 className="text-[20px] text-gray-400">Metal 3D Printing으로만 제작 가능한(다품종, 소량생산, 복잡한 모델) 부품의 제조 및 납품</h1>
         <div className="flex justify-center mt-10 items-center p-4 min-w-[250px]">
             <img src="/el3dm.png" alt="로고" className="w-[1280px] object-contain rounded-[7px]" />
         </div>
      </div>

      <div className="py-20">
         <h1 className="text-[30px] text-gray-400">(서비스 특징)</h1>
      </div>

      <div className="py-1">
          <h1 className="text-[30px] font-bold">특징 1. 치수검증</h1>
          <hr className="border-t-2 border-gray my-8" />
          <h1 className="text-[20px] text-gray-400">원본 모델링 파일과 실조형체의 3D 스캐닝 데이터 비교 → 치수검증을 통한 신뢰성을 확보 가능</h1>
      </div>

      <div className="py-15">
          <h1 className="text-[30px] font-bold">특징 2. 합리적인 제작 비용</h1>
          <hr className="border-t-2 border-gray my-8" />
          <h1 className="text-[20px] text-gray-400">재활용 프로세스를 통해서 만들어진 분말 사용 → 상대적으로 낮은 분말 가격 → 합리적인 조형체 가격</h1>
      </div>

      <div className="py-15">
          <h1 className="text-[30px] font-bold">주요 고객군</h1>
          <hr className="border-t-2 border-gray my-8" />
          <h1 className="text-[20px] text-gray-400">대학교 및 연구기관, 기업</h1>
      </div>

      <div className="py-15">
          <h1 className="text-[30px] font-bold">활용 사례</h1>
          <hr className="border-t-2 border-gray my-8" />
          <h1 className="text-[20px] text-gray-400">A 업체에서 의뢰한 발사체 부품 3D printng 이후 3D 스캐닝을 통한 신뢰성 평가 및 성적서 제공</h1>
      </div>

      <div className="py-20">
         <h1 className="text-[30px] text-gray-400">(문의)</h1>
      </div>

      <div className="py-1">
          <h1 className="text-[30px] font-bold">EL-3DM에 관심이 있으신가요?</h1>
          <hr className="border-t-2 border-gray my-8" />
          <h1 className="text-[20px] text-gray-400">아래 링크를 통해 알려주세요. EL-3DM 관련 협업 문의도 환영합니다.</h1>
          <Link href="/ko/contact">
            <h1 className="mt-5 text-[20px] text-gray-400 hover:text-gray-200 cursor-pointer transition-colors duration-200">
              EL-3DM 문의하기 →
            </h1>
          </Link>
      </div>
    </section>
     </>
  );
}
