import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
    id: string;
    email: string;
    full_name?: string;
};

type Session = {
    access_token: string;
    user: User;
};

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
//   signUp: (email: string, password: string, fullName?: string) => Promise<{ error?: any }>;
//   signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  const signUp = async (email: string, password: string, fullName?: string) => {
    return { email, password, fullName };
  };

  const signIn = async (email: string, password: string) => {
    
    return { email, password };
  };

  const signOut = async () => {
    console.log('Signing out...');
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
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
