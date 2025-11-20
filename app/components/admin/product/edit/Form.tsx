'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {useParams, usePathname, useRouter} from 'next/navigation';
import {swrFetcher} from "@/lib/function";
import {mutate} from "swr";
import UploadImage from "@/lib/upload/Image";
import UploadVideo from "@/lib/upload/Video";
import {productFormType, ProductResponse} from "@/lib/types/common";

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
        // 이미지 관련
        fileUuid: [] as string[],
        fileDeleteUuid: [] as string[],
        fileOriginalIndex: [] as number[],
        fileIndex: [] as number[],
        fileDeleteIndex: [] as number[],
        fileMultipartFileOrder: [] as number[],
        fileOrder: [] as number[],
        fileImage: [] as (File | string)[],
        // 비디오 관련
        videoUuid: [] as string[],
        videoDeleteUuid: [] as string[],
        videoOriginalIndex: [] as number[],
        videoIndex: [] as number[],
        videoDeleteIndex: [] as number[],
        videoMultipartFileOrder: [] as number[],
        videoOrder: [] as number[],
        fileVideo: [] as (File | string)[]
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!isEditMode) return;

            try {
                const res = await swrFetcher<ProductResponse>(`/${currentLocale}/api/admin/product/one/${idx}`);

                setForm({
                    language: currentLocale || '',
                    name: res.name || '',
                    price: res.price != null ? String(res.price) : '',
                    // 이미지
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
                            : [res.fileImage]
                        : [],
                    // 비디오
                    videoUuid: res.videoUuid || [],
                    videoDeleteUuid: res.videoDeleteUuid || [],
                    videoIndex: res.videoIndex || [],
                    videoOriginalIndex: res.videoIndex || [],
                    videoDeleteIndex: res.videoDeleteIndex || [],
                    videoMultipartFileOrder: res.videoMultipartFileOrder || [],
                    videoOrder: res.videoOrder || [],
                    fileVideo: res.fileVideo
                        ? Array.isArray(res.fileVideo)
                            ? res.fileVideo
                            : [res.fileVideo]
                        : []
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
        if(form.fileUuid) formJson.fileUuid = form.fileUuid;
        if(form.fileDeleteUuid) formJson.fileDeleteUuid = form.fileDeleteUuid;
        if(form.fileOrder) formJson.fileOrder = form.fileOrder;
        if(form.fileIndex) formJson.fileIndex = form.fileIndex;
        if(form.fileOriginalIndex) formJson.fileOriginalIndex = form.fileOriginalIndex;
        if(form.fileDeleteIndex) formJson.fileDeleteIndex = form.fileDeleteIndex;
        if(form.fileMultipartFileOrder) formJson.fileMultipartFileOrder = form.fileMultipartFileOrder;

        // 비디오 관련
        if(form.videoUuid) formJson.videoUuid = form.videoUuid;
        if(form.videoDeleteUuid) formJson.videoDeleteUuid = form.videoDeleteUuid;
        if(form.videoOrder) formJson.videoOrder = form.videoOrder;
        if(form.videoIndex) formJson.videoIndex = form.videoIndex;
        if(form.videoOriginalIndex) formJson.videoOriginalIndex = form.videoOriginalIndex;
        if(form.videoDeleteIndex) formJson.videoDeleteIndex = form.videoDeleteIndex;
        if(form.videoMultipartFileOrder) formJson.videoMultipartFileOrder = form.videoMultipartFileOrder;

        console.log(form)

        formdata.append(
            "form",
            new Blob([JSON.stringify(formJson)], { type: "application/json" })
        );

        // 이미지 파일 추가
        if (Array.isArray(form.fileImage)) {
            form.fileImage.forEach(file => {
                formdata.append("fileImage", file);
            });
        }

        // 비디오 파일 추가
        if (Array.isArray(form.fileVideo)) {
            form.fileVideo.forEach(file => {
                formdata.append("fileVideo", file);
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

                <UploadVideo
                    fileVideo={form.fileVideo}
                    fileIndex={form.videoIndex}
                    fileDeleteIndex={form.videoDeleteIndex}
                    fileMultipartFileOrder={form.videoMultipartFileOrder}
                    fileOrder={form.videoOrder}
                    fileUuid={form.videoUuid}
                    fileDeleteUuid={form.videoDeleteUuid}
                    setFileVideo={(files) =>
                        setForm((prev) => ({ ...prev, fileVideo: files }))
                    }
                    setFileIndex={(VideoIndex) =>
                        setForm((prev) => ({ ...prev, videoIndex: VideoIndex }))
                    }
                    setFileDeleteIndex={(VideoDeleteIndex) =>
                        setForm((prev) => ({ ...prev, videoDeleteIndex: VideoDeleteIndex }))
                    }
                    setFileMultipartFileOrder={(VideoMultipartFileOrder) =>
                        setForm((prev) => ({ ...prev, videoMultipartFileOrder: VideoMultipartFileOrder }))
                    }
                    setFileOrder={(VideoOrder) =>
                        setForm((prev) => ({ ...prev, videoOrder: VideoOrder }))
                    }
                    setFileUuid={(VideoUuid) =>
                        setForm((prev) => ({ ...prev, videoUuid: VideoUuid }))
                    }
                    setFileDeleteUuid={(VideoDeleteUuid) =>
                        setForm((prev) => ({ ...prev, videoDeleteUuid: VideoDeleteUuid }))
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