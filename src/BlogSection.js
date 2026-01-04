import React, { useState } from 'react';

export default function BlogSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="min-h-screen bg-black py-32 px-6 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, #ff006e 50px, #ff006e 51px),
                           repeating-linear-gradient(90deg, transparent, transparent 50px, #8338ec 50px, #8338ec 51px)`
        }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Main content */}
        <div className="mb-12">
          <h2 className="text-white text-7xl md:text-9xl font-black mb-6 tracking-tight">
            BLOG
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-8"></div>
        </div>

        {/* Interactive card */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Neon border effect */}
          <div className={`absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-lg blur-lg transition-all duration-500 ${isHovered ? 'opacity-75' : 'opacity-0'}`}></div>
          
          <div className="relative bg-zinc-900 border-4 border-white p-12 md:p-16 transform transition-transform duration-300 hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-pink-500"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-blue-500"></div>
            
            <p className="text-gray-300 text-xl md:text-2xl leading-relaxed mb-8 font-mono">
              i write things on the internet sometimes. <br/>
              mostly thoughts that are too long for twitter.
            </p>
            
            <a
              href="https://substack.com/@kashafbatool"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block relative group/link"
            >
              <span className="text-5xl md:text-6xl font-black text-white group-hover/link:text-transparent group-hover/link:bg-clip-text group-hover/link:bg-gradient-to-r group-hover/link:from-pink-500 group-hover/link:via-purple-500 group-hover/link:to-blue-500 transition-all duration-300">
                READ →
              </span>
              <div className="h-2 bg-white mt-2 transform origin-left transition-transform duration-300 group-hover/link:scale-x-110 group-hover/link:bg-gradient-to-r group-hover/link:from-pink-500 group-hover/link:via-purple-500 group-hover/link:to-blue-500"></div>
            </a>

            <div className="mt-12 flex flex-wrap gap-4 text-sm font-mono text-gray-500">
              <span className="px-4 py-2 border border-gray-700">SUBSTACK</span>
              <span className="px-4 py-2 border border-gray-700">ESSAYS</span>
              <span className="px-4 py-2 border border-gray-700">THOUGHTS</span>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-16 text-right">
          <p className="text-gray-600 text-lg font-mono">
            [writing things down since forever]
          </p>
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-pink-600/20 to-transparent pointer-events-none"></div>
    </section>
  );
}