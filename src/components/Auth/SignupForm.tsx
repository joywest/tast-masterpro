import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, CheckSquare, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const signUp = useAuthStore(state => state.signUp);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate('/');
    } catch (err) {
      setError('Erreur lors de la création du compte');
    }
  };

  return (
    <div className="min-h-screen auth-background">
      <div className="auth-content min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <CheckSquare className="h-12 w-12 text-indigo-600" />
            </div>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900">
              TaskMaster Pro
            </h1>
            <h2 className="mt-2 text-xl text-gray-600">
              Rejoignez-nous pour mieux organiser votre quotidien
            </h2>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Adresse email"
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Mot de passe"
                  minLength={6}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <UserPlus className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                </span>
                S'inscrire
              </button>
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Déjà un compte ?
              </Link>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Retour
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}