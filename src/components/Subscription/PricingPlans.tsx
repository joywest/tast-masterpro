import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { stripePromise } from '../../lib/stripe';
import { Check } from 'lucide-react';

export default function PricingPlans() {
  const user = useAuthStore(state => state.user);
  const updateSubscription = useAuthStore(state => state.updateSubscription);

  const handleSubscribe = async () => {
    const stripe = await stripePromise;
    if (!stripe || !user) return;

    // In a real app, you would create a checkout session on your backend
    // and redirect to Stripe Checkout
    try {
      await updateSubscription('premium');
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="sm:flex sm:flex-col sm:align-center">
        <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
          Plans tarifaires
        </h1>
        <p className="mt-5 text-xl text-gray-500 sm:text-center">
          Choisissez le plan qui vous convient
        </p>
      </div>

      <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
        {/* Plan Gratuit */}
        <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900">Gratuit</h2>
            <p className="mt-4 text-gray-500">Parfait pour commencer</p>
            <p className="mt-8">
              <span className="text-4xl font-extrabold text-gray-900">0€</span>
              <span className="text-base font-medium text-gray-500">/mois</span>
            </p>
            <button
              className="mt-8 block w-full bg-blue-50 text-blue-700 border border-blue-100 rounded-md py-2 font-semibold hover:bg-blue-100 transition-colors"
              disabled={user?.subscriptionTier === 'free'}
            >
              Plan actuel
            </button>
          </div>
          <div className="pt-6 pb-8 px-6">
            <h3 className="text-xs font-semibold text-gray-900 tracking-wide uppercase">
              Fonctionnalités incluses
            </h3>
            <ul className="mt-6 space-y-4">
              <li className="flex space-x-3">
                <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                <span className="text-base text-gray-500">Jusqu'à 50 tâches</span>
              </li>
              <li className="flex space-x-3">
                <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                <span className="text-base text-gray-500">Jusqu'à 10 notes</span>
              </li>
              <li className="flex space-x-3">
                <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                <span className="text-base text-gray-500">Fonctionnalités de base</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Plan Premium */}
        <div className="border border-blue-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-blue-50">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900">Premium</h2>
            <p className="mt-4 text-gray-500">Pour les utilisateurs avancés</p>
            <p className="mt-8">
              <span className="text-4xl font-extrabold text-gray-900">9.99€</span>
              <span className="text-base font-medium text-gray-500">/mois</span>
            </p>
            <button
              onClick={handleSubscribe}
              className="mt-8 block w-full bg-blue-600 text-white rounded-md py-2 font-semibold hover:bg-blue-700 transition-colors"
              disabled={user?.subscriptionTier === 'premium'}
            >
              {user?.subscriptionTier === 'premium' ? 'Plan actuel' : 'Passer au Premium'}
            </button>
          </div>
          <div className="pt-6 pb-8 px-6">
            <h3 className="text-xs font-semibold text-gray-900 tracking-wide uppercase">
              Fonctionnalités incluses
            </h3>
            <ul className="mt-6 space-y-4">
              <li className="flex space-x-3">
                <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                <span className="text-base text-gray-500">Tâches illimitées</span>
              </li>
              <li className="flex space-x-3">
                <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                <span className="text-base text-gray-500">Notes illimitées</span>
              </li>
              <li className="flex space-x-3">
                <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                <span className="text-base text-gray-500">Pièces jointes</span>
              </li>
              <li className="flex space-x-3">
                <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                <span className="text-base text-gray-500">Collaboration</span>
              </li>
              <li className="flex space-x-3">
                <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                <span className="text-base text-gray-500">Support prioritaire</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}