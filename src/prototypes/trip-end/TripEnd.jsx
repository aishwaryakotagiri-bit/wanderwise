// Interaction logic for the TripEnd prototype, ported from "project/Prototype C Trip End.dc.html".
// The markup lives in ./template.jsx (generated); renderVals() feeds it.
import React from 'react';
import template from './template.jsx';

export default class TripEnd extends React.Component {
  state = { view: 'pass', step: 0, kstep: 0, share: false, copied: false };
  reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  componentDidMount() { this.play(); }
  componentWillUnmount() { (this.timers || []).forEach(clearTimeout); }
  run(key, n, gap, start) { (this.timers || []).forEach(clearTimeout); this.timers = []; if (this.reduce) { this.setState({ [key]: n }); return; } this.setState({ [key]: 0 }); for (let i = 1; i <= n; i++) this.timers.push(setTimeout(() => this.setState({ [key]: i }), start + (i - 1) * gap)); }
  play() { this.run('step', 6, 380, 450); }
  renderVals() {
    const { step, kstep, share, copied, view } = this.state;
    const v = {};
    for (let i = 1; i <= 6; i++) { v['s' + i] = step >= i ? 1 : 1.5; v['o' + i] = step >= i ? 1 : 0; }
    for (let i = 1; i <= 3; i++) { v['sk' + i] = kstep >= i ? 1 : 1.4; v['ok' + i] = kstep >= i ? 1 : 0; }
    return { ...v, isPass: view === 'pass', isStamp: view === 'stamp',
      openKyoto: () => { this.setState({ view: 'stamp' }); this.run('kstep', 3, 320, 120); },
      back: () => this.setState({ view: 'pass' }), replay: () => this.play(),
      openShare: () => this.setState({ share: true, copied: false }), closeShare: () => this.setState({ share: false }),
      shareO: share ? 1 : 0, sharePE: share ? 'auto' : 'none', sheetY: share ? 0 : 380, prevY: share ? 0 : 24, prevS: share ? 1 : 0.96,
      copyLabel: copied ? 'Copied' : 'Copy link',
      copyLink: () => { try { navigator.clipboard && navigator.clipboard.writeText('https://aiko.app/t/aditi-japan'); } catch (_) {} this.setState({ copied: true }); }
    };
  }
  render() { return template(this.renderVals()); }
}
