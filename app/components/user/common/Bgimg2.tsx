'use client';

import React, { useRef } from 'react';
import { useRouter } from "next/navigation";
import { motion, useInView } from 'framer-motion';

interface BoxProps {
  category: string;
  title: string;
  description: string;
  url: string;
  backgroundUrl: string;
  delay?: number;
}

const BgImg: React.FC<BoxProps> = ({ category, title, description, url, backgroundUrl, delay = 0 }) => {
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref);

  // 카테고리별 배경 색상 매핑
  const categoryColors: Record<string, string> = {
    Material: "bg-green-200",
    Repair: "bg-yellow-200",
    Manufacturing: "bg-blue-200",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, delay }}
      className="flex flex-col w-[380px] mx-1"
    >
      {/* 텍스트 영역 */}
      <div className="mb-3">
        <span
            className={`inline-block ${
                categoryColors[category] || "bg-gray-200"
            } text-gray-800 text-sm px-3 py-1 rounded-md mb-2`}
        >
          {category}
        </span>
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p
            className="text-gray-600 text-sm leading-snug line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: description.replace(/\n/g, '<br/>')
            }}
        ></p>
      </div>

      {/* 이미지 박스 */}
      <div
          onClick={() => router.push(url)}
          className="w-full h-[280px] cursor-pointer rounded-2xl overflow-hidden shadow-2xl group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] bg-cover bg-center"
          style={{backgroundImage: `url('${backgroundUrl}')`}}
      />
    </motion.div>
  );
};

export default BgImg;
