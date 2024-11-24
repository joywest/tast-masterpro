import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Trash2 } from 'lucide-react';
import { useNoteStore } from '../../store/noteStore';
import type { Note } from '../../types';

interface NoteListProps {
  onDeleteNote: (id: string) => void;
}

export default function NoteList({ onDeleteNote }: NoteListProps) {
  const notes = useNoteStore(state => state.notes);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {notes.map((note) => (
        <div key={note.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {format(new Date(note.createdAt), 'dd MMMM yyyy', { locale: fr })}
              </p>
            </div>
            
            <button
              onClick={() => onDeleteNote(note.id)}
              className="text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
          
          <p className="mt-4 text-gray-600 whitespace-pre-wrap">{note.content}</p>
        </div>
      ))}

      {notes.length === 0 && (
        <div className="col-span-2 text-center py-12 text-gray-500">
          <p className="text-lg">Aucune note pour le moment</p>
          <p className="text-sm mt-2">Commencez à écrire votre première note</p>
        </div>
      )}
    </div>
  );
}