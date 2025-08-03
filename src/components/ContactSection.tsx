'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, LoaderCircle, AlertTriangle, CheckCircle } from 'lucide-react';

const glossyCardClass = 'bg-white/5 backdrop-blur-md border border-gray-800';

export function ContactSection() {
  // --- STATE MANAGEMENT: Added loading, error, and success states ---
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      subscribe: formData.get('subscribe') === 'on',
    };

    try {
      // --- API CALL: Using fetch to call our Next.js proxy route ---
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // If the API returns an error, display it
        throw new Error(result.detail || 'An unknown error occurred.');
      }

      // --- SUCCESS: Display success message and reset the form ---
      setSuccessMessage('Thank you! Your message has been sent.');
      formRef.current?.reset();

    } catch (err) {
      // --- ERROR: Display error message ---
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      // --- FINAL: Stop the loading indicator ---
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-gradient-to-b from-gray-900 to-black px-6 pb-20 pt-5">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
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
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input name="name" type="text" placeholder="Your Name" required className="bg-black/40 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/50" />
                <Input name="email" type="email" placeholder="Your Email" required className="bg-black/40 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/50" />
              </div>
              <Textarea name="message" placeholder="Your message..." required className="bg-black/40 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/50 h-28 resize-none" />
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-start space-x-3 self-start">
                  <input name="subscribe" id="updates" type="checkbox" className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-purple-600 focus:ring-purple-500/50 mt-1" />
                  <div className="flex flex-col text-left">
                    <label htmlFor="updates" className="text-sm text-gray-300">Sign up for feature updates</label>
                    <p className="text-xs text-gray-500">By subscribing, you agree to our Terms and Privacy Policy.</p>
                  </div>
                </div>
                <Button type="submit" disabled={isLoading} className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0">
                  {isLoading ? <LoaderCircle className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
             {/* --- UI FEEDBACK: Display success or error messages --- */}
            <div className="mt-4 h-6 text-center">
              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2 text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                  <span>{error}</span>
                </motion.div>
              )}
              {successMessage && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>{successMessage}</span>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
} 