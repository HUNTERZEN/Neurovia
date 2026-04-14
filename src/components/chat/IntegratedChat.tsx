import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Trash2, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../../context/ChatContext';

export function IntegratedChat() {
  const {
    messages,
    isOpen,
    isTyping,
    unreadCount,
    sendMessage,
    toggleChat,
    clearChat,
  } = useChat();

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input when chat opens
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    sendMessage(newMessage);
    setNewMessage('');
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  // Simple markdown-like rendering for bold text and line breaks
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, i) => {
      // Replace **text** with bold
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <React.Fragment key={i}>
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
            }
            return <span key={j}>{part}</span>;
          })}
          {i < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-20 right-4 w-[370px] h-[550px] bg-gray-950 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-800/80 z-50"
            style={{ boxShadow: '0 25px 50px -12px rgba(124, 58, 237, 0.25)' }}
          >
            {/* ─── Header ─── */}
            <div className="px-5 py-4 bg-gradient-to-r from-purple-900/40 to-blue-900/30 border-b border-gray-800/60 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-gray-950" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">Neurovia Assistant</h3>
                    <p className="text-xs text-green-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      Always online
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={clearChat}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors group"
                    title="Clear chat"
                  >
                    <Trash2 className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
                  </button>
                  <button
                    onClick={toggleChat}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors group"
                  >
                    <X className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* ─── Messages ─── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth" style={{ scrollbarWidth: 'thin', scrollbarColor: '#374151 transparent' }}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-1 ${
                      message.sender === 'user'
                        ? 'bg-purple-600'
                        : 'bg-gradient-to-br from-purple-500 to-blue-500'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <Bot className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>

                    {/* Bubble */}
                    <div className="space-y-2">
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          message.sender === 'user'
                            ? 'bg-purple-600 text-white rounded-tr-md'
                            : 'bg-gray-800/80 text-gray-200 rounded-tl-md border border-gray-700/50'
                        }`}
                      >
                        {renderContent(message.content)}
                      </div>

                      {/* Quick Replies */}
                      {message.sender === 'assistant' && message.quickReplies && message.id === messages[messages.length - 1]?.id && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {message.quickReplies.map((reply, i) => (
                            <button
                              key={i}
                              onClick={() => handleQuickReply(reply)}
                              className="px-3 py-1.5 text-xs font-medium text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 rounded-full transition-all duration-200 hover:scale-[1.02]"
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Timestamp */}
                      <p className={`text-[10px] text-gray-600 px-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-2">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mt-1">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-gray-800/80 rounded-2xl rounded-tl-md px-4 py-3 border border-gray-700/50">
                      <div className="flex gap-1.5 items-center h-5">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ─── Input ─── */}
            <div className="px-4 py-3 bg-gray-900/80 border-t border-gray-800/60 flex-shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything about Neurovia..."
                  className="flex-1 bg-gray-800/60 text-white text-sm rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50 placeholder-gray-500 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                  className="p-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
              <p className="text-[10px] text-gray-600 text-center mt-2">
                Powered by Neurovia • Ask about services, pricing & more
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Toggle Button ─── */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 p-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-full shadow-lg shadow-purple-500/30 transition-all z-50"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-white" />
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
              >
                <span className="text-[10px] text-white font-bold">{unreadCount}</span>
              </motion.div>
            )}
          </div>
        )}
      </motion.button>
    </>
  );
}