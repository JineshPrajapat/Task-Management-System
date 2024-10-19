import { createSlice } from "@reduxjs/toolkit";

// get projects from local storage
const getProjects = () => {
    const storedProjects = localStorage.getItem("projects");
    return storedProjects ? JSON.parse(storedProjects) : []
}

// storing projects in local storage
const setProjects = (projects) => {
    localStorage.setItem('projects', JSON.stringify(projects));
}

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projects: getProjects(),
        currentProject: null,
        tasks: {
            todo: [],
            onProgress: [],
            done: []
        }
    },
    reducers: {
        setAllProject(state, action) {
            state.projects = action.payload;
            setProjects(action.payload)                                     //save to local storage
        },
        addProject(state, action) {
            const updatedProjects = [...state.projects, action.payload];
            state.projects = updatedProjects;
            setProjects(updatedProjects)                                   //save to local storage
        },
        deleteProject(state, action) {
            const updatedProjects = state.projects.filter(
                (project) => project.id !== action.payload
            );

            state.projects = updatedProjects;
            setProjects(updatedProjects);
        },

        setCurrentProject(state, action) {
            const { projectTitle } = action.payload;
            state.currentProject = state.projects.find((project) => project.title === projectTitle) || null;
        },

        
        // handling task for particular projects

        addTaskToProject(state, action) {
            const { projectTitle, task } = action.payload;
            state.projects = state.projects.map((project) => {
                if (project.title === projectTitle) {
                    return { ...project, tasks: [...project.tasks, task] };
                }

                return project;
            });
            setProjects(state.projects);
        },

        deleteTaskFromProject(state, action) {
            const { projectTitle, taskID } = action.payload;
            state.projects = state.projects.map((project) => {
                if (project.title === projectTitle) {
                    return { ...project, tasks: project.tasks.filter((task) => task.id !== taskID) }
                }
                return project;
            })
            setProjects(state.projects);
        },

        updateTaskInProject(state, action) {
            const { projectTitle, taskID, updatedTaskData } = action.payload;
            state.projects = state.projects.map((project) => {
                if (project.title === projectTitle) {
                    return {
                        ...project,
                        tasks: project.tasks.map((task) =>
                            task.id === taskID ? { ...task, ...updatedTaskData } : task
                        )
                    };
                }
                return project;
            });
            setProjects(state.projects);
        },
        
        setTasksByStatus(state, action) {
            const { projectTitle } = action.payload;
            const project = state.projects.find(project => project.title === projectTitle);

            if (project) {
                state.tasks.todo = project.tasks.filter(task => task.status === 'To Do')
                state.tasks.onProgress = project.tasks.filter(task => task.status === 'On Progress')
                state.tasks.done = project.tasks.filter(task => task.status === 'Done')
            }
            else {
                state.tasks.todo = [];
                state.tasks.onProgress = [];
                state.tasks.done = [];
            }
        },
    }
});

export const { setAllProject, addProject, deleteProject, setCurrentProject, addTaskToProject, deleteTaskFromProject, updateTaskInProject, setTasksByStatus } = projectSlice.actions;
export default projectSlice.reducer;
