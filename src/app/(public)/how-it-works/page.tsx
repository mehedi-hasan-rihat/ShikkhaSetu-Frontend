export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h1>
          <p className="text-xl text-gray-600">Simple steps to start your learning journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-[#0AB5F8] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Find a Tutor</h3>
            <p className="text-gray-600">Browse through our verified tutors and find the perfect match for your subject</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-[#0AB5F8] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Book a Session</h3>
            <p className="text-gray-600">Choose your preferred time slot and book a session with your selected tutor</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-[#0AB5F8] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Start Learning</h3>
            <p className="text-gray-600">Attend your session and start your personalized learning experience</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">For Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-[#0AB5F8] mb-3">Getting Started</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Create your student account</li>
                  <li>• Browse available tutors</li>
                  <li>• Read reviews and ratings</li>
                  <li>• Select your preferred tutor</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#0AB5F8] mb-3">Booking Process</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Choose available time slots</li>
                  <li>• Make secure payment</li>
                  <li>• Receive confirmation</li>
                  <li>• Join your session</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">For Tutors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-[#0AB5F8] mb-3">Join Our Platform</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Register as a tutor</li>
                  <li>• Complete profile verification</li>
                  <li>• Set your subjects and rates</li>
                  <li>• Define your availability</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#0AB5F8] mb-3">Start Teaching</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Receive booking requests</li>
                  <li>• Conduct sessions</li>
                  <li>• Get paid securely</li>
                  <li>• Build your reputation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}