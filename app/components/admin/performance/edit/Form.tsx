'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {useParams, usePathname, useRouter} from 'next/navigation';
import {swrFetcher} from "@/lib/function";
import {mutate} from "swr";
import UploadImage from "@/lib/upload/Image";
import Editor from "@/lib/tiptap/Editor";


interface PerformanceResponse {
    language: string;
    category: string;
    title: string | number;
    subtitle: string | number;
    content: string;
    fileUuid: string[];
    fileDeleteUuid: string[];
    fileIndex: number[];                // res.performanceImgIdx 가 배열이라 가정
    fileOriginalIndex: number[];        // 위와 동일하게 number[]
    fileDeleteIndex: number[];
    fileMultipartFileOrder: number[];
    fileOrder: number[];                 // res.performanceImgOrder 도 배열로 추정
    fileImage: string[];                      // 문자열 배열 (단일 string일 수도 있어 배열로 처리)
}

interface FormType {
    language: string;
    category: string;
    title: string | number;
    subtitle: string | number;
    content: string;
    fileUuid: string[];
    fileDeleteUuid: string[];
    fileOrder: number[];
    fileIndex: number[];
    fileOriginalIndex: number[];
    fileDeleteIndex: number[];
    fileMultipartFileOrder: number[];
    // 기타 필드들...
}

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
    const [title, setTitle] = useState('');
    const [subtitle, setSubTitle] = useState('');
    const [category, setCategory] = useState();
    const [loading, setLoading] = useState(false);
    const currentLocale = useMemo(() => {
        return pathname?.split('/')[1];
    }, [pathname]);

    let [content, setContent] = useState('');
    let editorGetHTML = () => '';

    const [form, setForm] = useState({
        language: currentLocale,
        category: categoryList[currentLocale][0],
        title: '',
        subtitle: '',
        content: '',
        fileUuid: [] as string[],
        fileDeleteUuid: [] as string[],
        fileOriginalIndex: [] as number[],
        fileIndex: [] as number[],
        fileDeleteIndex: [] as number[],
        fileMultipartFileOrder: [] as number[],
        fileOrder: [] as number[],
        fileImage: [] as (File | string)[] // File 또는 URL
    });

    //console.log("form : "+JSON.stringify(form))

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
                    fileUuid: res.fileUuid,
                    fileDeleteUuid: res.fileDeleteUuid,
                    fileIndex: res.fileIndex,
                    fileOriginalIndex: res.fileIndex,
                    fileDeleteIndex: res.fileDeleteIndex,
                    fileMultipartFileOrder: res.fileMultipartFileOrder,
                    fileOrder: res.fileOrder,
                    fileImage: res.fileImage
                        ? Array.isArray(res.fileImage)
                            ? res.fileImage
                            : [res.fileImage] // 단일 string인 경우 배열로 감쌈
                        : []
                });

            } catch (err) {
                alert('수행내역 정보를 불러오는 데 실패했습니다.');
            }
        };

        fetchData();
    }, [isEditMode, idx]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);

        const url = isEditMode
            ? `/${currentLocale}/api/admin/performance/update/${idx}`
            : `/${currentLocale}/api/admin/performance/create`;

        content = editorGetHTML(); // submit 시점 HTML 가져오기
        content = content.replace(/<p>\s*<\/p>/g, '<br/>'); // 빈 <p></p> → <br/> 변환

        form.content = content

        const method = 'POST';
        const formdata = new FormData();
        // Partial로 부분적 타입 지정
        const formJson: Partial<FormType> = {};

        if(form.language) formJson.language = currentLocale
        if(form.category) formJson.category = form.category
        if(form.title) formJson.title = form.title
        if(form.subtitle) formJson.subtitle = form.subtitle
        if(form.content) formJson.content = form.content
        if(form.fileUuid) formJson.fileUuid = form.fileUuid
        if(form.fileDeleteUuid) formJson.fileDeleteUuid = form.fileDeleteUuid
        if(form.fileOrder) formJson.fileOrder = form.fileOrder
        if(form.fileIndex) formJson.fileIndex = form.fileIndex
        if(form.fileOriginalIndex) formJson.fileOriginalIndex = form.fileOriginalIndex
        if(form.fileDeleteIndex) formJson.fileDeleteIndex = form.fileDeleteIndex
        if(form.fileMultipartFileOrder) formJson.fileMultipartFileOrder = form.fileMultipartFileOrder


        formdata.append(
            "form",
            new Blob([JSON.stringify(formJson)], { type: "application/json" })
        );


        // ✅ 파일 데이터
        if (Array.isArray(form.fileImage)) {
            form.fileImage.forEach(file => {
                if (file instanceof File) {
                    formdata.append("fileImage", file); // 새 업로드 파일만 append
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
                        rows={3} // 기본 높이, 필요에 따라 조절 가능
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
                        fileImage={form.fileImage}
                        fileIndex={form.fileIndex}
                        fileDeleteIndex={form.fileDeleteIndex}
                        fileMultipartFileOrder={form.fileMultipartFileOrder}
                        fileOrder={form.fileOrder}
                        fileUuid={form.fileUuid}
                        fileDeleteUuid={form.fileDeleteUuid}
                        setFileImage={(files) =>
                            setForm((prev) => ({...prev, fileImage: files}))
                        }
                        setFileIndex={(ImageIndex) =>
                            setForm((prev) => ({...prev, fileIndex: ImageIndex}))
                        }
                        setFileDeleteIndex={(ImageDeleteIndex) =>
                            setForm((prev) => ({...prev, fileDeleteIndex: ImageDeleteIndex}))
                        }
                        setFileMultipartFileOrder={(ImageMultipartFileOrder) =>
                            setForm((prev) => ({...prev, fileMultipartFileOrder: ImageMultipartFileOrder}))
                        }
                        setFileOrder={(ImageOrder) =>
                            setForm((prev) => ({...prev, fileOrder: ImageOrder}))
                        }
                        setFileUuid={(ImageUuid) =>
                            setForm((prev) => ({...prev, fileUuid: ImageUuid}))
                        }
                        setFileDeleteUuid={(ImageDeleteUuid) =>
                            setForm((prev) => ({...prev, fileDeleteUuid: ImageDeleteUuid}))
                        }
                    />

                </div>



                {/* 에디터 박스 */}
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
