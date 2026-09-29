import React from 'react';

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
        <div className="space-y-8">
          <section>
            <h2 className="font-['Syne'] text-2xl font-bold text-white mb-4">1. Refund Eligibility</h2>
            <div className="bg-[#141414] rounded-2xl p-6 border border-white/[0.08]">
              <p className="text-[#888888] mb-4 text-sm">We offer refunds under the following conditions:</p>
              <ul className="list-disc list-inside text-[#888888] space-y-2 text-sm">
                <li>Service not rendered as described</li>
                <li>Technical issues preventing service delivery</li>
                <li>Cancellation before service initiation</li>
                <li>Unsatisfactory repair results (subject to review)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-['Syne'] text-2xl font-bold text-white mb-4">2. Refund Process</h2>
            <div className="bg-[#141414] rounded-2xl p-6 border border-white/[0.08]">
              <div className="space-y-4 text-sm">
                <p className="text-[#888888]">To request a refund:</p>
                <ol className="list-decimal list-inside text-[#888888] space-y-2">
                  <li>Contact our support team within 7 days of service</li>
                  <li>Provide order details and reason for refund</li>
                  <li>Submit any relevant documentation</li>
                  <li>Allow 5-10 business days for review</li>
                </ol>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-['Syne'] text-2xl font-bold text-white mb-4">3. Non-Refundable Items</h2>
            <div className="bg-[#141414] rounded-2xl p-6 border border-white/[0.08]">
              <p className="text-[#888888] mb-4 text-sm">The following are not eligible for refunds:</p>
              <ul className="list-disc list-inside text-[#888888] space-y-2 text-sm">
                <li>Completed and successful repair services</li>
                <li>Diagnostic fees after service completion</li>
                <li>Custom or special order parts</li>
                <li>Services cancelled after work has begun</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-['Syne'] text-2xl font-bold text-white mb-4">4. Refund Methods</h2>
            <div className="bg-[#141414] rounded-2xl p-6 border border-white/[0.08]">
              <div className="space-y-4 text-sm">
                <p className="text-[#888888]">Refunds will be processed through:</p>
                <ul className="list-disc list-inside text-[#888888] space-y-2">
                  <li>Original payment method</li>
                  <li>Store credit (if preferred)</li>
                  <li>Bank transfer (in special cases)</li>
                </ul>
                <p className="text-[#888888] mt-4">
                  Processing time: 5-10 business days after approval
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-['Syne'] text-2xl font-bold text-white mb-4">5. Contact Us</h2>
            <div className="bg-[#141414] rounded-2xl p-6 border border-white/[0.08]">
              <p className="text-[#888888] text-sm">
                For refund requests or questions, please contact us at:{' '}
                <a href="mailto:support@neurovia.com" className="text-white hover:underline font-semibold ml-1">
                  support@neurovia.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}