import type { Category } from "../types";

export const defaultCategories: Category[] = [
  { id: '1', name: 'Assignments', color: 'bg-blue-500' },
  { id: '2', name: 'Exams', color: 'bg-red-500' },
  { id: '3', name: 'Projects', color: 'bg-green-500' },
  { id: '4', name: 'Reading', color: 'bg-purple-500' },
  { id: '5', name: 'Personal', color: 'bg-yellow-500' }
];

export const urgencyColors = {
  low: 'border-l-4 border-l-green-400',
  medium: 'border-l-4 border-l-yellow-400',
  high: 'border-l-4 border-l-orange-400',
  critical: 'border-l-4 border-l-red-400'
};

export const urgencyBadges = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800', 
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800'
};

export const colors = [
  'bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-purple-500', 
  'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
];