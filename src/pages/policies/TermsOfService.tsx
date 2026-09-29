import React from 'react';
import { Scale } from 'lucide-react';

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#e8e8e8]">
      <section className="page-hero">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="nv-section-label">Legal</span>
          <h1 className="page-title !mt-2 !mb-2">
            Terms of <em>Service.</em>
          </h1>
          <p className="text-sm text-[#888888]">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      <div className="relative max-w-4xl mx-auto px-6 py-16 lg:px-8">
        <div className="prose prose-invert max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
                <p className="text-gray-300">
                  By accessing or using Neurovia's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Use License</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
                <div className="space-y-4">
                  <p className="text-gray-300">Permission is granted to temporarily access our services for personal, non-commercial use subject to the following conditions:</p>
                  <ul className="list-disc list-inside text-gray-400 space-y-2">
                    <li>You must not modify or copy our materials</li>
                    <li>You must not use the materials for commercial purposes</li>
                    <li>You must not attempt to reverse engineer any software</li>
                    <li>You must not remove any copyright or proprietary notations</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Service Description</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
                <div className="space-y-4">
                  <p className="text-gray-300">Our services include:</p>
                  <ul className="list-disc list-inside text-gray-400 space-y-2">
                    <li>Technical support and consultation</li>
                    <li>Device repair services</li>
                    <li>Remote assistance</li>
                    <li>Diagnostic services</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. User Responsibilities</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
                <div className="space-y-4">
                  <p className="text-gray-300">As a user, you are responsible for:</p>
                  <ul className="list-disc list-inside text-gray-400 space-y-2">
                    <li>Providing accurate information</li>
                    <li>Maintaining the confidentiality of your account</li>
                    <li>Backing up your data before services</li>
                    <li>Complying with all applicable laws</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Limitation of Liability</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
                <p className="text-gray-300">
                  Neurovia shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Contact Information</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
                <p className="text-gray-300">
                  If you have any questions about these Terms of Service, please contact us at{' '}
                  <a href="mailto:legal@neurovia.com" className="text-purple-400 hover:text-purple-300">
                    legal@neurovia.com
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