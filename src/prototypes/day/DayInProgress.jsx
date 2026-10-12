// Interaction logic for the DayInProgress prototype, ported from "project/Prototype A Day.dc.html".
// The markup lives in ./template.jsx (generated); renderVals() feeds it.
import React from 'react';
import template from './template.jsx';

const ROUTES = { pagoda: 'M128 262 Q226 250 272 286', garden: 'M128 262 Q100 296 72 298', matcha: 'M128 262 Q156 210 190 190', torii: 'M128 262 Q240 190 294 168', custom: '' };
const SNAP = { peek: 92, half: 432, full: 688 };
const SM = '0px 2px 3px -1px rgba(0,0,0,0.1),0px 1px 0px 0px rgba(25,28,33,0.02),0px 0px 0px 1px rgba(25,28,33,0.08)';
const NEXT0 = { id: 'kiyomizu', k: 'pagoda', name: 'Kiyomizu-dera', time: '2:00 PM', walk: '12 min walk', note: 'Crowds thin by 3, the quiet hour.', ctag: 'Most popular', f: { start: '2:00 PM', walk: '12 min', entry: '¥400 · cash', now: 'Busy till 3' } };
const ALTS0 = [
  { id: 'kennin', k: 'garden', name: 'Kennin-ji', tag: "Aiko's pick", kind: 'aiko', meta: '8 min · quiet now', time: '1:35 PM', walk: '8 min walk', note: 'Quiet now. Twin dragons on the ceiling.', ctag: "Aiko's pick", f: { start: '1:35 PM', walk: '8 min', entry: '¥600', now: 'Quiet' }, sameDay: false },
  { id: 'break', k: 'matcha', name: 'Take a break', tag: 'Rest', kind: 'plain', meta: '3 min · seats free', time: '1:25 PM', walk: '3 min walk', note: 'Matcha café with seats free. Charge your phone.', ctag: 'Rest', f: { start: '1:25 PM', walk: '3 min', entry: '¥800', now: 'Seats free' }, sameDay: true, pushTo: '2:40 PM' },
  { id: 'yasaka', k: 'torii', name: 'Yasaka Shrine', tag: 'Trending', kind: 'plain', meta: '4 min · free', time: '1:30 PM', walk: '4 min walk', note: 'Lanterns and stalls, on your way up.', ctag: 'Trending', f: { start: '1:30 PM', walk: '4 min', entry: 'Free', now: 'Busy' }, sameDay: true, pushTo: '3:00 PM' }
];
const LATER0 = [
  { id: 'tea', time: '4:30 PM', name: 'Tea ceremony', meta: 'Booked · free cancel till 2 PM', booked: true, x: 156, y: 352, hint: 'Free to cancel until 2 PM, so swapping costs nothing.', alts: [{ name: 'Kimono stroll, Ninenzaka', meta: 'Same time · 2 hr' }, { name: 'Gion Corner show', meta: '5:00 PM · indoors, good in rain' }] },
  { id: 'dinner', time: '7:00 PM', name: 'Dinner, Pontocho', meta: 'Not booked · veg picks ready', booked: false, x: 40, y: 120, hint: 'Veg-safe places on your way back to Hotel Gion.', alts: [{ name: 'Veg kaiseki, Pontocho', meta: 'Book now · 2 seats left' }, { name: 'Ramen, veg broth', meta: 'Walk in · 6 min from hotel' }] }
];
const DONE = [{ name: 'Nishiki Market', time: '12:00', x: 60, y: 206 }, { name: 'Fushimi Inari', time: '8:00', x: 100, y: 440 }];
const ALERTS = [
  { id: 'rain', t: 'Rain from 5 PM', m: "You'll be indoors at the tea ceremony. Umbrella for dinner." },
  { id: 'cash', t: 'Kiyomizu-dera is cash only', m: 'Entry ¥400. There is a 7-Eleven ATM on the way up.' },
  { id: 'dashi', t: 'Fish stock on the slope', m: 'Most stalls use dashi. Ask for "dashi nashi".' }
];
const PHRASES = [
  { jp: '出汁なしでお願いします', ro: 'Dashi nashi de onegaishimasu', en: 'No fish stock, please.', ctx: 'Food' },
  { jp: '私はベジタリアンです', ro: 'Watashi wa bejitarian desu', en: 'I am vegetarian.', ctx: 'Food' },
  { jp: 'トイレはどこですか', ro: 'Toire wa doko desu ka', en: 'Where is the toilet?', ctx: 'Help' },
  { jp: '清水寺はどちらですか', ro: 'Kiyomizu-dera wa dochira desu ka', en: 'Which way to Kiyomizu-dera?', ctx: 'Here' },
  { jp: 'カードは使えますか', ro: 'Kaado wa tsukaemasu ka', en: 'Can I pay by card?', ctx: 'Pay' },
  { jp: 'ありがとうございます', ro: 'Arigatou gozaimasu', en: 'Thank you very much.', ctx: 'Basic' }
];
const ANSWERS = {
  'Is the climb worth it?': 'Yes, if you go slowly. It is 10 minutes uphill on Matsubara-dori. Benches at the halfway shop.',
  'Clean toilet nearby?': 'At the main gate of Kiyomizu-dera, 12 min. Or Yasaka Shrine, 4 min, on your way.',
  'Veg snack on the way': 'Stall 7 on Sannenzaka: grilled mochi and sweet potato, no dashi. ¥400.',
  'What do I do at the shrine?': 'Bow once at the gate, rinse hands at the basin, then bow twice, clap twice, bow once.'
};
const mins = t => { const m = /(\d+):(\d+) (AM|PM)/.exec(t); if (!m) return 0; let h = +m[1] % 12; if (m[3] === 'PM') h += 12; return h * 60 + +m[2]; };
export default class DayInProgress extends React.Component {
  state = { sheet: 'half', liveH: null, tab: 'next', next: NEXT0, alts: ALTS0, later: LATER0, day6: [], doneOpen: false, laterOpen: false, laterId: null, cmp: null, toast: null, snap: null, tip: '', aiko: '', alertsOpen: false, dismissed: [], preview: null, openRow: null, d6: { name: 'Kinkaku-ji, 9 AM', alts: [{ name: 'Arashiyama bamboo, 7 AM', meta: 'Before the crowds · 40 min' }, { name: 'Nishiki for gifts, 11 AM', meta: 'Near Kyoto Station' }], removable: true }, ov: null, trTab: 'cam', ph: 0, ask: '', msgs: [{ me: false, t: "You're in Gion with 40 min before Kiyomizu-dera at 2:00. Ask me anything about where you are." }] };
  scRef = React.createRef(); msgRef = React.createRef();
  componentWillUnmount() { clearTimeout(this.tt); clearTimeout(this.at); clearTimeout(this.gt); }
  componentDidUpdate() { const m = this.msgRef.current; if (m) m.scrollTop = m.scrollHeight; }
  snapshot() { const { next, alts, later, day6, d6 } = this.state; return { next, alts, later, day6, d6 }; }
  removeLater(l) { const s = this.snapshot(); this.setState({ later: s.later.filter(x => x.id !== l.id), snap: s, openRow: null }); this.showToast(l.booked ? 'Booking cancelled, no fee' : 'Removed from today', l.name); }
  swapD6(x) { const s = this.snapshot(); const o = s.d6; this.setState({ d6: { name: x.name, alts: [...o.alts.filter(a => a.name !== x.name), { name: o.name, meta: 'Your original plan' }], removable: true }, snap: s, openRow: null }); this.showToast('Day 6 updated', o.name + ' → ' + x.name); }
  clearD6() { const s = this.snapshot(); const o = s.d6; this.setState({ d6: { name: 'Free morning', alts: [{ name: o.name, meta: 'Your original plan' }, ...o.alts], removable: false }, snap: s, openRow: null }); this.showToast('Morning cleared', 'Day 6 is free until your flight'); }
  rowVals(n) { const st = this.state;
    const C = { done: ['#2DAA3E', '#2DAA3E'], next: ['#9F2BCF', '#9F2BCF'], booked: ['#4D4D4D', '#4D4D4D'], open: ['#FFFFFF', '#B4BFCB'] };
    const mk = o => { const editable = !!(o.alts && o.alts.length) || !!o.remove || !!o.go; const open = st.openRow === o.id && !o.go;
      return { time: o.time, name: o.name, meta: o.meta, hint: o.hint || '', dot: C[o.s][0], ring: C[o.s][1], bg: o.s === 'next' ? '#F7EDFB' : '#FFFFFF', border: o.s === 'next' ? '#F7EDFB' : '#EEF2F5',
        canEdit: editable, action: o.go ? (o.goLabel || 'Open') : (open ? 'Close' : 'Change'), open,
        toggle: () => { if (o.go) o.go(); else if (editable) this.setState(s => ({ openRow: s.openRow === o.id ? null : o.id })); },
        alts: (o.alts || []).map(x => ({ name: x.name, meta: x.meta, swap: x.swap })), canRemove: !!o.remove, removeLabel: o.removeLabel || 'Remove', remove: () => o.remove && o.remove() }; };
    const laterItems = st.later.map(l => ({ id: 'l-' + l.id, time: l.time, name: l.name, meta: l.meta, s: /Booked|Rebooked/.test(l.meta) ? 'booked' : 'open', hint: l.hint || 'Moved here by you.', alts: l.alts.map(x => ({ ...x, swap: () => this.swapLater(l, x) })), remove: () => this.removeLater(l), removeLabel: l.booked ? 'Cancel booking, no fee' : 'Remove from today' }));
    const nextItem = { id: 'next', time: n.time, name: n.name, meta: 'Next · ' + n.walk, s: 'next', hint: 'Compare before you swap. All ideas are in Next.', alts: st.alts.slice(0, 2).map(a => ({ name: a.name, meta: a.meta, swap: () => this.setState({ cmp: a, openRow: null }) })) };
    const today = [{ id: 'f', time: '8:00 AM', name: 'Fushimi Inari', meta: 'Done · rated 5', s: 'done' }, { id: 'ni', time: '12:00 PM', name: 'Nishiki Market', meta: 'Done', s: 'done' }, nextItem, ...laterItems, { id: 'hotel', time: '10:00 PM', name: 'Hotel Gion', meta: 'Tonight · 15 min walk', s: 'booked' }];
    const d6 = st.d6;
    const days = [{ id: 'D1', time: 'D1', name: 'Tokyo · arrive', meta: '14 Nov · Narita, Shinjuku', s: 'done' }, { id: 'D2', time: 'D2', name: 'Tokyo', meta: '15 Nov · Asakusa, Shibuya', s: 'done' }, { id: 'D3', time: 'D3', name: 'Kyoto', meta: '16 Nov · Shinkansen, Arashiyama', s: 'done' }, { id: 'D4', time: 'D4', name: 'Nara day trip', meta: '17 Nov · Deer park, Todai-ji', s: 'done' },
      { id: 'D5', time: 'D5', name: 'Kyoto · today', meta: '18 Nov · Fushimi Inari, ' + n.name, s: 'next', go: () => this.setTab('today'), goLabel: 'Open' },
      { id: 'D6', time: 'D6', name: d6.name, meta: '19 Nov · ' + (st.day6.length ? 'Added: ' + st.day6.join(', ') + ' · ' : '') + 'KIX 6:40 PM', s: 'open', hint: 'Flight at 6:40 PM. Leave Kyoto by 3:30.', alts: d6.alts.map(x => ({ ...x, swap: () => this.swapD6(x) })), remove: d6.removable ? () => this.clearD6() : null, removeLabel: 'Keep the morning free' }];
    return { todayRows: today.map(mk), laterRows: laterItems.map(mk), days: days.map(mk), d6Name: d6.name, doneLabel: '2 of ' + (3 + st.later.length) };
  }
  showToast(title, meta) { clearTimeout(this.tt); this.setState({ toast: { title, meta } }); this.tt = setTimeout(() => this.setState({ toast: null, snap: null }), 6000); }
  setTab(tab) { this.setState({ tab, preview: null, alertsOpen: false, openRow: null }); if (this.scRef.current) this.scRef.current.scrollTop = 0; }
  dDown = e => { this.drag = { y: e.clientY, h: this.state.liveH ?? SNAP[this.state.sheet], moved: false }; try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {} };
  dMove = e => { const d = this.drag; if (!d) return; const dy = d.y - e.clientY; if (Math.abs(dy) > 4) d.moved = true; if (d.moved) this.setState({ liveH: Math.max(92, Math.min(688, d.h + dy)) }); };
  dUp = () => { const d = this.drag; this.drag = null; if (!d) return;
    if (!d.moved) { const order = { peek: 'half', half: 'full', full: 'half' }; this.setState({ sheet: order[this.state.sheet], liveH: null }); return; }
    const h = this.state.liveH ?? d.h; let best = 'half', bd = 1e9; for (const k in SNAP) { const dd = Math.abs(SNAP[k] - h); if (dd < bd) { bd = dd; best = k; } }
    this.setState({ sheet: best, liveH: null }); };
  applySwap = () => { const a = this.state.cmp; if (!a) return; const s = this.snapshot(); const old = s.next;
    const later = a.sameDay ? [...s.later, { id: 'm' + Date.now(), time: a.pushTo, name: old.name, meta: 'Moved by you · ' + old.f.entry, hint: '', alts: [] }].sort((x, y) => mins(x.time) - mins(y.time)) : s.later;
    const day6 = a.sameDay ? s.day6 : [...s.day6, old.name + ' 8 AM'];
    this.setState({ next: { ...a, ctag: a.ctag || a.tag }, alts: s.alts.filter(x => x.id !== a.id), later, day6, cmp: null, snap: s, tab: 'next', preview: null });
    this.showToast('Plan updated', old.name + ' → ' + (a.sameDay ? a.pushTo + ' today' : 'Day 6, 8 AM')); };
  swapLater(item, alt) { const s = this.snapshot();
    const later = s.later.map(l => l.id !== item.id ? l : { ...l, name: alt.name, meta: (l.booked ? 'Rebooked · ' : '') + alt.meta, alts: [...l.alts.filter(x => x.name !== alt.name), { name: l.name, meta: 'Your original plan' }] });
    this.setState({ later, snap: s, laterId: null }); this.showToast(item.booked ? 'Rebooked, no fee' : 'Plan updated', item.name + ' → ' + alt.name); }
  hide(a) { const s = this.snapshot(); this.setState({ alts: s.alts.filter(x => x.id !== a.id), snap: s, preview: null }); this.showToast('Hidden for today', a.name + " won't be suggested again"); }
  undo = () => { const s = this.state.snap; clearTimeout(this.tt); if (s) this.setState({ ...s, snap: null, toast: null }); else this.setState({ toast: null }); };
  sendTip = () => { const text = this.state.tip.trim(); if (!text) return; const id = 'c' + Date.now();
    const alt = { id, k: 'custom', name: text, tag: 'From you', kind: 'you', meta: 'Aiko is checking…', time: '1:40 PM', walk: '10 min walk', note: 'Added from your tip.', ctag: 'From you', f: { start: '1:40 PM', walk: '10 min', entry: 'Checking', now: 'Checking' }, sameDay: false };
    this.setState(s => ({ alts: [...s.alts, alt], tip: '', aiko: 'Added ' + text + '. Checking hours and whether it fits before tea at 4:30.' }));
    clearTimeout(this.at); this.at = setTimeout(() => this.setState(s => ({ alts: s.alts.map(x => x.id === id ? { ...x, meta: 'Fits before 4:30 · 10 min', f: { ...x.f, entry: '¥500', now: 'Open' } } : x), aiko: text + ' fits. Tap + to compare it with ' + s.next.name + '.' })), 1400); };
  askAiko(q) { if (!q) return; const a = ANSWERS[q] || ("I'll check that. From Gion, most places are within 15 min on foot. Want me to add it as an idea for today?");
    this.setState(s => ({ msgs: [...s.msgs, { me: true, t: q }], ask: '' })); clearTimeout(this.gt); this.gt = setTimeout(() => this.setState(s => ({ msgs: [...s.msgs, { me: false, t: a }] })), 600); }
  renderVals() {
    const st = this.state; const n = st.next;
    const h = st.liveH ?? SNAP[st.sheet];
    const lab = {}; ['pagoda', 'garden', 'matcha', 'torii'].forEach(k => { lab['n_' + k] = n.k === k; lab['pad_' + k] = n.k === k ? 4 : 12; });
    const seg = (list, cur, set) => list.map(([id, label]) => ({ label, go: () => set(id), bg: cur === id ? '#FFFFFF' : 'transparent', fg: cur === id ? '#1A1A1A' : '#4D4D4D', sh: cur === id ? SM : 'none' }));
    const tabs = seg([['next', 'Next'], ['today', 'Today'], ['trip', 'Trip']], st.tab, id => this.setTab(id));
    const TAG = { aiko: ['#F7EDFB', '#721194'], plain: ['#F1F3F6', '#1A1A1A'], you: ['#F1F3F6', '#1A1A1A'] };
    const alts = st.alts.map(a => ({ ...a, isGarden: a.k === 'garden', isMatcha: a.k === 'matcha', isTorii: a.k === 'torii', isPagoda: a.k === 'pagoda', isCustom: a.k === 'custom', tagBg: TAG[a.kind][0], tagFg: TAG[a.kind][1], border: st.preview === a.id ? '#D39CED' : '#EEF2F5', bg: st.preview === a.id ? '#F7EDFB' : '#FFFFFF', preview: () => this.setState(s => ({ preview: s.preview === a.id ? null : a.id })), hide: () => this.hide(a), swap: () => this.setState({ cmp: a, alertsOpen: false }) }));
    const pv = st.alts.find(a => a.id === st.preview);
    const c = st.cmp;
    const cmpRows = c ? [['Starts', n.f.start, c.f.start], ['Walk', n.f.walk, c.f.walk], ['Entry', n.f.entry, c.f.entry], ['Right now', n.f.now, c.f.now]].map(([k, a, b], i) => ({ k, a, b, line: i === 3 ? 'transparent' : '#EEF2F5' })) : [];
    const cmp = c ? { name: c.name, moveTitle: c.sameDay ? n.name + ' moves to ' + c.pushTo : n.name + ' moves to Day 6', moveMeta: c.sameDay ? 'Later today. Crowds are thinner then.' : '8 AM, before Kinkaku-ji. Free to change.' } : { name: '', moveTitle: '', moveMeta: '' };
    const D = { done: ['#2DAA3E', '#2DAA3E', 'transparent'], next: ['#9F2BCF', '#F7EDFB', '#F7EDFB'], booked: ['#1A1A1A', '#1A1A1A', 'transparent'], open: ['#FFFFFF', '#B4BFCB', 'transparent'] };
    const rows = [{ time: '8:00 AM', name: 'Fushimi Inari', meta: 'Done · rated 5', s: 'done' }, { time: '12:00 PM', name: 'Nishiki Market', meta: 'Done', s: 'done' }, { time: n.time, name: n.name, meta: 'Next · ' + n.walk, s: 'next' }, ...st.later.map(l => ({ time: l.time, name: l.name, meta: l.meta, s: /Booked|Rebooked/.test(l.meta) ? 'booked' : 'open' })), { time: '10:00 PM', name: 'Hotel Gion', meta: 'Tonight · 15 min walk', s: 'booked' }];
    const todayRows = rows.map(r => ({ time: r.time, name: r.name, meta: r.meta, dot: D[r.s][0], ring: D[r.s][1], bg: D[r.s][2] }));
    const DAYS = [['D1', '14 Nov', 'Tokyo', 'Land at Narita · Shinjuku', 'Done'], ['D2', '15 Nov', 'Tokyo', 'Asakusa · Shibuya', 'Done'], ['D3', '16 Nov', 'Kyoto', 'Shinkansen · Arashiyama', 'Done'], ['D4', '17 Nov', 'Nara', 'Nara day trip', 'Done'], ['D5', '18 Nov', 'Kyoto', 'Today', 'Fushimi Inari · ' + n.name], ['D6', '19 Nov', 'Kyoto', 'Kinkaku-ji · fly home', (st.day6.length ? 'Added: ' + st.day6.join(', ') + ' · ' : '') + 'KIX 6:40 PM']];
    const days = DAYS.map(([d, date, city, title, meta], i) => ({ d, date, city, title, meta, bg: i === 4 ? '#F7EDFB' : '#FFFFFF', border: i === 4 ? '#F7EDFB' : '#EEF2F5' }));
    const later = st.later.map(l => ({ ...l, hasAlts: l.alts.length > 0, altLabel: l.alts.length + ' ideas', open: st.laterId === l.id && l.alts.length > 0, toggle: () => this.setState(s => ({ laterId: s.laterId === l.id ? null : l.id })), alts: l.alts.map(x => ({ ...x, swap: () => this.swapLater(l, x) })) }));
    const mapPins = [...DONE.map(p => ({ ...p, done: true, later: false })), ...st.later.filter(l => l.x != null).map(l => ({ name: l.name, time: l.time.replace(' PM', ''), x: l.x, y: l.y, done: false, later: true }))];
    const alerts = ALERTS.filter(a => !st.dismissed.includes(a.id));
    const alertList = alerts.map((a, i) => ({ ...a, line: i === alerts.length - 1 ? 'transparent' : '#EEF2F5', ok: () => this.setState(s => ({ dismissed: [...s.dismissed, a.id] })) }));
    const phrases = PHRASES.map((p, i) => ({ ...p, border: st.ph === i ? '#B4BFCB' : '#EEF2F5', pick: () => this.setState({ ph: i }) }));
    const level = st.tab;
    return { ...lab,
      routeD: level === 'trip' ? '' : (ROUTES[n.k] || ''), previewD: pv && level === 'next' ? (ROUTES[pv.k] || '') : '', altO: level === 'next' ? 1 : 0, labO: level === 'next' ? 1 : 0,
      mapT: level === 'today' ? 'translate(0px,-40px) scale(.8)' : 'translate(0px,0px) scale(1)', isTodayLvl: level === 'today', isTripLvl: level === 'trip', mapPins,
      next: n, alts, noAlts: alts.length === 0, later, laterNames: st.later.map(l => l.name).join(' · '), laterCount: String(st.later.length),
      sheetH: h, sheetTr: st.liveH == null ? 'height .32s cubic-bezier(.2,.8,.2,1)' : 'none', isPeek: st.sheet === 'peek' && (st.liveH == null || st.liveH < 140), notPeek: !(st.sheet === 'peek' && (st.liveH == null || st.liveH < 140)),
      dimO: h > 560 ? 1 : 0, dDown: this.dDown, dMove: this.dMove, dUp: this.dUp, scRef: this.scRef, msgRef: this.msgRef,
      tabs, isNextTab: level === 'next', isTodayTab: level === 'today', isTripTab: level === 'trip',
      doneOpen: st.doneOpen, laterOpen: st.laterOpen, doneRot: st.doneOpen ? 180 : 0, laterRot: st.laterOpen ? 180 : 0,
      toggleDone: () => this.setState(s => ({ doneOpen: !s.doneOpen })), toggleLater: () => this.setState(s => ({ laterOpen: !s.laterOpen })),
      cmpOn: !!c, cmp, cmpRows, closeCmp: () => this.setState({ cmp: null }), applySwap: this.applySwap,
      toastOn: !!st.toast, toastTitle: st.toast ? st.toast.title : '', toastMeta: st.toast ? st.toast.meta : '', undo: this.undo,
      tip: st.tip, onTip: e => this.setState({ tip: e.target.value }), onTipKey: e => { if (e.key === 'Enter') this.sendTip(); }, sendTip: this.sendTip, sendBg: st.tip.trim() ? '#9F2BCF' : '#F1F3F6', sendFg: st.tip.trim() ? '#FFFFFF' : '#4D4D4D',
      aikoOn: !!st.aiko, aikoMsg: st.aiko, todayRows, days,
      alerts: alertList, noAlerts: alerts.length === 0, alertCount: alerts.length ? String(alerts.length) : '✓', alertDot: alerts.length ? '#FEBA3B' : '#2DAA3E',
      alertsOpen: st.alertsOpen, alertBg: st.alertsOpen ? '#F7EDFB' : '#F1F3F6', toggleAlerts: () => this.setState(s => ({ alertsOpen: !s.alertsOpen })),
      ovTr: st.ov === 'tr', ovGuide: st.ov === 'guide', openTr: () => this.setState({ ov: 'tr', alertsOpen: false }), openGuide: () => this.setState({ ov: 'guide', alertsOpen: false }), closeOv: () => this.setState({ ov: null }),
      trTabs: seg([['cam', 'Camera'], ['ph', 'Phrases']], st.trTab, id => this.setState({ trTab: id })), trCam: st.trTab === 'cam', trPh: st.trTab === 'ph', phrases, ph: PHRASES[st.ph],
      msgs: st.msgs.map(m => ({ t: m.t, align: m.me ? 'flex-end' : 'flex-start', bg: m.me ? '#F7EDFB' : '#F1F3F6', fg: '#1A1A1A' })),
      prompts: Object.keys(ANSWERS).map(q => ({ q, ask: () => this.askAiko(q) })),
      ask: st.ask, onAsk: e => this.setState({ ask: e.target.value }), onAskKey: e => { if (e.key === 'Enter') this.askAiko(this.state.ask.trim()); }, sendAsk: () => this.askAiko(this.state.ask.trim()),
      ...this.rowVals(n), notTripLvl: level !== 'trip', trailO: level === 'trip' ? 0 : 1,
      mapPins: [...DONE.map(p => ({ ...p, done: true, later: false, showLabel: level === 'today' })), ...(level === 'today' ? st.later.filter(l => l.x != null).map(l => ({ name: l.name, time: l.time.replace(' PM', ''), x: l.x, y: l.y, done: false, later: true, showLabel: true })) : [])]
    };
  }
  render() { return template(this.renderVals()); }
}
