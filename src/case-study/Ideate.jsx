import { CUSTOMER_PROFILE, EMOTIONS, JOURNEY_GOALS, JOURNEY_ROWS, PHASES, PRIORITISATION, THEMES, VALUE_MAP, COLORS } from './data.js';
import { MatchaSticker } from './stickers.jsx';
import { Artefact, Chips, Dot, List, Panel, SectionHead } from './ui.jsx';

function JourneyMap() {
  const x = i => ((i + 0.5) / PHASES.length) * 100;
  return (
    <Artefact title="Aditi: expectations and journey" wide>
      <div className="stack-4" style={{ gap: 6 }}>
        <span className="caption">Aditi, 29 · first solo trip abroad · 6 days in Japan · mid-range budget</span>
        <ol className="journey__goals">
          {JOURNEY_GOALS.map(g => <li key={g}>{g}</li>)}
        </ol>
      </div>
      <div className="journey__scroll">
        <div className="journey">
          <div className="journey__row-label">Phase</div>
          {PHASES.map(p => <div key={p} className="journey__phase">{p}</div>)}

          {JOURNEY_ROWS.map(row => [
            <div key={row.label} className="journey__row-label">{row.label}</div>,
            ...row.cells.map(c => (
              <div key={row.label + c} className={`journey__cell ${row.tone ? 'journey__cell--' + row.tone : ''}`}>{c}</div>
            )),
          ])}

          <div className="journey__row-label">Emotion</div>
          <div className="emotion">
            <svg width="100%" height="150" viewBox="0 0 100 150" preserveAspectRatio="none" aria-hidden="true">
              <polyline
                points={EMOTIONS.map((e, i) => `${x(i)},${e.y}`).join(' ')}
                fill="none" stroke="#D39CED" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke"
              />
            </svg>
            {EMOTIONS.map((e, i) => (
              <div key={e.label} className="emotion__point" style={{ left: `${x(i)}%`, top: e.y }}>
                <Dot color={e.color} />
                <span>{e.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Artefact>
  );
}

function ValueProposition() {
  const grid = blocks => (
    <div className="vp__grid">
      {blocks.map(b => (
        <Panel key={b.label} label={b.label} color={b.color} span={b.span}>
          <List items={b.items} />
        </Panel>
      ))}
    </div>
  );
  return (
    <Artefact title="Value proposition: Aditi">
      <div className="vp">
        <div className="stack-12">
          <span className="vp__title">Value map</span>
          {grid(VALUE_MAP)}
        </div>
        <div className="stack-12">
          <span className="vp__title">Customer profile: Aditi <span>· fit ←</span></span>
          {grid(CUSTOMER_PROFILE)}
        </div>
      </div>
    </Artefact>
  );
}

function VoiceAndTone() {
  return (
    <Artefact title="Voice and tone">
      <div className="voice">
        <div className="stack-8">
          <span className="voice__stage">Understand</span>
          <Panel label="How users spoke about this" color={COLORS.primary}>
            <List items={[
              'Users talk about travel with excitement, mixed with nerves about going alone and the unknown.',
              'They trust honest, local voices and want the real picture: "you see a beautiful waterfall online, but you go there and it\'s dry."',
            ]} />
          </Panel>
          <Panel label="Sharing user evidence" color={COLORS.primary}>
            <List items={[
              'Problem: planning and living a trip across scattered tools, with no help when plans change.',
              'Context: travellers want both a plan and the freedom to change it.',
              'Journey: dream, plan, book, arrive, each day, plans change, back home.',
            ]} />
          </Panel>
          <span className="voice__stage voice__stage--gap">Evaluate</span>
          <Panel label="Success criteria" color={COLORS.info}>
            <List items={[
              'Clear, calm guidance at every step of the trip.',
              'Honest information: what to expect, and what a change costs.',
              'A warm tone that eases nerves and adds joy.',
            ]} />
          </Panel>
        </div>

        <div className="stack-8">
          <span className="voice__stage">Define</span>
          <Panel label="Personality traits" color={COLORS.success}>
            <Chips items={['Calm', 'Reassuring', 'Honest', 'Warm', 'Curious', 'Lightly playful']} />
            <span className="voice__aside">Like a friend who's been there before.</span>
          </Panel>
          <Panel label="How the product is NOT!" color={COLORS.error}>
            <Chips items={['Pushy or salesy', 'Alarming or dramatic', 'Robotic or generic', 'Preachy about her choices']} />
          </Panel>
          <Panel label="Dialogue and practice" color={COLORS.success}>
            <p className="voice__line">Aditi (User): "My train to Kyoto is running 40 minutes late. Will I miss my tea ceremony?"</p>
            <p className="voice__line">App: "You'll still make it. The tea house is a 15-minute walk from Kyoto Station, so you'll have about 20 minutes to spare. Should I move lunch to after the ceremony so you're not rushing?"</p>
          </Panel>
        </div>

        <div className="stack-8">
          <span className="voice__stage" aria-hidden="true">&nbsp;</span>
          <Panel label="Experimentation with tone" color={COLORS.success}>
            <List items={[
              'Celebrating: "Day 1, done! You explored all of Asakusa."',
              'Reassuring: "First night in Tokyo? Here\'s your way from the airport to the hotel, step by step."',
              'Bad news: "Fushimi Inari is packed right now. Go early tomorrow, or swap in Arashiyama today? Both keep your evening free."',
              'Errors: "That booking didn\'t go through. Nothing was charged. Try again?"',
            ]} />
          </Panel>
        </div>
      </div>
    </Artefact>
  );
}

function Prioritisation() {
  return (
    <Artefact title="Feature prioritisation: during the trip">
      <div className="matrix">
        <div className="matrix__y"><span>High value ↑</span><span>↓ Low value</span></div>
        <div className="stack-8">
          <div className="matrix__grid">
            {PRIORITISATION.map(q => (
              <div key={q.name} className={`quad ${q.tone ? 'quad--' + q.tone : ''}`}>
                <span className="label">{q.name}</span>
                <div className="quad__items">
                  {q.items.map(([name, color, picked]) => (
                    <span key={name} className={`feature ${picked ? 'feature--picked' : ''}`}>
                      <Dot color={color} />{picked ? '★ ' + name : name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="matrix__x"><span>← Low complexity</span><span>High complexity →</span></div>
        </div>
      </div>
      <div className="legend">
        <span><span className="legend__picked" />★ The two flows we design</span>
        {THEMES.map(([name, color]) => <span key={name}><Dot color={color} />{name}</span>)}
      </div>
    </Artefact>
  );
}

export default function Ideate() {
  return (
    <section id="ideate" className="section">
      <SectionHead title="Ideate" sub="Turning insights into the right problems to solve." sticker={<MatchaSticker />} />

      <p id="how-might-we" className="body">With a clear picture of what travellers go through, I turned the key insights into How Might We questions, so I could start shaping ideas around the right problems.</p>

      <div className="hmw">How might we enable travellers to plan with confidence, enjoy every day, and adapt with ease?</div>

      <p id="journey-map" className="body">To see where these moments happen, I mapped Aditi’s journey from the first idea to the trip home: what she does, thinks and feels at each step, and where we can help.</p>

      <JourneyMap />

      <p id="value-proposition" className="body">To make sure what we build matches what travellers need, I mapped Aditi’s jobs, pains and gains against what the product could offer. Every pain has something to relieve it, and every gain has something to create it.</p>

      <ValueProposition />

      <p id="voice-and-tone" className="body">
        Understanding the emotional ups and downs of travel, especially alone, I believe UX copy plays a unique role here. Through a <strong>voice and tone exercise,</strong> I wanted to make sure the product sounds like a friend who’s been there: calm when things go wrong, honest about what to expect, and excited with travellers when things go right.
      </p>

      <VoiceAndTone />

      <p id="feature-benefit" className="body">
        With a direction in place, I listed every feature idea across before, during and after the trip, drawn from my early notes and the research. I then ran a quick <strong>feature-benefit analysis</strong> to check that each one clearly helps the traveller.
      </p>

      <Artefact title="Feature-benefit analysis">
        <img className="outlined" src="case/feature-benefit.png" alt="Feature-benefit table" />
      </Artefact>

      <p id="prioritisation" className="body">Since planning and booking tools already exist, I chose to focus on the during part. I mapped the during-trip features on value against complexity, and picked the two flows to design: the trip view (Next, Today, Trip) and the place details page.</p>

      <Prioritisation />
    </section>
  );
}
