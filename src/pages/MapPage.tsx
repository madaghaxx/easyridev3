import React from 'react';
import MapComponent from '../components/MapComponent';

const MapPage: React.FC = () => {
  // French is the only language, so no context or translation needed
  const lang = 'fr';
  const isRtl = false; // French is LTR

  return (
    <div 
      className="min-h-screen bg-gray-50 pt-28 pb-16"
      dir={isRtl ? 'rtl' : 'ltr'}  
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Carte en direct
            </h1>
            <p className="text-gray-600">
              Suivez votre position et voyez à quelle distance vous êtes de nos magasins.
            </p>
          </div>
          
          <MapComponent lang={lang} />
          
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">
              Nos emplacements
            </h2>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-lg">
                  Magasin principal Easy-ride
                </h3>
                <p className="text-gray-600">
                  Centre-ville de Nador, Maroc
                </p>
                <p className="text-gray-600">
                  Ouvert: 9:00 - 18:00 (Lun-Ven)
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-lg">
                  Easy-ride Centre-ville
                </h3>
                <p className="text-gray-600">
                  Centre-ville de Nador, Maroc
                </p>
                <p className="text-gray-600">
                  Ouvert: 10:00 - 20:00 (Lun-Sam)
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg">
                  Université Easy-ride
                </h3>
                <p className="text-gray-600">
                  Campus universitaire, Nador, Maroc
                </p>
                <p className="text-gray-600">
                  Ouvert: 8:00 - 16:00 (Lun-Ven)
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
