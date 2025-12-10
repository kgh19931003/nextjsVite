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
    ['title', '제목'],
    ['subtitle', '부제목'],
    ['createdAt', '등록일'],
]);

const ListPage = () => {
    const [page, setPage] = useState(1);
    const [searchCategory, setSearchCategory] = useState('');
    const [searchTitle, setSearchTitle] = useState('');
    const [searchSubTitle, setSearchSubTitle] = useState('');
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const pathname = usePathname();

    const currentLocale = useMemo(() => {
        return pathname?.split('/')[1];
    }, [pathname]);

    // 실제로 요청에 사용할 검색 파라미터
    const [searchParams, setSearchParams] = useState({
        category: '',
        title: '',
        subtitle: '',
    });

    const queryParams = useMemo(() => {
        return new URLSearchParams({
            page: page.toString(),
            ...(currentLocale && { language: currentLocale }),
            ...(searchParams.category && { category: searchParams.category }),
            ...(searchParams.title && { title: searchParams.title }),
            ...(searchParams.subtitle && { subtitle: searchParams.subtitle })
        }).toString();
    }, [page, searchParams]);


    /*
    const { data, error, isLoading } = useSWR<UserResponse>(
        `/${currentLocale}/api/api/member-list?${queryParams}`, // trigger로 강제 리렌더링
        fetcher
    );
     */
    const fetcher = (url: string) => fetch(url).then(res => res.json());
    const { data, error, isLoading } = useSWR<tableDataResponse>(`/${currentLocale}/api/admin/post/list?${queryParams}`, fetcher);


    const handleSearch = () => {
        setPage(1); // 검색 시 페이지를 1로 초기화
        setSearchParams({
            category: searchCategory,
            title: searchTitle,
            subtitle: searchSubTitle,
        });
    };
    const handleDelete = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        const token = localStorage.getItem('token');

        try {
            const res = await swrFetcher(`/${currentLocale}/api/admin/post/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            });

            alert('삭제되었습니다.');

            // ✅ SWR 데이터를 다시 가져오도록 강제 리렌더링
            await mutate(`/${currentLocale}/api/admin/post/list?${queryParams}`);
        } catch (err) {
            console.error(err);
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    const handleBatchDelete = async (ids: string[]) => {
        if (ids.length === 0) {
            alert('삭제할 게시글 내역을 선택해주세요.');
            return;
        }

        if (!confirm(`${ids.length}명을 정말 삭제하시겠습니까?`)) return;

        const token = localStorage.getItem('token');

        try {
            await Promise.all(
                ids.map(id =>
                    fetch(`/${currentLocale}/api/admin/post/delete/${id}`, {
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

            alert('선택한 게시글 내역이 삭제되었습니다.');

            // 삭제 후 데이터 다시 가져오기
            await mutate(`/${currentLocale}/api/admin/post/list?${queryParams}`);
            // 체크박스 선택 해제
            setSelectedUsers([]);
        } catch (err) {
            console.error(err);
            alert('일괄 삭제 중 오류가 발생했습니다.');
        }
    };


    const handleExcelDownload = async () => {
        try {
            const token = localStorage.getItem('token');

            // ⭐ 백엔드에서 바이너리 응답을 받아야 하므로 fetch 직접 사용
            const response = await fetch(`/${currentLocale}/api/admin/post/excel?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // ⭐ Blob으로 변환
            const blob = await response.blob();

            // ⭐ Content-Disposition 헤더에서 파일명 추출
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = 'post_list.xlsx'; // 기본값

            if (contentDisposition) {
                // filename*=UTF-8''encoded-name.xlsx 형식 파싱
                const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;\r\n]+)/i);
                if (utf8Match?.[1]) {
                    if (utf8Match) {
                        filename = decodeURIComponent(utf8Match[1]);
                    }
                } else {
                    // filename="name.xlsx" 또는 filename=name.xlsx 형식 파싱
                    const simpleMatch = contentDisposition.match(/filename[^;=\n]*=["']?([^"';\r\n]+)/i);
                    if (simpleMatch?.[1]) {
                        if (simpleMatch) {
                            filename = simpleMatch[1].trim();
                        }
                    }
                }
            }

            // ⭐ 파일 다운로드
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();

            // ⭐ 정리
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            console.log('✅ 엑셀 다운로드 완료:', filename);
        } catch (error) {
            console.error('❌ 엑셀 다운로드 실패:', error);
            alert('엑셀 다운로드 중 오류가 발생했습니다.');
        }
    };


    const handleEdit = (user: User) => {};

    // ✅ 필드 설정을 useMemo로 분리
    const searchFields = useMemo(() => [
        {
            type: 'input' as const,
            placeholder: '카테고리',
            value: searchCategory,
            onChange: setSearchCategory,
        },
        {
            type: 'input' as const,
            placeholder: '제목',
            value: searchTitle,
            onChange: setSearchTitle,
        },
        {
            type: 'input' as const,
            placeholder: '부제목',
            value: searchSubTitle,
            onChange: setSearchSubTitle,
        }
    ], [setSearchCategory, setSearchTitle, setSearchSubTitle]);

    return (
        <div className="p-4">
            <SearchFilter fields={searchFields} onSearch={handleSearch} />

            <Table
                locale={currentLocale as string}
                title="게시글 내역"
                role="post"
                totalCount={data?.total as number}
                theaders={theaders}
                contents={data?.contents}
                details={data?.details ?? { totalPages: 0 }}
                onDelete={handleDelete}
                onEdit={handleEdit}
                currentPage={page}
                setCurrentPage={setPage}
                onBatchDelete={handleBatchDelete}
                selectedDatas={selectedUsers}
                setSelectedDatas={setSelectedUsers}
                handleExcelDownload={handleExcelDownload}
            />
        </div>
    );
};

export default ListPage;
