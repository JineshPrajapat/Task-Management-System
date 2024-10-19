import React from 'react';
import { BsCalendarDate } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';

const DateInputComponent = ({ selectedDate, handleDateChange }) => {
    const handleSpanClick = () => {
        const input = document.getElementById('date-input');
        input.focus();
        input.click();
    };

    const formatDateString = (dateString) => {
        if (!dateString) return "Due Date";
        return new Date(dateString).toLocaleDateString(); 
    };

    return (
        <div className='flex gap-2 py-2 px-4 items-center text-base border border-grey rounded-md text-grey relative'>
            <BsCalendarDate />
            <span 
                className='whitespace-nowrap font-medium cursor-pointer'
                onClick={handleSpanClick}
            >
                {formatDateString(selectedDate)}
            </span>
            <input
                id="date-input"
                type="date"
                value={selectedDate || ""}
                onChange={(e) => {
                    const value = e.target.value;
                    // Check if the value is empty
                    if (value) {
                        const date = new Date(value);
                        handleDateChange(date); // Pass Date object to the parent function
                    } else {
                        handleDateChange(null); // Clear date if input is empty
                    }
                }}
                className='border-none bg-transparent opacity-0 absolute'
                style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} // Covering the container
            />
            <IoIosArrowDown onClick={handleSpanClick} className='cursor-pointer' />
        </div>
    );
};

export default DateInputComponent;
