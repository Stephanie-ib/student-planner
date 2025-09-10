import { useState, useEffect } from "react";
import { defaultCategories } from "./constants";
import type { Category, CategoryFormData, Task, TaskFormData } from "./types";
import CategoryForm from "./components/CategoryForm";
import Sidebar from "./components/Sidebar";
import { isOverdue } from "./utils/helpers";
import TaskForm from "./components/TaskForm";
import StatsCard from "./components/StatsCard";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("deadline");

  // Task form state
  const [taskForm, setTaskForm] = useState<TaskFormData>({
    title: "",
    description: "",
    category: "",
    urgency: "medium",
    deadline: "",
  });

  // Category form state
  const [categoryForm, setCategoryForm] = useState<CategoryFormData>({
    name: "",
    color: "bg-blue-500",
  });

  useEffect(() => {
    // Load tasks from localStorage
    const savedTasks = localStorage.getItem("student-planner-tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    // Load categories from localStorage
    const savedCategories = localStorage.getItem("student-planner-categories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  useEffect(() => {
    // Save tasks to localStorage whenever tasks change
    localStorage.setItem("student-planner-tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    // Save categories to localStorage whenever categories change
    localStorage.setItem(
      "student-planner-categories",
      JSON.stringify(categories)
    );
  }, [categories]);

  const resetTaskForm = () => {
    setTaskForm({
      title: "",
      description: "",
      category: "",
      urgency: "medium",
      deadline: "",
    });
  };

  const handleAddTask = (taskData: TaskFormData) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks([...tasks, newTask]);
    resetTaskForm();
    setShowTaskForm(false);
  };

  const handleEditTask = (taskData: TaskFormData) => {
    if (!editingTask) return;

    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id ? { ...task, ...taskData } : task
      )
    );
    setEditingTask(null);
    resetTaskForm();
    setShowTaskForm(false);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      description: task.description,
      category: task.category,
      urgency: task.urgency,
      deadline: task.deadline,
    });
    setShowTaskForm(true);
  };

  const handleAddCategory = (categoryData: CategoryFormData) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      ...categoryData,
    };

    setCategories([...categories, newCategory]);
    setCategoryForm({ name: "", color: "bg-blue-500" });
    setShowCategoryForm(false);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId));
    // Update tasks that use this category
    setTasks(
      tasks.map((task) =>
        task.category === categoryId ? { ...task, category: "" } : task
      )
    );
  };

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetTask: Task) => {
    e.preventDefault();
    if (!draggedTask || draggedTask.id === targetTask.id) return;

    const draggedIndex = tasks.findIndex((t) => t.id === draggedTask.id);
    const targetIndex = tasks.findIndex((t) => t.id === targetTask.id);

    const newTasks = [...tasks];
    newTasks.splice(draggedIndex, 1);
    newTasks.splice(targetIndex, 0, draggedTask);

    setTasks(newTasks);
    setDraggedTask(null);
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Uncategorized";
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.color : "bg-gray-500";
  };

  const getFilteredAndSortedTasks = () => {
    let filteredTasks = tasks;

    if (filter !== "all") {
      if (filter === "completed") {
        filteredTasks = tasks.filter((task) => task.completed);
      } else if (filter === "pending") {
        filteredTasks = tasks.filter((task) => !task.completed);
      } else {
        filteredTasks = tasks.filter((task) => task.category === filter);
      }
    }

    return filteredTasks.sort((a, b) => {
      switch (sortBy) {
        case "deadline":
          return (
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          );
        case "urgency":
          const urgencyOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
        case "created":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        default:
          return 0;
      }
    });
  };

  const filteredTasks = getFilteredAndSortedTasks();

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: "#0f172a" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Student Planner
          </h1>
          <p className="text-slate-400">
            Organize your academic life with style
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard title="Total Tasks" value={tasks.length} />
          <StatsCard
            title="Completed"
            value={tasks.filter((t) => t.completed).length}
            textColor="text-green-400"
          />
          <StatsCard
            title="Pending"
            value={tasks.filter((t) => !t.completed).length}
            textColor="text-yellow-400"
          />
          <StatsCard
            title="Overdue"
            value={
              tasks.filter((t) => !t.completed && isOverdue(t.deadline)).length
            }
            textColor="text-red-400"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Sidebar
            categories={categories}
            filter={filter}
            sortBy={sortBy}
            onFilterChange={setFilter}
            onSortChange={setSortBy}
            onAddTask={() => {
              resetTaskForm();
              setEditingTask(null);
              setShowTaskForm(true);
            }}
            onAddCategory={() => setShowCategoryForm(true)}
            onDeleteCategory={handleDeleteCategory}
          />

          {/* Main Content */}
          <div className="lg:col-span-3">
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={toggleTaskCompletion}
              onEdit={startEditing}
              onDelete={handleDeleteTask}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              getCategoryName={getCategoryName}
              getCategoryColor={getCategoryColor}
            />
          </div>
        </div>

        {/* Task Form Modal */}
        <TaskForm
          isOpen={showTaskForm}
          onClose={() => {
            setShowTaskForm(false);
            setEditingTask(null);
            resetTaskForm();
          }}
          onSubmit={editingTask ? handleEditTask : handleAddTask}
          editingTask={editingTask}
          categories={categories}
          formData={taskForm}
          onFormChange={setTaskForm}
        />

        {/* Category Form Modal */}
        <CategoryForm
          isOpen={showCategoryForm}
          onClose={() => {
            setShowCategoryForm(false);
            setCategoryForm({ name: "", color: "bg-blue-500" });
          }}
          onSubmit={handleAddCategory}
          formData={categoryForm}
          onFormChange={setCategoryForm}
        />
      </div>
    </div>
  );
};

export default App;
