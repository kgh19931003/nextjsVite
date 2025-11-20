'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSliderProps {
    images: any[]; // 타입 아시면 수정 가능
    currentSlide: number;
    setCurrentSlide: (index: any) => void;
}


// Image Slider Component
export function ImageSlider({ images, currentSlide, setCurrentSlide }: ImageSliderProps) {
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
        const diff = clientX - startX;
        setTranslateX(diff);
    };

    const handleDragEnd = () => {
        if (!isDragging) return;

        const threshold = 50;

        if (translateX > threshold && currentSlide > 0) {
            setCurrentSlide((prev: number) => prev - 1);
        } else if (translateX < -threshold && currentSlide < images.length - 1) {
            setCurrentSlide((prev: number) => prev + 1);
        }

        setIsDragging(false);
        setTranslateX(0);
    };

    const nextSlide = () => {
        setCurrentSlide((prev: number) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev: number) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div
            ref={sliderRef}
            className="relative rounded-xl overflow-hidden bg-gray-100 cursor-grab active:cursor-grabbing select-none"
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
                        transform: `translateX(calc(-${currentSlide * 100}% + ${translateX}px))`,
                        transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                    }}
                >
                    {images.map((image, index) => (
                        <div key={index} className="min-w-full h-full flex items-center justify-center">
                            <img
                                src={image.src}
                                alt={`Repair Case ${index + 1}`}
                                className="max-w-full max-h-full object-contain pointer-events-none"
                                draggable="false"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            {/*
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110 z-10"
            >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110 z-10"
            >
                <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
            */}

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                            index === currentSlide
                                ? 'bg-white w-8'
                                : 'bg-white/50 hover:bg-white/75'
                        }`}
                    />
                ))}
            </div>

            {/* Drag Hint */}
            <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                드래그하여 이동
            </div>
        </div>
    );
}