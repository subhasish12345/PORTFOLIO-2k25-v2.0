import React from 'react';
import Pattern from '../components/PatternBackground';

const teamMembers = [
  {
    name: 'Subhasish Nayak',
    role: 'Lead Developer',
    image: '/CERTIFICATES/profile.jpg',
    description: 'Building the Future with Code | Android Developer | AI/ML Enthusiast',
  },
  {
    name: 'Member 2',
    role: 'Frontend Developer',
    image: '/CERTIFICATES/NEXTZONE.jpg',
    description: 'Expert in React and UI/UX design',
  },
  {
    name: 'Member 3',
    role: 'Backend Developer',
    image: '/CERTIFICATES/COGNIFY.jpg',
    description: 'Specialist in Node.js and database management',
  },
  // Add more members as needed
];

const Team = () => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <Pattern />
      <div className="relative z-10 container mx-auto px-6 py-20 text-white">
        <h1 className="text-4xl font-bold mb-12 text-center">Meet the Nanites</h1>
        <div className="grid md:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white bg-opacity-10 rounded-xl p-6 flex flex-col items-center text-center backdrop-blur-md shadow-lg">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              />
              <h2 className="text-xl font-semibold mb-1">{member.name}</h2>
              <p className="text-sm italic mb-3">{member.role}</p>
              <p className="text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
