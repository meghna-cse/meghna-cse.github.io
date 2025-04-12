import React, { useEffect, useState } from "react";

type Repo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
};

interface GitHubProjectsWidgetProps {
  username: string;
}

const GitHubProjectsWidget: React.FC<GitHubProjectsWidgetProps> = ({ username }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch public repositories for the given GitHub username
    fetch(`https://api.github.com/users/${username}/repos?sort=latest`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        return response.json();
      })
      .then((data) => {
        // Limit to the five most recently updated repositories
        setRepos(data.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [username]);

  return (
    <div>
      {loading && <p>Loading projects...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {repos.map((repo) => (
            <li key={repo.id} style={{ marginBottom: "1rem" }}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "1.1rem", color: "#0366d6", textDecoration: "none" }}>
                {repo.name}
              </a>
              <p style={{ margin: "0.25rem 0", color: "#586069" }}>{repo.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GitHubProjectsWidget;
