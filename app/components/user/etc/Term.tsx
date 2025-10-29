'use client';

import React from 'react';
import PageHeroAuto from "@/components/user/PageHeroAuto";
import { usePathname } from "next/navigation";

const terms = {
    ko: {
        intro: `본 약관은 ㈜갓테크(이하 "회사")가 제공하는 웹사이트 및 서비스 이용에 대한 조건과 절차,
회사와 이용자의 권리, 의무 및 책임사항 등을 규정합니다.`,
        sections: [
            {
                title: "제1조 (목적)",
                content: `본 약관은 회사가 운영하는 웹사이트를 통해 제공하는 모든 서비스(이하 "서비스")의 이용과 관련하여
회사와 회원 간의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.`,
            },
            {
                title: "제2조 (용어의 정의)",
                contentList: [
                    "회원: 회사의 서비스에 접속하여 본 약관에 따라 이용계약을 체결한 자",
                    "이용자: 회원 여부와 관계없이 서비스를 이용하는 자",
                    "콘텐츠: 회사가 제공하는 텍스트, 이미지, 영상, 정보 등의 자료",
                ],
            },
            {
                title: "제3조 (약관의 효력 및 변경)",
                contentList: [
                    "본 약관은 회사의 웹사이트에 게시함으로써 효력을 발생합니다.",
                    `회사는 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있으며,
변경된 약관은 웹사이트에 공지함으로써 효력을 발생합니다.`,
                    "회원이 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.",
                ],
            },
        ],
        footer: `기타 조항은 관련 법령 또는 회사의 정책에 따르며, 본 약관은 ㈜갓테크의 공식 웹사이트에 게시된 시점부터 적용됩니다.`,
    },

    en: {
        intro: `These terms and conditions govern the use of the website and services provided by GOD TECH Co., Ltd. (hereinafter "the Company"),
and set forth the rights, duties, and responsibilities of the Company and users.`,
        sections: [
            {
                title: "Article 1 (Purpose)",
                content: `These terms and conditions aim to define the rights, duties, and responsibilities
between the Company and its members in relation to all services (hereinafter "Services") provided through the Company's website.`,
            },
            {
                title: "Article 2 (Definitions)",
                contentList: [
                    "Member: A person who has accessed the Company's services and entered into a service agreement according to these terms.",
                    "User: Any person who uses the services regardless of membership status.",
                    "Content: Texts, images, videos, information, and other materials provided by the Company.",
                ],
            },
            {
                title: "Article 3 (Effect and Amendment of Terms)",
                contentList: [
                    "These terms become effective upon posting on the Company's website.",
                    `The Company may change these terms within the scope not violating relevant laws,
and the changed terms become effective upon being posted on the website.`,
                    "If a member does not agree to the changed terms, they may stop using the services and withdraw.",
                ],
            },
        ],
        footer: `Other provisions shall follow relevant laws or company policies, and these terms shall apply from the time they are posted on the official website of GOD TECH Co., Ltd.`,
    },
};

export default function TermsOfService() {
    const pathname = usePathname();
    const locale = pathname.split('/')[1];
    // locale이 'ko' 또는 'en'인지 체크, 아니면 'ko'로 기본값 지정
    const currentLocale: 'ko' | 'en' = locale === 'en' ? 'en' : 'ko';

    const localeTerms = terms[currentLocale];

    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/techhero.jpg" />
            <main className="max-w-3xl mx-auto px-6 py-30">
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                    {localeTerms.intro}
                </p>

                {localeTerms.sections.map((section) => (
                    <section
                        key={section.title}
                        className="bg-gray-50 dark:bg-neutral-800 p-6 rounded-lg shadow-md mb-10"
                    >
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-300 dark:border-neutral-700 pb-2">
                            {section.title}
                        </h2>
                        {section.content && (
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                                {section.content}
                            </p>
                        )}
                        {section.contentList && (
                            <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                                {section.contentList.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}

                <p className="text-gray-700 dark:text-gray-300 text-lg mb-10 leading-relaxed">
                    {localeTerms.footer}
                </p>
            </main>
        </>
    );
}
