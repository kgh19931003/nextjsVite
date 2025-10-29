'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {useParams, usePathname, useRouter} from 'next/navigation';
import {swrFetcher} from "@/lib/function";
import {mutate} from "swr";

interface memberData{
    language: string;
    id: string,
    password: string,
    name: string,
    gender: string
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
        id: '',
        password: '',
        name: '',
        gender: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!isEditMode) return;

            try {
                const res = await swrFetcher<memberData>(`/${currentLocale}/api/member/one/${idx}`);

                setForm({
                    language: currentLocale || '',
                    id: res.id || '',
                    password: '', // 비밀번호는 비워둘 수도 있음
                    name: res.name || '',
                    gender: res.gender || '',
                });
            } catch (err) {
                alert('회원 정보를 불러오는 데 실패했습니다.');
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
            ? `/${currentLocale}/api/admin/member/update/${idx}`
            : `/${currentLocale}/api/admin/member/create`;

        const method = isEditMode ? 'PUT' : 'POST';

        form.language = currentLocale as string

        try {
            const res = await swrFetcher(url, {
                method: method,
                body: form
            });

            alert(isEditMode ? '회원 수정 완료' : '회원 추가 완료');
            await mutate(`/${currentLocale}/api/admin/member/list?page=1`);
            router.push(`/${currentLocale}/admin/users/list`);
        } catch {
            alert('저장 실패');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-xl font-bold mb-4">
                {isEditMode ? '회원 수정' : '회원 추가'}
            </h1>

            <div className="space-y-4">
                <input
                    type="text"
                    name="id"
                    value={form.id}
                    onChange={handleChange}
                    placeholder="아이디"
                    className="w-full px-4 py-2 border rounded"
                    readOnly={isEditMode} // 수정일 때는 ID는 변경 불가
                />
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="비밀번호"
                    className="w-full px-4 py-2 border rounded"
                />
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="이름"
                    className="w-full px-4 py-2 border rounded"
                />
                <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded"
                >
                    <option value="">성별 선택</option>
                    <option value="1">남성</option>
                    <option value="2">여성</option>
                </select>
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
