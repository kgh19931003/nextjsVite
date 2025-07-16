'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

export default function Header() {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<{ [key: string]: boolean }>({});

    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [currentLocale, setCurrentLocale] = useState(locale);

    useEffect(() => {
        const segments = pathname.split('/').filter(Boolean);
        setCurrentLocale(segments[0]);
    }, [pathname]);

    const changeLanguage = (newLocale: string) => {
        const segments = pathname.split('/').filter(Boolean);
        if (segments[0] === 'ko' || segments[0] === 'en') {
            segments[0] = newLocale;
        } else {
            segments.unshift(newLocale);
        }
        const newPath = '/' + segments.join('/');
        router.push(newPath);
    };

    const toggleMobileSubmenu = (key: string) => {
        setMobileSubmenuOpen(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <header className="bg-white dark:bg-neutral-800 shadow fixed top-0 left-0 w-full z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* 로고 */}
                <Link href="/" className="flex items-center gap-2 text-lg font-bold text-black-600 dark:text-black-400">

                </Link>

                {/* 데스크탑 메뉴 */}
                <ul className="hidden md:flex gap-6 relative">
                    <div
                        className="relative py-5"
                        onMouseEnter={() => setOpenMenu('about')}
                        onMouseLeave={() => setOpenMenu(null)}
                    >
                        <li className="cursor-pointer hover:text-blue-500">CRUD 게시판</li>
                        {openMenu === 'about' && (
                            <ul className="absolute hidden top-full left-0 w-50 mt-0
                                            bg-white dark:bg-neutral-800
                                            border border-gray-200 dark:border-neutral-700
                                            rounded-md shadow-md z-50">
                                <li><Link href={`/${currentLocale}/introduction`}
                                          className="block px-4 py-2 hover:bg-gray-100 hover:rounded dark:hover:bg-neutral-600">
                                  </Link></li>
                              
                            </ul>
                        )}
                    </div>

                    <div
                        className="relative py-5"
                        onMouseEnter={() => setOpenMenu('product/solution')}
                        onMouseLeave={() => setOpenMenu(null)}
                    >
                        <li className="cursor-pointer hover:text-blue-500">전자정부 프레임워크</li>
                        {openMenu === 'product/solution' && (
                            <ul className="absolute hidden top-full left-0 w-50 mt-0
                                           bg-white dark:bg-neutral-800
                                           border border-gray-200 dark:border-neutral-700
                                           rounded-md shadow-md z-50">
                                <li><Link href="/product/elmp"
                                          className="block px-4 py-2 hover:bg-gray-100 hover:rounded dark:hover:bg-neutral-600">
                                    금속분말</Link></li>
                            </ul>
                        )}
                    </div>

                    <li className="py-5">
                        <Link href="" className="hover:text-blue-500"></Link>
                    </li>

                    <li className="py-5">
                        <Link href="" className="hover:text-blue-500"></Link>
                    </li>
                </ul>

                {/* 언어 변경 셀렉트 (PC) */}
                <div className="hidden md:block ml-6">
                    <select
                        className="border rounded px-2 py-1 dark:bg-neutral-800 dark:text-white"
                        value={currentLocale}
                        onChange={e => changeLanguage(e.target.value)}
                    >
                        <option value="ko">한국어</option>
                        <option value="en">English</option>
                    </select>
                </div>

                {/* 햄버거 메뉴 (모바일) */}
                <button className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
                    <Menu className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </button>
            </nav>

            {/* 모바일 사이드바 및 오버레이 */}
            <div
                className={clsx(
                    'fixed inset-0 z-50 flex transition-opacity duration-0',
                    isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                )}
            >
                {/* 반투명 오버레이 */}
                <div
                    className="fixed top-0 left-64 right-0 bottom-0 bg-black/50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* 사이드바 (왼쪽에서 슬라이드) */}
                <div
                    className={clsx(
                        'fixed top-0 left-0 w-78 h-full bg-white dark:bg-neutral-800 shadow-lg p-4 z-50 transform transition-transform duration-0',
                        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    )}
                >
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">Godtech</span>
                        <button onClick={() => setIsMobileMenuOpen(false)}>
                            <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                        </button>
                    </div>

                    <ul className="space-y-2 text-left">
                        <li>
                            <button
                                onClick={() => toggleMobileSubmenu('about')}
                                className="w-full text-left flex justify-between items-center py-0 hover:text-blue-500"
                            >
                                회사소개 <ChevronDown className="w-4 h-4"/>
                            </button>
                            {mobileSubmenuOpen['about'] && (
                                <ul className="ml-4 space-y-2 text-sm">
                                    <li><Link href={`/${currentLocale}/introduction`}
                                              onClick={() => setIsMobileMenuOpen(false)}>기업 소개</Link></li>
                                    <li><Link href={`/${currentLocale}/history`}
                                              onClick={() => setIsMobileMenuOpen(false)}>연혁</Link></li>
                                    <li><Link href={`/${currentLocale}/vision`}
                                              onClick={() => setIsMobileMenuOpen(false)}>비전</Link></li>
                                    <li><Link href={`/${currentLocale}/location`}
                                              onClick={() => setIsMobileMenuOpen(false)}>위치</Link></li>
                                </ul>
                            )}
                        </li>

                        <li>
                            <button
                                onClick={() => toggleMobileSubmenu('service')}
                                className="w-full text-left flex justify-between items-center py-0 hover:text-blue-500"
                            >
                                제품/솔루션 <ChevronDown className="w-4 h-4"/>
                            </button>
                            {mobileSubmenuOpen['service'] && (
                                <ul className="ml-4 space-y-2 text-sm">
                                    <li><Link href="/services/web"
                                              onClick={() => setIsMobileMenuOpen(false)}>금속분말</Link></li>
                                    <li><Link href="/services/mobile" onClick={() => setIsMobileMenuOpen(false)}>금속 3D
                                        프린팅</Link></li>
                                    <li><Link href="/services/consulting" onClick={() => setIsMobileMenuOpen(false)}>플라스틱
                                        3D 프린팅</Link></li>
                                    <li><Link href="/services/consulting" onClick={() => setIsMobileMenuOpen(false)}>플라스틱
                                        친환경 가탄제</Link></li>
                                </ul>
                            )}
                        </li>

                        <li><Link href={`/${currentLocale}/blog`}
                                  onClick={() => setIsMobileMenuOpen(false)}>블로그</Link></li>

                        <li><Link href={`/${currentLocale}/contact`}
                                  onClick={() => setIsMobileMenuOpen(false)}>문의하기</Link></li>
                    </ul>

                    {/* 언어 선택 */}
                    <div className="mt-6">
                        <select
                            className="w-full border rounded px-2 py-1 dark:bg-neutral-700 dark:text-white"
                            value={currentLocale}
                            onChange={e => {
                                changeLanguage(e.target.value);
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            <option value="ko">한국어</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                </div>
            </div>
        </header>
    );
}
