import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/Card';
import { formatPrice } from '../utils/helpers';

interface PricingTier {
  id: string;
  name: string;
  duration: string;
  price: number;
  isPopular?: boolean;
}

const standardTiers: PricingTier[] = [
  {
    id: 'standard-30min',
    name: '30 minutes',
    duration: 'Durée minimale de location',
    price: 20,
  },
  {
    id: 'standard-1hour',
    name: '1 heure',
    duration: 'Court',
    price: 30,
  },
  {
    id: 'standard-4-8hours',
    name: '4-8 heures',
    duration: 'Entre 4 et 8 heures',
    price: 100,
    isPopular: true,
  },
  {
    id: 'standard-8-12hours',
    name: '8-12 heures',
    duration: 'Entre 8 et 12 heures',
    price: 130,
  },
  {
    id: 'standard-24hours',
    name: '24 heures',
    duration: 'Journée complète',
    price: 160,
  },
  {
    id: 'standard-weekly',
    name: 'Location hebdomadaire',
    duration: '7 jours',
    price: 600,
  },
  {
    id: 'standard-monthly',
    name: 'Location mensuelle',
    duration: '30 jours',
    price: 1400,
  },
];

const performanceTiers: PricingTier[] = [
  {
    id: 'performance-8-12hours',
    name: '8-12 heures',
    duration: 'Haute performance',
    price: 100,
  },
  {
    id: 'performance-24hours',
    name: '24 heures',
    duration: 'Haute performance',
    price: 130,
  },
  {
    id: 'performance-weekly',
    name: '7 jours',
    duration: 'Haute performance',
    price: 450,
    isPopular: true,
  },
  {
    id: 'performance-monthly',
    name: '30 jours',
    duration: 'Haute performance',
    price: 1200,
  },
];

const Notification: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded shadow-lg flex items-center gap-4 animate-fade-in">
    <span>{message}</span>
    <button
      className="ml-2 text-white font-bold"
      onClick={onClose}
      aria-label="Fermer la notification"
    >
      ×
    </button>
  </div>
);

const RentalPricing: React.FC = () => {
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const handleCardClick = (tier: PricingTier) => {
    setSelectedTierId(tier.id);
    setNotification(`Vous avez sélectionné : ${tier.name}`);
    setTimeout(() => setNotification(null), 2500);
  };

  const renderTiers = (tiers: PricingTier[], label: string) => (
    <div className="mb-10">
      <h3 className="text-xl font-bold mb-4 text-green-700">{label}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tiers.map((tier) => (
          <button
            key={tier.id}
            type="button"
            onClick={() => handleCardClick(tier)}
            className="text-left focus:outline-none"
            style={{ background: 'none', padding: 0, border: 'none' }}
          >
            <Card
              className={`relative transition-transform hover:scale-105 cursor-pointer ${
                tier.isPopular ? 'border-2 border-green-500 shadow-lg' : ''
              } ${
                selectedTierId === tier.id
                  ? 'ring-4 ring-green-400 border-green-600'
                  : ''
              }`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Populaire
                </div>
              )}
              <CardHeader>
                <div className="flex items-center mb-2">
                  <h3 className="text-xl font-bold">{tier.name}</h3>
                </div>
                <p className="text-gray-500">{tier.duration}</p>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-3xl font-bold">{formatPrice(tier.price)}</span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span>Équipement de sécurité inclus</span>
                  </li>
                  <li className="flex items-center">
                    <span>Assurance de base</span>
                  </li>
                  {(tier.id.includes('4-8hours') ||
                    tier.id.includes('8-12hours') ||
                    tier.id.includes('24hours') ||
                    tier.id.includes('weekly') ||
                    tier.id.includes('monthly')) && (
                    <li className="flex items-center">
                      <span>Livraison gratuite à Nador</span>
                    </li>
                  )}
                  {(tier.id.includes('weekly') || tier.id.includes('monthly')) && (
                    <li className="flex items-center">
                      <span>Chargeur inclus</span>
                    </li>
                  )}
                  {tier.id.includes('monthly') && (
                    <li className="flex items-center">
                      <span>Assurance premium</span>
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {notification && (
        <Notification message={notification} onClose={() => setNotification(null)} />
      )}
      <h2 className="text-2xl font-bold text-center mb-8">
        Tarification de location
      </h2>
      {renderTiers(standardTiers, 'Standard')}
      {renderTiers(performanceTiers, 'Performance')}
      <div className="mt-8 bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-bold text-green-800 mb-2">
          Réduction étudiante
        </h3>
        <p>
          Les étudiants bénéficient de 20% de réduction sur tous les plans de location. Présentez simplement votre carte d'étudiant valide lors de la récupération de votre scooter.
        </p>
      </div>
      <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <p className="text-center text-gray-700 font-medium">
          Livraison et ramassage gratuits disponibles dans toute la ville de Nador pour les locations de plus de 4 heures
        </p>
      </div>
    </div>
  );
};

export default RentalPricing;
