'use client';

import React, { useState } from 'react';

const SettingsPage = () => {
    const [siteName, setSiteName] = useState('My Admin Dashboard');
    const [adminEmail, setAdminEmail] = useState('admin@example.com');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            // API 호출 또는 상태 저장 로직
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">설정</h1>

            <div className="space-y-4 max-w-xl">
                <div>
                    <label className="block text-sm font-medium text-gray-700">사이트 이름</label>
                    <input
                        type="text"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        className="mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">관리자 이메일</label>
                    <input
                        type="email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        className="mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="pt-4">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                    >
                        {loading ? '저장 중...' : '저장'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
