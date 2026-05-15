/**
 * Huvudsidan för portfolion. 
 * I Gatsby fungerar filer i src/pages/ som automatiska rutter (URL:er).
 * index.tsx motsvarar alltså din startsida (/).
 */
import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GitHubCalendar } from "react-github-calendar"
import GithubProjects from "../components/GithubProjects"
import "@fontsource/fira-code" // Importerar Monospace-typsnittet globalt
import "../style.css" // Huvudstilen för hela sajten

const IndexPage = () => {
  // Ditt GitHub-användarnamn. Centraliserat här för att enkelt kunna ändras.
  const username = "madlad-code"

  return (
    // Layout-komponenten fungerar som en ram (header/footer) runt allt innehåll.
    <Layout>
      <div className="container">
        {/* HERO-sektion: Första intrycket. Fokus på titel och sociala länkar. */}
        <header className="hero">
          <h1>OSCAR ENGHAG</h1>
          <p>Systemarkitekt | Infrastrukturingenjör | Nischade Högprecisionssystem</p>
          <div className="social-links">
            {/* Vi använder template literals (`...`) för att dynamiskt bygga länkar med variabeln username */}
            <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/oscarenghag" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://medium.com/@oscarenghag" target="_blank" rel="noreferrer">Medium</a>
            <a href="https://developers.google.com/profile/u/oscarenghag" target="_blank" rel="noreferrer">Google Dev</a>
          </div>
        </header>

        {/* SEKTION 01: GitHub Aktivitet. Visar "commit-grafen" live. */}
        <section className="section">
          <h2>[01] SYSTEMAKTIVITET</h2>
          <div className="github-activity">
            <GitHubCalendar 
              username={username} 
              colorScheme="dark" // Matchar sajtens mörka tema
              fontSize={12}
              blockSize={12}
              blockMargin={4}
              labels={{
                totalCount: "{{count}} bidrag under senaste året",
              }}
            />
          </div>
        </section>

        {/* SEKTION 02: Dynamisk data. Hämtar stjärnmärkta repon via GitHub API. */}
        <section className="section">
          <h2>[02] UTVALDA PROJEKT (GITHUB STARRED)</h2>
          <p>Högprecisionsprojekt handplockade via stjärnmärkning på GitHub.</p>
          <GithubProjects username={username} />
        </section>

        {/* SEKTION 03: Statiska projekt - Infrastruktur. */}
        <section className="section">
          <h2>[03] SKALBAR INFRASTRUKTUR</h2>
          <p>Arkitektur designad för monetärisering och massiv skala.</p>
          <div className="grid">
            <div className="card">
              <h3>Distributed Ledger API</h3>
              <p>Settlement-motor med låg latens för högfrekvent trading-infrastruktur.</p>
              <div>
                <span className="tag">Go</span>
                <span className="tag">Kubernetes</span>
                <span className="tag">gRPC</span>
              </div>
            </div>
            <div className="card">
              <h3>Cloud Resource Optimizer</h3>
              <p>Automatiserad kostnadsreducerings-agent baserad på prediktiv belastningsanalys.</p>
              <div>
                <span className="tag">Python</span>
                <span className="tag">AWS</span>
                <span className="tag">Terraform</span>
              </div>
            </div>
          </div>
        </section>

        {/* SEKTION 04: Statiska projekt - R&D/Nördig kunskap. */}
        <section className="section">
          <h2>[04] HÖGPRECISION R&D</h2>
          <p>Nischade forskningsprojekt med fokus på teoretiska begränsningar och maximal effektivitet.</p>
          <div className="grid">
            <div className="card">
              <h3>Bare-metal Memory Manager</h3>
              <p>Anpassad allokerare för realtidssystem med noll "garbage collection"-overhead.</p>
              <div>
                <span className="tag">Rust</span>
                <span className="tag">C</span>
                <span className="tag">x86_64</span>
              </div>
            </div>
            <div className="card">
              <h3>Matrix Factorization Engine</h3>
              <p>Hyper-optimerat linjärt algebra-bibliotek för specifika geometriska kärnor.</p>
              <div>
                <span className="tag">C++</span>
                <span className="tag">AVX-512</span>
                <span className="tag">CUDA</span>
              </div>
            </div>
          </div>
        </section>

        {/* Enkel footer med dynamiskt årtal */}
        <footer style={{ marginTop: '100px', fontSize: '0.8rem', color: '#30363d' }}>
          <p>© {new Date().getFullYear()} Oscar Enghag. Byggd för hög signalskärpa.</p>
        </footer>
      </div>
    </Layout>
  )
}

export default IndexPage

/**
 * Head-funktionen används av Gatsby för att sätta metadata i <head>-taggen.
 * Här sätter vi titeln som syns i webbläsarfliken.
 */
export const Head = () => <Seo title="Systemarkitekt" />
