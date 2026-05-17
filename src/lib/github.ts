import {
  GITHUB_USERNAME,
  PROJECT_OVERRIDES,
  MANUAL_PROJECTS,
  type ProjectStatus,
} from "./portfolio-config";

export interface Project {
  id: string;
  title: string;
  url?: string;
  stack: string[];
  status: ProjectStatus;
  blurb?: string;
  stars?: number;
  pushedAt?: string;
  featured: boolean;
  source: "github" | "manual";
}

interface GhRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}

// Härled projektstatus (building, active, etc.) baserat på GitHub-metadata eller senaste push
function deriveStatus(repo: GhRepo): ProjectStatus {
  const topic = repo.topics?.find((t) => t.startsWith("status-"));
  if (topic) {
    const s = topic.replace("status-", "") as ProjectStatus;
    if (["building", "active", "coursework", "concept", "finished", "archived"].includes(s)) return s;
  }
  if (repo.archived) return "archived";
  
  // Om ingen explicit status finns, använd tid sedan senaste push för att gissa status
  const days = (Date.now() - new Date(repo.pushed_at).getTime()) / (1000 * 60 * 60 * 24);
  if (days < 30) return "building"; // Aktiv utveckling senast 30 dagarna
  if (days < 180) return "active";  // Underhållet men inte nyligen uppdaterat
  return "finished";
}

export async function fetchProjects(): Promise<Project[]> {
  // Hämta alla publika repositories för användaren
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    { headers: { Accept: "application/vnd.github+json" } },
  );
  if (!res.ok) throw new Error(`GitHub ${res.status}`);
  const repos: GhRepo[] = await res.json();

  const ghProjects: Project[] = [];
  for (const r of repos) {
    if (r.fork) continue; // Hoppa över forkade repon
    const ov = PROJECT_OVERRIDES[r.name] ?? {};
    if (ov.hidden) continue;
    
    // Kombinera språk och topics för att skapa en "tech stack"-lista
    const stack =
      ov.stack ??
      ([r.language, ...(r.topics ?? []).filter((t) => !t.startsWith("status-"))]
        .filter(Boolean)
        .slice(0, 4) as string[]);
    
    ghProjects.push({
      id: `gh-${r.id}`,
      title: ov.title ?? r.name,
      url: r.html_url,
      stack: stack.length ? stack : ["—"],
      status: ov.status ?? deriveStatus(r),
      blurb: ov.blurb ?? r.description ?? undefined,
      stars: r.stargazers_count,
      pushedAt: r.pushed_at,
      featured: ov.featured ?? false,
      source: "github",
    });
  }

  const manual: Project[] = MANUAL_PROJECTS.map((m, i) => ({
    id: `manual-${i}`,
    title: m.title,
    url: m.url,
    stack: m.stack,
    status: m.status,
    blurb: m.blurb,
    featured: m.featured ?? false,
    source: "manual" as const,
  }));

  return [...manual, ...ghProjects];
}

// --- Contribution graph (via jogruber proxy) ---
export interface ContribDay { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }
export interface ContribData { total: number; days: ContribDay[] }

export async function fetchContributions(): Promise<ContribData> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
  );
  if (!res.ok) throw new Error(`Contrib ${res.status}`);
  const json = await res.json();
  return { total: json.total?.lastYear ?? 0, days: json.contributions ?? [] };
}
