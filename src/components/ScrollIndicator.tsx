import React from 'react';
import { ChevronDown } from 'lucide-react';

export function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
      {/* Text with gradient */}
      <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-blue-300 transition-all">
        Scroll to explore
      </span>
      
      {/* Double chevron with glow */}
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-40 group-hover:opacity-75 transition-opacity"></div>
        <div className="relative bg-black/50 backdrop-blur-sm p-3 rounded-full border border-white/10 group-hover:border-white/20 transition-all">
          <div className="flex flex-col -space-y-2">
            <ChevronDown className="h-5 w-5 text-white animate-bounce" />
            <ChevronDown className="h-5 w-5 text-white/50 animate-bounce" style={{ animationDelay: '150ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
} 