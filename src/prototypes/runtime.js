// Helpers shared by the generated prototype templates.

const cache = new Map();

// Inline CSS string -> React style object (memoised; templates rebuild these every render).
export function css(str) {
  let o = cache.get(str);
  if (o) return o;
  o = {};
  for (const decl of str.split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    o[prop.startsWith('--') ? prop : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = decl.slice(i + 1).trim();
  }
  if (cache.size > 2000) cache.clear();
  cache.set(str, o);
  return o;
}

// Text interpolation: null, undefined and booleans render nothing.
export function txt(v) {
  return v == null || typeof v === 'boolean' ? null : String(v);
}
