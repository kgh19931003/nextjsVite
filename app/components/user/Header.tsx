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
                                  max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 flex items-center justify-center
                                  transition-[height] duration-500 ease-in-out
                                  ${scrolled ? 'h-16' : 'h-24'}
                                `}>


                    {/* 데스크탑 메뉴 */}
                    <ul className="hidden md:flex gap-30 relative">
                        <li
                            className="relative py-10 font-bold cursor-pointer hover:text-[#56BC6F]"
                            onClick={() => location.href = `/${currentLocale}/admin/fileUpload/edit`}>
                                {t('관리자')}
                        </li>
                        <li className="relative py-10">
                            <a href={`https://github.com/kgh19931003/nextjsVite`} target="_blank" className="cursor-pointer hover:text-[#56BC6F] font-bold">
                                {t('Frontend Git')}
                            </a>
                        </li>
                        <li className="relative py-10">
                            <a href={`https://github.com/kgh19931003/ktBootSpring`} target="_blank" className="cursor-pointer hover:text-[#56BC6F] font-bold">
                                {t('Backend Git')}
                            </a>
                        </li>
                    </ul>

                </nav>
            </header>

        </>
    );
}