export function ProTutors() {
  const proTutors = [
    {
      id: 1,
      name: 'sudip B.',
      university: 'IUB',
      department: 'CSE',
      experience: '12 Year Experienced',
      rating: 4.9,
      price: 22000,
      location: 'Dhanmondi, Dhaka',
      image: 'https://eudikaimageproduction.s3.ap-south-1.amazonaws.com/profile/1719935044656-929889425.jpeg',
      verified: true,
      pro: true,
      wins: 9,
      subjects: ['Additional Maths', 'Chemistry', 'Physics', 'Biology', 'Maths D', 'Maths B'],
      category: 'science'
    },
    {
      id: 2,
      name: 'Rahman K.',
      university: 'BUET',
      department: 'EEE',
      experience: '8 Year Experienced',
      rating: 4.8,
      price: 18000,
      location: 'Gulshan, Dhaka',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      verified: true,
      pro: true,
      wins: 7,
      subjects: ['Physics', 'Mathematics', 'Engineering'],
      category: 'engineering'
    },
    {
      id: 3,
      name: 'Fatima A.',
      university: 'DU',
      department: 'English',
      experience: '6 Year Experienced',
      rating: 4.9,
      price: 15000,
      location: 'Uttara, Dhaka',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      verified: true,
      pro: true,
      wins: 5,
      subjects: ['English', 'Literature', 'Writing'],
      category: 'language'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between px-2">
          <div>
            <h2 className="font-mulish text-3xl font-bold text-gray-900 md:text-5xl/normal">
              Our Pro Tutors
            </h2>
            <p className="font-mulish text-sm font-medium md:text-left md:text-base text-[#0AB5F8]">
              These are some of our Elite&nbsp;Tutors!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proTutors.map((tutor) => (
            <div key={tutor.id} className="flex flex-col relative overflow-hidden h-auto bg-white outline-none transition-transform-background motion-reduce:transition-none min-h-60 w-full rounded-2xl border-2 border-[#0AB5F8] p-3 shadow-lg md:min-h-56.25">
              <div className="relative w-full flex-auto flex-col h-auto grid grid-cols-5 gap-5 p-0">
                {/* Left Column - Image and Buttons */}
                <div className="col-span-2 flex w-full flex-col items-center justify-center gap-3 rounded-md">
                  <div className="relative flex size-full flex-1 shrink-0 items-center justify-center overflow-hidden rounded-md">
                    <img
                      alt={tutor.name}
                      src={tutor.image}
                      className="pointer-events-none size-24 select-none rounded-full object-cover ring-2 ring-black md:size-32 opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="flex w-full shrink-0 flex-col items-stretch gap-2 px-2.5 pb-2.5 md:flex-row">
                    <a
                      href={`/tutor-profile/${tutor.name.toLowerCase().replace(' ', '-')}-${tutor.id}`}
                      className="flex-1 rounded-lg border-2 border-[#0AB5F8] bg-[#0AB5F8] py-1.5 font-semibold md:py-0 text-center transition-transform hover:scale-95 text-white"
                    >
                      View
                    </a>
                    <button className="rounded-lg border-2 border-[#0AB5F8] bg-white font-semibold py-1.5 px-3 transition-transform hover:scale-95 flex items-center gap-1 text-[#0AB5F8]">
                      Request
                      <svg className="inline-block w-4 h-4" fill="currentColor" viewBox="0 0 640 512">
                        <path d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Right Column - Details */}
                <div className="col-span-3 flex flex-col pb-2.5 pr-0.5 pt-4 md:pr-4">
                  {/* Experience Badge and Category Icon */}
                  <div className="mb-3 flex items-center gap-2 md:mb-2">
                    <span className="w-fit p-1 text-xs font-medium pointer-events-none select-none whitespace-nowrap rounded-md bg-[#0AB5F8] px-3 text-white md:text-sm">
                      {tutor.experience}
                    </span>

                  </div>

                  {/* Name and Badges */}
                  <div className="mb-2 flex w-full flex-1 items-center gap-2">
                    <h5 className="flex-1 truncate text-sm font-bold md:text-lg">{tutor.name}</h5>
                    <div className="flex shrink-0 items-center justify-between gap-3">
                      {tutor.verified && (
                        <div className="size-6 shrink-0 cursor-pointer">
                          <svg className="w-full h-full text-[#0AB5F8]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      
                      {tutor.pro && (
                        <div className="flex items-center gap-1 rounded-lg border bg-[#0AB5F8] px-3 py-0.5 text-sm text-white">
                          <span className="w-3 h-3 bg-white rounded"></span>
                          <span className="font-semibold">Pro</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* University and Department */}
                  <div className="flex flex-1 flex-col">
                    <p className="line-clamp-1 text-sm font-medium">{tutor.university}</p>
                    <p className="mb-3 mt-0.5 line-clamp-1 text-sm">
                      <span className="font-semibold">Department:</span> {tutor.department}
                    </p>

                    {/* Price and Location */}
                    <div className="mb-2 flex flex-1 flex-col items-start justify-between gap-2 md:flex-row md:items-center md:gap-2">
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-medium sm:text-sm">
                          ৳ {tutor.price.toLocaleString()}
                          <span className="text-gray-500 text-xs font-medium sm:text-sm">/Month</span>
                        </p>
                        <div className="cursor-pointer text-[#0AB5F8]">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
                            <path d="M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 56 256 56zm0 82a26 26 0 11-26 26 26 26 0 0126-26zm64 226H200v-32h44v-88h-32v-32h64v120h44z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="inline-block text-sm w-4 h-4" fill="currentColor" viewBox="0 0 384 512">
                          <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                        </svg>
                        <span className="block truncate text-xs font-medium sm:text-sm md:max-w-32.5">
                          {tutor.location}
                        </span>
                      </div>
                    </div>

                    {/* Subjects */}
                    <div className="flex w-full cursor-grab items-center gap-2 overflow-x-auto pr-1">
                      {tutor.subjects.slice(0, 4).map((subject, index) => (
                        <div key={index} className="select-none whitespace-nowrap rounded-full border px-3 py-1 text-sm font-normal leading-normal border-gray-400 bg-white text-gray-600">
                          {subject}
                        </div>
                      ))}
                      {tutor.subjects.length > 4 && (
                        <div className="select-none whitespace-nowrap rounded-full border px-3 py-1 text-sm font-normal leading-normal border-gray-400 bg-white text-gray-600">
                          +{tutor.subjects.length - 4}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}