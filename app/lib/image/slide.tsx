'use client';

import React, { useState, useRef } from 'react';

interface ImageSliderProps {
    images: string[];
}

export function ImageSlider({ images }: ImageSliderProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);

    const sliderRef = useRef<HTMLDivElement>(null);

    const handleDragStart = (e: any) => {
        setIsDragging(true);
        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        setStartX(clientX);
    };

    const handleDragMove = (e: any) => {
        if (!isDragging) return;
        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        setTranslateX(clientX - startX);
    };

    const handleDragEnd = (e: any) => {
        if (!isDragging) return;

        const threshold = 50; // 드래그 민감도

        if (translateX > threshold && currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        } else if (translateX < -threshold && currentSlide < images.length - 1) {
            setCurrentSlide(prev => prev + 1);
        }

        setIsDragging(false);
        setTranslateX(0);
    };

    return (
        <div
            ref={sliderRef}
            className="relative w-full overflow-hidden rounded-xl cursor-grab active:cursor-grabbing"
            onMouseDown={(e) => {
                e.stopPropagation();
                handleDragStart(e);
            }}
            onMouseMove={(e) => {
                e.stopPropagation();
                handleDragMove(e);
            }}
            onMouseUp={(e) => {
                e.stopPropagation();
                handleDragEnd(e);
            }}
            onMouseLeave={(e) => {
                e.stopPropagation();
                handleDragEnd(e);
            }}
            onTouchStart={(e) => {
                e.stopPropagation();
                handleDragStart(e);
            }}
            onTouchMove={(e) => {
                e.stopPropagation();
                handleDragMove(e);
            }}
            onTouchEnd={(e) => {
                e.stopPropagation();
                handleDragEnd(e);
            }}
        >
            {/* 슬라이드 이미지 */}
            <div
                className="flex h-full transition-transform duration-300 ease-out"
                style={{
                    transform: `translateX(calc(-${currentSlide * 100}% + ${translateX}px))`,
                    transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                }}
            >
                {images.map((src, index) => (
                    <div key={index} className="min-w-full h-full flex items-center justify-center">
                        <img
                            src={src}
                            alt={`Slide ${index + 1}`}
                            className="max-w-full max-h-full object-cover pointer-events-none select-none"
                            draggable={false}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                    '/image/error/no_image.png';
                            }}
                        />
                    </div>
                ))}
            </div>


            {/* 불렛 인디케이터 */}
            {images.length > 1 && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                idx === currentSlide
                                    ? 'bg-white h-6'
                                    : 'bg-white/50 hover:bg-white/80'
                            }`}
                        />
                    ))}
                </div>
            )}


        </div>
    );
}