'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('http://localhost:80/login/cert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id,
                    pass: password,
                }),
                credentials: 'include', // 필요 시 유지
            });

            if (!res.ok) {
                throw new Error('로그인 실패');
            }

            // 헤더에서 토큰 추출
            const token = res.headers.get('Authorization');


            if (token) {
                // "Bearer " 접두사 제거하고 저장
                localStorage.setItem('token', token.replace('Bearer ', ''));
            } else {
                throw new Error('토큰이 헤더에 없습니다.');
            }

            // 예: 로그인 후 이동
            router.push('/admin/dashboard');

        } catch (err) {
            setError('아이디 또는 비밀번호가 올바르지 않습니다.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full max-w-md mb-20 p-8 space-y-8 bg-white rounded-lg shadow-md">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">관리자 로그인</h1>
                <p className="mt-2 text-sm text-gray-600">
                    계정에 접속하려면 로그인하세요
                </p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-500 px-4 py-3 rounded-md text-sm">
                    {error}
                </div>
            )}

            <form className="mt-3 space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                        아이디
                    </label>
                    <input
                        id="id"
                        name="id"
                        type="text"
                        required
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        비밀번호
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none ${
                            loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? '로그인 중...' : '로그인'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <LoginForm />
        </div>
    );
}
