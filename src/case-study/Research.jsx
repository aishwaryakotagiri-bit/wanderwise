import { INSIGHTS, PERSONAS, RESEARCH_LINKS, STATS, STYLE_AXES, TAKEAWAYS, TOOLS, COLORS } from './data.js';
import { PlaneSticker } from './stickers.jsx';
import { Artefact, Chips, Label, List, Panel, SectionHead, Subsection } from './ui.jsx';

function ToolCard({ tool }) {
  const col = (label, color, items) => (
    <div className="tool__col">
      <Label color={color}>{label}</Label>
      {items.map(item => <span key={item} className="tool__item">{item}</span>)}
    </div>
  );
  return (
    <div className="card tool">
      <div className="stack-4">
        <span className="tool__name">{tool.name}</span>
        <span className="caption">{tool.examples}</span>
      </div>
      <div className="split">
        {col('Works', COLORS.success, tool.works)}
        {col('Breaks', COLORS.error, tool.breaks)}
      </div>
    </div>
  );
}

function Persona({ p }) {
  return (
    <Panel className="persona">
      <div className="stack-12">
        <Label>{p.type}</Label>
        <div className="persona__who">
          <span className="avatar">{p.initial}</span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="persona__name">{p.name}</span>
            <span className="caption">{p.meta}</span>
          </div>
        </div>
        <span className="persona__quote">{p.quote}</span>
        <span className="persona__bio">{p.bio}</span>
      </div>
      <div className="split">
        <div className="stack-8"><Label>Goals</Label><List items={p.goals} /></div>
        <div className="stack-8"><Label>Frustrations</Label><List items={p.frustrations} /></div>
      </div>
      <div className="stack-8">
        <Label>Travel style</Label>
        {STYLE_AXES.map(([lo, hi], i) => (
          <div key={lo} className="stack-4">
            <div className="slider__ends"><span>{lo}</span><span>{hi}</span></div>
            <div className="slider__track" role="img" aria-label={`${lo} to ${hi}: ${p.style[i]}%`}>
              <span className="slider__thumb" style={{ left: `${p.style[i]}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="stack-8">
        <Label>Turns to</Label>
        <Chips items={p.turnsTo} />
      </div>
    </Panel>
  );
}

export default function Research() {
  return (
    <section id="research" className="section section--research section--topics">
      <SectionHead title="Research" sub="Understanding how people plan and live their trips today." sticker={<PlaneSticker />} />

      <Subsection
        id="desk-research"
        title="Secondary Research"
        intro={<p className="body">To establish a baseline understanding of how people travel today, I started off with some <strong>secondary desk research</strong> about travel from India: who is travelling, how they plan, how they spend, and where they look for help.</p>}
      >
        <ul className="stats">
          {STATS.map(s => <li key={s}>{s}</li>)}
        </ul>
      </Subsection>

      <Subsection
        id="tools"
        title="Direct/Indirect Comp Analysis"
        intro={<p className="body">I looked at how people plan and live their trips today. Most people use a mix of five kinds of tools and sources. Then, I <strong>weighed the pros and cons</strong> of each method to see where the process could be improved.</p>}
      >
        <div className="grid-auto tools">
          {TOOLS.map(t => <ToolCard key={t.name} tool={t} />)}
        </div>

        <Artefact title="Tools travellers use today">
          <img src="case/tools-collage.png" alt="Screens from the tools travellers use today" />
        </Artefact>

        <div className="stack-12 measure">
          <h4 className="minor">Takeaways</h4>
          <ol className="list-lg">
            {TAKEAWAYS.map(t => <li key={t}>{t}</li>)}
          </ol>
        </div>

        <p className="body">People use many tools to plan a trip, and they still have to put it all together themselves, especially once the trip begins.</p>
      </Subsection>

      <Subsection
        id="interviews"
        title="User Interviews"
        intro={<p className="body">To develop a more well-rounded solution, I started by designing a user questionnaire and conducting <strong>three user interviews</strong>. These interviews involved individuals who had experience in travelling in India and abroad, both in solo and group settings.</p>}
      >
        <div className="stack-24">
          <div className="photos">
            {[1, 2, 3].map(n => (
              <div key={n} className="photo">
                <img src={`case/user-${n}.jpg`} alt="Interview participant" />
              </div>
            ))}
          </div>
          <div className="links">
            {RESEARCH_LINKS.map(l => (
              <a key={l.label} className="link-card" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}<span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </Subsection>

      <Subsection
        id="insights"
        title="Insights"
        intro={<p className="body">After the user interviews, the <strong>key insights and pain points</strong> uncovered are as follows:</p>}
      >
        <Artefact>
          <div className="cols-260">
            {INSIGHTS.map(group => (
              <Panel key={group.label} label={group.label}>
                <ul className="list-sm">
                  {group.items.map(([pre, bold, post]) => (
                    <li key={bold}>{pre}<strong>{bold}</strong>{post}</li>
                  ))}
                </ul>
              </Panel>
            ))}
          </div>
        </Artefact>
      </Subsection>

      <Subsection
        id="personas"
        title="Proto Personas"
        intro={<p className="body">Following the research, I found that I lacked sufficient information to create personas. To avoid being misled by incomplete personas while staying anchored to the real people I spoke to, I focused on developing proto personas to gain a better understanding of the users we are designing for.</p>}
      >
        <Artefact>
          <div className="cols-280">
            {PERSONAS.map(p => <Persona key={p.name} p={p} />)}
          </div>
        </Artefact>
      </Subsection>
    </section>
  );
}
