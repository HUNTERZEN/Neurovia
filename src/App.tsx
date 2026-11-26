import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext
} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';

// Individual component imports
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Founders } from './components/Founders';
import { Members } from './components/Members';
import { Footer } from './components/Footer';
import { FeedbackSection } from './components/FeedbackSection';
import { SplashScreen } from './components/SplashScreen';
import { NeuroviaHome } from './components/NeuroviaHome';
import { WelcomeToast, WelcomeToastData } from './components/WelcomeToast';

// Individual page imports
import { About } from './pages/About';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from './pages/ForgotPassword';
import API_BASE_URL from './config/api';
import { RepairShops } from './pages/RepairShops';
import { GetRemoteHelp } from './pages/GetRemoteHelp';
import { FAQ } from './pages/FAQ';
import { VideoSolutions } from './pages/VideoSolutions';
import { PrivacyPolicy } from './pages/policies/PrivacyPolicy';
import { CookiePolicy } from './pages/policies/CookiePolicy';
import { TermsOfService } from './pages/policies/TermsOfService';
import { RefundPolicy } from './pages/policies/RefundPolicy';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Blog from './pages/Blog';
import BookSupport from './pages/BookSupport';
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
import { Users as AdminUsers } from './pages/admin/Users';
import { AdminOperationsPage } from './pages/admin/Tickets';
import { ProtectedRoute as AdminProtectedRoute } from './components/admin/ProtectedRoute';
import { ChatProvider } from './context/ChatContext';
import { IntegratedChat } from './components/chat/IntegratedChat';

/* ----------  Auth Context ---------- */

interface User {
  id: number | string;
  username: string;
  email: string;
  name?: string; 
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, userData: User, options?: { isNewUser?: boolean }) => void;
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

// Pages that must only be visible to signed-in users (email/password or Google)
const PRIVATE_PATH_PREFIXES = ['/profile', '/partner', '/register-partner'];
const isPrivatePath = (path: string) =>
  PRIVATE_PATH_PREFIXES.some(p => path === p || path.startsWith(p + '/'));

const POST_LOGIN_REDIRECT_KEY = 'postLoginRedirect';

interface UserProtectedRouteProps {
  children: React.ReactNode;
}

function UserProtectedRoute({ children }: UserProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  if (loading) return <SplashScreen message="Checking authentication..." />;
  if (!isAuthenticated) {
    // Remember where the user wanted to go so we can send them back after sign-in
    const from = location.pathname + location.search;
    sessionStorage.setItem(POST_LOGIN_REDIRECT_KEY, from);
    return <Navigate to="/signin" replace state={{ from }} />;
  }
  return <>{children}</>;
}

// Sign in / sign up pages: if already signed in, send the user to where they were headed
function GuestOnlyRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (isAuthenticated) {
    const from = (location.state as { from?: string } | null)?.from || '/';
    return <Navigate to={from} replace />;
  }
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

function NotFound() {
  return (
    <div className="nv-notfound">
      <h1>404</h1>
      <p>This page doesn't exist or has moved.</p>
      <Link to="/" className="nv-btn-primary">Back to home →</Link>
    </div>
  );
}

// Gentle fade between pages for a smoother feel
function PageTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return <div key={pathname} className="nv-page-enter">{children}</div>;
}

