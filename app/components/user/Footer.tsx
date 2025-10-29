'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from "react";
import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useSafeTranslations} from "@/lib/intl/useSafeTranslations";

const placeholder = { name: '패밀리 사이트', url: '' };

const links = [
    { name: 'Re-Fit', url: 'https://www.google.com' },
];

export default function Footer() {
    const t = useSafeTranslations("footer");
    const pathname = usePathname();
    const currentLocale = pathname.split('/')[1] || 'ko';

    const [selected, setSelected] = useState(placeholder);

    const handleChange = (value: (typeof links)[0]) => {
        setSelected(value);
        if (value?.url) window.open(value.url, '_blank');
    };

    return (
        <footer className="bg-[#B4E5A2] dark:bg-neutral-900 text-sm text-gray-700 dark:text-gray-300 pt-10 pb-10 border-t border-gray-200 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[3fr_2fr_1fr] gap-y-8 gap-x-8">
                {/* 1행: 로고 */}
                <Link href="/">
                    <div className="flex items-center justify-center sm:justify-start space-x-3 cursor-pointer">
                        <img
                            src="/logo/god_tech_logo.png"
                            alt="로고"
                            className="h-8 w-auto object-contain"
                        />
                        <img
                            src="/logo/god_tech_logo_text.png"
                            alt="로고 텍스트"
                            className="h-8 w-auto object-contain"
                        />
                    </div>
                </Link>


                {/* 1행: 패밀리 사이트 드롭다운 */}
                <div className="flex justify-center sm:justify-end">
                    <Listbox value={selected} onChange={handleChange}>
                        <div className="relative w-48">
                            <Listbox.Options
                                className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-neutral-800 py-1 text-sm shadow-lg ring-1 border focus:outline-none"
                            >
                                {links.map((link, idx) => (
                                    <Listbox.Option
                                        key={idx}
                                        value={link}
                                        className={({ active, selected }) =>
                                            clsx(
                                                "cursor-pointer select-none relative py-2 pl-4 pr-10",
                                                active
                                                    ? "bg-brand-100 dark:bg-brand-700 text-brand-700 dark:text-white"
                                                    : "text-gray-700 dark:text-gray-200",
                                                selected && "font-semibold"
                                            )
                                        }
                                    >
                                        {link.name}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </div>
                    </Listbox>
                </div>

                {/* 2행: 구분선 (전체 가로) */}
                <div className="col-span-full">
                    <hr className="border-t border-gray-400 dark:border-neutral-700" />
                </div>

                {/* 3행: 본사, 공장, 지사 정보 */}
                <div className="text-sm text-center sm:text-left grid grid-cols-[1fr_10fr] gap-x-2 gap-y-3">

                    <div className="font-semibold">{t("본사")}</div>
                    <div>{t("경남 창원시 의창구 창원대로397번길 11 제205동 제지1층 105호")}</div>


                    <div className="font-semibold">{t("공장")}</div>
                    <div>{t("경남 김해시 대동면 대동산단2로 263-17")}</div>


                    <div className="font-semibold">{t("지사")}</div>
                    <div>{t("부산광역시 중구 대청로 136 한국산업은행 9층 KDB NextONE")}</div>
                </div>


                {/* 4행: 연락처 */}
                <div className="text-sm grid grid-cols-[50px_1fr] gap-x-2 gap-y-1">
                    <div className="font-semibold">{t("전화")}</div>
                    <div className="lg:whitespace-nowrap">055-724-0426</div>

                    <div className="font-semibold">{t("팩스")}</div>
                    <div className="lg:whitespace-nowrap">055-724-0146</div>

                    <div className="font-semibold">{t("이메일")}</div>
                    <div className="lg:whitespace-nowrap">contact@godtechnology.co.kr</div>
                </div>

                {/* 4행: 인스타그램 아이콘 */}
                <div className="flex  sm:justify-end items-center lg:items-start">
                    <a
                        href="https://www.instagram.com/godtechco.ltd"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="hover:text-pink-500 text-gray-600 dark:text-gray-300 cursor-pointer transition transform hover:scale-110"
                    >
                        <FontAwesomeIcon icon={faInstagram} size="3x" />
                    </a>
                </div>

                {/* 5행: 하단 링크 및 저작권 */}
                <div className="col-span-full flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 mt-0 pt-4 text-xs text-gray-500 dark:text-gray-400">
                    <ul className="flex gap-3">
                        <li>
                            <Link
                                href={`/${currentLocale}/policy/term`}
                                className="hover:text-brand-600 hover:font-bold transition-colors"
                            >
                                {t("이용약관")}
                            </Link>
                        </li>
                        <span>|</span>
                        <li>
                            <Link
                                href={`/${currentLocale}/policy/privacy`}
                                className="hover:text-brand-600 hover:font-bold transition-colors"
                            >
                                {t("개인정보처리방침")}
                            </Link>
                        </li>
                        <span>|</span>
                        <li>
                            <Link
                                href={`/${currentLocale}/policy/EmailPolicy`}
                                className="hover:text-brand-600 hover:font-bold transition-colors"
                            >
                                {t("이메일 무단 수집 거부")}
                            </Link>
                        </li>
                    </ul>

                    <div>
                        © {new Date().getFullYear()} {t('㈜갓테크. All rights reserved.')}
                    </div>
                </div>
            </div>
        </footer>
    );
}
