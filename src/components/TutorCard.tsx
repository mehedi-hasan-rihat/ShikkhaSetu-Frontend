import { Tutor } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface TutorCardProps {
  tutor: Tutor;
  onViewProfile: (tutorId: string) => void;
  onBookSession?: (tutorId: string) => void;
}

export function TutorCard({ tutor, onViewProfile, onBookSession }: TutorCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white overflow-hidden">
      <CardContent className="p-0">
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-br from-[#0AB5F8] to-[#0891b2] p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center overflow-hidden">
                {tutor.avatar ? (
                  <img src={tutor.avatar} alt={tutor.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-white">
                    {tutor.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-400 rounded-full p-1">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">{tutor.name}</h3>
              <p className="text-cyan-100 text-sm mb-2">{tutor.profile.experience} years experience</p>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-white/20 rounded-full px-2 py-1">
                  <svg className="h-4 w-4 text-yellow-300 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium text-white">
                    {tutor.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-cyan-100 text-sm">({tutor.totalReviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tutor.profile.bio}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {tutor.profile.subjects.slice(0, 2).map((subject) => (
                <span
                  key={subject.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-50 to-blue-50 text-[#0AB5F8] border border-cyan-200"
                >
                  {subject.name}
                </span>
              ))}
              {tutor.profile.subjects.length > 2 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  +{tutor.profile.subjects.length - 2} more
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">${tutor.profile.hourlyRate}</span>
              <span className="text-gray-500 text-sm">/hour</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Available now
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex space-x-3 w-full">
          <Button 
            variant="outline" 
            onClick={() => onViewProfile(tutor.id)} 
            className="flex-1 border-gray-300 hover:border-[#0AB5F8] hover:text-[#0AB5F8] transition-colors"
          >
            View Profile
          </Button>
          {onBookSession && (
            <Button 
              onClick={() => onBookSession(tutor.id)} 
              className="flex-1 bg-gradient-to-r from-[#0AB5F8] to-[#0891b2] hover:from-[#0891b2] hover:to-[#0AB5F8] border-0 shadow-md hover:shadow-lg transition-all"
            >
              Book Now
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}