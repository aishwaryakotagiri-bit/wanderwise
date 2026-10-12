import { useEffect, useState } from 'react';
import { SECTIONS } from './data.js';

// Sticky Research / Ideate / Design switcher. Highlights the section being read.
export default function SectionNav() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const onScroll = () => {
      let current = SECTIONS[0].id;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 160) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = id => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
  };

  return (
    <div className="tabs-wrap">
      <nav className="tabs" aria-label="Case study sections">
        {SECTIONS.map(({ id, label }) => (
          <button key={id} type="button" aria-current={active === id} onClick={() => go(id)}>
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
