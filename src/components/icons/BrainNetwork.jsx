import React from 'react';

const BrainNetwork = ({ className, ...props }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 32 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Define gradients and filters */}
      <defs>
        <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ffc0cb', stopOpacity: 0.8 }} />
          <stop offset="50%" style={{ stopColor: '#ffb6c1', stopOpacity: 0.9 }} />
          <stop offset="100%" style={{ stopColor: '#ffa0b4', stopOpacity: 0.7 }} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Full Brain Shape with Light Pink Fill */}
      <g stroke="#e91e63" fill="url(#brainGradient)" filter="url(#glow)">
        {/* Complete Brain Outline - Single Unified Shape */}
        <path 
          d="M6 12 C6 7, 8.5 3, 12 2.5 C13 2, 14.5 2, 16 2.8 C17.5 2, 19 2, 20 2.5 C23.5 3, 26 7, 26 12 C26 13.5, 25.8 15, 25 16.5 C24.5 17.8, 23.5 18.8, 22 19.5 C20.5 20.2, 18.5 20.5, 16.8 20.2 C16.2 20.8, 15.8 20.8, 15.2 20.2 C13.5 20.5, 11.5 20.2, 10 19.5 C8.5 18.8, 7.5 17.8, 7 16.5 C6.2 15, 6 13.5, 6 12 Z" 
          strokeWidth="0.8"
          opacity="0.95"
        />
        
        {/* Brain Hemispheres Division */}
        <path 
          d="M16 3 C16 6, 16 9, 16 12 C16 15, 16 18, 16 20"
          stroke="#e91e63"
          strokeWidth="0.5"
          opacity="0.4"
          strokeDasharray="2,3"
          fill="none"
        />
        
        {/* Brain Texture - Gyri and Sulci */}
        <g stroke="#e91e63" fill="none" strokeWidth="0.4" opacity="0.3">
          {/* Left hemisphere folds */}
          <path d="M8 6 C10 6.5, 12 7, 14 8" />
          <path d="M7 9 C9 9.5, 11 10, 13 11" />
          <path d="M8 12 C10 12.5, 12 13, 14 14" />
          <path d="M9 15 C11 15.5, 13 16, 14.5 17" />
          
          {/* Right hemisphere folds */}
          <path d="M18 8 C20 7, 22 6.5, 24 6" />
          <path d="M19 11 C21 10, 23 9.5, 25 9" />
          <path d="M18 14 C20 13, 22 12.5, 24 12" />
          <path d="M17.5 17 C19 16, 21 15.5, 23 15" />
        </g>
      </g>
      
      {/* Neurons Floating Above the Brain */}
      <g fill="#4fc3f7" stroke="#2196f3" strokeWidth="0.5">
        {/* Large Neurons with Glow Effect */}
        <circle cx="8" cy="4" r="1.2" opacity="0.8" filter="url(#glow)">
          <animate attributeName="cy" values="4;2;4" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="16" cy="1.5" r="1.5" opacity="0.9" filter="url(#glow)">
          <animate attributeName="cy" values="1.5;0.5;1.5" dur="5s" repeatCount="indefinite" />
          <animate attributeName="r" values="1.2;1.8;1.2" dur="4s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="24" cy="4" r="1.2" opacity="0.8" filter="url(#glow)">
          <animate attributeName="cy" values="4;2;4" dur="4.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.6;1" dur="3.5s" repeatCount="indefinite" />
        </circle>
        
        {/* Medium Neurons */}
        <circle cx="12" cy="3" r="0.9" opacity="0.7">
          <animate attributeName="cy" values="3;1.5;3" dur="6s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="20" cy="3" r="0.9" opacity="0.7">
          <animate attributeName="cy" values="3;1.5;3" dur="5.5s" repeatCount="indefinite" />
        </circle>
        
        {/* Small Floating Neurons */}
        <circle cx="6" cy="2" r="0.6" opacity="0.6">
          <animate attributeName="cy" values="2;0.5;2" dur="7s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="26" cy="2" r="0.6" opacity="0.6">
          <animate attributeName="cy" values="2;0.5;2" dur="6.5s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="10" cy="1" r="0.5" opacity="0.5">
          <animate attributeName="cy" values="1;-0.5;1" dur="8s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="22" cy="1" r="0.5" opacity="0.5">
          <animate attributeName="cy" values="1;-0.5;1" dur="7.5s" repeatCount="indefinite" />
        </circle>
        
        {/* Micro Neurons */}
        <circle cx="14" cy="0.5" r="0.3" opacity="0.4">
          <animate attributeName="cy" values="0.5;-1;0.5" dur="9s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="18" cy="0.5" r="0.3" opacity="0.4">
          <animate attributeName="cy" values="0.5;-1;0.5" dur="8.5s" repeatCount="indefinite" />
        </circle>
      </g>
      
      {/* Neural Pathways Flowing Above Brain */}
      <g stroke="#2196f3" fill="none" opacity="0.7">
        {/* Main Neural Highway - Flows Above Brain */}
        <path d="M6 1 C10 0.5, 16 0, 22 0.5 C26 1, 28 2, 26 3" strokeWidth="1.5" opacity="0.8" strokeDasharray="3,2">
          <animate attributeName="strokeDashoffset" values="0;10;0" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
        </path>
        
        {/* Secondary Neural Stream */}
        <path d="M4 3 C8 2, 12 1.5, 16 1.5 C20 1.5, 24 2, 28 3" strokeWidth="1.2" opacity="0.6" strokeDasharray="2,3">
          <animate attributeName="strokeDashoffset" values="10;0;10" dur="2.5s" repeatCount="indefinite" />
        </path>
        
        {/* Connecting Neural Branches to Brain */}
        <path d="M8 4 L8 6" strokeWidth="0.8" opacity="0.5">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.5s" repeatCount="indefinite" />
        </path>
        
        <path d="M16 1.5 L16 3" strokeWidth="1" opacity="0.6">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
        </path>
        
        <path d="M24 4 L24 6" strokeWidth="0.8" opacity="0.5">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.8s" repeatCount="indefinite" />
        </path>
        
        {/* Spiral Neural Energy */}
        <path d="M12 2 Q14 0, 16 2 Q18 4, 20 2" strokeWidth="0.8" opacity="0.4" strokeDasharray="1,2">
          <animate attributeName="strokeDashoffset" values="0;6;0" dur="3s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" values="0 16 2;360 16 2" dur="8s" repeatCount="indefinite" />
        </path>
        
        {/* Neural Pulse Lines */}
        <g strokeWidth="0.6" opacity="0.5">
          <line x1="10" y1="1" x2="10" y2="4">
            <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1="14" y1="0.5" x2="14" y2="3.5">
            <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" begin="0.2s" />
          </line>
          <line x1="18" y1="0.5" x2="18" y2="3.5">
            <animate attributeName="opacity" values="0;1;0" dur="1.1s" repeatCount="indefinite" begin="0.4s" />
          </line>
          <line x1="22" y1="1" x2="22" y2="4">
            <animate attributeName="opacity" values="0;1;0" dur="1.3s" repeatCount="indefinite" begin="0.6s" />
          </line>
        </g>
      </g>
      
      {/* Electrical Activity Within Brain */}
      <g stroke="#ff4081" fill="none" opacity="0.6">
        {/* Brain Wave Activity */}
        <path d="M8 8 Q10 6, 12 8 Q14 10, 16 8 Q18 6, 20 8 Q22 10, 24 8" strokeWidth="0.8" opacity="0.5" strokeDasharray="2,1">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
          <animate attributeName="strokeDashoffset" values="0;6;0" dur="1.5s" repeatCount="indefinite" />
        </path>
        
        {/* Neural Firing Inside Brain */}
        <path d="M9 12 Q11 10, 13 12 Q15 14, 17 12 Q19 10, 21 12 Q23 14, 25 12" strokeWidth="0.6" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2.5s" repeatCount="indefinite" />
        </path>
        
        {/* Synaptic Bursts */}
        <circle cx="12" cy="10" r="2" strokeWidth="0.4" opacity="0" fill="none">
          <animate attributeName="opacity" values="0;0.6;0" dur="3s" repeatCount="indefinite" />
          <animate attributeName="r" values="0.5;3;0.5" dur="3s" repeatCount="indefinite" />
        </circle>
        
        <circle cx="20" cy="14" r="2" strokeWidth="0.4" opacity="0" fill="none">
          <animate attributeName="opacity" values="0;0.6;0" dur="2.8s" repeatCount="indefinite" begin="1s" />
          <animate attributeName="r" values="0.5;2.8;0.5" dur="2.8s" repeatCount="indefinite" begin="1s" />
        </circle>
      </g>
      
      {/* Particle Effects Above Brain */}
      <g fill="#64b5f6" opacity="0.4">
        <circle cx="7" cy="0.5" r="0.2">
          <animate attributeName="cy" values="0.5;-2;0.5" dur="6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;0" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="11" cy="-0.5" r="0.15">
          <animate attributeName="cy" values="-0.5;-3;-0.5" dur="7s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;0" dur="7s" repeatCount="indefinite" />
        </circle>
        <circle cx="21" cy="-0.5" r="0.15">
          <animate attributeName="cy" values="-0.5;-3;-0.5" dur="6.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;0" dur="6.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="25" cy="0.5" r="0.2">
          <animate attributeName="cy" values="0.5;-2;0.5" dur="8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;0" dur="8s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
};

export default BrainNetwork;