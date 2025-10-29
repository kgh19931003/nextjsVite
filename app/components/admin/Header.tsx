'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isTokenExpired } from '@/lib/function';
import {ChevronDown, Globe2, Menu} from "lucide-react";
import clsx from "clsx";
import {usePathname, useRouter} from "next/navigation";
import {useLocale} from "next-intl"; // import 경로 확인
interface HeaderProps {
    user: {
        name: string;
        role: string;
    };
}

const Header: React.FC<HeaderProps> = ({ user }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const locale = useLocale();
    const [currentLocale, setCurrentLocale] = useState(locale);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || isTokenExpired(token)) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


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

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex justify-between items-center px-6 py-3">
                <div className="flex items-center space-x-4">
                    <button className="md:hidden text-gray-500 hover:text-gray-700">
                        <span className="material-icons-outlined">menu</span>
                    </button>
                </div>

                <div className="flex items-center space-x-6">

                    {/* 우측 영역: 언어 선택 + 햄버거 버튼 */}
                    <div className="flex items-center gap-4 ml-6">
                        {/* 언어 드롭다운 */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                                className="flex items-center gap-1  dark:text-white hover:text-[#56BC6F] cursor-pointer"
                            >

                                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400  flex items-center gap-2">
                                    <Globe2 className="w-6 h-6"/>
                                    <span className="text-sm absolute left-5 top-3 font-bold">{currentLocale}</span>
                                </h3>
                                <ChevronDown className="w-4 h-4"/>
                            </button>
                            <div
                                className={clsx(
                                    'absolute text-black right-0 mt-5 w-20 bg-white dark:bg-neutral-700 rounded shadow transition-all duration-300 overflow-hidden z-50',
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
                    </div>


                    <div className="relative">
                        <button className="text-gray-500 hover:text-gray-700">
                            <FontAwesomeIcon icon={faBell} />
                        </button>
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    </div>

                    <div className="cursor-pointer relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(prev => !prev)}
                            className="flex items-center space-x-2"
                        >

                        {isLoggedIn ? (
                            <>
                            <div className="cursor-pointer w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                {user.name.charAt(0)}
                            </div>
                            <div className="cursor-pointer hidden md:block text-left">
                                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.role}</p>
                            </div>
                            </>
                        ) : ''}

                            <FontAwesomeIcon icon={faChevronDown} className="cursor-pointer text-gray-400" />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-5 w-32 justify-center itens-center bg-white rounded-md shadow-lg py-1 z-50">
                                {isLoggedIn ? (
                                    <>
                                        <Link
                                            href="/admin/settings"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            설정
                                        </Link>
                                        <button
                                            onClick={() => {
                                                localStorage.removeItem('token');
                                                document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
                                                window.location.href = '/admin/login';
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                        >
                                            로그아웃
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => {
                                            window.location.href = '/admin/login';
                                        }}
                                        className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    >
                                        로그인
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
