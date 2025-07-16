'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {swrFetcher} from "@/lib/function";
import {mutate} from "swr";
import UploadImage from "@/components/admin/product/edit/Upload";
import Form from "next/form";
import {isArray} from "node:util";

const FormPage = () => {
    const router = useRouter();
    const { idx } = useParams();
    const isEditMode = idx !== undefined && idx !== 'new' && idx !== '';


    const [form, setForm] = useState({
        productName: '',
        productPrice: '',
        productImageUuid: '',
        productImageDeleteUuid: '',
        productImageOriginalIndex: [] as number,
        productImageIndex: [] as number,
        productImageDeleteIndex: [] as number,
        productImageMultipartFileOrder: [] as number,
        productImageOrder: [] as number,
        productImage: [] as (File | string)[] // File 또는 URL
    });

    console.log("form : "+JSON.stringify(form))

    useEffect(() => {
        const fetchData = async () => {
            if (!isEditMode) return;

            try {
                const res = await swrFetcher(`http://localhost:80/product/one/${idx}`);

                setForm({
                    productName: res.productName || '',
                    productPrice: res.productPrice,
                    productImageUuid: res.productImageUuid,
                    productImageDeleteUuid: res.productImageDeleteUuid,
                    productImageIndex: res.productImgIdx,
                    productImageOriginalIndex: res.productImgIdx,
                    productImageDeleteIndex: res.productImageDeleteIndex,
                    productImageMultipartFileOrder: res.productImageMultipartFileOrder,
                    productImageOrder: res.productImgOrder,
                    productImage: res.productImage
                        ? Array.isArray(res.productImage)
                            ? res.productImage
                            : [res.productImage] // 단일 string인 경우 배열로 감쌈
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
        const url = isEditMode
            ? `http://localhost:80/product/update/${idx}`
            : `http://localhost:80/product/create`;

        const method = 'POST';
        const formdata = new FormData();
        const formJson = {}

        if(form.productName) formJson.productName = form.productName
        if(form.productPrice) formJson.productPrice = form.productPrice
        if(form.productImageUuid) formJson.productImageUuid = form.productImageUuid
        if(form.productImageDeleteUuid) formJson.productImageDeleteUuid = form.productImageDeleteUuid
        if(form.productImageOrder) formJson.productImageOrder = form.productImageOrder
        if(form.productImageIndex) formJson.productImageIndex = form.productImageIndex
        if(form.productImageOriginalIndex) formJson.productImageOriginalIndex = form.productImageOriginalIndex
        if(form.productImageDeleteIndex) formJson.productImageDeleteIndex = form.productImageDeleteIndex
        if(form.productImageMultipartFileOrder) formJson.productImageMultipartFileOrder = form.productImageMultipartFileOrder

        formdata.append(
            "form",
            new Blob([JSON.stringify(formJson)], { type: "application/json" })
        );


        // ✅ 파일 데이터
        if (Array.isArray(form.productImage)) {
            form.productImage.forEach(file => {
                formdata.append("productImage", file);
            });
        }


        try {
            const res = await swrFetcher(url, {
                method: method,
                body: formdata
            });

            alert(isEditMode ? '상품 수정 완료' : '상품 추가 완료');
            await mutate(`http://localhost:80/product/list?page=1`);
            router.push('/admin/product');
        } catch {
            alert('저장 실패');
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
                    name="productName"
                    value={form.productName}
                    onChange={handleChange}
                    placeholder="이름"
                    className="w-full px-4 py-2 border rounded"
                />
                <input
                    type="text"
                    name="productPrice"
                    value={form.productPrice}
                    onChange={handleChange}
                    placeholder="가격"
                    className="w-full px-4 py-2 border rounded"
                />


                <UploadImage
                    productImage={form.productImage}
                    productImageIndex={form.productImageIndex}
                    productImageDeleteIndex={form.productImageDeleteIndex}
                    productImageMultipartFileOrder={form.productImageMultipartFileOrder}
                    productImageOrder={form.productImageOrder}
                    productImageUuid={form.productImageUuid}
                    productImageDeleteUuid={form.productImageDeleteUuid}
                    setProductImage={(files) =>
                        setForm((prev) => ({ ...prev, productImage: files }))
                    }
                    setProductImageIndex={(ImageIndex) =>
                        setForm((prev) => ({ ...prev, productImageIndex: ImageIndex }))
                    }
                    setProductImageDeleteIndex={(ImageDeleteIndex) =>
                        setForm((prev) => ({ ...prev, productImageDeleteIndex: ImageDeleteIndex }))
                    }
                    setProductImageMultipartFileOrder={(ImageMultipartFileOrder) =>
                        setForm((prev) => ({ ...prev, productImageMultipartFileOrder: ImageMultipartFileOrder }))
                    }
                    setProductImageOrder={(ImageOrder) =>
                        setForm((prev) => ({ ...prev, productImageOrder: ImageOrder }))
                    }
                    setProductImageUuid={(ImageUuid) =>
                        setForm((prev) => ({ ...prev, productImageUuid: ImageUuid }))
                    }
                    setProductImageDeleteUuid={(ImageDeleteUuid) =>
                        setForm((prev) => ({ ...prev, productImageDeleteUuid: ImageDeleteUuid }))
                    }
                />

                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {isEditMode ? '수정하기' : '추가하기'}
                </button>


            </div>
        </div>
    );
};

export default FormPage;
