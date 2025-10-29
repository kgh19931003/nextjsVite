// components/user/Banner.tsx
export default function Banner() {
    return (
        <div className="bg-blue-50 pt-32 pb-15 px-6 text-center overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
                    폐금속 자원, 더 이상 버리지 마세요!
                </h2>
                <p className="text-lg text-blue-700 mb-6">
                    갓테크와 함께 자원 재활용을 통한 비용 절감과 친환경 경영을 실현하세요.
                </p>
                <a
                    href="/contact"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    지금 문의하기 →
                </a>
            </div>
        </div>
    );
}
