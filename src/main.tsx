import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// Every stylesheet loads with the first page, in the order the pages were
// written against; page code loads separately when a page first opens.
import './tokens.css';
import './ui/research-path.css';
import './ui/record-pages.css';
import './ui/reading-first.css';
import './ui/control-commitments.css';
import './ui/about.css';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
