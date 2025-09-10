import type { Task } from '../types';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, task: Task) => void;
  getCategoryName: (id: string) => string;
  getCategoryColor: (id: string) => string;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
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
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-white text-xl font-semibold">
          Tasks ({tasks.length})
        </h2>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-slate-400">No tasks found. Add your first task to get started!</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-700">
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
                onDelete={onDelete}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                getCategoryName={getCategoryName}
                getCategoryColor={getCategoryColor}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;