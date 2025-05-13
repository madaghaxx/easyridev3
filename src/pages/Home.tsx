import React from 'react';
import heroImage from '../utils/images/IMG-20250513-WA0016.webp'; // Hero image
import standardScooterImage from '../utils/images/10-Best-Electric-scooter-4.jpg'; // Standard scooter image
import performanceScooterImage from '../utils/images/IMG-20250513-WA0016.webp'; // Performance scooter
const scooters = [
  {
    name: 'EasyRide Standard',
    image: standardScooterImage,
    price: 'À partir de 70DH/4-8h',
    features: [
      "Vitesse maximale de 20 km/h",
      "Poids maximum supporté 100 kg",
      "Autonomie jusqu’à 30 km",
      "Norme d’étanchéité IPX4",
      "Couplage avec l’application impossible",
    ],
    cta: { label: 'Découvrir', link: '/rent' },
  },
  {
    name: 'EasyRide Performance',
    image: performanceScooterImage,
    price: 'À partir de 50DH/h',
    features: [
      'Moteur 800W (modèle BISON 800W)',
      'Vitesse maximale 49 km/h',
      'Autonomie jusqu\'à 45 km',
      'Batterie lithium 48V13',
      'Temps de charge : 5h',
      'Pneus cross tout terrain 10 pouces',
      'Freins à disque avant et arrière',
      'Suspensions avant et arrière',
      'Poids : 27 kg',
      'Étanchéité améliorée (norme IP), utilisable sous la pluie',
      'Prête à l’emploi, aucun montage nécessaire',
      'Hauteur utilisateur : 1m20 à 2m20',
      'Pliable',
      'Poids maximal : 120 kg',
      'Contrôleurs étanches améliorés',
    ],
    cta: { label: 'Découvrir', link: '/rent' },
  },
];

const testimonials = [
  {
    name: 'Sophie L.',
    text: '“Easy-ride a transformé mes trajets quotidiens. Les scooters sont fiables, rapides et parfaits pour la ville !”',
    avatar: '/images/avatar1.jpg',
  },
  {
    name: 'Marc D.',
    text: '“Service client au top et scooters performants. Je recommande à tous ceux qui veulent se déplacer autrement.”',
    avatar: '/images/avatar2.jpg',
  },
  {
    name: 'Claire P.',
    text: '“J\'ai loué un scooter pour un mois, expérience géniale et très économique. Merci Easy-ride !”',
    avatar: '/images/avatar3.jpg',
  },
];

const Home: React.FC = () => {
  const isRtl = false;

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-green-50 py-20" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-green-700 leading-tight">
              La mobilité urbaine réinventée
            </h1>
            <p className="text-gray-700 text-lg mb-8">
              Louez un scooter électrique haut de gamme et profitez d’une expérience de déplacement écologique, économique et sans effort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="/rent"
                className="bg-green-600 text-white hover:bg-green-700 px-8 py-3 rounded-md font-semibold transition-colors shadow"
              >
                Louer un scooter
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={heroImage}
              alt="Scooter électrique Easy-ride"
              className="w-full max-w-md rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Scooters Section */}
      <section className="py-20 bg-white" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-700">
              Nos scooters électriques
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez notre gamme de scooters électriques adaptés à tous vos besoins urbains. Performance, sécurité et design au rendez-vous.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {scooters.map((scooter) => (
              <div key={scooter.name} className="bg-gray-50 rounded-xl shadow-md p-8 flex flex-col items-center">
                <img
                  src={scooter.image}
                  alt={scooter.name}
                  className="w-48 h-32 object-contain mb-6"
                />
                <h3 className="text-2xl font-bold mb-2 text-green-700">{scooter.name}</h3>
                <div className="text-green-600 font-semibold mb-4">{scooter.price}</div>
                <ul className="text-gray-700 mb-6 space-y-1 text-left">
                  {scooter.features.map((f) => (
                    <li key={f} className="flex items-center">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={scooter.cta.link}
                  className="bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
                >
                  {scooter.cta.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-700">
                Pourquoi choisir Easy-ride ?
              </h2>
              <p className="text-gray-600">
                Plus qu’un simple moyen de transport, Easy-ride vous accompagne dans votre transition vers une mobilité plus verte et plus intelligente.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Rapide et efficace</h3>
                <p className="text-gray-600">
                  Déplacez-vous sans contraintes, évitez les embouteillages et gagnez du temps au quotidien.
                </p>
              </div>
              <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Écologique</h3>
                <p className="text-gray-600">
                  Zéro émission, zéro bruit : roulez proprement et contribuez à la préservation de l’environnement.
                </p>
              </div>
              <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Fiable et sûr</h3>
                <p className="text-gray-600">
                  Scooters certifiés, entretien inclus et assistance 24/7 pour une tranquillité d’esprit totale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-700">
              Ils nous font confiance
            </h2>
            <p className="text-gray-600">
              Découvrez les avis de nos clients satisfaits.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-xl shadow-md p-8 flex flex-col items-center">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-16 h-16 rounded-full mb-4 object-cover"
                />
                <p className="text-gray-700 italic mb-4"> {t.text} </p>
                <div className="font-bold text-green-700">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-green-600" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à rejoindre la révolution Easy-ride ?
            </h2>
            <p className="mb-8 text-lg">
              Passez à la mobilité électrique dès aujourd’hui et profitez d’offres exclusives sur la location de votre scooter.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/rent"
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold transition-colors border border-white"
              >
                Louer un scooter
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
