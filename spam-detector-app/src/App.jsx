import { useState } from 'react';
import './App.css';
import { buildHighlightedParts } from './highlightText.js';

function App() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState(null);

  const filteredTopWords = result
    ? result.top_words.filter(word =>
      result.label === 'spam'
        ? word.contribution > 0
        : word.contribution < 0
    )
    : [];

  const EXAMPLES = [
    {
      label: 'Ex-Likely Spam',
      text: 'WINNER!! You have been selected to receive a free prize, txt CLAIM now',
    },
    {
      label: 'Ex-Likely Spam',
      text: 'Free iPhone! Congratulations, click here to claim your prize now',
    },
    {
      label: 'Ex-Likely Ham',
      text: 'Hey, are we still meeting for lunch tomorrow around 1pm?',
    },
  ];

  async function handleCheck() {
    if (!message.trim()) return;
    setChecking(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message }),
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }


      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setError('Could not reach the prediction server. Please check that the backend is running.');
      setResult(null);

    }

    setChecking(false);
  }

  return (
    <div className="App">
      {/* Header */}
      <div className="header">
        <div className="shield-logo">
          <svg viewBox="0 0 100 100" width="90" height="90">
            <defs>
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>

            <path
              d="M50 5 L85 20 V50 C85 75 70 90 50 95 C30 90 15 75 15 50 V20 Z"
              fill="url(#shieldGrad)"
            />
          </svg>
          <div className="orbit-ring"></div>
        </div>

        <div>
          <h1 className="app-title">MailPal</h1>
          <p className="subtitle">
            Intelligent spam detection powered by machine learning
          </p>
        </div>
      </div>

      {/* Input */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Paste a message to check..."
        rows={4}
      />

      <button onClick={handleCheck} disabled={checking || !message.trim()}>
        {checking ? 'Checking...' : 'Check Message'}
      </button>
      {error && <p className="error-message">{error}</p>}

      {/* Examples */}
      <div className="examples-row">
        {EXAMPLES.map((ex, i) => (
          <button
            key={i}
            className="example-button"
            onClick={() => setMessage(ex.text)}
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* Result */}
      <div className="result">
        <h3 className="result-heading">Prediction Result</h3>

        <div className="result-row">
          <div>
            <strong className={result?.label === 'spam' ? 'spam-text' : 'ham-text'}>
              {result
                ? result.label === 'spam'
                  ? 'Spam Detected'
                  : 'Safe Message'
                : 'Prediction'}
            </strong>

            <p>
              {result ? (
                <>
                  <span className="confidence-percentage">
                    {(result.confidence * 100).toFixed(1)}%
                  </span>{' '}
                  confidence
                </>
              ) : (
                'Enter a message and click Check Message'
              )}
            </p>
          </div>

          <div>
            <div className="confidence-bar-track">
              <div
                className={`confidence-bar-fill ${result?.label === 'spam' ? 'fill-spam' : 'fill-ham'
                  }`}
                style={{ width: `${result ? result.confidence * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        {result && (
          <div className="highlighted-message">
            {buildHighlightedParts(message, filteredTopWords).map((part, i) => (
              <span
                key={i}
                className={
                  part.isHighlighted
                    ? part.contribution > 0
                      ? 'highlight-spam'
                      : 'highlight-ham'
                    : ''
                }
              >
                {part.text}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;