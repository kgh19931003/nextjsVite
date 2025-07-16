'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';              // 기본 스타일
import 'swiper/css/navigation';   // 네비게이션 화살표 스타일
import 'swiper/css/pagination';   // 페이지네이션 스타일

import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export default function Introduction() {
    const images = [
        '/main/main_banner.avif',
        '/main/main_banner2.avif',
        '/pageHero/recycling2.png',
        // 필요한 이미지 경로 추가
    ];

    return (
        <section className="bg-white dark:bg-neutral-900 mt-20 max-w-screen-xl sm:px-2 px-4 mx-auto py-2 flex flex-col">
            {/* 이미지 슬라이드 */}
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                loop={true}
                className="rounded-xl h-[500px] w-full"
            >
                {images.map((src, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={src}
                            alt={`slide-${index + 1}`}
                            className="object-cover w-full h-[500px] rounded-xl"
                            loading="lazy"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* 본문 내용 */}
            <div className="flex flex-col md:flex-row gap-10 mt-7 items-start">
                {/* 여기에 컨텐츠 추가 */}
            </div>
        </section>
    );
}
