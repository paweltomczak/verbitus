import { useState } from 'react';
import { setThemeCookie } from '@/app/lib/utils';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { Theme } from '@/app/lib/interfaces';

export const ThemeSwitcher = ({ theme }: { theme: Theme }) => {
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>(theme);

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.replace(currentTheme, newTheme);
    setCurrentTheme(newTheme);
    setThemeCookie(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className='align-middle'
      aria-label='Theme Switcher'
    >
      {currentTheme === 'light' ? (
        <MoonIcon className='h-5 w-5 cursor-pointer hover:text-hover' />
      ) : (
        <SunIcon className='h-5 w-5 cursor-pointer hover:text-yellow-300' />
      )}
    </button>
  );
};
