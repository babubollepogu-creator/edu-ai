
import React, { useEffect } from 'react';

export interface NotificationProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const isSuccess = type === 'success';
    const bgColor = isSuccess ? 'bg-success-color' : 'bg-danger-color';
    const icon = isSuccess ? 'fa-check-circle' : 'fa-exclamation-circle';
    const borderColor = isSuccess ? 'border-green-300' : 'border-red-300';

    return (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 px-6 py-4 rounded-md shadow-lg flex items-center gap-4 text-white z-[2000] animate-fade-in-down ${bgColor} border-l-4 ${borderColor}`}>
            <i className={`fas ${icon} text-xl`}></i>
            <span className="font-medium">{message}</span>
        </div>
    );
};
