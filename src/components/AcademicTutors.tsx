import Link from 'next/link';

export function AcademicTutors() {
  const mediums = [
    {
      id: 'english-medium',
      name: 'English Medium',
      icon: 'https://bdtutors-cdn.blr1.cdn.digitaloceanspaces.com/assets/bdtutor/static-items/english-medium.svg',
      href: '/tutors?medium=english'
    },
    {
      id: 'bangla-medium', 
      name: 'Bangla Medium',
      icon: 'https://bdtutors-cdn.blr1.cdn.digitaloceanspaces.com/assets/bdtutor/static-items/bangla-medium.svg',
      href: '/tutors?medium=bangla'
    },
    {
      id: 'english-version',
      name: 'English Version',
      icon: 'https://bdtutors-cdn.blr1.cdn.digitaloceanspaces.com/assets/bdtutor/static-items/english-version.svg', 
      href: '/tutors?medium=english-version'
    },
    {
      id: 'arabic-medium',
      name: 'Arabic Medium',
      icon: 'https://bdtutors-cdn.blr1.cdn.digitaloceanspaces.com/assets/bdtutor/static-items/arabic-medium.svg',
      href: '/tutors?medium=arabic'
    },
    {
      id: 'others',
      name: 'Others',
      icon: 'https://bdtutors-cdn.blr1.cdn.digitaloceanspaces.com/assets/bdtutor/static-items/others.svg',
      href: '/tutors?medium=others'
    }
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between px-2">
          <div>
            <h2 className="font-mulish text-3xl font-bold text-gray-900 md:text-5xl/normal">
              Find your academic tutors
            </h2>
            <p className="font-mulish text-sm font-medium md:text-left md:text-base text-[#0AB5F8]">
              Connect with tutors who match your goals and learning style easily.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {mediums.map((medium) => (
            <Link
              key={medium.id}
              href={medium.href}
              className="wrapper group relative bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center border border-gray-200 hover:border-[#0AB5F8]/30 cursor-pointer"
              role="button"
              tabIndex={0}
              style={{
                '--arrow-url': 'url(https://bdtutors-cdn.blr1.cdn.digitaloceanspaces.com/assets/bdtutor/static-items/green-arrow-icon.svg)'
              } as React.CSSProperties}
            >
              <div className="item flex justify-center mb-4">
                <img 
                  alt="" 
                  loading="lazy" 
                  width="66" 
                  height="66" 
                  decoding="async" 
                  src={medium.icon}
                  className="w-16 h-16"
                />
              </div>
              <div className="class-item">
                <span className="upper-lower text-lg font-medium text-gray-900 group-hover:text-[#0AB5F8] transition-colors">
                  {medium.name}
                </span>
              </div>
              
              {/* Arrow indicator using CSS variable */}
              <div className="absolute top-4 right-4 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity bg-[image:var(--arrow-url)] bg-no-repeat bg-center bg-contain"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}