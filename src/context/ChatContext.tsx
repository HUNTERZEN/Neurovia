import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'expert';
  timestamp: Date;
  serviceId?: string;
  status: 'sent' | 'delivered' | 'read';
  attachments?: FileAttachment[];
}

interface FileAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

interface Expert {
  id: string;
  name: string;
  avatar: string;
  role: string;
  specialties: string[];
  rating: number;
  status: 'online' | 'offline' | 'busy';
  responseTime: string;
  availability: AvailabilitySlot[];
  totalReviews: number;
}

interface AvailabilitySlot {
  day: string;
  slots: TimeSlot[];
}

interface TimeSlot {
  start: string;
  end: string;
  isAvailable: boolean;
}

interface Feedback {
  id: string;
  rating: number;
  comment: string;
  timestamp: Date;
  serviceId?: string;
}

interface Notification {
  id: string;
  message: string;
  type: 'message' | 'status' | 'system';
  timestamp: Date;
  read: boolean;
}

interface ChatContextType {
  messages: Message[];
  isOpen: boolean;
  activeServiceId: string | null;
  activeExpert: Expert | null;
  isExpertTyping: boolean;
  notifications: Notification[];
  unreadCount: number;
  feedback: Feedback | null;
  sendMessage: (content: string, serviceId?: string, attachments?: FileAttachment[]) => void;
  toggleChat: () => void;
  setActiveService: (serviceId: string | null) => void;
  markNotificationAsRead: (id: string) => void;
  clearUnreadCount: () => void;
  submitFeedback: (rating: number, comment: string) => void;
  uploadFile: (file: File) => Promise<FileAttachment>;
  getExpertAvailability: (expertId: string) => AvailabilitySlot[];
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Mock expert data with availability
const mockExpert: Expert = {
  id: 'exp1',
  name: 'Sarah Johnson',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  role: 'Senior Technical Support',
  specialties: ['Windows', 'MacOS', 'Networking'],
  rating: 4.9,
  status: 'online',
  responseTime: '< 5 min',
  totalReviews: 128,
  availability: [
    {
      day: 'Monday',
      slots: [
        { start: '09:00', end: '12:00', isAvailable: true },
        { start: '13:00', end: '17:00', isAvailable: true }
      ]
    },
    // ... more days
  ]
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load chat history from localStorage
    const savedMessages = localStorage.getItem('chatHistory');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [isOpen, setIsOpen] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [activeExpert, setActiveExpert] = useState<Expert | null>(mockExpert);
  const [isExpertTyping, setIsExpertTyping] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  // Update unread count when new messages arrive
  useEffect(() => {
    if (!isOpen) {
      const newUnreadCount = messages.filter(
        (m) => m.sender === 'expert' && m.status === 'delivered'
      ).length;
      setUnreadCount(newUnreadCount);
    }
  }, [messages, isOpen]);

  const uploadFile = useCallback(async (file: File): Promise<FileAttachment> => {
    // Simulate file upload - in production, implement actual file upload logic
    return new Promise((resolve) => {
      setTimeout(() => {
        const attachment: FileAttachment = {
          id: Date.now().toString(),
          name: file.name,
          type: file.type,
          size: file.size,
          url: URL.createObjectURL(file)
        };
        resolve(attachment);
      }, 1000);
    });
  }, []);

  const sendMessage = useCallback(async (content: string, serviceId?: string, attachments: FileAttachment[] = []) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      serviceId,
      status: 'sent',
      attachments
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate expert typing
    setIsExpertTyping(true);

    // Simulate expert response
    setTimeout(() => {
      setIsExpertTyping(false);
      const expertResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand your concern. Let me help you with that right away.",
        sender: 'expert',
        timestamp: new Date(),
        serviceId,
        status: 'delivered'
      };
      setMessages(prev => [...prev, expertResponse]);

      // Create notification if chat is closed
      if (!isOpen) {
        const notification: Notification = {
          id: Date.now().toString(),
          message: 'New message from Sarah',
          type: 'message',
          timestamp: new Date(),
          read: false
        };
        setNotifications(prev => [...prev, notification]);
      }
    }, 2000);
  }, [isOpen]);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      // Mark all messages as read when opening chat
      setMessages(prev =>
        prev.map(m => ({
          ...m,
          status: m.sender === 'expert' ? 'read' : m.status
        }))
      );
      setUnreadCount(0);
    }
  }, [isOpen]);

  const setActiveService = useCallback((serviceId: string | null) => {
    setActiveServiceId(serviceId);
    setIsOpen(true);
  }, []);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const clearUnreadCount = useCallback(() => {
    setUnreadCount(0);
  }, []);

  const submitFeedback = useCallback((rating: number, comment: string) => {
    const newFeedback: Feedback = {
      id: Date.now().toString(),
      rating,
      comment,
      timestamp: new Date(),
      serviceId: activeServiceId || undefined
    };
    setFeedback(newFeedback);
    
    // Update expert's rating (in production, this would be handled by the backend)
    if (activeExpert) {
      const newRating = ((activeExpert.rating * activeExpert.totalReviews) + rating) / (activeExpert.totalReviews + 1);
      setActiveExpert(prev => prev ? {
        ...prev,
        rating: Number(newRating.toFixed(1)),
        totalReviews: prev.totalReviews + 1
      } : null);
    }
  }, [activeServiceId, activeExpert]);

  const getExpertAvailability = useCallback((expertId: string) => {
    // In production, this would fetch from the backend
    return activeExpert?.availability || [];
  }, [activeExpert]);

  return (
    <ChatContext.Provider 
      value={{ 
        messages, 
        isOpen, 
        activeServiceId,
        activeExpert,
        isExpertTyping,
        notifications,
        unreadCount,
        feedback,
        sendMessage, 
        toggleChat,
        setActiveService,
        markNotificationAsRead,
        clearUnreadCount,
        submitFeedback,
        uploadFile,
        getExpertAvailability
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
} 