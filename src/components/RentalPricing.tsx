import React from 'react';
import { Card, CardContent, CardHeader } from './ui/Card';
import { formatPrice } from '../utils/helpers';

interface PricingTier {
  id: string;
  name: {
    en: string;
    fr: string;
  };
  duration: {
    en: string;
    fr: string;
  };
  price: number;
  isPopular?: boolean;
}

interface RentalPricingProps {
  lang: 'fr';
}

const pricingTiers: PricingTier[] = [
  {
    id: 'tier-30min',
    name: {
      en: '30 Minutes',
      fr: '30 Minutes'
    },
    duration: {
      en: 'Quick ride',
      fr: 'Trajet rapide'
    },
    price: 20,
  },
  {
    id: 'tier-1hour',
    name: {
      en: '1 Hour',
      fr: '1 Heure'
    },
    duration: {
      en: 'Short trip',
      fr: 'Voyage court'
    },
    price: 30,
  },
  {
    id: 'tier-4-8hours',
    name: {
      en: '4-8 Hours',
      fr: '4-8 Heures'
    },
    duration: {
      en: 'Half day',
      fr: 'Demi-journée'
    },
    price: 100,
    isPopular: true,
  },
  {
    id: 'tier-8-12hours',
    name: {
      en: '8-12 Hours',
      fr: '8-12 Heures'
    },
    duration: {
      en: 'Full day',
      fr: 'Journée complète'
    },
    price: 130,
  },
  {
    id: 'tier-24hours',
    name: {
      en: '24 Hours',
      fr: '24 Heures'
    },
    duration: {
      en: 'Day & night',
      fr: 'Jour et nuit'
    },
    price: 160,
  },
  {
    id: 'tier-weekly',
    name: {
      en: 'Weekly',
      fr: 'Hebdomadaire'
    },
    duration: {
      en: '7 days',
      fr: '7 jours'
    },
    price: 600,
  },
  {
    id: 'tier-monthly',
    name: {
      en: 'Monthly',
      fr: 'Mensuel'
    },
    duration: {
      en: '30 days',
      fr: '30 jours'
    },
    price: 1400,
  },
];

const RentalPricing: React.FC<RentalPricingProps> = ({ lang }) => {
  const isRtl = lang === 'fr';
  
  return (
    <div dir={isRtl ? 'rtl' : 'ltr'}>
      <h2 className="text-2xl font-bold text-center mb-8">
        {'Tarification de location'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {pricingTiers.map((tier) => (
          <Card 
            key={tier.id}
            className={`relative ${
              tier.isPopular ? 'border-2 border-green-500 shadow-lg' : ''
            }`}
          >
            {tier.isPopular && (
              <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {'Populaire'}
              </div>
            )}
            
            <CardHeader>
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-bold">{tier.name[lang]}</h3>
              </div>
              <p className="text-gray-500">{tier.duration[lang]}</p>
            </CardHeader>
            
            <CardContent>
              <div className="mb-6">
                <span className="text-3xl font-bold">{formatPrice(tier.price)}</span>
              </div>
              
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span>
                    {  'Équipement de sécurité inclus'}
                  </span>
                </li>
                <li className="flex items-center">
                  <span>
                    {'Assurance de base'}
                  </span>
                </li>
                {(tier.id === 'tier-4-8hours' || tier.id === 'tier-8-12hours' || tier.id === 'tier-24hours' || tier.id === 'tier-weekly' || tier.id === 'tier-monthly') && (
                  <li className="flex items-center">
                    <span>
                      { 'Livraison gratuite à Nador'}
                    </span>
                  </li>
                )}
                {(tier.id === 'tier-weekly' || tier.id === 'tier-monthly') && (
                  <li className="flex items-center">
                    <span>
                      { 'Chargeur inclus'}
                    </span>
                  </li>
                )}
                {tier.id === 'tier-monthly' && (
                  <li className="flex items-center">
                    <span>
                      {'Assurance premium'}
                    </span>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-bold text-green-800 mb-2">
          {'Réduction étudiante'}
        </h3>
        <p>
          {'Les étudiants bénéficient de 10% de réduction sur tous les plans de location. Présentez simplement votre carte d\'étudiant valide lors de la récupération de votre scooter.'}
        </p>
      </div>
      
      <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <p className="text-center text-gray-700 font-medium">
          {'Livraison et ramassage gratuits disponibles dans toute la ville de Nador pour les locations de plus de 4 heures'}
        </p>
      </div>
    </div>
  );
};

export default RentalPricing;