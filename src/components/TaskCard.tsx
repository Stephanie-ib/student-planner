import { urgencyColors, urgencyBadges } from "../constants";
import { GripVertical, Edit3, Trash2, Calendar } from 'lucide-react';
import { formatDate ,isOverdue } from "../utils/helpers";
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, task: Task) => void;
  getCategoryName: (id: string) => string;
  getCategoryColor: (id: string) => string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  getCategoryName,
  getCategoryColor
}) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, task)}
      className={`p-4 hover:bg-slate-700 transition-colors cursor-move ${
        task.completed ? 'opacity-60' : ''
      } ${urgencyColors[task.urgency]}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex items-center gap-2">
          <GripVertical size={16} className="text-slate-500" />
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className={`text-white font-medium ${task.completed ? 'line-through' : ''}`}>
              {task.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${urgencyBadges[task.urgency]}`}>
                {task.urgency}
              </span>
              <button
                onClick={() => onEdit(task)}
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="text-slate-400 hover:text-red-400 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className="text-slate-400 text-sm mb-2">{task.description}</p>
          )}
          
          <div className="flex items-center gap-4 text-sm text-slate-400">
            {task.category && (
              <div className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${getCategoryColor(task.category)}`}></span>
                {getCategoryName(task.category)}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span className={isOverdue(task.deadline) && !task.completed ? 'text-red-400' : ''}>
                {formatDate(task.deadline)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
