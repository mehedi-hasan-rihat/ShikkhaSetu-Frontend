import React from 'react';

export function Hero() {
  const subjects = [
    'accounting', 'arabic', 'bangla', 'biology', 'biotechnology', 'buet',
    'chemistry', 'CSE', 'dance', 'Dhaka Medical', 'Dhaka University',
    'economics', 'english', 'english Medium', 'IELTS', 'Math', 'physics',
    'Spoken English', 'statistics', 'writing', 'HSC Tutors', 'SSC Tutors',
    'A level Tutors', 'O level Tutors'
  ];

  const scrollSpeed = 30; // seconds - adjust this to control speed

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    const statsSection = document.getElementById('stats-section');
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <section className="w-full bg-linear-to-br from-blue-50 to-cyan-50 pt-20 pb-32 lg:pt-52">
        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center md:gap-6 lg:flex-row lg:justify-between">
            <div className="relative flex w-full flex-1 flex-col items-start justify-center px-4 lg:w-1/2 lg:px-0">
              <div className="relative">
                <div className="text-center relative z-10 md:text-left text-3xl md:text-[48px] font-bold leading-normal md:leading-16.75 text-gray-900">
                  <h1>
                    The Nation's Largest Network for{' '}
                    <span className="block"></span>{' '}
                    <span className="bg-[#0AB5F8] px-2 rounded-md text-white">Quality</span> Tutors
                  </h1>
                </div>
              </div>

              <p className="my-4 text-center text-sm font-medium md:text-left md:text-base text-gray-600">
                Individualized, one-on-one instructional sessions with a highly qualified instructor of your selection. Meet online or in person.
              </p>

              <div className="flex items-start gap-2 text-xs">
                <div className="flex items-start gap-2 text-xs">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-lg md:text-2xl text-[#0AB5F8]" height="1em" width="1em">
                    <path d="m10 10.414 4 4 5.707-5.707L22 11V5h-6l2.293 2.293L14 11.586l-4-4-7.707 7.707 1.414 1.414z"></path>
                  </svg>
                  <p className="text-sm font-medium text-gray-700 md:text-lg">Trending: </p>
                </div>

                <div className="relative flex overflow-hidden max-w-lg">
                  <div className="absolute left-0 top-0 w-8 h-full bg-linear-to-r from-blue-50 to-transparent z-10 pointer-events-none"></div>
                  <div className="absolute right-0 top-0 w-8 h-full bg-linear-to-l from-blue-50 to-transparent z-10 pointer-events-none"></div>
                  <div className="flex gap-2 whitespace-nowrap" style={{ animation: `scroll ${scrollSpeed}s linear infinite` }}>
                    {[...subjects, ...subjects].map((subject, index) => (
                      <a
                        key={index}
                        className="inline-flex cursor-pointer select-none rounded-full bg-white border border-[#0AB5F8] px-3 py-1 font-medium capitalize text-[#0AB5F8] shadow-sm outline-none duration-300 transition-all hover:bg-[#0AB5F8] hover:text-white shrink-0"
                        href={`/${subject.toLowerCase().replace(' ', '-')}-tutors`}
                      >
                        {subject}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 flex w-full items-center space-x-4">
                <a
                  className="flex-1 rounded-lg bg-[#0AB5F8] py-4 text-center text-[17px] font-bold text-white transition-all duration-300 hover:bg-[#0891b2] hover:scale-105 md:text-xl"
                  href="/tutors"
                >
                  Find Tutors
                </a>
                <a
                  className="flex-1 rounded-lg border-2 border-[#0AB5F8] bg-white py-4 text-center text-[17px] font-bold text-[#0AB5F8] md:text-xl transition-all duration-300 hover:bg-[#0AB5F8] hover:text-white hover:scale-105"
                  href="/register"
                >
                  Request For Tutor
                </a>
              </div>
            </div>

            <div className="flex w-full justify-center lg:w-1/2">

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}