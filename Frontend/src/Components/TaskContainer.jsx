import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { TaskCard } from './TaskCard';
import { AddTask } from './Forms/AddTask';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTasksByStatus, updateTaskInProject } from '../Reducer/Slice/ProjectSlice';

export const TaskContainer = ({ status, tasks }) => {
    const [isTaskForm, setIsTaskForm] = useState(false);                   //handling popup for add task form
    const params = useParams();
    const dispatch = useDispatch()

    const { projectTitle } = params;

    return (
        <section id={status} className='bg-bgGrey rounded-2xl p-5'>
            {/* heading  todo, progress, done */}
            <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                    <div className={`w-2 h-2 rounded-full ${status === "To Do"
                        ? "bg-[#5030E5]"
                        : status === "On Progress"
                            ? "bg-[#FFA500]"
                            : "bg-[#8BC48A]"
                        }`}>
                    </div>
                    <p className='text-black text-base font-medium'>{status}</p>
                    <span className='w-5 h-5 rounded-full bg-[#E0E0E0] text-xs flex items-center justify-center'>4</span>
                </div>
                <div className={`w-5 h-5 bg-violet-200 rounded-md flex items-center justify-center cursor-pointer ${status === "To Do" ? "" : "hidden"}`}
                    title='Add New Task'
                    onClick={() => setIsTaskForm(true)}
                >
                    <FaPlus className={`text-[#5030E5] text-xs`} />
                </div>
            </div>

            {/* separation line between heading and tasks */}
            <hr className={`my-5 h-1 ${status === "To Do"
                ? "bg-[#5030E5]"
                : status === "On Progress"
                    ? "bg-[#FFA500]"
                    : "bg-[#8BC48A]"
                }`}
            />

            {/* --------------------- particular task card without drag & drop features-------------------- */}
            {/* <div className='flex flex-col gap-4'>
                {tasks?.length>0 ? tasks?.map(task => (
                    <TaskCard
                        key={task.id}
                        taskID = {task.id}
                        title={task.title}
                        description={task.description}
                        priority={task.priority}
                        comments={task.comments}
                        files={task.files}
                        status={status}
                    />
                )) : 
                <p>No task presents</p>}
            </div> */}

            {/* ----------------------particular task card with drag & drop features ----------------- */}
            <div className='flex flex-col gap-4 droptarget'
                onDrop={(e) => {
                    e.preventDefault();
                    const taskID = Number(e.dataTransfer.getData("taskID"));
                    const projectTitle = e.dataTransfer.getData("projectTitle");
                    console.log("third", status)
                    
                    dispatch(updateTaskInProject({ projectTitle, taskID, updatedTaskData: { status } }));
                    dispatch(setTasksByStatus({ projectTitle }));

                }}
                onDragOver={(e) =>
                    e.preventDefault()
                }>
                {tasks?.length > 0 ? tasks.map((task, index) => (
                    <TaskCard
                        taskID={task.id}
                        title={task.title}
                        description={task.description}
                        priority={task.priority}
                        comments={task.comments}
                        files={task.files}
                        status={status}
                    />
                )) :
                    <p>No tasks present</p>}
            </div>

            {isTaskForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <AddTask isOpen={isTaskForm} onClose={() => setIsTaskForm(false)} projectTitle={projectTitle} />
                </div>
            )}
        </section>
    )
}
