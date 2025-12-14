// components/ui/result-visualization.tsx
'use client';

import { useEffect, useState } from 'react';

interface Recommendation {
  sector: string;
  match_percentage: number;
  explanation: string;
  cbc_subjects: string[];
  skills_to_develop: string[];
  resources: string[];
  next_steps: string[];
}

interface ResultVisualizationProps {
  results: {
    overall_advice: string;
    recommendations: Recommendation[];
  };
  userData: any;
}

export function ResultVisualization({ results, userData }: ResultVisualizationProps) {
  const [animatedPercentages, setAnimatedPercentages] = useState<number[]>(
    results.recommendations.map(() => 0)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentages(
        results.recommendations.map(r => r.match_percentage)
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [results.recommendations]);

  const getSectorEmoji = (sector: string) => {
    if (sector.includes('Tech')) return '🤖';
    if (sector.includes('Agric')) return '🌱';
    if (sector.includes('Engineer')) return '⚙️';
    if (sector.includes('Health')) return '🏥';
    if (sector.includes('Creative')) return '🎨';
    if (sector.includes('Geospatial')) return '🌍';
    return '✨';
  };

  return (
    <div className="space-y-8">
      {/* Overall Advice */}
      <div className="relative p-8 rounded-2xl bg-gradient-to-br from-card to-secondary/30 backdrop-blur-sm border">
        <div className="absolute -top-3 left-8 px-4 py-1 rounded-full bg-primary font-mono text-sm">
          AI ANALYSIS
        </div>
        
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
            ⚡
          </div>
          <div>
            <h3 className="text-2xl font-heading mb-3">Pathway Insights for {userData.name}</h3>
            <p className="text-foreground/80 leading-relaxed font-mono">
              {results.overall_advice}
            </p>
          </div>
        </div>
      </div>

      {/* Top Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {results.recommendations.map((rec, index) => (
          <div
            key={rec.sector}
            className="relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border group hover:border-primary/50 transition-all duration-500"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {/* Progress Ring */}
            <div className="absolute top-6 right-6 w-24 h-24">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-secondary"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  className="text-primary transition-all duration-1000 ease-out"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (animatedPercentages[index] / 100) * 251.2}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-heading font-bold">
                  {Math.round(animatedPercentages[index])}%
                </span>
                <span className="text-xs font-mono text-foreground/50">Match</span>
              </div>
            </div>

            <div className="pr-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{getSectorEmoji(rec.sector)}</span>
                <h4 className="text-xl font-heading">{rec.sector}</h4>
              </div>
              
              <p className="text-foreground/70 mb-6 font-mono text-sm leading-relaxed">
                {rec.explanation}
              </p>

              {/* Details Accordion */}
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-mono text-primary/80 mb-2">CBC SUBJECTS</h5>
                  <div className="flex flex-wrap gap-2">
                    {rec.cbc_subjects.map((subject, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/10 rounded-full text-xs font-mono"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-mono text-primary/80 mb-2">SKILLS TO DEVELOP</h5>
                  <div className="flex flex-wrap gap-2">
                    {rec.skills_to_develop.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-secondary/50 rounded-full text-xs font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-mono text-primary/80 mb-2">NEXT STEPS</h5>
                  <ul className="space-y-2">
                    {rec.next_steps.map((step, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-sm font-mono text-primary/80 mb-2">RESOURCES</h5>
                  <div className="space-y-1">
                    {rec.resources.map((resource, i) => (
                      <div
                        key={i}
                        className="text-sm text-foreground/70 hover:text-primary transition-colors cursor-pointer font-mono"
                      >
                        → {resource}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Hover effect line */}
            <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
          <div className="text-3xl mb-4">📚</div>
          <h4 className="font-heading mb-2">CBC Alignment</h4>
          <p className="text-sm text-foreground/70 font-mono">
            Subjects and competencies mapped to your pathway
          </p>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20">
          <div className="text-3xl mb-4">🎯</div>
          <h4 className="font-heading mb-2">Skill Gaps</h4>
          <p className="text-sm text-foreground/70 font-mono">
            Identified areas for development and growth
          </p>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-chart-4/10 to-transparent border border-chart-4/20">
          <div className="text-3xl mb-4">🚀</div>
          <h4 className="font-heading mb-2">Action Plan</h4>
          <p className="text-sm text-foreground/70 font-mono">
            Concrete steps to advance in your chosen field
          </p>
        </div>
      </div>
    </div>
  );
}