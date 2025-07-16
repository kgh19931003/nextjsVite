'use client';

import React, { useState } from 'react';
import { User } from '@/lib/types/admin';
import {
    faArrowLeft,
    faArrowRight,
    faArrowDown,
    faArrowUp,
    faArrowAltCircleDown,
    faSearch,
    faChevronDown, faChevronRight, faChevronLeft, faPen, faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/navigation';
import {numberWithCommas} from "@/lib/function";

interface TableProps {
    title: string;
    role: string;
    totalCount: number;
    theaders: Map<string, string>;
    contents: any;
    details: { totalPages: number };
    onDelete: (id: string) => void;
    onEdit: (user: User) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    onBatchDelete:  (ids: string[]) => Promise<any>;
    selectedDatas: String[];
    setSelectedDatas: (strings: string[]) => void;
    handleExcelDownload: () => void;
}

const Table: React.FC<TableProps> = ({ title, role,  totalCount, theaders, contents, details, interfaceName, onDelete, onEdit, currentPage, setCurrentPage, onBatchDelete, selectedDatas, setSelectedDatas, handleExcelDownload  }) => {

    const [sortField, setSortField] = useState<keyof T>('memberName' as keyof T);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [perPage, setPerPage] = useState(10);
    const router = useRouter();
    const primaryKey = contents.length > 0 ? Object.keys(contents[0])[0] : '';

    const toggleSort = (field) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const sortedUsers = [...contents].sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredUsers = sortedUsers.filter(user =>
        Object.keys(user)[0].toLowerCase().includes(searchTerm.toLowerCase())
    );

    //const totalUsers = filteredUsers.length;
    const totalPages = details.totalPages;
    const currentPageData = filteredUsers;

    const changePage = (page: number) => {
        if (page < 1 || page > totalPages) return;

        setCurrentPage(page);
    };

    const toggleSelectAll = () => {
        if (!primaryKey) return;

        if (selectedDatas.length === currentPageData.length) {
            setSelectedDatas([]);
        } else {
            setSelectedDatas(currentPageData.map(item => String(item[primaryKey])));
        }
    };
    const toggleSelect = (idx: string) => {
        if (selectedDatas.includes(idx)) {
            setSelectedDatas(selectedDatas.filter(filterIdx => filterIdx !== idx));
        } else {
            setSelectedDatas([...selectedDatas, idx]);
        }
    };


    // 최대 10개 페이지 버튼 표시
    const maxPageButtons = 10;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = startPage + maxPageButtons - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="bg-white shadow rounded-lg">
            <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-medium text-gray-900">{title} 관리</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            총 {totalCount}개의 데이터가 있습니다.
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        <button
                            onClick={handleExcelDownload}
                            type="button"
                            className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            엑셀 다운로드
                        </button>
                        <button
                            onClick={() => router.push(`/admin/${role}/edit/new`)}
                            type="button"
                            className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {title} 추가
                        </button>
                        <button
                            onClick={() => onBatchDelete && onBatchDelete(selectedDatas)}  // 여기서 호출
                            type="button"
                            className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            일괄 삭제
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    checked={selectedDatas.length === currentPageData.length && currentPageData.length > 0}
                                    onChange={toggleSelectAll}
                                />
                            </div>
                        </th>

                        {Object.entries(theaders).map(([key, value]) => (
                            <th
                                    key={key}
                                    scope="col"
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => toggleSort(key)}
                            >
                                <div className="flex items-center">
                                    <span>{value}</span>
                                    {sortField === key && (
                                        <span className="ml-1 material-icons-outlined text-xs">
                                                    {sortDirection === 'asc' ? <FontAwesomeIcon icon={faArrowUp}/> :
                                                        <FontAwesomeIcon icon={faArrowDown}/>}
                                                </span>
                                    )}
                                </div>
                            </th>
                        ))}

                        <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        >
                            <div className="flex items-center">
                                <span>설정</span>
                            </div>
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {currentPageData.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="text-center px-6 py-4 text-gray-500">
                                데이터가 없습니다.
                            </td>
                        </tr>
                    ) : (
                        currentPageData.map((column) => {
                            const values = Object.values(column); // 객체의 value 배열
                            const keys = Object.keys(column); // 객체의 value 배열


                            return (
                                <tr key={values[0].toString()} className={selectedDatas.includes(values[0].toString()) ? 'bg-blue-50' : ''}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            checked={selectedDatas.includes(values[0].toString())}
                                            onChange={() => toggleSelect(values[0].toString())}
                                        />
                                    </td>

                                    {Object.entries(theaders).map(([h_key, value], index) => (
                                        <td key={h_key} className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {h_key === "productPrice"
                                                    ? numberWithCommas(values[index + 1])
                                                    : values[index + 1]}
                                            </div>


                                        </td>
                                    ))}



                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => router.push(`/admin/${role}/edit/${values[0]}`)}
                                                className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md cursor-pointer"
                                            >
                                                <FontAwesomeIcon icon={faPen} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(values[0].toString())}
                                                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md cursor-pointer"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                    </tbody>

                </table>
            </div>

            {/* 페이지네이션 */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                    <button
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        onClick={() => changePage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        이전
                    </button>
                    <button
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        onClick={() => changePage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        다음
                    </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>

                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                             aria-label="Pagination">
                            <button
                                onClick={() => changePage(currentPage - 1)}
                                className="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                disabled={currentPage === 1}
                            >
                                <span className="sr-only">이전</span>
                                <FontAwesomeIcon icon={faChevronLeft}/>
                            </button>

                            {pageNumbers.map((page) => (
                                <button
                                    key={page}
                                    onClick={() => changePage(page)}
                                    className={`cursor-pointer relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                        currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                                    } border-gray-300`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => changePage(currentPage + 1)}
                                className="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                disabled={currentPage === totalPages}
                            >
                                <span className="sr-only">다음</span>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
