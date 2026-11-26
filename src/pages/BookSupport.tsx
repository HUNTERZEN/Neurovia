import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CreditCard, CheckCircle2 } from 'lucide-react';
import API_BASE_URL from '../config/api';
import { useAuth } from '../App';
import { DEFAULT_SERVICE_CATALOG, findServicePackage, ServicePackage } from '../data/serviceCatalog';
import { RazorpayCheckoutModal, VerifiedPaymentReceipt } from '../components/RazorpayCheckoutModal';

export default function BookSupport() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const preselectedServiceId = searchParams.get('service') || '';

  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [deviceType, setDeviceType] = useState('');
  const [brand, setBrand] = useState('');
  const [os, setOs] = useState('');

  const [issue, setIssue] = useState('');
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const [supportType, setSupportType] = useState<'remote' | 'onsite' | ''>('');
  const [selectedPlanId, setSelectedPlanId] = useState<string>(preselectedServiceId);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [supportError, setSupportError] = useState(false);

  // Payment modal state
  const [checkoutService, setCheckoutService] = useState<ServicePackage | null>(null);
  const [paidReceipt, setPaidReceipt] = useState<VerifiedPaymentReceipt | null>(null);

  useEffect(() => {
    if (user) {
      setName((prev) => prev || user.name || user.username || '');
      setEmail((prev) => prev || user.email || '');
    }
  }, [user]);

  useEffect(() => {
    if (preselectedServiceId) {
      const pkg = findServicePackage(preselectedServiceId);
      if (pkg) {
        setSelectedPlanId(pkg.id);
        setSupportType(pkg.category === 'Onsite Repair' ? 'onsite' : 'remote');
      }
    }
  }, [preselectedServiceId]);

  const todayStr = new Date().toISOString().split('T')[0];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    const combinedFiles = [...files, ...newFiles].slice(0, 5);
    setFiles(combinedFiles);

    const previews: string[] = [];
    combinedFiles.forEach((file) => {
      const url = URL.createObjectURL(file);
      previews.push(url);
    });
    setImagePreviews(previews);
  };

  const handleNext = (from: number) => {
    if (from === 1) {
      if (!name.trim()) {
        alert('Please enter your full name.');
        return;
      }
      if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
        alert('Please enter a valid 10-digit phone number.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }
    }
    if (from === 2) {
      if (!deviceType) {
        alert('Please select your device type.');
        return;
      }
    }
    if (from === 3) {
      if (issue.trim().length < 20) {
        alert('Please describe your issue in at least 20 characters.');
        return;
      }
    }
    setCurrentStep(from + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (from: number) => {
    setCurrentStep(from - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const defaultPlanForSupport = (): ServicePackage => {
    if (selectedPlanId) {
      const found = findServicePackage(selectedPlanId);
      if (found) return found;
    }
    return supportType === 'onsite'
      ? DEFAULT_SERVICE_CATALOG.find((s) => s.id === 'onsite-visit-diag')!
      : DEFAULT_SERVICE_CATALOG.find((s) => s.id === 'remote-quick-fix')!;
  };

  const handleSubmit = async (openRazorpayAfter = false) => {
    if (!supportType) {
      setSupportError(true);
      return;
    }
    if (!termsAccepted) {
      alert('Please accept the Terms of Service to continue.');
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      const formData = new FormData();
      formData.append('customerName', name.trim());
      formData.append('email', email.trim());
      formData.append('phone', phone.trim());
      formData.append('deviceType', deviceType);
      formData.append('deviceBrand', brand.trim());
      formData.append('operatingSystem', os);
      formData.append('issueDescription', issue.trim());
      formData.append('supportType', supportType);
      formData.append('preferredDate', preferredDate);
      formData.append('preferredTime', preferredTime);
      if (selectedPlanId) formData.append('serviceId', selectedPlanId);

      files.forEach((f) => formData.append('images', f));

      const token = localStorage.getItem('authToken');
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(data?.error || 'Could not submit booking. Please check your details and try again.');
        setSubmitting(false);
        return;
      }

      const ref = data?.booking?.bookingNumber || '';
      setBookingRef(ref);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (openRazorpayAfter) {
        setCheckoutService(defaultPlanForSupport());
      }
    } catch {
      setSubmitError('Unable to reach the Neurovia server. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setIsSuccess(false);
    setPaidReceipt(null);
    setSubmitError('');
    setDeviceType('');
    setBrand('');
    setOs('');
    setIssue('');
    setFiles([]);
    setImagePreviews([]);
    setSupportType('');
    setPreferredDate('');
    setPreferredTime('');
    setTermsAccepted(false);
  };

  const activePlan = defaultPlanForSupport();

  return (
    <div className="bg-[#080808] text-[#e8e8e8] min-h-screen">
      {/* ═══ PAGE HERO ═══ */}
      <section className="page-hero" style={{ paddingBottom: '48px' }}>
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          <span className="nv-section-label">Book support</span>
          <h1 className="page-title">
            Get help in<br /><em>minutes.</em>
          </h1>
          <p className="page-sub">
            Fill out the form below. A certified technician will be assigned within 30 minutes during business hours.
          </p>
        </div>
      </section>

      {/* ═══ BOOKING WIZARD ═══ */}
      <section className="book-section">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-8">
          <div className="booking-form-wrap">
            {!isSuccess ? (
              <>
                {/* Step indicator */}
                <div className="step-indicator">
                  <div className={`step-dot ${currentStep === 1 ? 'active' : currentStep > 1 ? 'done' : ''}`}>
                    {currentStep > 1 ? '✓' : '1'}
                  </div>
                  <div className={`step-line ${currentStep > 1 ? 'done' : ''}`} />
                  <div className={`step-dot ${currentStep === 2 ? 'active' : currentStep > 2 ? 'done' : ''}`}>
                    {currentStep > 2 ? '✓' : '2'}
                  </div>
                  <div className={`step-line ${currentStep > 2 ? 'done' : ''}`} />
                  <div className={`step-dot ${currentStep === 3 ? 'active' : currentStep > 3 ? 'done' : ''}`}>
                    {currentStep > 3 ? '✓' : '3'}
                  </div>
                  <div className={`step-line ${currentStep > 3 ? 'done' : ''}`} />
                  <div className={`step-dot ${currentStep === 4 ? 'active' : ''}`}>4</div>
                </div>

                <div className="step-label-row">
                  <span className={`step-label ${currentStep === 1 ? 'active' : ''}`}>You</span>
                  <span className={`step-label ${currentStep === 2 ? 'active' : ''}`}>Device</span>
                  <span className={`step-label ${currentStep === 3 ? 'active' : ''}`}>Issue</span>
                  <span className={`step-label ${currentStep === 4 ? 'active' : ''}`}>Support</span>
                </div>

                {/* ── STEP 1: Personal Details ── */}
                {currentStep === 1 && (
                  <div className="form-step active">
                    <h2 className="step-title">About you</h2>
                    <p className="step-subtitle">We'll use this to email your booking confirmation and keep you updated.</p>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Full Name *</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone *</label>
                        <input
                          type="tel"
                          className="form-input"
                          placeholder="9876543210"
                          maxLength={10}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="step-nav">
                      <button type="button" className="nv-btn-primary" onClick={() => handleNext(1)}>
                        Continue →
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: Device Details ── */}
                {currentStep === 2 && (
                  <div className="form-step active">
                    <h2 className="step-title">Your device</h2>
                    <p className="step-subtitle">Help us understand what we're working with.</p>

                    <div className="form-group">
                      <label>Device Type *</label>
                      <select
                        className="form-input"
                        value={deviceType}
                        onChange={(e) => setDeviceType(e.target.value)}
                      >
                        <option value="">Select device type</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Desktop PC">Desktop PC</option>
                        <option value="MacBook">MacBook</option>
                        <option value="iMac">iMac</option>
                        <option value="Printer">Printer</option>
                        <option value="Server">Server</option>
                        <option value="Network Equipment">Network Equipment</option>
                        <option value="Mobile Device">Mobile Device</option>
                        <option value="Tablet">Tablet</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Brand / Model</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Dell XPS 15"
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Operating System</label>
                        <select
                          className="form-input"
                          value={os}
                          onChange={(e) => setOs(e.target.value)}
                        >
                          <option value="">Select OS</option>
                          <option value="Windows 11">Windows 11</option>
                          <option value="Windows 10">Windows 10</option>
                          <option value="Windows 7/8">Windows 7/8</option>
                          <option value="macOS">macOS</option>
                          <option value="Ubuntu / Linux">Ubuntu / Linux</option>
                          <option value="Chrome OS">Chrome OS</option>
                          <option value="Not sure">Not sure</option>
                        </select>
                      </div>
                    </div>

                    <div className="step-nav">
                      <button type="button" className="nv-btn-outline" onClick={() => handlePrev(2)}>
                        ← Back
                      </button>
                      <button type="button" className="nv-btn-primary" onClick={() => handleNext(2)}>
                        Continue →
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: Issue ── */}
                {currentStep === 3 && (
                  <div className="form-step active">
                    <h2 className="step-title">The problem</h2>
                    <p className="step-subtitle">The more detail you give, the faster we can help. Be as specific as possible.</p>

                    <div className="form-group">
                      <label>Describe the issue *</label>
                      <textarea
                        className="form-input"
                        rows={5}
                        placeholder="e.g. My laptop won't turn on. When I press the power button, the light flashes once then nothing happens. Started yesterday after a Windows update..."
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                      />
                      <span
                        style={{
                          fontSize: '11px',
                          color: issue.trim().length >= 20 ? 'var(--green)' : 'var(--dim)',
                          marginTop: '4px',
                          display: 'block',
                        }}
                      >
                        {issue.trim().length >= 20
                          ? `${issue.trim().length} characters ✓`
                          : `Minimum 20 characters (${issue.trim().length} so far)`}
                      </span>
                    </div>

                    <div className="form-group">
                      <label>
                        Upload screenshots or photos{' '}
                        <span style={{ color: 'var(--muted)', fontWeight: 400, textTransform: 'none', fontSize: '11px' }}>
                          (optional, max 5)
                        </span>
                      </label>
                      <label className="upload-area" htmlFor="file-upload">
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>📎</div>
                        <p>Click to upload or drag &amp; drop</p>
                        <span>JPG, PNG, WebP — max 5 MB each</span>
                        <input
                          type="file"
                          id="file-upload"
                          multiple
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleFileChange}
                        />
                      </label>

                      {imagePreviews.length > 0 && (
                        <div className="image-previews">
                          {imagePreviews.map((src, i) => (
                            <img key={i} src={src} alt="Preview" className="img-preview" />
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="step-nav">
                      <button type="button" className="nv-btn-outline" onClick={() => handlePrev(3)}>
                        ← Back
                      </button>
                      <button type="button" className="nv-btn-primary" onClick={() => handleNext(3)}>
                        Continue →
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 4: Support Preferences & Optional Instant Payment ── */}
                {currentStep === 4 && (
                  <div className="form-step active">
                    <h2 className="step-title">How you want help</h2>
                    <p className="step-subtitle">Choose remote or onsite, pick a slot, and pay online via Razorpay or after the fix.</p>

                    {submitError && (
                      <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-xs text-red-300">
                        {submitError}
                      </div>
                    )}

                    <div className="form-group">
                      <label>Support Type *</label>
                      <div className="support-type-grid">
                        <div
                          className={`support-opt ${supportType === 'remote' ? 'selected' : ''}`}
                          onClick={() => {
                            setSupportType('remote');
                            setSupportError(false);
                          }}
                        >
                          <div className="opt-icon">💻</div>
                          <h4>Remote</h4>
                          <p>We connect online and fix it live (from ₹499)</p>
                        </div>
                        <div
                          className={`support-opt ${supportType === 'onsite' ? 'selected' : ''}`}
                          onClick={() => {
                            setSupportType('onsite');
                            setSupportError(false);
                          }}
                        >
                          <div className="opt-icon">🛠️</div>
                          <h4>Onsite</h4>
                          <p>Technician comes to your location (from ₹599)</p>
                        </div>
                      </div>
                      {supportError && (
                        <span style={{ fontSize: '12px', color: 'var(--orange)', display: 'block' }}>
                          Please select a support type
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Service Package (Optional)</label>
                      <select
                        className="form-input"
                        value={selectedPlanId}
                        onChange={(e) => setSelectedPlanId(e.target.value)}
                      >
                        <option value="">Standard Diagnostics ({supportType === 'onsite' ? '₹599' : '₹499'})</option>
                        {DEFAULT_SERVICE_CATALOG.map((pkg) => (
                          <option key={pkg.id} value={pkg.id}>
                            {pkg.title} — ₹{pkg.amountInr.toLocaleString('en-IN')}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Preferred Date</label>
                        <input
                          type="date"
                          className="form-input"
                          min={todayStr}
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Preferred Time</label>
                        <select
                          className="form-input"
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                        >
                          <option value="">Any time</option>
                          <option value="09:00 AM – 10:00 AM">09:00 AM – 10:00 AM</option>
                          <option value="10:00 AM – 11:00 AM">10:00 AM – 11:00 AM</option>
                          <option value="11:00 AM – 12:00 PM">11:00 AM – 12:00 PM</option>
                          <option value="12:00 PM – 01:00 PM">12:00 PM – 01:00 PM</option>
                          <option value="02:00 PM – 03:00 PM">02:00 PM – 03:00 PM</option>
                          <option value="03:00 PM – 04:00 PM">03:00 PM – 04:00 PM</option>
                          <option value="04:00 PM – 05:00 PM">04:00 PM – 05:00 PM</option>
                          <option value="05:00 PM – 06:00 PM">05:00 PM – 06:00 PM</option>
                          <option value="06:00 PM – 07:00 PM">06:00 PM – 07:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                      />
                      <label htmlFor="terms">
                        I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
                        <Link to="/privacy">Privacy Policy</Link>. I understand a technician will be assigned within 30 minutes during business hours.
                      </label>
                    </div>

                    <div className="step-nav flex-wrap">
                      <button type="button" className="nv-btn-outline" onClick={() => handlePrev(4)}>
                        ← Back
                      </button>
                      <button
                        type="button"
                        disabled={submitting}
                        className="nv-btn-outline"
                        onClick={() => handleSubmit(false)}
                      >
                        {submitting ? 'Submitting...' : 'Book (Pay After Fix)'}
                      </button>
                      <button
                        type="button"
                        disabled={submitting}
                        className="nv-btn-primary"
                        onClick={() => handleSubmit(true)}
                      >
                        <CreditCard className="w-4 h-4" />
                        {submitting ? 'Submitting...' : `Pay ₹${activePlan.amountInr.toLocaleString('en-IN')} & Priority Book →`}
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* ── SUCCESS SCREEN ── */
              <div className="success-screen">
                <div className="success-icon">✓</div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '32px',
                    fontWeight: 800,
                    color: 'var(--white)',
                    marginBottom: '8px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Booking confirmed!
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.7, maxWidth: '420px', margin: '0 auto 20px' }}>
                  Your support request has been received. A certified technician will be in touch within 30 minutes.
                </p>
                <div className="booking-ref">{bookingRef}</div>
                <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '28px' }}>
                  A confirmation email has been sent to <strong style={{ color: '#fff' }}>{email}</strong>.
                </p>

                {paidReceipt ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-8">
                    <CheckCircle2 className="w-4 h-4" />
                    Paid ₹{paidReceipt.amountInr.toLocaleString('en-IN')} · Receipt #{paidReceipt.receiptNumber}
                  </div>
                ) : (
                  <div className="mb-8">
                    <button
                      type="button"
                      onClick={() => setCheckoutService(activePlan)}
                      className="nv-btn-primary"
                    >
                      <CreditCard className="w-4 h-4" /> Pay ₹{activePlan.amountInr.toLocaleString('en-IN')} Now via Razorpay →
                    </button>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link to="/" className="nv-btn-outline">← Return home</Link>
                  <button type="button" className="nv-btn-ghost" onClick={resetForm}>Book another →</button>
                </div>

                {/* Booking summary box */}
                <div
                  style={{
                    marginTop: '48px',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '28px',
                    textAlign: 'left',
                    background: 'var(--card)',
                  }}
                >
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', fontWeight: 600, marginBottom: '16px' }}>
                    Booking summary
                  </p>
                  {[
                    ['Reference', bookingRef],
                    ['Customer', name],
                    ['Email', email],
                    ['Device', deviceType + (brand ? ` (${brand})` : '')],
                    ['Support Type', supportType ? supportType.charAt(0).toUpperCase() + supportType.slice(1) : 'Standard'],
                    ['Payment Status', paidReceipt ? `PAID (₹${paidReceipt.amountInr})` : 'Pay After Fix'],
                    ['Preferred Date', preferredDate || 'Earliest available'],
                    ['Preferred Time', preferredTime || 'Any time'],
                    ['Estimated Response', 'Within 30 minutes'],
                  ].map(([label, val]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: '13px' }}>
                      <span style={{ color: 'var(--muted)' }}>{label}</span>
                      <span style={{ color: 'var(--white)', fontWeight: 500 }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <RazorpayCheckoutModal
        service={checkoutService}
        bookingNumber={bookingRef}
        initialCustomer={{
          name,
          email,
          phone,
          notes: `${deviceType} ${brand} — ${issue.slice(0, 120)}`,
        }}
        onClose={() => setCheckoutService(null)}
        onPaymentSuccess={(rcpt) => setPaidReceipt(rcpt)}
      />
    </div>
  );
}
