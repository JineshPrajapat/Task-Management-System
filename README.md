# Project & Task Management Platform

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Assumptions](#assumptions)
4. [Redux State Management](#redux-state-management)
5. [Installation and Setup](#installation-and-setup)
6. [How to Use the Platform](#how-to-Use-the-Platform)
7. [Contact](#contact)

---

## Overview

The **Project & Task Management Platform** is designed to help users efficiently manage their tasks and projects. This platform allows users to create projects, organize tasks within each project, and manage those tasks through their various stages. It is perfect for personal task management, small team collaboration, and tracking progress across different activities.

The platform is built with **React.js** for the frontend, styled with **Tailwind CSS**, and utilizes **Redux** for state management to ensure smooth handling of data and user actions. The platform also integrates **localStorage** to persist data, so users' progress is saved across sessions.

---

## Features

- **Project Management**:
  - Users can create multiple projects with unique titles and descriptions.
  - Projects can be deleted once completed or no longer needed.

- **Task Management**:
  - Tasks are associated with specific projects. 
  - Users can:
    - Add tasks with details like title, description, due date, priority (Low, Medium, High), and status (To Do, In Progress, Done).
    - Update task information, change the priority or status, and delete tasks if needed.

- **Priority Management**:
  - Each task can have a priority level (Low, Medium, High) that helps users focus on important tasks first.
  - Task UI dynamically changes based on priority to make it easier to visually identify critical tasks.

- **Status Updates**:
  - Tasks can be moved between statuses: "To Do," "In Progress," and "Done."
  - Status updates allow users to track the current state of each task.

- **Dynamic Filtering**:
  - Tasks can be filtered by their status, helping users view only the tasks relevant to their current focus.

- **Data Persistence**:
  - Data is stored locally using **localStorage**, ensuring that project and task information remains saved even if the page is refreshed or closed.

---

## Assumptions

1. **Task-Project Relationship**:
   - All tasks are associated with projects. Therefore, users must create a project before they can add tasks.

2. **Unique Identifiers**:
   - Each project and task is assigned a unique identifier (generated from the timestamp at the time of creation).

3. **Default Values**:
   - New tasks are created with default values for status (`To Do`) and priority (`Low`), which can be changed later.

4. **Persistent Data**:
   - All user data (projects and tasks) are stored in localStorage for persistence across browser sessions.

---

## Redux State Management

The platform uses **Redux Toolkit** to manage state efficiently, particularly for handling project and task operations. The key operations managed through Redux include:

- Adding, updating, and deleting projects.
- Adding, updating, and deleting tasks within specific projects.
- Modifying task priorities and statuses dynamically.
- Filtering tasks by their status within each project.

### Explanation of Key Reducers:

- **setAllProjects**: Sets the entire projects list, typically used during initialization when data is fetched from localStorage.
- **addProject**: Adds a new project to the state and updates localStorage.
- **deleteProject**: Deletes a project from the state based on its unique ID and updates localStorage.
- **addTaskToProject**: Adds a task to a specific project by matching the project’s title.
- **updateTaskInProject**: Updates an existing task within a project based on the task ID.
- **deleteTaskFromProject**: Removes a task from a specific project.
- **setTasksByStatus**: Filters tasks in a project based on their status (e.g., To Do, In Progress, Done).

Redux allows for a structured and maintainable approach to state management, ensuring that project and task data is stored and updated efficiently across the application. Additionally, the use of **localStorage** ensures persistence of data between sessions.


**LocalStorage** integration ensures that the state is stored persistently, so user data remains even if they refresh the page or close the browser.

---

## Installation and Setup

Follow these steps to install and run the platform locally:

1. **Clone the Repository**:
   Clone the project repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/project-task-manager.git
   
2. **Install Dependencies:**
 
   ```bash
    cd frontend
    npm install

3. **Run the Application::**
   
   ```bash
   # Start the frontend
   cd frontend
   npm start

---

## How to Use the Platform

### Step 1: Create a Project
- Navigate to the Home page and click on the "Add Project" button.
- Fill in the project title and description, then click **Submit**.
- Your project will now appear on the dashboard, where you can view and manage it.

### Step 2: Manage Tasks within a Project
- Once a project is created, you can start adding tasks to it.
- Navigate to the specific project and click the **Add Task** button.
- Enter the task details, including:
  - Task Title
  - Description
  - Priority (Low, Medium, High)
  - Status (To Do, In Progress, Done)
  - Due Date
- Once tasks are added, you will see them listed under the corresponding project. You can also update or delete tasks as needed.

### Step 3: Modify Task Status & Priority
- Each task card displays its current status and priority.
- To update the status (e.g., **To Do**, **In Progress**, **Done**) or change the priority (Low, Medium, High), use the dropdown menu available within each task card.
- The task list will dynamically update based on your selections, making it easier to track progress and prioritize work.

This workflow ensures that users can efficiently create and manage multiple projects and tasks, with easy updates and real-time task prioritization.

---

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this software in accordance with the license terms.

## Contact

For any questions, suggestions, or issues, feel free to reach out to the project maintainer at [prajapatjinesh585@gmail.com](mailto:prajapatjinesh585@gmail.com).

