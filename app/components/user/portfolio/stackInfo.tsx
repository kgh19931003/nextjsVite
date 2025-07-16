import React from 'react';

interface ListPara {
    id: number;
    name: string;
    value: string[];
    size: string[];
}

interface ListProps {
    ListInfo: ListPara[];
}

const StackInfoList: React.FC<ListProps> = ({ ListInfo }) => {
    return (
        <div className="space-y-10">
            {ListInfo.map((listPara) => (
                <div key={listPara.id} className="space-y-4">
                    {/* 항목 제목 */}
                    <div className="font-bold text-lg">{listPara.name}</div>

                    {/* 이미지 목록 */}
                    <div className="flex flex-wrap items-center gap-4">
                        {listPara.value.map((image, index) => (
                            <img
                                key={index}
                                src={`/img/${image}`}
                                alt={image}
                                className="align-super"
                                style={{
                                    width: `${listPara.size[index]}px`,
                                }}
                            />
                        ))}

                        {/* 자격증 텍스트 */}
                        {listPara.name === "자격증" && (
                            <span className="font-bold text-base">정보처리기사</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StackInfoList;
