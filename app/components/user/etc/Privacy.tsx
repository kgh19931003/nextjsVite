'use client';

import React from 'react';
import PageHeroAuto from "@/components/user/PageHeroAuto";
import { usePathname } from "next/navigation";

export const metadata = {
    title: '개인정보처리방침',
    description: '갓테크 개인정보처리방침 안내 페이지입니다.',
};

const privacyContent = {
    ko: [
        {
            title: '1. 개인정보의 수집 및 이용 목적',
            content: (
                <>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                        회사는 서비스 제공을 위해 아래와 같은 개인정보를 수집하며, 수집된 개인정보는 다음의 목적을 위해 이용됩니다.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>회원 관리 및 서비스 제공</li>
                        <li>고객 문의 및 상담 응대</li>
                        <li>마케팅 및 광고 활용</li>
                    </ul>
                </>
            ),
        },
        {
            title: '2. 수집하는 개인정보 항목',
            content: (
                <>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                        회사는 서비스 이용 시 아래와 같은 개인정보를 수집할 수 있습니다.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>이름, 연락처, 이메일 주소</li>
                        <li>서비스 이용 기록, 접속 로그, 쿠키 정보</li>
                        <li>기타 서비스 이용과정에서 자동으로 생성되는 정보</li>
                    </ul>
                </>
            ),
        },
        {
            title: '3. 개인정보의 보유 및 이용 기간',
            content: (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    수집된 개인정보는 법령에 따른 보존 기간 또는 이용 목적 달성 시까지 안전하게 보관되며, 이후 지체 없이 파기됩니다.
                </p>
            ),
        },
        {
            title: '4. 개인정보의 제3자 제공',
            content: (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 법령에 의해 요구되는 경우 예외로 합니다.
                </p>
            ),
        },
        {
            title: '5. 이용자의 권리와 그 행사 방법',
            content: (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    이용자는 언제든지 개인정보 열람, 정정, 삭제, 처리정지 요구 등의 권리를 행사할 수 있습니다. 권리 행사는 개인정보 보호책임자에게 서면, 전화, 이메일 등을 통해 요청할 수 있습니다.
                </p>
            ),
        },
        {
            title: '6. 개인정보 보호책임자',
            content: (
                <>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                        개인정보 보호 관련 문의는 아래 연락처로 해주시기 바랍니다.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>성명: <span className="font-semibold">담당자</span></li>
                        <li>전화번호: <a href="tel:0557240426" className="text-brand-600 hover:underline">055-724-0426</a></li>
                        <li>이메일: <a href="mailto:contact@godtechnology.co.kr" className="text-brand-600 hover:underline">contact@godtechnology.co.kr</a></li>
                    </ul>
                </>
            ),
        },
    ],
    en: [
        {
            title: '1. Purpose of Collecting and Using Personal Information',
            content: (
                <>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                        The Company collects the following personal information to provide services, and the collected information is used for the following purposes.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>Member management and service provision</li>
                        <li>Customer inquiries and consultation responses</li>
                        <li>Marketing and advertising utilization</li>
                    </ul>
                </>
            ),
        },
        {
            title: '2. Items of Personal Information Collected',
            content: (
                <>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                        The Company may collect the following personal information during service use.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>Name, contact number, email address</li>
                        <li>Service usage records, access logs, cookie information</li>
                        <li>Other information automatically generated during service use</li>
                    </ul>
                </>
            ),
        },
        {
            title: '3. Retention and Use Period of Personal Information',
            content: (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Collected personal information is securely stored for the period prescribed by law or until the purpose of use is achieved, after which it is promptly destroyed.
                </p>
            ),
        },
        {
            title: '4. Provision of Personal Information to Third Parties',
            content: (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    The Company does not provide users’ personal information to external parties as a principle. However, exceptions are made when required by law.
                </p>
            ),
        },
        {
            title: '5. User Rights and How to Exercise Them',
            content: (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Users may exercise their rights to access, correct, delete, or suspend the processing of their personal information at any time. These rights can be exercised by contacting the Personal Information Protection Officer via written requests, phone, or email.
                </p>
            ),
        },
        {
            title: '6. Personal Information Protection Officer',
            content: (
                <>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                        For inquiries related to personal information protection, please contact the following.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                        <li>Name: <span className="font-semibold">Person in charge</span></li>
                        <li>Phone: <a href="tel:0557240426" className="text-brand-600 hover:underline">055-724-0426</a></li>
                        <li>Email: <a href="mailto:contact@godtechnology.co.kr" className="text-brand-600 hover:underline">contact@godtechnology.co.kr</a></li>
                    </ul>
                </>
            ),
        },
    ],
};

export default function PrivacyPage() {
    const pathname = usePathname();
    const locale = pathname.split('/')[1];
    // locale이 'ko' 또는 'en'인지 체크, 아니면 'ko'로 기본값 지정
    const currentLocale: 'ko' | 'en' = locale === 'en' ? 'en' : 'ko';

    const content = privacyContent[currentLocale];

    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/techhero.jpg" />
            <main className="max-w-4xl mx-auto p-10 my-30 bg-white dark:bg-neutral-900 rounded-xl shadow-lg">
                {content.map(({ title, content }) => (
                    <section key={title} className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-300 dark:border-neutral-700 pb-2">
                            {title}
                        </h2>
                        <div>{content}</div>
                    </section>
                ))}
            </main>
        </>
    );
}
