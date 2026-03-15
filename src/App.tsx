import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext
} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Individual component imports
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Founders } from './components/Founders';
import { Members } from './components/Members';
import { Footer } from './components/Footer';
import { FeedbackSection } from './components/FeedbackSection';
import { SplashScreen } from './components/SplashScreen';

// Individual page imports
import { About } from './pages/About';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { RepairShops } from './pages/RepairShops';
import { GetRemoteHelp } from './pages/GetRemoteHelp';
import { FAQ } from './pages/FAQ';
import { VideoSolutions } from './pages/VideoSolutions';
import { PrivacyPolicy } from './pages/policies/PrivacyPolicy';
import { CookiePolicy } from './pages/policies/CookiePolicy';
import { TermsOfService } from './pages/policies/TermsOfService';
import { RefundPolicy } from './pages/policies/RefundPolicy';
import Contact from './pages/Contact';
import { ProfilePage } from './components/ProfilePage';
import { ProfileProvider } from './context/ProfileContext';

// Technician page imports
import { TechnicianSignIn } from './pages/technician/TechnicianSignIn';
import { TechnicianDashboard } from './pages/technician/TechnicianDashboard';
import { TechnicianProfile } from './pages/technician/TechnicianProfile';

// Partner page imports
import { RegisterPartner } from './pages/partner/RegisterPartner';
import { PartnerDashboard } from './pages/partner/PartnerDashboard';

// Hook and other imports
import { useScrollToTop } from './hooks/useScrollToTop';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { ProtectedRoute as AdminProtectedRoute } from './components/admin/ProtectedRoute';
import { ChatProvider } from './context/ChatContext';
import { IntegratedChat } from './components/chat/IntegratedChat';

/* ----------  Auth Context ---------- */

interface User {
  id: number;
  username: string;
  email: string;
  name?: string; 
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  loading: boolean;
  showSplash: boolean; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
};

/* ----------  Protected Route Components ---------- */

interface UserProtectedRouteProps {
  children: React.ReactNode;
}

function UserProtectedRoute({ children }: UserProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <SplashScreen message="Checking authentication..." />;
  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  return <>{children}</>;
}

interface TechnicianProtectedRouteProps {
  children: React.ReactNode;
}

function TechnicianProtectedRoute({ children }: TechnicianProtectedRouteProps) {
  const token = localStorage.getItem('technicianToken');
  if (!token) return <Navigate to="/technician/signin" replace />;
  return <>{children}</>;
}

function ScrollToTop() {
  useScrollToTop();
  return null;
}

