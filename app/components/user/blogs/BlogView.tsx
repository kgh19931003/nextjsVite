'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { swrFetcher } from "@/lib/function";
import PageHeroAuto from "@/components/user/PageHeroAuto";
import {useSafeTranslations} from "@/lib/intl/useSafeTranslations";

interface BlogPostSummary {
    idx: number;
    sourceOrgan: string;
    title: string;
    subtitle: string;
    thumbnail: string;
    content: string;
    category: string;
    regDate: string;
}

interface BlogPost {
    idx: number;
    sourceOrgan: string;
    title: string;
    subtitle: string;
    thumbnail: string;
    content: string;
    category: string;
    regDate: string;
    randomBlog: BlogPostSummary[]
}

const BlogViewPage = ({ locale, idx }: { locale: string; idx?: string }) => {
    const t = useSafeTranslations("blog");
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = pathname?.split('/')[1] || 'ko';

    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!idx) return;
        setLoading(true);

        swrFetcher(`/${currentLocale}/api/blog/one/${idx}`)
            .then((res) => {
                setBlog(res);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [idx]);

    const handleBackToList = () => {
        router.push(`/${currentLocale}/Blog/Lists`);
    };

    const getCategoryColor = (type: string) => {
        switch (type) {
            case 'Portfolio소식':
                return 'bg-green-100 text-[#56BC6F]';
            case '뉴스기사':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };


    const handleBlogChange = (newId: string) => {
        router.push(`/${currentLocale}/Blog/views/${newId}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ✅ 로딩 화면
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
                <svg
                    className="animate-spin h-10 w-10 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                </svg>
                <p className="mt-4 text-lg text-gray-700">로딩 중...</p>
            </div>
        );
    }

    // ✅ 에러 화면
    if (error || !blog) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("블로그를 찾을 수 없습니다")}</h1>
                    <p className="text-gray-600 mb-6">{error ?? t('요청하신 블로그 포스트가 존재하지 않습니다.')}</p>
                    <button
                        onClick={handleBackToList}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        {t("블로그 목록으로 돌아가기")}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/bloghero.png" />

            <div className="min-h-screen mt-20 bg-gradient-to-br from-slate-50 to-gray-100">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-4xl mx-auto px-4 py-6">
                        <button
                            onClick={handleBackToList}
                            className="flex items-center gap-2 text-[#56BC6F] hover:text-[#56BC6F] mb-4 transition-colors duration-200 cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            {t("목록으로 돌아가기")}
                        </button>

                        {/* Category Badge */}
                        <div className="mb-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(blog.category)}`}>
                                {blog.category}
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold text-gray-900 mb-2 leading-tight">{blog.title}</h1>
                        <h2 className="text-xl text-gray-600 mb-4">{blog.subtitle}</h2>

                        <div className="flex items-center gap-6 text-gray-600">
                            <span className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                {blog.regDate}
                                <span className="ml-4 text-base">{blog.sourceOrgan}</span>
                            </span>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-4xl mx-auto px-4 py-8">
                    {/* Content */}
                    <article className="mb-12">
                        <div className="prose prose-lg max-w-none">
                            <div
                                className="text-gray-700 leading-relaxed text-lg mb-8"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />
                        </div>
                    </article>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200">
                        <button
                            onClick={handleBackToList}
                            className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg cursor-pointer"
                        >
                            {t("다른 글 보기")}
                        </button>
                    </div>

                    {/* Related Posts */}
                    <div className="mt-16">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">{t("관련 글")}</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blog.randomBlog.map(post => (
                                <div
                                    key={post.idx}
                                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                                    onClick={() => handleBlogChange(post.idx.toString())}
                                >
                                    <img
                                        src={post.thumbnail}
                                        alt={post.title}
                                        className="w-full h-48 object-cover rounded-t-xl"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop';
                                        }}
                                    />
                                    <div className="p-6">
                                        <div className="mb-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                                                {post.category}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                            {post.title}
                                        </h4>
                                        <div
                                            className="text-gray-600 text-sm mb-3 line-clamp-2"
                                            dangerouslySetInnerHTML={{ __html: post.content }}
                                        />
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <span>{post.regDate}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default BlogViewPage;
