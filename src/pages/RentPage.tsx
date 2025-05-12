import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import RentalPricing from '../components/RentalPricing';
import ScooterCard from '../components/ScooterCard'; // Import ScooterCard for displaying scooters
import { useAuth } from '../contexts/AuthContext';
import { useLang } from '../contexts/LangContext';

const RentPage: React.FC = () => {
  const { isLoggedIn, user } = useAuth();
  const { lang, t } = useLang();
  const isRtl = false;

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    return <Navigate to="/auth" state={{ from: { pathname: '/rent' } }} />;
  }

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    age: user?.age?.toString() || '',
    scooterId: '', // Add scooterId for selected scooter
    rentalDate: '',
    rentalTime: '',
    returnDate: '',
    returnTime: '',
    location: '',
    isDelivery: false,
    deliveryAddress: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [scooters, setScooters] = useState<any[]>([]); // State to store available scooters

  // Fetch available scooters
  useEffect(() => {
    const fetchScooters = async () => {
      try {
        const response = await fetch('/api/scooters'); // Replace with your API endpoint
        const data = await response.json();
        setScooters(data);
      } catch (error) {
        console.error('Failed to fetch scooters:', error);
      }
    };

    fetchScooters();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t('Le nom complet est requis');
    }

    if (!formData.age.trim()) {
      newErrors.age = t('L\'âge est requis');
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 16) {
      newErrors.age = t('Vous devez avoir au moins 16 ans');
    }

    if (!formData.scooterId.trim()) {
      newErrors.scooterId = t('Veuillez sélectionner un scooter');
    }

    if (!formData.rentalDate.trim()) {
      newErrors.rentalDate = t('La date de location est requise');
    }

    if (!formData.rentalTime.trim()) {
      newErrors.rentalTime = t('L\'heure de location est requise');
    }

    if (!formData.returnDate.trim()) {
      newErrors.returnDate = t('La date de retour est requise');
    }

    if (!formData.returnTime.trim()) {
      newErrors.returnTime = t('L\'heure de retour est requise');
    }

    if (!formData.location.trim()) {
      newErrors.location = t('Le lieu de ramassage est requis');
    }

    if (formData.isDelivery && !formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = t('L\'adresse de livraison est requise');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form after success
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="container mx-auto px-4" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {isSuccess ? (
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('Réservation confirmée!')}
              </h2>
              <p className="text-gray-600 mb-6">
                {t('Votre location de scooter a été réservée avec succès.')}
              </p>
              <Button variant="primary" onClick={() => (window.location.href = '/')}>
                {t('Retour à l\'accueil')}
              </Button>
            </div>
          ) : (
            <>
              <div className="bg-green-500 p-6 text-white">
                <h1 className="text-2xl font-bold">{t('Louer un scooter')}</h1>
                <p className="mt-2">{t('Sélectionnez un scooter et remplissez le formulaire.')}</p>
              </div>

              <div className="p-6">
                <div className="mb-8">
                  <RentalPricing lang={lang} />
                </div>

                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-4">{t('Scooters disponibles')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scooters.map(scooter => (
                      <div
                        key={scooter.id}
                        className={`border rounded-md p-4 cursor-pointer ${
                          formData.scooterId === scooter.id ? 'border-green-500' : 'border-gray-300'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, scooterId: scooter.id }))}
                      >
                        <ScooterCard {...scooter} actionType="rent" lang={lang} />
                      </div>
                    ))}
                  </div>
                  {errors.scooterId && <p className="text-sm text-red-500 mt-1">{errors.scooterId}</p>}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-bold text-lg mb-4">{t('Informations personnelles')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('Nom complet')}
                        </label>
                        <Input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          error={errors.fullName}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('Âge')}
                        </label>
                        <Input
                          type="number"
                          name="age"
                          min="16"
                          value={formData.age}
                          onChange={handleChange}
                          error={errors.age}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rental Details */}
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-bold text-lg mb-4">{t('Détails de la location')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('Date de location')}
                        </label>
                        <Input
                          type="date"
                          name="rentalDate"
                          min={today}
                          value={formData.rentalDate}
                          onChange={handleChange}
                          error={errors.rentalDate}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('Heure de location')}
                        </label>
                        <Input
                          type="time"
                          name="rentalTime"
                          value={formData.rentalTime}
                          onChange={handleChange}
                          error={errors.rentalTime}
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? t('Traitement en cours...') : t('Réservez maintenant')}
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentPage;