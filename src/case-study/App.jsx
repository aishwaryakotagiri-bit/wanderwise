import { PROCESS } from './data.js';
import Design from './Design.jsx';
import Ideate from './Ideate.jsx';
import Research from './Research.jsx';
import SectionNav from './SectionNav.jsx';
import { StickerDefs } from './stickers.jsx';
import { TextCard } from './ui.jsx';

function Intro() {
  return (
    <section className="section">
      <div className="duo">
        <TextCard title="The Challenge">
          <p className="body">Planning a trip can be overwhelming, with many travellers unsure how much to plan, where to go and which sources to trust, and then struggling to keep up with changing plans once they’re on the road.</p>
        </TextCard>
        <TextCard title="The Outcome">
          <p className="body">Wanderwise keeps the whole trip in one place and stays with travellers on the ground: what’s next, what’s nearby, what each change costs, and how to get help, so a first trip abroad feels calm instead of chaotic.</p>
        </TextCard>
      </div>

      <div className="stack-12 measure">
        <h3 className="h4">Interpreting the brief</h3>
        <p className="body">The brief introduced me to Aditi, 29, about to take her first trip abroad on her own, anxious about being alone and keen not to waste a single day. Rather than design only for her, I chose to zoom out and understand how people plan and live their trips today. I treated Aditi as one of the many travellers this business would serve: the one with the most apprehension. If the product works for her from the first plan to the trip home, it can work for everyone else too.</p>
      </div>

      <div className="stack-16" style={{ gap: 20 }}>
        <h2 className="h2">The Process</h2>
        <div className="process">
          {PROCESS.map(step => (
            <div key={step.n} className="card process__card">
              <span className="process__num">{step.n}</span>
              <span className="process__name">{step.name}</span>
              <ul>{step.items.map(i => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <StickerDefs />
      <div className="page">
        <header className="hero">
          <img className="hero__logo" src="logo.svg" alt="Wanderwise logo" onError={e => { e.currentTarget.hidden = true; }} />
          <span className="eyebrow">CASE STUDY</span>
          <h1 className="title">Wanderwise</h1>
          <span className="lede">A case study for slice</span>
        </header>
        <main>
          <Intro />
          <SectionNav />
          <Research />
          <Ideate />
          <Design />
        </main>
        <footer className="footer">Thank you!</footer>
      </div>
    </>
  );
}
