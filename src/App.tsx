import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useTaskStore } from './store/taskStore';
import { useNoteStore } from './store/noteStore';
import Sidebar from './components/Layout/Sidebar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import NoteEditor from './components/Notes/NoteEditor';
import NoteList from './components/Notes/NoteList';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import PricingPlans from './components/Subscription/PricingPlans';
import SettingsPage from './components/Settings/SettingsPage';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore(state => state.user);
  const loading = useAuthStore(state => state.loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function App() {
  const [activeTab, setActiveTab] = React.useState<'tasks' | 'notes'>('tasks');
  const { fetchTasks, addTask, toggleTask, deleteTask } = useTaskStore();
  const { fetchNotes, addNote, deleteNote } = useNoteStore();
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    if (user) {
      fetchTasks();
      fetchNotes();
    }
  }, [user, fetchTasks, fetchNotes]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/pricing"
          element={
            <PrivateRoute>
              <PricingPlans />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <div className="flex min-h-screen bg-gray-50">
                <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
                <main className="flex-1 ml-64 p-8">
                  <SettingsPage />
                </main>
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <div className="flex min-h-screen bg-gray-50">
                <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
                <main className="flex-1 ml-64 p-8">
                  {activeTab === 'tasks' ? (
                    <div className="space-y-8">
                      <TaskForm onAddTask={addTask} />
                      <TaskList
                        onToggleTask={toggleTask}
                        onDeleteTask={deleteTask}
                      />
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <NoteEditor onSaveNote={addNote} />
                      <NoteList onDeleteNote={deleteNote} />
                    </div>
                  )}
                </main>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;