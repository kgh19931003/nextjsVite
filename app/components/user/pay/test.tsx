'use client';

import SnsPayButton from '@/lib/pay/SnsPayButton';
import PageHeroAuto from "@/components/user/PageHeroAuto";
import React, {useMemo, useState} from "react";
import {usePathname} from "next/navigation";
import {swrFetcher} from "@/lib/function";
import NicePayButton from "@/lib/pay/NicepayButton";



export default function test() {
    const pathname = usePathname();
    const currentLocale = useMemo(() => pathname?.split("/")[1] || "ko", [pathname]);
    const [result, setResult] = useState<string>('')

    const handlePayment = async () => {
        const res = await swrFetcher(`/${currentLocale}/api/nice-pay/test`, {
            method: 'POST',
            body: {
                amount: 1000,
                orderId: 'ORD12345',
                buyerName: '홍길동'
            }
        })

        setResult(JSON.stringify(res))

        window.open(res.paymentUrl, '_blank', 'width=500,height=700')
    }


    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/techhero.jpg"/>

            <SnsPayButton
                gateway="naver"
                itemName="테스트상품"
                amount="1000"
            />


            <NicePayButton/>
        </>
    );
}