import React, { useState, useRef } from 'react';
import { InputField } from '../InputField';
import { TextArea } from '../TextArea';
import { SelectField } from '../SelectField';
import { useDispatch } from 'react-redux';
import { addTaskToProject, setTasksByStatus } from '../../Reducer/Slice/ProjectSlice';
import useClickOutside from '../../hooks/useClickOutside';

export const AddTask = ({ isOpen, onClose, projectTitle }) => {

    const [formValue, setFormValue] = useState({
        title: '',
        description: '',
        priority: 'Low',
        status: 'To Do',
        dueDate: new Date().toISOString().split('T')[0],
        creationDate: new Date().toISOString().split('T')[0]
    });
    const dispatch = useDispatch();

    const modalRef = useRef(null);
    useClickOutside(modalRef, isOpen, onClose);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            id: new Date().getTime(),  //unique id genreation
            ...formValue,
        };

        dispatch(addTaskToProject({ projectTitle, task: newTask }));
        dispatch(setTasksByStatus({projectTitle}));
        setFormValue({
            title: '',
            description: '',
            priority: 'Low',
            status: 'To Do',
        });

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div ref={modalRef} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold mb-4">Add New Task to {projectTitle}</h2>
                <InputField
                    id="title"
                    name="title"
                    value={formValue.title}
                    onChange={handleChange}
                    label="Task Title"
                    placeholder="Enter task title"
                    required
                />
                <TextArea
                    id="description"
                    name="description"
                    value={formValue.description}
                    onChange={handleChange}
                    label="Task Description"
                    placeholder="Enter task description"
                    required
                />
                <SelectField
                    id="priority"
                    name="priority"
                    value={formValue.priority}
                    onChange={handleChange}
                    label="Priority"
                    options={[
                        { value: 'Low', label: 'Low' },
                        { value: 'Medium', label: 'Medium' },
                        { value: 'High', label: 'High' },
                    ]}
                />
                <InputField
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={formValue.dueDate}
                    onChange={handleChange}
                    label="Due Date"
                    required
                />
                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                        Add Task
                    </button>
                    <button onClick={onClose} className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};
