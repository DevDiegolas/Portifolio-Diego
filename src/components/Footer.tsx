import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 py-10 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Left side: Copyright */} 
        <p className="text-sm text-gray-500">
          &copy; 2026 Diego Gonçalves. All rights reserved.
        </p>

        {/* Middle: Tagline (optional) */} 
        <p className="text-sm text-gray-400">
          Crafting games and scalable systems.
        </p>

        {/* Right side: Social links */} 
        <div className="flex space-x-4">
          <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
            GitHub
          </a>
          <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
            LinkedIn
          </a>
          <a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;