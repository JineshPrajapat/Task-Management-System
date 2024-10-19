import React, { useState, useEffect, useRef } from 'react';
import { InputField } from '../InputField';
import { TextArea } from '../TextArea';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '../../Reducer/Slice/ProjectSlice';
import useClickOutside from '../../hooks/useClickOutside';

export const CreateProject = ({ isOpen, onClose }) => {
    const projects = useSelector((state)=> state.project.projects);
    const dispatch = useDispatch();
    const [formValue, setFormValue] = useState({
        title: '',
        description: '',
        creationDate: new Date().toISOString().split('T')[0],
        tasks:[]
    });

    const modalRef = useRef(null);
    useClickOutside(modalRef, isOpen, onClose);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // added id to projects before adding to local storage
        const newProject = {
            id: projects.length + 1,
            ...formValue
        }
        dispatch(addProject(newProject))
        onClose();
        setFormValue({ 
            title: '', 
            description: '', 
            creationDate: '' });
    };

    return (
        <div ref={modalRef} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold mb-4">Create a New Project</h2>
                <InputField
                    id="title"
                    name="title"
                    value={formValue.title}
                    onChange={handleChange}
                    label="Project Title"
                    placeholder="Enter project title"
                    required
                />
                <TextArea
                    id="description"
                    name="description"
                    value={formValue.description}
                    onChange={handleChange}
                    label="Project Description"
                    placeholder="Enter project description"
                    required
                />
                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                        Add Project
                    </button>
                    <button onClick={onClose} className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};
