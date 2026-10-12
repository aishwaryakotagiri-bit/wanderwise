// Interaction logic for the PlaceDetails prototype, ported from "project/Prototype B Place.dc.html".
// The markup lives in ./template.jsx (generated); renderVals() feeds it.
import React from 'react';
import template from './template.jsx';

const SM = '0px 2px 3px -1px rgba(0,0,0,0.1),0px 1px 0px 0px rgba(25,28,33,0.02),0px 0px 0px 1px rgba(25,28,33,0.08)';
const PIN = 216;
export default class PlaceDetails extends React.Component {
  state = { tab: 'overview', scrolled: false, knowOpen: false };
  scRef = React.createRef();
  setTab(tab) { this.setState({ tab }); const el = this.scRef.current; if (el && el.scrollTop > PIN) el.scrollTop = PIN; }
  onScroll = e => { const s = e.currentTarget.scrollTop >= PIN; if (s !== this.state.scrolled) this.setState({ scrolled: s }); };
  renderVals() {
    const t = this.state.tab;
    const tabs = [['overview', 'Overview'], ['food', 'Food'], ['ratings', 'Ratings']].map(([id, label]) => ({ label, go: () => this.setTab(id), bg: t === id ? '#FFFFFF' : 'transparent', fg: t === id ? '#1A1A1A' : '#4D4D4D', sh: t === id ? SM : 'none' }));
    return { tabs, isOverview: t === 'overview', isFood: t === 'food', isRatings: t === 'ratings', scRef: this.scRef, onScroll: this.onScroll,
      hdrO: this.state.scrolled ? 1 : 0, hdrPE: this.state.scrolled ? 'auto' : 'none', goRatings: () => this.setTab('ratings'),
      knowOpen: this.state.knowOpen, knowRot: this.state.knowOpen ? 180 : 0, toggleKnow: () => this.setState(s => ({ knowOpen: !s.knowOpen })) };
  }
  render() { return template(this.renderVals()); }
}
