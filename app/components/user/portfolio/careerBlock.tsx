// 포트폴리오 데이터 타입 정의
import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { colorMap, portfolioData } from "@/data/portfolioData";

type Props = {
    settings: any;
    t: (key: string) => string;
};

export const PortfolioItemComponent = ({ settings, t }: Props) => {
    return (
        <>
            {portfolioData.map((item) => {
                const colors = colorMap[item.categoryColor];
                const category = item.category;

                const ImageSlider = () => (
                    <div className="w-full bg-gray-100 dark:bg-neutral-900 p-4">
                        <div className="rounded-2xl overflow-hidden shadow-lg">
                            <Slider {...settings}>
                                {item.images.map((img, idx) => (
                                    <div key={idx}>
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                );

                const DetailInfo = () => {
                    // 🔹 horizontal 레이아웃 - 기존 그대로
                    if (category === "horizontal") {
                        return (
                            <div
                                className={`p-8 lg:p-8 flex flex-col ${
                                    category === "horizontal" ? "justify-center" : "justify-start"
                                }`}
                            >
                                <div
                                    className={`inline-block px-4 py-1 ${colors.badge} rounded-full text-sm font-semibold mb-8 ${
                                        category !== "horizontal" && "w-fit"
                                    }`}
                                >
                                    {t(item.category)}
                                </div>

                                <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                                    {t(item.title)}
                                </h3>

                                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                    {/* URL */}
                                    {item.url && (
                                        <div className="flex items-start gap-3">
                            <span className={`${colors.text} font-bold min-w-[100px]`}>
                                {t(item.storeLinks ? "스토어" : "URL")}
                            </span>
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`${colors.text} hover:text-green-700 hover:underline transition-colors`}
                                            >
                                                {t(item.urlText || item.url)}
                                            </a>
                                        </div>
                                    )}

                                    {/* 스토어 */}
                                    {item.storeLinks && (
                                        <div className="flex items-start gap-3">
                            <span className={`${colors.text} font-bold min-w-[100px]`}>
                                {t("스토어")}
                            </span>
                                            <div className="flex flex-col gap-2">
                                                {item.storeLinks.map((link, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`${colors.text} hover:text-green-700 hover:underline transition-colors`}
                                                    >
                                                        {t(link.label)}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* 작업범위 */}
                                    <div className="flex items-start gap-3">
                        <span className={`${colors.text} font-bold min-w-[100px]`}>
                            {t("작업범위")}
                        </span>
                                        <div>
                                            {item.workScope.map((scope, idx) => (
                                                <div key={idx}>{t(scope)}</div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 개발환경 */}
                                    <div className="flex items-start gap-3">
                        <span className={`${colors.text} font-bold min-w-[100px] py-2`}>
                            {t("개발환경")}
                        </span>
                                        <table className="table-auto border-collapse w-full max-w-md">
                                            <tbody>
                                            {item.environment.map((env, idx) => (
                                                <tr key={idx}>
                                                    <td className="py-2 font-semibold text-slate-700">
                                                        {t(env.label)}
                                                    </td>
                                                    <td className="py-2">{t(env.value)}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* 설명 */}
                                    <div className="flex items-start gap-1">
                        <span className={`${colors.text} font-bold min-w-[100px]`}>
                            {t("설명")}
                        </span>
                                        <div>
                                            {item.description.map((desc, idx) => (
                                                <div key={idx}>{t(desc)}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    // 🔹 vertical 레이아웃 - 제목과 내용이 줄 나눠짐
                    return (
                        <div className="p-8 lg:p-8 flex flex-col justify-start">
                            {/* 배지 */}
                            <div
                                className={`inline-block px-4 py-1 ${colors.badge} rounded-full text-sm font-semibold mb-6 w-fit`}
                            >
                                {t(item.category)}
                            </div>

                            {/* 제목 */}
                            <h3 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white">
                                {t(item.title)}
                            </h3>

                            {/* 내용 전체를 제목과 분리해서 세로 정렬 */}
                            <div className="space-y-6 text-gray-600 dark:text-gray-300">
                                {/* URL */}
                                {item.url && (
                                    <div className="flex flex-col gap-1">
                        <span className={`${colors.text} font-bold`}>
                            {t(item.storeLinks ? "스토어" : "URL")}
                        </span>
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`${colors.text} hover:text-green-700 hover:underline transition-colors`}
                                        >
                                            {t(item.urlText || item.url)}
                                        </a>
                                    </div>
                                )}

                                {/* 스토어 */}
                                {item.storeLinks && (
                                    <div className="flex flex-col">
                                        <span className={`${colors.text} font-bold mb-2`}>{t("스토어")}</span>
                                        <div className="flex flex-col gap-1">
                                            {item.storeLinks.map((link, idx) => (
                                                <a
                                                    key={idx}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`${colors.text} hover:text-green-700 hover:underline`}
                                                >
                                                    {t(link.label)}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 작업범위 */}
                                <div className="flex flex-col gap-1">
                                    <span className={`${colors.text} font-bold`}>{t("작업범위")}</span>
                                    <div className="">
                                        {item.workScope.map((scope, idx) => (
                                            <div key={idx}>{t(scope)}</div>
                                        ))}
                                    </div>
                                </div>

                                {/* 개발환경 */}
                                <div className="flex flex-col gap-1">
                                    <span className={`${colors.text} font-bold`}>{t("개발환경")}</span>
                                    <table className="table-auto border-collapse w-full max-w-md ">
                                        <tbody>
                                        {item.environment.map((env, idx) => (
                                            <tr key={idx}>
                                                <td className="py-2 font-semibold text-slate-700">
                                                    {t(env.label)}
                                                </td>
                                                <td className="py-2">{t(env.value)}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* 설명 */}
                                <div className="flex flex-col gap-1">
                                    <span className={`${colors.text} font-bold`}>{t("설명")}</span>
                                    <div className="">
                                        {item.description.map((desc, idx) => (
                                            <div key={idx}>{t(desc)}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                };


                // 🔹 공통 Wrapper
                const Wrapper = ({ children }: { children: React.ReactNode }) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto mb-20"
                    >
                        <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden
                                        border border-gray-100 dark:border-neutral-700 hover:shadow-3xl transition-all duration-500">
                            {children}
                        </div>
                    </motion.div>
                );

                // 🔸 레이아웃 분기
                if (category === "horizontal") {
                    return (
                        <Wrapper>
                            <ImageSlider />
                            <DetailInfo />
                        </Wrapper>
                    );
                }

                if (category === "vertical") {
                    return (
                        <Wrapper>
                            <div className="grid lg:grid-cols-2 gap-0">
                                {item.reversed ? (
                                    <>
                                        <div className="order-2 lg:order-1">
                                            <DetailInfo />
                                        </div>
                                        <div className="order-1 lg:order-2">
                                            <ImageSlider />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <ImageSlider />
                                        <DetailInfo />
                                    </>
                                )}
                            </div>
                        </Wrapper>
                    );
                }

                return null;
            })}
        </>
    );
};
