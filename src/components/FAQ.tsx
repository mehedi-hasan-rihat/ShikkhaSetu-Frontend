'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const tutorFAQs: FAQItem[] = [
  {
    question: "Who can use this platform?",
    answer: "Anyone can search for tutors and view their profiles. However, only registered tutors can create profiles and access dashboard features."
  },
  {
    question: "Is SkillBridge free to use?",
    answer: "Yes, searching for tutors and viewing public profiles is completely free. Tutors can sign up for free and optionally subscribe to premium features."
  },
  {
    question: "How do I create a tutor account?",
    answer: "Click on the Sign Up button and fill out the required information. Once registered, you can log in and create or edit your tutor profile."
  },
  {
    question: "How do I become a Pro Tutor?",
    answer: "After logging in, go to your dashboard and click on 'Upgrade membership'. Choose a subscription plan and complete the payment process."
  },
  {
    question: "How can I get tuition on SkillBridge?",
    answer: "First, create your tutor profile on SkillBridge with accurate information about your qualifications, subjects, and preferred areas. Then, browse the list of available tuition posts and apply to the ones that match your interests. Once you apply, the guardian will review your profile, and if it fits their requirements, they'll contact you directly to discuss and confirm the tuition."
  },
  {
    question: "What payment methods are supported for subscriptions?",
    answer: "We support bkash, nagad payment for now to activate premium features."
  }
];

const studentFAQs: FAQItem[] = [
  {
    question: "How do I find the right tutor?",
    answer: "Use our search filters to find tutors by subject, location, rating, and price. You can also browse tutor profiles to see their qualifications and reviews."
  },
  {
    question: "How do I book a session with a tutor?",
    answer: "Once you find a tutor you like, click on their profile and select 'Book Session'. Choose your preferred time slot and confirm your booking."
  },
  {
    question: "What if I'm not satisfied with a tutor?",
    answer: "You can leave feedback after each session. If you're not satisfied, you can request a refund within 24 hours or find a different tutor."
  },
  {
    question: "How do payments work?",
    answer: "Payments are processed securely through our platform. You can pay per session or purchase packages for better rates."
  },
  {
    question: "Can I cancel or reschedule sessions?",
    answer: "Yes, you can cancel or reschedule sessions up to 2 hours before the scheduled time without any penalty."
  }
];

export function FAQ() {
  const [activeTab, setActiveTab] = useState<'tutor' | 'student'>('tutor');
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const currentFAQs = activeTab === 'tutor' ? tutorFAQs : studentFAQs;

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about the product and billing. Can't find the answer you're looking for? Please chat to our friendly team.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setActiveTab('tutor')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'tutor'
                  ? 'bg-[#0AB5F8] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Tutor
            </button>
            <button
              onClick={() => setActiveTab('student')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'student'
                  ? 'bg-[#0AB5F8] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Guardian/Student
            </button>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {currentFAQs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
                <span className="text-2xl text-[#0AB5F8] font-light">
                  {openQuestion === index ? '−' : '+'}
                </span>
              </button>
              {openQuestion === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section
        <div className="mt-16 text-center bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Please chat to our friendly team.
          </p>
          <button className="bg-[#0AB5F8] text-white px-6 py-3 rounded-lg hover:bg-[#0891b2] transition-colors font-medium">
            Get in touch
          </button>
        </div> */}
      </div>
    </section>
  );
}