import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <Link href="/" className="flex items-center group">
                                <svg className="w-12 h-12 text-[#0AB5F8] group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V15h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                                </svg>
                            </Link>
                            <h4 className="text-xl font-bold text-gray-900">
                                ShikkhaSetu
                            </h4>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Connect with Expert Tutors, Learn Anything.
                        </p>
                    </div>
                    <div>
                        <h5 className="font-semibold text-gray-900 mb-4">For Students</h5>
                        <ul className="space-y-2">
                            <li><Link href="/tutors" className="text-gray-600 hover:text-[#0AB5F8] transition-colors text-sm">Find Tutors</Link></li>
                            <li><Link href="/register" className="text-gray-600 hover:text-[#0AB5F8] transition-colors text-sm">Sign Up</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold text-gray-900 mb-4">For Tutors</h5>
                        <ul className="space-y-2">
                            <li><Link href="/register?role=tutor" className="text-gray-600 hover:text-[#0AB5F8] transition-colors text-sm">Become a Tutor</Link></li>
                            <li><Link href="/dashboard" className="text-gray-600 hover:text-[#0AB5F8] transition-colors text-sm">Dashboard</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-200 mt-8 pt-6 text-center">
                    <p className="text-gray-500 text-sm">
                        © 2024 SkillBridge. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}