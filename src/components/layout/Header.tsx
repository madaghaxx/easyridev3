import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import { cn } from '../../utils/helpers';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Location', path: '/rent' },
    { name: 'Carte', path: '/map' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className={cn(
              "ml-2 font-bold text-xl", 
              isScrolled ? "text-gray-900" : "text-white"
            )}>
              Easy Ride
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-medium transition-colors hover:text-green-500",
                  location.pathname === link.path ? "text-green-500" : (isScrolled ? "text-gray-900" : "text-white")
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative group">
                <button className="flex items-center space-x-1">
                  <span className={isScrolled ? "text-gray-900" : "text-white"}>
                    {user?.name}
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Déconnexion
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="primary" size="sm">
                  Connexion
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={toggleMenu}
          >
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "font-medium transition-colors hover:text-green-500",
                    location.pathname === link.path ? "text-green-500" : (isScrolled ? "text-gray-900" : "text-white")
                  )}
                  onClick={toggleMenu}
                >
                  {link.name}
                </Link>
              ))}
              {!isLoggedIn && (
                <Link to="/auth" onClick={toggleMenu}>
                  <Button variant="primary" size="sm" className="w-full">
                    Connexion
                  </Button>
                </Link>
              )}
              {isLoggedIn && (
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Déconnexion
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;