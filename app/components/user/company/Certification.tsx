'use client';

import React from 'react';
import Image from 'next/image';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import PageHeroAuto from "@/components/user/PageHeroAuto";
import {useSafeTranslations} from "@/lib/intl/useSafeTranslations";

export const metadata = {
    title: '특허 현황',
    description: 'Portfolio의 보유 특허 및 인증 현황을 소개합니다.',
};

const otherCerts = [
    { src: 'https://Portfolio-web.s3.ap-northeast-2.amazonaws.com/uploads/certification/com_certification.png', alt: '기업부설연구소 인증', idx: 1 },
    { src: 'https://Portfolio-web.s3.ap-northeast-2.amazonaws.com/uploads/certification/ven_certifi.png', alt: '벤처기업 인증', idx: 2 },
    { src: 'https://Portfolio-web.s3.ap-northeast-2.amazonaws.com/uploads/certification/iso_9001_2.png', alt: 'ISO 9001 인증서', idx: 3 },
    { src: 'https://Portfolio-web.s3.ap-northeast-2.amazonaws.com/uploads/certification/iso_14001_2.png', alt: 'ISO 14001 인증서', idx: 4 },
];


const renderImageGrid = (images: typeof otherCerts, t: any ) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {images.map((img, idx) => (
            <div
                key={idx}
                className="bg-white dark:bg-neutral-800 rounded-xl p-3 border-[3px] border-[#d4af37] shadow-md"
            >
                <div className="relative w-full h-80 sm:h-80 md:h-80 lg:h-80 overflow-hidden rounded-md bg-white">
                    <Image
                        loader={() => img.src}
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
                    />
                </div>

                <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-300">{t(img.alt)}</p>
            </div>
        ))}
    </div>
);

export default function Certification() {
    const t = useSafeTranslations("certification");

    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/companyhero.jpg" />

            <main className="max-w-6xl mx-auto px-6 py-10 my-5 bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-100 rounded-lg ">

                <section className="mb-16">
                    {renderImageGrid(otherCerts, t)}
                </section>

            </main>
        </>
    );
}
