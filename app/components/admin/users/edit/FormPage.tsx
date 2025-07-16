'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {swrFetcher} from "@/lib/function";
import {mutate} from "swr";

const FormPage = () => {
    const router = useRouter();
    const { idx } = useParams();
    const isEditMode = idx !== undefined && idx !== 'new' && idx !== '';

    const [form, setForm] = useState({
        memberId: '',
        memberPassword: '',
        memberName: '',
        memberGender: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!isEditMode) return;

            try {
                const res = await swrFetcher(`http://localhost:80/member/one/${idx}`);

                setForm({
                    memberId: res.memberId || '',
                    memberPassword: '', // 비밀번호는 비워둘 수도 있음
                    memberName: res.memberName || '',
                    memberGender: res.memberGender || '',
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
        const url = isEditMode
            ? `http://localhost:80/member/update/${idx}`
            : `http://localhost:80/member/create`;

        const method = isEditMode ? 'PUT' : 'POST';

        try {
            const res = await swrFetcher(url, {
                method: method,
                body: form
            });

            alert(isEditMode ? '회원 수정 완료' : '회원 추가 완료');
            await mutate(`http://localhost:80/member/list?page=1`);
            router.push('/admin/users');
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
                    name="memberId"
                    value={form.memberId}
                    onChange={handleChange}
                    placeholder="아이디"
                    className="w-full px-4 py-2 border rounded"
                    readOnly={isEditMode} // 수정일 때는 ID는 변경 불가
                />
                <input
                    type="password"
                    name="memberPassword"
                    value={form.memberPassword}
                    onChange={handleChange}
                    placeholder="비밀번호"
                    className="w-full px-4 py-2 border rounded"
                />
                <input
                    type="text"
                    name="memberName"
                    value={form.memberName}
                    onChange={handleChange}
                    placeholder="이름"
                    className="w-full px-4 py-2 border rounded"
                />
                <select
                    name="memberGender"
                    value={form.memberGender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded"
                >
                    <option value="">성별 선택</option>
                    <option value="1">남성</option>
                    <option value="2">여성</option>
                </select>
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
