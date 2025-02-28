'use client';
import {
  Star,
  Briefcase,
  Calendar,
  PhoneCall,
} from 'lucide-react';

export default function MentorProfile() {
  return (
    <div className="max-w-4xl mx-auto p-6  rounded-xl shadow-lg mt-10">
      {/* Mentor Header */}
      <div className="flex items-center space-x-4">
        <img
          src="/images/client2.jpg"
          alt="Mentor"
          className="w-20 h-20 rounded-full border-2 border-gray-300"
        />
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Yash Patel</h1>
          <p className="text-gray-600">
            Strategy @CEOs Office | Dual MBA | 500+ Students Mentored
          </p>
          <div className="flex items-center space-x-2 mt-1">
            <Star className="text-yellow-500" size={18} />
            <span className="text-gray-700 font-medium">4.8</span>
            <span className="bg-yellow-400 text-white text-xs px-2 py-1 rounded-full">
              Top Mentor
            </span>
          </div>
        </div>
      </div>

      {/* About Mentor */}
      <div className="mt-4 border-t pt-4">
        <h2 className="text-xl font-semibold">About the Mentor</h2>
        <p className="text-gray-700 mt-2">
          You never know how 15 mins can change your career? Ive mentored 500+
          students in the past 6 months, resulting in 50+ national podiums, 5
          PPIs/PPOs, and 3+ CFA-RC Campus Winners.
        </p>
        <p className="text-gray-700 mt-2">
          Hey, Im Yash, a dual MBA holder and strategy manager at CEO office.
          Impressive right? But trust me, this is all achievable with the right
          guidance.
        </p>
        <p className="text-blue-500 mt-2 font-medium">
          What are you waiting for? ₹9 is still cheaper than a packet of Lays,
          right?
        </p>
      </div>

      {/* Services */}
      <div className="mt-6 border-t pt-4">
        <h2 className="text-xl font-semibold">Services</h2>
        <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between mt-2">
          <div className="flex items-center space-x-3">
            <PhoneCall className="text-blue-500" size={24} />
            <div>
              <h3 className="font-medium">
                Quick Call | Mentorship on any topic
              </h3>
              <p className="text-sm text-gray-600">
                15 Min - ₹9 (Limited Offer)
              </p>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Book Now
          </button>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="mt-6 border-t pt-4">
        <h2 className="text-xl font-semibold">Experience</h2>
        <p className="text-gray-700 mt-2 flex items-center">
          <Briefcase className="mr-2 text-blue-500" size={18} /> Strategy
          Manager @CEOs Office
        </p>
        <p className="text-gray-700 mt-1 flex items-center">
          <Calendar className="mr-2 text-blue-500" size={18} /> 4+ years in
          Business & Management
        </p>
      </div>

      <div className="mt-6 border-t pt-4">
        <h2 className="text-xl font-semibold">Courses</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          <li>Case Competitions Mastery</li>
          <li>Career Growth & Strategy</li>
          <li>Personal Branding & Networking</li>
        </ul>
      </div>

      <div className="mt-6 border-t pt-4">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <div className="bg-gray-100 p-4 rounded-lg mt-2">
          <p className="text-gray-700">
            "Yash mentorship was life-changing! His guidance helped me land a
            PPI at my dream company."
          </p>
          <p className="text-sm text-gray-500 mt-1">- Mentee</p>
        </div>
      </div>
    </div>
  );
}
