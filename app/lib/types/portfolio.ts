interface PortfolioItem {
    id: string;
    company: string;
    category: string;
    categoryColor: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'teal' | 'indigo';
    title: string;
    url?: string;
    urlText?: string;
    storeLinks?: { label: string; url?: string }[];
    workScope: string[];
    environment: { label: string; value: string }[];
    description: string[];
    images: string[];
    reversed?: boolean;
}

// 포트폴리오 아이템 컴포넌트
interface PortfolioItemProps {
    item: PortfolioItem;
    settings: any;
    t: (key: string) => string;
}
