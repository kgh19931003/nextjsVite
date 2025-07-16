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
        <div>
            {ListInfo.map((listPara) => (
                <div className="skill_line" key={listPara.id}>
                    {/* 이름을 동적으로 표시 */}
                    <div className="font-bold"
                         style={{
                             margin: "0px 0px 30px 0px",
                         }}
                    >{listPara.name}</div>

                    {/* 이미지 배열을 순회하여 각 이미지를 표시 */}
                    <div className="inline-block">
                        {listPara.value.map((image, index) => (
                            <img
                                key={index}
                                src={`img/${image}`}
                                alt={image}
                                style={{
                                    width: `${listPara.size[index]}px`,
                                    verticalAlign: "super",
                                }}
                            />
                        ))}

                        {/* name이 "자격증"일 경우 특정 span을 렌더링 */}
                        {listPara.name === "자격증" && (
                            <span
                                className="font-bold"

                            >
                            정보처리기사
                        </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StackInfoList;