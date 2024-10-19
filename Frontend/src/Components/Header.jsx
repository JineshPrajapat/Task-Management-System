import React from 'react'
import { RiSearchLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsQuestionSquare } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";
import { images } from '../constants';


export const Header = () => {
    return (
        <header className="flex justify-between items-center border-b border-[#DBDBDB]] p-2 px-8 bg-white sticky top-0 z-50 ">
            {/* Search bar */}
            <div className="flex items-center w-full max-w-md bg-gray-100 rounded-lg px-4 py-2">
                <RiSearchLine className="text-grey mr-2" />
                <input
                    type="text"
                    placeholder="Search for anything..."
                    className="bg-transparent outline-none w-full text-sm"
                />
            </div>

            {/* Right-side container */}
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-4">
                    <SlCalender className="text-grey" />
                    <BsQuestionSquare className="text-grey" />
                    <IoNotificationsOutline className="text-grey" />
                </div>

                {/* User info */}
                <div className="flex items-center gap-4">
                    <div className="flex flex-col text-right">
                        <span className="text-sm font-medium whitespace-nowrap">Jinesh Prajapat</span>
                        <span className="text-xs text-grey whitespace-nowrap">Rajasthan, India</span>
                    </div>

                    {/* Profile picture and dropdown */}
                    <div className="flex items-center gap-2">
                        <img
                            src={images.jinesh}
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                        />
                        <IoIosArrowDown className="text-grey" />
                    </div>
                </div>
            </div>
        </header>
    )
}
