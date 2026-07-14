import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const storageKey = 'padlhub-theme';

const getInitialTheme = (): Theme =>
  document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    themeColor?.setAttribute('content', theme === 'dark' ? '#17161a' : '#f7f5f2');

    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // The selected theme still works when storage is unavailable.
    }
  }, [theme]);

  return {
    theme,
    toggleTheme: () => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark')),
  };
};
