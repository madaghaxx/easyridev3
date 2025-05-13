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
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((open) => !open);

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
        isScrolled ? "bg-white shadow-md py-2" : "bg-gradient-to-b from-green-600 to-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center shadow">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className={cn(
              "ml-2 font-bold text-xl tracking-tight",
              isScrolled ? "text-gray-900" : "text-white"
            )}>
              Easy Ride
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-medium transition-colors hover:text-green-500 px-2 py-1 rounded",
                  location.pathname === link.path
                    ? "text-green-600 bg-green-50"
                    : isScrolled
                    ? "text-gray-900"
                    : "text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <span className={isScrolled ? "text-gray-900" : "text-white"}>
                    {user?.nom}
                  </span>
                  <svg
                    className={cn("w-4 h-4 transition-transform", "group-hover:rotate-180")}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
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
            className={cn(
              "md:hidden flex items-center justify-center p-2 rounded focus:outline-none",
              isScrolled ? "text-gray-900" : "text-white"
            )}
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {/* Hamburger Icon */}
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden transition-all duration-300 overflow-hidden",
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="flex flex-col space-y-2 bg-white rounded shadow-md mt-2 py-4 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-medium transition-colors hover:text-green-500 px-2 py-2 rounded",
                  location.pathname === link.path
                    ? "text-green-600 bg-green-50"
                    : "text-gray-900"
                )}
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
            {!isLoggedIn && (
              <Link to="/auth" onClick={toggleMenu}>
                <Button variant="primary" size="sm" className="w-full mt-2">
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
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md mt-2"
              >
                Déconnexion
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;