'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeader } from './SectionHeader';

type RoadmapItem = {
  title: string;
  description: string;
  status: 'planning' | 'development' | 'research';
};

interface RoadmapSectionProps {
  roadmapItems: readonly RoadmapItem[]; // Use `readonly` for best practice with `as const`
}

// A small helper to style badges based on status
const statusStyles = {
  planning: "border-blue-500/30 bg-blue-950/50 text-blue-300",
  development: "border-purple-500/30 bg-purple-950/50 text-purple-300",
  research: "border-gray-500/30 bg-gray-950/50 text-gray-300"
};

export function RoadmapSection({ roadmapItems }: RoadmapSectionProps) {
  return (
    <section id="roadmap" className="bg-gradient-to-b from-black to-gray-900 px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Vision & Roadmap"
          subtitle="Building toward a versatile data acquisition and processing engine"
        />
        <div className="grid md:grid-cols-2 gap-6">
          {roadmapItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-gray-800 hover:border-blue-500/50 transition-all duration-500 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white group-hover:text-gray-100 transition-colors">
                      {item.title}
                    </h3>
                    <Badge variant="outline" className={`text-xs ${statusStyles[item.status]}`}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-gray-400">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}