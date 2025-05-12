import React from 'react';
import { useLang } from '../contexts/LangContext';

const Home: React.FC = () => {
  const { lang, t } = useLang();
  const isRtl = lang === 'fr';
  
  return (
    <>
   
      <section 
        className="py-16 bg-white"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {t( 'Nos scooters électriques')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t(
                'Découvrez nos scooters électriques haut de gamme conçus pour la mobilité urbaine. Choisissez entre nos modèles standard et haute performance.'
              )}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          </div>
        </div>
      </section>
      
      <section 
        className="py-16 bg-gray-50"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {t( 'Pourquoi choisir Easy-ride?')}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t('Rapide et efficace')}
                </h3>
                <p className="text-gray-600">
                  {t(
                    'Nos scooters vous emmènent là où vous devez aller rapidement et efficacement.'
                  )}
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t('Écologique')}
                </h3>
                <p className="text-gray-600">
                  {t(
                    'Solution de transport urbain durable sans émissions.'
                  )}
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {t( 'Fiable et sûr')}
                </h3>
                <p className="text-gray-600">
                  {t(
                    'Construit avec des caractéristiques de sécurité et des composants fiables pour la tranquillité d\'esprit.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section 
        className="py-16 bg-green-50"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t('Prêt à rouler?')}
            </h2>
            <p className="text-gray-600 mb-8">
              {t(
                'Découvrez nos scooters électriques à louer ou à acheter et rejoignez la révolution de la mobilité durable.'
              )}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/rent" 
                className="bg-white text-green-500 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors border border-green-500"
              >
                {t( 'Louer un scooter')}
              </a>
              <a 
                href="/buy" 
                className="bg-green-500 text-white hover:bg-green-600 px-6 py-3 rounded-md font-medium transition-colors"
              >
                {t( 'Acheter un scooter')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;