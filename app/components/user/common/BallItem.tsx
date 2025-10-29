'use client';

import React, {useState} from 'react';
import {useRouter} from "next/navigation";

interface BallItemProps {
    label: string;
    color?: string; // 기본 색상 (선택)
    url: string;
    backgroundUrl: string;
}

const BallItem: React.FC<BallItemProps> = ({ label, color = '#4A90E2', url, backgroundUrl }) => {

    const router = useRouter()
    const [isHovered, setIsHovered] = useState(false);

    // alpha 조절된 색상 만들기
    const base = color;
    const normalGradient = `radial-gradient(circle at 30% 30%, ${base}AA, ${base}99)`; // 66%, 60%
    const hoverGradient = `radial-gradient(circle at 30% 30%, ${base}FF, ${base}CC)`; // 100%, 80%


    return (
        <div
            onClick={()=> router.push(url)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-[200px] h-[200px] cursor-pointer mx-15 rounded-full flex items-center justify-center text-white font-semibold text-center shadow-lg"
            style={{
                backgroundImage: `${isHovered
                    ? `radial-gradient(circle at 30% 30%, ${base}FF, ${base}CC), url('${backgroundUrl}')`
                    : `radial-gradient(circle at 30% 30%, ${base}AA, ${base}99), url('${backgroundUrl}')`
                }`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
            }}
        >
            {label}
        </div>
    );
};

export default BallItem;
