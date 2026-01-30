import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Users, MessageCircle, CheckCircle } from "lucide-react";
import linoImage from "../assets/lino.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-200 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-20 md:py-28 max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-full text-sm text-green-400 backdrop-blur-sm">
            <Sparkles size={16} className="animate-pulse" />
            <span className="font-medium">Smart Learning Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl  leading-tight">
            <span className="text-gray-200">Welcome to</span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent animate-gradient">
              DoubtTracker
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto md:mx-0 font-thin">
            A smart platform where students raise coding doubts and mentors reply
            with clarity. Track, manage, and resolve questions all in one place.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-xs text-gray-300">
              <CheckCircle size={14} className="text-green-400" />
              <span>Real-time Tracking</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-xs text-gray-300">
              <CheckCircle size={14} className="text-green-400" />
              <span>Expert Mentors</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-xs text-gray-300">
              <CheckCircle size={14} className="text-green-400" />
              <span>Quick Resolutions</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <Link
              to="/auth/mentor-login"
              className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Users size={20} />
              <span>Mentor Login</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/auth/student-login"
              className="group relative px-8 py-4 bg-transparent border-2 border-green-500 hover:border-green-400 text-green-400 hover:text-white hover:bg-green-500/10 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <MessageCircle size={20} />
              <span>Student Login</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative group">
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-2xl blur-2xl group-hover:blur-2xl transition-all duration-500"></div>
            
            {/* Image container */}
            <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden p-2 group-hover:border-green-500/50 transition-all duration-500">
              <img
                src={linoImage}
                alt="Doubt illustration"
                className="w-full h-full object-cover rounded-xl transform  transition-transform duration-500"
              />
              
              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full blur-xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat Card 1 */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:border-green-500/50 group">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                <Users size={28} className="text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-green-400">50+</p>
                <p className="text-sm text-gray-400">Active Mentors</p>
              </div>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:border-green-500/50 group">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                <MessageCircle size={28} className="text-white" />
              </div>
              <div>
                <p className="text-3xl  text-green-400">10K+</p>
                <p className="text-sm text-gray-400">Students taught</p>
              </div>
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:border-green-500/50 group">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                <CheckCircle size={28} className="text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-green-400">95%</p>
                <p className="text-sm text-gray-400">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
    </div>
  );
};

export default Home;