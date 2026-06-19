import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { Router } from './Router';
import './assets/styles/index-party.css';
import './assets/styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
