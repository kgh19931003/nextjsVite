'use client';

import React, { useRef } from 'react';
import { useRouter } from "next/navigation";
import { motion, useInView } from 'framer-motion';

interface BgImgProps {
    title: string;
    description: string;
    url: string;
    backgroundUrl: string;
    delay?: number;
}

const BgImg: React.FC<BgImgProps> = ({ title, description, url, backgroundUrl, delay = 0 }) => {
    const router = useRouter();
    const ref = useRef(null);
    const isInView = useInView(ref); // 반복 가능하게

    return (
        <motion.div
            ref={ref}
            onClick={() => router.push(url)}
            className="w-[500px] h-[320px] cursor-pointer mx-1 rounded-2xl overflow-hidden shadow-2xl group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] bg-cover bg-center relative"
            style={{
                backgroundImage: `url('${backgroundUrl}')`,
            }}
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{ duration: 0.8, delay }}
        >

            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-13 text-white transition-transform duration-300 group-hover:scale-105">
                <h3 className="text-3xl font-bold mb-5 drop-shadow-md text-center">{title}</h3>
                <p className="text-lg leading-snug drop-shadow-sm text-center">{description}</p>
            </div>
        </motion.div>
    );
};

export default BgImg;
