'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type AptitudeTestProps = {
  onSubmit: (aptitudeData: Record<string, {score: number, response: string}>) => void;
  onBack: () => void;
};

const aptitudeQuestions = [
  { 
    id: 'problem_solving', 
    label: 'Problem Solving', 
    emoji: '🧩',
    question: 'When faced with a complex puzzle, do you prefer to:',
    options: [
      'Follow step-by-step instructions',
      'Try different approaches until one works',
      'Break it into smaller parts and solve each',
      'Ask for help or collaborate'
    ]
  },
  { 
    id: 'creativity', 
    label: 'Creativity', 
    emoji: '🎨',
    question: 'When asked to create something new, you:',
    options: [
      'Stick to proven methods and templates',
      'Combine existing ideas in novel ways',
      'Imagine completely original concepts',
      'Experiment until something interesting emerges'
    ]
  },
  { 
    id: 'analytical', 
    label: 'Analytical Thinking', 
    emoji: '📊',
    question: 'When analyzing data, you focus on:',
    options: [
      'Finding patterns and trends',
      'Verifying accuracy and facts',
      'Drawing practical conclusions',
      'Exploring what-ifs and possibilities'
    ]
  },
  { 
    id: 'teamwork', 
    label: 'Teamwork', 
    emoji: '🤝',
    question: 'In group projects, you usually:',
    options: [
      'Take the leadership role',
      'Support and coordinate others',
      'Focus on your assigned tasks',
      'Brainstorm and contribute ideas'
    ]
  },
  { 
    id: 'adaptability', 
    label: 'Adaptability', 
    emoji: '🌀',
    question: 'When plans change unexpectedly, you:',
    options: [
      'Get stressed but eventually adjust',
      'Quickly find alternative solutions',
      'Stick to the original plan as much as possible',
      'See it as an opportunity for something better'
    ]
  },
  { 
    id: 'communication', 
    label: 'Communication', 
    emoji: '💬',
    question: 'When explaining complex ideas, you prefer to:',
    options: [
      'Use diagrams and visuals',
      'Give detailed written explanations',
      'Provide real-life examples',
      'Demonstrate with hands-on examples'
    ]
  }
];

export default function AptitudeTest({ onSubmit, onBack }: AptitudeTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, {score: number, response: string}>>({});
  
  const question = aptitudeQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / aptitudeQuestions.length) * 100;

  const handleAnswer = (optionIndex: number) => {
    const score = [2, 4, 6, 8][optionIndex];
    const newAnswers = {
      ...answers,
      [question.id]: {
        score,
        response: question.options[optionIndex]
      }
    };
    
    setAnswers(newAnswers);
    
    // Move to next question
    if (currentQuestion < aptitudeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // All questions answered, submit
      onSubmit(newAnswers);
    }
  };

  const handleSkip = () => {
    // Submit whatever answers we have
    onSubmit(answers);
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
          STEP 03
        </div>
        
        <h2 className="text-3xl font-heading mb-6 flex items-center gap-3">
          <span className="text-primary">●</span>
          Aptitude Assessment
        </h2>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-foreground/60 mb-3 font-mono">
            <span>Question {currentQuestion + 1} of {aptitudeQuestions.length}</span>
            <span>Answered: {Object.keys(answers).length}/{aptitudeQuestions.length}</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{question.emoji}</span>
            <h3 className="text-2xl font-heading">{question.label}</h3>
          </div>
          
          <p className="text-xl text-foreground/80 mb-8 font-mono">{question.question}</p>
          
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full p-4 text-left rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-card/80 transition-all"
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-primary/50 flex items-center justify-center">
                    <span className="text-sm font-mono">{String.fromCharCode(65 + index)}</span>
                  </div>
                  <span className="font-mono">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => currentQuestion > 0 ? setCurrentQuestion(currentQuestion - 1) : onBack()}
            className="px-6 py-3 border rounded-lg hover:bg-secondary/50 transition-colors font-mono"
          >
            ← Back
          </button>
          
          {/* Skip button */}
          <button
            onClick={handleSkip}
            className="px-6 py-3 border rounded-lg hover:bg-secondary/50 transition-colors font-mono"
          >
            Skip to Essay →
          </button>
        </div>
      </div>
    </motion.div>
  );
}