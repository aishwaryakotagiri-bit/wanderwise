import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './prototype.css';

export function mount(Component, hoverStyles) {
  if (hoverStyles) {
    const style = document.createElement('style');
    style.textContent = hoverStyles;
    document.head.appendChild(style);
  }
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Component />
    </StrictMode>,
  );
}
