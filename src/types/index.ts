export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  deadline: string;
  completed: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  category: string;
  urgency: Task['urgency'];
  deadline: string;
}

export interface CategoryFormData {
  name: string;
  color: string;
}