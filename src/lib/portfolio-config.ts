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
  "option_pricing": {
    title: "Quant Portfolio Engine",
    status: "building",
    stack: ["Python", "Black-Scholes", "Monte Carlo"],
    featured: true,
  },
  "trailing_stop_loss": {
    title: "Trailing Stop-Loss ML",
    status: "active",
    stack: ["Python", "ML", "Indicators"],
    featured: true,
  },
  "Worker-Simulation": {
    title: "Worker Simulation",
    status: "coursework",
    stack: ["Python", "Concurrency", "GUI"],
    featured: true,
  },
  "equally_weighted_index": {
    title: "Equally Weighted Index",
    status: "active",
    stack: ["Python", "NumPy"],
  },
  "gmailsummarize": {
    title: "Gmail Summarize",
    status: "active",
    stack: ["Python", "LLM"],
  },
  "noda_local": {
    title: "Noda Local",
    status: "active",
    stack: ["TypeScript"],
  },
  "portfolio-gatsby": { hidden: true },
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
}> = [
  {
    title: "FS Lap Sim",
    stack: ["Python", "NumPy", "Pacejka"],
    status: "building",
    featured: true,
    blurb: "Vehicle dynamics lap-time simulator för Formula Student.",
  },
  {
    title: "RISC-V Pipeline",
    stack: ["SystemVerilog", "FPGA", "Quartus"],
    status: "coursework",
    featured: true,
    blurb: "5-stage RV32I pipeline på Cyclone V.",
  },
  {
    title: "Digital Provenance Platform",
    stack: ["TypeScript", "B2B"],
    status: "concept",
    blurb: "Spårbarhet för fysisk-digitala assets.",
  },
];
