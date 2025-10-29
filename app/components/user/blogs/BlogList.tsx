'use client'

import React, { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from "next/navigation";
import { swrFetcher } from "@/lib/function";
import PageHeroAuto from "@/components/user/PageHeroAuto";
import {useSafeTranslations} from "@/lib/intl/useSafeTranslations";

interface BlogPost {
    idx: number;
    type: string;
    title: string;
    subtitle: string;
    thumbnail: string;
    content: string;
    category: string;
    regDate: string;
}

const categoryList: Record<string, string[]> = {
    ko: ["전체", "갓테크소식", "뉴스기사"],
    en: ["All", "Godtech Announce", "News"]
};

const BlogMasonryList = () => {
    const t = useSafeTranslations("blog");
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0); // index 0 = 전체
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const pathname = usePathname();

    const currentLocale = useMemo(() => pathname?.split('/')[1] || 'ko', [pathname]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await swrFetcher(`/${currentLocale}/api/blog/list?size=300&language=${currentLocale}`, {
                    headers: {
                        'X-Skip-Auth': 'true'
                    }
                });
                setBlogPosts(res.contents ?? []);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [currentLocale]);

    const filteredPosts = useMemo(() => {
        if (selectedTabIndex === 0) return blogPosts; // 전체

        const selectedCategory = categoryList[currentLocale]?.[selectedTabIndex];
        return blogPosts.filter(post => post.category === selectedCategory);
    }, [selectedTabIndex, blogPosts, currentLocale]);

    const categories = categoryList[currentLocale] ?? [];

    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/bloghero.png" />

            {loading ? (
                <div className="flex flex-col items-center mt-40 min-h-screen">
                    <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    <p className="mt-4 text-lg text-gray-700">로딩 중...</p>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 py-10">{error}</div>
            ) : (
                <div className="min-h-screen from-slate-50 mt-20 to-gray-100">
                    <main className="max-w-7xl mx-auto px-4 py-8">
                        {/* ✅ 탭 */}
                        <div className="flex gap-4 justify-center mb-20">
                            {categories.map((label, index) => {
                                const isActive = selectedTabIndex === index;

                                let activeClass = isActive
                                    ? label.includes("갓테크소식") || label.includes("Godtech")
                                        ? 'bg-[#56BC6F] text-white shadow'
                                        : label.includes("뉴스") || label.includes("News")
                                            ? 'bg-blue-600 text-white shadow'
                                            : 'bg-gray-700 text-white shadow'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200';

                                return (
                                    <button
                                        key={label}
                                        onClick={() => setSelectedTabIndex(index)}
                                        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer ${activeClass}`}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* ✅ 카드 리스트 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredPosts.map((post) => (
                                <div
                                    key={post.idx}
                                    onClick={() => router.push(`/${currentLocale}/Blog/views/${post.idx}`)}
                                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group overflow-hidden flex flex-col"
                                >
                                    <div className="relative overflow-hidden h-48">
                                        <img
                                            src={post.thumbnail}
                                            alt={post.title}
                                            className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                    </div>

                                    <div className="p-6 flex flex-col justify-between flex-grow">
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                            post.category.includes("갓테크") || post.category.includes("Godtech")
                                ? 'text-[#56BC6F] bg-green-50'
                                : post.category.includes("뉴스") || post.category.includes("News")
                                    ? 'text-blue-800 bg-blue-100'
                                    : 'text-gray-600 bg-gray-100'
                        }`}>
                          {post.category}
                        </span>
                                                <span className="text-sm text-gray-500">{post.regDate}</span>
                                            </div>

                                            <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#C6C6C6] transition-colors duration-200 line-clamp-2">
                                                {post.title}
                                            </h2>

                                            <p className="text-gray-600 text-sm leading-relaxed text-sm mb-4 line-clamp-3">
                                                {post.content}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto">
                                            <button className="text-[#56BC6F] font-medium text-sm hover:text-gray-400 transition-colors duration-200 flex items-center gap-1 group cursor-pointer">
                                                {t("더 읽기")}
                                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 게시물 없음 안내 */}
                        {filteredPosts.length === 0 && (
                            <div className="text-center text-gray-400 py-10">
                                {t("게시물이 없습니다.")}
                            </div>
                        )}
                    </main>
                </div>
            )}
        </>
    );
};

export default BlogMasonryList;
