'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeader } from './SectionHeader';
// Import the icons here
import { BookOpen, Search, Database } from "lucide-react";

// Define the data here
const useCases = [
  { icon: BookOpen, title: "Content Archiving & Repurposing", description: "Transform ephemeral web content like blog series, documentation, or conference talks into permanent, high-quality e-books or whitepapers." },
  { icon: Search, title: "Curated Learning Guides", description: "Compile disparate resources from official docs, tutorials, and articles into cohesive PDF study guides with summaries and key concepts." },
  { icon: Database, title: "Powering RAG Applications", description: "Use as the 'Acquisition' layer for Retrieval-Augmented Generation systems, feeding clean content directly into vector databases." }
];

// No longer needs to accept a 'useCases' prop
export function UseCasesSection() {
  return (
    <section id="use-cases" className="bg-gradient-to-b from-black to-gray-900 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Why Use SiteHarvester?"
          subtitle="Transform information overload into organized, actionable knowledge"
        />
        <div className="grid lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/5 backdrop-blur-md border-gray-800 hover:border-blue-500/50 transition-all duration-500 group overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-blue-950/50 border border-blue-800/50 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:border-blue-700 transition-all duration-300">
                    <useCase.icon className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{useCase.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{useCase.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}