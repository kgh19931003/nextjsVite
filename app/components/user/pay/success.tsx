"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaySuccess() {
    const params = useSearchParams();
    const pgToken = params.get("pg_token");

    useEffect(() => {
        if (pgToken) {
            fetch("http://localhost:8080/api/kakao/approve?pg_token=" + pgToken, {
                method: "POST",
            })
                .then(res => res.json())
                .then(data => {
                    console.log("결제 승인 결과:", data);
                });
        }
    }, [pgToken]);

    return <div>결제 완료 처리 중...</div>;
}
