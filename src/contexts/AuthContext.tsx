import { useMutation, useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect } from 'react';
import { fetchUserProfile, signInUser, signOutUser, signUpUser, type LoginUserData, type RegisterUserData } from '@/services/authService';
import { toast } from 'sonner';
import { Ban } from 'lucide-react';
import type { AxiosError } from 'axios';
import { queryClient } from '@/lib/tanstack';

type User = {
    id: number;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    fullName: string;
    roleName: string;
    imageUrl: string;
};

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isUserLoading: boolean;
  isUserError: boolean;
  userErrorData: any;
  signUp: (values: RegisterUserData) => void;
  isSigningUp: boolean;
  signUpError: boolean;
  signUpData: any;
  signUpErrorData: any;
  signIn: (values: LoginUserData) => void;
  isSigningIn: boolean;
  signInError: boolean;
  signInData: any;
  signInErrorData: any;
  signOut: () => void;
  refetchUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: userData,
    error: userErrorData,
    isError: isUserError,
    isPending: isUserLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ['fetch-user'],
    queryFn: async () => {
      try {
        return await fetchUserProfile();
      } catch (error: any) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          return null;
        }

        throw error;
      }
    },
    enabled: false,
    initialData: null
  });

  useEffect(() => {
  refetchUser().catch(() => {})
}, [])

const user = userData ?? null;

const isAdmin = 
  user?.roleName === 'ROLE_ADMIN' ||
  user?.roleName === 'ROLE_TESTER';


  const {
    mutate: signUp,
    isPending: isSigningUp,
    isError: signUpError,
    data: signUpData,
    error: signUpErrorData
  } = useMutation({
      mutationKey: ['sign-up'],
      mutationFn: signUpUser,
      onSuccess: ({data}) => {
        console.log("Sign up successful, user data:", data);

        toast.success('Successfully signed up.');

        return location.href = '/login';
      },
      onError: (error: AxiosError) => {
        console.error("Sign up error:", error);

        toast("Failed to sign up.", {
          description: error.message,
          icon: <Ban className="text-destructive mr-4" />,
        });
      }
  });

  const {
    mutate: signIn,
    isPending: isSigningIn,
    isError: signInError,
    data: signInData,
    error: signInErrorData
  } = useMutation({
      mutationKey: ['sign-in'],
      mutationFn: signInUser,
      onSuccess: async ({data}) => {
        console.log("Sign in successful, user data:", data);


        toast.success('Successfully signed in.');
        await refetchUser();
      },
      onError: (error: AxiosError) => {
        console.error("Sign in error:", error.message);
        toast.error('Failed to sign in.');
      }
  });

  const {
    mutate: signOut,
  } = useMutation({
    mutationKey: ['sign-out'],
    mutationFn: signOutUser,
    onSuccess: async () => {
      toast.success('Successfully signed out.');

      await queryClient.invalidateQueries({ queryKey: ['fetch-user'] });

      queryClient.removeQueries({ queryKey: ['fetch-user'] });
    },
    onError: (error: AxiosError) => {
      console.error("Sign out error:", error.message);
      toast.error('Failed to sign out.');
    }
  })

  const value = {
    user,
    isAdmin,
    isUserLoading,
    isUserError,
    userErrorData,
    signUp,
    isSigningUp,
    signUpError,
    signUpData,
    signUpErrorData,
    signIn,
    isSigningIn,
    signInError,
    signInData,
    signInErrorData,
    signOut,
    refetchUser
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
