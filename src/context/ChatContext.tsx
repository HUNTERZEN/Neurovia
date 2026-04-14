import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// ─── Types ───────────────────────────────────────────────
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  quickReplies?: string[];
}

interface ChatContextType {
  messages: Message[];
  isOpen: boolean;
  isTyping: boolean;
  unreadCount: number;
  sendMessage: (content: string) => void;
  toggleChat: () => void;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// ─── Neurovia Knowledge Base ─────────────────────────────
// This is the "brain" of the assistant. All answers come from here.

interface KBEntry {
  keywords: string[];
  answer: string;
  quickReplies?: string[];
}

const KNOWLEDGE_BASE: KBEntry[] = [
  // ── About / General ──
  {
    keywords: ['what is neurovia', 'about neurovia', 'who are you', 'what do you do', 'what does neurovia do', 'tell me about', 'company'],
    answer: "Neurovia is a tech support platform founded in 2024. We connect users with 500+ verified tech experts for instant remote diagnosis, and help you find trusted local repair shops — all available 24/7. Whether you have a software issue, hardware problem, or need professional advice, we've got you covered!",
    quickReplies: ['What services do you offer?', 'How much does it cost?', 'How to get started?']
  },
  // ── Services ──
  {
    keywords: ['services', 'what do you offer', 'features', 'what can you do', 'help with'],
    answer: "We offer three main services:\n\n🖥️ **Remote Diagnosis** — Get instant help from verified tech experts online via chat or video call.\n\n🔧 **Local Repair Shops** — Find trusted, verified repair services near your location.\n\n🎥 **Video Solutions** — Watch step-by-step video tutorials to fix common tech issues yourself.\n\nAll backed by our 500+ verified experts and 24/7 availability!",
    quickReplies: ['Tell me about Remote Help', 'How to find repair shops?', 'Pricing info']
  },
  // ── Remote Help ──
  {
    keywords: ['remote help', 'remote diagnosis', 'remote support', 'online help', 'expert help', 'chat with expert', 'video call'],
    answer: "Our Remote Help service connects you directly with a verified tech expert who can diagnose and fix your issues remotely. Here's how it works:\n\n1. Describe your issue\n2. Get matched with a specialist expert\n3. Connect via chat or video call\n4. Expert resolves your issue in real-time\n\nAverage response time is under 5 minutes!",
    quickReplies: ['How much does it cost?', 'Is it available 24/7?', 'What devices are supported?']
  },
  // ── Repair Shops ──
  {
    keywords: ['repair shop', 'local repair', 'nearby', 'find repair', 'physical repair', 'repair store', 'in person'],
    answer: "Our Repair Shop finder helps you locate trusted, verified repair services near you. All shops in our network are:\n\n✅ Verified and background-checked\n✅ Customer-rated with reviews\n✅ Offering transparent pricing\n✅ Covering everything from phones to laptops to gaming consoles\n\nJust visit the 'Repair Shops' page and enter your location to find available shops!",
    quickReplies: ['Show me services', 'How does verification work?', 'Pricing info']
  },
  // ── Video Solutions ──
  {
    keywords: ['video', 'tutorial', 'video solutions', 'watch', 'learn', 'diy', 'self fix', 'guide'],
    answer: "Our Video Solutions library has step-by-step tutorials for common tech issues. You can browse categories like:\n\n📱 Phone & Tablet fixes\n💻 Computer & Laptop troubleshooting\n🌐 Network & WiFi issues\n🖨️ Printer & peripheral setup\n\nAll videos are created by our verified experts and are completely free to watch!",
    quickReplies: ['Need expert help instead', 'What services do you offer?', 'Contact support']
  },
  // ── Pricing ──
  {
    keywords: ['price', 'pricing', 'cost', 'how much', 'fee', 'payment', 'subscription', 'plan', 'plans', 'monthly'],
    answer: "We offer flexible pricing plans:\n\n💜 **Starter** — $9.99/month — Basic remote support\n💎 **Premium** — $19.99/month — Priority support + video calls\n🏢 **Enterprise** — Custom pricing for organizations\n\n✨ **Free trial**: 7-day trial for new users — no credit card required!\n\nAll plans include a 30-day money-back guarantee.",
    quickReplies: ['Start free trial', 'Do you offer refunds?', 'What\'s included in Premium?']
  },
  // ── Free Trial ──
  {
    keywords: ['free trial', 'try free', 'trial', 'test', 'demo'],
    answer: "Yes! We offer a **7-day free trial** for new users. Here's what you get:\n\n• Full access to remote diagnosis\n• Chat with verified experts\n• Browse video solutions\n• No credit card required\n\nJust sign up and you'll be automatically enrolled!",
    quickReplies: ['Sign up now', 'What happens after trial?', 'Pricing plans']
  },
  // ── Refund ──
  {
    keywords: ['refund', 'money back', 'cancel', 'cancellation', 'return'],
    answer: "Yes, we offer a **30-day money-back guarantee**! If you're not satisfied with our services, you can request a full refund within 30 days of your purchase. To request a refund:\n\n1. Go to your Account Settings\n2. Navigate to Billing\n3. Click 'Request Refund'\n\nOr contact our support team and we'll help you right away.",
    quickReplies: ['Contact support', 'Pricing plans', 'How to reach support?']
  },
  // ── Support / Contact ──
  {
    keywords: ['contact', 'support', 'reach', 'email', 'phone', 'call', 'help me', 'talk to human', 'real person', 'agent'],
    answer: "You can reach our support team through multiple channels:\n\n📧 Email: support@neurovia.com\n📞 Phone: +1 (555) 123-4567\n💬 Live Chat: Right here! I can help with most questions.\n📍 Address: 123 Tech Street, Silicon Valley, CA 94025\n\n**Business Hours:**\n• Mon-Fri: 9:00 AM - 6:00 PM\n• Saturday: 10:00 AM - 4:00 PM\n• Sunday: Closed\n\nFor urgent issues, our chat is available 24/7!",
    quickReplies: ['Pricing info', 'What services do you offer?', 'Start free trial']
  },
  // ── Account / Sign Up ──
  {
    keywords: ['sign up', 'register', 'create account', 'get started', 'join', 'how to start'],
    answer: "Getting started with Neurovia is easy!\n\n1. Click **'Sign Up'** in the top navigation\n2. Enter your name, email, and password\n3. Or use **Google Sign-In** for instant access\n4. Enjoy your 7-day free trial!\n\nYou'll get access to remote diagnosis, expert chat, video solutions, and more.",
    quickReplies: ['What\'s included?', 'Pricing plans', 'Is there a free trial?']
  },
  // ── Login Issues ──
  {
    keywords: ['login', 'sign in', 'can\'t login', 'forgot password', 'password reset', 'locked out'],
    answer: "If you're having trouble logging in:\n\n1. Make sure you're using the correct email/username\n2. Check your password — it's case-sensitive\n3. Try resetting your password via 'Forgot Password'\n4. Clear your browser cache and cookies\n5. Try using Google Sign-In if you registered that way\n\nStill stuck? Contact us at support@neurovia.com and we'll help!",
    quickReplies: ['Contact support', 'Sign up instead', 'More help']
  },
  // ── Partner / Technician ──
  {
    keywords: ['partner', 'become partner', 'technician', 'join as expert', 'register shop', 'work with', 'become expert'],
    answer: "Want to join the Neurovia network? We welcome:\n\n🔧 **Repair Shop Partners** — Register your shop, get verified, and reach more customers\n👨‍💻 **Expert Technicians** — Join our remote support team and help users worldwide\n\nBenefits include increased visibility, steady customer flow, and our platform tools. Visit the 'Register as Partner' page to get started!",
    quickReplies: ['What services do you offer?', 'Pricing info', 'Contact support']
  },
  // ── Devices / Compatibility ──
  {
    keywords: ['device', 'compatible', 'support', 'windows', 'mac', 'android', 'iphone', 'ios', 'laptop', 'phone', 'computer', 'tablet'],
    answer: "We support **all major devices and operating systems**:\n\n💻 Windows, macOS, Linux\n📱 iOS (iPhone/iPad), Android\n🖥️ Desktop & Laptop repairs\n🎮 Gaming consoles\n🖨️ Printers & peripherals\n\nOur experts are certified across multiple platforms and can help with software issues, hardware diagnostics, networking, and more!",
    quickReplies: ['Get expert help', 'Find repair shop', 'Pricing']
  },
  // ── Security / Privacy ──
  {
    keywords: ['security', 'privacy', 'safe', 'secure', 'data', 'protection', 'trust'],
    answer: "Your security is our top priority:\n\n🔒 **End-to-end encryption** on all communications\n🛡️ **Verified experts** — all background-checked\n📋 **Transparent privacy policy** — we never sell your data\n✅ **Secure payments** via industry-standard encryption\n\nYou can review our full Privacy Policy and Terms of Service from the footer links.",
    quickReplies: ['Privacy policy', 'Contact support', 'Services']
  },
  // ── Hours / Availability ──
  {
    keywords: ['hours', 'available', 'open', 'when', '24/7', 'time', 'schedule'],
    answer: "Our availability varies by service:\n\n💬 **AI Chat Assistant (me!)** — 24/7, always here!\n🖥️ **Remote Expert Support** — 24/7 with varying response times\n📞 **Phone Support** — Mon-Fri 9AM-6PM, Sat 10AM-4PM\n🔧 **Repair Shops** — Hours vary by location\n\nFor urgent issues outside business hours, our remote experts are your best bet!",
    quickReplies: ['Get remote help', 'Find repair shop', 'Contact info']
  },
];

// ── Greeting message shown when chat first opens ──
const GREETING_MESSAGE: Message = {
  id: 'greeting',
  content: "👋 Hi there! I'm Neurovia's virtual assistant. I can help you with:\n\n• Our services (Remote Help, Repair Shops, Video Solutions)\n• Pricing and free trial info\n• Account & login questions\n• Finding support\n\nHow can I help you today?",
  sender: 'assistant',
  timestamp: new Date(),
  status: 'read',
  quickReplies: ['What services do you offer?', 'How much does it cost?', 'How to get started?', 'Contact support']
};

// ─── Intent Matching Engine ──────────────────────────────
function findBestMatch(userInput: string): { answer: string; quickReplies?: string[] } {
  const input = userInput.toLowerCase().trim();

  // Check for greetings
  const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'sup', 'yo', 'hola'];
  if (greetings.some(g => input === g || input.startsWith(g + ' ') || input.startsWith(g + '!'))) {
    return {
      answer: "Hello! 👋 Welcome to Neurovia! I'm here to help you with anything — services, pricing, support, or just general questions. What would you like to know?",
      quickReplies: ['What services do you offer?', 'Pricing info', 'Contact support']
    };
  }

