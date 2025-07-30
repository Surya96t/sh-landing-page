'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AnimationData {
  stars: Array<{
    id: string;
    left: number;
    top: number;
    duration: number;
    delay: number;
  }>;
  lines: Array<{
    id: string;
    width: number;
    left: number;
    top: number;
    rotation: number;
    duration: number;
    delay: number;
  }>;
  nodes: Array<{
    id: string;
    left: number;
    top: number;
    moveX: number;
    moveY: number;
    duration: number;
  }>;
  binaryColumns: Array<{
    id: string;
    left: number;
    text: string;
    duration: number;
    delay: number;
  }>;
}

export function AnimatedHeroBackground() {
  const [isClient, setIsClient] = useState(false);
  const [animationData, setAnimationData] = useState<AnimationData | null>(null);

  useEffect(() => {
    // Generate all random values once when component mounts
    const generateAnimationData = () => {
      // Stars data
      const stars = Array.from({ length: 50 }, (_, i) => ({
        id: `star-${i}`,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 2
      }));

      // Data flow lines
      const lines = Array.from({ length: 8 }, (_, i) => ({
        id: `line-${i}`,
        width: 30 + Math.random() * 40,
        left: Math.random() * 70,
        top: Math.random() * 100,
        rotation: Math.random() * 360,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2
      }));

      // Network nodes
      const nodes = Array.from({ length: 12 }, (_, i) => ({
        id: `node-${i}`,
        left: Math.random() * 100,
        top: Math.random() * 100,
        moveX: Math.random() * 100 - 50,
        moveY: Math.random() * 100 - 50,
        duration: 8 + Math.random() * 4
      }));

      // Binary rain
      const binaryColumns = Array.from({ length: 6 }, (_, i) => ({
        id: `binary-${i}`,
        left: Math.random() * 100,
        text: Array.from({ length: 15 }, () => Math.random() > 0.5 ? '1' : '0').join(''),
        duration: 10 + Math.random() * 5,
        delay: Math.random() * 3
      }));

      return { stars, lines, nodes, binaryColumns };
    };

    setAnimationData(generateAnimationData());
    setIsClient(true);
  }, []);

  if (!isClient || !animationData) {
    return null;
  }

  const { stars, lines, nodes, binaryColumns } = animationData;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Starfield */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{ left: `${star.left}%`, top: `${star.top}%` }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.5, 1, 0.5] }}
            transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
          />
        ))}
      </div>

      {/* Data Flow Lines */}
      <div className="absolute inset-0">
        {lines.map((line) => (
          <motion.div 
            key={line.id} 
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-800 to-transparent opacity-20" 
            style={{ 
              width: `${line.width}%`, 
              left: `${line.left}%`, 
              top: `${line.top}%`, 
              transform: `rotate(${line.rotation}deg)` 
            }} 
            animate={{ opacity: [0, 0.4, 0], scaleX: [0, 1, 0] }} 
            transition={{ duration: line.duration, repeat: Infinity, delay: line.delay }}
          />
        ))}
      </div>
      
      {/* Network Nodes */}
      <div className="absolute inset-0">
        {nodes.map((node) => (
          <motion.div 
            key={node.id} 
            className="absolute w-2 h-2 border border-blue-700 rounded-full opacity-40" 
            style={{ left: `${node.left}%`, top: `${node.top}%` }} 
            animate={{ 
              x: [0, node.moveX], 
              y: [0, node.moveY], 
              opacity: [0.2, 0.8, 0.2], 
              scale: [0.5, 1.2, 0.5] 
            }} 
            transition={{ duration: node.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Web Pattern */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-20" viewBox="0 0 400 400">
          <defs>
            <pattern id="web" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.3"/>
              <line x1="50" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
              <line x1="50" y1="50" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
              <line x1="50" y1="50" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#web)"/>
        </svg>
      </div>

      {/* Scanning Lines */}
      <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div 
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" 
          animate={{ top: ["0%", "100%", "0%"] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
        />
        <motion.div 
          className="absolute h-full w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-40" 
          animate={{ left: ["0%", "100%", "0%"] }} 
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} 
        />
      </motion.div>

      {/* Binary Rain */}
      <div className="absolute inset-0 overflow-hidden">
        {binaryColumns.map((column) => (
          <motion.div
            key={column.id}
            className="absolute text-xs text-gray-600 font-mono opacity-30"
            style={{ left: `${column.left}%` }}
            animate={{ y: [-50, 1050] }}
            transition={{ 
              duration: column.duration, 
              repeat: Infinity, 
              delay: column.delay, 
              ease: "linear" 
            }}
          >
            {column.text}
          </motion.div>
        ))}
      </div>

      {/* Central Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="w-64 h-64 border border-blue-900 rounded-full opacity-20" 
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
        />
        <motion.div 
          className="absolute w-32 h-32 border border-purple-800 rounded-full" 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2], rotate: [0, 360] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}