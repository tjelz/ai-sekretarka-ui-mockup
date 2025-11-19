'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';
import { getWidgetChatResponse } from '../actions';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Initialize with time-aware greeting
  const [messages, setMessages] = useState<Message[]>([]);
  // Effect to set initial message to avoid hydration mismatch
  useEffect(() => {
    const hour = new Date().getHours();
    const greeting = hour < 18 && hour > 5 ? "Dzień dobry" : "Dobry wieczór";
    setMessages([
      { id: '1', text: `${greeting}! Jestem AI Asystentką Yieldo. W czym mogę Ci pomóc?`, sender: 'ai' }
    ]);
  }, []);


  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    
    const newMsg: Message = { id: Date.now().toString(), text: userMsg, sender: 'user' };
    setMessages(prev => [...prev, newMsg]);
    setIsLoading(true);

    // Convert messages to history format for the server action
    // Note: We only send previous messages, not the one just added to state (it will be added to UI immediately)
    // Ideally we should persist conversation ID, but for this simple widget we just pass history context if needed
    // The server action I wrote accepts history.
    const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model' as 'user' | 'model',
        parts: [{ text: m.text }]
    }));
    
    try {
        const response = await getWidgetChatResponse(userMsg, history);
        const aiMsg: Message = { id: (Date.now() + 1).toString(), text: response, sender: 'ai' };
        setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
        console.error("Chat Error", error);
        const errorMsg: Message = { id: (Date.now() + 1).toString(), text: "Przepraszam, wystąpił błąd. Spróbuj ponownie.", sender: 'ai' };
        setMessages(prev => [...prev, errorMsg]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end print:hidden">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[90vw] sm:w-[360px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300 origin-bottom-right">
          {/* Header */}
          <div className="bg-blue-600 p-4 flex items-center justify-between text-white shadow-md z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Asystentka Yieldo</h3>
                <p className="text-[10px] text-blue-100 flex items-center gap-1.5 font-medium opacity-90">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Dostępna teraz
                </p>
              </div>
            </div>
            <button 
                onClick={() => setIsOpen(false)} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scroll-smooth">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-slate-100">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Napisz wiadomość..."
              className="flex-1 bg-slate-100 border-0 rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-slate-900 placeholder:text-slate-400 transition-all"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="w-11 h-11 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-md hover:scale-105 active:scale-95"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ml-0.5" />}
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-[0_8px_30px_rgb(37,99,235,0.3)] transition-all hover:scale-105 active:scale-95"
      >
        <span className="absolute -top-2 -right-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
        </span>
        {isOpen ? <X size={28} /> : <MessageCircle size={30} />}
      </button>
    </div>
  );
};

export default ChatWidget;
