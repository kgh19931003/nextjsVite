// app/preparing/page.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function PreparingPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-center px-4 sm:px-6 md:px-8">
            <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 md:p-8 max-w-md w-full">
                <h1 className="text-2xl sm:text-3xl md:text-2xl font-bold text-gray-800 mb-4">
                    🚧 서비스 준비 중
                </h1>
                <p className="text-base sm:text-lg md:text-lg text-gray-600 mb-6">
                    더 나은 서비스를 위해
                    <br/>
                    홈페이지를 준비하고 있습니다.
                    <br/>
                    다음에 다시 방문해주세요.
                </p>
                <button
                    onClick={() => router.back()}
                    className="px-4 sm:px-5 py-2 sm:py-3 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
                >
                    돌아가기
                </button>
            </div>

        </div>
    );
}
