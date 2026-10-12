// Converts the Claude Design `.dc.html` prototype templates in ../project into
// React render functions (src/prototypes/<name>/template.jsx).
//
// The templates use a tiny binding language: `{{ path }}` in attributes and
// text, <sc-if value>, and <sc-for list as>. Each one maps 1:1 onto JSX, so the
// generated markup renders exactly what the design runtime rendered.
//
//   node scripts/convert-dc.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFragment } from 'parse5';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const designDir = resolve(root, '../project');

const PROTOTYPES = [
  { file: 'Prototype A Day.dc.html', out: 'day' },
  { file: 'Prototype B Place.dc.html', out: 'place' },
  { file: 'Prototype C Trip End.dc.html', out: 'trip-end' },
];

// Links between prototypes point at the built pages instead of the .dc.html files.
const LINKS = {
  'Prototype A Day.dc.html': './day.html',
  'Prototype B Place.dc.html': './place.html',
  'Prototype C Trip End.dc.html': './trip-end.html',
};

const EVENTS = {
  onclick: 'onClick', onchange: 'onChange', oninput: 'onInput', onkeydown: 'onKeyDown',
  onkeyup: 'onKeyUp', onscroll: 'onScroll', onpointerdown: 'onPointerDown',
  onpointermove: 'onPointerMove', onpointerup: 'onPointerUp', onpointercancel: 'onPointerCancel',
  onmousedown: 'onMouseDown', onmouseup: 'onMouseUp', onfocus: 'onFocus', onblur: 'onBlur',
};
const RENAMED = {
  class: 'className', for: 'htmlFor', tabindex: 'tabIndex', readonly: 'readOnly',
  maxlength: 'maxLength', autocomplete: 'autoComplete', autofocus: 'autoFocus',
  spellcheck: 'spellCheck', inputmode: 'inputMode', enterkeyhint: 'enterKeyHint',
  'xlink:href': 'xlinkHref', 'xml:space': 'xmlSpace', srcset: 'srcSet', crossorigin: 'crossOrigin',
};
const camel = s => s.replace(/[-:]([a-z])/g, (_, c) => c.toUpperCase());

function cssToObj(css) {
  const o = {};
  for (const decl of css.split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    o[prop.startsWith('--') ? prop : camel(prop)] = decl.slice(i + 1).trim();
  }
  return o;
}

// `r.open` -> `v.r?.open`, `!x` -> `!v.x`
function expr(src) {
  let e = src.trim();
  let neg = '';
  while (e.startsWith('!')) { neg += '!'; e = e.slice(1).trim(); }
  if (!/^[A-Za-z_$][\w$]*(\.[\w$]+)*$/.test(e)) throw new Error('Unsupported binding: ' + src);
  if (e === 'true' || e === 'false' || e === 'null') return neg + e;
  const [head, ...rest] = e.split('.');
  return neg + 'v.' + head + rest.map(p => '?.' + p).join('');
}

const BINDING = /\{\{([\s\S]+?)\}\}/g;
const WHOLE = /^\s*\{\{([\s\S]+?)\}\}\s*$/;

