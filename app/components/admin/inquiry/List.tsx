'use client';

import React, {useMemo, useState} from 'react';
import useSWR, {mutate} from 'swr';
import Table from '@/components/admin/Table';
import SearchFilter from '@/components/admin/SearchFilter';
import {tableDataResponse, User} from '@/lib/types/admin';
import {swrFetcher} from "@/lib/function";
import {usePathname} from "next/navigation";



const theaders = new Map<string, string>([
    ['language', '언어'],
    ['category', '카테고리'],
    ['companyName', '회사명'],
    ['manager', '담당자'],
    ['tel', '전화번호'],
    ['email', '이메일']
]);


const ListPage = () => {
    const [page, setPage] = useState(1);
    const [searchCategory, setSearchCategory] = useState('');
    const [searchCompanyName, setSearchCompanyName] = useState('');
    const [searchManager, setSearchManager] = useState('');
    const [searchTel, setSearchTel] = useState<string>('');
    const [searchEmail, setSearchEmail] = useState<string>('');
    const [selectedDatas, setSelectedDatas] = useState<string[]>([]);

    const pathname = usePathname();

    const currentLocale = useMemo(() => {
        return pathname?.split('/')[1];
    }, [pathname]);

    // 실제로 요청에 사용할 검색 파라미터
    const [searchParams, setSearchParams] = useState({
        category: '',
        companyName: '',
        manager: '',
        tel: '',
        email: '',
    });

    const queryParams = useMemo(() => {
        return new URLSearchParams({
            page: page.toString(),
            ...(currentLocale && { language: currentLocale }),
            ...(searchParams.category && { category: searchParams.category }),
            ...(searchParams.companyName && { companyName: searchParams.companyName }),
            ...(searchParams.manager && { manager: searchParams.manager }),
            ...(searchParams.tel && { tel: searchParams.tel }),
            ...(searchParams.email && { email: searchParams.email }),
        }).toString();
    }, [page, searchParams]);


    /*
    const { data, error, isLoading } = useSWR<UserResponse>(
        `/${currentLocale}/api/api/member-list?${queryParams}`, // trigger로 강제 리렌더링
        fetcher
    );
     */
    const fetcher = (url: string) => fetch(url).then(res => res.json());
    const { data, error, isLoading } = useSWR<tableDataResponse>(`/${currentLocale}/api/inquiry/list?${queryParams}`, fetcher);


    const handleSearch = () => {
        setPage(1); // 검색 시 페이지를 1로 초기화
        setSearchParams({
            category: searchCategory,
            companyName: searchCompanyName,
            manager: searchManager,
            tel: searchTel,
            email: searchEmail
        });
    };
    const handleDelete = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        const token = localStorage.getItem('token');

        try {
            const res = await swrFetcher(`/${currentLocale}/api/admin/inquiry/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            });

            alert('삭제되었습니다.');

            // ✅ SWR 데이터를 다시 가져오도록 강제 리렌더링
            await mutate(`/${currentLocale}/api/admin/inquiry/list?${queryParams}`);
        } catch (err) {
            console.error(err);
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    const handleBatchDelete = async (ids: string[]) => {
        if (ids.length === 0) {
            alert('삭제할 문의를 선택해주세요.');
            return;
        }

        if (!confirm(`${ids.length}명을 정말 삭제하시겠습니까?`)) return;

        const token = localStorage.getItem('token');

        try {
            await Promise.all(
                ids.map(id =>
                    fetch(`/${currentLocale}/api/admin/inquiry/delete/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        method: 'DELETE',
                    }).then(res => {
                        if (!res.ok) throw new Error(`${id} 삭제 실패`);
                    })
                )
            );

            alert('선택한 문의가 삭제되었습니다.');

            // 삭제 후 데이터 다시 가져오기
            await mutate(`/${currentLocale}/api/admin/inquiry/list?${queryParams}`);
            // 체크박스 선택 해제
            setSelectedDatas([]);
        } catch (err) {
            console.error(err);
            alert('일괄 삭제 중 오류가 발생했습니다.');
        }
    };


    const handleExcelDownload = async () => {
        try {
            const token = localStorage.getItem('token');

            const res = await swrFetcher(`/${currentLocale}/api/admin/inquiry/excel?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (res instanceof Response) {


                const blob = await res.blob();

                // 👉 Content-Disposition 헤더에서 파일명 추출
                const disposition = res.headers.get('Content-Disposition');

                let filename = 'excel.xlsx'; // 기본값

                if (disposition) {
                    const match = disposition.match(/filename\*=UTF-8''(.+)/);
                    if (match && match[1]) {
                        filename = decodeURIComponent(match[1]);
                    }
                }


                const url = URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();

                URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error(error);
            alert('엑셀 다운로드 중 오류가 발생했습니다.');
        }
    };


    const handleEdit = (user: User) => {};


    // ✅ 필드 설정을 useMemo로 분리
    const searchFields = useMemo(() => [
        {
            type: 'select' as const,
            value: searchCategory,
            onChange: setSearchCategory,
            options: [
                { value: '', label: '문의유형' },
                { value: '3d_printing_manufacturing', label: '적층 제조 - 제작' },
                { value: '3d_printing_repair', label: '적층 제조 - 보수' },
                { value: 'powder_ni_alloy', label: '금속 분말 - Ni Alloy' },
                { value: 'powder_stainless', label: '금속 분말 - Stainless' },
                { value: 'etc', label: '기타' },
            ],
        },
        {
            type: 'input' as const,
            placeholder: '회사명',
            value: searchCompanyName,
            onChange: setSearchCompanyName,
        },
        {
            type: 'input' as const,
            placeholder: '담당자',
            value: searchManager,
            onChange: setSearchManager,
        },
        {
            type: 'input' as const,
            placeholder: '전화번호',
            value: searchTel,
            onChange: setSearchTel,
        },
        {
            type: 'input' as const,
            placeholder: '이메일',
            value: searchEmail,
            onChange: setSearchEmail,
        },

    ], [searchCategory, searchCompanyName, searchManager, searchTel, searchEmail]);

    return (
        <div className="p-4">
            <SearchFilter fields={searchFields} onSearch={handleSearch} />

            <Table
                locale={currentLocale as string}
                title="문의"
                role="inquiry"
                totalCount={data?.total as number}
                theaders={theaders}
                contents={data?.contents}
                details={data?.details ?? { totalPages: 0 }}
                onDelete={handleDelete}
                onEdit={handleEdit}
                currentPage={page}
                setCurrentPage={setPage}
                onBatchDelete={handleBatchDelete}
                selectedDatas={selectedDatas}
                setSelectedDatas={setSelectedDatas}
                handleExcelDownload={handleExcelDownload}
            />
        </div>
    );
};

export default ListPage;
