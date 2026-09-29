import React from 'react';
import { Cookie } from 'lucide-react';

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
        <div className="prose prose-invert max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. What Are Cookies</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
                <p className="text-gray-300">
                  Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by:
                </p>
                <ul className="list-disc list-inside text-gray-400 mt-4 space-y-2">
                  <li>Remembering your preferences</li>
                  <li>Keeping you signed in</li>
                  <li>Understanding how you use our website</li>
                  <li>Improving our services based on your behavior</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Types of Cookies We Use</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Essential Cookies</h3>
                    <p className="text-gray-300">Required for the website to function properly. These cannot be disabled.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Functional Cookies</h3>
                    <p className="text-gray-300">Enable personalized features and remember your preferences.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Analytics Cookies</h3>
                    <p className="text-gray-300">Help us understand how visitors interact with our website.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Marketing Cookies</h3>
                    <p className="text-gray-300">Used to deliver relevant advertisements and track campaign performance.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Managing Cookies</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
                <p className="text-gray-300 mb-4">You can control cookies through your browser settings. Please note that disabling certain cookies may limit your access to some features.</p>
                <div className="space-y-2 text-gray-400">
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
              <h2 className="text-2xl font-semibold text-white mb-4">4. Contact Us</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
                <p className="text-gray-300">
                  If you have any questions about our Cookie Policy, please contact us at{' '}
                  <a href="mailto:privacy@neurovia.com" className="text-purple-400 hover:text-purple-300">
                    privacy@neurovia.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 