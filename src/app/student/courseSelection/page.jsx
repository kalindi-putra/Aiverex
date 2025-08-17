"use client";

import React,{useState} from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Award, Clock, Users , X } from 'lucide-react';
import './page.module.css'

const CertificationLanguageSelection = () => {
  const router = useRouter();
  const[isLoading, setIsLoading] = useState(false);
  const[error, setError] = useState(null);


//loading and error components
  const LoadingOverlay=()=>{
    return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white/10 p-6 rounded-lg flex items-center space-x-3">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      <span className="text-white font-medium">Preparing your certification...</span>
    </div>
  </div>
    );
  }

  const ErrorMessage=({message,onDismiss})=>{
    return(
     <div className="fixed top-4 right-4 bg-red-500/90 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-fade-in">
    <span>{message}</span>
    <button 
      onClick={onDismiss} 
      className="ml-4 hover:text-red-100 transition-colors"
      aria-label="Dismiss error"
    >
      <X size={18} />
    </button>
  </div>
    );
  }

  const certificationLanguages = [
    { 
      id: 'python', 
      name: 'Python Developer', 
      color: 'bg-blue-500 hover:bg-blue-600',
      icon: '🐍',
      description: 'Master Python programming and algorithms',
      duration: '90 minutes',
      questions: '15 problems',
      difficulty: 'Intermediate',
      skills: ['Data Structures', 'Algorithms', 'OOP', 'Libraries']
    },
    { 
      id: 'java', 
      name: 'Java Developer', 
      color: 'bg-orange-500 hover:bg-orange-600',
      icon: '☕',
      description: 'Demonstrate Java expertise and best practices',
      duration: '90 minutes',
      questions: '15 problems',
      difficulty: 'Intermediate',
      skills: ['OOP', 'Collections', 'Multithreading', 'Spring']
    },
    { 
      id: 'cpp', 
      name: 'C++ Developer', 
      color: 'bg-purple-500 hover:bg-purple-600',
      icon: '⚡',
      description: 'Prove your C++ and systems programming skills',
      duration: '90 minutes',
      questions: '15 problems',
      difficulty: 'Advanced',
      skills: ['Memory Management', 'STL', 'Templates', 'Performance']
    },
    { 
      id: 'javascript', 
      name: 'JavaScript Developer', 
      color: 'bg-yellow-500 hover:bg-yellow-600',
      icon: '🚀',
      description: 'Showcase modern JavaScript and web development',
      duration: '90 minutes',
      questions: '15 problems',
      difficulty: 'Intermediate',
      skills: ['ES6+', 'Async/Await', 'DOM', 'Node.js']
    },
    // Future extensions
    { 
      id: 'react', 
      name: 'React Developer', 
      color: 'bg-cyan-500 hover:bg-cyan-600',
      icon: '⚛️',
      description: 'Master React.js and modern frontend development',
      duration: '90 minutes',
      questions: '12 problems',
      difficulty: 'Intermediate',
      skills: ['Hooks', 'State Management', 'Components', 'Performance'],
      comingSoon: true
    },
    { 
      id: 'aws', 
      name: 'AWS Cloud Practitioner', 
      color: 'bg-amber-500 hover:bg-amber-600',
      icon: '☁️',
      description: 'Demonstrate AWS cloud services knowledge',
      duration: '120 minutes',
      questions: '20 problems',
      difficulty: 'Intermediate',
      skills: ['EC2', 'S3', 'Lambda', 'Security'],
      comingSoon: true
    }
  ];

  const handleCertificationSelect = async (certification) => {
    if (certification.comingSoon) {
      setError('This certification is not available yet. Please check back later.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call to validate certification availability
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      router.push(`/student/codeEditor?lang=${certification.id}`);
      
    } catch (err) {
      setError('Failed to start certification. Please try again.');
      console.log('Certification selection error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToDashboard = async () => {
    try {
      setIsLoading(true);
      router.push('/student/dashboard');
    } catch (err) {
      setError('Failed to return to dashboard. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 p-4">
      {isLoading && <LoadingOverlay />}
      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            onClick={handleBackToDashboard}
            className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Award className="w-12 h-12 text-yellow-400 mr-4" />
              <h1 className="text-5xl font-bold text-white">Get Certified</h1>
            </div>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Choose your certification path and demonstrate your expertise. 
              Each certification tests your practical skills through hands-on coding challenges.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificationLanguages.map((cert) => (
            <div
              key={cert.id}
              className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl ${cert.comingSoon ? 'opacity-75' : ''}`}
              onClick={() => handleCertificationSelect(cert)}
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{cert.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{cert.name}</h3>
                {cert.comingSoon && (
                  <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs font-medium mb-2">
                    Coming Soon
                  </span>
                )}
                <p className="text-gray-300 text-sm leading-relaxed">{cert.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    Duration
                  </div>
                  <span className="text-white">{cert.duration}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-400">
                    <Users className="w-4 h-4 mr-2" />
                    Problems
                  </div>
                  <span className="text-white">{cert.questions}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Difficulty</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    cert.difficulty === 'Advanced' ? 'bg-red-400/20 text-red-300' :
                    cert.difficulty === 'Intermediate' ? 'bg-yellow-400/20 text-yellow-300' :
                    'bg-green-400/20 text-green-300'
                  }`}>
                    {cert.difficulty}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Skills Covered:</h4>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                className={`w-full ${cert.color} text-white py-3 px-4 rounded-lg font-semibold 
    transition-all duration-200 transform hover:scale-105 
    ${(cert.comingSoon || isLoading) ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={cert.comingSoon || isLoading}
                onClick={() => handleCertificationSelect(cert)}
              >
                {isLoading ? (
    <div className="flex items-center justify-center space-x-2">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      <span>Preparing...</span>
    </div>
  ) : cert.comingSoon ? (
    'Coming Soon'
  ) : (
    `Start ${cert.name} Certification`
  )}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 max-w-2xl mx-auto">
            <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Why Get Certified?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-300">
              <div>
                <div className="font-semibold text-white mb-2">Industry Recognition</div>
                <div>Validate your skills with employers worldwide</div>
              </div>
              <div>
                <div className="font-semibold text-white mb-2">Career Growth</div>
                <div>Boost your resume and unlock new opportunities</div>
              </div>
              <div>
                <div className="font-semibold text-white mb-2">Practical Testing</div>
                <div>Real coding challenges, not just theory</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationLanguageSelection;