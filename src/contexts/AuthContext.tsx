import React, { createContext, useContext, useState, useEffect } from 'react';

type Utilisateur = {
  id: string;
  nom: string;
  email: string;
  age?: number;
  telephone?: string;
};

interface AuthContextType {
  estConnecte: boolean;
  utilisateur: Utilisateur | null;
  connexion: (email: string, motDePasse: string) => Promise<boolean>;
  inscription: (donnees: Omit<Utilisateur, 'id'> & { motDePasse: string }) => Promise<boolean>;
  deconnexion: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans AuthProvider');
  }
  return {
    isLoggedIn: context.estConnecte,
    user: context.utilisateur,
    logout: context.deconnexion,
    // Optionally expose the originals if needed elsewhere
    ...context,
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [estConnecte, setEstConnecte] = useState<boolean>(false);
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);

  // Restore user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('t-glide-user');
    if (storedUser) {
      setUtilisateur(JSON.parse(storedUser));
      setEstConnecte(true);
    }
  }, []);

  const hacherMotDePasse = async (motDePasse: string): Promise<string> => {
    // Hachage simple pour démonstration (NE PAS utiliser en production)
    const encoder = new TextEncoder();
    const data = encoder.encode(motDePasse);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const validerEmail = (email: string): boolean => {
    // Validation simple d'email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const connexion = async (email: string, motDePasse: string): Promise<boolean> => {
    try {
      if (!validerEmail(email) || motDePasse.length < 6) {
        return false;
      }

      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Utilisateur de démonstration
      const emailDemo = 'demo@example.com';
      const motDePasseDemoHash = await hacherMotDePasse('password');

      const motDePasseSaisiHash = await hacherMotDePasse(motDePasse);

      if (email === emailDemo && motDePasseSaisiHash === motDePasseDemoHash) {
        const utilisateurFictif: Utilisateur = {
          id: 'user-1',
          nom: 'Démo',
          email: emailDemo,
        };
        setUtilisateur(utilisateurFictif);
        setEstConnecte(true);
        localStorage.setItem('t-glide-user', JSON.stringify(utilisateurFictif));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur de connexion :', error);
      return false;
    }
  };

  const inscription = async (donnees: Omit<Utilisateur, 'id'> & { motDePasse: string }): Promise<boolean> => {
    try {
      const { motDePasse, email, ...infosUtilisateur } = donnees;

      if (!validerEmail(email) || motDePasse.length < 6) {
        return false;
      }

      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Hachage du mot de passe (non stocké dans cette démo)
      await hacherMotDePasse(motDePasse);

      // Création d'un utilisateur fictif
      const utilisateurFictif: Utilisateur = {
        id: `user-${Date.now()}`,
        email,
        ...infosUtilisateur
      };

      setUtilisateur(utilisateurFictif);
      setEstConnecte(true);
      localStorage.setItem('t-glide-user', JSON.stringify(utilisateurFictif));

      return true;
    } catch (error) {
      console.error('Erreur d\'inscription :', error);
      return false;
    }
  };

  const deconnexion = () => {
    setUtilisateur(null);
    setEstConnecte(false);
    localStorage.removeItem('t-glide-user');
  };

  return (
    <AuthContext.Provider value={{ estConnecte, utilisateur, connexion, inscription, deconnexion }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
