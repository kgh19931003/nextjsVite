'use client';

import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '@/lib/kakaoMap/useKakaoLoader';
import PageHeroAuto from "@/components/user/PageHeroAuto";
import {useSafeTranslations} from "@/lib/intl/useSafeTranslations";

export default function Offices() {
    const t = useSafeTranslations("locations");

    const locations = {
        head: {
            lat: 35.23594668747403,
            lng: 128.64193655540348,
            title: '본사',
            address: '경상남도 창원시 의창구 창원대로397번길 11 제205동 제지1층 105호',
            tel: '',
            fax: '',
        },
        factory: {
            lat: 35.27930030205461,
            lng: 128.99300855431446,
            title: '공장',
            address: '경상남도 김해시 대동면 대동산단2로 263-17',
            tel: '055-724-0426',
            fax: '055-724-0146',
        },
        busan: {
            lat: 35.10260252370058,
            lng: 129.0348129103977,
            title: '지사',
            address: '부산광역시 중구 대청로 136 한국산업은행 9층 KDB NextONE',
            tel: '',
            fax: '',
        },
    };

    useKakaoLoader();

    const mapStyle = {
        width: '90%',
        height: '300px',
        borderRadius: '0.75rem',
    };

    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/companyhero.jpg" />

            <section className="bg-gradient-to-b to-white dark:from-neutral-900 dark:to-neutral-950 py-16 px-4 sm:px-6 lg:px-60">
                <div className="max-w-screen-xl mx-auto space-y-15">
                    {Object.entries(locations).map(([key, loc]) => (
                        <div key={key} className="rounded-2xl shadow-md bg-white dark:bg-neutral-800 overflow-hidden">
                            <div className="md:flex md:gap-6">
                                {/* 지도 */}
                                <div className="md:w-1/2">
                                    <Map
                                        center={{ lat: loc.lat, lng: loc.lng }}
                                        level={3}
                                        style={mapStyle}
                                    >
                                        <MapMarker position={{ lat: loc.lat, lng: loc.lng }} />
                                    </Map>
                                </div>

                                {/* 정보 */}
                                <div className="flex-1 px-1 py-6">
                                    <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-3">
                                        {t(loc.title)}
                                    </h2>
                                    <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed mb-2">
                                        {t(loc.address)}
                                    </p>

                                    {/* 연락처 정보 */}
                                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-3">
                                        {loc.tel && <p>{t("전화")} : {loc.tel}</p>}
                                        {loc.fax && <p>{t("팩스")} : {loc.fax}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
