import React, { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';

interface ContactFormProps {
  lang: string; // Accept any language code
}

const ContactForm: React.FC<ContactFormProps> = ({ lang }) => {
  // Set RTL only for actual RTL languages
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  const isRtl = rtlLanguages.includes(lang);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email =  'L\'email est invalide';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Le message est requis';
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
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      
      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-lg mx-auto" dir={isRtl ? 'rtl' : 'ltr'}>
      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          </div>
          <h3 className="text-xl font-bold text-green-800 mb-2">
            {'Message envoyé avec succès!'}
          </h3>
          <p className="text-green-700">
            {'Merci de nous avoir contactés. Nous vous répondrons bientôt.'}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="flex items-center mb-2">
              <label className="text-gray-700 font-medium">
                {'Votre nom'}
              </label>
            </div>
            <Input
              type="text"
              name="name"
              placeholder={'Entrez votre nom'}
              value={formState.name}
              onChange={handleChange}
              error={errors.name}
              className="w-full"
            />
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <label className="text-gray-700 font-medium">
                { 'Adresse e-mail'}
              </label>
            </div>
            <Input
              type="email"
              name="email"
              placeholder={ 'Entrez votre email'}
              value={formState.email}
              onChange={handleChange}
              error={errors.email}
              className="w-full"
            />
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <label className="text-gray-700 font-medium">
                { 'Message'}
              </label>
            </div>
            <textarea
              name="message"
              placeholder={'Entrez votre message'}
              value={formState.message}
              onChange={handleChange}
              rows={5}
              className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full ${
                errors.message ? 'border-red-500 focus:ring-red-500' : ''
              }`}
            />
            {errors.message && (
              <p className="text-sm text-red-500 mt-1">{errors.message}</p>
            )}
          </div>
          
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {'Envoi en cours...'}
              </>
            ) : (
              <>
                {'Envoyer le message'}
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;