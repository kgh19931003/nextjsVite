'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {useParams, usePathname, useRouter} from 'next/navigation';
import {swrFetcher} from "@/lib/function";
import {mutate} from "swr";
import UploadImage from "@/lib/upload/Image";
import UploadVideo from "@/lib/upload/Video";
import {FileUploadResponse} from "@/lib/types/common";
import {useUploadState} from "@/lib/upload/hook/useUploadState";

const Form = ({ locale, idx }: { locale: string; idx?: string }) => {
    const router = useRouter();
    const isEditMode = idx !== undefined && idx !== 'new' && idx !== '';
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const currentLocale = useMemo(() => {
        return pathname?.split('/')[1];
    }, [pathname]);

    const [form, setForm] = useState({
        language: ''
    });

    const fileImageUpload = useUploadState();
    const fileVideoUpload = useUploadState();


    useEffect(() => {
        const fetchData = async () => {

            try {
                const res = await swrFetcher<FileUploadResponse>(`/${currentLocale}/api/admin/am-case/one/?locale=${currentLocale}`);

                setForm({
                    language: currentLocale || ''
                });

                //  이미지
                fileImageUpload.initializeUploadState({
                    fileData: res.fileImage ? (Array.isArray(res.fileImage) ? res.fileImage : [res.fileImage]) : [],
                    fileIndex: res.fileImageIndex || [],
                    fileOriginalIndex: res.fileImageIndex || [],
                    fileDeleteIndex: res.fileImageDeleteIndex || [],
                    fileMultipartFileOrder: res.fileImageMultipartFileOrder || [],
                    fileOrder: res.fileImageOrder || [],
                    fileOriginalName: res.fileImageOriginalName || []
                });

                //  비디오
                fileVideoUpload.initializeUploadState({
                    fileData: res.fileFileImage ? (Array.isArray(res.fileFileImage) ? res.fileFileImage : [res.fileFileImage]) : [],
                    fileIndex: res.fileFileIndex || [],
                    fileOriginalIndex: res.fileFileIndex || [],
                    fileDeleteIndex: res.fileFileDeleteIndex || [],
                    fileMultipartFileOrder: res.fileFileMultipartFileOrder || [],
                    fileOrder: res.fileFileOrder || [],
                    fileOriginalName: res.fileFileOriginalName || []
                });


            } catch (err) {
                alert('파일 정보를 불러오는 데 실패했습니다.');
            }
        };

        fetchData();
    }, [isEditMode, idx, currentLocale]);

    const handleSubmit = async () => {
        setLoading(true);

        const url = `/${currentLocale}/api/admin/am-case/update`

        const method = 'POST';
        const formdata = new FormData();
        const formJson: any = {};

        formJson.language = currentLocale;

        //  이미지
        if(fileImageUpload.fileOrder) formJson.fileImageOrder = fileImageUpload.fileOrder;
        if(fileImageUpload.fileIndex) formJson.fileImageIndex = fileImageUpload.fileIndex;
        if(fileImageUpload.fileOriginalIndex) formJson.fileImageOriginalIndex = fileImageUpload.fileOriginalIndex;
        if(fileImageUpload.fileDeleteIndex) formJson.fileImageDeleteIndex = fileImageUpload.fileDeleteIndex;
        if(fileImageUpload.fileMultipartFileOrder) formJson.fileImageMultipartFileOrder = fileImageUpload.fileMultipartFileOrder;

        //  비디오
        if(fileVideoUpload.fileOrder) formJson.fileVideoOrder = fileVideoUpload.fileOrder;
        if(fileVideoUpload.fileIndex) formJson.fileVideoIndex = fileVideoUpload.fileIndex;
        if(fileVideoUpload.fileOriginalIndex) formJson.fileVideoOriginalIndex = fileVideoUpload.fileOriginalIndex;
        if(fileVideoUpload.fileDeleteIndex) formJson.fileVideoDeleteIndex = fileVideoUpload.fileDeleteIndex;
        if(fileVideoUpload.fileMultipartFileOrder) formJson.fileVideoMultipartFileOrder = fileVideoUpload.fileMultipartFileOrder;

        formdata.append("form", new Blob([JSON.stringify(formJson)], { type: "application/json" }));

        // 파일 추가
        if (Array.isArray(fileImageUpload.fileData)) {
            fileImageUpload.fileData.forEach(file => formdata.append("fileFileImage", file));
        }
        if (Array.isArray(fileVideoUpload.fileData)) {
            fileVideoUpload.fileData.forEach(file => formdata.append("fileFileVideo", file));
        }
 

        try {
            const res = await swrFetcher(url, {
                method: method,
                body: formdata
            });

            alert(isEditMode ? '파일 수정 완료' : '파일 수정 완료');
            await mutate(`/${currentLocale}/api/admin/business/amCase/edit`);
            router.push(`/${currentLocale}/admin/business/amCase/edit`);
        } catch {
            alert('저장 실패');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto my-10 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-6">
                파일 업로드
            </h1>

            {/*  섹션 */}
            <div className="mb-8 p-4 border border-gray-200 rounded-md">
                <div className="space-y-4">
                    <UploadImage
                        title="이미지 추가"
                        uploadState={fileImageUpload}
                    />
                    <UploadVideo
                        title="영상 추가"
                        uploadState={fileVideoUpload}
                    />
                </div>
            </div>


            {/* 통합 제출 버튼 */}
            <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
                {loading ? '처리 중...' : (isEditMode ? '파일 수정하기' : '파일 추가하기')}
            </button>
        </div>
    );
};

export default Form;