import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Shield, CreditCard, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import API_BASE_URL from '../config/api';
import { ServicePackage } from '../data/serviceCatalog';
import { loadRazorpayScript } from '../utils/razorpay';
import { useAuth } from '../App';

export interface VerifiedPaymentReceipt {
  receiptNumber: string;
  orderId: string;
  paymentId: string;
  serviceTitle: string;
  serviceCategory: string;
  amountInr: number;
  currency: string;
  customerEmail: string;
  paidAt: string;
}

interface RazorpayCheckoutModalProps {
  service: ServicePackage | null;
  onClose: () => void;
  bookingNumber?: string;
  initialCustomer?: {
    name?: string;
    email?: string;
    phone?: string;
    notes?: string;
  };
  onPaymentSuccess?: (receipt: VerifiedPaymentReceipt) => void;
}

export function RazorpayCheckoutModal({
  service,
  onClose,
  bookingNumber,
  initialCustomer,
  onPaymentSuccess,
}: RazorpayCheckoutModalProps) {
  const { user } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [notConfigured, setNotConfigured] = useState(false);
  const [receipt, setReceipt] = useState<VerifiedPaymentReceipt | null>(null);

  useEffect(() => {
    if (!service) return;
    setName(initialCustomer?.name || user?.name || user?.username || '');
    setEmail(initialCustomer?.email || user?.email || '');
    setPhone(initialCustomer?.phone || '');
    setNotes(initialCustomer?.notes || '');
    setError('');
    setNotConfigured(false);
    setReceipt(null);
  }, [service, user, initialCustomer]);

  useEffect(() => {
    if (!service) return;
    document.body.classList.add('nv-scroll-lock');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !processing) onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('nv-scroll-lock');
      document.removeEventListener('keydown', onKey);
    };
  }, [service, processing, onClose]);

  if (!service) return null;

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNotConfigured(false);

    if (!name.trim() || name.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address for your receipt.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setProcessing(true);

    try {
      const token = localStorage.getItem('authToken');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      // 1. Create order on backend (server-verified pricing)
      const orderRes = await fetch(`${API_BASE_URL}/api/payments/create-order`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          serviceId: service.id,
          customerName: name.trim(),
          customerEmail: email.trim(),
          customerPhone: phone.trim(),
          notes: notes.trim(),
          bookingNumber: bookingNumber || '',
        }),
      });

      const orderData = await orderRes.json().catch(() => ({}));
      if (!orderRes.ok) {
        if (orderData?.code === 'RAZORPAY_NOT_CONFIGURED' || orderRes.status === 503) {
          setNotConfigured(true);
        }
        setError(orderData?.error || 'Could not initialize payment order.');
        setProcessing(false);
        return;
      }

      // 2. Load Razorpay Checkout SDK
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded || !window.Razorpay) {
        setError('Unable to load Razorpay Checkout. Please check your internet connection.');
        setProcessing(false);
        return;
      }

      // 3. Open Razorpay Checkout Modal
      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Neurovia Nexus',
        description: `${service.title} (${service.category})`,
        order_id: orderData.orderId,
        prefill: {
          name: name.trim(),
          email: email.trim(),
          contact: phone.trim(),
        },
        notes: {
          serviceId: service.id,
          receiptNumber: orderData.receiptNumber,
        },
        theme: {
          color: '#4f7fff',
          backdrop_color: 'rgba(8, 8, 8, 0.85)',
        },
        modal: {
          ondismiss: () => {
            setProcessing(false);
          },
        },
        handler: async (response) => {
          try {
            const verifyRes = await fetch(`${API_BASE_URL}/api/payments/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json().catch(() => ({}));
            if (verifyRes.ok && verifyData.verified) {
              setReceipt(verifyData.receipt);
              onPaymentSuccess?.(verifyData.receipt);
            } else {
              setError(verifyData?.error || 'Payment signature verification failed. Please contact support.');
            }
          } catch {
            setError('Network error while verifying payment. Please contact support with your Payment ID.');
          } finally {
            setProcessing(false);
          }
        },
      });

      rzp.on('payment.failed', (resp: any) => {
        setError(resp?.error?.description || 'Payment failed or was declined. Please try again.');
        setProcessing(false);
      });

      rzp.open();
    } catch {
      setError('Could not connect to the payment server. Please ensure the backend is running.');
      setProcessing(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={() => !processing && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-lg bg-[#121214] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#e8e8e8] relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={processing}
          aria-label="Close"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {receipt ? (
          /* ── VERIFIED RECEIPT VIEW ── */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-9 h-9 text-emerald-400" />
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-3">
              Payment Verified ✓
            </span>
            <h3 className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-white mb-2">
              ₹{receipt.amountInr.toLocaleString('en-IN')} Paid
            </h3>
            <p className="text-xs text-[#888888] mb-6">
              A payment receipt has been sent to <span className="text-white">{receipt.customerEmail}</span>.
            </p>

            <div className="bg-[#18181c] border border-white/10 rounded-2xl p-4 text-left text-xs space-y-2.5 mb-6">
              <div className="flex justify-between gap-3">
                <span className="text-[#888888]">Receipt No.</span>
                <span className="text-emerald-400 font-semibold font-mono">{receipt.receiptNumber}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#888888]">Service</span>
                <span className="text-white font-medium text-right">{receipt.serviceTitle}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#888888]">Payment ID</span>
                <span className="text-white font-mono">{receipt.paymentId}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#888888]">Order ID</span>
                <span className="text-[#aaaaaa] font-mono">{receipt.orderId}</span>
              </div>
            </div>

            <button type="button" onClick={onClose} className="nv-btn-primary !w-full">
              Done →
            </button>
          </div>
        ) : (
          /* ── CHECKOUT FORM VIEW ── */
          <>
            <div className="mb-6 pr-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#4f7fff]/15 border border-[#4f7fff]/30 text-[#8bb4ff] text-[11px] font-semibold uppercase tracking-wider mb-2.5">
                <Sparkles className="w-3 h-3" /> {service.category}
              </div>
              <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold text-white leading-snug">
                {service.title}
              </h3>
              <p className="text-xs text-[#888888] mt-1">{service.subtitle}</p>
            </div>

            <div className="flex items-center justify-between bg-[#18181c] border border-white/10 rounded-2xl px-5 py-4 mb-6">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#888888] block">Total Payable</span>
                <span className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-white">
                  ₹{service.amountInr.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#888888] ml-1.5">INR · {service.duration}</span>
              </div>
              <div className="text-right text-[11px] text-emerald-400 font-medium">
                <div>UPI · GPay · Cards</div>
                <div className="text-[#888888]">Powered by Razorpay</div>
              </div>
            </div>

            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-xs text-red-300 space-y-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                  <span>{error}</span>
                </div>
                {notConfigured && (
                  <div className="pt-1 pl-6">
                    <Link
                      to={`/book?service=${encodeURIComponent(service.id)}`}
                      onClick={onClose}
                      className="text-white underline font-semibold hover:text-[#8bb4ff]"
                    >
                      Book with Pay-After-Fix instead →
                    </Link>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handlePayNow} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#888888] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    disabled={processing}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#555555] focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#888888] mb-1.5">
                    Phone (UPI / WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={14}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    disabled={processing}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#555555] focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#888888] mb-1.5">
                  Email for Receipt *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={processing}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#555555] focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#888888] mb-1.5">
                  Device / Issue Note (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Brief note about your device or requirement..."
                  disabled={processing}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#555555] focus:outline-none focus:border-white/30"
                />
              </div>

              <button
                type="submit"
                disabled={processing}
                className="nv-btn-primary !w-full !py-3.5 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Opening Razorpay...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" /> Pay ₹{service.amountInr.toLocaleString('en-IN')} with Razorpay →
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#777777] pt-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-bit SSL encrypted · Verified HMAC-SHA256 Razorpay checkout</span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

