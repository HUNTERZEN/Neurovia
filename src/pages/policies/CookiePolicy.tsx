import React from 'react';
import { Cookie } from 'lucide-react';

export function CookiePolicy() {
  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75" />
              <div className="relative bg-black rounded-full p-3">
                <Cookie className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

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
                  If you have questions about our use of cookies, please contact us at:{' '}
                  <a href="mailto:privacy@aeternex.com" className="text-purple-400 hover:text-purple-300">
                    privacy@aeternex.com
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