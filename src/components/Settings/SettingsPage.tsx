import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Bell, Shield, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function SettingsPage() {
  const user = useAuthStore(state => state.user);
  const signOut = useAuthStore(state => state.signOut);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="space-y-6">
        {/* Profil */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4 mb-4">
            <User className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">Profil</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-gray-900">{user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type d'abonnement</label>
              <p className="mt-1 text-gray-900 capitalize">{user?.subscriptionTier}</p>
              {user?.subscriptionTier === 'free' && (
                <div className="mt-4">
                  <button
                    onClick={() => navigate('/pricing')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Passer à l'abonnement Premium
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4 mb-4">
            <Bell className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Notifications par email</h3>
                <p className="text-sm text-gray-500">Recevoir des rappels pour les tâches à venir</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Sécurité */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">Sécurité</h2>
          </div>
          <button
            onClick={() => {/* TODO: Implémenter le changement de mot de passe */}}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Changer le mot de passe
          </button>
        </div>

        {/* Déconnexion */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Se déconnecter
        </button>
      </div>
    </div>
  );
}