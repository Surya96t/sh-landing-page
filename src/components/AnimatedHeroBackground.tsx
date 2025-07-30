'use client';

import { motion } from 'framer-motion';
// --- We need these React hooks for the solution ---
import { useState, useEffect } from 'react';

export function AnimatedHeroBackground() {
  // 1. We create a state that will track if we are on the client.
  // It starts as `false` for the server render and the initial browser render.
  const [isClient, setIsClient] = useState(false);

  // 2. This `useEffect` hook runs ONLY in the browser, and only ONCE,
  // right after the component has been mounted to the page.
  useEffect(() => {
    // When this code runs, we know we are safely on the client.
    // We update the state to trigger a re-render.
    setIsClient(true);
  }, []); // The empty array [] is crucial - it means "run only once".

  // 3. This is the guard clause. If we are on the server OR during the
  // very first render in the browser, `isClient` will be `false`.
  // By returning `null`, we ensure the server sends no HTML for this component,
  // and the browser's first render also produces no HTML, guaranteeing no mismatch.
  if (!isClient) {
    return null;
  }

  // 4. Because of the guard clause, the code below this line will ONLY
  // ever run in the browser, after the component has successfully mounted.
  // It is now safe to use Math.random() without causing a hydration error.
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Starfield */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Data Flow Lines */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div key={`line-${i}`} className="absolute h-px bg-gradient-to-r from-transparent via-blue-800 to-transparent opacity-20" style={{ width: `${30 + Math.random() * 40}%`, left: `${Math.random() * 70}%`, top: `${Math.random() * 100}%`, transform: `rotate(${Math.random() * 360}deg)` }} animate={{ opacity: [0, 0.4, 0], scaleX: [0, 1, 0] }} transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}/>
        ))}
      </div>
      
      {/* ... The rest of your background component JSX ... */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div key={`node-${i}`} className="absolute w-2 h-2 border border-blue-700 rounded-full opacity-40" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} animate={{ x: [0, Math.random() * 100 - 50], y: [0, Math.random() * 100 - 50], opacity: [0.2, 0.8, 0.2], scale: [0.5, 1.2, 0.5] }} transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}/>
        ))}
      </div>
      <div className="absolute inset-0"><svg className="w-full h-full opacity-20" viewBox="0 0 400 400"><defs><pattern id="web" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.3"/><line x1="50" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/><line x1="50" y1="50" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/><line x1="50" y1="50" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/></pattern></defs><rect width="100%" height="100%" fill="url(#web)"/></svg></div>
      <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" animate={{ top: ["0%", "100%", "0%"] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute h-full w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-40" animate={{ left: ["0%", "100%", "0%"] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
      </motion.div>
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`binary-${i}`}
            className="absolute text-xs text-gray-600 font-mono opacity-30"
            style={{ left: `${Math.random() * 100}%` }}
            animate={{ y: [-50, 1050], }}
            transition={{ duration: 10 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 3, ease: "linear" }}
          >
            {Array.from({ length: 15 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
          </motion.div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div className="w-64 h-64 border border-blue-900 rounded-full opacity-20" animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute w-32 h-32 border border-purple-800 rounded-full" animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2], rotate: [0, 360] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}/>
      </div>
    </div>
  );
}