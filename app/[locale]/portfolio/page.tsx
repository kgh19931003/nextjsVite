'use client';

import React from 'react';
import Head from 'next/head';
import PrivacyInfoList from '@/components/user/portfolio/privacyInfoList';
import StackInfoList from '@/components/user/portfolio/stackInfo';
import Slider from 'react-slick';

export default function KotlinPage() {
    const privacyData = [
        { id: 1, name: '이름', value: '김근호' },
        { id: 2, name: '생년월일', value: '1993. 10. 03' },
        { id: 3, name: 'Addr', value: '부산 북구 화명 양달로 80-11 102동 1401호' },
        { id: 4, name: 'E-mail', value: 'sasaa3865@naver.com' },
        { id: 5, name: 'Phone', value: '010 - 7615 - 3865' },
    ];

    const stackData = [
        { id: 1, name: 'Backend', value: ['kotlin.png'], size: ['200'] },
        { id: 2, name: '자격증', value: ['certifi.png'], size: ['130'] },
        { id: 3, name: 'Version Control', value: ['github.png', 'jenkins.png'], size: ['170', '250'] },
        { id: 4, name: 'IDE', value: ['intellij.png'], size: ['120'] },
        { id: 5, name: 'Flatform', value: ['docker.png'], size: ['170'] },
        { id: 6, name: 'Framework', value: ['boot_spring.png'], size: ['170'] },
    ];

    const settings = {
        dots: true,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            <Head>
                <title>Kotlin Portfolio</title>
                <meta name="description" content="This is the Kotlin portfolio page." />
            </Head>



            {/* 개인정보 */}
            <section className="max-w-4xl mx-auto mt-24 bg-white p-8 rounded-xl shadow-2xl">
                <h2 className="text-2xl font-bold text-center mb-6">Personal Information</h2>
                <PrivacyInfoList ListInfo={privacyData} />
            </section>

            {/* 소개 */}
            <section className="max-w-4xl mx-auto mt-10 p-8 rounded-xl shadow-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center space-y-4 leading-relaxed">
                <p>저는 PHP 개발자로 5년간 다양한 프로젝트를 수행하며 웹 개발의 기본기를 다져온 개발자 김근호 입니다.</p>
                <p>지금까지의 경험을 기반으로 더 깊이 있는 기술적 도전과 성장을 이루고자 Java 개발자로의 전환을 결심하게 되었습니다.</p>
                <p>PHP로 경력을 시작한 이후, 중소규모의 웹 서비스의 다양한 프로젝트를 경험하였으며 특히 백엔드 아키텍처 설계, RESTful API 개발, DB 설계 및 최적화에 강점을 가지며 안정적인 서비스를 개발하는 데 주력해 왔습니다.</p>
                <p>팀 내에서는 코드 리뷰와 협업 도구를 활용해 효율적인 협업 문화를 조성하는 데 기여했습니다.</p>
                <p>Java는 확장성 있는 시스템 설계와 성능 최적화에 유리하며, Spring Framework는 대규모 프로젝트에 적합한 체계적인 프레임워크입니다.</p>
                <p>현재는 Java 기반 기술을 학습 중이며, 개인 포트폴리오 사이트 개발을 통해 실습하고 있습니다.</p>
            </section>

            {/* 기술 스택 */}
            <section className="max-w-7xl mx-auto mt-10 px-4">
                <StackInfoList ListInfo={stackData} />
            </section>

            {/* 포트폴리오 */}
            <section className="max-w-6xl mx-auto py-10 px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Portfolio list</h2>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                        <Slider {...settings}>
                            <div>
                                <img src="/img/kotlin/1.png" alt="slide_img" className="w-full rounded-lg" />
                            </div>
                            <div>
                                <img src="/img/kotlin/2.png" alt="slide_img" className="w-full rounded-lg" />
                            </div>
                        </Slider>
                    </div>

                    <div className="space-y-6">
                        {[
                            { title: '프로젝트', desc: '현재 사이트' },
                            {
                                title: 'URL',
                                desc: (
                                    <a href="http://kim-portfolio.p-e.kr/kotlin" className="text-blue-300 underline">
                                        http://kim-portfolio.p-e.kr/kotlin
                                    </a>
                                ),
                            },
                            {
                                title: 'Github Url',
                                desc: (
                                    <a href="https://github.com/kgh19931003/portfolio" className="text-blue-300 underline">
                                        https://github.com/kgh19931003/portfolio
                                    </a>
                                ),
                            },
                            { title: '작업범위', desc: 'Kotlin boot-spring 서버 작업 및 React vite 프론트엔드 작업' },
                            { title: 'IDE', desc: 'IntelliJ Ultimate' },
                            { title: 'Server', desc: 'Linux - Docker' },
                            {
                                title: '플랫폼 설명',
                                desc:
                                    '부트스프링과 리액트를 사용하여 백엔드와 프론트엔드를 어느 정도까지 구현할 수 있는지 보여드리기 위해 제작하였습니다.',
                            },
                        ].map((item, idx) => (
                            <div key={idx}>
                                <div className="font-semibold">{item.title}</div>
                                <div className="text-sm">{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
