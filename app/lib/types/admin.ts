// 관리자 페이지에서 사용할 타입 정의

export type tableDataResponse = {
    total: number;
    contents: User[];
    details: { totalPages: number };
};



// 사용자 타입
export interface User {
    memberIdx: number;
    memberId: string;
    memberName: string;
    memberGender: string;
    memberCreatedAt: string;
}

// 대시보드 카드 타입
export interface DashboardCardProps {
    title: string;
    value: string | number;
    icon: string;
    change?: {
        value: number;
        isPositive: boolean;
    };
}

// 사이드바 아이템 타입
export interface SidebarItem {
    title: string;
    path: string;
    icon: string;
    children?: SidebarItem[];
}

// 인증 상태 타입
export interface AuthState {
    isAuthenticated: boolean;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    } | null;
}