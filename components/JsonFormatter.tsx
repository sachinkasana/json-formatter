'use client';

import { useState, useEffect } from 'react';
import JsonOutputTabs from './JsonOutputTabs';
import { trackEvent } from '@/lib/gtag';
import ActionButton from './ActionButton';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [isJsonValid, setIsJsonValid] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState(2);
  const [autoFormat, setAutoFormat] = useState(true);

  // Live Validation & Auto-Format
  useEffect(() => {
    if (!input) {
      setError('');
      return;
    }
    try {
      JSON.parse(input);
      setError('');
      if (autoFormat) handleFormat();
    } catch (err: any) {
      setError(err.message);
    }
  }, [input, autoFormat, indent]);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      const pretty = JSON.stringify(parsed, null, indent);
      setOutput(pretty);
      setError('');
      setIsJsonValid(true);
      trackEvent({ action: 'format_json', category: 'JSON Actions', label: 'Format Button' });
    } catch {
      setIsJsonValid(false);
      setOutput('');
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
      trackEvent({ action: 'minify_json', category: 'JSON Actions', label: 'Minify Button' });
    } catch {
      setOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    trackEvent({ action: 'copy_json', category: 'JSON Actions', label: 'Copy Button' });
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'formatted.json';
    link.click();
    trackEvent({ action: 'download_json', category: 'JSON Actions', label: 'Download Button' });
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
    setIsJsonValid(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-6 justify-center items-center">
        <div>
          <label className="mr-2 font-medium">Indentation:</label>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="border rounded p-1"
          >
            <option value={2}>2 Spaces</option>
            <option value={4}>4 Spaces</option>
          </select>
        </div>
        <div>
          <label className="mr-2 font-medium">Auto-Format:</label>
          <input
            type="checkbox"
            checked={autoFormat}
            onChange={() => setAutoFormat(!autoFormat)}
          />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* JSON Input */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Paste JSON</h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={16}
            placeholder='{\n  "example": true\n}'
            className="w-full p-4 border rounded font-mono text-sm bg-gray-50 dark:bg-gray-800 resize-y"
          />
          <p className="text-xs text-gray-500 mt-1">
            {input.length} chars | {input.split('\n').length} lines
          </p>
        </div>

        {/* Output Tabs */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Output</h2>
          <JsonOutputTabs jsonString={output} />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 justify-center">
      <div className="flex flex-wrap gap-3 mt-4">
        <ActionButton label="Format" onClick={handleFormat} color="bg-blue-500" />
        <ActionButton label="Minify" onClick={handleMinify} color="bg-yellow-500" disabled={!isJsonValid}/>
        <ActionButton label="Copy" onClick={handleCopy} color="bg-green-500" disabled={!isJsonValid}/>
        <ActionButton label="Download" onClick={handleDownload} color="bg-purple-500" disabled={!isJsonValid} />
        <ActionButton label="Clear" onClick={handleClear} color="bg-gray-600" />
        </div>
       </div>


      {/* Error Message */}
      {error && (
        <div className="text-red-600 font-semibold text-center">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
