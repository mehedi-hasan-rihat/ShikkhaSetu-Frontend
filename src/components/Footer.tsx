import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0AB5F8] to-[#0891b2] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <h4 className="text-2xl font-bold bg-gradient-to-r from-[#0AB5F8] to-[#0891b2] bg-clip-text text-transparent">
                ShikkhaSetu
              </h4>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Connecting learners with expert tutors worldwide. Transform your learning journey with personalized education.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-6 text-[#0AB5F8]">For Students</h5>
            <ul className="space-y-3">
              <li><Link href="/tutors" className="text-gray-300 hover:text-[#0AB5F8] transition-colors">Find Tutors</Link></li>
              <li><Link href="/register" className="text-gray-300 hover:text-[#0AB5F8] transition-colors">Sign Up</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-6 text-[#0AB5F8]">For Tutors</h5>
            <ul className="space-y-3">
              <li><Link href="/register?role=tutor" className="text-gray-300 hover:text-[#0AB5F8] transition-colors">Become a Tutor</Link></li>
              <li><Link href="/dashboard" className="text-gray-300 hover:text-[#0AB5F8] transition-colors">Dashboard</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 ShikkhaSetu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}