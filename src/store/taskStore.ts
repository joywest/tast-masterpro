import { create } from 'zustand';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { db, collections } from '../lib/firebase';
import { useAuthStore } from './authStore';
import type { Task } from '../types';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  toggleTask: (taskId: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ loading: true, error: null });
    try {
      const q = query(
        collection(db, collections.tasks),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const tasks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Task[];
      set({ tasks, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch tasks', loading: false });
    }
  },

  addTask: async (newTask) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ loading: true, error: null });
    try {
      const taskRef = await addDoc(collection(db, collections.tasks), {
        ...newTask,
        userId: user.uid,
        createdAt: new Date(),
        completed: false
      });
      const task = {
        id: taskRef.id,
        ...newTask,
        userId: user.uid,
        createdAt: new Date(),
        completed: false
      };
      set(state => ({
        tasks: [...state.tasks, task],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to add task', loading: false });
    }
  },

  toggleTask: async (taskId) => {
    set({ loading: true, error: null });
    try {
      const task = get().tasks.find(t => t.id === taskId);
      if (!task) return;

      await updateDoc(doc(db, collections.tasks, taskId), {
        completed: !task.completed
      });

      set(state => ({
        tasks: state.tasks.map(t =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update task', loading: false });
    }
  },

  deleteTask: async (taskId) => {
    set({ loading: true, error: null });
    try {
      await deleteDoc(doc(db, collections.tasks, taskId));
      set(state => ({
        tasks: state.tasks.filter(t => t.id !== taskId),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete task', loading: false });
    }
  }
}));