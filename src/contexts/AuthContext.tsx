import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  age?: number;
  phone?: string;
};

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check local storage for user session
    const storedUser = localStorage.getItem('t-glide-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // For demo purpose, we're using mock authentication
      // In a real app, you would call your API here
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Hard-coded user for demo
      if (email === 'demo@example.com' && password === 'password') {
        const mockUser: User = {
          id: 'user-1',
          name: 'Demo User',
          email: 'demo@example.com',
          age: 28,
          phone: '+212612345678'
        };
        
        setUser(mockUser);
        setIsLoggedIn(true);
        localStorage.setItem('t-glide-user', JSON.stringify(mockUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    try {
      // For demo purpose, we're using mock registration
      // In a real app, you would call your API here
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const { password, ...userInfo } = userData;
      
      // Create mock user
      const mockUser: User = {
        id: `user-${Date.now()}`,
        ...userInfo
      };
      
      setUser(mockUser);
      setIsLoggedIn(true);
      localStorage.setItem('t-glide-user', JSON.stringify(mockUser));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('t-glide-user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;