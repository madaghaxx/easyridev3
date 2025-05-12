import React from 'react';
import { useLang } from '../contexts/LangContext';
import MapComponent from '../components/MapComponent';

const MapPage: React.FC = () => {
  const { lang, t } = useLang();
  const isRtl = lang === 'fr';
  
  return (
    <div 
      className="min-h-screen bg-gray-50 pt-28 pb-16"
      dir={isRtl ? 'rtl' : 'ltr'}  
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              {t( 'Carte en direct')}
            </h1>
            <p className="text-gray-600">
              {t(
                'Suivez votre position et voyez à quelle distance vous êtes de nos magasins.'
              )}
            </p>
          </div>
          
          <MapComponent lang={lang} />
          
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">
              {t('Nos emplacements')}
            </h2>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-lg">
                  {t( 'Magasin principal Easy-ride')}
                </h3>
                <p className="text-gray-600">
                  {t('Centre-ville de Nador, Maroc')}
                </p>
                <p className="text-gray-600">
                  {t('Ouvert: 9:00 - 18:00 (Lun-Ven)')}
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-lg">
                  {t( 'Easy-ride Centre-ville')}
                </h3>
                <p className="text-gray-600">
                  {t('Centre-ville de Nador, Maroc')}
                </p>
                <p className="text-gray-600">
                  {t( 'Ouvert: 10:00 - 20:00 (Lun-Sam)')}
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg">
                  {t( 'Université Easy-ride')}
                </h3>
                <p className="text-gray-600">
                  {t('Campus universitaire, Nador, Maroc')}
                </p>
                <p className="text-gray-600">
                  {t( 'Ouvert: 8:00 - 16:00 (Lun-Ven)')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;