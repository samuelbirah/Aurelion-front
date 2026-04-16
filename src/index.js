import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'sonner';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Toaster 
      position="top-center"
      toastOptions={{
        style: {
          background: '#1A1A1A',
          color: '#FFFFFF',
          border: '1px solid rgba(212, 175, 55, 0.3)',
        },
      }}
    />
  </React.StrictMode>
);
