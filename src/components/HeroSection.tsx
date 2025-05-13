// HeroSection is a React functional component that displays a hero banner with a background image, title, description, action buttons, and a scroll indicator.
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://segway.imgix.net/catalog/category/kickscooter-sameold-1-1-1.jpg"
          alt="Trottinette Électrique"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Easy Ride
        </h1>
        
        <p className="text-xl md:text-2xl text-white mb-6 max-w-3xl mx-auto">
          Bienvenue chez Easy Ride, votre partenaire de mobilité urbaine à Nador.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link to="/buy">
            <Button size="lg" variant="primary">
              Acheter une Trottinette
            </Button>
          </Link>
          <Link to="/rent">
            <Button size="lg" variant="outline">
              Louer une Trottinette
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 w-8 text-white opacity-70" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;