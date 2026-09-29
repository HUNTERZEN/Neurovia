import React from 'react';
import { Wallet } from 'lucide-react';

export function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#e8e8e8]">
      <section className="page-hero">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="nv-section-label">Legal</span>
          <h1 className="page-title !mt-2 !mb-2">
            Refund <em>Policy.</em>
          </h1>
          <p className="text-sm text-[#888888]">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      <div className="relative max-w-4xl mx-auto px-6 py-16 lg:px-8">
        <div className="prose prose-invert max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Refund Eligibility</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
                <p className="text-gray-300 mb-4">We offer refunds under the following conditions:</p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Service not rendered as described</li>
                  <li>Technical issues preventing service delivery</li>
                  <li>Cancellation before service initiation</li>
                  <li>Unsatisfactory repair results (subject to review)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Refund Process</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
                <div className="space-y-4">
                  <p className="text-gray-300">To request a refund:</p>
                  <ol className="list-decimal list-inside text-gray-400 space-y-2">
                    <li>Contact our support team within 7 days of service</li>
                    <li>Provide order details and reason for refund</li>
                    <li>Submit any relevant documentation</li>
                    <li>Allow 5-10 business days for review</li>
                  </ol>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Non-Refundable Items</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
                <p className="text-gray-300 mb-4">The following are not eligible for refunds:</p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>Completed and successful repair services</li>
                  <li>Diagnostic fees after service completion</li>
                  <li>Custom or special order parts</li>
                  <li>Services cancelled after work has begun</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Refund Methods</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
                <div className="space-y-4">
                  <p className="text-gray-300">Refunds will be processed through:</p>
                  <ul className="list-disc list-inside text-gray-400 space-y-2">
                    <li>Original payment method</li>
                    <li>Store credit (if preferred)</li>
                    <li>Bank transfer (in special cases)</li>
                  </ul>
                  <p className="text-gray-300 mt-4">
                    Processing time: 5-10 business days after approval
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
              <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
                <p className="text-gray-300">
                  For refund requests or questions, please contact us at:{' '}
                  <a href="mailto:support@neurovia.com" className="text-purple-400 hover:text-purple-300">
                    support@neurovia.com
                  </a>
                </p>
              </div>
            </section>

            <p className="mt-8 text-gray-300">
              If you have any questions about our Refund Policy, please contact us at{' '}
              <a href="mailto:support@neurovia.com" className="text-purple-400 hover:text-purple-300">
                support@neurovia.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 