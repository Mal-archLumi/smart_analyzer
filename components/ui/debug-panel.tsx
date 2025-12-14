// components/ui/debug-panel.tsx
'use client';

import { useState } from 'react'; // Add this import

interface DebugPanelProps {
  userData: any;
  results: any;
}

export function DebugPanel({ userData, results }: DebugPanelProps) {
  const [showDebug, setShowDebug] = useState(false);

  // Remove this check to always show in development for debugging
  // if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="px-3 py-1 bg-red-500 text-white text-xs rounded"
      >
        Debug
      </button>
      
      {showDebug && (
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-black/90 p-4 rounded-lg overflow-auto text-xs">
          <h3 className="font-bold mb-2">User Data:</h3>
          <pre className="mb-4">{JSON.stringify(userData, null, 2)}</pre>
          
          <h3 className="font-bold mb-2">Results:</h3>
          <pre>{JSON.stringify(results, null, 2)}</pre>
          
          <h3 className="font-bold mt-4 mb-2">API Key Status:</h3>
          <code className="text-green-400">
            {process.env.NEXT_PUBLIC_GEMINI_API_KEY 
              ? `✓ API Key is set` 
              : '✗ API Key NOT set'}
          </code>

          <h3 className="font-bold mt-4 mb-2">Environment:</h3>
          <code className="text-blue-400">
            NODE_ENV: {process.env.NODE_ENV}
          </code>
        </div>
      )}
    </div>
  );
}