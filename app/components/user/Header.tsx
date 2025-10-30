'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, Globe2 } from 'lucide-react';
import clsx from 'clsx';
import { easeIn, easeOut } from "framer-motion";

import { motion, AnimatePresence } from 'framer-motion';
import {useSafeTranslations} from "@/lib/intl/useSafeTranslations";

export default function Header() {
    const t = useSafeTranslations("header");
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<{ [key: string]: boolean }>({});
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [currentLocale, setCurrentLocale] = useState(locale);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const [scrolled, setScrolled] = useState(false);

    // 메뉴 오픈 상태를 감지해서
    useEffect(() => {
        if (isMobileMenuOpen) {
            // 스크롤 잠금
            document.body.style.overflow = 'hidden';
        } else {
            // 스크롤 해제
            document.body.style.overflow = '';
        }
    }, [isMobileMenuOpen]);



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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowLanguageDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // framer-motion variants for dropdown animation
    const dropdownVariants = {
        hidden: (scrolled: boolean) => ({
            opacity: 0,
            y: scrolled ? -20 : -30,  // scrolled일 때는 -20, 아닐 때는 -40px 위로 숨김
            pointerEvents: 'none',
        }),
        visible:  {
            opacity: 1,
            y: scrolled ? -15 : 0,
            pointerEvents: 'auto',
            transition: { duration: 0.3 },
        },
        exit: {
            opacity: 0,
            y: scrolled ? -20 : -30,
            pointerEvents: 'none',
            transition: { duration: 0.2 },
        },
    };
    // 전체화면 메뉴 애니메이션 variants
    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    };

    const menuVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                delay: 0.1,
                ease: easeOut,
            },
        },
        exit: {
            opacity: 0,
            y: 30,
            transition: { duration: 0.3 },
        },
    };

    useEffect(() => {
        function onScroll() {
            setScrolled(window.scrollY > 10); // 10px 이상 스크롤 시 true
        }

        window.addEventListener('scroll', onScroll);
        onScroll(); // 초기 상태 체크

        return () => window.removeEventListener('scroll', onScroll);
    }, []);


    return (
        <>
            <header
                style={{width: '99%'}}
                className={` 
                            group
                            hover:text-black dark:hover:text-white
                            fixed top-0 left-1/2 -translate-x-1/2 z-50
                            border-transparent bg-transparent
                            transition-colors duration-300
                            rounded my-1
                            hover:bg-white hover:border-gray-300
                            dark:hover:bg-neutral-800 dark:hover:border-neutral-700
                            ${scrolled ? 'bg-white border-gray-300 text-black shadow-sm' : 'bg-transparent border-transparent shadow-sm text-white'}
                          `}
            >
                <nav className={`
                                  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between
                                  transition-[height] duration-500 ease-in-out
                                  ${scrolled ? 'h-16' : 'h-24'}
                                `}>

                    <Link href={`/${currentLocale}`} className="flex items-center w-[156px] gap-2 text-lg font-bold relative">
                        {/* 로고 아이콘 */}
                        <div className="relative h-8 w-[66px]">
                            <img
                                src="/logo/portfolio_logo_white.png"
                                alt="로고 흰"
                                className={`h-8 w-auto object-contain absolute top-0 left-0 transition-opacity duration-300
                            ${scrolled ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}
                          `}
                            />
                            <img
                                src="/logo/portfolio_logo.png"
                                alt="로고 검"
                                className={`h-8 w-auto object-contain absolute top-0 left-0 transition-opacity duration-300
                            ${scrolled ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                          `}
                            />
                        </div>

                        {/* 텍스트 로고 */}
                        <div className="relative h-8 w-[256px] mt-1 pl-1">
                            <img
                                src="/logo/portfolio_logo_text_white.png"
                                alt="텍스트 흰"
                                className={`h-8 w-auto object-contain absolute top-0 left-0.5 transition-opacity duration-300
                            ${scrolled ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}
                          `}
                            />
                            <img
                                src="/logo/portfolio_logo_text.png"
                                alt="텍스트 검"
                                className={`h-8 w-auto object-contain absolute top-0 left-0.5 transition-opacity duration-300
                            ${scrolled ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                          `}
                            />
                        </div>
                    </Link>

                    {/* 데스크탑 메뉴 */}
                    <ul className="hidden md:flex gap-20 relative">
                        {/* 회사소개 */}
                        <div
                            className="relative py-10"
                            onMouseEnter={() => setOpenMenu('about')}
                            onMouseLeave={() => setOpenMenu(null)}
                        >
                            <Link
                                href={`/${currentLocale}/company/Vision`}
                                className="cursor-pointer hover:text-[#56BC6F] font-bold"
                            >
                                {t('회사소개')}
                            </Link>
                            <AnimatePresence>
                                {openMenu === 'about' && (
                                    <motion.ul
                                        key="about-dropdown"
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={dropdownVariants}
                                        className="absolute top-full left-1/2 -translate-x-1/2 w-35 mt-0
                                    bg-white dark:bg-neutral-800
                                    border border-gray-200 dark:border-neutral-700
                                    rounded-md shadow-md z-50 text-center"
                                    >
                                        <li>
                                            <Link
                                                href={`/${currentLocale}/company/Vision`}
                                                className="block px-4 py-2 hover:bg-gray-100 hover:rounded dark:hover:bg-neutral-600 hover:text-[#56BC6F]"
                                            >
                                                {t('비전&목표')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={`/${currentLocale}/company/Timeline`}
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-600 hover:text-[#56BC6F]"
                                            >
                                                {t('연혁')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={`/${currentLocale}/company/Certification`}
                                                className="block px-4 py-2 hover:bg-gray-100 hover:rounded dark:hover:bg-neutral-600 hover:text-[#56BC6F]"
                                            >
                                                {t('인증')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={`/${currentLocale}/company/Locations`}
                                                className="block px-4 py-2 hover:bg-gray-100 hover:rounded dark:hover:bg-neutral-600 hover:text-[#56BC6F]"
                                            >
                                                {t('사업장')}
                                            </Link>
                                        </li>
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* 적층 제조 */}
                        <div
                            className="relative py-10 "
                            onMouseEnter={() => setOpenMenu('ProductAndService')}
                            onMouseLeave={() => setOpenMenu(null)}
                        >
                            <Link
                                href={`/${currentLocale}/business/Manufacturing`}
                                className="cursor-pointer hover:text-[#56BC6F] font-bold" // hover:text만 남기세요
                            >
                                {t('적층 제조')}
                            </Link>
                            <AnimatePresence>
                                {openMenu === 'ProductAndService' && (
                                    <motion.ul
                                        key="product-dropdown"
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={dropdownVariants}
                                        custom={scrolled}
                                        className="absolute top-full left-1/2 -translate-x-1/2 w-40 mt-0
                                       bg-white dark:bg-neutral-800
                                       border border-gray-200 dark:border-neutral-700
                                       rounded-md shadow-md z-50 text-center"
                                    >
                                        <li>
                                            <Link
                                                href={`/${currentLocale}/business/Manufacturing`}
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-600 hover:text-[#56BC6F]"
                                            >
                                                {t('제작')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={`/${currentLocale}/business/Repair`}
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-600 hover:text-[#56BC6F]"
                                            >
                                                {t('보수')}
                                            </Link>
                                        </li>
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </div>


                        {/* 금속 분말 */}
                        <div
                            className="relative py-10 "
                            onMouseEnter={() => setOpenMenu('Powder')}
                            onMouseLeave={() => setOpenMenu(null)}
                        >
                            <Link
                                href={`/${currentLocale}/powder/NiAlloy`}
                                className="cursor-pointer hover:text-[#56BC6F] font-bold" // hover:text만 남기세요
                            >
                                {t('금속 분말')}
                            </Link>
                            <AnimatePresence>
                                {openMenu === 'Powder' && (
                                    <motion.ul
                                        key="Powder-dropdown"
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={dropdownVariants}
                                        custom={scrolled}
                                        className="absolute top-full left-1/2 -translate-x-1/2 w-40 mt-0
                                       bg-white dark:bg-neutral-800
                                       border border-gray-200 dark:border-neutral-700
                                       rounded-md shadow-md z-50 text-center"
                                    >
                                        <li>
                                            <Link
                                                href={`/${currentLocale}/powder/NiAlloy`}
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-600 hover:text-[#56BC6F]"
                                            >
                                                {t('Ni Alloy')}
                                            </Link>
                                        </li>
                                        {/*
                                        <li>
                                            <Link
                                                href={`/${currentLocale}/powder/Stainless`}
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-600 hover:text-[#56BC6F]"
                                            >
                                                {t('Stainless')}
                                            </Link>
                                        </li>
                                        */}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </div>
                        

                        {/* 게시판 */}
                        <div
                            className="relative py-10"
                            onMouseEnter={() => setOpenMenu('IrAndPr')}
                            onMouseLeave={() => setOpenMenu(null)}
                        >
                            <Link
                                href={`/${currentLocale}/Blog/Lists`}
                                className="cursor-pointer hover:text-[#56BC6F] font-bold"
                            >
                                {t('소식지')}
                            </Link>

                        </div>

                        {/* 온라인 문의 */}

                        <div
                            className="relative py-10"
                            onMouseEnter={() => setOpenMenu('IrAndPr')}
                            onMouseLeave={() => setOpenMenu(null)}
                        >
                            <Link
                                href={`/${currentLocale}/Inquiry`}
                                className="cursor-pointer hover:text-[#56BC6F] font-bold"
                            >
                                {t('온라인 문의')}
                            </Link>

                        </div>
                    </ul>

                    {/* 우측 영역: 언어 선택 + 햄버거 버튼 */}
                    <div className="flex items-center gap-4 ml-6">
                        {/* 언어 드롭다운 */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                                className="flex items-center gap-1  dark:text-white hover:text-[#56BC6F] cursor-pointer"
                            >

                                <Globe2 className="w-6 h-6"/>
                                <span className="text-sm absolute left-5 top-3 ">{currentLocale}</span>
                                <ChevronDown className="w-4 h-4"/>
                            </button>
                            <div
                              className={clsx(
                                'absolute text-black left-1/2 -translate-x-1/2 mt-5 w-20 bg-white dark:bg-neutral-700 rounded shadow transition-all duration-300 overflow-hidden z-50',
                                showLanguageDropdown
                                  ? 'max-h-40 opacity-100 scale-100'
                                  : 'max-h-0 opacity-0 scale-95 pointer-events-none'
                              )}
                            >
                                <button
                                    onClick={() => {
                                        changeLanguage('ko');
                                        setShowLanguageDropdown(false);
                                    }}
                                    className="w-full text-base text-left flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-600"
                                >
                                    <img src="/flags/kr.png" alt="한국어" className="w-5 h-5 rounded-sm"/>
                                    <span className="ml-2">ko</span>
                                </button>
                                <button
                                    onClick={() => {
                                        changeLanguage('en');
                                        setShowLanguageDropdown(false);
                                    }}
                                    className="w-full text-base text-left flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-600"
                                >
                                    <img src="/flags/us.png" alt="English" className="w-5 h-5 rounded-sm"/>
                                    <span className="ml-2">en</span>
                                </button>
                            </div>
                        </div>

                        {/* 햄버거 메뉴 버튼 */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:flex z-50 relative"
                        >
                            <Menu className="w-6 h-6  dark:text-white hover:text-[#56BC6F] cursor-pointer"/>
                        </button>
                    </div>
                </nav>

            </header>


            {/* 전체화면 오버레이 메뉴 */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={overlayVariants}
                        className="fixed inset-0 z-[100] bg-white dark:bg-neutral-900"
                    >
                        {/* 상단 헤더 바 */}
                        <div
                            className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-neutral-700">
                            <Link href="/" className="flex items-center gap-3">
                                <img src="/logo/portfolio_logo.png" alt="로고" className="h-8 w-auto object-contain pl-20"/>
                                <img src="/logo/portfolio_logo_text.png" alt="로고"
                                     className="mt-1 h-8 w-auto object-contain"/>
                            </Link>

                            {/* 언어 드롭다운 */}
                            <div className="absolute right-35 top-13 hidden lg:flex pr-3" ref={dropdownRef}>
                                <button
                                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                                    className="flex items-center h-[20px] gap-1 text-gray-700 dark:text-white hover:text-[#56BC6F] cursor-pointer"
                                >
                                    <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-6 flex items-center gap-2 hover:text-[#56BC6F]">
                                        <Globe2 className="w-5 h-5"/>
                                        <span className="text-sm absolute left-4 top-0 font-bold">{currentLocale}</span>
                                    </h3>
                                    <ChevronDown className="w-4 h-4 mb-5"/>
                                </button>
                                <div
                                  className={clsx(
                                    'absolute text-black left-1/2 -translate-x-1/2 mt-5 w-20 bg-white dark:bg-neutral-700 rounded shadow transition-all duration-300 overflow-hidden z-50',
                                    showLanguageDropdown
                                      ? 'max-h-40 opacity-100 scale-100'
                                      : 'max-h-0 opacity-0 scale-95 pointer-events-none'
                                  )}
                                >
                                    <button
                                        onClick={() => {
                                            changeLanguage('ko');
                                            setShowLanguageDropdown(false);
                                        }}
                                        className="w-full text-base text-left flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-600 cursor-pointer"
                                    >
                                        <img src="/flags/kr.png" alt="한국어" className="w-5 h-5 rounded-sm"/>
                                        <span className="ml-2">ko</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            changeLanguage('en');
                                            setShowLanguageDropdown(false);
                                        }}
                                        className="w-full text-base text-left flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-600 cursor-pointer"
                                    >
                                        <img src="/flags/us.png" alt="English" className="w-5 h-5 rounded-sm"/>
                                        <span className="ml-2">en</span>
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 rounded-full transition-colors pr-20"
                            >
                                <X className="w-8 h-8 text-gray-700 dark:text-gray-200 hover:text-[#56BC6F] cursor-pointer"/>
                            </button>
                        </div>

                        {/* 메뉴 컨테이너 */}
                        <motion.div
                            variants={menuVariants}
                            className="flex flex-col lg:flex-row px-8 py-4 justify-center overflow-auto lg:px-16 lg:ml-0 h-[90vh]"
                        >
                            {/* 왼쪽 메인 메뉴 */}
                            <div className="w-full lg:w-1/2 mb-12 lg:ml-40 lg:hidden overflow-auto overflow-auto scrollbar-hide h-full ">
                                <nav className="space-y-6">
                                    {/* 회사소개 */}
                                    <div className="group">
                                        <button
                                            onClick={() => toggleMobileSubmenu('about')}
                                            className="flex items-center justify-between w-full text-3xl lg:text-4xl font-light text-gray-800 dark:text-gray-200 hover:text-[#56BC6F] transition-colors py-3 border-b border-gray-200 dark:border-neutral-700"
                                        >
                                            <span>{t('회사소개')}</span>
                                            <ChevronDown
                                                className={clsx("w-8 h-8 transition-transform duration-300", mobileSubmenuOpen['about'] && "rotate-180")}/>
                                        </button>
                                        <AnimatePresence>
                                            {mobileSubmenuOpen['about'] && (
                                                <motion.div
                                                    initial={{height: 0, opacity: 0}}
                                                    animate={{height: 'auto', opacity: 1}}
                                                    exit={{height: 0, opacity: 0}}
                                                    transition={{duration: 0.3}}
                                                    className="overflow-hidden ml-8 mt-4"
                                                >
                                                    <div className="space-y-3">
                                                        <Link
                                                            href={`/${currentLocale}/company/Vision`}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="block text-xl text-gray-600 dark:text-gray-400 hover:text-[#56BC6F] transition-colors py-2"
                                                        >
                                                            {t('비전&목표')}
                                                        </Link>
                                                        <Link
                                                            href={`/${currentLocale}/company/Timeline`}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="block text-xl text-gray-600 dark:text-gray-400 hover:text-[#56BC6F] transition-colors py-2"
                                                        >
                                                            {t('연혁')}
                                                        </Link>
                                                        <Link
                                                            href={`/${currentLocale}/company/Certification`}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="block text-xl text-gray-600 dark:text-gray-400 hover:text-[#56BC6F] transition-colors py-2"
                                                        >
                                                            {t('인증')}
                                                        </Link>
                                                        <Link
                                                            href={`/${currentLocale}/company/Locations`}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="block text-xl text-gray-600 dark:text-gray-400 hover:text-[#56BC6F] transition-colors py-2"
                                                        >
                                                            {t('사업장')}
                                                        </Link>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* 적층 제조 */}
                                    <div className="group">
                                        <button
                                            onClick={() => toggleMobileSubmenu('ProductAndService')}
                                            className="flex items-center justify-between w-full text-3xl lg:text-4xl font-light text-gray-800 dark:text-gray-200 hover:text-[#56BC6F] transition-colors py-3 border-b border-gray-200 dark:border-neutral-700"
                                        >
                                            <span>{t('적층 제조')}</span>
                                            <ChevronDown
                                                className={clsx("w-8 h-8 transition-transform duration-300", mobileSubmenuOpen['ProductAndService'] && "rotate-180")}/>
                                        </button>
                                        <AnimatePresence>
                                            {mobileSubmenuOpen['ProductAndService'] && (
                                                <motion.div
                                                    initial={{height: 0, opacity: 0}}
                                                    animate={{height: 'auto', opacity: 1}}
                                                    exit={{height: 0, opacity: 0}}
                                                    transition={{duration: 0.3}}
                                                    className="overflow-hidden ml-8 mt-4"
                                                >
                                                    <div className="space-y-3">
                                                        <Link
                                                            href={`/${currentLocale}/business/Manufacturing`}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="block text-xl text-gray-600 dark:text-gray-400 hover:text-[#56BC6F] transition-colors py-2"
                                                        >
                                                            {t('제작')}
                                                        </Link>
                                                        <Link
                                                            href={`/${currentLocale}/business/Repair`}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="block text-xl text-gray-600 dark:text-gray-400 hover:text-[#56BC6F] transition-colors py-2"
                                                        >
                                                            {t('보수')}
                                                        </Link>

                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* 금속 분말 */}
                                    <div className="group">
                                        <button
                                            onClick={() => toggleMobileSubmenu('Powder')}
                                            className="flex items-center justify-between w-full text-3xl lg:text-4xl font-light text-gray-800 dark:text-gray-200 hover:text-[#56BC6F] transition-colors py-3 border-b border-gray-200 dark:border-neutral-700"
                                        >
                                            <span>{t('금속 분말')}</span>
                                            <ChevronDown
                                                className={clsx("w-8 h-8 transition-transform duration-300", mobileSubmenuOpen['Powder'] && "rotate-180")}/>
                                        </button>
                                        <AnimatePresence>
                                            {mobileSubmenuOpen['Powder'] && (
                                                <motion.div
                                                    initial={{height: 0, opacity: 0}}
                                                    animate={{height: 'auto', opacity: 1}}
                                                    exit={{height: 0, opacity: 0}}
                                                    transition={{duration: 0.3}}
                                                    className="overflow-hidden ml-8 mt-4"
                                                >
                                                    <div className="space-y-3">
                                                        <Link
                                                            href={`/${currentLocale}/powder/NiAlloy`}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="block text-xl text-gray-600 dark:text-gray-400 hover:text-[#56BC6F] transition-colors py-2"
                                                        >
                                                            {t('Ni Alloy')}
                                                        </Link>
                                                        {/*
                                                        <Link
                                                            href={`/${currentLocale}/powder/Stainless`}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="block text-xl text-gray-600 dark:text-gray-400 hover:text-[#56BC6F] transition-colors py-2"
                                                        >
                                                            {t('Stainless')}
                                                        </Link>
                                                        */}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* 소식지 */}
                                    <div>
                                        <Link
                                            href={`/${currentLocale}/Blog/Lists`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block text-3xl lg:text-4xl font-light text-gray-800 dark:text-gray-200 hover:text-[#56BC6F] transition-colors py-3 border-b border-gray-200 dark:border-neutral-700"
                                        >
                                            {t('소식지')}
                                        </Link>
                                    </div>

                                    {/* 온라인 문의 */}
                                    <div>
                                        <Link
                                            href={`/${currentLocale}/Inquiry`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block text-3xl lg:text-4xl font-light text-gray-800 dark:text-gray-200 hover:text-[#56BC6F] transition-colors py-3 border-b border-gray-200 dark:border-neutral-700"
                                        >
                                            {t('온라인 문의')}
                                        </Link>
                                    </div>
                                </nav>
                            </div>


                            {/* PC 가로 메뉴 (lg 이상에만 보이도록) */}
                            <div className="w-full hidden lg:flex justify-center gap-32 py-26 bg-white dark:bg-neutral-900 dark:border-neutral-700">
                                {/* 회사소개 */}
                                <div className="flex flex-col items-center group">
                                <span
                                    className="text-3xl font-semibold text-gray-300 group-hover:text-[#53BA6E] transition-colors duration-200 dark:text-gray-400 dark:group-hover:text-[#53BA6E]">
                                  <Link href={`/${currentLocale}/company/Vision`}
                                        onClick={() => setIsMobileMenuOpen(false)}>{t('회사소개')}</Link>
                                </span>
                                    <div className="mt-10 flex flex-col items-center gap-1">
                                        {["Vision", "Timeline", "Certification", "Locations"].map((path, i) => (
                                            <Link
                                                key={i}
                                                href={`/${currentLocale}/company/${path}`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="text-xl text-gray-300 group-hover:text-black dark:text-gray-400 dark:group-hover:text-black py-2 transition-colors duration-300 hover:animate-blink hover:scale-105"
                                            >
                                                {{
                                                    Vision: t("비전&목표"),
                                                    Timeline: t("연혁"),
                                                    Certification: t("인증"),
                                                    Locations: t("사업장")
                                                }[path]}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* 적층 제조 */}
                                <div className="flex flex-col items-center group">
                                <span
                                    className="text-3xl font-semibold text-gray-300 group-hover:text-[#53BA6E] transition-colors duration-200 dark:text-gray-400 dark:group-hover:text-[#53BA6E]">
                                  <Link href={`/${currentLocale}/business/Manufacturing`}
                                        onClick={() => setIsMobileMenuOpen(false)}>{t('적층 제조')}</Link>
                                </span>
                                    <div className="mt-10 flex flex-col items-center gap-1">
                                        {["Manufacturing", "Repair", "Metalpowder"].map((path, i) => (
                                            <Link
                                                key={i}
                                                href={`/${currentLocale}/business/${path}`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="text-xl text-gray-300 group-hover:text-black dark:text-gray-400 dark:group-hover:text-black py-2 transition-colors duration-300 hover:animate-blink hover:scale-105"
                                            >
                                                {{
                                                    "Manufacturing": t("제작"),
                                                    "Repair": t("보수"),

                                                }[path]}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* 금속 분말 */}
                                <div className="flex flex-col items-center group">
                                <span
                                    className="text-3xl font-semibold text-gray-300 group-hover:text-[#53BA6E] transition-colors duration-200 dark:text-gray-400 dark:group-hover:text-[#53BA6E]">
                                  <Link href={`/${currentLocale}/powder/NiAlloy`}
                                        onClick={() => setIsMobileMenuOpen(false)}>{t('금속 분말')}</Link>
                                </span>
                                    <div className="mt-10 flex flex-col items-center gap-1">
                                        {["NiAlloy"].map((path, i) => (
                                            <Link
                                                key={i}
                                                href={`/${currentLocale}/powder/${path}`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="text-xl text-gray-300 group-hover:text-black dark:text-gray-400 dark:group-hover:text-black py-2 transition-colors duration-300 hover:animate-blink hover:scale-105"
                                            >
                                                {{
                                                    "NiAlloy": t("NiAlloy"),


                                                }[path]}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* 소식지 */}
                                <div className="flex flex-col items-center group">
                                <span
                                    className="text-3xl font-semibold text-gray-300 group-hover:text-[#53BA6E] transition-colors duration-200 dark:text-gray-400 dark:group-hover:text-[#53BA6E]">
                                  <Link href={`/${currentLocale}/Blog/Lists`}
                                        onClick={() => setIsMobileMenuOpen(false)}>{t('소식지')}</Link>
                                </span>
                                </div>

                                {/* 온라인 문의 */}
                                <div className="flex flex-col items-center group">
                                <span
                                    className="text-3xl font-semibold text-gray-300 group-hover:text-[#53BA6E] transition-colors duration-200 dark:text-gray-400 dark:group-hover:text-[#53BA6E]">
                                    <Link href={`/${currentLocale}/Inquiry`}
                                          onClick={() => setIsMobileMenuOpen(false)}>{t('온라인 문의')}</Link>
                                </span>
                                </div>
                            </div>

                            <style jsx global>{`
                                @keyframes blink {
                                    0%, 100% {
                                        text-shadow: 0 0 8px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.7);
                                    }
                                    50% {
                                        text-shadow: 0 0 15px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.9);
                                    }
                                }

                                .hover\\:animate-blink:hover {
                                    animation: blink 1.5s ease-in-out infinite;
                                }
                            `}</style>


                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </>
    );
}