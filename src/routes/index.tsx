import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects, fetchContributions, type Project } from "@/lib/github";
import { GITHUB_USERNAME } from "@/lib/portfolio-config";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Oscar Enghag — Civ.ing. Datateknik" },
      {
        name: "description",
        content:
          "Oscar Enghag — Civ.ing. Datateknik LTH. FPGA, RISC-V, formula student simulation.",
      },
    ],
  }),
});

const STATUS_ORDER: Record<string, number> = {
  building: 0, active: 1, coursework: 2, concept: 3, finished: 4, archived: 5,
};

const LINKS = [
  { label: "GitHub", href: `https://github.com/${GITHUB_USERNAME}` },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/oscar-enghag-2b4902238/" },
];

function SectionHeader({ n, title }: { n: string; title: string }) {
  return (
    <div className="mt-14">
      <h2 className="text-base font-bold tracking-wider text-ink">
        [{n}] {title}
      </h2>
      <hr className="mt-3 border-rule" />
    </div>
  );
}

function ContribGraph() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["contrib"],
    queryFn: fetchContributions,
    staleTime: 30 * 60 * 1000,
  });

  if (isLoading) return <div className="text-xs text-ink-faint">$ hämtar aktivitet…</div>;
  if (isError || !data) return <div className="text-xs text-accent-ink">! kunde inte hämta GitHub-aktivitet</div>;

  // group days into weeks (7 rows × N cols)
  const weeks: { date: string; level: number }[][] = [];
  let cur: { date: string; level: number }[] = [];
  for (const d of data.days) {
    const dow = new Date(d.date).getUTCDay();
    if (dow === 0 && cur.length) { weeks.push(cur); cur = []; }
    cur.push(d);
  }
  if (cur.length) weeks.push(cur);

  // GitHub-style green levels
  const levelBg = [
    "bg-rule/40",
    "bg-[#0e4429]",
    "bg-[#006d32]",
    "bg-[#26a641]",
    "bg-[#39d353]",
  ];

  // month labels
  const monthLabels: { col: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((w, i) => {
    const m = new Date(w[0].date).getUTCMonth();
    if (m !== lastMonth) {
      monthLabels.push({ col: i, label: new Date(w[0].date).toLocaleString("sv", { month: "short" }) });
      lastMonth = m;
    }
  });

  return (
    <div className="rounded border border-rule p-4">
      <div className="overflow-x-auto">
        <div className="inline-block">
          <div className="relative ml-0 h-4 text-[10px] text-ink-faint">
            {monthLabels.map((m) => (
              <span key={m.col} className="absolute" style={{ left: `${m.col * 14}px` }}>{m.label}</span>
            ))}
          </div>
          <div className="flex gap-[2px]">
            {weeks.map((w, i) => (
              <div key={i} className="flex flex-col gap-[2px]">
                {Array.from({ length: 7 }).map((_, dow) => {
                  const day = w.find((d) => new Date(d.date).getUTCDay() === dow);
                  return (
                    <div
                      key={dow}
                      title={day ? `${day.date}: ${day.level}` : ""}
                      className={`h-3 w-3 rounded-[2px] ${day ? levelBg[day.level] : "bg-transparent"}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-ink-faint">
        <span>{data.total} bidrag senaste året</span>
        <span className="flex items-center gap-1">
          Mindre
          {levelBg.map((c, i) => <span key={i} className={`h-3 w-3 rounded-[2px] ${c}`} />)}
          Mer
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const inner = (
    <div className="h-full rounded border border-rule p-4 transition-colors hover:border-accent-ink/60">
      <div className="text-sm font-bold uppercase tracking-wider text-accent-ink">
        {p.title}
      </div>
      {p.blurb && <p className="mt-3 text-[13px] leading-relaxed text-ink-muted">{p.blurb}</p>}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px]">
        {p.stack.map((s) => (
          <span key={s} className="rounded bg-rule/40 px-2 py-0.5 text-ink-muted">{s}</span>
        ))}
        <span className="ml-auto text-ink-faint">{`\`${p.status}\``}</span>
      </div>
    </div>
  );
  return p.url ? <a href={p.url} target="_blank" rel="noreferrer" className="block">{inner}</a> : inner;
}

function CardGrid({ items }: { items: Project[] }) {
  if (!items.length) return <p className="text-xs text-ink-faint">— inga projekt —</p>;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {items.map((p) => <ProjectCard key={p.id} p={p} />)}
    </div>
  );
}

function Index() {
  const projectsQ = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 5 * 60 * 1000,
  });

  const all = projectsQ.data ?? [];
  const sorted = [...all].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    const s = (STATUS_ORDER[a.status] ?? 9) - (STATUS_ORDER[b.status] ?? 9);
    if (s !== 0) return s;
    return (b.pushedAt ?? "").localeCompare(a.pushedAt ?? "");
  });
  const active = sorted.filter((p) => p.featured || p.status === "building");
  const others = sorted.filter((p) => !active.includes(p));

  return (
    <main className="mx-auto min-h-screen max-w-[100%] px-10 py-12 text-[14px] leading-relaxed">
      <header>
        <h1 className="text-2xl font-bold tracking-wider text-accent-ink">OSCAR ENGHAG</h1>
        <p className="mt-3 text-ink-muted">
          Civ.ing. Datateknik · LTH <span className="text-ink-faint">|</span>{" "}
          Lågnivå & Högprecisionsteknik <span className="text-ink-faint">|</span>{" "}
          Quant & Systems Engineering <span className="text-ink-faint">|</span>{" "}
          Lund, SE
        </p>
        <p className="mt-4 max-w-2xl text-[13px] text-ink-muted">
          Jag studerar datateknik vid LTH och drivs av en kombination av hög arbetsmoral och en genuin nyfikenhet för teknik. Mitt fokus ligger på SystemVerilog och kvantitativ finans, med en särskild fascination för fordon och storskaliga komplexa system. Jag trivs bäst i team där jag får bidra till gemensamma mål och ständigt utveckla min kompetens inom avancerad teknik.
        </p>
        <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-accent-ink items-center">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="hover:underline">
              {l.label}
            </a>
          ))}
          <span className="text-ink-faint">|</span>
          <span className="text-ink-muted">oscarenghag@gmail.com</span>
        </nav>
      </header>

      <SectionHeader n="01" title="SYSTEMAKTIVITET" />
      <div className="mt-4"><ContribGraph /></div>

      <SectionHeader n="02" title="AKTIVA PROJEKT" />
      <p className="mt-3 text-[13px] text-ink-muted">Här poängteras hur mina pågående projekt bygger djup expertis inom kritiska områden.</p>
      <div className="mt-4">
        {projectsQ.isLoading && <div className="text-xs text-ink-faint">$ hämtar projekt…</div>}
        {projectsQ.isError && (
          <div className="text-xs text-accent-ink">
            ! kunde inte hämta GitHub: {(projectsQ.error as Error).message}
          </div>
        )}
        {!projectsQ.isLoading && <CardGrid items={active} />}
      </div>

      <SectionHeader n="03" title="ÖVRIGA REPOS" />
      <p className="mt-3 text-[13px] text-ink-muted">Live från <code>github.com/{GITHUB_USERNAME}</code> — sorterat efter senaste aktivitet.</p>
      <div className="mt-4"><CardGrid items={others} /></div>

      <SectionHeader n="04" title="STACK" />
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {[
          { k: "Hårdvara", v: "SystemVerilog · FPGA (Cyclone V) · RISC-V RV32I · Quartus" },
          { k: "Quant", v: "Python · NumPy · SciPy · options pricing · backtesting · Monte Carlo" },
          { k: "Web", v: "TypeScript · React · Gatsby · Netlify" },
        ].map((s) => (
          <div key={s.k} className="rounded border border-rule p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-accent-ink">{s.k}</div>
            <div className="mt-2 text-[13px] text-ink-muted">{s.v}</div>
          </div>
        ))}
      </div>

      <SectionHeader n="05" title="BAKGRUND" />
      <pre className="mt-4 whitespace-pre-wrap text-[13px] text-ink-muted">
{`2025–       Civ.ing. Datateknik · LTH
            algoritmer, systemarkitektur, hårdvara
            Elektricitetsmekaniker · Försvarsmakten · Livgardet
            B2B-försäljning mot Saab, Ericsson, Försvarsmakten
            Internship · Noda Intelligent Systems`}
      </pre>

      <footer className="mt-16 border-t border-rule pt-6 text-xs text-ink-faint">
        <div>$ skapad med tanstack · live från github api · uppdaterad precis nu</div>
      </footer>
    </main>
  );
}
