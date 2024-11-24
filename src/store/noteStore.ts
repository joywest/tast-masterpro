import { create } from 'zustand';
import { collection, addDoc, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { db, collections } from '../lib/firebase';
import { useAuthStore } from './authStore';
import type { Note } from '../types';

interface NoteState {
  notes: Note[];
  loading: boolean;
  error: string | null;
  fetchNotes: () => Promise<void>;
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => Promise<void>;
  deleteNote: (noteId: string) => Promise<void>;
}

export const useNoteStore = create<NoteState>((set, get) => ({
  notes: [],
  loading: false,
  error: null,

  fetchNotes: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ loading: true, error: null });
    try {
      const q = query(
        collection(db, collections.notes),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const notes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Note[];
      set({ notes, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch notes', loading: false });
    }
  },

  addNote: async (newNote) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ loading: true, error: null });
    try {
      const noteRef = await addDoc(collection(db, collections.notes), {
        ...newNote,
        userId: user.uid,
        createdAt: new Date()
      });
      const note = {
        id: noteRef.id,
        ...newNote,
        userId: user.uid,
        createdAt: new Date()
      };
      set(state => ({
        notes: [...state.notes, note],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to add note', loading: false });
    }
  },

  deleteNote: async (noteId) => {
    set({ loading: true, error: null });
    try {
      await deleteDoc(doc(db, collections.notes, noteId));
      set(state => ({
        notes: state.notes.filter(n => n.id !== noteId),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete note', loading: false });
    }
  }
}));