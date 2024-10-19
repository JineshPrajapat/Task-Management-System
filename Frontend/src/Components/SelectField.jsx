import React from 'react';

export const SelectField = ({ id, name, value, onChange, label, options, required = false }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor={id}>
            {label}
        </label>
        <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:border-none focus:ring-blue-500 transition"
            required={required}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);
