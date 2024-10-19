import React from 'react';
import { AiOutlineProject, AiFillDelete } from 'react-icons/ai';
import { BsFillCheckCircleFill, BsFillPencilFill } from 'react-icons/bs';
import { FaTasks } from 'react-icons/fa';

const features = [
    {
        icon: <AiOutlineProject className="text-blue-600 text-3xl" />,
        title: "Project Creation",
        description: "Easily create and organize projects to group your tasks effectively.",
    },
    {
        icon: <FaTasks className="text-blue-600 text-3xl" />,
        title: "Task Management",
        description: "Add tasks to your projects with custom priorities and due dates.",
    },
    {
        icon: <BsFillCheckCircleFill className="text-green-500 text-3xl" />,
        title: "Priority Updates",
        description: "Dynamically update task priorities between Low, Medium, and High.",
    },
    {
        icon: <BsFillPencilFill className="text-blue-500 text-3xl" />,
        title: "Task Status Tracking",
        description: "Update task statuses such as 'To Do', 'In Progress', and 'Done'.",
    },
    {
        icon: <AiFillDelete className="text-red-500 text-3xl" />,
        title: "Project Deletion",
        description: "Delete projects when they are no longer needed, keeping your workspace clean.",
    },
    {
        icon: <AiFillDelete className="text-red-500 text-3xl" />,
        title: "Task Deletion",
        description: "Easily delete tasks that are no longer relevant to the project.",
    },
];

const instructions = [
    {
        title: "Create a Project",
        description: "Start creating a project by clicking on My Projects. Projects help in organizing tasks and keeping everything structured."
    },
    {
        title: "Add Tasks",
        description: "After creating a project, you can add tasks, assign them priorities, and set due dates for timely completion."
    },
    {
        title: "Manage Task Priorities",
        description: "Dynamically adjust task priorities (Low, Medium, High) as per urgency."
    },
    {
        title: "Update Task Statuses",
        description: "Track your progress by updating tasks to 'In Progress' or 'Done'."
    },
    {
        title: "Delete Tasks",
        description: "If a task is no longer relevant, remove it to keep your project clean."
    },
    {
        title: "Delete Projects",
        description: "When a project is completed or no longer needed, delete it to keep your workspace clutter-free."
    },
];


export const Home = () => {
    return (
        <div className=" flex flex-col items-center">
            {/* Header Section */}
            <header className="w-full max-w-5xl text-center py-12">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to the Project & Task Management Platform</h1>
                <p className="text-gray-700 text-lg">Efficiently organize your projects and manage tasks with ease.</p>
            </header>

            {/* Features Section */}
            <section className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6 my-8">
                <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                            {feature.icon}
                            <div>
                                <h3 className="text-lg font-medium">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* instruction Section for platform use */}
            <section className="w-full max-w-5xl bg-blue-100 rounded-lg p-6 my-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">How to Use the Platform</h2>
                <ol className="list-decimal pl-5 space-y-4 text-gray-700">
                    {instructions.map((instruction, index) => (
                        <li key={index}>
                            <strong>{instruction.title}:</strong> {instruction.description}
                        </li>
                    ))}
                </ol>
            </section>

            {/* Footer Section */}
            <footer className="w-full max-w-5xl text-center py-6 mt-8">
                <p className="text-gray-600">Ready to boost your productivity? Start managing your projects today!</p>
            </footer>
        </div>
    );
};
