import React, { useState } from 'react';
import { CreateProject } from '../Components/Forms/CreateProject';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject } from '../Reducer/Slice/ProjectSlice';
import { NavLink } from 'react-router-dom';

export const MyProjects = () => {
    const projects = useSelector((state) => state.project.projects);
    const dispatch = useDispatch();

    const [isProjectForm, setIsProjectForm] = useState(false);              // handling popup of project form for creation of projects
    const closeProjectForm = () => isProjectForm(false);

    // Function to delete a project by id
    const handleDelete = (id) => {
        dispatch(deleteProject(id))
    };

    return (
        <div>
            {/* Add New Project Button */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => setIsProjectForm(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                >
                    Add New Project
                </button>
            </div>

            {/* Project Table */}
            <div>
                <h2 className="text-xl font-semibold mb-4">All Projects</h2>
                {projects.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-300 rounded-2xl">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b-4">Project Title</th>
                                <th className="px-4 py-2 border-b-4">Description</th>
                                <th className="px-4 py-2 border-b-4">Creation Date</th>
                                <th className="px-4 py-2 border-b-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.id}>
                                    <td className="px-4 py-2 border-b"><NavLink to={`/myProjects/${project?.title}`} className={`hover:bg-gray-200 duration-500 p-2 rounded-lg`} >{project.title}</NavLink></td>
                                    <td className="px-4 py-2 border-b">{project.description}</td>
                                    <td className="px-4 py-2 border-b text-center">{project.creationDate}</td>
                                    <td className="px-4 py-2 border-b flex justify-center">
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No projects have been created yet.</p>
                )}
            </div>

            {/* Form for Adding Project */}
            {isProjectForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <CreateProject isOpen={isProjectForm} onClose={() => setIsProjectForm(false)} />
                </div>
            )}
        </div>
    );
};

