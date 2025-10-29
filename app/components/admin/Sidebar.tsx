'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarItem } from '@/lib/types/admin';
import {faArrowLeft, faArrowRight, faBell} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/navigation";
import {useLocale} from "next-intl";

// 사이드바 아이템 데이터
const sidebarItems: ({ path: string; subItems: any[]; icon: string; title: string } | {
    path: string;
    subItems: ({ path: string; title: string })[];
    icon: string;
    title: string
})[] = [
    /*
    {
        title: '',
        path: '/admin/dashboard',
        icon: '대시보드',
        subItems: [],
    },
    {
        title: '',
        path: '/admin/banner',
        icon: '배너관리',
        subItems: [],
    },
    {
        title: '',
        path: '/admin/product',
        icon: '상품관리',
        subItems: [],
    },
     */
    {
        title: '',
        path: '/admin/users/List',
        icon: '회원관리',
        subItems: [
            { title: '사용자 목록', path: '/admin/users/List' }
        ],
    },
    {
        title: '',
        path: '/admin/blog/list',
        icon: '블로그 관리',
        subItems: [],
    },
    {
        title: '',
        path: '/admin/performance/list',
        icon: '수행내역 관리',
        subItems: [],
    },
    {
        title: '',
        path: '/admin/alloy/list',
        icon: '강종 관리',
        subItems: [],
    },
    {
        title: '',
        path: '/admin/inquiry/list',
        icon: '문의 관리',
        subItems: [],
    },
    {
        title: '',
        path: '/admin/policy/list',
        icon: '정책 관리',
        subItems: [],
    },
    /*
    {
        title: '',
        path: '/admin/settings',
        icon: '설정',
        subItems: [
            { title: '프로필 설정', path: '/admin/settings/profile' },
            { title: '보안 설정', path: '/admin/settings/security' },
        ],
    }

     */
];

const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState<string | null>(null); // 드롭다운 상태 관리
    const locale = useLocale();
    const [currentLocale, setCurrentLocale] = useState(locale);
    const pathname = usePathname();
    const router = useRouter();
    // 드롭다운 열기/닫기 토글
    const toggleDropdown = (itemPath: string) => {
        setActiveItem(activeItem === itemPath ? null : itemPath); // 이미 열려 있으면 닫고, 닫혀 있으면 열기
    };

    useEffect(() => {
        const segments = pathname.split('/').filter(Boolean);
        setCurrentLocale(segments[0]);
    }, [pathname]);

    return (
        <div className={`bg-gray-900 text-white h-screen ${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 flex flex-col`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                {!collapsed && <h1 className="text-xl font-bold">관리자</h1>}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="cursor-pointer p-2  rounded-md hover:bg-gray-700"
                >
                    {collapsed ? <FontAwesomeIcon icon={faArrowRight} /> : <FontAwesomeIcon icon={faArrowLeft} />}
                </button>
            </div>

            <nav className="flex-1 pt-4">
                <ul>
                    {sidebarItems.map((item) => {
                        const withLocalePath = `/${currentLocale}${item.path}`;
                        const isActive = pathname === withLocalePath;

                        return (
                            <li key={item.path} className="mb-1">
                                <div>
                                    <button
                                        onClick={() =>
                                            item.subItems.length
                                                ? toggleDropdown(item.path)
                                                : router.push(withLocalePath)
                                        }
                                        className={`${isActive ? 'bg-gray-600' : ''} ${collapsed ? 'hidden' : ''} flex items-center px-4 py-3 cursor-pointer  w-full text-left`}
                                    >
                                        <span className="material-icons-outlined text-xl">{item.icon}</span>
                                        {!collapsed && <span className="ml-3">{item.title}</span>}
                                        {item.subItems.length > 0 && (
                                            <span className={`ml-auto ${activeItem === item.path ? 'rotate-180' : ''} transition-transform`}>
                                              ▼
                                            </span>
                                        )}
                                    </button>

                                    {/* 드롭다운 서브 메뉴 */}
                                    {item.subItems.length > 0 && (
                                        <ul
                                            className={`cursor-pointer overflow-hidden transition-all duration-300 ease-in-out max-h-0 ${activeItem === item.path ? 'max-h-96' : ''}`}
                                        >
                                            {item.subItems.map(subItem => {
                                                const subItemPath = `/${currentLocale}${subItem.path}`;
                                                const isSubActive = pathname === subItemPath;

                                                return (
                                                    <li key={subItem.path}>
                                                        <Link
                                                            href={subItemPath}
                                                            className={`w-full flex items-center px-4 py-2 ${collapsed ? 'hidden' : ''} ${isSubActive ? 'bg-gray-600' : ''}`}
                                                        >
                                                            {!collapsed && <span className="ml-5">{subItem.title}</span>}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            </li>
                        );
                    })}

                </ul>
            </nav>

        </div>
    );
};

export default Sidebar;
