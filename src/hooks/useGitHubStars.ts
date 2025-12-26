import { useState, useEffect } from 'react';

interface RepoStats {
  stars: number | null;
  downloads: number | null;
  version: string | null;
  forks: number | null;
  loading: boolean;
  formattedStars: string;
  formattedDownloads: string;
}

export function useGitHubStats(repo: string = 'farion1231/cc-switch'): RepoStats {
  const [stars, setStars] = useState<number | null>(null);
  const [downloads, setDownloads] = useState<number | null>(null);
  const [version, setVersion] = useState<string | null>(null);
  const [forks, setForks] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch repo info (stars, forks) from GitHub API
        const repoResponse = await fetch(`https://api.github.com/repos/${repo}`);
        if (repoResponse.ok) {
          const data = await repoResponse.json();
          setStars(data.stargazers_count);
          setForks(data.forks_count);
        }

        // Fetch releases for version and downloads
        const releasesResponse = await fetch(`https://api.github.com/repos/${repo}/releases`);
        if (releasesResponse.ok) {
          const releases = await releasesResponse.json();
          
          // Get latest version
          if (releases.length > 0) {
            const latestVersion = releases[0].tag_name?.replace(/^v/, '') || null;
            setVersion(latestVersion);
          }
          
          // Calculate total downloads across all releases
          let totalDownloads = 0;
          for (const release of releases) {
            for (const asset of release.assets || []) {
              totalDownloads += asset.download_count || 0;
            }
          }
          setDownloads(totalDownloads);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [repo]);

  const formatNumber = (count: number | null): string => {
    if (count === null) return '...';
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return { 
    stars, 
    downloads,
    version,
    forks,
    loading, 
    formattedStars: formatNumber(stars),
    formattedDownloads: formatNumber(downloads)
  };
}

// Keep backward compatibility
export function useGitHubStars(repo: string = 'farion1231/cc-switch') {
  const stats = useGitHubStats(repo);
  return { 
    stars: stats.stars, 
    loading: stats.loading, 
    formattedStars: stats.formattedStars 
  };
}
