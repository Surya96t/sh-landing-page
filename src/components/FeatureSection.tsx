'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeader } from './SectionHeader';
// Import the icons here
import { Globe, Zap, FileText, Brain, Layers, Code2 } from "lucide-react";

// Define the data here, inside the Client Component
const features = [
  { icon: Globe, title: "Dual Mode Operation", description: "Scrape single URLs or crawl entire websites with intelligent depth control" },
  { icon: Zap, title: "Reliable Content Extraction", description: "Uses Firecrawl to handle JavaScript-heavy websites with ease" },
  { icon: Brain, title: "LLM-Powered Enhancement", description: "GPT-4o cleans markdown and generates summaries with key concepts" },
  { icon: FileText, title: "Professional PDF Generation", description: "Creates beautifully styled PDFs with proper code block formatting" },
  { icon: Layers, title: "Modular Architecture", description: "Built with LangGraph using Supervisor/Worker pattern for reliability" },
  { icon: Code2, title: "Dual Interfaces", description: "Flexible command-line tool and FastAPI web server included" }
];

// No longer needs to accept a 'features' prop
export function FeaturesSection() {
  return (
    <section id="features" className="bg-gradient-to-b from-gray-900 to-black px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Current Features"
          subtitle="Powerful capabilities available today"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/5 backdrop-blur-md border-gray-800 hover:border-purple-500/50 transition-all duration-500 group">
                <CardContent className="p-6">
                  <feature.icon className="w-10 h-10 text-gray-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}