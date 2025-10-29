'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {useParams, usePathname, useRouter} from 'next/navigation';
import {swrFetcher} from "@/lib/function";
import {mutate} from "swr";
import UploadImage from "@/lib/upload/Image";


interface ProductResponse {
    language: string;
    name: string;
    price: number;
    fileUuid: string[];
    fileDeleteUuid: string[];
    fileIndex: number[];                // res.productImgIdx 가 배열이라 가정
    fileOriginalIndex: number[];        // 위와 동일하게 number[]
    fileDeleteIndex: number[];
    fileMultipartFileOrder: number[];
    fileOrder: number[];                 // res.productImgOrder 도 배열로 추정
    fileImage: string[];                      // 문자열 배열 (단일 string일 수도 있어 배열로 처리)
}

interface FormType {
    language: string;
    name: string;
    price: string | number;
    fileUuid: string[];
    fileDeleteUuid: string[];
    fileOrder: number[];
    fileIndex: number[];
    fileOriginalIndex: number[];
    fileDeleteIndex: number[];
    fileMultipartFileOrder: number[];
    // 기타 필드들...
}
const Form = ({ locale, idx }: { locale: string; idx?: string }) => {
    const router = useRouter();
    const isEditMode = idx !== undefined && idx !== 'new' && idx !== '';

    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const currentLocale = useMemo(() => {
        return pathname?.split('/')[1];
    }, [pathname]);

    const [form, setForm] = useState({
        language: '',
        name: '',
        price: '',
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
                const res = await swrFetcher<ProductResponse>(`/${currentLocale}/api/admin/product/one/${idx}`);

                setForm({
                    language: currentLocale || '',
                    name: res.name || '',
                    price: res.price != null ? String(res.price) : '',
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
                alert('상품 정보를 불러오는 데 실패했습니다.');
            }
        };

        fetchData();
    }, [isEditMode, idx]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);

        const url = isEditMode
            ? `/${currentLocale}/api/admin/product/update/${idx}`
            : `/${currentLocale}/api/admin/product/create`;

        const method = 'POST';
        const formdata = new FormData();
        // Partial로 부분적 타입 지정
        const formJson: Partial<FormType> = {};

        if(form.language) formJson.language = currentLocale
        if(form.name) formJson.name = form.name
        if(form.price) formJson.price = form.price
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
                formdata.append("fileImage", file);
            });
        }


        try {
            const res = await swrFetcher(url, {
                method: method,
                body: formdata
            });

            alert(isEditMode ? '상품 수정 완료' : '상품 추가 완료');
            await mutate(`/${currentLocale}/api/admin/product/list?page=1`);
            router.push(`/${currentLocale}/admin/product/list`);
        } catch {
            alert('저장 실패');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-xl font-bold mb-4">
                {isEditMode ? '상품 수정' : '상품 추가'}
            </h1>

            <div className="space-y-4">
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="이름"
                    className="w-full px-4 py-2 border rounded"
                />
                <input
                    type="text"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="가격"
                    className="w-full px-4 py-2 border rounded"
                />


                <UploadImage
                    fileImage={form.fileImage}
                    fileIndex={form.fileIndex}
                    fileDeleteIndex={form.fileDeleteIndex}
                    fileMultipartFileOrder={form.fileMultipartFileOrder}
                    fileOrder={form.fileOrder}
                    fileUuid={form.fileUuid}
                    fileDeleteUuid={form.fileDeleteUuid}
                    setFileImage={(files) =>
                        setForm((prev) => ({ ...prev, fileImage: files }))
                    }
                    setFileIndex={(ImageIndex) =>
                        setForm((prev) => ({ ...prev, fileIndex: ImageIndex }))
                    }
                    setFileDeleteIndex={(ImageDeleteIndex) =>
                        setForm((prev) => ({ ...prev, fileDeleteIndex: ImageDeleteIndex }))
                    }
                    setFileMultipartFileOrder={(ImageMultipartFileOrder) =>
                        setForm((prev) => ({ ...prev, fileMultipartFileOrder: ImageMultipartFileOrder }))
                    }
                    setFileOrder={(ImageOrder) =>
                        setForm((prev) => ({ ...prev, fileOrder: ImageOrder }))
                    }
                    setFileUuid={(ImageUuid) =>
                        setForm((prev) => ({ ...prev, fileUuid: ImageUuid }))
                    }
                    setFileDeleteUuid={(ImageDeleteUuid) =>
                        setForm((prev) => ({ ...prev, fileDeleteUuid: ImageDeleteUuid }))
                    }
                />

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
