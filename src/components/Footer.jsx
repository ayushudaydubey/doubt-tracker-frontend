import React from "react";
import { Link } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github,
  Heart,
  ExternalLink
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-black to-gray-950 text-gray-200 border-t border-gray-800/50 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <img 
                  src="https://imgs.search.brave.com/P7k2VzGBzqR91lv6eAo6-B7u5abDk_OM2QzMXp3gw9g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTIv/MjU1LzM0NS9zbWFs/bC9saW9uLW1hc2Nv/dC1sb2dvLWVtYmxl/bS1pc29sYXRlZC1i/YWNrZ3JvdW5kLXBu/Zy5wbmc" 
                  alt="Doubt Tracker Logo" 
                  className="w-10 h-10 object-cover rounded-xl relative z-10 border-2 border-green-500/30" 
                />
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Doubt Tracker
              </h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering students and mentors to collaborate effectively. Clear your doubts, enhance your learning journey.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800/50 hover:bg-green-500/20 border border-gray-700/50 hover:border-green-500/50 rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <Facebook size={18} className="text-gray-400 group-hover:text-green-400 transition-colors" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800/50 hover:bg-green-500/20 border border-gray-700/50 hover:border-green-500/50 rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <Twitter size={18} className="text-gray-400 group-hover:text-green-400 transition-colors" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800/50 hover:bg-green-500/20 border border-gray-700/50 hover:border-green-500/50 rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <Instagram size={18} className="text-gray-400 group-hover:text-green-400 transition-colors" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800/50 hover:bg-green-500/20 border border-gray-700/50 hover:border-green-500/50 rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <Linkedin size={18} className="text-gray-400 group-hover:text-green-400 transition-colors" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800/50 hover:bg-green-500/20 border border-gray-700/50 hover:border-green-500/50 rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <Github size={18} className="text-gray-400 group-hover:text-green-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-green-400 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link 
                  to="/about" 
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard/student" 
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard/mentor" 
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  Mentor Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  to="/support" 
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-green-400 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link 
                  to="/privacy-policy" 
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <a 
                  href="/docs" 
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  Documentation
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-semibold mb-4 text-green-400 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:support@doubttracker.com" 
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 bg-gray-800/50 group-hover:bg-green-500/20 border border-gray-700/50 group-hover:border-green-500/50 rounded-lg flex items-center justify-center transition-all flex-shrink-0 mt-0.5">
                    <Mail size={16} className="text-gray-400 group-hover:text-green-400 transition-colors" />
                  </div>
                  <span className="break-all">support@doubttracker.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+1234567890" 
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 bg-gray-800/50 group-hover:bg-green-500/20 border border-gray-700/50 group-hover:border-green-500/50 rounded-lg flex items-center justify-center transition-all flex-shrink-0 mt-0.5">
                    <Phone size={16} className="text-gray-400 group-hover:text-green-400 transition-colors" />
                  </div>
                  <span>+1 (234) 567-890</span>
                </a>
              </li>
              <li>
                <div className="text-sm text-gray-400 flex items-start gap-3 group">
                  <div className="w-8 h-8 bg-gray-800/50 border border-gray-700/50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={16} className="text-gray-400" />
                  </div>
                  <span className="leading-relaxed">
                    123 Learning Street,<br />
                    Education City, EC 12345
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center md:text-left">
            © {currentYear} Doubt Tracker. All rights reserved.
          </p>
          
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span>Made with</span>
            <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
            <span>by the Doubt Tracker Team</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link 
              to="/sitemap" 
              className="text-gray-500 hover:text-green-400 transition-colors duration-300"
            >
              Sitemap
            </Link>
            <span className="text-gray-700">|</span>
            <Link 
              to="/accessibility" 
              className="text-gray-500 hover:text-green-400 transition-colors duration-300"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Accent */}
      <div className="h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
    </footer>
  );
};

export default Footer;