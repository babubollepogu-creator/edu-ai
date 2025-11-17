
import React, { useState, useEffect, useCallback } from 'react';
import type { AppData, Page } from './types';
import { Sidebar } from './components/Sidebar';
import { AIAssistant } from './components/AIAssistant';
import { ThemeToggle } from './components/ThemeToggle';
import { Notification, NotificationProps } from './components/Notification';

const LoginPage: React.FC<{ onLogin: (username: string) => void; }> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password.length < 6 || password.length > 8) {
            setError('Password must be between 6 and 8 characters.');
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            onLogin(username);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-light-gray dark:bg-dark-main">
            <div className="bg-white dark:bg-dark-card p-12 rounded-lg shadow-custom-lg w-full max-w-md border-t-4 border-navy-blue">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-navy-blue rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg">
                        <i className="fas fa-graduation-cap"></i>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white">EduAI</h2>
                    <p className="text-gray-500 dark:text-dark-text-secondary mt-2">Smart Student Organization System</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-dark-text-secondary">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border-color rounded-md bg-gray-50 dark:bg-dark-input text-gray-800 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-navy-blue transition-all"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-dark-text-secondary">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border-color rounded-md bg-gray-50 dark:bg-dark-input text-gray-800 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-navy-blue transition-all"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button type="submit" className="w-full bg-navy-blue text-white py-3 px-4 rounded-md font-bold hover:bg-blue-800 transition-all transform hover:-translate-y-1 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center gap-2" disabled={isLoading}>
                        {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <><i className="fas fa-sign-in-alt"></i> Sign In</>}
                    </button>
                    <p className="text-center text-gray-500 dark:text-dark-text-secondary text-xs mt-6"><i className="fas fa-info-circle"></i> Demo Mode: Use any username. Password must be 6-8 chars.</p>
                </form>
            </div>
        </div>
    );
};


const PlaceholderPage: React.FC<{ title: string, subtitle: string, icon: string }> = ({ title, subtitle, icon }) => (
    <div>
        <div className="bg-white dark:bg-dark-hero p-12 mb-8 rounded-lg text-navy-blue dark:text-white shadow-custom">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-2">{title}</h1>
                <p className="text-xl opacity-90">{subtitle}</p>
            </div>
        </div>
        <div className="text-center p-16 bg-white dark:bg-dark-card rounded-lg shadow-custom">
            <i className={`fas ${icon} text-6xl text-gray-300 dark:text-gray-600 mb-4`}></i>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-dark-text-primary">Content Coming Soon</h2>
            <p className="text-gray-500 dark:text-dark-text-secondary mt-2">This page is under construction.</p>
        </div>
    </div>
);

const App: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('eduai_theme') as 'light' | 'dark' || 'dark'));
    const [currentUser, setCurrentUser] = useState<string | null>(() => sessionStorage.getItem('eduAI_user'));
    const [data, setData] = useState<AppData | null>(null);
    const [currentPage, setCurrentPage] = useState<Page>('dashboard');
    const [notification, setNotification] = useState<Omit<NotificationProps, 'onClose'> | null>(null);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('eduai_theme', theme);
    }, [theme]);

    useEffect(() => {
        if (currentUser) {
            const savedData = localStorage.getItem(`eduai_data_${currentUser}`);
            if (savedData) {
                setData(JSON.parse(savedData));
            } else {
                const defaultData: AppData = {
                    profile: { name: currentUser, age: '', gender: '', avatar: currentUser.charAt(0).toUpperCase(), avatarUrl: '' },
                    courses: [], tasks: [], notes: [], habits: [], goals: [], assessments: [],
                    settings: { theme: 'dark' }
                };
                setData(defaultData);
                localStorage.setItem(`eduai_data_${currentUser}`, JSON.stringify(defaultData));
            }
        } else {
            setData(null);
        }
    }, [currentUser]);
    
    const handleLogin = (username: string) => {
        sessionStorage.setItem('eduAI_user', username);
        setCurrentUser(username);
        showNotification({ message: `Welcome back, ${username}!`, type: 'success' });
    };

    const handleLogout = () => {
        sessionStorage.removeItem('eduAI_user');
        setCurrentUser(null);
    };

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };
    
    const showNotification = useCallback((notif: Omit<NotificationProps, 'onClose'>) => {
        setNotification(notif);
    }, []);

    if (!currentUser || !data) {
        return <LoginPage onLogin={handleLogin} />;
    }
    
    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <PlaceholderPage title="Dashboard" subtitle={`Welcome back, ${data.profile.name}!`} icon="fa-home" />;
            case 'courses':
                return <PlaceholderPage title="Courses" subtitle="Organize your academic courses" icon="fa-book" />;
            case 'tasks':
                return <PlaceholderPage title="Tasks" subtitle="Stay on top of your assignments" icon="fa-tasks" />;
            case 'notes':
                 return <PlaceholderPage title="Notes" subtitle="Capture and organize your learning" icon="fa-sticky-note" />;
            case 'habits':
                return <PlaceholderPage title="Habits" subtitle="Build consistent learning routines" icon="fa-calendar-check" />;
            case 'goals':
                return <PlaceholderPage title="Goals" subtitle="Set and achieve your objectives" icon="fa-bullseye" />;
            case 'exams':
                return <PlaceholderPage title="Exams" subtitle="Manage your academic assessments" icon="fa-calendar-alt" />;
            case 'motivation':
                return <PlaceholderPage title="Motivation" subtitle="Your daily dose of inspiration" icon="fa-brain" />;
            case 'appearance':
                return <PlaceholderPage title="Appearance" subtitle="Customize your EduAI experience" icon="fa-cog" />;
            case 'profile':
                return <PlaceholderPage title="Profile" subtitle="Manage your account information" icon="fa-user-cog" />;
            default:
                return <PlaceholderPage title="Dashboard" subtitle="Welcome back!" icon="fa-home" />;
        }
    };


    return (
        <div className="bg-light-gray dark:bg-dark-main text-text-primary dark:text-dark-text-primary min-h-screen">
            <Sidebar 
                currentPage={currentPage}
                profile={data.profile}
                onNavigate={setCurrentPage}
                onLogout={handleLogout}
            />
            <main className="ml-sidebar p-8 transition-all duration-300">
                {renderPage()}
            </main>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <AIAssistant />
            {notification && (
                <Notification 
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
    );
};

export default App;
