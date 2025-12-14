export const privacyData = [
    { id: 1, label: 'Name', value: '김근호', icon: '👤' },
    { id: 2, label: 'Birth', value: '1993. 10. 03', icon: '🎂' },
    { id: 3, label: 'Address', value: '부산시 북구 화명 양달로 80-11 102동 1401호', icon: '📍' },
    { id: 4, label: 'E-mail', value: 'sasaa3865@naver.com', icon: '📧' },
    { id: 5, label: 'Phone', value: '010 - 7615 - 3865', icon: '📱' },
];

export const stackData = [
    { id: 1, name: 'Backend', value: ['php.png', 'kotlin.png'], size: ['120', '120'], text: ['', ''] },
    { id: 2, name: '자격증', value: ['certifi.png'], size: ['100'], text: ['정보처리기사'] },
    { id: 3, name: 'Version Control', value: ['github.png', 'jenkins.png'], size: ['120', '140'], text: ['', ''] },
    { id: 4, name: 'IDE Tool', value: ['phpstorm.png', 'intellij.png'], size: ['80', '80'], text: ['', ''] },
    { id: 5, name: 'Platform', value: ['docker.png'], size: ['120'], text: [''] },
    { id: 6, name: 'Framework', value: ['ci4.png', 'boot_spring.png'], size: ['80', '150'], text: ['', ''] },
    { id: 7, name: 'Amazon Cloud', value: ['aws/ec2.png', 'aws/ecr.png', 'aws/ecs.png', 'aws/iam.png', 'aws/load_balancer.png', 'aws/rds.png', 'aws/s3.png'], size: ['90', '90', '90', '65', '120', '90', '90'], text: ['', '', '', '', '', '', ''] },
];


export const careerData = [
    {
        id: 1,
        company: '㈜ 갓테크',
        position: '매니저',
        department: '웹개발',
        period: '2025.05 - 재직중',
        duration: '재직중',
        description: '회사 홈페이지 관리 및 솔루션 플랫폼 제작',
        icon: '💼'
    },
    {
        id: 2,
        company: '㈜ 위브릭스',
        position: '대리',
        department: '개발팀',
        period: '2022.12 - 2025.01',
        duration: '2년 2개월',
        description: 'PHP 서버 사이드 개발과 CodeIgniter 4 프레임워크를 활용한 웹 서비스 개발 및 유지보수',
        icon: '🚀'
    },
    {
        id: 3,
        company: '위즈메이드㈜',
        position: '사원',
        department: '개발팀',
        period: '2020.12 - 2022.08',
        duration: '1년 9개월',
        description: 'PHP, 그누보드, 영카트 솔루션을 활용한 외주 웹사이트 개발 및 Android/iOS 앱 제작',
        icon: '📱'
    },
    {
        id: 4,
        company: 'O2media(개인) & ㈜ 슈퍼셀(법인전환)',
        position: '사원',
        department: '개발팀',
        period: '2018.06 - 2019.08',
        duration: '1년 4개월',
        description: 'Python 데이터 크롤링 자동화, PHP 기반 쇼핑몰 개발, 기업 홈페이지 구축',
        icon: '🐍'
    }
];


// 컬러 매핑
export const colorMap = {
    blue: {
        badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
        text: 'text-blue-500'
    },
    purple: {
        badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
        text: 'text-purple-500'
    },
    green: {
        badge: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
        text: 'text-green-500'
    },
    orange: {
        badge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
        text: 'text-orange-500'
    },
    red: {
        badge: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
        text: 'text-red-500'
    },
    teal: {
        badge: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
        text: 'text-teal-500'
    },
    indigo: {
        badge: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
        text: 'text-indigo-500'
    }
};

