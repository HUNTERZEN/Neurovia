import React from 'react';

export function CookiePolicy() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#e8e8e8]">
      <section className="page-hero">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="nv-section-label">Legal</span>
          <h1 className="page-title !mt-2 !mb-2">
            Cookie <em>Policy.</em>
          </h1>
          <p className="text-sm text-[#888888]">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      <div className="relative max-w-4xl mx-auto px-6 py-16 lg:px-8">
        <div className="space-y-8">
          <section>
            <h2 className="font-['Syne'] text-2xl font-bold text-white mb-4">1. What Are Cookies</h2>
            <div className="bg-[#141414] rounded-2xl p-6 border border-white/[0.08]">
              <p className="text-[#888888]">
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by:
              </p>
              <ul className="list-disc list-inside text-[#888888] mt-4 space-y-2 text-sm">
                <li>Remembering your preferences</li>
                <li>Keeping you signed in</li>
                <li>Understanding how you use our website</li>
                <li>Improving our services based on your behavior</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-['Syne'] text-2xl font-bold text-white mb-4">2. Types of Cookies We Use</h2>
            <div className="bg-[#141414] rounded-2xl p-6 border border-white/[0.08]">
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-semibold text-white mb-1">Essential Cookies</h3>
                  <p className="text-[#888888]">Required for the website to function properly. These cannot be disabled.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Functional Cookies</h3>
                  <p className="text-[#888888]">Enable personalized features and remember your preferences.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Analytics Cookies</h3>
                  <p className="text-[#888888]">Help us understand how visitors interact with our website.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Marketing Cookies</h3>
                  <p className="text-[#888888]">Used to deliver relevant advertisements and track campaign performance.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-['Syne'] text-2xl font-bold text-white mb-4">3. Managing Cookies</h2>
            <div className="bg-[#141414] rounded-2xl p-6 border border-white/[0.08]">
              <p className="text-[#888888] mb-4 text-sm">You can control cookies through your browser settings. Please note that disabling certain cookies may limit your access to some features.</p>
              <div className="space-y-2 text-[#888888] text-sm">
                <p>To manage cookies in:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Chrome: Settings → Privacy and Security → Cookies</li>
                  <li>Firefox: Options → Privacy & Security → Cookies</li>
                  <li>Safari: Preferences → Privacy → Cookies</li>
                  <li>Edge: Settings → Privacy & Security → Cookies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-['Syne'] text-2xl font-bold text-white mb-4">4. Contact Us</h2>
            <div className="bg-[#141414] rounded-2xl p-6 border border-white/[0.08]">
              <p className="text-[#888888] text-sm">
                If you have any questions about our Cookie Policy, please contact us at{' '}
                <a href="mailto:privacy@neurovia.com" className="text-white hover:underline font-semibold ml-1">
                  privacy@neurovia.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}