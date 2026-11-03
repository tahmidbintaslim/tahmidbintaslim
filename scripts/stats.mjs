// Builds the profile stats cards (assets/stats-*.svg, assets/languages-*.svg)
// from the GitHub REST API. No dependencies: Node 20+ fetch only.
// Run in CI with GITHUB_TOKEN set; the public github-readme-stats service is
// rate-limited and often returns 503, so the cards are generated and committed here.
import { mkdir, writeFile } from "node:fs/promises";

const USER = process.env.STATS_USER ?? "tahmidbintaslim";
const TOKEN = process.env.GITHUB_TOKEN;
const API = "https://api.github.com";
// Languages that describe tooling or notebooks rather than code written by hand.
const IGNORED_LANGUAGES = new Set(["HTML", "CSS", "SCSS", "Jupyter Notebook", "Dockerfile", "Makefile", "Procfile", "Shell", "Batchfile"]);
const LANGUAGE_COLORS = {
  TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5", Dart: "#00B4AB", PHP: "#4F5D95",
  Vue: "#41b883", Liquid: "#67b8de", Solidity: "#AA6746", Nix: "#7e7eff", Astro: "#ff5a03", Go: "#00ADD8",
};

async function gh(path) {
  const res = await fetch(`${API}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`GET ${path} -> ${res.status} ${await res.text()}`);
  return res.json();
}

async function collect() {
  const user = await gh(`/users/${USER}`);
  // Owned, public, not forks, not archived: the repos that represent current work.
  const repos = (await gh(`/users/${USER}/repos?type=owner&per_page=100`)).filter(
    (r) => !r.fork && !r.archived && !r.private,
  );
  const languageBytes = {};
  for (const repo of repos) {
    const langs = await gh(`/repos/${USER}/${repo.name}/languages`);
    for (const [name, bytes] of Object.entries(langs)) {
      if (IGNORED_LANGUAGES.has(name)) continue;
      languageBytes[name] = (languageBytes[name] ?? 0) + bytes;
    }
  }
  const since = new Date(Date.now() - 365 * 864e5).toISOString().slice(0, 10);
  const prs = await gh(`/search/issues?q=${encodeURIComponent(`author:${USER} type:pr`)}&per_page=1`);
  const commits = await gh(`/search/commits?q=${encodeURIComponent(`author:${USER} committer-date:>=${since}`)}&per_page=1`);
  return {
    repos: repos.length,
    stars: repos.reduce((n, r) => n + r.stargazers_count, 0),
    followers: user.followers,
    prs: prs.total_count,
    commits: commits.total_count,
    languageBytes,
  };
}

const THEMES = {
  light: { bg: "#ffffff", border: "#d0d7de", title: "#1f2328", text: "#1f2328", muted: "#59636e", track: "#eaeef2" },
  dark: { bg: "#0d1117", border: "#30363d", title: "#f0f6fc", text: "#f0f6fc", muted: "#9198a1", track: "#21262d" },
};
const FONT = "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const fmt = (n) => new Intl.NumberFormat("en-US").format(n);

function statsCard(s, t) {
  const rows = [
    ["Public repositories", s.repos],
    ["Stars earned", s.stars],
    ["Commits, last 12 months", s.commits],
    ["Pull requests opened", s.prs],
    ["Followers", s.followers],
  ];
  const body = rows
    .map(([label, value], i) => {
      const y = 62 + i * 26;
      return `<text x="24" y="${y}" fill="${t.muted}" style="${FONT};font-size:14px">${esc(label)}</text>` +
        `<text x="376" y="${y}" text-anchor="end" fill="${t.text}" style="${FONT};font-size:14px;font-weight:600">${fmt(value)}</text>`;
    })
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200" role="img" aria-label="GitHub stats for ${USER}">` +
    `<rect x="0.5" y="0.5" width="399" height="199" rx="8" fill="${t.bg}" stroke="${t.border}"/>` +
    `<text x="24" y="32" fill="${t.title}" style="${FONT};font-size:16px;font-weight:600">GitHub activity</text>${body}</svg>`;
}

function languagesCard(s, t) {
  const total = Object.values(s.languageBytes).reduce((a, b) => a + b, 0) || 1;
  const top = Object.entries(s.languageBytes).sort((a, b) => b[1] - a[1]).slice(0, 6);
  let x = 24;
  const bar = top
    .map(([name, bytes]) => {
      const w = Math.max(2, (bytes / total) * 352);
      const seg = `<rect x="${x.toFixed(1)}" y="48" width="${w.toFixed(1)}" height="10" fill="${LANGUAGE_COLORS[name] ?? "#8b949e"}"/>`;
      x += w;
      return seg;
    })
    .join("");
  const legend = top
    .map(([name, bytes], i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const lx = 24 + col * 180, ly = 90 + row * 28;
      return `<circle cx="${lx + 5}" cy="${ly - 4}" r="5" fill="${LANGUAGE_COLORS[name] ?? "#8b949e"}"/>` +
        `<text x="${lx + 16}" y="${ly}" fill="${t.text}" style="${FONT};font-size:13px">${esc(name)}` +
        `<tspan fill="${t.muted}"> ${((bytes / total) * 100).toFixed(1)}%</tspan></text>`;
    })
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200" role="img" aria-label="Most used languages">` +
    `<rect x="0.5" y="0.5" width="399" height="199" rx="8" fill="${t.bg}" stroke="${t.border}"/>` +
    `<text x="24" y="32" fill="${t.title}" style="${FONT};font-size:16px;font-weight:600">Most used languages</text>` +
    `<clipPath id="r"><rect x="24" y="48" width="352" height="10" rx="5"/></clipPath>` +
    `<rect x="24" y="48" width="352" height="10" rx="5" fill="${t.track}"/><g clip-path="url(#r)">${bar}</g>${legend}` +
    `<text x="24" y="186" fill="${t.muted}" style="${FONT};font-size:11px">Public, non-fork, non-archived repos. Markup and notebooks excluded.</text></svg>`;
}

const stats = await collect();
await mkdir("assets", { recursive: true });
for (const [name, theme] of Object.entries(THEMES)) {
  await writeFile(`assets/stats-${name}.svg`, statsCard(stats, theme) + "\n");
  await writeFile(`assets/languages-${name}.svg`, languagesCard(stats, theme) + "\n");
}
console.log(JSON.stringify({ ...stats, languageBytes: undefined, languages: Object.keys(stats.languageBytes).length }));
