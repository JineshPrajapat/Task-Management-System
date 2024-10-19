import React, { useState } from 'react'
import { images } from '../constants';
import { FaPlus } from "react-icons/fa6";
import { TaskCard } from './TaskCard';
import { AddTask } from './Forms/AddTask';
import { useParams } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

export const TaskContainer = ({ status, tasks }) => {
    const [isTaskForm, setIsTaskForm] = useState(false);                   //handling popup for add task form
    const closeTaskForm = () => setIsTaskForm(false);
    const params = useParams();
    const { projectTitle } = params;
    // console.log("todo tasks", tasks)

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
            <div className='flex flex-col gap-4'>
                {tasks?.length > 0 ? tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <TaskCard
                                    taskID={task.id}
                                    title={task.title}
                                    description={task.description}
                                    priority={task.priority}
                                    comments={task.comments}
                                    files={task.files}
                                    status={status}
                                />
                            </div>
                        )}
                    </Draggable>
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
