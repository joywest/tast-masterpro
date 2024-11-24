import React from 'react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import type { Task } from '../types';

interface TaskListProps {
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const categoryColors = {
  personnel: 'bg-purple-100 text-purple-800',
  travail: 'bg-blue-100 text-blue-800',
  courses: 'bg-orange-100 text-orange-800',
  santé: 'bg-teal-100 text-teal-800',
  autre: 'bg-gray-100 text-gray-800',
};

export default function TaskList({ onToggleTask, onDeleteTask }: TaskListProps) {
  const tasks = useTaskStore(state => state.tasks);

  const formatDate = (date: Date | string) => {
    try {
      const dateValue = typeof date === 'string' ? parseISO(date) : date;
      return format(dateValue, 'dd MMMM yyyy', { locale: fr });
    } catch (error) {
      return 'Date invalide';
    }
  };

  return (
    <div className="space-y-4">
      {tasks?.map((task) => (
        <div
          key={task.id}
          className={`bg-white rounded-lg shadow-md p-4 transition-all ${
            task.completed ? 'opacity-75' : ''
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <button
              onClick={() => onToggleTask(task.id)}
              className="mt-1 text-gray-500 hover:text-blue-600 transition-colors"
            >
              {task.completed ? (
                <CheckCircle2 className="text-green-500" size={24} />
              ) : (
                <Circle size={24} />
              )}
            </button>

            <div className="flex-1">
              <h3
                className={`text-lg font-semibold ${
                  task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                }`}
              >
                {task.title}
              </h3>
              
              <p className="text-gray-600 mt-1">{task.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    priorityColors[task.priority]
                  }`}
                >
                  {task.priority === 'low' && 'Basse priorité'}
                  {task.priority === 'medium' && 'Priorité moyenne'}
                  {task.priority === 'high' && 'Haute priorité'}
                </span>

                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    categoryColors[task.category]
                  }`}
                >
                  {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                </span>

                <span className="px-2 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  Échéance: {formatDate(task.dueDate)}
                </span>
              </div>
            </div>

            <button
              onClick={() => onDeleteTask(task.id)}
              className="text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}

      {(!tasks || tasks.length === 0) && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">Aucune tâche pour le moment</p>
          <p className="text-sm mt-2">Ajoutez votre première tâche en utilisant le formulaire ci-dessus</p>
        </div>
      )}
    </div>
  );
}