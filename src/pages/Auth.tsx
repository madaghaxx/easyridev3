import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const t = (s: string) => s; // Simple translation passthrough for French only

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { connexion, inscription } = useAuth();
  const isRtl = false; // French is LTR

  // Get redirect path from location state or default to homepage
  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  const validateForm = (): boolean => {
    if (isLogin) {
      if (!formData.email || !formData.password) {
        setError(t('Veuillez remplir tous les champs'));
        return false;
      }
    } else {
      if (!formData.name || !formData.email || !formData.phone || !formData.age || !formData.password || !formData.confirmPassword) {
        setError(t('Veuillez remplir tous les champs'));
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setError(t('Les mots de passe ne correspondent pas'));
        return false;
      }

      if (isNaN(Number(formData.age)) || Number(formData.age) < 16) {
        setError(t('Vous devez avoir au moins 16 ans'));
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      let success = false;

      if (isLogin) {
        success = await connexion(formData.email, formData.password);
        if (!success) {
          setError(t('Email ou mot de passe invalide'));
        }
      } else {
        success = await inscription({
          nom: formData.name,
          email: formData.email,
          telephone: formData.phone,
          age: Number(formData.age),
          motDePasse: formData.password,
        });
        if (!success) {
          setError(t('Échec de la création du compte'));
        }
      }

      if (success) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(t('Une erreur s\'est produite'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            {isLogin
              ? t('Connectez-vous à votre compte')
              : t('Créez votre compte')}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin
              ? t('Ou ')
              : t('Vous avez déjà un compte? ')}
            <button
              type="button"
              onClick={toggleForm}
              className="font-medium text-green-600 hover:text-green-500"
            >
              {isLogin
                ? t('créer un nouveau compte')
                : t('se connecter')}
            </button>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <div className="flex items-center mb-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                      {t('Nom complet')}
                    </label>
                  </div>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('Entrez votre nom complet')}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      {t('Numéro de téléphone')}
                    </label>
                  </div>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('Entrez votre numéro de téléphone')}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <svg className="mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <label htmlFor="age" className="text-sm font-medium text-gray-700">
                      {t('Âge')}
                    </label>
                  </div>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    min="16"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder={t('Entrez votre âge')}
                    className="w-full"
                  />
                </div>
              </>
            )}

            <div>
              <div className="flex items-center mb-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  {t('Adresse e-mail')}
                </label>
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('Entrez votre e-mail')}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center mb-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  {t('Mot de passe')}
                </label>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t('Entrez votre mot de passe')}
                className="w-full"
              />
            </div>

            {!isLogin && (
              <div>
                <div className="flex items-center mb-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    {t('Confirmez le mot de passe')}
                  </label>
                </div>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={t('Confirmez votre mot de passe')}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  {t('Souviens-toi de moi')}
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-500">
                  {t('Mot de passe oublié?')}
                </a>
              </div>
            </div>
          )}

          <div>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : isLogin ? (
                t('Se connecter')
              ) : (
                t('S\'inscrire')
              )}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            {t('En vous inscrivant, vous acceptez nos')}
            {' '}
            <a href="#" className="text-green-600 hover:text-green-500">
              {t('Conditions d\'utilisation')}
            </a>
            {' '}
            {t('et')}
            {' '}
            <a href="#" className="text-green-600 hover:text-green-500">
              {t('Politique de confidentialité')}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;