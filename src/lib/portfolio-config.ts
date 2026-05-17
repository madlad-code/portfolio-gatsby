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
  "fs-lap-sim": {
    title: "FS Lap Sim",
    status: "building",
    stack: ["Python", "NumPy", "Pacejka"],
    featured: true,
    blurb: "Vehicle dynamics-simulator för Formula Student. Genom att implementera Pacejkas däckmodell bygger projektet djup expertis inom tillämpad matematik och fordonsdynamik.",
  },
  "option_pricing": {
    title: "Quant Portfolio Engine",
    status: "building",
    stack: ["Python", "Black-Scholes", "Monte Carlo"],
    featured: true,
    blurb: "Motor för portföljanalys och prissättning. Utvecklingen av Black-Scholes och Monte Carlo-simuleringar stärker min förståelse för kvantitativ finans och statistisk modellering.",
  },
  "trailing_stop_loss": {
    title: "Trailing Stop-Loss ML",
    status: "active",
    stack: ["Python", "ML", "Indicators"],
    featured: false,
  },
  "Worker-Simulation": {
    title: "Worker Simulation",
    status: "coursework",
    stack: ["Python", "Concurrency", "GUI"],
  },
  "risc-v-pipeline": {
    title: "RISC-V Pipeline",
    status: "coursework",
    stack: ["SystemVerilog", "FPGA", "Quartus"],
    featured: true,
    blurb: "5-stegs RV32I-pipeline på Cyclone V. Projektet fördjupar min expertis inom datorarkitektur och digital hårdvarukonstruktion med fokus på timing och resurseffektivitet.",
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
}> = [];
