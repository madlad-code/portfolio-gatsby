// Edit these to tune the portfolio.
export const GITHUB_USERNAME = "madlad-code";

// Optional: set your Medium username (without @) to wire up the writing feed.
// Leave empty to hide the section gracefully.
export const MEDIUM_USERNAME = "";

// Featured / curated projects. Keys are GitHub repo names (case-insensitive).
// `title` overrides the repo name. `status` overrides the auto-derived status.
// `stack` overrides the stack chips. `hidden: true` excludes a repo.
// Repos NOT listed here still appear under "Other repos" but hidden ones never show.
export type ProjectStatus =
  | "building"
  | "active"
  | "coursework"
  | "concept"
  | "finished"
  | "archived";

export interface ProjectOverride {
  title?: string;
  status?: ProjectStatus;
  stack?: string[];
  blurb?: string;
  featured?: boolean;
  hidden?: boolean;
}

export const PROJECT_OVERRIDES: Record<string, ProjectOverride> = {
  "formula_student_simulation": {
    status: "building",
    featured: true,
  },
  "option_pricing": {
    status: "building",
    featured: true,
  },
  "trailing_stop_loss": {
    status: "active",
    featured: false,
  },
  "Worker-Simulation": {
    status: "coursework",
  },
  "risc-v-pipeline": {
    status: "coursework",
    featured: true,
  },
  "portfolio-gatsby": { hidden: true },
  "portfolio-vite": { hidden: true },
  "madlad-code": { hidden: true },
};

// Manually authored projects that aren't (yet) on GitHub.
export const MANUAL_PROJECTS: Array<{
  title: string;
  stack: string[];
  status: ProjectStatus;
  url?: string;
  blurb?: string;
  featured?: boolean;
}> = [];
