import * as React from "react"
import { useState, useEffect } from "react"

interface Repo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  language: string
  topics: string[]
}

const GithubProjects = ({ username }: { username: string }) => {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vi hämtar publika repon sorterade efter stjärnmarkeing
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error("Kunde inte hämta GitHub-data:", err)
        setLoading(false)
      })
  }, [username])

  if (loading) return <p>Hämtar data från systemet...</p>

  return (
    <div className="grid">
      {repos.map(repo => (
        <div key={repo.id} className="card">
          <h3>
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name.toUpperCase()}
            </a>
          </h3>
          <p>{repo.description || "Ingen beskrivning tillgänglig."}</p>
          <div style={{ marginTop: "10px" }}>
            {repo.language && <span className="tag">{repo.language}</span>}
            <span className="tag">⭐ {repo.stargazers_count}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GithubProjects
