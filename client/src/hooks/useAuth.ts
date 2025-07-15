import { useState, useEffect } from 'react';
import type { AuthUser } from '@/types';

// TODO: Replace with actual authentication logic
export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = async () => {
      try {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        
        if (isAuthenticated) {
          // TODO: Fetch user data from API
          const mockUser: AuthUser = {
            id: 'current-user',
            email: 'user@example.com',
            username: 'Current User',
            createdAt: new Date(),
          };
          setUser(mockUser);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Implement actual login API call
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: AuthUser = {
        id: 'current-user',
        email,
        username: email.split('@')[0],
        createdAt: new Date(),
      };
      
      setUser(mockUser);
      localStorage.setItem('isAuthenticated', 'true');
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Invalid credentials' };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    // TODO: Implement actual signup API call
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser: AuthUser = {
        id: 'current-user',
        email,
        username,
        createdAt: new Date(),
      };
      
      setUser(mockUser);
      localStorage.setItem('isAuthenticated', 'true');
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('isAuthenticated');
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  };
}