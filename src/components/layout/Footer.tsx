import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="ml-2 font-bold text-xl">Easy Ride</span>
            </div>
            <p className="text-gray-400 mb-4">
              Leader de la location et vente de trottinettes électriques à Nador.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/rent" className="text-gray-400 hover:text-white transition-colors">
                  Location
                </Link>
              </li>
              <li>
                <Link to="/buy" className="text-gray-400 hover:text-white transition-colors">
                  Achat
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-gray-400 hover:text-white transition-colors">
                  Carte
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="text-gray-400">Nador, Maroc</span>
              </li>
              <li className="flex items-center">
                <span className="text-gray-400">+212 612 345 678</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-green-500 mr-2" />
                <span className="text-gray-400">info@easyride.ma</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="font-bold text-lg mb-4">Horaires d'Ouverture</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                Lundi - Vendredi: 9:00 - 18:00
              </li>
              <li className="text-gray-400">
                Samedi: 10:00 - 16:00
              </li>
              <li className="text-gray-400">
                Dimanche: Fermé
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Easy Ride. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;