/* ----------  Main App Component ---------- */

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSplash] = useState(false);
  const [welcomeToast, setWelcomeToast] = useState<WelcomeToastData | null>(null);

  // ✅ Centralized API URL resolver (handles local dev, Vercel rewrites, and Render)
  const API_URL = API_BASE_URL;

  const triggerWelcomeToast = useCallback((toastData: WelcomeToastData, duration = 6500) => {
    setWelcomeToast(toastData);
    setTimeout(() => {
      setWelcomeToast((current) => (current === toastData ? null : current));
    }, duration);
  }, []);

  /* ----- fetch profile ----- */
  const fetchUserProfile = useCallback(
    async (token: string, welcomeMode?: 'new' | 'back' | null): Promise<void> => {
      try {
        const res = await fetch(`${API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Bad token');
        const data = await res.json();
        const displayName = data.user.fullName || data.user.username || data.user.name || 'Member';
        setUser({ ...data.user, name: displayName });
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userData', JSON.stringify(data.user));

        if (welcomeMode) {
          sessionStorage.setItem('nvWelcomedSession', 'true');
          triggerWelcomeToast({
            kind: welcomeMode,
            name: displayName,
            email: data.user.email,
          });
        } else if (!sessionStorage.getItem('nvWelcomedSession')) {
          sessionStorage.setItem('nvWelcomedSession', 'true');
          triggerWelcomeToast({
            kind: 'back',
            name: displayName,
            email: data.user.email,
          });
        }
      } catch (err) {
        console.error('Profile fetch failed:', err);
        localStorage.removeItem('authToken');
        localStorage.setItem('isAuthenticated', 'false');
        localStorage.removeItem('userData');
        setUser(null);
        setIsAuthenticated(false);
      }
    },
    [API_URL, triggerWelcomeToast]
  );

  /* ----- auth check ----- */
  const checkAuthStatus = useCallback(async (): Promise<void> => {
    try {
      // Google OAuth: backend redirects back with ?token=...&welcome=new|back
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get('token');
      const welcomeParam = params.get('welcome');
      let oauthWelcomeMode: 'new' | 'back' | null = null;

      if (urlToken) {
        localStorage.setItem('authToken', urlToken);
        oauthWelcomeMode = welcomeParam === 'new' ? 'new' : 'back';
        const redirectTo = sessionStorage.getItem(POST_LOGIN_REDIRECT_KEY) || window.location.pathname;
        sessionStorage.removeItem(POST_LOGIN_REDIRECT_KEY);
        window.history.replaceState({}, document.title, redirectTo);
      }

      const stored = localStorage.getItem('authToken');
      if (stored) {
        await fetchUserProfile(stored, oauthWelcomeMode);
      } else {
        const res = await fetch(`${API_URL}/api/auth/check`, { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            const displayName = data.user.name || data.user.username || 'Member';
            setUser(data.user);
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userData', JSON.stringify(data.user));
            if (!sessionStorage.getItem('nvWelcomedSession')) {
              sessionStorage.setItem('nvWelcomedSession', 'true');
              triggerWelcomeToast({
                kind: 'back',
                name: displayName,
                email: data.user.email,
              });
            }
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
  }, [API_URL, fetchUserProfile, triggerWelcomeToast]);

  useEffect(() => { 
    checkAuthStatus(); 
  }, [checkAuthStatus]);

  const login = (token: string, userData: User, options?: { isNewUser?: boolean }) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
    sessionStorage.removeItem(POST_LOGIN_REDIRECT_KEY);
    sessionStorage.setItem('nvWelcomedSession', 'true');
    setUser(userData);
    setIsAuthenticated(true);

    const displayName = userData.name || userData.username || 'Member';
    triggerWelcomeToast({
      kind: options?.isNewUser ? 'new' : 'back',
      name: displayName,
      email: userData.email,
    });
  };

  const logout = useCallback(async () => {
    localStorage.removeItem('authToken');
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('userData');
    sessionStorage.removeItem('nvWelcomedSession');

    // Leaving a private page? Send the user home instead of the sign-in screen
    if (isPrivatePath(window.location.pathname)) {
      window.history.replaceState({}, document.title, '/');
    }

    setUser(null);
    setIsAuthenticated(false);
    triggerWelcomeToast(
      {
        kind: 'signout',
        name: 'Signed out',
        subtitle: 'You have been signed out of your Neurovia account.',
      },
      3500
    );
    
    try {
      await fetch(`${API_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include' 
      });
    } catch (error) {
      console.error('Server logout error:', error);
    }
  }, [API_URL, triggerWelcomeToast]);

  const handleUpdateProfile = useCallback((updatedData: Partial<User>) => {
    if (user) {
      const updatedUser: User = { ...user, ...updatedData, id: user.id };
      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      triggerWelcomeToast(
        {
          kind: 'info',
          name: 'Profile updated!',
          subtitle: 'Your account details have been saved.',
        },
        3500
      );
    }
  }, [user, triggerWelcomeToast]);

  const value: AuthContextType = { user, isAuthenticated, login, logout, loading, showSplash };

  if (loading) return <SplashScreen message="Initializing Neurovia..." />;

  return (
    <AuthContext.Provider value={value}>
      <ProfileProvider>
        <ChatProvider>
          <Router>
            <ScrollToTop />
            <WelcomeToast toast={welcomeToast} onDismiss={() => setWelcomeToast(null)} />
            <div className="min-h-screen bg-black">
              <PageTransition>
              <Routes>
                <Route path="/technician/signin" element={<TechnicianSignIn />} />
                <Route path="/technician/dashboard" element={<TechnicianProtectedRoute><TechnicianDashboard /></TechnicianProtectedRoute>} />
                <Route path="/technician/profile" element={<TechnicianProtectedRoute><TechnicianProfile /></TechnicianProtectedRoute>} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/*" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
                  <Route index element={<Dashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="shops" element={<AdminOperationsPage mode="shops" />} />
                  <Route path="tickets" element={<AdminOperationsPage mode="tickets" />} />
                  <Route path="analytics" element={<AdminOperationsPage mode="payments" />} />
                  <Route path="settings" element={<AdminOperationsPage mode="beta" />} />
                </Route>
                <Route path="/signin" element={<GuestOnlyRoute><SignIn /></GuestOnlyRoute>} />
                <Route path="/signup" element={<GuestOnlyRoute><SignUp /></GuestOnlyRoute>} />
                <Route path="/forgot-password" element={<><Navbar /><ForgotPassword /><Footer /></>} />
                <Route path="/reset-password" element={<><Navbar /><ForgotPassword /><Footer /></>} />
                <Route path="/register-partner" element={<UserProtectedRoute><Navbar /><RegisterPartner /><Footer /></UserProtectedRoute>} />
                <Route path="/partner/dashboard" element={<UserProtectedRoute><PartnerDashboard /></UserProtectedRoute>} />
                <Route path="/partner/*" element={<UserProtectedRoute><Navigate to="/partner/dashboard" replace /></UserProtectedRoute>} />
                <Route path="/profile" element={<UserProtectedRoute><Navbar /><ProfilePage user={{ name: user?.username || user?.name || 'User', email: user?.email || '' }} onUpdateProfile={handleUpdateProfile} /><Footer /></UserProtectedRoute>} />
                <Route path="/" element={<><Navbar /><NeuroviaHome /><Footer /></>} />
                <Route path="/services" element={<><Navbar /><Services /><Footer /></>} />
                <Route path="/blog" element={<><Navbar /><Blog /><Footer /></>} />
                <Route path="/book" element={<><Navbar /><BookSupport /><Footer /></>} />
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
                <Route path="*" element={<><Navbar /><NotFound /><Footer /></>} />
              </Routes>
              </PageTransition>
              <IntegratedChat />
            </div>
          </Router>
        </ChatProvider>
      </ProfileProvider>
    </AuthContext.Provider>
  );
}