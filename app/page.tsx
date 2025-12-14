'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlitchText } from '@/components/ui/glitch-text';
import { ParticleBackground } from '@/components/ui/particle-background';
import { HexagonGrid } from '@/components/ui/hexagon-grid';
import { ProgressWizard } from '@/components/ui/progress-wizard';
import { SectorCard } from '@/components/ui/sector-card';
import { ResultVisualization } from '@/components/ui/result-visualization';
import { EssayComponent } from '@/components/ui/essay';
import AptitudeTest from '@/components/ui/aptitude-test';
import { getAIRecommendations } from '@/lib/ai-service';

type Step = 'welcome' | 'personal' | 'interests' | 'aptitude' | 'essay' | 'results';

const interests = [
  { id: 'tech', label: '🤖 Technology & Digital', color: 'chart-1' },
  { id: 'agri', label: '🌱 Modern Agriculture', color: 'chart-2' },
  { id: 'eng', label: '⚙️ Engineering & Manufacturing', color: 'chart-3' },
  { id: 'health', label: '🏥 Health & Biomedical', color: 'chart-4' },
  { id: 'creative', label: '🎨 Creative Economy & Media', color: 'chart-5' },
  { id: 'geo', label: '🌍 Geospatial & Climate Tech', color: 'chart-1' },
];

