"use client";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { swrFetcher } from "@/lib/function";

interface PayButtonProps {
    gateway: "kakao" | "naver"; // 결제사 선택
    itemName: string;
    amount: number;
}

export default function SnsPayButton({ gateway, itemName, amount }: PayButtonProps) {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();
    const currentLocale = useMemo(() => pathname?.split("/")[1] || "ko", [pathname]);

    const handlePay = async () => {
        setLoading(true);
        try {
            let apiUrl = "";

            switch (gateway) {
                case "kakao":
                    apiUrl = `/${currentLocale}/api/kakao-pay/ready`;
                    break;
                case "naver":
                    apiUrl = `/${currentLocale}/api/naver-pay/ready`;
                    break;
            }

            const res = await swrFetcher(apiUrl, {
                method: "POST",
                body: { itemName, amount },
            });

            // 리다이렉트 URL 분기
            const redirectUrl =
                gateway === "kakao"
                    ? res.next_redirect_pc_url
                    : gateway === "naver"
                        ? res.paymentUrl // 네이버 페이 샌드박스에서 반환하는 URL
                        : null;

            if (redirectUrl) {
                window.location.href = redirectUrl;
            } else {
                alert("결제 요청 실패");
            }
        } catch (err) {
            console.error(err);
            alert("결제 처리 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handlePay}
            disabled={loading}
            className={`px-4 py-2 rounded ${
                gateway === "kakao" ? "bg-yellow-400" : "bg-green-500"
            }`}
        >
            {loading
                ? "처리중..."
                : gateway === "kakao"
                    ? "카카오페이로 결제하기"
                    : "네이버페이로 결제하기"}
        </button>
    );
}
