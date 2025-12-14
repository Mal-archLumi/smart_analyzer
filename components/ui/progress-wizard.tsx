// components/ui/progress-wizard.tsx
interface ProgressWizardProps {
  step: number;
}

export function ProgressWizard({ step }: ProgressWizardProps) {
  const steps = [
    { label: 'Profile', number: 1 },
    { label: 'Interests', number: 2 },
    { label: 'Aptitude', number: 3 },
    { label: 'Essay', number: 4 },
    { label: 'Results', number: 5 },
  ];

  return (
    <div className="max-w-2xl mx-auto mb-16">
      <div className="relative">
        {/* Progress line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-secondary z-0" />
        <div 
          className="absolute top-4 left-0 h-0.5 bg-gradient-to-r from-primary to-accent z-10 transition-all duration-500"
          // FIX: Changed from /3 to /4 because we have 5 steps (0-4)
          style={{ width: `${((step - 1) / 4) * 100}%` }}
        />
        
        {/* Steps */}
        <div className="relative flex justify-between z-20">
          {steps.map((s) => (
            <div key={s.number} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  step >= s.number
                    ? 'bg-primary border-primary glow'
                    : step + 1 === s.number
                    ? 'border-primary/50 bg-card'
                    : 'border-secondary bg-card'
                }`}
              >
                {step > s.number ? (
                  <span className="text-primary-foreground">✓</span>
                ) : (
                  <span className={step >= s.number ? 'text-primary-foreground' : 'text-foreground/50'}>
                    {s.number}
                  </span>
                )}
              </div>
              <span className={`mt-2 text-sm font-mono transition-colors ${
                step >= s.number ? 'text-primary' : 'text-foreground/50'
              }`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}