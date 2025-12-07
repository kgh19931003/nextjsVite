'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {swrFetcher} from "@/lib/function";
import {mutate} from "swr";
import UploadImage from "@/lib/upload/Image";
import {productFormType, ProductResponse} from "@/lib/types/common";
import { useUploadState } from '@/lib/upload/hook/useUploadState';

const Form = ({ locale, idx }: { locale: string; idx?: string }) => {
    const router = useRouter();
    const isEditMode = idx !== undefined && idx !== 'new' && idx !== '';
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const currentLocale = useMemo(() => {
        return pathname?.split('/')[1];
    }, [pathname]);

    // 기본 폼 필드
    const [form, setForm] = useState({
        language: '',
        name: '',
        price: '',
    });

    // 이미지 업로드 상태 (커스텀 훅 사용)
    const imageUpload = useUploadState();

    useEffect(() => {
        const fetchData = async () => {
            if (!isEditMode) return;

            try {
                const res = await swrFetcher<ProductResponse>(`/${currentLocale}/api/admin/product/one/${idx}`);

                setForm({
                    language: currentLocale || '',
                    name: res.name || '',
                    price: res.price != null ? String(res.price) : '',
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
                alert('상품 정보를 불러오는 데 실패했습니다.');
            }
        };

        fetchData();
    }, [isEditMode, idx, currentLocale]);

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
        const formJson: Partial<productFormType> = {};

        formJson.language = currentLocale;
        if(form.name) formJson.name = form.name;
        if(form.price) formJson.price = form.price;

        // 이미지 관련
        if(imageUpload.fileUuid) formJson.fileUuid = imageUpload.fileUuid;
        if(imageUpload.fileDeleteUuid) formJson.fileDeleteUuid = imageUpload.fileDeleteUuid;
        if(imageUpload.fileOrder) formJson.fileOrder = imageUpload.fileOrder;
        if(imageUpload.fileIndex) formJson.fileIndex = imageUpload.fileIndex;
        if(imageUpload.fileOriginalIndex) formJson.fileOriginalIndex = imageUpload.fileOriginalIndex;
        if(imageUpload.fileDeleteIndex) formJson.fileDeleteIndex = imageUpload.fileDeleteIndex;
        if(imageUpload.fileMultipartFileOrder) formJson.fileMultipartFileOrder = imageUpload.fileMultipartFileOrder;

        console.log('Form Data:', { form, imageUpload });

        formdata.append(
            "form",
            new Blob([JSON.stringify(formJson)], { type: "application/json" })
        );

        // 이미지 파일 추가
        if (Array.isArray(imageUpload.fileData)) {
            imageUpload.fileData.forEach(file => {
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
                    title="상품 이미지"
                    uploadState={imageUpload}
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