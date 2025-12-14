// components/ui/glitch-text.tsx
interface GlitchTextProps {
  children: string;
  className?: string;
}

export function GlitchText({ children, className }: GlitchTextProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span 
        className="absolute left-0 top-0 z-0 text-primary opacity-30"
        style={{ 
          clipPath: 'inset(0 0 50% 0)',
          animation: 'glitch 0.3s infinite'
        }}
      >
        {children}
      </span>
      <span 
        className="absolute left-0 top-0 z-0 text-accent opacity-30"
        style={{ 
          clipPath: 'inset(50% 0 0 0)',
          animation: 'glitch 0.3s infinite 0.1s'
        }}
      >
        {children}
      </span>
    </div>
  );
}