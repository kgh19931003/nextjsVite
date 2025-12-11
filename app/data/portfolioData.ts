export const privacyData = [
    { id: 1, name: 'Name', value: '김근호', icon: '👤' },
    { id: 2, name: 'Birth', value: '1993. 10. 03', icon: '🎂' },
    { id: 3, name: 'Address', value: '부산시 북구 화명 양달로 80-11 102동 1401호', icon: '📍' },
    { id: 4, name: 'E-mail', value: 'sasaa3865@naver.com', icon: '📧' },
    { id: 5, name: 'Phone', value: '010 - 7615 - 3865', icon: '📱' },
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
        company: '갓테크',
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
        category: 'vertical',
        categoryColor: 'blue',
        title: '매치업 랜딩페이지',
        url: 'https://www.match-up.co.kr/',
        urlText: 'match-up.co.kr',
        workScope: [
            'PHP 백엔드, 프론트엔드(jQuery)',
            '하이브리드앱 개발 및 배포(AOS, iOS)'
        ],
        environment: [
            { label: 'Infra', value: 'Cafe24 Virtual Hosting' },
            { label: 'Backend', value: 'PHP 7.x' },
            { label: 'FrameWork', value: 'Codeigniter 4.x' }
        ],
        description: [
            '축구/풋살 구장 예약 및 경기 매칭 + 팀/플레이어',
            '관리 + 커뮤니티 기능”을 제공하는 스포츠 플랫폼 입니다.',
            '해당 플랫폼에서 앱 진입 시 노출되는 스플래시 작업과',
            '네이버, 카카오 소셜 로그인 작업을 진행 하였으며.',
            '좌측 슬라이드 이미지에서 볼 수 있는',
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
        category: 'vertical',
        categoryColor: 'purple',
        title: '가자',
        storeLinks: [
            { label: '게시 취소', url: undefined }
        ],
        workScope: [
            'PHP 백엔드, 프론트엔드(jQuery)',
            '하이브리드앱 개발 및 배포(AOS, iOS)'
        ],
        environment: [
            { label: 'Infra', value: 'Cafe24 Virtual Hosting' },
            { label: 'Backend', value: 'PHP 7.x' },
            { label: 'FrameWork', value: 'Codeigniter 4.x' }
        ],
        description: [
            '플랫폼에 등록된 상점 방문 시',
            '쿠폰과 스탬프를 지급하여 사용할 수 있게 해주는 앱입니다.'
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
        category: 'horizontal',
        categoryColor: 'green',
        title: '칸타수학',
        urlText: '게시 취소',
        workScope: [
            'PHP 백엔드, 프론트엔드(jQuery)',
            '하이브리드앱 개발 및 배포(AOS, iOS)'
        ],
        environment: [
            { label: 'Infra', value: 'Cafe24 Virtual Hosting' },
            { label: 'Backend', value: 'PHP 7.x' },
            { label: 'FrameWork', value: 'Codeigniter 4.x' }
        ],
        description: [
            '강의영상과 시험문제를 온라인으로 학생들에게 제공하여',
            '학습 효율을 높이는 교육 플랫폼입니다.'
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
            'Xcode, Swift 언어를 사용하여 Ios 하이브리드 앱 제작',
            'Android Studio, Kotlin 언어를 사용하여 Aos 하이브리드 앱 제작',
            '하이브리드앱 패키징 및 배포(iOS, AOS)'
        ],
        environment: [
            { label: 'Infra', value: 'Aws S3, RDS' },
            { label: 'Server', value: 'Cafe24 Virtual Hosting' },
            { label: 'Backend', value: 'PHP 7.4' },
            { label: 'AOS', value: 'Kotlin' },
            { label: 'iOS', value: 'Swift' }
        ],
        description: [
            '서울시의 주차현황을 조사하는 플랫폼으로',
            '조사원들은 해당 플랫폼 앱을 설치하여',
            '불법으로 주차되어 있는 차량의 번호판을 사진으로 촬영하여',
            '해당 앱의 관리자가 서울 시에 불법으로 주차되어 있는 차량의',
            '위치를 통계 낼 수 있도록 하는 어플리케이션 입니다.'
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
        id: 'lotte',
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
            '인공 아크릴 돌(솔리드 서피스) 재료 브랜드와 같은',
            '인테리어 소재를 판매하는 사이트입니다.'
        ],
        images: [
            '/content/lotte/1.png',
            '/content/lotte/2.png',
            '/content/lotte/3.png'
        ]
    },
    {
        id: 'ydct',
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
            '필요한 컨텐츠를 예약 할 수 있는 사이트 입니다.'
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
        category: 'horizontal',
        categoryColor: 'indigo',
        title: '선인재단',
        url: 'https://sib.kr',
        urlText: 'sib.kr',
        workScope: ['유지보수 및 추가개발, 서버관리'],
        environment: [
            { label: 'Infra', value: 'Cafe24 Virtual Hosting' },
            { label: 'Backend', value: 'PHP 7.x' },
            { label: 'FrameWork', value: 'Codeigniter 4.x' }
        ],
        description: [
            '선인 재단에서 관리하는',
            '식료품을 구매 할 수 있는 사이트 입니다.'
        ],
        images: [
            '/content/sunin/1.png',
            '/content/sunin/2.png',
            '/content/sunin/3.png'
        ]
    }
];