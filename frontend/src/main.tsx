import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Ensure the sacred glowing Om favicon is immediately applied in the browser tab
(() => {
  const omSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><circle cx='32' cy='32' r='30' fill='%230f172a' stroke='%23fbbf24' stroke-width='3.5'/><text x='32' y='44.5' font-family='Noto Sans Devanagari, Nirmala UI, Segoe UI, sans-serif' font-size='36' font-weight='900' fill='%23fbbf24' text-anchor='middle'>%E0%A5%90</text></svg>`;
  const dataUri = `data:image/svg+xml,${omSvg}`;

  // Remove existing icon links to force repaint
  document.querySelectorAll("link[rel*='icon']").forEach((el) => el.remove());

  const link = document.createElement('link');
  link.type = 'image/svg+xml';
  link.rel = 'icon';
  link.href = dataUri;
  document.head.appendChild(link);
})();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
