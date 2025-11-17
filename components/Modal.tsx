
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-[1001]" onClick={onClose}>
            <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-custom-lg w-full max-w-lg relative" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200 dark:border-dark-border-color">
                    <h3 className="text-xl font-bold text-navy-blue dark:text-white">{title}</h3>
                    <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 text-2xl transition-colors">
                        &times;
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};
