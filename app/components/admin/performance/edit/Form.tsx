'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {swrFetcher} from "@/lib/function";
import {mutate} from "swr";
import UploadImage from "@/lib/upload/Image";
import Editor from "@/lib/tiptap/Editor";
import { useUploadState } from '@/lib/upload/hook/useUploadState';
import {PerformanceFormType, PerformanceResponse} from "@/lib/types/common";



const categoryList: Record<string, string[]> = {
    "ko": [
        "Material",
        "Repair",
        "Manufacturing"
    ],
    "en": [
        "Material",
        "Repair",
        "Manufacturing"
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

    let [content, setContent] = useState('');
    let editorGetHTML = () => '';

    // 기본 폼 필드
    const [form, setForm] = useState({
        language: currentLocale,
        category: categoryList[currentLocale][0],
        title: '',
        subtitle: '',
        content: '',
    });

    // 이미지 업로드 상태 (커스텀 훅 사용)
    const imageUpload = useUploadState();

    useEffect(() => {
        const fetchData = async () => {
            if (!isEditMode) return;

            try {
                const res = await swrFetcher<PerformanceResponse>(`/${currentLocale}/api/admin/performance/one/${idx}`);

                setForm({
                    language: currentLocale || '',
                    category: res.category || '',
                    title: res.title || '',
                    subtitle: res.subtitle || '',
                    content: res.content || '',
                });

                // 이미지 상태 초기화
                imageUpload.initializeUploadState({
                    fileData: res.fileImage
                        ? Array.isArray(res.fileImage)
                            ? res.fileImage
                            : [res.fileImage]
                        : [],
                    fileUuid: res.fileUuid || [],
                    fileDeleteUuid: res.fileDeleteUuid || [],
                    fileIndex: res.fileIndex || [],
                    fileOriginalIndex: res.fileIndex || [],
                    fileDeleteIndex: res.fileDeleteIndex || [],
                    fileMultipartFileOrder: res.fileMultipartFileOrder || [],
                    fileOrder: res.fileOrder || [],
                });

            } catch (err) {
                alert('수행내역 정보를 불러오는 데 실패했습니다.');
            }
        };

        fetchData();
    }, [isEditMode, idx, currentLocale]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);

        const url = isEditMode
            ? `/${currentLocale}/api/admin/performance/update/${idx}`
            : `/${currentLocale}/api/admin/performance/create`;

        content = editorGetHTML();
        content = content.replace(/<p>\s*<\/p>/g, '<br/>');

        const method = 'POST';
        const formdata = new FormData();
        const formJson: Partial<PerformanceFormType> = {};

        formJson.language = currentLocale;
        if(form.category) formJson.category = form.category;
        if(form.title) formJson.title = form.title;
        if(form.subtitle) formJson.subtitle = form.subtitle;
        if(content) formJson.content = content;

        // 이미지 관련
        if(imageUpload.fileUuid) formJson.fileUuid = imageUpload.fileUuid;
        if(imageUpload.fileDeleteUuid) formJson.fileDeleteUuid = imageUpload.fileDeleteUuid;
        if(imageUpload.fileOrder) formJson.fileOrder = imageUpload.fileOrder;
        if(imageUpload.fileIndex) formJson.fileIndex = imageUpload.fileIndex;
        if(imageUpload.fileOriginalIndex) formJson.fileOriginalIndex = imageUpload.fileOriginalIndex;
        if(imageUpload.fileDeleteIndex) formJson.fileDeleteIndex = imageUpload.fileDeleteIndex;
        if(imageUpload.fileMultipartFileOrder) formJson.fileMultipartFileOrder = imageUpload.fileMultipartFileOrder;

        formdata.append(
            "form",
            new Blob([JSON.stringify(formJson)], { type: "application/json" })
        );

        // 이미지 파일 추가
        if (Array.isArray(imageUpload.fileData)) {
            imageUpload.fileData.forEach(file => {
                if (file instanceof File) {
                    formdata.append("fileImage", file);
                }
            });
        }

        try {
            const res = await swrFetcher(url, {
                method: method,
                body: formdata
            });

            alert(isEditMode ? '수행내역 수정 완료' : '수행내역 추가 완료');
            await mutate(`/${currentLocale}/api/admin/performance/list?page=1`);
            router.push(`/${currentLocale}/admin/performance/list`);
        } catch {
            alert('저장 실패');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-xl font-bold mb-4">
                {isEditMode ? '수행내역 수정' : '수행내역 추가'}
            </h1>

            <div className="space-y-4">
                <div className="flex-1">
                    <label className="block mb-1 text-sm font-medium text-gray-700">제목</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="제목"
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="flex-1">
                    <label className="block mb-1 text-sm font-medium text-gray-700">부제목</label>
                    <textarea
                        name="subtitle"
                        value={form.subtitle}
                        onChange={handleChange}
                        placeholder="부제목"
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="flex-1">
                    <label className="block mb-1 text-sm font-medium text-gray-700">카테고리</label>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                        {categoryList[currentLocale].map((value, index) => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </select>
                </div>

                <div className="flex-1">
                    <label className="block mb-1 text-sm font-medium text-gray-700">수행내역 이미지 업로드</label>
                    <UploadImage
                        title="수행내역 이미지"
                        uploadState={imageUpload}
                    />
                </div>

                <div>
                    <Editor
                        idx={idx}
                        initialContent={form.content}
                        getEditorHTML={(fn) => (editorGetHTML = fn)}
                        editorImageUploadUrl={`/${currentLocale}/api/admin/performance/imageUpload/${idx}`}
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors ${
                        loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                    {isEditMode ? '수정하기' : '추가하기'}
                </button>
            </div>
        </div>
    );
};

export default Form;