import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { images } from '../constants';
import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { BsChatSquareDots } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";
import { CgAddR } from "react-icons/cg";
import { BsLightbulbFill } from "react-icons/bs";
import { useSelector } from 'react-redux';

const Menus = [
    { name: "Home", icon: images.menu, path: "/" },
    { name: "Messages", icon: images.message, path: "/Messages" },
    { name: "Tasks", icon: images.taskSquare, path: "/Tasks" },
    { name: "Members", icon: images.profileUser, path: "/Members" },
    { name: "Setting", icon: images.setting, path: "/Setting" },
]

const dotColors = ["#FF5733", "#33FF57", "#3357FF", "#F39C12", "#8E44AD"];

export const Navbar = () => {
    const MyProjects =useSelector((state)=> state.project.projects);
    const [isToggle, setIsToggle] = useState(false);
    const [active, setActive] = useState(0);
    const location = useLocation();

    console.log("Myprojects", MyProjects);

    const handleClick = (index) => {
        setActive(index);
    }

    return (
        <nav className='sticky top-0 '>
            {/* Company name & logo */}
            <div className='flex items-center justify-between p-4 py-4 border-b border-[#DBDBDB]'>
                <div className='flex flex-row gap-2 items-center'>
                    <div className='flex items-center w-6 h-6'>
                        <img src={images.logo} className='w-full h-full' alt="logo" />
                    </div>
                    <span className={`text-xl md:text-xl h-6 font-semibold ${!isToggle ? "hidden" : ""}`}>Project M</span>
                </div>
                <div className='flex items-center w-7 h-5'
                    onClick={() => setIsToggle(!isToggle)}>
                    <img src={images?.leftArrow} className={`w-full h-full ${isToggle ? "" : " rotate-180"}`} alt="toggle" />
                </div>
            </div>

            {/* navlinkd & direct projects access link */}
            <div className='flex flex-col h-full'>
                <div className='flex-1'>
                    {/* menu links */}
                    <ul className='flex flex-col gap-1 text-base text-grey mx-2  py-5 border-b border-[#DBDBDB]'>
                        {Menus.map((menu, i) => (
                            <li className='link  py-1' key={i}>
                                <NavLink
                                    className={`flex gap-3 py-2 px-2 rounded-lg duration-500 ${location.pathname === menu.path && "text-grey bg-gray-200 "}`}
                                    to={menu.path}
                                    onClick={() => handleClick(i)}
                                >
                                    <span className={`text-xl duration-500 flex items-center ${location.pathname === menu.path && "text-grey"}`}>
                                        <img src={menu.icon} className={`text-grey ${(location.pathname === menu.path) && "text-black  duration-700"}`} title={menu.name} />
                                    </span>
                                    <span className={`links-name text-base font-sans duration-500 ${!isToggle ? "hidden" : ""} ${(location.pathname === menu.path) && "text-black duration-700"}`}>
                                        {menu.name}
                                    </span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* projects links */}
                    <ul className='flex flex-col gap-1 text-base text-grey mx-2 py-5 '>
                        <NavLink to= {"/myProjects"} className='flex justify-between items-center'>
                            <p className={`px-2 uppercase font-bold ${!isToggle ? "hidden" : ""}`}>My Projects</p>
                            <CgAddR className='text-xl mx-2' title='Create project' />
                        </NavLink>

                        {MyProjects?.slice(0, 5).map((project, i) => (
                            <li className={`link  py-1 ${isToggle ? "" : "hidden"}`} key={i}>
                                <NavLink
                                    className={`flex items-center justify-between rounded-lg duration-500 ${location.pathname === project.path && "bg-gray-200 "}`}
                                    to={`/myProjects/${project.title}`}
                                    onClick={() => handleClick(i)}
                                >
                                    <div className={`flex items-center gap-3 py-2 px-2 `}>
                                        <div
                                            className={`w-3 h-3 rounded-full`}
                                            style={{ backgroundColor: dotColors[i] }} // Assign unique color
                                            title={project.title}
                                        ></div>
                                        <span className={`links-name text-base font-sans duration-500 ${!isToggle ? "hidden" : ""} ${(location.pathname === project.path) && "text-black duration-700"}`}>
                                            {project.title}
                                        </span>
                                    </div>
                                    <div className={` flex items-center pr-2 duration-500 ${!isToggle || location.pathname !== project.path ? "hidden" : ""}`}>
                                        <img src={images.tripleDot} alt="" />
                                    </div>

                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* thoughts time  */}
                <div className={`bg-[#F5F5F5] rounded-2xl relative mx-4 p-4  mt-20 ${!isToggle ? "hidden" : ""}`}>
                    <div className='flex flex-col gap-2 justify-center text-sm pt-8'>
                        <h4 className='text-center font-semibold'>Thoughts Time</h4>
                        <p className='text-center text-grey'>We don’t have any notice for you, till then you can share your thoughts with your peers.</p>
                        <button className='font-semibold px-4 py-2 bg-white rounded-lg'>Write a message</button>
                    </div>
                    <div className=' absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-full bg-[#F5F5F5]'>
                        <div className='w-16 h-16 flex items-center justify-center bg-gradient-to-br from-yellow-100 via-yellow-50 to-transparent rounded-full'>
                            <BsLightbulbFill className='text-yellow-400 text-2xl' />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
