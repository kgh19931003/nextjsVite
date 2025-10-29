'use client';

import React, {useMemo, useState} from 'react';
import PageHeroAuto from "@/components/user/PageHeroAuto";
import { swrFetcher } from "@/lib/function";
import {usePathname} from "next/navigation";
import {useSafeTranslations} from "@/lib/intl/useSafeTranslations";

interface FormType {
    category: string;
    companyName: string;
    manager: string;
    tel: string;
    email: string;
    content: string;
    agree: boolean;
    file: File[];
}

export default function Inquiry() {
    const t = useSafeTranslations("inquiry");
    const pathname = usePathname();

    const currentLocale = useMemo(() => {
        return pathname?.split('/')[1];
    }, [pathname]);

    const [fileInputKey, setFileInputKey] = useState(Date.now()); // 초기 키 설정
    const [fileName, setFileName] = useState(currentLocale == "ko" ? "파일이 선택되지 않았습니다." : "No file selected.");
    const [form, setFormData] = useState<FormType>({
        category: '',
        companyName: '',
        manager: '',
        tel: '',
        email: '',
        content: '',
        agree: false,
        file: [],
    });
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);



    // 폼 입력 변화 핸들러
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        const checked = (e.target instanceof HTMLInputElement && type === 'checkbox')
            ? e.target.checked
            : undefined;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // 파일 선택 변화 핸들러 (multiple 가능)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) {
            setFormData(prev => ({ ...prev, file: [] }));
            setPreviewSrc(null);
            setFileName('');
            return;
        }

        const fileArray = Array.from(files);

        // 이미지가 아닌 파일 필터링
        const nonImageFiles = fileArray.filter(file => !file.type.startsWith("image/"));
        if (nonImageFiles.length > 0) {
            alert(
                t("이미지 파일만 업로드할 수 있습니다._제외된 파일: ") +
                nonImageFiles.map(f => f.name).join(", ")
            );
            resetFileInput();
            return;
        }

        // 용량 제한 1MB 초과 파일 필터링
        const oversizedFiles = fileArray.filter(file => file.size > 1024 * 1024);
        if (oversizedFiles.length > 0) {
            alert(
                t("1MB를 초과하는 이미지는 업로드할 수 없습니다._제외된 파일: ") +
                oversizedFiles.map(f => f.name).join(", ")
            );
            resetFileInput();
            return;
        }

        // 유효한 이미지 파일 (1MB 이하)
        const validImageFiles = fileArray.filter(file => file.type.startsWith("image/") && file.size <= 1024 * 1024);

        setFormData(prev => ({ ...prev, file: validImageFiles }));
        setFileName(validImageFiles[0]?.name || '');

        if (validImageFiles[0]) {
            const reader = new FileReader();
            reader.onload = () => setPreviewSrc(reader.result as string);
            reader.readAsDataURL(validImageFiles[0]);
        } else {
            setPreviewSrc(null);
        }
    };

    function resetFileInput() {
        setFileInputKey(Date.now()); // input 초기화 트리거
        setFileName('');
        setPreviewSrc(null);
    }


    // 제출 핸들러
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.agree) {
            alert(t('개인정보 처리방침에 동의해주세요.'));
            return;
        }

        const formdata = new FormData();
        // 필요한 필드만 JSON으로 만듦
        const formJson = {
            language: currentLocale,
            category: form.category,
            companyName: form.companyName,
            manager: form.manager,
            tel: form.tel,
            email: form.email,
            content: form.content,
        };

        formdata.append('form', new Blob([JSON.stringify(formJson)], { type: 'application/json' }));

        // 파일 여러개 업로드 가능
        form.file.forEach(file => {
            formdata.append('file', file);
        });

        try {
            await swrFetcher(`/${currentLocale}/api/inquiry/create`, {
                method: 'POST',
                body: formdata,
            });

            alert(t('문의가 성공적으로 접수되었습니다.'));

            // 초기화
            setFormData({
                category: '',
                companyName: '',
                manager: '',
                tel: '',
                email: '',
                content: '',
                agree: false,
                file: [],
            });

            setPreviewSrc(null);
            setFileInputKey(Date.now()); // ✅ file input 초기화 트리거
        } catch (err) {
            console.error(err);
            alert(t('문의 접수 중 오류가 발생했습니다.'));
        }
    };

    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/qnahero.jpg" />

            <div className="flex flex-col md:flex-row px-4 py-8 gap-8 max-w-6xl mx-auto translate-x-2">
                {/* 문의 폼 */}
                <div className="w-full">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex items-center gap-3 mb-4">
                            <label htmlFor="category" className="text-sm font-medium w-24 shrink-0">
                                {t("문의 유형")}
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                required
                            >
                                <option value="">{t("문의 유형을 선택하세요.")}</option>
                                <option value="3d_printing_manufacturing">{t("적층 제조 - 제작")}</option>
                                <option value="3d_printing_repair">{t("적층 제조 - 보수")}</option>
                                <option value="powder_ni_alloy">{t("금속 분말 - Ni Alloy")}</option>
                                <option value="powder_stainless">{t("금속 분말 - Stainless")}</option>
                                <option value="etc">{t("기타")}</option>
                            </select>
                        </div>

                        <hr className="border-t border-gray-300 my-4"/>

                        <div className="flex items-center gap-3 mb-4">
                            <label htmlFor="companyName" className="text-sm font-medium w-24 shrink-0">
                                {t("회사명")}
                            </label>
                            <input
                                id="companyName"
                                name="companyName"
                                type="text"
                                placeholder={t("회사명을 입력해주세요.")}
                                value={form.companyName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                required
                            />
                        </div>

                        <hr className="border-t border-gray-300 my-4"/>

                        <div className="flex items-center gap-3 mb-4">
                            <label htmlFor="manager" className="text-sm font-medium w-24 shrink-0">
                                {t("담당자명")}
                            </label>
                            <input
                                id="manager"
                                name="manager"
                                type="text"
                                placeholder={t("담당자명을 입력해주세요.")}
                                value={form.manager}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                required
                            />
                        </div>

                        <hr className="border-t border-gray-300 my-4"/>

                        <div className="flex items-center gap-3 mb-4">
                            <label htmlFor="tel" className="text-sm font-medium w-24 shrink-0">
                                {t("연락처")}
                            </label>
                            <input
                                id="tel"
                                name="tel"
                                type="tel"
                                placeholder={t("숫자만 입력해주세요 (예: 01012345678)")}
                                pattern="[0-9]{10,11}"
                                value={form.tel}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                required
                            />
                        </div>

                        <hr className="border-t border-gray-300 my-4"/>

                        <div className="flex items-center gap-3 mb-4">
                            <label htmlFor="email" className="text-sm font-medium w-24 shrink-0">
                                {t("이메일")}
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder={t("이메일을 입력해주세요.")}
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                required
                            />
                        </div>

                        <hr className="border-t border-gray-300 my-4"/>

                        <div className="flex items-center gap-3 mb-4">
                            <label htmlFor="content" className="text-sm font-medium w-24 shrink-0">
                                {t("문의 내용")}
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                placeholder={t("문의 내용을 입력해주세요.")}
                                value={form.content}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                rows={5}
                                required
                            />
                        </div>

                        <hr className="border-t border-gray-300 my-4"/>

                        <div className="flex items-center gap-3 mb-4">
                            <label className="text-sm font-medium w-24 shrink-0">
                                {t("첨부파일")}
                            </label>

                            <label
                                htmlFor="file"
                                className="inline-flex items-center cursor-pointer rounded-lg bg-gradient-to-r from-green-400 to-blue-500 px-5 py-3 text-white font-semibold shadow-lg hover:brightness-110 transition duration-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-2 h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v3m0-8l-4 4m4-4l4 4"
                                    />
                                </svg>
                                {t("파일선택")}
                            </label>

                            <input
                                key={fileInputKey}
                                id="file"
                                name="file"
                                type="file"
                                accept="image/*"
                                multiple
                                style={{display: "none"}}
                                onChange={handleFileChange}
                                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                            />

                            <span
                                className="max-w-xs truncate text-sm text-gray-700 dark:text-gray-300 select-text flex-grow">
                            {fileName}
                          </span>

                            {previewSrc && (
                                <img
                                    src={previewSrc}
                                    alt={t("첨부파일 미리보기")}
                                    className="ml-auto max-h-40 object-contain rounded"
                                />
                            )}
                        </div>

                        <hr className="border-t border-gray-300 my-4"/>

                        <div className="flex items-start gap-2">
                            <input
                                id="agree"
                                name="agree"
                                type="checkbox"
                                checked={form.agree}
                                onChange={handleChange}
                                className="mt-1 accent-green-500"
                                required
                            />
                            <label htmlFor="agree" className="text-sm text-gray-700">
                                {t("개인정보 처리방침에 동의합니다. (필수)")}
                            </label>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <button
                                type="submit"
                                className="bg-[#56BC6F] text-white px-6 py-2 rounded hover:bg-green-700 transition cursor-pointer"
                            >
                                {t("문의하기")}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}
