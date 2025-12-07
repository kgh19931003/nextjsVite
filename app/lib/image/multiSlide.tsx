'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MultiImageSliderProps {
    imageGroups: any[][]; // 2중 배열: 제품별 이미지 배열
    currentImage: number;
    setCurrentImage: (index: number) => void;
    currentImageInGroup: number;
    setCurrentImageInGroup: (index: number) => void;
}

// Image Slider Component with Nested Arrays
export function MultiImageSlider({
                                imageGroups,
                                currentImage,
                                setCurrentImage,
                                currentImageInGroup,
                                setCurrentImageInGroup
                            }: MultiImageSliderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    const currentGroup = imageGroups[currentImage]?.[0];
    const currentImages = currentGroup?.src || [];


    // 제품 변경 시 내부 이미지 인덱스 초기화
    useEffect(() => {
        setCurrentImageInGroup(0);
    }, [currentImage]);

    const nextImage = () => {
        setCurrentImageInGroup((currentImageInGroup + 1) % currentImages.length);
    };

    const prevImage = () => {
        setCurrentImageInGroup((currentImageInGroup - 1 + currentImages.length) % currentImages.length);
    };

    const nextProduct = () => {
        setCurrentImage((currentImage + 1) % imageGroups.length);
    };

    const prevProduct = () => {
        setCurrentImage((currentImage - 1 + imageGroups.length) % imageGroups.length);
    };

    // 키보드 방향키 지원
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            prevProduct();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            nextProduct();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevImage();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextImage();
        }
    };

    const handleDragStart = (e: any) => {
        setIsDragging(true);
        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        setStartX(clientX);
    };

    const handleDragMove = (e: any) => {
        if (!isDragging) return;

        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const diff = clientX - startX;
        setTranslateX(diff);
    };

    const handleDragEnd = () => {
        if (!isDragging) return;

        const threshold = 50;

        if (translateX > threshold && currentImageInGroup > 0) {
            prevImage();
        } else if (translateX < -threshold && currentImageInGroup < currentImages.length - 1) {
            nextImage();
        }

        setIsDragging(false);
        setTranslateX(0);
    };

    return (
        <div
            ref={sliderRef}
            tabIndex={0} // 키보드 이벤트를 받도록
            className="relative rounded-xl overflow-hidden bg-gray-100 cursor-grab active:cursor-grabbing select-none focus:outline-none focus:ring-0 focus-visible:outline-none"
            onKeyDown={handleKeyDown}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
        >
            <div className="aspect-[4/3] relative w-full h-full overflow-hidden">
                <div
                    className="flex transition-transform h-full duration-300 ease-out"
                    style={{
                        transform: `translateX(calc(-${currentImageInGroup * 100}% + ${translateX}px))`,
                        transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                    }}
                >
                    {currentImages.map((src: any, index: number) => (
                        <div key={index} className="min-w-full h-full flex items-center justify-center">
                            <img
                                src={src}
                                alt={`Product ${currentImage + 1} - Image ${index + 1}`}
                                className="max-w-full max-h-full object-contain pointer-events-none"
                                draggable="false"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Navigation Buttons (좌우 방향키) */}
            {/*
            <button
                onClick={prevProduct}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-emerald-600/90 hover:bg-emerald-600 text-white rounded-full p-3 shadow-lg transition-all hover:scale-110 z-10"
                title="이전 제품 (← 방향키)"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={nextProduct}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-emerald-600/90 hover:bg-emerald-600 text-white rounded-full p-3 shadow-lg transition-all hover:scale-110 z-10"
                title="다음 제품 (→ 방향키)"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
            */}

            {/* Image Navigation Buttons (상하 방향키) - 이미지가 2개 이상일 때만 표시 */}
            {/*currentImages.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110 z-10 rotate-90"
                        title="이전 이미지 (↑ 방향키)"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-800" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110 z-10 rotate-90"
                        title="다음 이미지 (↓ 방향키)"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-800" />
                    </button>
                </>

            )*/}

            {/* Product Indicators (제품 표시) */}
            {/*
            <div className="absolute top-16 left-4 flex flex-col gap-2 z-10">
                {imageGroups.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImage
                                ? 'bg-white h-8'
                                : 'bg-white/50 hover:bg-white/75'
                        }`}
                    />
                ))}
            </div>
            */}

            {/* Image Indicators (현재 제품 내 이미지 표시) - 이미지가 2개 이상일 때만 표시 */}
            {currentImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {currentImages.map((_: any, index: number) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageInGroup(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                index === currentImageInGroup
                                    ? 'bg-emerald-500 w-8'
                                    : 'bg-emerald-300 hover:bg-emerald-100'
                            }`}
                        />
                    ))}
                </div>
            )}

            {/* Keyboard Hint */}
            <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-2 rounded-lg space-y-1">
                {/*<div>← → : 이미지 전환</div>*/}
                {currentImages.length > 1 && <div>🖱️ ↑ ↓ : 제품 전환</div>}
                {/*
                <div className="text-[10px] text-gray-300 mt-1">
                    제품 {currentImage + 1}/{imageGroups.length}
                    {currentImages.length > 1 && ` | 이미지 ${currentImageInGroup + 1}/${currentImages.length}`}
                </div>
                */}
                <div className="text-[10px] text-gray-300 mt-1">
                    제품 {currentImage + 1}/{imageGroups.length}
                </div>
            </div>
        </div>
    );
}