// Attribute value -> JSX expression source.
function attrValue(raw) {
  const whole = raw.match(WHOLE);
  if (whole) return expr(whole[1]);
  if (raw.includes('{{')) {
    const parts = raw.split(BINDING);
    return '`' + parts.map((p, i) => (i & 1 ? '${' + expr(p) + ' ?? ""}' : p.replace(/[`\\$]/g, '\\$&'))).join('') + '`';
  }
  return null;
}

class Emitter {
  constructor() { this.hover = new Map(); }

  hoverClass(css) {
    if (!this.hover.has(css)) this.hover.set(css, 'dc-hover-' + this.hover.size);
    return this.hover.get(css);
  }

  attrs(node, svg) {
    const out = [];
    const classes = [];
    for (const { name, value, prefix } of node.attrs) {
      const full = prefix ? prefix + ':' + name : name;
      if (full === 'data-dc-tpl' || full === 'sc-name') continue;
      if (full.startsWith('style-')) { classes.push(this.hoverClass(value)); continue; }
      let key = full;
      if (EVENTS[key.toLowerCase()]) key = EVENTS[key.toLowerCase()];
      else if (RENAMED[key]) key = RENAMED[key];
      else if (!key.startsWith('data-') && !key.startsWith('aria-') && /[-:]/.test(key)) key = camel(key);

      if (key === 'href' && LINKS[value]) { out.push(`href=${JSON.stringify(LINKS[value])}`); continue; }
      if (key === 'className') { classes.unshift(value); continue; }
      const bound = attrValue(value);
      if (key === 'style') {
        out.push(bound ? `style={css(${bound})}` : `style={${JSON.stringify(cssToObj(value))}}`);
      } else if (bound) {
        out.push(`${key}={${key === 'value' ? `${bound} ?? ""` : bound}}`);
      } else {
        out.push(`${key}=${JSON.stringify(value)}`);
      }
    }
    if (classes.length) out.push(`className=${JSON.stringify(classes.join(' '))}`);
    return out.length ? ' ' + out.join(' ') : '';
  }

  text(node, svg) {
    const t = node.value;
    if (!t.includes('{{')) {
      // The design runtime drops whitespace-only text that has no spaces in it.
      if (!t.trim() && !t.includes(' ')) return '';
      return `{${JSON.stringify(t)}}`;
    }
    return t.split(BINDING).map((p, i) => {
      if (!(i & 1)) return p ? `{${JSON.stringify(p)}}` : '';
      // Interpolations render inside a <span>, as in the design runtime (SVG text gets the bare value).
      return svg ? `{txt(${expr(p)})}` : `<span>{txt(${expr(p)})}</span>`;
    }).join('');
  }

  children(node, svg) {
    return (node.childNodes || []).map(c => this.node(c, svg)).join('');
  }

  node(node, svg) {
    if (node.nodeName === '#text') return this.text(node, svg);
    if (node.nodeName === '#comment' || !node.tagName) return '';
    const tag = node.tagName;
    const get = n => (node.attrs.find(a => a.name === n) || {}).value;
    if (tag === 'helmet' || tag === 'script' || tag === 'style' || tag === 'link') return '';
    if (tag === 'sc-if') {
      const cond = expr(get('value').match(WHOLE)[1]);
      return `{${cond} ? <>${this.children(node, svg)}</> : null}`;
    }
    if (tag === 'sc-for') {
      const list = expr(get('list').match(WHOLE)[1]);
      const as = get('as') || 'item';
      return `{(${list} || []).map((item, i) => (v => <Fragment key={i}>${this.children(node, svg)}</Fragment>)({ ...v, ${as}: item, $index: i }))}`;
    }
    const inSvg = svg || tag === 'svg';
    const inner = tag === 'template' ? this.children(node.content, inSvg) : this.children(node, inSvg);
    const VOID = /^(area|base|br|col|embed|hr|img|input|meta|source|track|wbr)$/;
    if (VOID.test(tag) || (!inner && inSvg)) return `<${tag}${this.attrs(node, inSvg)} />`;
    return `<${tag}${this.attrs(node, inSvg)}>${inner}</${tag}>`;
  }
}

function extractTemplate(src) {
  const open = /<x-dc(?:\s[^>]*)?>/.exec(src);
  const close = src.lastIndexOf('</x-dc>');
  return src.slice(open.index + open[0].length, close);
}

mkdirSync(resolve(root, 'src/prototypes'), { recursive: true });
for (const p of PROTOTYPES) {
  const src = readFileSync(resolve(designDir, p.file), 'utf8');
  const frag = parseFragment(extractTemplate(src));
  const em = new Emitter();
  const body = em.children(frag, false);
  const hoverCss = [...em.hover].map(([css, cls]) =>
    `.${cls}:hover{${css.split(';').filter(d => d.trim()).map(d => d.trim() + ' !important').join(';')}}`).join('\n');
  const file = `// GENERATED by scripts/convert-dc.mjs from "project/${p.file}". Do not edit by hand.
/* eslint-disable */
import { Fragment } from 'react';
import { css, txt } from '../runtime.js';

export const hoverStyles = ${JSON.stringify(hoverCss)};

export default function template(v) {
  return (<>${body}</>);
}
`;
  const outPath = resolve(root, 'src/prototypes', p.out, 'template.jsx');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, file);
  console.log('wrote', outPath, (file.length / 1024).toFixed(1) + 'kB');
}
