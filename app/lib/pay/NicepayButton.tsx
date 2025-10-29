'use client'
import { useEffect, useState } from 'react'
import {swrFetcher} from "@/lib/function";

export default function NicePayButton() {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://pay.nicepay.co.kr/v1/js/'
        script.onload = () => console.log('AUTHNICE loaded', window.AUTHNICE)
        document.body.appendChild(script)
    }, [])

    const handlePayment = async () => {
        if (!window.AUTHNICE) return alert('결제 모듈 로드 중...')

        window.AUTHNICE.requestPay({
            clientId: 'S2_aa8dd2561f844d458c252571e05821e5',
            method: 'card',
            orderId: '46de5472-8080-41c0-b459-f2f459850c23',
            amount: 1004,
            goodsName: '나이스페이-상품',
            returnUrl: 'http://localhost:3000/serverAuth', //API를 호출할 Endpoint 입력
            fnError: function (result : any) {
                alert('개발자확인용 : ' + result.errorMsg + '')
            }
        });
    }



    return (
        <button
            onClick={handlePayment}
            disabled={loading}
            style={{ padding: '10px 20px', background: '#0070f3', color: 'white', borderRadius: '8px' }}
        >
            {loading ? '로딩 중...' : '테스트 결제창 열기'}
        </button>
    )
}
