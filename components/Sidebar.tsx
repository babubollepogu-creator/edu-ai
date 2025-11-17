
import React from 'react';
import type { Page, Profile } from '../types';

interface SidebarProps {
    currentPage: Page;
    profile: Profile;
    onNavigate: (page: Page) => void;
    onLogout: () => void;
}

const NavItem: React.FC<{
    page: Page;
    label: string;
    icon: string;
    currentPage: Page;
    onNavigate: (page: Page) => void;
}> = ({ page, label, icon, currentPage, onNavigate }) => {
    const isActive = currentPage === page;
    return (
        <a
            className={`flex items-center gap-4 py-4 px-6 mb-2 rounded-md text-text-light font-medium cursor-pointer transition-all duration-300 relative hover:bg-white/10 hover:translate-x-2 ${isActive ? 'bg-white/20 shadow-lg' : ''}`}
            onClick={() => onNavigate(page)}
        >
             <div className={`absolute left-0 top-0 h-full w-1 bg-white transition-transform duration-300 ${isActive ? 'scale-y-100' : 'scale-y-0'}`}></div>
            <i className={`fas ${icon} w-5 text-center`}></i>
            <span>{label}</span>
        </a>
    );
};

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, profile, onNavigate, onLogout }) => {
    const avatarContent = profile?.avatarUrl
        ? <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-full" />
        : (profile?.avatar || 'U');
    
    return (
        <nav className="fixed top-0 left-0 h-full w-sidebar bg-navy-blue dark:bg-dark-sidebar flex flex-col text-white z-[100]">
            <div className="p-6 flex items-center gap-4 border-b border-white/10 mb-4">
                <div className="w-12 h-12 bg-navy-blue rounded-full flex items-center justify-center text-white text-xl shadow-md">
                    <i className="fas fa-graduation-cap"></i>
                </div>
                <h1 className="text-3xl font-bold">EduAI</h1>
            </div>

            <div className="flex-1 px-4">
                <NavItem page="dashboard" label="Dashboard" icon="fa-home" currentPage={currentPage} onNavigate={onNavigate} />
                <NavItem page="courses" label="Courses" icon="fa-book" currentPage={currentPage} onNavigate={onNavigate} />
                <NavItem page="tasks" label="Tasks" icon="fa-tasks" currentPage={currentPage} onNavigate={onNavigate} />
                <NavItem page="notes" label="Notes" icon="fa-sticky-note" currentPage={currentPage} onNavigate={onNavigate} />
                <NavItem page="habits" label="Habits" icon="fa-calendar-check" currentPage={currentPage} onNavigate={onNavigate} />
                <NavItem page="goals" label="Goals" icon="fa-bullseye" currentPage={currentPage} onNavigate={onNavigate} />
                <NavItem page="exams" label="Exams" icon="fa-calendar-alt" currentPage={currentPage} onNavigate={onNavigate} />
                <NavItem page="motivation" label="Motivation" icon="fa-brain" currentPage={currentPage} onNavigate={onNavigate} />
                <NavItem page="appearance" label="Appearance" icon="fa-cog" currentPage={currentPage} onNavigate={onNavigate} />
                <NavItem page="profile" label="Profile" icon="fa-user-cog" currentPage={currentPage} onNavigate={onNavigate} />
            </div>

            <div className="p-6 border-t border-white/10 flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-400 dark:bg-blue-600 rounded-full flex items-center justify-center font-bold text-lg overflow-hidden flex-shrink-0">
                    {avatarContent}
                </div>
                <div>
                    <h4 className="font-semibold">{profile?.name || 'User'}</h4>
                    <a onClick={onLogout} className="text-sm text-white/70 hover:text-white cursor-pointer transition-colors">Logout</a>
                </div>
            </div>
        </nav>
    );
};
