import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, ChevronDown, Star, Clock, Calendar, Paperclip, ThumbsUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../../context/ChatContext';

export function IntegratedChat() {
  const { 
    messages, 
    isOpen, 
    activeServiceId, 
    activeExpert,
    isExpertTyping,
    unreadCount,
    feedback,
    sendMessage, 
    toggleChat,
    uploadFile,
    submitFeedback,
    getExpertAvailability
  } = useChat();
  
  const [newMessage, setNewMessage] = useState('');
  const [showAvailability, setShowAvailability] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !fileInputRef.current?.files?.length) return;
    
    let attachments = [];
    if (fileInputRef.current?.files?.length) {
      setUploading(true);
      try {
        const file = fileInputRef.current.files[0];
        const attachment = await uploadFile(file);
        attachments.push(attachment);
      } catch (error) {
        console.error('Failed to upload file:', error);
      }
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }

    sendMessage(newMessage, activeServiceId || undefined, attachments);
    setNewMessage('');
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmitFeedback = () => {
    submitFeedback(rating, comment);
    setShowFeedback(false);
    setRating(0);
    setComment('');
  };

  const availability = activeExpert ? getExpertAvailability(activeExpert.id) : [];

  const filteredMessages = activeServiceId
    ? messages.filter(m => m.serviceId === activeServiceId)
    : messages;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 w-96 h-[600px] bg-gray-900 rounded-lg shadow-lg flex flex-col overflow-hidden border border-gray-800 z-50"
          >
            {/* Chat Header */}
            <div className="p-4 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                  <h3 className="text-white font-medium">
                    {activeServiceId ? 'Service Chat' : 'Quick Chat'}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowAvailability(!showAvailability)}
                    className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </button>
                  <button
                    onClick={toggleChat}
                    className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Expert Profile */}
              {activeExpert && (
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={activeExpert.avatar}
                      alt={activeExpert.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
                      activeExpert.status === 'online' ? 'bg-green-500' :
                      activeExpert.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-medium">{activeExpert.name}</h4>
                      <button
                        onClick={() => setShowFeedback(true)}
                        className="flex items-center space-x-1 text-gray-300 hover:text-purple-400"
                      >
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{activeExpert.rating}</span>
                        <span className="text-xs">({activeExpert.totalReviews})</span>
                      </button>
                    </div>
                    <p className="text-sm text-gray-400">{activeExpert.role}</p>
                    <div className="flex items-center mt-1 space-x-1">
                      <Clock className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-green-400">{activeExpert.responseTime}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Availability Schedule */}
              <AnimatePresence>
                {showAvailability && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 bg-gray-700 rounded-lg p-3 overflow-hidden"
                  >
                    <h5 className="text-sm font-medium text-white mb-2">Availability Schedule</h5>
                    <div className="space-y-2">
                      {availability.map((day) => (
                        <div key={day.day} className="text-sm">
                          <p className="text-gray-300">{day.day}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {day.slots.map((slot, index) => (
                              <span
                                key={index}
                                className={`px-2 py-1 rounded text-xs ${
                                  slot.isAvailable
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-gray-600 text-gray-400'
                                }`}
                              >
                                {slot.start} - {slot.end}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800 text-gray-100'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.attachments?.map((attachment) => (
                      <a
                        key={attachment.id}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 flex items-center space-x-2 p-2 bg-gray-700/50 rounded text-sm hover:bg-gray-700"
                      >
                        <Paperclip className="w-4 h-4" />
                        <span className="truncate">{attachment.name}</span>
                        <span className="text-xs opacity-70">
                          {(attachment.size / 1024).toFixed(1)} KB
                        </span>
                      </a>
                    ))}
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      {message.sender === 'user' && (
                        <span className="text-xs opacity-70">
                          {message.status === 'sent' ? '✓' : 
                           message.status === 'delivered' ? '✓✓' : 
                           '✓✓'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isExpertTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 rounded-lg p-3 max-w-[80%]">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Feedback Modal */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gray-900/95 flex items-center justify-center p-4"
                >
                  <div className="bg-gray-800 rounded-lg p-4 w-full max-w-sm">
                    <h4 className="text-white font-medium mb-4">Rate your experience</h4>
                    <div className="flex justify-center space-x-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className={`p-1 ${
                            star <= rating ? 'text-yellow-400' : 'text-gray-500'
                          }`}
                        >
                          <Star className="w-6 h-6 fill-current" />
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your feedback (optional)"
                      className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                      rows={3}
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setShowFeedback(false)}
                        className="px-4 py-2 text-sm text-gray-300 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmitFeedback}
                        disabled={rating === 0}
                        className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Input */}
            <div className="p-4 bg-gray-800 border-t border-gray-700">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={uploading}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={() => handleSendMessage()}
                />
                <button
                  onClick={handleFileClick}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  disabled={uploading}
                >
                  <Paperclip className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors disabled:opacity-50"
                  disabled={uploading}
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 p-4 bg-purple-600 hover:bg-purple-700 rounded-full shadow-lg transition-colors z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-white" />
            {unreadCount > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">{unreadCount}</span>
              </div>
            )}
          </div>
        )}
      </motion.button>
    </>
  );
} 