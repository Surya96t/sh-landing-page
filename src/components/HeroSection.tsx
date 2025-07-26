'use client';

import React from 'react'; // Import React for React.Fragment
import { motion } from 'framer-motion';
import { AnimatedHeroBackground } from './AnimatedHeroBackground';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, // Icon for the flow diagram
  FileText,   // Icon for steps
  Sparkles,   // Icon for steps
  Zap,        // Icon for steps
  Cpu,          // New icon
  FileSearch,   // New icon
  Link as LinkIcon, // New icon (aliased to avoid naming conflicts)
} from 'lucide-react';

// Define a consistent style for the new cards
const glossyCardClass = 'bg-white/5 backdrop-blur-md border border-gray-800';

// Define the data for the new process flow diagram
const processSteps = [
  { icon: LinkIcon, label: "Input URL" },
  { icon: FileSearch, label: "Scrape Content" },
  { icon: Cpu, label: "Clean & Synthesize" },
  { icon: FileText, label: "Generate PDF" }
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gray-950">
      <AnimatedHeroBackground />

      <div className="relative z-10 px-6 pt-32 pb-20 text-center"> {/* Adjusted padding */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-blue-950/50 backdrop-blur-md border-blue-500/30 text-gray-300 hover:bg-blue-900/50 transition-all duration-300">
              <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
              Built with LangGraph
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Site<span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Harvester</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
              An intelligent agent that transforms web content into structured, high-quality documents. 
              Scrape, clean, and synthesize content with AI-powered precision.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative group max-w-2xl mx-auto mb-16" // Added more margin-bottom
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative flex items-center bg-black/40 backdrop-blur-md border border-gray-700 rounded-xl p-2 shadow-lg">
                <Zap className="w-5 h-5 text-purple-400 mx-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Enter a URL to harvest..."
                  className="flex-grow bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-md"
                />
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:opacity-90">
                  Harvest
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* --- START: NEW Process Flow Diagram --- */}
          {/* This replaces the old four benefits cards */}
          <motion.div 
            className="flex items-center justify-start md:justify-center gap-2 md:gap-4 max-w-full lg:max-w-5xl mx-auto px-4 overflow-x-auto md:overflow-visible pb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            {processSteps.map((step, index) => (
              <React.Fragment key={index}>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl ${glossyCardClass} w-36 h-36 shrink-0`}
                >
                  <step.icon className="w-8 h-8 mb-3 text-purple-400" />
                  <span className="text-sm font-semibold text-center text-gray-200">{step.label}</span>
                </motion.div>

                {index < processSteps.length - 1 && (
                  <motion.div
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                    className="shrink-0 text-gray-600"
                  >
                    <ArrowRight className="w-8 h-8" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </motion.div>
          {/* --- END: NEW Process Flow Diagram --- */}

        </div>
      </div>
    </section>
  );
}