/* ----------  Main App Component ---------- */

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(false); 
  const [splashMessage, setSplashMessage] = useState('Loading...');

  // ✅ DYNAMIC API URL: Prioritizes Vercel Env Var, falls back to Render URL
  const API_URL = import.meta.env.VITE_API_URL || 'https://neurovia-backend.onrender.com';

  const showSplashScreen = (message: string, duration: number = 2000) => {
    setSplashMessage(message);
    setShowSplash(true);
    setTimeout(() => {
      setShowSplash(false);
    }, duration);
  };

  /* ----- fetch profile ----- */
  const fetchUserProfile = useCallback(
    async (token: string): Promise<void> => {
      try {
        const res = await fetch(`${API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Bad token');
        const data = await res.json();
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userData', JSON.stringify(data.user));
        showSplashScreen(`Welcome back, ${data.user.username || data.user.name || 'User'}!`, 2500);
      } catch (err) {
        console.error('Profile fetch failed:', err);
        localStorage.removeItem('authToken');
        localStorage.setItem('isAuthenticated', 'false');
        localStorage.removeItem('userData');
        setUser(null);
        setIsAuthenticated(false);
      }
    },
    [API_URL]
  );

  /* ----- auth check ----- */
  const checkAuthStatus = useCallback(async (): Promise<void> => {
    try {
      const stored = localStorage.getItem('authToken');
      if (stored) {
        await fetchUserProfile(stored);
      } else {
        const res = await fetch(`${API_URL}/api/auth/check`, { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setUser(data.user);
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userData', JSON.stringify(data.user));
            showSplashScreen(`Welcome back, ${data.user.username || data.user.name || 'User'}!`, 2500);
          } else {
            localStorage.setItem('isAuthenticated', 'false');
          }
        }
      }
    } catch (e) {
      console.error('Auth check error:', e);
    } finally {
      setLoading(false);
    }
  }, [API_URL, fetchUserProfile]);

  useEffect(() => { 
    checkAuthStatus(); 
  }, [checkAuthStatus]);

  /* ----- Google OAuth Token Capture ----- */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tk = params.get('token');
    if (tk) {
      localStorage.setItem('authToken', tk);
      window.history.replaceState({}, document.title, window.location.pathname);
      fetchUserProfile(tk);
    }
  }, [fetchUserProfile]);

  const login = (token: string, userData: User) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    showSplashScreen(`Welcome, ${userData.username || userData.name || 'User'}!`, 3000);
  };

  const logout = useCallback(async () => {
    showSplashScreen('Signing you out...', 2000);
    localStorage.removeItem('authToken');
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('userData');
    
    setTimeout(() => {
      setUser(null);
      setIsAuthenticated(false);
    }, 1000);
    
    try {
      await fetch(`${API_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include' 
      });
    } catch (error) {
      console.error('Server logout error:', error);
    }
  }, [API_URL]);

  const handleUpdateProfile = useCallback((updatedData: Partial<User>) => {
    if (user && typeof user.id === 'number') {
      const updatedUser: User = { ...user, ...updatedData, id: user.id };
      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      showSplashScreen('Profile updated successfully!', 2000);
    }
  }, [user]);

  const value: AuthContextType = { user, isAuthenticated, login, logout, loading, showSplash };

  if (loading) return <SplashScreen message="Initializing Neurovia..." />;
  if (showSplash) return <SplashScreen message={splashMessage} />;

  return (
    <AuthContext.Provider value={value}>
      <ProfileProvider>
        <ChatProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-black">
              <Routes>
                <Route path="/technician/signin" element={<TechnicianSignIn />} />
                <Route path="/technician/dashboard" element={<TechnicianProtectedRoute><TechnicianDashboard /></TechnicianProtectedRoute>} />
                <Route path="/technician/profile" element={<TechnicianProtectedRoute><TechnicianProfile /></TechnicianProtectedRoute>} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/*" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
                  <Route index element={<Dashboard />} />
                  <Route path="users" element={<div className="text-white p-8">Users Page</div>} />
                  <Route path="shops" element={<div className="text-white p-8">Shops Page</div>} />
                  <Route path="tickets" element={<div className="text-white p-8">Tickets Page</div>} />
                  <Route path="analytics" element={<div className="text-white p-8">Analytics Page</div>} />
                  <Route path="settings" element={<div className="text-white p-8">Settings Page</div>} />
                </Route>
                <Route path="/signin" element={isAuthenticated ? <Navigate to="/" replace /> : <SignIn />} />
                <Route path="/signup" element={isAuthenticated ? <Navigate to="/" replace /> : <SignUp />} />
                <Route path="/register-partner" element={<UserProtectedRoute><Navbar /><RegisterPartner /><Footer /></UserProtectedRoute>} />
                <Route path="/partner/dashboard" element={<UserProtectedRoute><PartnerDashboard /></UserProtectedRoute>} />
                <Route path="/profile" element={<UserProtectedRoute><Navbar /><ProfilePage user={{ name: user?.username || user?.name || 'User', email: user?.email || '' }} onUpdateProfile={handleUpdateProfile} /><Footer /></UserProtectedRoute>} />
                <Route path="/" element={<><Navbar /><Hero /><Features /><Founders /><FeedbackSection /><Members /><Footer /></>} />
                <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
                <Route path="/repair-shops" element={<><Navbar /><RepairShops /><Footer /></>} />
                <Route path="/remote-help" element={<><Navbar /><GetRemoteHelp /><Footer /></>} />
                <Route path="/video-solutions" element={<><Navbar /><VideoSolutions /><Footer /></>} />
                <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
                <Route path="/faq" element={<><Navbar /><FAQ /><Footer /></>} />
                <Route path="/privacy" element={<><Navbar /><PrivacyPolicy /><Footer /></>} />
                <Route path="/cookies" element={<><Navbar /><CookiePolicy /><Footer /></>} />
                <Route path="/terms" element={<><Navbar /><TermsOfService /><Footer /></>} />
                <Route path="/refund" element={<><Navbar /><RefundPolicy /><Footer /></>} />
              </Routes>
              <IntegratedChat />
            </div>
          </Router>
        </ChatProvider>
      </ProfileProvider>
    </AuthContext.Provider>
  );
}