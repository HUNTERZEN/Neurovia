import React from 'react';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#e8e8e8]">
      <section className="page-hero">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="nv-section-label">Legal</span>
          <h1 className="page-title !mt-2 !mb-2">
            Privacy <em>Policy.</em>
          </h1>
          <p className="text-sm text-[#888888]">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      <div className="relative max-w-4xl mx-auto px-6 py-16 lg:px-8">
        <div className="space-y-8">
          <section>
            <h2 className="font-['Syne'] text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <div className="bg-[#141414] rounded-2xl p-6 border border-white/[0.08]">
              <p className="text-[#888888] mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside text-[#888888] space-y-2 text-sm">
                <li>Name and contact information</li>
                <li>Account credentials</li>
                <li>Payment information</li>
                <li>Device information and diagnostics</li>
                <li>Communication preferences</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-['Syne'] text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <div className="bg-[#141414] rounded-2xl p-6 border border-white/[0.08]">
              <p className="text-[#888888] mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-[#888888] space-y-2 text-sm">
                <li>Provide and improve our services</li>
                <li>Process your transactions</li>
                <li>Send you technical notices and support messages</li>
                <li>Communicate with you about products and services</li>
                <li>Monitor and analyze trends and usage</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-['Syne'] text-2xl font-bold text-white mb-4">3. Information Sharing</h2>
            <div className="bg-[#141414] rounded-2xl p-6 border border-white/[0.08]">
              <p className="text-[#888888] mb-4">We may share your information with:</p>
              <ul className="list-disc list-inside text-[#888888] space-y-2 text-sm">
                <li>Service providers and repair partners</li>
                <li>Payment processors</li>
                <li>Analytics providers</li>
                <li>Law enforcement when required</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-['Syne'] text-2xl font-bold text-white mb-4">4. Your Rights and Choices</h2>
            <div className="bg-[#141414] rounded-2xl p-6 border border-white/[0.08]">
              <p className="text-[#888888] mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-[#888888] space-y-2 text-sm">
                <li>Access your personal information</li>
                <li>Update or correct your information</li>
                <li>Delete your account and data</li>
                <li>Opt-out of marketing communications</li>
                <li>Control cookie preferences</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-['Syne'] text-2xl font-bold text-white mb-4">5. Contact Us</h2>
            <div className="bg-[#141414] rounded-2xl p-6 border border-white/[0.08]">
              <p className="text-[#888888] text-sm">
                If you have any questions about this Privacy Policy, please contact us at:{' '}
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