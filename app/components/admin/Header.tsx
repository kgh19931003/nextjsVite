'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { faBell, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isTokenExpired } from '@/lib/function'; // import 경로 확인
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

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex justify-between items-center px-6 py-3">
                <div className="flex items-center space-x-4">
                    <button className="md:hidden text-gray-500 hover:text-gray-700">
                        <span className="material-icons-outlined">menu</span>
                    </button>
                </div>

                <div className="flex items-center space-x-6">
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
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
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
                                                window.location.href = '/admin/login';
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            로그아웃
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        href="login"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        로그인
                                    </Link>
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
