'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

export function ContactSection() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email, 'Message:', message);
    // Add your form submission logic here
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className="bg-gradient-to-b from-gray-900 to-black px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="Stay Connected"
          subtitle="Get updates on new features, or reach out with questions and feedback"
        />
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            {/* Newsletter Form */}
            <Card className="bg-white/5 backdrop-blur-md border-gray-800 p-8">
              <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gray-800/50 rounded-lg flex items-center justify-center"><Mail className="w-6 h-6 text-gray-300" /></div>
                  <div><h3 className="text-xl font-semibold text-white">Get Updates</h3><p className="text-gray-400 text-sm">Subscribe for feature announcements</p></div>
              </div>
              <form className="space-y-4">
                  <Input type="email" placeholder="Enter your email" className="bg-black/40 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/50"/>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"><Send className="w-4 h-4 mr-2" />Subscribe</Button>
              </form>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            {/* Contact Form */}
            <Card className="bg-white/5 backdrop-blur-md border-gray-800 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-800/50 rounded-lg flex items-center justify-center"><Send className="w-6 h-6 text-gray-300" /></div>
                <div><h3 className="text-xl font-semibold text-white">Get in Touch</h3><p className="text-gray-400 text-sm">Questions, feedback, or collaboration</p></div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                  <Input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-black/40 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/50"/>
                  <Textarea placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} className="bg-black/40 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 h-24 resize-none"/>
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"><Send className="w-4 h-4 mr-2" />Send Message</Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}