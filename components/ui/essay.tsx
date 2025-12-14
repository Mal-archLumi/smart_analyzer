'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type EssayComponentProps = {
  onSubmit: (essay: string) => void;
  onBack: () => void;
};

export function EssayComponent({ onSubmit, onBack }: EssayComponentProps) {
  const [essay, setEssay] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedEssay = sessionStorage.getItem('user_essay');
    if (savedEssay) {
      setEssay(savedEssay);
      setWordCount(savedEssay.split(/\s+/).filter(word => word.length > 0).length);
    }
  }, []);

  useEffect(() => {
    const words = essay.split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    
    if (essay.trim()) {
      sessionStorage.setItem('user_essay', essay);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }, [essay]);

  const handleSubmit = () => {
    onSubmit(essay);
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="relative p-8 rounded-2xl bg-card/30 backdrop-blur-sm border">
        <div className="absolute -top-3 left-8 px-4 py-1 rounded-full bg-primary font-mono text-sm">
          OPTIONAL STEP
        </div>
        
        <h2 className="text-3xl font-heading mb-6 flex items-center gap-3">
          <span className="text-primary">●</span>
          Tell Us About Yourself
        </h2>
        
        <p className="text-foreground/70 mb-6 font-mono">
          Write a short essay about yourself. This helps us provide more personalized recommendations.<br />
          <span className="text-sm text-foreground/50">(Optional but recommended - 150-300 words)</span>
        </p>
        
        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              placeholder="Describe your strengths, passions, achievements, challenges overcome, future aspirations, and what makes you unique..."
              className="w-full h-64 px-4 py-3 bg-card border-2 border-input rounded-lg text-foreground placeholder-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono resize-none"
              maxLength={2000}
            />
            <div className="absolute bottom-2 right-2 flex items-center gap-2">
              {saved && (
                <span className="text-xs text-green-400 font-mono">✓ Saved</span>
              )}
              <span className={`text-xs font-mono ${wordCount > 300 ? 'text-green-400' : wordCount > 150 ? 'text-yellow-400' : 'text-foreground/50'}`}>
                {wordCount} words
              </span>
            </div>
          </div>
          
          <div className="text-sm text-foreground/50 font-mono">
            <p>💡 <strong>Prompt ideas:</strong></p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>What are you passionate about?</li>
              <li>What challenges have you overcome?</li>
              <li>Where do you see yourself in 5 years?</li>
              <li>What makes you unique?</li>
              <li>What impact do you want to make?</li>
            </ul>
          </div>
        </div>
        
        <div className="flex gap-4 mt-8">
          <button
            onClick={onBack}
            className="px-6 py-3 border rounded-lg hover:bg-secondary/50 transition-colors font-mono"
          >
            ← Back
          </button>
          <button
            onClick={() => onSubmit('')}
            className="px-6 py-3 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-mono"
          >
            Skip This Step →
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-heading font-bold hover:opacity-90 transition-opacity"
          >
            Generate My Analysis →
          </button>
        </div>
      </div>
    </motion.div>
  );
}