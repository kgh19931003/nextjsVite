'use client';

import React from 'react';

type InputField = {
    type: 'input';
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
};

type SelectField = {
    type: 'select';
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
};

type FieldConfig = InputField | SelectField;

interface SearchFilterProps {
    fields: FieldConfig[];
    onSearch: () => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ fields, onSearch }) => {
    return (
        <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-md shadow-sm">
            {fields.map((field) => {
                // 고유 key 생성: type + placeholder (또는 value)
                const key = field.type + (field.placeholder ?? field.value);

                if (field.type === 'input') {
                    return (
                        <input
                            key={key}
                            type="text"
                            placeholder={field.placeholder}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                text-sm text-gray-700 bg-white"
                        />
                    );
                }

                if (field.type === 'select') {
                    return (
                        <select
                            key={key}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                text-sm text-gray-700 bg-white"
                        >
                            {field.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    );
                }

                return null;
            })}

            <button
                onClick={onSearch}
                className="cursor-pointer bg-black text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
                검색
            </button>
        </div>
    );
};

export default SearchFilter;
