'use client';

import { useState, useEffect } from 'react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState(2);
  const [autoFormat, setAutoFormat] = useState(false);

  // Live Validation
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
    } catch {
      setOutput('');
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
    } catch {
      setOutput('');
    }
  };

  const handleCopy = () => navigator.clipboard.writeText(output);

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'formatted.json';
    link.click();
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
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

        {/* JSON Output */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Formatted Output</h2>
          <pre className="w-full p-4 border rounded bg-gray-100 dark:bg-gray-900 overflow-auto text-sm max-h-96">
            {output || '// Your formatted or minified JSON will appear here'}
          </pre>
          <p className="text-xs text-gray-500 mt-1">
            {output.length} chars | {output.split('\n').length} lines
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button onClick={handleFormat} className="btn-primary">Format</button>
        <button onClick={handleMinify} className="btn-yellow">Minify</button>
        <button onClick={handleCopy} className="btn-green" disabled={!output}>Copy</button>
        <button onClick={handleDownload} className="btn-purple" disabled={!output}>Download</button>
        <button onClick={handleClear} className="btn-secondary">Clear</button>
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
