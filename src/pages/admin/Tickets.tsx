import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, RefreshCw } from 'lucide-react';
import API_BASE_URL from '../../config/api';

type AdminViewMode = 'tickets' | 'payments' | 'beta' | 'shops';

export function AdminOperationsPage({ mode }: { mode: AdminViewMode }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'messages' | 'bookings'>('messages');
  const [messages, setMessages] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [betaTesters, setBetaTesters] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('adminToken') || ''}`,
    'Content-Type': 'application/json',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const checkAuth = (res: Response) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('adminToken');
          navigate('/admin/login', { replace: true });
          return false;
        }
        return true;
      };

      if (mode === 'tickets') {
        const [mRes, bRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/admin/messages`, { headers: authHeaders() }),
          fetch(`${API_BASE_URL}/api/admin/bookings`, { headers: authHeaders() }),
        ]);
        if (!checkAuth(mRes)) return;
        if (mRes.ok) setMessages((await mRes.json()).messages || []);
        if (bRes.ok) setBookings((await bRes.json()).bookings || []);
      } else if (mode === 'payments') {
        const res = await fetch(`${API_BASE_URL}/api/admin/payments`, { headers: authHeaders() });
        if (!checkAuth(res)) return;
        if (res.ok) setPayments((await res.json()).payments || []);
      } else if (mode === 'beta') {
        const res = await fetch(`${API_BASE_URL}/api/admin/beta-testers`, { headers: authHeaders() });
        if (!checkAuth(res)) return;
        if (res.ok) {
          const d = await res.json();
          setBetaTesters(d.betaTesters || []);
          setSubscribers(d.subscribers || []);
        }
      } else if (mode === 'shops') {
        const res = await fetch(`${API_BASE_URL}/api/admin/partners`, { headers: authHeaders() });
        if (!checkAuth(res)) return;
        if (res.ok) setPartners((await res.json()).partners || []);
      }
    } catch (err) {
      console.error('Admin fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [mode]);

  const updateMessageStatus = async (id: string, status: string) => {
    await fetch(`${API_BASE_URL}/api/admin/messages/${id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ status }),
    });
    setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, status } : m)));
  };

  const updateBookingStatus = async (id: string, status: string) => {
    await fetch(`${API_BASE_URL}/api/admin/bookings/${id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ status }),
    });
    setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status } : b)));
  };

  const titles: Record<AdminViewMode, { title: string; subtitle: string }> = {
    tickets: {
      title: 'Customer Messages & Bookings',
      subtitle: 'Incoming "Get in Touch" inquiries and technician support requests',
    },
    payments: {
      title: 'Razorpay Payments',
      subtitle: 'All service checkout orders and verified payment receipts',
    },
    beta: {
      title: 'Beta Testers & Newsletter',
      subtitle: 'Early-access NADT beta registrants and blog subscribers',
    },
    shops: {
      title: 'Partner Repair Workshops',
      subtitle: 'Verified workshops registered in the Neurovia Partner Network',
    },
  };

  return (
    <div className="space-y-6 text-[#e8e8e8]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="nv-section-label">Team Workspace</span>
          <h1 className="font-['Syne'] text-2xl sm:text-3xl font-bold text-white">
            {titles[mode].title}
          </h1>
          <p className="text-sm text-[#888888] mt-1">{titles[mode].subtitle}</p>
        </div>
        <button
          type="button"
          onClick={loadData}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold flex items-center gap-2 text-white"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* ── TICKETS & MESSAGES MODE ── */}
      {mode === 'tickets' && (
        <>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTab('messages')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                tab === 'messages' ? 'bg-white text-black' : 'bg-white/5 text-[#888888] hover:text-white'
              }`}
            >
              Get in Touch Messages ({messages.length})
            </button>
            <button
              type="button"
              onClick={() => setTab('bookings')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                tab === 'bookings' ? 'bg-white text-black' : 'bg-white/5 text-[#888888] hover:text-white'
              }`}
            >
              Support Bookings ({bookings.length})
            </button>
          </div>

          {tab === 'messages' ? (
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="p-10 bg-[#141414] rounded-2xl border border-white/[0.08] text-center text-sm text-[#888888]">
                  No "Get in Touch" messages yet.
                </div>
              ) : (
                messages.map((m) => (
                  <div
                    key={m._id}
                    className="p-6 bg-[#141414] rounded-2xl border border-white/[0.08] space-y-3"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-3">
                      <div>
                        <span className="text-[11px] font-mono text-[#8bb4ff]">{m.referenceId}</span>
                        <h3 className="font-['Syne'] text-lg font-bold text-white">{m.subject}</h3>
                        <p className="text-xs text-[#888888]">
                          From <strong className="text-white">{m.name}</strong> · {m.email}
                          {m.phone ? ` · ${m.phone}` : ''} ·{' '}
                          {new Date(m.createdAt).toLocaleString('en-IN')}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: [${m.referenceId}] ${m.subject}`)}`}
                          className="px-3 py-1.5 rounded-lg bg-[#4f7fff]/20 border border-[#4f7fff]/30 text-[#8bb4ff] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#4f7fff]/30"
                        >
                          <Mail className="w-3.5 h-3.5" /> Reply via Email
                        </a>
                        <select
                          value={m.status}
                          onChange={(e) => updateMessageStatus(m._id, e.target.value)}
                          className="bg-[#18181c] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white"
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0d0d10] border border-white/[0.06] text-sm text-[#dddddd] whitespace-pre-wrap">
                      {m.message}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="p-10 bg-[#141414] rounded-2xl border border-white/[0.08] text-center text-sm text-[#888888]">
                  No support bookings yet.
                </div>
              ) : (
                bookings.map((b) => (
                  <div
                    key={b._id}
                    className="p-6 bg-[#141414] rounded-2xl border border-white/[0.08] space-y-3"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-3">
                      <div>
                        <span className="text-xs font-mono text-[#8bb4ff] font-bold">{b.bookingNumber}</span>
                        <h3 className="font-['Syne'] text-lg font-bold text-white">
                          {b.deviceType} {b.deviceBrand ? `(${b.deviceBrand})` : ''} — {b.supportType?.toUpperCase()}
                        </h3>
                        <p className="text-xs text-[#888888]">
                          {b.customerName} · {b.email} · {b.phone} · Slot: {b.preferredDate || 'ASAP'}{' '}
                          {b.preferredTime || ''}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            b.paymentStatus === 'paid'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-white/10 text-[#cccccc]'
                          }`}
                        >
                          {b.paymentStatus === 'paid' ? `PAID ₹${b.amountInr}` : 'Pay After Fix'}
                        </span>
                        <select
                          value={b.status}
                          onChange={(e) => updateBookingStatus(b._id, e.target.value)}
                          className="bg-[#18181c] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white"
                        >
                          <option value="pending">Pending</option>
                          <option value="assigned">Assigned</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0d0d10] border border-white/[0.06] text-sm text-[#dddddd] whitespace-pre-wrap">
                      {b.issueDescription}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}

      {/* ── RAZORPAY PAYMENTS MODE ── */}
      {mode === 'payments' && (
        <div className="bg-[#141414] rounded-2xl border border-white/[0.08] overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-[#888888] uppercase">
              <tr>
                <th className="p-4">Receipt</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Service</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Payment ID</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#888888]">
                    No payment orders recorded yet.
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p._id} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-mono text-white">{p.receiptNumber}</td>
                    <td className="p-4">
                      <div className="text-white font-medium">{p.customerName}</div>
                      <div className="text-[#888888]">{p.customerEmail}</div>
                    </td>
                    <td className="p-4 text-[#dddddd]">{p.serviceTitle}</td>
                    <td className="p-4 font-bold text-white">₹{p.amountInr?.toLocaleString('en-IN')}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          p.status === 'paid'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : p.status === 'failed'
                            ? 'bg-red-500/20 text-red-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-[#888888]">{p.razorpayPaymentId || '—'}</td>
                    <td className="p-4 text-[#888888]">{new Date(p.createdAt).toLocaleString('en-IN')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── BETA TESTERS & NEWSLETTER MODE ── */}
      {mode === 'beta' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#141414] rounded-2xl border border-white/[0.08] p-6">
            <h3 className="font-['Syne'] text-lg font-bold text-white mb-4">
              Beta-Tester Registrants ({betaTesters.length})
            </h3>
            <div className="space-y-2.5">
              {betaTesters.length === 0 ? (
                <p className="text-xs text-[#888888] py-6 text-center">No beta testers registered yet.</p>
              ) : (
                betaTesters.map((bt) => (
                  <div
                    key={bt._id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs"
                  >
                    <div>
                      <div className="text-white font-medium">{bt.email}</div>
                      <div className="text-[11px] text-[#888888]">
                        Joined {new Date(bt.createdAt).toLocaleString('en-IN')}
                      </div>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-semibold">
                      {bt.emailSent ? 'Email Sent ✓' : 'Registered'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-[#141414] rounded-2xl border border-white/[0.08] p-6">
            <h3 className="font-['Syne'] text-lg font-bold text-white mb-4">
              Newsletter Subscribers ({subscribers.length})
            </h3>
            <div className="space-y-2.5">
              {subscribers.length === 0 ? (
                <p className="text-xs text-[#888888] py-6 text-center">No newsletter subscribers yet.</p>
              ) : (
                subscribers.map((s) => (
                  <div
                    key={s._id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs"
                  >
                    <span className="text-white font-medium">{s.email}</span>
                    <span className="text-[#888888]">
                      {new Date(s.createdAt).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── PARTNER WORKSHOPS MODE ── */}
      {mode === 'shops' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {partners.length === 0 ? (
            <div className="md:col-span-2 p-10 bg-[#141414] rounded-2xl border border-white/[0.08] text-center text-sm text-[#888888]">
              No partner workshops registered yet.
            </div>
          ) : (
            partners.map((p) => (
              <div key={p._id} className="p-6 bg-[#141414] rounded-2xl border border-white/[0.08] space-y-2">
                <h3 className="font-['Syne'] text-lg font-bold text-white">{p.shopName}</h3>
                <p className="text-xs text-[#8bb4ff]">
                  Owner: {p.ownerName} · {p.profession} ({p.experience})
                </p>
                <p className="text-xs text-[#cccccc]">
                  {p.address}, {p.city}, {p.state}
                </p>
                <p className="text-xs text-[#888888] flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" /> {p.countryCode} {p.phone} · {p.email}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default AdminOperationsPage;

