import React, { useState } from 'react';
import { Save } from 'lucide-react';
import type { Note } from '../../types';

interface NoteEditorProps {
  onSaveNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
}

export default function NoteEditor({ onSaveNote }: NoteEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSaveNote({
      title,
      content,
    });

    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre de la note"
        className="w-full px-4 py-2 text-lg font-semibold border-b border-gray-200 focus:border-blue-500 focus:outline-none mb-4"
      />
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Contenu de votre note..."
        className="w-full px-4 py-2 h-64 border-0 focus:ring-0 focus:outline-none resize-none"
      />
      
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button
          type="submit"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save size={20} />
          <span>Enregistrer</span>
        </button>
      </div>
    </form>
  );
}