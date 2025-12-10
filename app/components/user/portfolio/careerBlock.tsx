"use client";

import React from "react";
import { colorMap, portfolioData } from "@/data/portfolioData";

// 🔥 여기서 Custom ImageSlider 불러오기
import { ImageSlider } from "@/lib/image/slide";

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

                // 🔥 Custom Slider Wrapper
                const SliderSection = () => (
                    <div className="w-full bg-gray-100 dark:bg-neutral-900">
                        <div className="rounded-2xl overflow-hidden shadow-lg">
                            <ImageSlider images={item.images} />
                        </div>
                    </div>
                );

                // 🔥 DetailInfo (기존 그대로)
                const DetailInfo = () => {
                    if (category === "horizontal") {
                        return (
                            <div className="p-8 lg:p-8 flex flex-col justify-center">
                                <div
                                    className={`inline-block px-4 py-1 ${colors.badge} rounded-full text-sm font-semibold mb-8`}
                                >
                                    {t(item.category)}
                                </div>

                                <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                                    {t(item.title)}
                                </h3>

                                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                    {item.url && (
                                        <div className="flex items-start gap-3">
                                            <span className={`${colors.text} font-bold min-w-[100px]`}>
                                                {t(item.storeLinks ? "스토어" : "URL")}
                                            </span>
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`${colors.text} hover:text-green-700 hover:underline`}
                                            >
                                                {t(item.urlText || item.url)}
                                            </a>
                                        </div>
                                    )}

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
                                                        className={`${colors.text} hover:text-green-700 hover:underline`}
                                                    >
                                                        {t(link.label)}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}

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

                    // 🔥 vertical layout 그대로
                    return (
                        <div className="p-8 lg:p-8 flex flex-col justify-start">
                            <div
                                className={`inline-block px-4 py-1 ${colors.badge} rounded-full text-sm font-semibold mb-6 w-fit`}
                            >
                                {t(item.category)}
                            </div>

                            <h3 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white">
                                {t(item.title)}
                            </h3>

                            <div className="space-y-6 text-gray-600 dark:text-gray-300">
                                {item.url && (
                                    <div className="flex flex-col gap-1">
                                        <span className={`${colors.text} font-bold`}>
                                            {t(item.storeLinks ? "스토어" : "URL")}
                                        </span>
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`${colors.text} hover:text-green-700 hover:underline`}
                                        >
                                            {t(item.urlText || item.url)}
                                        </a>
                                    </div>
                                )}

                                {item.storeLinks && (
                                    <div className="flex flex-col">
                                        <span className={`${colors.text} font-bold mb-2`}>
                                            {t("스토어")}
                                        </span>
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

                                <div className="flex flex-col gap-1">
                                    <span className={`${colors.text} font-bold`}>{t("작업범위")}</span>
                                    <div>
                                        {item.workScope.map((scope, idx) => (
                                            <div key={idx}>{t(scope)}</div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className={`${colors.text} font-bold`}>{t("개발환경")}</span>
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

                                <div className="flex flex-col gap-1">
                                    <span className={`${colors.text} font-bold`}>{t("설명")}</span>
                                    <div>
                                        {item.description.map((desc, idx) => (
                                            <div key={idx}>{t(desc)}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                };

                // 🔥 Wrapper
                const Wrapper = ({ children }: { children: React.ReactNode }) => (
                    <div className="max-w-4xl mx-auto mb-20">
                        <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-neutral-700">
                            {children}
                        </div>
                    </div>
                );

                // 🔥 Layout
                if (category === "horizontal") {
                    return (
                        <Wrapper key={item.id}>
                            <SliderSection />
                            <DetailInfo />
                        </Wrapper>
                    );
                }

                if (category === "vertical") {
                    return (
                        <Wrapper key={item.id}>
                            <div className="grid lg:grid-cols-2 gap-0">
                                {item.reversed ? (
                                    <>
                                        <div className="order-2 lg:order-1">
                                            <DetailInfo />
                                        </div>
                                        <div className="order-1 lg:order-2">
                                            <SliderSection />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <SliderSection />
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
