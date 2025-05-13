import React, { useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import RentalPricing from '../components/RentalPricing';
import { useAuth } from '../contexts/AuthContext';

const RentPage: React.FC = () => {
  const { user } = useAuth();
  const isRtl = false;

  const [formData, setFormData] = useState({
    fullName: user?.nom || '',
    age: user?.age?.toString() || '',
    scooterId: '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));

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
      newErrors.fullName = 'Le nom complet est requis';
    }
    if (!formData.age.trim()) {
      newErrors.age = "L'âge est requis";
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 16) {
      newErrors.age = 'Vous devez avoir au moins 16 ans';
    }
    if (!formData.scooterId.trim()) {
      newErrors.scooterId = 'Veuillez sélectionner un scooter';
    }
    if (!formData.rentalDate.trim()) {
      newErrors.rentalDate = 'La date de location est requise';
    }
    if (!formData.rentalTime.trim()) {
      newErrors.rentalTime = "L'heure de location est requise";
    }
    if (!formData.returnDate.trim()) {
      newErrors.returnDate = 'La date de retour est requise';
    }
    if (!formData.returnTime.trim()) {
      newErrors.returnTime = "L'heure de retour est requise";
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Le lieu de ramassage est requis';
    }
    if (formData.isDelivery && !formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = "L'adresse de livraison est requise";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
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
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Réservation confirmée !
              </h2>
              <p className="text-gray-600 mb-6">
                Votre location de scooter a été réservée avec succès.<br />
                Un email de confirmation vous a été envoyé.
              </p>
              <Button variant="primary" onClick={() => (window.location.href = '/')}>
                Retour à l'accueil
              </Button>
            </div>
          ) : (
            <>
              <div className="bg-green-500 p-6 text-white">
                <h1 className="text-2xl font-bold">Louer un scooter</h1>
                <p className="mt-2">Sélectionnez un scooter et remplissez le formulaire.</p>
              </div>

              <div className="p-6">
                <div className="mb-8">
                  <RentalPricing />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-bold text-lg mb-4">Informations personnelles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom complet
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
                          Âge
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
                    <h3 className="font-bold text-lg mb-4">Détails de la location</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Scooter
                        </label>
                        <select
                          name="scooterId"
                          value={formData.scooterId}
                          onChange={handleChange}
                          className={`w-full border rounded px-3 py-2 ${errors.scooterId ? 'border-red-500' : 'border-gray-300'}`}
                        >
                          <option value="">Sélectionnez un scooter</option>
                          <option value="scooter1">Scooter 1</option>
                          <option value="scooter2">Scooter 2</option>
                          <option value="scooter3">Scooter 3</option>
                        </select>
                        {errors.scooterId && <p className="text-red-500 text-xs mt-1">{errors.scooterId}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Lieu de ramassage
                        </label>
                        <Input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          error={errors.location}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date de location
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
                          Heure de location
                        </label>
                        <Input
                          type="time"
                          name="rentalTime"
                          value={formData.rentalTime}
                          onChange={handleChange}
                          error={errors.rentalTime}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date de retour
                        </label>
                        <Input
                          type="date"
                          name="returnDate"
                          min={formData.rentalDate || today}
                          value={formData.returnDate}
                          onChange={handleChange}
                          error={errors.returnDate}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Heure de retour
                        </label>
                        <Input
                          type="time"
                          name="returnTime"
                          value={formData.returnTime}
                          onChange={handleChange}
                          error={errors.returnTime}
                        />
                      </div>
                      <div className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          name="isDelivery"
                          id="isDelivery"
                          checked={formData.isDelivery}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <label htmlFor="isDelivery" className="text-sm font-medium text-gray-700">
                          Livraison à domicile ?
                        </label>
                      </div>
                      {formData.isDelivery && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Adresse de livraison
                          </label>
                          <Input
                            type="text"
                            name="deliveryAddress"
                            value={formData.deliveryAddress}
                            onChange={handleChange}
                            error={errors.deliveryAddress}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Traitement en cours...' : 'Réservez maintenant'}
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