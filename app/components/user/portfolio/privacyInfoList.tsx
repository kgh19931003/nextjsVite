'use client';

import React from 'react';

interface ListPara {
    id: number;
    name: string;
    value: string;
}

interface ListProps {
    ListInfo: ListPara[];
}

const PrivacyInfoList: React.FC<ListProps> = ({ ListInfo }) => {
    return (
        <div>
            {ListInfo.map((listPara) => (
                <div key={listPara.id} className="w-full py-3.5">
                    <div className="font-bold">{listPara.name}</div>
                    <div>{listPara.value}</div>
                </div>
            ))}
        </div>
    );
};

export default PrivacyInfoList;
