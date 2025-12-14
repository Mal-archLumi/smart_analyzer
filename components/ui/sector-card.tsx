// components/ui/sector-card.tsx
interface SectorCardProps {
  id: string;
  label: string;
  color: string;
  selected: boolean;
  onClick: () => void;
}

const colorMap: Record<string, { border: string; bg: string }> = {
  'chart-1': { border: 'hsl(142 76% 36%)', bg: 'rgba(34, 197, 94, 0.1)' },
  'chart-2': { border: 'hsl(210 100% 52%)', bg: 'rgba(29, 78, 216, 0.1)' },
  'chart-3': { border: 'hsl(280 70% 50%)', bg: 'rgba(168, 85, 247, 0.1)' },
  'chart-4': { border: 'hsl(30 80% 55%)', bg: 'rgba(245, 158, 11, 0.1)' },
  'chart-5': { border: 'hsl(170 70% 45%)', bg: 'rgba(20, 184, 166, 0.1)' },
};

export function SectorCard({ label, color, selected, onClick }: SectorCardProps) {
  const colors = colorMap[color] || colorMap['chart-1'];

  return (
    <button
      onClick={onClick}
      className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-left hover:scale-[1.02] group ${
        selected ? '' : 'border-secondary hover:border-primary/50'
      }`}
      style={{
        borderColor: selected ? colors.border : '',
        backgroundColor: selected ? colors.bg : '',
      }}
    >
      <div 
        className={`absolute inset-0 rounded-xl blur-xl transition-opacity ${selected ? 'opacity-30' : 'opacity-0'}`}
        style={{ backgroundColor: colors.border }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl">{label.split(' ')[0]}</span>
          <div 
            className="w-6 h-6 rounded-full border-2 transition-colors"
            style={{
              borderColor: selected ? colors.border : 'hsl(var(--foreground) / 0.3)',
              backgroundColor: selected ? colors.border : 'transparent',
            }}
          >
            {selected && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            )}
          </div>
        </div>
        
        <p className="text-sm text-foreground/70 font-mono leading-relaxed">
          {label.split(' ').slice(1).join(' ')}
        </p>
      </div>
      
      {selected && (
        <div className="absolute -inset-1 rounded-xl">
          <div 
            className="absolute inset-0 border-2 rounded-xl animate-ripple"
            style={{ borderColor: `${colors.border}30` }}
          />
          <div 
            className="absolute inset-0 border-2 rounded-xl animate-ripple"
            style={{ 
              borderColor: `${colors.border}20`,
              animationDelay: '0.5s'
            }}
          />
        </div>
      )}
    </button>
  );
}