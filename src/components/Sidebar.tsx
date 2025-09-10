import { Plus, Tag, Trash2 } from "lucide-react";
import type { Category } from "../types";

interface SidebarProps {
  categories: Category[];
  filter: string;
  sortBy: string;
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
  onAddTask: () => void;
  onAddCategory: () => void;
  onDeleteCategory: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  filter,
  sortBy,
  onFilterChange,
  onSortChange,
  onAddTask,
  onAddCategory,
  onDeleteCategory
}) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      {/* Quick Actions */}
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <h2 className="text-white text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="space-y-3">
          <button
            onClick={onAddTask}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Plus size={16} />
            Add Task
          </button>
          <button
            onClick={onAddCategory}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Tag size={16} />
            Add Category
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <h3 className="text-white text-lg font-semibold mb-4">Filters</h3>
        <div className="space-y-2">
          <button
            onClick={() => onFilterChange('all')}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              filter === 'all' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            All Tasks
          </button>
          <button
            onClick={() => onFilterChange('pending')}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              filter === 'pending' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => onFilterChange('completed')}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              filter === 'completed' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            Completed
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => onFilterChange(category.id)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center gap-2 ${
                filter === category.id ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <span className={`w-3 h-3 rounded-full ${category.color}`}></span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <h3 className="text-white text-lg font-semibold mb-4">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="deadline">Deadline</option>
          <option value="urgency">Urgency</option>
          <option value="created">Recently Added</option>
        </select>
      </div>

      {/* Categories Management */}
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <h3 className="text-white text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${category.color}`}></span>
                <span className="text-slate-300 text-sm">{category.name}</span>
              </div>
              <button
                onClick={() => onDeleteCategory(category.id)}
                className="text-slate-400 hover:text-red-400 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar