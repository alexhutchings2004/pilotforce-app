import React from 'react';
import ReactDOM from 'react-dom/client';  // Correct import for React 18
import App from './App';
import './index.css';  // Import the Tailwind CSS file

const rootElement = document.getElementById('root') as HTMLElement;  // TypeScript type assertion

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
