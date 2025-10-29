'use client';

import React from 'react';
import PageHeroAuto from "@/components/user/PageHeroAuto";
import { usePathname } from "next/navigation";

const contentByLocale: { [key in 'ko' | 'en']: React.ReactNode }  = {
    ko: (
        <>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여
                무단으로 수집되는 것을 강력히 거부하며, 이를 위반할 경우 <strong className="font-semibold text-red-600">정보통신망법</strong>에 따라
                엄중한 형사 처벌을 받을 수 있음을 알려드립니다.
            </p>

            <section className="bg-gray-50 dark:bg-neutral-800 p-6 rounded-lg shadow-md mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-300 dark:border-neutral-700 pb-2">
                    [정보통신망 이용촉진 및 정보보호 등에 관한 법률]
                </h2>
                <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                    <li>제50조의2 (전자우편주소의 무단 수집행위 등 금지)</li>
                    <li>
                        누구든지 전자우편주소의 수집을 거부하는 의사가 명시된 인터넷 홈페이지에서 자동으로 전자우편주소를
                        수집하는 프로그램이나 그 밖의 기술적 장치를 이용하여 전자우편주소를 수집하여서는 아니 됩니다.
                    </li>
                    <li>
                        누구든지 제1항의 규정을 위반하여 수집된 전자우편주소를 판매·유통하여서는 아니 됩니다.
                    </li>
                    <li>
                        누구든지 제1항 및 제2항의 규정에 의하여 수집·판매 및 유통이 금지된 전자우편주소임을 알고 이를
                        정보전송에 이용하여서는 아니 됩니다.
                    </li>
                </ul>
            </section>

            <p className="text-gray-700 dark:text-gray-300 text-lg mb-10 leading-relaxed">
                위 사항을 위반할 경우 정보통신망법에 따라 형사처벌 또는 과태료 부과 등의 법적 제재를 받을 수 있습니다.
            </p>
        </>
    ),
    en: (
        <>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                The email addresses posted on this website are strongly protected against unauthorized collection using email
                collection programs or other technical devices. Violators may be subject to severe criminal penalties under the{' '}
                <strong className="font-semibold text-red-600">Act on Promotion of Information and Communications Network Utilization and Information Protection</strong>.
            </p>

            <section className="bg-gray-50 dark:bg-neutral-800 p-6 rounded-lg shadow-md mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-300 dark:border-neutral-700 pb-2">
                    [Act on Promotion of Information and Communications Network Utilization and Information Protection]
                </h2>
                <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                    <li>Article 50-2 (Prohibition of Unauthorized Collection of Email Addresses)</li>
                    <li>
                        No one shall collect email addresses automatically using programs or other technical devices from websites
                        where the intention to refuse collection of email addresses is clearly stated.
                    </li>
                    <li>
                        No one shall sell or distribute email addresses collected in violation of paragraph 1.
                    </li>
                    <li>
                        No one shall use such prohibited email addresses for sending information knowingly.
                    </li>
                </ul>
            </section>

            <p className="text-gray-700 dark:text-gray-300 text-lg mb-10 leading-relaxed">
                Violations of the above may result in criminal penalties or fines under the relevant law.
            </p>
        </>
    ),
};

export default function EmailPolicy() {
    const pathname = usePathname();
    const locale = pathname.split('/')[1];
    // locale이 'ko' 또는 'en'인지 체크, 아니면 'ko'로 기본값 지정
    const currentLocale: 'ko' | 'en' = locale === 'en' ? 'en' : 'ko';

    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/techhero.jpg" />
            <main className="max-w-3xl mx-auto px-6 py-30">
                {contentByLocale[currentLocale]}
            </main>
        </>
    );
}
