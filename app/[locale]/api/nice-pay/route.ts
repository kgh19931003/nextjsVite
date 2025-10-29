import { NextResponse } from 'next/server'
import {swrFetcher} from "@/lib/function";

export async function POST(req: Request) {
    const body = await req.json()

    const res = await swrFetcher('https://stg-api.nicepay.co.kr/v1/checkout', {
        method: 'POST',
        body: {
            clientId: 'nictest04m',
            clientSecret: 'YOUR_CLIENT_SECRET', // 서버에서만 사용
            orderId: body.orderId,
            amount: body.amount,
            goodsName: body.goodsName,
            returnUrl: body.returnUrl,
        }
    })

    return NextResponse.json(res)
}