  // Check for thanks
  const thanks = ['thank', 'thanks', 'thx', 'ty', 'appreciate'];
  if (thanks.some(t => input.includes(t))) {
    return {
      answer: "You're welcome! 😊 Is there anything else I can help you with?",
      quickReplies: ['Services', 'Pricing', 'Contact support']
    };
  }

  // Check for goodbye
  const goodbyes = ['bye', 'goodbye', 'see you', 'later', 'good night'];
  if (goodbyes.some(g => input.includes(g))) {
    return {
      answer: "Goodbye! 👋 Feel free to come back anytime you need help. Have a great day!",
    };
  }

  // Score each KB entry based on keyword matches
  let bestScore = 0;
  let bestEntry: KBEntry | null = null;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (input.includes(keyword)) {
        // Longer keyword matches are weighted higher for accuracy
        score += keyword.split(' ').length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  if (bestEntry && bestScore > 0) {
    return { answer: bestEntry.answer, quickReplies: bestEntry.quickReplies };
  }

  // Fallback — no match found
  return {
    answer: "I'm not sure I understand that fully, but I'm happy to help! You can ask me about:\n\n• **Services** — Remote Help, Repair Shops, Video Solutions\n• **Pricing** — Plans, free trial, refunds\n• **Account** — Sign up, login help\n• **Support** — Contact info, business hours\n\nOr try rephrasing your question!",
    quickReplies: ['What services do you offer?', 'Pricing info', 'Contact support', 'How to get started?']
  };
}

// ─── Chat Provider ───────────────────────────────────────
export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('neurovia_chat');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
      } catch { return [GREETING_MESSAGE]; }
    }
    return [GREETING_MESSAGE];
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Persist messages
  useEffect(() => {
    localStorage.setItem('neurovia_chat', JSON.stringify(messages));
  }, [messages]);

  // Unread count
  useEffect(() => {
    if (!isOpen) {
      const unread = messages.filter(m => m.sender === 'assistant' && m.status === 'delivered').length;
      setUnreadCount(unread);
    }
  }, [messages, isOpen]);

  const sendMessage = useCallback((content: string) => {
    if (!content.trim()) return;

    const userMsg: Message = {
      id: `user_${Date.now()}`,
      content: content.trim(),
      sender: 'user',
      timestamp: new Date(),
      status: 'sent',
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate natural typing delay (600ms-1500ms based on response length)
    const match = findBestMatch(content);
    const delay = Math.min(600 + match.answer.length * 3, 1800);

    setTimeout(() => {
      setIsTyping(false);
      const assistantMsg: Message = {
        id: `bot_${Date.now()}`,
        content: match.answer,
        sender: 'assistant',
        timestamp: new Date(),
        status: isOpen ? 'read' : 'delivered',
        quickReplies: match.quickReplies,
      };
      setMessages(prev => [...prev, assistantMsg]);
    }, delay);
  }, [isOpen]);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => {
      const opening = !prev;
      if (opening) {
        // Mark all as read
        setMessages(msgs =>
          msgs.map(m => m.sender === 'assistant' ? { ...m, status: 'read' as const } : m)
        );
        setUnreadCount(0);
      }
      return opening;
    });
  }, []);

  const clearChat = useCallback(() => {
    setMessages([GREETING_MESSAGE]);
  }, []);

  return (
    <ChatContext.Provider value={{
      messages,
      isOpen,
      isTyping,
      unreadCount,
      sendMessage,
      toggleChat,
      clearChat,
    }}>
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