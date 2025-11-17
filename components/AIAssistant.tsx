
import React, { useState, useRef, useEffect } from 'react';
import type { AiMessage } from '../types';
import { generateAiResponse } from '../services/geminiService';

export const AIAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<AiMessage[]>([
        {
            sender: 'assistant',
            text: `👋 Hi! I'm Sophea, your AI study companion. I can help you with study planning, learning strategies, and finding resources. How can I assist you today?`
        }
    ]);
    const [userInput, setUserInput] = useState('');
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        const newMessages: AiMessage[] = [...messages, { sender: 'user', text: userInput }, { sender: 'loading', text: '...' }];
        setMessages(newMessages);
        setUserInput('');
        
        const response = await generateAiResponse(userInput);

        setMessages(prev => {
            const updatedMessages = [...prev];
            const loadingIndex = updatedMessages.findIndex(m => m.sender === 'loading');
            if (loadingIndex !== -1) {
                updatedMessages[loadingIndex] = { sender: 'assistant', text: response };
            }
            return updatedMessages;
        });
    };
    
    const UserMessage: React.FC<{ text: string }> = ({ text }) => (
        <div className="self-end bg-navy-blue text-white py-3 px-4 rounded-2xl max-w-[80%]">
            <p className="text-sm">{text}</p>
        </div>
    );
    
    const AssistantMessage: React.FC<{ text: string }> = ({ text }) => (
        <div className="self-start bg-gray-200 dark:bg-dark-input text-gray-800 dark:text-dark-text-primary py-3 px-4 rounded-2xl max-w-[80%]">
             <p className="text-sm" dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br/>') }} />
        </div>
    );

    const LoadingMessage: React.FC = () => (
        <div className="self-start bg-gray-200 dark:bg-dark-input text-gray-800 dark:text-dark-text-primary py-3 px-4 rounded-2xl max-w-[80%]">
            <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse [animation-delay:0.4s]"></div>
            </div>
        </div>
    );


    return (
        <div className="fixed bottom-8 right-8 z-50">
            <div className={`absolute bottom-[90px] right-0 w-96 h-[550px] bg-white dark:bg-dark-card rounded-lg shadow-custom-lg border border-gray-200 dark:border-dark-border-color flex-col overflow-hidden transition-all duration-300 ${isOpen ? 'flex' : 'hidden'}`}>
                <div className="p-4 bg-navy-blue text-white flex items-center justify-between">
                    <h3 className="font-semibold flex items-center gap-2"><i className="fas fa-robot"></i> Sophea AI</h3>
                    <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
                    {messages.map((msg, index) => {
                         if (msg.sender === 'user') return <UserMessage key={index} text={msg.text} />;
                         if (msg.sender === 'assistant') return <AssistantMessage key={index} text={msg.text} />;
                         if (msg.sender === 'loading') return <LoadingMessage key={index} />;
                         return null;
                    })}
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-dark-border-color flex gap-2">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask me anything..."
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-border-color rounded-full bg-gray-100 dark:bg-dark-input text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-navy-blue transition-all"
                    />
                    <button onClick={handleSendMessage} className="px-4 py-2 bg-navy-blue text-white rounded-full hover:bg-blue-800 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 bg-navy-blue rounded-full text-white text-2xl flex items-center justify-center shadow-lg hover:bg-blue-800 transition-all transform hover:scale-110 hover:-translate-y-1">
                <i className="fas fa-robot"></i>
            </button>
        </div>
    );
};
