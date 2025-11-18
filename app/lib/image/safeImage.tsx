'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Props {
    src?: string | null;
    width: number;
    height: number;
    fallbackSrc?: string; // optional, 필요 시
}

export default function SafeImage({
                                      src,
                                      width,
                                      height,
                                      fallbackSrc,
                                  }: Props) {
    const [imgSrc, setImgSrc] = useState<string | null>(src ?? fallbackSrc ?? null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (src) {
            setImgSrc(src);
            setLoading(true);
        } else if (fallbackSrc) {
            setImgSrc(fallbackSrc);
            setLoading(true);
        } else {
            setImgSrc(null); // src 없으면 아예 Image 렌더링 안함
            setLoading(true); // 문구만 보여줌
        }
    }, [src, fallbackSrc]);

    return (
        <div className="relative w-full" style={{height: height}}>
            {/* height를 px로 지정하거나 min-h 설정 가능 */}
            {imgSrc && (
                <Image
                    src={imgSrc}
                    alt=""
                    width={width}
                    height={height}
                    className="rounded-lg object-cover"
                    onLoadingComplete={() => setLoading(false)}
                    onError={() => {
                        if (fallbackSrc && imgSrc !== fallbackSrc) setImgSrc(fallbackSrc);
                        else setImgSrc(null);
                        setLoading(true);
                    }}
                />
            )}
            {loading && (
                <div
                    className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm bg-gray-100/50 rounded-lg">
                    이미지 준비 중
                </div>
            )}
        </div>

    );
}
