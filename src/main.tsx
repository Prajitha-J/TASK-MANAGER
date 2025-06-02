
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Store the current userId in localStorage for offline support
document.addEventListener('DOMContentLoaded', () => {
  // Initialize any pre-rendering logic here
  console.log('Application initializing...');
});

createRoot(document.getElementById("root")!).render(<App />);
