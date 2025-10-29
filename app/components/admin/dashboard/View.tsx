'use client';

import React from 'react';
import useSWR from 'swr';
import DashboardCard from '@/components/admin/DashboardCard';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {faEye, faMoneyBillTrendUp, faReceipt, faUser, faUsers} from "@fortawesome/free-solid-svg-icons";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
interface DashboardData {
    stats: {
        title: string;
        value: string;
        icon: IconDefinition;
        change: {
            value: number;
            isPositive: boolean;
        };
    }[];
    recentUsers: {
        id: string;
        name: string;
        email: string;
        status: string;
        date: string;
    }[];
}

// useSWR 대신 더미 데이터로 대체 (실제 배포 전까지 테스트용)
const dummyData: {
    stats: ({ change: { isPositive: boolean; value: number }; icon: IconDefinition; title: string; value: string } | { change: { isPositive: boolean; value: number }; icon: string; title: string; value: string })[];
    recentUsers: ({ date: string; name: string; id: string; email: string; status: string })[]
} = {
    stats: [
        {
            title: '신규 사용자',
            value: '245명',
            icon: faUser,
            change: {
                value: 12.5,
                isPositive: true,
            },
        },
        {
            title: '총 주문',
            value: '540건',
            icon: faReceipt,
            change: {
                value: -3.2,
                isPositive: false,
            },
        },
        {
            title: '매출',
            value: '₩1,200,000',
            icon: faMoneyBillTrendUp,
            change: {
                value: 8.7,
                isPositive: true,
            },
        },
        {
            title: '방문 수',
            value: '3,200회',
            icon: faUsers,
            change: {
                value: 4.1,
                isPositive: true,
            },
        },
    ],
    recentUsers: [
        {
            id: '1',
            name: '홍길동',
            email: 'hong@example.com',
            status: 'active',
            date: '2025-06-10',
        },
        {
            id: '2',
            name: '김영희',
            email: 'kim@example.com',
            status: 'inactive',
            date: '2025-06-08',
        },
        {
            id: '3',
            name: '이철수',
            email: 'lee@example.com',
            status: 'active',
            date: '2025-06-06',
        },
        {
            id: '4',
            name: '김근식',
            email: 'kim@example.com',
            status: 'active',
            date: '2025-06-14',
        },
    ],
};


// 차트용 샘플 데이터
const userStats = [
    { month: '1월', users: 120 },
    { month: '2월', users: 160 },
    { month: '3월', users: 180 },
    { month: '4월', users: 220 },
    { month: '5월', users: 300 },
    { month: '6월', users: 280 },
];

const productStats = [
    { month: '1월', users: 100 },
    { month: '2월', users: 140 },
    { month: '3월', users: 170 },
    { month: '4월', users: 210 },
    { month: '5월', users: 320 },
    { month: '6월', users: 290 },
];


// 데이터 fetcher 함수
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardPage() {
    // useSWR 훅을 사용하여 데이터 가져오기
    const { data, error } = useSWR<DashboardData>('/dashboard', fetcher);

    if (error) {
        //return <div className="p-6 text-red-600">데이터를 불러오는 데 실패했습니다.</div>;
    }

    if (!data) {
        //return <div className="p-6">로딩 중...</div>;
    }

    return (
        <div className="space-y-6 w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                        내보내기
                    </button>
                    <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700">
                        보고서 생성
                    </button>
                </div>
            </div>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {dummyData.stats.map((stat, index) => (
                    <DashboardCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon as IconDefinition}
                        change={stat.change}
                    />
                ))}

            </div>

            {/* 차트 섹션 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">사용자 활동</h2>
                    </div>
                    <div className="p-6 h-80 flex items-center justify-center bg-gray-50">
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={userStats}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="users"
                                    stroke="#6366f1"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">수익 추이</h2>
                    </div>
                    <div className="p-6 h-80 flex items-center justify-center bg-gray-50">
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={productStats}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="users"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 최근 가입 사용자 */}
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">최근 가입 사용자</h2>
                    <a href="/admin/users" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        모두 보기
                    </a>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                이름
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                이메일
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                상태
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                가입일
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">

                        {dummyData.recentUsers.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {user.status === 'active' ? '활성' : '비활성'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.date}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
