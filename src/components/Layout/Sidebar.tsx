import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ListTodo, StickyNote, Settings, ArrowLeft } from 'lucide-react';

interface SidebarProps {
  activeTab: 'tasks' | 'notes';
  onTabChange: (tab: 'tasks' | 'notes') => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 p-4 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-indigo-600">TaskMaster Pro</h1>
        {location.pathname !== '/' && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        )}
      </div>
      
      <nav className="flex-1 space-y-2">
        <button
          onClick={() => onTabChange('tasks')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'tasks'
              ? 'bg-indigo-50 text-indigo-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <ListTodo size={20} />
          <span>Tâches</span>
        </button>

        <button
          onClick={() => onTabChange('notes')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'notes'
              ? 'bg-indigo-50 text-indigo-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <StickyNote size={20} />
          <span>Notes</span>
        </button>

        <button 
          onClick={() => navigate('/settings')}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors mt-4"
        >
          <Settings size={20} />
          <span>Paramètres</span>
        </button>
      </nav>
    </div>
  );
}