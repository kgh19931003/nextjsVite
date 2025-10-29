'use client';

import React from 'react';
import PageHeroAuto from "@/components/user/PageHeroAuto";
import Head from "next/head";
import Image from "next/image";
import { useSafeTranslations } from "@/lib/intl/useSafeTranslations";

export default function Vision() {
    const t = useSafeTranslations("vision");

    return (
        <>
            <Head>
                <title>갓테크 | 인사말</title>
                <meta name="description" content="기술로 자원을 다시 쓸모있게 만드는 갓테크의 인사말 페이지입니다."/>
            </Head>
            <PageHeroAuto backgroundImage="/pageHero/companyhero.jpg"/>

            <section className="dark:bg-neutral-900 py-10 px-4 sm:px-6 mb-15 lg:px-8">
                <div className="max-w-7xl mx-auto px-4 lg:flex lg:gap-12 lg:items-start">
                    {/* 텍스트 영역 */}
                    <div className="lg:w-3/5 space-y-6 max-w-[690px] text-right">
                        <p className="text-3xl leading-relaxed text-gray-800 dark:text-gray-300 font-bold" style={{ color: "#56BC6F" }}>
                            {t('자원 순환을 통한 지속가능한 미래를 꿈꾸다.')}
                        </p>

                        {[
                            t("저희는 외산 수입에 의존하는 고부가가치 첨단 소재 & 부품의 자원 순환과"),
                            t("3D 프린팅 기술의 융합을 통해 지속 가능한 미래를 꿈꾸는 스타트업 입니다."),
                            t("누구도 가지 않은 길을 가는 것은 외롭고 힘들지만 아직 이름 붙여지지"),
                            t("않을 곳을 향해 누구보다 먼저 발 디딜 수 있다는 꿈을 꿉니다."),
                            t("수입에만 의존하던 첨단 금속 분말의 공급과 자원순환을 통해 국산화 & 도시광산화를 꿈꾸고,"),
                            t("수리나 보수가 어려워 버려지는 고부가가치 부품에게 새로운 생명을 부여하며,"),
                            t("폐기되는 자원 순환하여 다른 형태로 다시 만드는 것."),
                            t("이 모든 것을 친환경 순환 플랫폼인 ‘RE-FIT’을 통해 이루고자 합니다."),
                            t("우리는 자원의 끝이 아닌 새로운 시작을 만듭니다.")
                        ].map((text, idx) => (
                            <p key={idx} className="text-lg leading-relaxed text-gray-800 dark:text-gray-300" style={{ color: "#006769" }}>
                                {text}
                            </p>
                        ))}
                    </div>

                    {/* 이미지 영역 */}
                    <div className="lg:w-2/5 max-w-[400px] mt-10 ml-13 lg:mt-0">
                        <Image
                            loader={() => "https://godtech-web.s3.ap-northeast-2.amazonaws.com/uploads/vision/esg.jpg"}
                            src="https://godtech-web.s3.ap-northeast-2.amazonaws.com/uploads/vision/esg.jpg"
                            alt="ESG Vision"
                            width={400}
                            height={500}
                            className="rounded-lg shadow-lg w-full object-cover"
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
