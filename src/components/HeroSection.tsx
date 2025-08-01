'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatedHeroBackground } from './AnimatedHeroBackground';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  FileText,
  Sparkles,
  Zap,
  Cpu,
  FileSearch,
  LoaderCircle,
  AlertTriangle,
  CheckCircle,
  Link as LinkIcon,
} from 'lucide-react';

const glossyCardClass = 'bg-white/5 backdrop-blur-md border border-gray-800';
const processSteps = [
  { icon: LinkIcon, label: "Input URL" },
  { icon: FileSearch, label: "Scrape Content" },
  { icon: Cpu, label: "Clean & Synthesize" },
  { icon: FileText, label: "Generate PDF" }
];

const API_ENDPOINT = "/api/harvest";

const isValidUrl = (urlString: string): boolean => {
  try {
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
};

export function HeroSection() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!url) {
      setError("Please enter a URL.");
      return;
    }
    if (!isValidUrl(url)) {
      setError("Please enter a valid URL (e.g., https://example.com).");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || `HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;

      const disposition = response.headers.get('content-disposition');
      let filename = `report_${new URL(url).hostname}.pdf`;
      if (disposition && disposition.includes('attachment')) {
        const filenameMatch = disposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch?.[1]) {
          filename = filenameMatch[1];
        }
      }
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);

      setSuccessMessage("Success! Your PDF is downloading.");
      setUrl('');

    } catch (err) {
      console.error("API call failed:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gray-950">
      <AnimatedHeroBackground />
      <div className="relative z-10 px-6 pt-32 pb-20 text-center">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-6 bg-blue-950/50 backdrop-blur-md border-blue-500/30 text-gray-300 hover:bg-blue-900/50 transition-all duration-300">
              <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
              Built with LangGraph
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Site<span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Harvester</span>
            </h1>
            {/* --- CHANGE: Reduced text size on mobile (text-lg) and scaled up from there. --- */}
            <p className="text-sm sm:text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
              An intelligent agent that transforms web content into structured, high-quality documents.
              Scrape, clean, and synthesize content with AI-powered precision.
            </p>
            <form onSubmit={handleSubmit}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="relative group max-w-2xl mx-auto mb-4">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative flex flex-col sm:flex-row items-center gap-2 bg-black/40 backdrop-blur-md border border-gray-700 rounded-xl p-2 shadow-lg">
                  {/* --- CHANGE: Added flex-grow to this container to make it take all available width. --- */}
                  <div className="w-full flex-grow flex items-center bg-transparent rounded-md">
                    <Zap className="w-5 h-5 text-purple-400 mx-3 flex-shrink-0" />
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      disabled={isLoading}
                      placeholder="Enter a URL to harvest..."
                      // --- CHANGE: Removed w-full as the parent now controls the width. ---
                      className="flex-grow bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-0 disabled:opacity-50"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading || !url.trim()}
                    className="w-full sm:w-32 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    {isLoading ? <LoaderCircle className="animate-spin w-5 h-5" /> : 'Harvest'}
                  </Button>
                </div>
              </motion.div>
            </form>

            <div className="mt-4 h-6">
              {error && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                  <span>{error}</span>
                </motion.div>
              )}
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2"
                  style={{ color: '#22c55e' }}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{successMessage}</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          <div className="mt-16">
            <motion.div
              className="grid grid-cols-2 gap-4 md:flex md:items-center md:justify-center md:gap-4 max-w-md mx-auto md:max-w-5xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.2 }}
            >
              {processSteps.map((step, index) => (
                <React.Fragment key={index}>
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    // --- CHANGE: Added `relative` to allow positioning of the number badge. ---
                    className={`relative flex flex-col items-center justify-center p-4 rounded-xl ${glossyCardClass} w-full h-36 md:w-36 shrink-0`}
                  >
                    {/* --- CHANGE: Added a numbered badge for mobile view. Hidden on md screens. --- */}
                    <div className="md:hidden absolute top-2 left-2 w-6 h-6 flex items-center justify-center bg-gray-700/50 rounded-full text-xs text-gray-300">
                      {index + 1}
                    </div>
                    <step.icon className="w-8 h-8 mb-3 text-purple-400" />
                    <span className="text-sm font-semibold text-center text-gray-200">{step.label}</span>
                  </motion.div>
                  {index < processSteps.length - 1 && (
                    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="hidden md:block shrink-0 text-gray-600">
                      <ArrowRight className="w-8 h-8" />
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}