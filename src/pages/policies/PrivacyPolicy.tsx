import React from 'react';
import { Shield } from 'lucide-react';

export function PrivacyPolicy() {
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
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
                <p className="text-gray-300 mb-4">We collect information that you provide directly to us, including:</p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Name and contact information</li>
                  <li>Account credentials</li>
                  <li>Payment information</li>
                  <li>Device information and diagnostics</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
                <p className="text-gray-300 mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Provide and improve our services</li>
                  <li>Process your transactions</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Communicate with you about products and services</li>
                  <li>Monitor and analyze trends and usage</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
                <p className="text-gray-300 mb-4">We may share your information with:</p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Service providers and repair partners</li>
                  <li>Payment processors</li>
                  <li>Analytics providers</li>
                  <li>Law enforcement when required</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Your Rights and Choices</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
                <p className="text-gray-300 mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Access your personal information</li>
                  <li>Update or correct your information</li>
                  <li>Delete your account and data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Control cookie preferences</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
                <p className="text-gray-300">
                  If you have any questions about this Privacy Policy, please contact us at:{' '}
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