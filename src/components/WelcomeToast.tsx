import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, X, ArrowRight, User } from 'lucide-react';

export interface WelcomeToastData {
  kind: 'new' | 'back' | 'signout' | 'info';
  name: string;
  email?: string;
  subtitle?: string;
}

interface WelcomeToastProps {
  toast: WelcomeToastData | null;
  onDismiss: () => void;
}

export function WelcomeToast({ toast, onDismiss }: WelcomeToastProps) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={`${toast.kind}-${toast.name}`}
          initial={{ opacity: 0, y: -24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -18, scale: 0.96 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-20 sm:top-24 right-4 sm:right-6 z-[9990] w-[calc(100vw-2rem)] max-w-sm"
          role="status"
          aria-live="polite"
        >
          <div className="relative overflow-hidden rounded-2xl bg-[#121216]/95 backdrop-blur-xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.75)] p-4 sm:p-5 text-[#e8e8e8]">
            {/* Top accent gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#4f7fff] via-[#8bb4ff] to-emerald-400" />

            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss notification"
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[#888888] hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-start gap-3.5 pr-6">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                  toast.kind === 'new'
                    ? 'bg-[#4f7fff]/15 border-[#4f7fff]/35 text-[#8bb4ff]'
                    : 'bg-emerald-500/15 border-emerald-500/35 text-emerald-400'
                }`}
              >
                {toast.kind === 'new' ? (
                  <Sparkles className="w-5 h-5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#8bb4ff] mb-0.5">
                  {toast.kind === 'new'
                    ? 'Account Created · Welcome'
                    : toast.kind === 'signout'
                    ? 'Session Ended'
                    : toast.kind === 'info'
                    ? 'Account Updated'
                    : 'Signed In · Verified'}
                </span>

                <h4 className="font-['Syne'] text-base sm:text-lg font-bold text-white leading-snug truncate">
                  {toast.kind === 'new'
                    ? `Welcome to Neurovia, ${toast.name}!`
                    : toast.kind === 'signout'
                    ? 'Signed out safely'
                    : toast.kind === 'info'
                    ? toast.name
                    : `Welcome back, ${toast.name}!`}
                </h4>

                <p className="text-xs text-[#9d9da8] mt-1 leading-relaxed">
                  {toast.subtitle
                    ? toast.subtitle
                    : toast.kind === 'new'
                    ? `Your account is active${toast.email ? ` (${toast.email})` : ''} — we've sent a welcome guide to your inbox.`
                    : toast.email
                    ? `Signed in as ${toast.email}`
                    : 'Your Neurovia Nexus session is active.'}
                </p>

                {(toast.kind === 'new' || toast.kind === 'back') && (
                  <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-white/[0.08]">
                    <Link
                      to="/services"
                      onClick={onDismiss}
                      className="text-xs font-semibold text-white hover:text-[#8bb4ff] inline-flex items-center gap-1 transition-colors"
                    >
                      Explore Services <ArrowRight className="w-3 h-3" />
                    </Link>
                    <span className="text-white/20">·</span>
                    <Link
                      to="/profile"
                      onClick={onDismiss}
                      className="text-xs font-medium text-[#9d9da8] hover:text-white inline-flex items-center gap-1 transition-colors"
                    >
                      <User className="w-3 h-3" /> Profile
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

