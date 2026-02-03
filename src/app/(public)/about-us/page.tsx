export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About ShikkhaSetu</h1>
          <p className="text-xl text-gray-600">Connecting learners with expert tutors across Bangladesh</p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              At ShikkhaSetu, we believe that quality education should be accessible to everyone. Our platform connects 
              students with experienced tutors, making personalized learning convenient and effective.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-[#0AB5F8] mb-2">For Students</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Find qualified tutors</li>
                  <li>• Book sessions easily</li>
                  <li>• Learn at your pace</li>
                  <li>• Affordable pricing</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#0AB5F8] mb-2">For Tutors</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Reach more students</li>
                  <li>• Flexible scheduling</li>
                  <li>• Secure payments</li>
                  <li>• Build reputation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}