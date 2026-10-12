import { ADDED_COLOURS, ASSUMPTIONS, BASE_COLOURS, FLOWS, LEARNINGS, RADII, SPACING, TYPE_SCALE } from './data.js';
import { PagodaSticker } from './stickers.jsx';
import { SectionHead, TextCard } from './ui.jsx';

function Swatches({ title, note, colours }) {
  return (
    <div className="stack-12">
      <div className="ds__head"><span className="ds__title">{title}</span><span className="caption">{note}</span></div>
      <div className="swatches">
        {colours.map(([hex, name, use, light]) => (
          <div key={name} className="swatch">
            <span className={`swatch__chip ${light ? 'swatch__chip--light' : ''}`} style={{ background: hex }} title={hex} />
            <span className="swatch__name">{name}</span>
            <span className="caption">{use}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DesignSystem() {
  return (
    <div className="ds">
      <Swatches title="Base colours" note="given · unchanged" colours={BASE_COLOURS} />
      <Swatches title="Added for this project" note="deltas only" colours={ADDED_COLOURS} />

      <div className="stack-12">
        <div className="ds__head"><span className="ds__title">Type · Rubik</span><span className="caption">4pt line heights</span></div>
        <div className="stack-8">
          {TYPE_SCALE.map(([size, lh, weight, note]) => (
            <div key={size} className="type-row">
              <span style={{ fontSize: size, lineHeight: `${lh}px`, fontWeight: weight }}>Aa</span>
              <span className="caption">{note}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="stack-12">
        <div className="ds__head"><span className="ds__title">Spacing, radius, shadow</span><span className="caption">reused on every screen</span></div>
        <div className="stack-16">
          <div className="scale">
            {SPACING.map(s => (
              <div key={s} className="scale__item">
                <span className="scale__space" style={{ width: s, height: s }} />
                <span className="caption">{s}</span>
              </div>
            ))}
          </div>
          <div className="scale" style={{ alignItems: 'normal' }}>
            {RADII.map(([r, name]) => (
              <div key={r} className="scale__item">
                <span className="scale__radius" style={{ borderRadius: r }} />
                <span className="caption">{r} {name}</span>
              </div>
            ))}
          </div>
          <div className="shadows">
            <div style={{ boxShadow: 'var(--shadow-sm)' }}>sm</div>
            <div style={{ boxShadow: 'var(--shadow-md)' }}>md</div>
            <div style={{ boxShadow: 'var(--shadow-lg)' }}>lg</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Design() {
  return (
    <section id="design" className="section">
      <SectionHead title="Design" sub="From the system to the final flows." sticker={<PagodaSticker />} />

      <div className="stack-8">
        <h3 className="h3">Design system</h3>
        <span className="sub">Built on the given base system. Only the additions for maps, illustration and stamps are new.</span>
      </div>

      <DesignSystem />

      <div className="approach">
        <span className="approach__eyebrow">THE APPROACH</span>
        <div className="stack-12">
          <span className="approach__title">A trip doesn’t end when the planning does.</span>
          <p>Planning and booking already have plenty of tools, so I chose to focus on the during part: the days on the ground, when plans change and there is no one to ask. The two flows below are the trip view (Next, Today, Trip) and the place details page, with the trip end as a bonus.</p>
        </div>
      </div>

      <h3 className="h3">Final flows</h3>

      <div className="flows">
        {FLOWS.map(f => (
          <div key={f.href} className="flow">
            <iframe src={f.href} title={f.title} loading="lazy" />
            <div className="flow__meta">
              {f.bonus && <span className="badge">Bonus flow</span>}
              <span className="flow__name">{f.title}</span>
              <span className="flow__desc">{f.desc}</span>
              <a className="flow__open" href={f.href}>Open full screen ↗</a>
            </div>
          </div>
        ))}
      </div>

      <div className="duo closing">
        <TextCard title="Assumptions & Callouts">
          <ul>{ASSUMPTIONS.map(a => <li key={a}>{a}</li>)}</ul>
        </TextCard>
        <TextCard title="Key Learnings">
          <ol>{LEARNINGS.map(l => <li key={l}>{l}</li>)}</ol>
        </TextCard>
      </div>
    </section>
  );
}