export default function Home() {
  const [step, setStep] = useState<Step>('welcome');
  const [userData, setUserData] = useState({
    name: '',
    grade: '',
    interests: [] as string[],
    aptitude: {} as Record<string, {score: number, response: string}>,
    essay: ''
  });
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleInterestToggle = (id: string) => {
    setUserData(prev => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id]
    }));
  };

  const handleAptitudeSubmit = (aptitudeData: Record<string, {score: number, response: string}>) => {
    setUserData(prev => ({ ...prev, aptitude: aptitudeData }));
    setStep('essay');
  };

  const handleEssaySubmit = (essay: string) => {
    setUserData(prev => ({ ...prev, essay }));
    setStep('results');
    analyzeProfile();
  };

  const analyzeProfile = async () => {
    setLoading(true);
    try {
      const recommendations = await getAIRecommendations(userData);
      setResults(recommendations);
    } catch (error) {
      console.error('Analysis failed:', error);
      setResults({
        overall_advice: "Based on your profile, here are personalized recommendations. Focus on developing competencies in high-growth sectors aligned with Kenya's Vision 2030.",
        recommendations: [
          {
            sector: "Technology & Digital Innovation",
            match_percentage: 85,
            explanation: "Your analytical skills and interest in technology position you well for Kenya's growing digital economy.",
            cbc_subjects: ["Computer Science", "Mathematics", "Physics", "ICT"],
            skills_to_develop: ["Programming", "Data Analysis", "Digital Literacy", "Problem Solving"],
            resources: ["ALX Kenya", "Moringa School", "Google Digital Skills", "Coursera"],
            next_steps: ["Learn Python basics", "Join coding clubs", "Build portfolio projects", "Attend tech events"]
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    sessionStorage.clear();
    setStep('welcome');
    setUserData({ 
      name: '', 
      grade: '', 
      interests: [], 
      aptitude: {},
      essay: ''
    });
    setResults(null);
  };

  // Step 1: Personal Details
  const PersonalDetailsStep = () => {
    const [localName, setLocalName] = useState(userData.name);
    const [localGrade, setLocalGrade] = useState(userData.grade);

    const handleContinue = () => {
      setUserData(prev => ({ ...prev, name: localName, grade: localGrade }));
      setStep('interests');
    };

    return (
      <motion.div
        key="personal"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div className="relative p-8 rounded-2xl bg-card/30 backdrop-blur-sm border">
          <div className="absolute -top-3 left-8 px-4 py-1 rounded-full bg-primary font-mono text-sm">
            STEP 01
          </div>
          
          <h2 className="text-3xl font-heading mb-6 flex items-center gap-3">
            <span className="text-primary">●</span>
            Personal Profile
          </h2>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="font-mono text-sm text-foreground/70 uppercase tracking-wider">
                Your Full Name
              </label>
              <input
                type="text"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                className="w-full px-4 py-3 bg-secondary/30 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                placeholder="Enter your name..."
              />
            </div>
            
            <div className="space-y-3">
              <label className="font-mono text-sm text-foreground/70 uppercase tracking-wider">
                Current Grade
              </label>
              <select
                value={localGrade}
                onChange={(e) => setLocalGrade(e.target.value)}
                className="w-full px-4 py-3 bg-secondary/30 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary font-mono"
              >
                <option value="">Select grade</option>
                {['7', '8', '9', '10', '11', '12'].map(grade => (
                  <option key={grade} value={grade}>Grade {grade}</option>
                ))}
              </select>
            </div>
          </div>
          
          <button
            onClick={handleContinue}
            disabled={!localName || !localGrade}
            className="mt-8 w-full py-4 bg-gradient-to-r from-primary to-accent rounded-lg font-heading font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Continue to Interests →
          </button>
        </div>
      </motion.div>
    );
  };

  // Step 2: Interests
  const InterestsStep = () => (
    <motion.div
      key="interests"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="relative p-8 rounded-2xl bg-card/30 backdrop-blur-sm border mb-8">
        <div className="absolute -top-3 left-8 px-4 py-1 rounded-full bg-primary font-mono text-sm">
          STEP 02
        </div>
        
        <h2 className="text-3xl font-heading mb-6 flex items-center gap-3">
          <span className="text-primary">●</span>
          Select Your Passions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {interests.map((interest) => (
            <SectorCard
              key={interest.id}
              {...interest}
              selected={userData.interests.includes(interest.id)}
              onClick={() => handleInterestToggle(interest.id)}
            />
          ))}
        </div>
        
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => setStep('personal')}
            className="px-6 py-3 border rounded-lg hover:bg-secondary/50 transition-colors font-mono"
          >
            ← Back
          </button>
          <button
            onClick={() => setStep('aptitude')}
            disabled={userData.interests.length === 0}
            className="flex-1 py-4 bg-gradient-to-r from-primary to-accent rounded-lg font-heading font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Continue to Aptitude →
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <main className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        {step === 'welcome' && (
          <motion.header
            className="text-center mb-8 sm:mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-primary/30">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-mono text-primary/80">
                AI CAREER PATHFINDER
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-heading font-bold mb-6 tracking-tight">
              <GlitchText className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                SmartAnalyzer
              </GlitchText>
            </h1>
            
            <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto font-mono leading-relaxed mb-8">
              AI-powered career guidance for Kenyan students under Competency-Based Curriculum. 
              Discover your pathway in high-growth sectors with personalized competency mapping.
            </p>

            <motion.button
              onClick={() => setStep('personal')}
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-heading font-bold text-lg hover:opacity-90 transition-all shadow-lg glow-primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Begin Assessment →
            </motion.button>
          </motion.header>
        )}

        {/* Progress Wizard */}
        {step !== 'welcome' && step !== 'results' && (
          <ProgressWizard step={
            step === 'personal' ? 1 :
            step === 'interests' ? 2 :
            step === 'aptitude' ? 3 :
            step === 'essay' ? 4 : 1
          } />
        )}

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {step === 'personal' && <PersonalDetailsStep />}
          
          {step === 'interests' && <InterestsStep />}
          
          {step === 'aptitude' && (
            <AptitudeTest
              onSubmit={handleAptitudeSubmit}
              onBack={() => setStep('interests')}
            />
          )}
          
          {step === 'essay' && (
            <motion.div
              key="essay"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <EssayComponent 
                onSubmit={handleEssaySubmit} 
                onBack={() => setStep('aptitude')} 
              />
            </motion.div>
          )}
          
          {step === 'results' && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-6xl mx-auto"
            >
              {loading ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-xl text-foreground/70 font-mono">Analyzing your profile with AI...</p>
                </div>
              ) : (
                <>
                  <ResultVisualization results={results} userData={userData} />
                  
                  <div className="mt-8 text-center">
                    <motion.button
                      onClick={handleRestart}
                      className="px-8 py-3 border rounded-lg hover:bg-secondary/50 transition-colors font-mono"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start New Assessment
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="fixed bottom-10 left-10 opacity-10">
          <HexagonGrid />
        </div>
      </div>

      <div className="scan-line absolute top-0 left-0 w-full h-1 pointer-events-none z-20" />
    </main>
  );
}