import { useEffect, useRef, useState } from 'react';
import { SECTIONS } from './data.js';

// A target counts as "being read" once its top passes this line.
const READ_LINE = 200;
// Where a jumped-to target lands: just below the sticky nav.
const LAND_OFFSET = 128;

// Sticky Research / Ideate / Design switcher, with the active section's
// sub-sections underneath. Highlights where the reader is.
export default function SectionNav() {
  const [active, setActive] = useState({ section: SECTIONS[0].id, item: null });
  const subRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      let section = SECTIONS[0];
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < READ_LINE) section = s;
      }
      let item = null;
      for (const it of section.items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top < READ_LINE) item = it.id;
      }
      setActive(prev => (prev.section === section.id && prev.item === item ? prev : { section: section.id, item }));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keep the active sub-section chip in view when the row scrolls sideways.
  useEffect(() => {
    const row = subRef.current;
    const chip = row && row.querySelector('[aria-current="true"]');
    if (!chip || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2, behavior: 'smooth' });
  }, [active]);

  const go = id => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - LAND_OFFSET, behavior: 'smooth' });
  };

  const current = SECTIONS.find(s => s.id === active.section);

  return (
    <div className="tabs-wrap">
      <nav className="tabs" aria-label="Case study sections">
        {SECTIONS.map(({ id, label }) => (
          <button key={id} type="button" aria-current={active.section === id} onClick={() => go(id)}>
            {label}
          </button>
        ))}
      </nav>
      <nav className="subtabs" aria-label={`${current.label} sub-sections`} ref={subRef}>
        {current.items.map(({ id, label }) => (
          <button key={id} type="button" aria-current={active.item === id} onClick={() => go(id)}>
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
