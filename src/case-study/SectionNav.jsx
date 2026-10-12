import { useEffect, useRef, useState } from 'react';
import { SECTIONS } from './data.js';

// A target counts as "being read" once its top passes this line.
const READ_LINE = 160;
// Where a jumped-to target lands: just below the sticky nav.
const LAND_OFFSET = 88;

function Chevron({ open }) {
  return (
    <svg className="tabs__chevron" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none' }}>
      <path d="M3 4.5 L6 7.5 L9 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Sticky Research / Ideate / Design tabs. Tapping a tab jumps to that section;
// the selected tab carries a chevron that opens a menu of its topics.
export default function SectionNav() {
  const [active, setActive] = useState({ section: SECTIONS[0].id, item: null });
  const [open, setOpen] = useState(null);
  const navRef = useRef(null);

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

  // The menu belongs to the selected tab, so close it when the reader scrolls into another section.
  useEffect(() => { setOpen(null); }, [active.section]);

  // Close the menu on an outside tap or Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = e => { if (navRef.current && !navRef.current.contains(e.target)) setOpen(null); };
    const onKey = e => { if (e.key === 'Escape') setOpen(null); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const go = id => {
    setOpen(null);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - LAND_OFFSET, behavior: 'smooth' });
  };

  const menu = SECTIONS.find(s => s.id === open);

  return (
    <div className="tabs-wrap">
      <div className="tabs-anchor" ref={navRef}>
        <nav className="tabs" aria-label="Case study sections">
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-current={active.section === id}
              aria-expanded={active.section === id ? open === id : undefined}
              aria-controls={active.section === id ? 'section-menu' : undefined}
              onClick={() => (active.section === id ? setOpen(o => (o === id ? null : id)) : go(id))}
            >
              {label}
              {active.section === id && <Chevron open={open === id} />}
            </button>
          ))}
        </nav>
        {menu && (
          <div id="section-menu" className="menu" role="group" aria-label={`${menu.label} topics`}>
            {menu.items.map(({ id, label }) => (
              <button key={id} type="button" aria-current={active.item === id} onClick={() => go(id)}>
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
