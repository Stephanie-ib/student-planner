
# Student Planner App

A **modern, responsive task management web application** built with **React**, **TypeScript**, and **Tailwind CSS**, designed to help students organize their academic life with ease.

## Features

* **Task Management:** Add, edit, delete, and mark tasks as completed.
* **Task Categorization:** Assign tasks to custom categories with color coding.
* **Urgency & Deadlines:** Set urgency levels (low, medium, high, critical) and deadlines with visual indicators.
* **Drag-and-Drop:** Reorder tasks easily with drag-and-drop functionality.
* **Filtering & Sorting:** Filter tasks by category, completion status, or show all tasks. Sort tasks by deadline, urgency, or recently added.
* **Statistics Dashboard:** Quick overview of total tasks, completed tasks, pending tasks, and overdue tasks.
* **Responsive Design:** Works seamlessly on desktop and mobile devices.

## Technologies Used

* **React** – Frontend framework
* **TypeScript** – Type safety and better developer experience
* **Tailwind CSS** – Styling and responsive layout
* **Lucide Icons** – Icon library for UI elements

## Project Structure

* `StudentPlannerApp.tsx` – Main component handling tasks, categories, and UI logic.
* `Task` and `Category` interfaces – Define data structures for tasks and categories.
* Components include modals for adding/editing tasks and categories, task list, filters, and stats cards.

## Getting Started

### Prerequisites

* Node.js (v18 or above recommended)
* npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd student-planner-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm start
# or
yarn start
```

4. Open the app in your browser:

```
http://localhost:3000
```

## Usage

* Click **Add Task** to create a new task with title, description, category, urgency, and deadline.
* Click **Add Category** to create custom categories with color coding.
* Use checkboxes to mark tasks as completed.
* Drag tasks to reorder them.
* Use filters and sort options in the sidebar to manage tasks efficiently.

## Future Improvements

* Add **user authentication** for personal task management.
* Integrate **localStorage or database** to persist tasks across sessions.
* Add **notifications/reminders** for upcoming deadlines.
* Include **calendar view** for tasks and deadlines.

## License

This project is **MIT licensed**.
