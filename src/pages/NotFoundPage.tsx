import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  // Only French, so always RTL is false
  const isRtl = false;

  return (
    <div
      className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-8 text-center">
          <h1 className="text-9xl font-bold text-green-500">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
            Page non trouvée
          </h2>
          <p className="text-gray-600 mb-6">
            La page que vous recherchez a peut-être été supprimée, son nom a changé ou elle est temporairement indisponible.
          </p>
          <Link to="/">
            <Button variant="primary">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
