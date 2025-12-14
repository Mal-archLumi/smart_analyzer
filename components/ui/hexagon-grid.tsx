// components/ui/hexagon-grid.tsx
export function HexagonGrid() {
  return (
    <div className="relative w-64 h-64">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="flex gap-2 mb-2">
          {Array.from({ length: 7 }).map((_, j) => (
            <div
              key={j}
              className="w-8 h-8 border border-primary/20 hover:border-primary/50 transition-colors"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                animationDelay: `${(i + j) * 0.1}s`,
                animation: 'float 6s ease-in-out infinite'
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}