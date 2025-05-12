import React, { createContext, useContext, useState } from 'react';

type Language = 'fr';

interface LangContextType {
  lang: Language;
  setLang: React.Dispatch<React.SetStateAction<Language>>;
  t: (frText: string) => string;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export const useLang = () => {
  const context = useContext(LangContext);
  if (context === undefined) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
};

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang] = useState<Language>('fr');

  const t = (frText: string): string => {
    return frText;
  };

  return (
    <LangContext.Provider value={{ lang, setLang: () => {}, t }}>
      {children}
    </LangContext.Provider>
  );
};

export default LangContext;