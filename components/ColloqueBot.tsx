'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, BookOpen, FileText, Loader2 } from 'lucide-react';

type Mode = 'define' | 'summarize';
type Message = {
  id: string;
  role: 'user' | 'bot';
  content: string;
};

export default function ColloqueBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('define');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, content: input }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: 'Sorry, something went wrong. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#C9A84C] text-[#1C1914] shadow-lg hover:scale-110 transition-transform z-50 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-[#1C1914] rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#2C2C2C] p-4 border-b border-[#C9A84C]/20">
              <h2 className="font-cormorant text-xl text-[#F5EFE6]">Reading Assistant</h2>
              <p className="font-dm-sans text-sm text-[#F5EFE6]/60 mt-1">
                Get definitions and summaries in plain English
              </p>
            </div>

            {/* Mode Selector */}
            <div className="p-4 flex gap-2">
              <button
                onClick={() => setMode('define')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-dm-sans text-sm transition-all ${
                  mode === 'define'
                    ? 'bg-[#C9A84C] text-[#1C1914]'
                    : 'bg-[#2C2C2C] text-[#F5EFE6]/60 hover:bg-[#2C2C2C]/80'
                }`}
              >
                <BookOpen size={16} />
                Define a word
              </button>
              <button
                onClick={() => setMode('summarize')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-dm-sans text-sm transition-all ${
                  mode === 'summarize'
                    ? 'bg-[#C9A84C] text-[#1C1914]'
                    : 'bg-[#2C2C2C] text-[#F5EFE6]/60 hover:bg-[#2C2C2C]/80'
                }`}
              >
                <FileText size={16} />
                Summarize text
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-[#F5EFE6]/40 font-dm-sans text-sm py-8">
                  {mode === 'define'
                    ? 'Type a word to get its definition'
                    : 'Paste a passage to get a summary'}
                </div>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 font-dm-sans text-sm ${
                      msg.role === 'user'
                        ? 'bg-[#C9A84C] text-[#1C1914]'
                        : 'bg-[#2C2C2C] text-[#F5EFE6]'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#2C2C2C] rounded-2xl px-4 py-3">
                    <Loader2 size={20} className="text-[#C9A84C] animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#C9A84C]/20">
              <div className="flex gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    mode === 'define'
                      ? 'Enter a word...'
                      : 'Paste text to summarize...'
                  }
                  className="flex-1 bg-[#2C2C2C] text-[#F5EFE6] placeholder-[#F5EFE6]/40 rounded-xl px-4 py-3 font-dm-sans text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50"
                  rows={2}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="self-end bg-[#C9A84C] text-[#1C1914] rounded-xl p-3 hover:bg-[#C9A84C]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
