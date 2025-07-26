'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

// Define a consistent style for the new card
const glossyCardClass = 'bg-white/5 backdrop-blur-md border border-gray-800';

export function ContactSection() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const subscribe = formData.get('subscribe') === 'on';

    console.log({ name, email, message, subscribe });
    
    // Reset form after submission
    setEmail('');
    setMessage('');
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="bg-gradient-to-b from-gray-900 to-black px-6 pb-20 pt-5">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Stay Connected</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">Get updates, ask questions, or provide feedback.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className={`${glossyCardClass} p-8`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* --- CHANGE: Added consistent focus ring --- */}
                <Input name="name" type="text" placeholder="Your Name" className="bg-black/40 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/50" />
                <Input name="email" type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-black/40 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/50" />
              </div>
              {/* --- CHANGE: Added consistent focus ring --- */}
              <Textarea name="message" placeholder="Your message..." value={message} onChange={(e) => setMessage(e.target.value)} required className="bg-black/40 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/50 h-28 resize-none" />
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <input name="subscribe" id="updates" type="checkbox" className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-purple-600 focus:ring-purple-500/50" />
                  <label htmlFor="updates" className="text-sm text-gray-400">Sign up for feature updates</label>
                </div>
                {/* --- CHANGE: Replaced plain button with themed gradient button --- */}
                <Button type="submit" className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}