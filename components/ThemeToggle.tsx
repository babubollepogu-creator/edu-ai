
import React from 'react';

interface ThemeToggleProps {
    theme: 'light' | 'dark';
    onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
    return (
        <button 
            onClick={onToggle} 
            className="fixed top-8 right-8 w-14 h-14 bg-navy-blue dark:bg-dark-card rounded-full cursor-pointer transition-all duration-300 z-[1000] shadow-custom hover:scale-110 hover:shadow-custom-lg flex items-center justify-center"
            aria-label="Toggle theme"
        >
            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-xl text-white`}></i>
        </button>
    );
};
