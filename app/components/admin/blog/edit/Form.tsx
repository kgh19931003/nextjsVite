'use client';

import React, {useEffect, useState, useCallback, useMemo, useRef} from 'react';
import {useParams, usePathname, useRouter} from 'next/navigation';
import { swrFetcher } from '@/lib/function';
import { mutate } from 'swr';
import Editor from "@/lib/tiptap/Editor";



interface BlogData {
    title: string;
    content: string;
    category: string;
    regDate: string;
}


const categoryList: Record<string, string[]> = {
    "ko": [
        "갓테크소식",
        "뉴스기사"
    ],

    "en": [
        "Godtech Announce",
        "News"
    ]
}


const Form = ({ locale, idx }: { locale: string; idx?: string }) => {
    const router = useRouter();
    const isEditMode = idx !== undefined && idx !== 'new' && idx !== '';
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const currentLocale = useMemo(() => {
        return pathname?.split('/')[1];
    }, [pathname]);

    const [sourceOrgan, setSourceOrgan] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubTitle] = useState('');
    const [category, setCategory] = useState(categoryList[currentLocale][0]);
    const [regDate, setRegDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });
    let [content, setContent] = useState('');
    let editorGetHTML = () => '';

    const fetchData = useCallback(async () => {
        if (!isEditMode) return;
        try {
            const res = await swrFetcher<BlogData>(`/${currentLocale}/api/admin/blog/one/${idx}`);
            setTitle(res.title);
            setSubTitle(res.subtitle);
            setSourceOrgan(res.sourceOrgan);
            setCategory(res.category || categoryList[currentLocale][0]);
            setRegDate(res.regDate?.split('T')[0] || '');
            setContent(res.content)
        } catch {
            alert('블로그 정보를 불러오는 데 실패했습니다.');
        }
    }, [isEditMode, idx ]);

    useEffect(() => {
        if (isEditMode) {
            fetchData(); // fetch 내부에서 editor.commands.setContent() 호출
        }
    }, [fetchData, isEditMode]);



    const handleSubmit = async () => {
        if (!title.trim()) {
            alert('제목을 입력하세요');
            return;
        }

        setLoading(true);

        content = editorGetHTML(); // submit 시점 HTML 가져오기
        content = content.replace(/<p>\s*<\/p>/g, '<br/>'); // 빈 <p></p> → <br/> 변환

        const url = isEditMode
            ? `/${currentLocale}/api/admin/blog/update/${idx}`
            : `/${currentLocale}/api/admin/blog/create`;

        const method = isEditMode ? 'PUT' : 'POST';

        try {
            await swrFetcher(url, {
                method,
                body: {
                    "language": currentLocale,
                    "sourceOrgan": sourceOrgan,
                    "title": title,
                    "subtitle": subtitle,
                    "content": content,
                    "category": category,
                    "regDate": regDate,
                },
            });

            alert(isEditMode ? '수정 완료' : '추가 완료');
            await mutate(`/${currentLocale}/api/admin/blog/list?page=1`);
            router.push(`/${currentLocale}/admin/blog/list`);
        } catch {
            alert('저장 실패');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-xl font-bold mb-4">{isEditMode ? '블로그 정보수정' : '블로그 정보추가'}</h1>

            <div className="space-y-4">
                <div className="flex-1">
                    <label className="block mb-1 text-sm font-medium text-gray-700">제목</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="제목"
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                        autoFocus
                    />
                </div>

                <div className="flex-1">
                    <label className="block mb-1 text-sm font-medium text-gray-700">부제목</label>
                    <input
                        type="text"
                        name="subtitle"
                        value={subtitle}
                        onChange={e => setSubTitle(e.target.value)}
                        placeholder="부제목"
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                        autoFocus
                    />
                </div>

                {/* 카테고리 및 등록일자 */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium text-gray-700">카테고리</label>
                        <select
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        >
                            {categoryList[currentLocale].map((value, index) => (
                                <option key={value} value={value}>{value}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium  text-gray-700">등록일자</label>
                        <input
                            type="date"
                            value={regDate}
                            onChange={e => setRegDate(e.target.value)}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium text-gray-700">출처</label>
                        <input
                            type="text"
                            name="sourceOrgan"
                            value={sourceOrgan}
                            onChange={e => setSourceOrgan(e.target.value)}
                            placeholder="출처"
                            className="w-full px-4 py-1.5 border border-gray-300 rounded"
                            autoFocus
                        />
                    </div>

                </div>

                {/* 에디터 박스 */}
                <div>
                    <Editor
                        idx={idx}
                        initialContent={content}
                        getEditorHTML={(fn) => (editorGetHTML = fn)}
                        editorImageUploadUrl={`/${currentLocale}/api/admin/blog/imageUpload/${idx}`}
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors ${
                        loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    type="button"
                >
                    {isEditMode ? '수정하기' : '추가하기'}
                </button>
            </div>
        </div>
    );
};

export default Form;
