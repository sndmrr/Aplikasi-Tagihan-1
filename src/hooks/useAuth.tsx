
import { useState, useEffect, createContext, useContext } from 'react';
// import { User, Session } from '@supabase/supabase-js';
// import { supabase } from '@/integrations/supabase/client';

// App version - increment this to force all users to re-login
const APP_VERSION = '2.0.0';
const VERSION_KEY = 'app_version';

// Mock User interface for empty database mode
interface MockUser {
  id: string;
  email: string;
}

interface MockSession {
  user: MockUser;
}

interface AuthContextType {
  user: MockUser | null;
  session: MockSession | null;
  loading: boolean;
  userName: string | null;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string, nama: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [session, setSession] = useState<MockSession | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check app version - force re-login if version changed
    const storedVersion = localStorage.getItem(VERSION_KEY);
    if (storedVersion && storedVersion !== APP_VERSION) {
      // Version mismatch - force logout
      localStorage.clear();
      sessionStorage.clear();
      setUser(null);
      setSession(null);
      setUserName(null);
      setLoading(false);
      return;
    }

    // Load saved user name and email from localStorage
    const savedName = localStorage.getItem('userName');
    const savedEmail = localStorage.getItem('userEmail');
    const savedUserId = localStorage.getItem('userId');
    
    if (savedName && savedEmail && savedUserId) {
      setUserName(savedName);
      const mockUser: MockUser = {
        id: savedUserId,
        email: savedEmail
      };
      setUser(mockUser);
      setSession({ user: mockUser });
    }
    
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string) => {
    // Empty database mode - just simulate success
    return { error: null };
  };

  const signIn = async (email: string, password: string, nama: string) => {
    // Empty database mode - create mock user
    const mockUser: MockUser = {
      id: 'mock-user-' + Date.now(),
      email: email
    };
    
    setUser(mockUser);
    setSession({ user: mockUser });
    setUserName(nama);
    
    // Save to localStorage
    localStorage.setItem('userName', nama);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userId', mockUser.id);
    localStorage.setItem(VERSION_KEY, APP_VERSION);
    
    return { error: null };
  };

  const signOut = async () => {
    // Clear local state
    setUser(null);
    setSession(null);
    setUserName(null);
    
    // Clear all storage
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.clear();
    sessionStorage.clear();
    
    // Force redirect to auth page
    window.location.href = '/auth';
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, userName, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
