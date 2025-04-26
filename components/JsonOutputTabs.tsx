'use client';

import { useState, useEffect } from 'react';
import { JsonViewer } from '@textea/json-viewer';
import { trackEvent } from '@/lib/gtag';

export default function JsonOutputTabs({ jsonString }: { jsonString: string }) {
  const [activeTab, setActiveTab] = useState<'formatted' | 'tree'>('formatted');
  const [isDarkMode, setIsDarkMode] = useState(false);

  let parsedJson = null;
  let isValidJson = true;

  try {
    parsedJson = JSON.parse(jsonString);
  } catch {
    isValidJson = false;
  }

  const handleTabSwitch = (tab: 'formatted' | 'tree') => {
    setActiveTab(tab);
    trackEvent({ 
      action: 'switch_tab', 
      category: 'View Mode', 
      label: `${tab === 'formatted' ? 'Formatted View' : 'Tree View'}` 
    });
  };

  // Detect Dark Mode (Tailwind 'dark' class on html)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true });
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-4">
      {/* Tabs */}
      <div className="flex border-b mb-4">
      <button
          onClick={() => handleTabSwitch('formatted')}
          className={`px-4 py-2 ${activeTab === 'formatted' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Formatted View
        </button>
        <button
          onClick={() => handleTabSwitch('tree')}
          className={`px-4 py-2 ${activeTab === 'tree' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Tree View
        </button>
      </div>

      {/* Content */}
      {activeTab === 'formatted' && (
        <pre className="w-full p-4 border rounded bg-gray-100 dark:bg-gray-900 overflow-auto text-sm max-h-96">
          {jsonString || '// Your formatted or minified JSON will appear here'}
        </pre>
      )}

      {activeTab === 'tree' && isValidJson && (
        <div className="border rounded p-4 bg-gray-50 dark:bg-gray-800 max-h-96 overflow-auto text-sm">
          <JsonViewer
            value={parsedJson}
            theme={isDarkMode ? 'dark' : 'light'}
            defaultInspectDepth={2}
            enableClipboard={true}
            displayDataTypes={false}
          />
        </div>
      )}

      {activeTab === 'tree' && !isValidJson && (
        <p className="text-red-500 text-center mt-4">⚠️ Invalid JSON. Tree view is unavailable.</p>
      )}
    </div>
  );
}