// 포트폴리오 데이터
export const portfolioData: PortfolioItem[] = [
    {
        id: 'matchup',
        company: '주식회사 위즈메이드',
        category: 'vertical',
        categoryColor: 'blue',
        title: '매치업 랜딩페이지',
        url: 'https://www.match-up.co.kr/',
        urlText: 'match-up.co.kr',
        workScope: [
            'PHP 백엔드, 프론트엔드(jQuery) 유지보수 담당',
            '웹뷰 네이티브 기능 유지보수 담당'
        ],
        environment: [
            { label: 'Infra', value: 'Cafe24 Virtual Hosting' },
            { label: 'Backend', value: 'PHP 7.x' },
            { label: 'FrameWork', value: 'Codeigniter 4.x' },
            { label: 'Android', value: 'Kotlin + Android Studio' },
            { label: 'Ios', value: 'Swift + Xcode' }
        ],
        description: [
            '축구/풋살 구장 예약 및 경기 매칭 + 팀/플레이어',
            '관리 + 커뮤니티 기능”을 제공하는 스포츠 플랫폼 입니다.',
            'ㅤ',
            '해당 플랫폼에서 앱 진입 시 노출되는 스플래시 작업과',
            '웹뷰 소셜 로그인 네이티브 기능 Api 를 연동하여',
            '네이버, 카카오 소셜 로그인 작업을 진행 하였으며',
            'ㅤ',
            '우측 슬라이드 이미지에서 볼 수 있는',
            '랜딩 페이지를 제작 하였습니다.'
        ],
        images: [
            '/content/matchup/1.png',
            '/content/matchup/2.png',
            '/content/matchup/3.png'
        ]
    },
    {
        id: 'gaja',
        company: '주식회사 위즈메이드',
        category: 'vertical',
        categoryColor: 'purple',
        title: '가자',
        storeLinks: [
            { label: '게시 취소', url: undefined }
        ],
        workScope: [
            'Webview 컴포넌트 사용을 위한 모바일 웹 제작',
            'PHP 백엔드, 프론트엔드(jQuery) 담당',
            '하이브리드앱 개발 및 배포(AOS, iOS)'
        ],
        environment: [
            { label: 'Infra', value: 'Cafe24 Virtual Hosting' },
            { label: 'Backend', value: 'PHP 7.x' },
            { label: 'FrameWork', value: 'Codeigniter 4.x' },
            { label: 'Android', value: 'Kotlin + Android Studio' },
            { label: 'Ios', value: 'Swift + Xcode' }
        ],
        description: [
            '플랫폼에 등록된 상점 방문 시',
            '사용자는 해당 앱에 등록된 상점에 대한 정보를 얻고',
            '방문 시 사용 할 수 있는',
            '쿠폰과 스탬프를 지급하여 사용할 수 있게 해주는 앱입니다.',
            'ㅤ',
            '웹 제작, 앱 패키징, 배포까지 모두 담당하여 진행 하였지만',
            '현재는 접속이 불가한 상태입니다.'
        ],
        images: [
            '/content/go/1.png',
            '/content/go/2.png',
            '/content/go/3.png'
        ],
        reversed: true
    },
    {
        id: 'kanta',
        company: '주식회사 위즈메이드',
        category: 'horizontal',
        categoryColor: 'green',
        title: '칸타수학',
        storeLinks: [
            {
                label: 'Android ( 게시 취소 )',
                url: ''
            }
        ],
        urlText: '게시 취소',
        workScope: [
            'Webview 컴포넌트 사용을 위한 모바일 웹 제작',
            'PHP 백엔드, 프론트엔드(jQuery) 담당',
        ],
        environment: [
            { label: 'Infra', value: 'Cafe24 Virtual Hosting' },
            { label: 'Backend', value: 'PHP 7.x' },
            { label: 'FrameWork', value: 'Codeigniter 4.x' },
            { label: 'Android', value: 'Kotlin + Android Studio' },
            { label: 'Ios', value: 'Swift + Xcode' }
        ],
        description: [
            '강의영상과 시험문제를 온라인으로 학생들에게 제공하여 학습 효율을 높이는 교육 플랫폼입니다.',
            'ㅤ',
            '정해진 시간에 따라 강의버튼을 활성, 비활성화 하여',
            '학생들이 정해진 시간에만 학습 강의를 할 수 있도록 설계 되었고',
            'ㅤ',
            'html5 문법을 이용하여 video 태그를 직접 커스텀하여',
            '영상 새로고침, 10초 플레이백, 여러 영상을 연계하여 하나의 영상이 끝나면',
            '그 다음 강의를 들을 수 있도록 하는 등의 작업을 하였습니다.',
            'ㅤ',
            '해당 프로젝트는 구글 플레이 스토어에 배포 되었다가',
            '학원 내부에서 앱 패키지 파일을 공유하여 사용 할 것이라는 클라이언트 요청으로 인해',
            '스토어로 배포는 되어있지 않은 상태 입니다.'
        ],
        images: [
            '/content/kanta/1.png',
            '/content/kanta/2.png',
            '/content/kanta/3.png',
            '/content/kanta/4.png',
            '/content/kanta/5.png'
        ]
    },
    {
        id: 'parking',
        company: '주식회사 위즈메이드',
        category: 'vertical',
        categoryColor: 'indigo',
        title: '주차실태조사',
        storeLinks: [
            {
                label: 'App Store',
                url: 'https://apps.apple.com/us/app/%EC%A3%BC%EC%B0%A8%EC%8B%A4%ED%83%9C%EC%A1%B0%EC%82%AC/id1582133805'
            }
        ],
        workScope: [
            'Webview 컴포넌트 사용을 위한 모바일 웹 제작',
            'PHP 백엔드, 프론트엔드(jQuery) 담당',
            '하이브리드앱 패키징 및 배포(iOS, AOS)'
        ],
        environment: [
            { label: 'Infra', value: 'Aws S3, RDS' },
            { label: 'Server', value: 'Cafe24 Virtual Hosting' },
            { label: 'Backend', value: 'PHP 7.4' },
            { label: 'Android', value: 'Kotlin + Android Studio' },
            { label: 'Ios', value: 'Swift + Xcode' }
        ],
        description: [
            '서울시의 주차현황을 조사하는 플랫폼으로',
            '조사원들은 해당 플랫폼 앱을 설치하여',
            'ㅤ',
            '불법으로 주차되어 있는 차량의 번호판을 사진으로 촬영하여',
            '해당 앱의 관리자가 서울 시에 불법으로 주차되어 있는 차량의',
            '위치별 차종과 대수를 통계 낼 수 있도록 하는 어플리케이션 입니다.',
            'ㅤ',
            '서버는 카페24 가상 호스팅으로 백엔드 및 프론트엔드는',
            'Php 언어와 Jquery 로 제작이 되었습니다.',
            'ㅤ',
            '촬영한 사진의 저장소로는 S3 서비스를 사용하였으며',
            '웹 제작부터 앱 패키징, 배포 까지 모두 담당하여 진행하였습니다.'
        ],
        images: [
            '/content/park/1.png',
            '/content/park/2.png',
            '/content/park/3.png',
            '/content/park/4.png',
            '/content/park/5.png'
        ],
        reversed: true
    },
    {
        id: 'kosdaq',
        company: '주식회사 위브릭스',
        category: 'horizontal',
        categoryColor: 'orange',
        title: '코스닥협회',
        url: 'https://www.kosdaqca.or.kr',
        urlText: 'kosdaqca.or.kr',
        workScope: [
            '유지보수 및 추가개발',
            'SQL Injection, Xss Script 보안점검'
        ],
        environment: [
            { label: 'Server', value: 'Cafe24 Virtual Hosting' },
            { label: 'Backend', value: 'PHP 7.4' },
            { label: 'Solution', value: 'Gnuboard 5.x' },
        ],
        description: [
            '시장 제도 운영 · 지원 · 감시 · 홍보 · 투자자 보호 등을 하는 협회 조직으로',
            '해당 사이트의 유지보수, 추가 개발, 서버 에러 등의 문제가 있거나',
            '보안 점검이 필요 할 시, SQL Injection, Xss Script 과 같은 점검 테스트를 진행 하였습니다.'
        ],
        images: [
            '/content/kosdaq/1.png',
            '/content/kosdaq/2.png',
            '/content/kosdaq/3.png',
            '/content/kosdaq/4.png'
        ]
    },
    {
        id: 'lotte',
        company: '주식회사 위브릭스',
        category: 'horizontal',
        categoryColor: 'red',
        title: '롯데케미칼 Staron',
        url: 'https://www.staron.com',
        urlText: 'staron.com',
        workScope: ['유지보수 및 추가개발'],
        environment: [
            { label: 'Infra', value: 'Aws EC2, S3, RDS' },
            { label: 'Server', value: 'Amazon Linux 3' },
            { label: 'Backend', value: 'PHP 7.x' },
            { label: 'FrameWork', value: 'Codeigniter 4.x' }
        ],
        description: [
            '고급 인조대리석, 인공석 (solid surface) 브랜드로',
            '주택·상업 공간·공공 공간 등의 인테리어 및 마감재를 위한',
            '소재를 공급하고 자연석 느낌 + 가공 유연성 + 위생성 + 미려한',
            '디자인의 강점을 가진 사이트 입니다.',
            'ㅤ',
            '주로 웹 페이지 유지보수 및 추가개발 업무를 담당하고',
            'AWS EC2 서버 안정성 확인, 스냅샷 확인 등의 인프라 점검 업무도 진행 하였습니다.'
        ],
        images: [
            '/content/lotte/1.png',
            '/content/lotte/2.png',
            '/content/lotte/3.png'
        ]
    },
    {
        id: 'ydct',
        company: '주식회사 위브릭스',
        category: 'horizontal',
        categoryColor: 'teal',
        title: '영덕문화재단',
        url: 'https://ydct.org',
        urlText: 'ydct.org',
        workScope: ['유지보수 및 추가개발, 서버관리'],
        environment: [
            { label: 'Infra', value: 'Cafe24 Virtual Hosting' },
            { label: 'Backend', value: 'PHP 7.x' },
            { label: 'FrameWork', value: 'Codeigniter 4.x' }
        ],
        description: [
            '영덕문화 관광재단에서 제공하는',
            '영화, 문화, 강좌, 재단에 대해서 정보를 제공하고',
            '필요한 컨텐츠를 예약 할 수 있는 사이트 입니다.',
            'ㅤ',
            '해당 프로젝트는 카드 결제가 필요하여 Van 서비스를 사용 하고 있으며',
            '주로 카드 결제 시 발생하는 에러를 픽스하는 업무를 진행 하였으며',
            'ㅤ',
            '리눅스 서버에서도 CronJob 세팅, 비밀번호 주기적 변경',
            '과 같은 서버관리를 병행하였습니다.'

        ],
        images: [
            '/content/ydct/1.png',
            '/content/ydct/2.png',
            '/content/ydct/3.png',
            '/content/ydct/4.png'
        ],
        reversed: true
    },
    {
        id: 'sunin',
        company: '주식회사 위브릭스',
        category: 'horizontal',
        categoryColor: 'indigo',
        title: '선인재단',
        url: 'https://sib.kr',
        urlText: 'sib.kr',
        workScope: ['유지보수 및 추가개발, 서버관리'],
        environment: [
            { label: 'Infra', value: 'Cafe24 Virtual Hosting' },
            { label: 'Backend', value: 'PHP 7.x' },
            { label: 'FrameWork', value: 'Gnuboard 5.x' }
        ],
        description: [
            '선인 재단에서 관리하는',
            '식료품을 검색 & 구매 할 수 있는 사이트 입니다.',
            'ㅤ',
            '전반적인 유지보수, 추가개발, 서버관리 업무를 담당하였습니다.'
        ],
        images: [
            '/content/sunin/1.png',
            '/content/sunin/2.png',
            '/content/sunin/3.png'
        ]
    },
    {
        id: 'godtech',
        company: '주식회사 갓테크',
        category: 'horizontal',
        categoryColor: 'teal',
        title: '(주)갓테크 홈페이지',
        url: 'https://godtech.co.kr',
        urlText: 'godtech.co.kr',
        workScope: [
            '아마존 클라우드 서버 인프라 구축',
            '프론트엔드 디자인 기획 및 제작',
            '백엔드 DB 구조 및 데이터 출력 담당'
        ],
        environment: [
            { label: 'Infra', value: 'AWS EC2, RDS, S3, Route 53, CloudFront, Docker Compose' },
            { label: 'Backend', value: 'Kotlin' },
            { label: 'Frontend', value: 'typescript' },
            { label: 'FrameWork', value: 'BootSpring 3.x, NextJs 15.x' }
        ],
        description: [
            '(주)갓테크에서 사용중인 대표 홈페이지 입니다.',
            '3D 금속, 플라스틱 분말제작 프린팅 위주의 내용으로 구성 되어 있으며',
            '다국어 전환이 가능하여 여러 국가에서 사용 가능 하도록 제작되어 있습니다.',
            'ㅤ',
            'AWS EC2 인스턴스와 Docker 를 이용하여 제작이 되었으며',
            '인프라 구축, DB 설계, 프론트, 백엔드 구축 일체를 담당하였습니다.'
        ],
        images: [
            '/content/godtech/1.png',
            '/content/godtech/2.png',
            '/content/godtech/3.png',
            '/content/godtech/4.png'
        ]
    },
    {
        id: 'refit',
        company: '주식회사 갓테크',
        category: 'horizontal',
        categoryColor: 'indigo',
        title: '선순환 금속 플랫폼 Re-Fit',
        url: 'https://re-fit.co.kr',
        urlText: 're-fit.co.kr',
        workScope: [
            '플랫폼 유지보수 담당',
            'DB 입출력 에러, Api 오류 처리'
        ],
        environment: [
            { label: 'Infra', value: 'AWS ECS, ECR, RDS, S3, CloudFront, CloudFormation' },
            { label: 'Backend', value: 'Java' },
            { label: 'Frontend', value: 'typescript' },
            { label: 'FrameWork', value: 'BootSpring 3.x, NextJs 15.x' }
        ],
        description: [
            '(주)갓테크에서 국책과제로 외주의뢰를 통하여 만들어진',
            '폐금속 소재의 재활용·재사용을 통해 자원 순환을 촉진하고',
            '국내 소재·부품 산업의 국산화를 지원하도록 만들어진 플랫폼 입니다.',
            'ㅤ',
            '외주업체를 통하여 제작되었으며',
            '플랫폼 유지보수를 위하여 백엔드, 프론트엔드에서 발생하는',
            '전반적인 업무를 담당하였습니다.'
        ],
        images: [
            '/content/refit/1.png',
            '/content/refit/2.png',
            '/content/refit/3.png',
            '/content/refit/4.png'
        ]
    }
];