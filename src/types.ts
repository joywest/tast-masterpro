export type Priority = 'low' | 'medium' | 'high';

export type Category = 'personnel' | 'travail' | 'courses' | 'santé' | 'autre';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  category: Category;
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}