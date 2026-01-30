export function JoinSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Join <span className="text-[#0AB5F8]">ShikkhaShetu</span> & Transform Your Learning Journey
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Student Card */}
          <div className="bg-purple-100 rounded-2xl p-8 flex items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://bdtutors-cdn.blr1.cdn.digitaloceanspaces.com/assets/bdtutor/static-items/ask-tutor-icon.svg"
                  alt="Ask tutor icon"
                  className="w-12 h-12"
                />
                <h3 className="text-xl font-semibold text-gray-900">
                  Connect with the right tutor and move forward
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Find expert tutors who understand your learning goals and help you improve with confidence all in just a few easy steps.
              </p>
              <button className="bg-[#0AB5F8] text-white px-6 py-3 rounded-lg hover:bg-[#0891b2] transition-colors cursor-pointer">
                Request for a tutor
              </button>
            </div>
            <div className="flex-shrink-0">
              <img 
                src="https://bdtutors-cdn.blr1.cdn.digitaloceanspaces.com/assets/bdtutor/static-items/study.svg"
                alt="Study illustration"
                width={270}
                height={270}
                className="w-64 h-64"
              />
            </div>
          </div>

          {/* Tutor Card */}
          <div className="bg-purple-200 rounded-2xl p-8 flex items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://bdtutors-cdn.blr1.cdn.digitaloceanspaces.com/assets/bdtutor/static-items/became-tutor.svg"
                  alt="Become tutor icon"
                  className="w-12 h-12"
                />
                <h3 className="text-xl font-semibold text-gray-900">
                  Join as a tutor, find a tuition for you
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Join as a tutor to find students who match your expertise and schedule. Share your knowledge and grow your teaching journey.
              </p>
              <button className="bg-[#0AB5F8] text-white px-6 py-3 rounded-lg hover:bg-[#0891b2] transition-colors cursor-pointer">
                Join as a tutor
              </button>
            </div>
            <div className="flex-shrink-0">
              <img 
                src="https://bdtutors-cdn.blr1.cdn.digitaloceanspaces.com/assets/bdtutor/static-items/study-tutor.svg"
                alt="Tutor illustration"
                width={270}
                height={270}
                className="w-64 h-64"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}