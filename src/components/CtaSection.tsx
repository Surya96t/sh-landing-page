'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, FileText } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="bg-black px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="bg-white/5 backdrop-blur-md border-gray-800 p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Web Content?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Start harvesting and structuring web content with AI-powered precision
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition-all group">
                Get Started on GitHub
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:border-blue-500 hover:text-blue-300">
                <FileText className="w-5 h-5 mr-2" />
                Read the Docs
              </Button>
            </div> */}
          </Card>
        </motion.div>
      </div>
    </section>
  );
}