import React, { useState, useMemo } from 'react'
import { images } from '../constants';
import { IoIosArrowDown } from "react-icons/io";
import { LuFilter } from "react-icons/lu";
import { TaskContainer } from '../Components/TaskContainer';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { updateTaskInProject } from '../Reducer/Slice/ProjectSlice';
import DateInputComponent from '../Components/DateInputComponent';

export const Project = ({ project }) => {
    const tasks = useSelector((state) => state.project.tasks);
    const dispatch = useDispatch()
    console.log("tasks", tasks);

    const [selectedPriority, setSelectedPriority] = useState('All');
    const [selectedDate, setSelectedDate] = useState(null);

    const handlePriorityChange = (e) => {
        setSelectedPriority(e.target.value);
    };

    const handleDateChange = (date) => {
        console.log("Type of date:", typeof date);
        
        // If date is a string type
        if (typeof date === 'string') {
            const dateObj = new Date(date); 
            const formattedDate = dateObj.toISOString().split('T')[0];          // 'YYYY-MM-DD'            
            setSelectedDate(formattedDate); 
            
        } else if (date instanceof Date) {
            const formattedDate = date.toISOString().split('T')[0];
            setSelectedDate(formattedDate); 
        }
        else {
            setSelectedDate(null);
            console.log("object date", date)
            console.error("Date is not a valid string:", date);
        }
    };

    const onDragEnd = (result) => {
        console.log("result", result);
        if (!result.destination) return; // Dropped outside the list

        const { source, destination } = result;

        // If the task is dropped in the same position
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        try {
            // Create a deep copy of the tasks object
            const updatedTasks = { ...tasks };

            // Get the source and destination task lists
            const sourceTasks = updatedTasks[source.droppableId];
            console.log("sourceTasks", sourceTasks);

            // Check if sourceTasks exist and perform the operation
            if (!sourceTasks || source.index < 0 || source.index >= sourceTasks.length) {
                throw new Error("Invalid source index or tasks not found.");
            }

            const [movedTask] = sourceTasks.splice(source.index, 1); // Remove the task from source
            console.log("movedTask", movedTask);

            // Get or initialize the destination list
            const destinationTasks = updatedTasks[destination.droppableId] || [];

            // Check if destination index is valid
            if (destination.index < 0 || destination.index > destinationTasks.length) {
                throw new Error("Invalid destination index.");
            }

            // Add the task to the destination list
            destinationTasks.splice(destination.index, 0, movedTask);

            // Update the tasks object
            updatedTasks[destination.droppableId] = destinationTasks;

            // Dispatch action to update tasks in the Redux store
            dispatch(updateTaskInProject({ projectTitle: project.title, updatedTasks }));

        } catch (error) {
            console.error("Error during drag-and-drop operation:", error);
            // Optionally display an error message to the user or log it to an error tracking service
        }
    };

    const filteredTasks = useMemo(() => {
        let filtered = tasks;

        // Filter by priority
        if (selectedPriority !== 'All') {
            filtered = {
                todo: filtered.todo.filter(task => task.priority === selectedPriority),
                onProgress: filtered.onProgress.filter(task => task.priority === selectedPriority),
                done: filtered.done.filter(task => task.priority === selectedPriority),
            };
        }

        // Filter by date if selectedDate is set
        if (selectedDate) {
            const date = new Date(selectedDate).toDateString();

            filtered = {
                todo: filtered.todo.filter(task => new Date(task.dueDate).toDateString() === date),
                onProgress: filtered.onProgress.filter(task => new Date(task.dueDate).toDateString() === date),
                done: filtered.done.filter(task => new Date(task.dueDate).toDateString() === date),
            };
        }

        return filtered;
    }, [tasks, selectedPriority, selectedDate]);

    return (
        <div className='flex flex-col '>
            <div className='flex flex-row justify-between items-center py-8'>
                {/* left filter section */}
                <div className=' flex flex-row gap-2'>
                    {/* filter on basis of priority */}
                    <div className='relative flex items-center border border-grey rounded-md text-grey font-medium'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
                            <LuFilter className='text-gray-500' />
                        </div>
                        <select
                            value={selectedPriority}
                            onChange={handlePriorityChange}
                            className='block appearance-none min-w-max bg-white rounded-md py-2 pl-12 pr-10 text-gray-700 focus:outline-none transition duration-200 ease-in-out'
                        >
                            <option value="All" className='text-gray-500'>Filter</option>
                            <option value="Low" className='text-gray-700'>Low</option>
                            <option value="Medium" className='text-gray-700'>Medium</option>
                            <option value="High" className='text-gray-700'>High</option>
                        </select>
                        <div className='absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none'>
                            <IoIosArrowDown className='text-gray-500' />
                        </div>
                    </div>

                    {/* filter on due date basis */}
                    <DateInputComponent selectedDate={selectedDate} handleDateChange={handleDateChange} />
                </div>

                {/* right option section */}
                <div className='flex gap-2 items-center'>
                    <div className='flex gap-2 py-2 px-4 items-center text-base border border-grey rounded-md text-grey'>
                        <img src={images.profileUser} />
                        <span className='whitespace-nowrap font-medium'>Share</span>
                    </div>
                    <hr className='w-7 h-0 transform rotate-90 m-0 border-grey ' />

                    <div className='w-10 h-10'>
                        <img src={images.equalTo} alt="" />
                    </div>

                    <div className='pl-2'>
                        <img src={images.menu} alt="" />
                    </div>

                </div>
            </div>

            {/* -------------below code commented is to without drag & drop feature-------------- */}

            {/* <section className='grid grid-cols-3 gap-4'>
                <TaskContainer status={"To Do"} tasks={filteredTasks?.todo} />
                <TaskContainer status={"On Progress"} tasks={filteredTasks?.onProgress} />
                <TaskContainer status={"Done"} tasks={filteredTasks?.done} />
            </section> */}

            {/* -------------below code with drag & drop feature-------------- */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="all-tasks" direction="horizontal">
                    {(provided) => (
                        <section
                            className='grid grid-cols-3 gap-4'
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {["To Do", "On Progress", "Done"].map((status, index) => (
                                <Droppable key={status} droppableId={status}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            <TaskContainer
                                                status={status}
                                                tasks={filteredTasks[status === "To Do" ? "todo" : status === "On Progress" ? "onProgress" : "done"]}
                                            />
                                            {provided.placeholder}          {/* Needed for drag and drop */}
                                        </div>
                                    )}
                                </Droppable>
                            ))}
                        </section>
                    )}
                </Droppable>
            </DragDropContext>

        </div>
    )
}
