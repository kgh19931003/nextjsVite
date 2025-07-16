'use client';

import React, {useMemo, useState} from 'react';
import useSWR, {mutate} from 'swr';
import Table from '@/components/admin/Table';
import SearchFilter from '@/components/admin/SearchFilter';
import {tableDataResponse, User} from '@/lib/types/admin';
import {swrFetcher} from "@/lib/function";


const theaders = {
    memberId : "아이디",
    memberName : "이름",
    memberGender : "성별",
    memberCreatedAt : "가입일자"
}

const UserListPage = () => {
    const [page, setPage] = useState(1);
    const [searchId, setSearchId] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchGender, setSearchGender] = useState('');
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    // 실제로 요청에 사용할 검색 파라미터
    const [searchParams, setSearchParams] = useState({
        memberId: '',
        memberName: '',
        memberGender: '',
    });

    const queryParams = useMemo(() => {
        return new URLSearchParams({
            page: page.toString(),
            ...(searchParams.memberId && { memberId: searchParams.memberId }),
            ...(searchParams.memberName && { memberName: searchParams.memberName }),
            ...(searchParams.memberGender && { memberGender: searchParams.memberGender }),
        }).toString();
    }, [page, searchParams]);


    /*
    const { data, error, isLoading } = useSWR<UserResponse>(
        `http://localhost:80/api/member-list?${queryParams}`, // trigger로 강제 리렌더링
        fetcher
    );
     */

    const { data, error, isLoading } = useSWR<tableDataResponse>(`http://localhost:80/member/list?${queryParams}`, swrFetcher);


    const handleSearch = () => {
        setPage(1); // 검색 시 페이지를 1로 초기화
        setSearchParams({
            memberId: searchId,
            memberName: searchName,
            memberGender: searchGender,
        });
    };
    const handleDelete = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        const token = localStorage.getItem('token');

        try {
            const res = await swrFetcher(`http://localhost:80/member/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            });

            alert('삭제되었습니다.');

            // ✅ SWR 데이터를 다시 가져오도록 강제 리렌더링
            await mutate(`http://localhost:80/member/list?${queryParams}`);
        } catch (err) {
            console.error(err);
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    const handleBatchDelete = async (ids: string[]) => {
        if (ids.length === 0) {
            alert('삭제할 사용자를 선택해주세요.');
            return;
        }

        if (!confirm(`${ids.length}명을 정말 삭제하시겠습니까?`)) return;

        const token = localStorage.getItem('token');

        try {
            await Promise.all(
                ids.map(id =>
                    fetch(`http://localhost:80/member/delete/${id}`, {
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

            alert('선택한 사용자가 삭제되었습니다.');

            // 삭제 후 데이터 다시 가져오기
            await mutate(`http://localhost:80/member/list?${queryParams}`);
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

            const res = await swrFetcher(`http://localhost:80/member/excel?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

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
        } catch (error) {
            console.error(error);
            alert('엑셀 다운로드 중 오류가 발생했습니다.');
        }
    };


    const handleEdit = (user: User) => {};


    // ✅ 필드 설정을 useMemo로 분리
    const searchFields = useMemo(() => [
        {
            type: 'input' as const,
            placeholder: '아이디',
            value: searchId,
            onChange: setSearchId,
        },
        {
            type: 'input' as const,
            placeholder: '이름',
            value: searchName,
            onChange: setSearchName,
        },
        {
            type: 'select' as const,
            value: searchGender,
            onChange: setSearchGender,
            options: [
                { value: '', label: '성별 선택' },
                { value: '1', label: '남성' },
                { value: '2', label: '여성' },
            ],
        },
    ], [searchId, searchName, searchGender]);

    return (
        <div className="p-4">
            <SearchFilter fields={searchFields} onSearch={handleSearch} />

            {isLoading && <div>로딩 중...</div>}
            {error || !data ? (
                <div className={"text-center p-10"}>데이터가 없습니다.</div>
            ) : (
                <Table
                    title="사용자"
                    role="users"
                    totalCount={data.total}
                    theaders={theaders}
                    contents={data.contents}
                    details={data.details}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    currentPage={page}
                    setCurrentPage={setPage}
                    onBatchDelete={handleBatchDelete}
                    selectedDatas={selectedUsers}
                    setSelectedDatas={setSelectedUsers}
                    handleExcelDownload={handleExcelDownload}
                />
            )}
        </div>
    );
};

export default UserListPage;
