// Small building blocks reused across the case study.

export function Dot({ color, className = '' }) {
  return <span className={`dot ${className}`} style={{ background: color }} />;
}

export function Label({ color, children }) {
  return (
    <span className="label">
      {color && <Dot color={color} />}
      {children}
    </span>
  );
}

export function Panel({ label, color, span, className = '', children }) {
  return (
    <div className={`panel ${span ? 'panel--span2' : ''} ${className}`}>
      {label && <Label color={color}>{label}</Label>}
      {children}
    </div>
  );
}

export function List({ items }) {
  return (
    <ul className="list-sm">
      {items.map(item => <li key={item}>{item}</li>)}
    </ul>
  );
}

export function Chips({ items }) {
  return (
    <div className="chips">
      {items.map(item => <span key={item} className="chip">{item}</span>)}
    </div>
  );
}

export function Artefact({ title, wide, children }) {
  return (
    <figure className={`artefact ${wide ? 'artefact--wide' : ''}`}>
      <figcaption>{title}</figcaption>
      {children}
    </figure>
  );
}

export function SectionHead({ title, sub, sticker }) {
  return (
    <div className="section-head">
      <div className="stack-4">
        <h2 className="h2">{title}</h2>
        <span className="sub">{sub}</span>
      </div>
      {sticker}
    </div>
  );
}

export function TextCard({ title, children }) {
  return (
    <div className="card">
      <div className="stack-12">
        <h3 className="h4">{title}</h3>
        {children}
      </div>
    </div>
  );
}
