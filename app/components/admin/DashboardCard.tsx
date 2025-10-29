import React from 'react';
import { DashboardCardProps } from '@/lib/types/admin';
import {faArrowDown, faArrowUp, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
const DashboardCard: ({title, value, icon, change}: {
    title: any;
    value: any;
    icon: IconDefinition;
    change: any
}) => React.JSX.Element = ({
                                                         title,
                                                         value,
                                                         icon,
                                                         change
                                                     }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>

                    {change && (
                        <div className="mt-1 flex items-center">
              <span className={`flex items-center text-sm ${change.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                <span className="material-icons-outlined text-sm mr-1">
                  {change.isPositive ? <FontAwesomeIcon icon={faArrowUp} className="mr-2" /> : <FontAwesomeIcon icon={faArrowDown} className="mr-2" />}
                </span>
                  {Math.abs(change.value)}%
              </span>
                            <span className="text-xs text-gray-500 ml-1">지난달 대비</span>
                        </div>
                    )}
                </div>

                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="material-icons-outlined text-blue-600"><FontAwesomeIcon icon={icon} className="" /></span>
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;