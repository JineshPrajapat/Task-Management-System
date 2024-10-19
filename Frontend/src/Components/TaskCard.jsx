import React, { useState } from 'react'
import { images } from '../constants'
import { BsChatSquareDots } from "react-icons/bs";
import { BsFolder2 } from "react-icons/bs";
import { TaskDropdown } from './TaskDropDown';
import { useDispatch } from 'react-redux';
import { deleteTaskFromProject, setTasksByStatus, updateTaskInProject } from '../Reducer/Slice/ProjectSlice';
import { useParams } from 'react-router-dom';

export const TaskCard = ({ taskID, title, description, priority, comments, files, status }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [taskStatus, setTaskStatus] = useState(status);
    const [taskPriority, setTaskPriority] = useState(priority);
    const dispatch = useDispatch();
    const params = useParams();
    const { projectTitle } = params;

    const handleChangeStatus = (newStatus) => {
        setTaskStatus(newStatus);
        dispatch(updateTaskInProject({ projectTitle, taskID, updatedTaskData: { status: newStatus } }));
        dispatch(setTasksByStatus({ projectTitle }));
    }

    const handleChangePriority = (newPriority) => {
        setTaskPriority(newPriority);
        dispatch(updateTaskInProject({ projectTitle, taskID, updatedTaskData: { priority: newPriority } }));
        dispatch(setTasksByStatus({ projectTitle }));
    }

    const handleDeleteTask = () => {
        dispatch(deleteTaskFromProject({ projectTitle, taskID: taskID }));
        dispatch(setTasksByStatus({ projectTitle }));
    };


    return (
        <div
            className='p-5 bg-white flex flex-col gap-2 rounded-2xl'
            draggable={true}
            onDragStart={(e) => {
                e.dataTransfer.setData("taskID", taskID);
                e.dataTransfer.setData("projectTitle", projectTitle);
                console.log("first")
            }}

            onDragEnd={(e)=>{
                console.log("sec")
            }}
        >
            <div className='flex flex-row justify-between items-center'>
                <div className={`p-1 px-2 text-xs font-medium rounded-[4px] bg-opacity-20 ${priority === 'Low' ? 'bg-[#DFA874] text-[#D58D49]' : priority === 'Medium' ? 'bg-amber-400 text-amber-600' : 'bg-red-300 text-[#D8727D]'} text-xs`}>
                    {priority}
                </div>
                <div className="relative">
                    <img
                        src={images.tripleDot}
                        alt=""
                        className="cursor-pointer"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    />

                    {/* Show the TaskDropdown when the triple dot is clicked */}
                    {isDropdownOpen && (
                        <TaskDropdown
                            isOpen={isDropdownOpen}
                            onClose={() => setIsDropdownOpen(false)}
                            status={status}
                            priority={priority}
                            onChangeStatus={handleChangeStatus}
                            onChangePriority={handleChangePriority}
                            onDelete={handleDeleteTask}
                        />
                    )}
                </div>

            </div>
            <h2 className='text-lg font-semibold'>{title}</h2>
            <p className='text-xs font-normal text-grey'>{description}</p>
            <div className='flex flex-row justify-between items-center text-grey pt-5'>
                <img src={images.taskUsers} alt="" />
                <div className='flex flex-row gap-4 items-center text-xs'>
                    <div className='flex items-center gap-1'>
                        <BsChatSquareDots />
                        <p>{comments} Comments</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <BsFolder2 />
                        <p>{files} Files</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

