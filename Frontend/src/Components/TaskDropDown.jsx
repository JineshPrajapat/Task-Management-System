import React, {useRef} from 'react';
import useClickOutside from '../hooks/useClickOutside';

export const TaskDropdown = ({ isOpen, onClose, status, priority, onChangeStatus, onChangePriority, onDelete }) => {
    const modalRef = useRef(null);
    useClickOutside(modalRef, isOpen, onClose)

    return (
        <div
        ref={modalRef}
            className="absolute right-0 mt-2 z-50  px-4 rounded-md shadow-lg bg-zinc-50 ring-1 ring-black ring-opacity-5 "
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
        >
            {/* Dropdown for Task Status */}
            <div className="py-1" role="none">
                <label className="block py-2 text-sm text-gray-700">Task Status</label>
                <select
                    value={status}
                    onChange={(e) => onChangeStatus(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                    <option value="To Do">To Do</option>
                    <option value="On Progress">On Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>

            {/* Radio Buttons for Priority */}
            <div className="py-1" role="none">
                <label className="block py-2 text-sm text-gray-700">Priority</label>
                <div className="flex ">
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            name="priority"
                            value="Low"
                            checked={priority === 'Low'}
                            onChange={(e) => onChangePriority(e.target.value)}
                            className="form-radio text-yellow-500"
                        />
                        <span className="ml-2 text-yellow-500">Low</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                        <input
                            type="radio"
                            name="priority"
                            value="Medium"
                            checked={priority === 'Medium'}
                            onChange={(e) => onChangePriority(e.target.value)}
                            className="form-radio text-amber-500"
                        />
                        <span className="ml-2 text-amber-500">Medium</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                        <input
                            type="radio"
                            name="priority"
                            value="High"
                            checked={priority === 'High'}
                            onChange={(e) => onChangePriority(e.target.value)}
                            className="form-radio text-red-500"
                        />
                        <span className="ml-2 text-red-500">High</span>
                    </label>
                </div>
            </div>

            {/* Buttons for Update and Delete */}
            <div className="py-1 border-t border-gray-200 pb-4 pt-2" role="none">
                <button
                    className="block w-full text-left  px-1 py-2 text-sm duration-500 hover:bg-red-700 hover:text-white rounded-md"
                    onClick={onDelete}
                    role="menuitem"
                >
                    Delete Task
                </button>
            </div>
        </div>
    );
};
