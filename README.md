# Wanderwise case study

The Wanderwise case study page, with the three live prototypes it embeds.

```
npm install
npm run dev       # local dev server
npm run build     # static site in dist/
```

- `index.html` + `src/case-study/`: the case study page (content in `data.js`, styles in `case-study.css`).
- `prototypes/*.html` + `src/prototypes/`: Day in progress, Place details and Trip end.
  Each prototype's interaction logic lives in its component file; its markup in `template.jsx`
  is generated from the Claude Design files in `../project` with `npm run convert`.
