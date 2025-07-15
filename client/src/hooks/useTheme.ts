import { useState, useEffect } from 'react';
import type { ThemeMode } from '@/types';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    // Check localStorage first, then system preference
    const stored = localStorage.getItem('theme') as ThemeMode;
    if (stored) return stored;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(theme);
    
    // Store in localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, setTheme, toggleTheme };
}