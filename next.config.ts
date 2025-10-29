import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "godtech-web.s3.ap-northeast-2.amazonaws.com",
                pathname: "/**", // 모든 경로 허용
            },
        ],
    },
};

export default nextConfig;
