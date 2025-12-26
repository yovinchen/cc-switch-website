import { useState, useEffect } from 'react';

interface RepoStats {
  stars: number | null;
  downloads: number | null;
  loading: boolean;
  formattedStars: string;
  formattedDownloads: string;
}

export function useGitHubStats(repo: string = 'farion1231/cc-switch'): RepoStats {
  const [stars, setStars] = useState<number | null>(null);
  const [downloads, setDownloads] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch stars from GitHub API
        const starsResponse = await fetch(`https://api.github.com/repos/${repo}`);
        if (starsResponse.ok) {
          const data = await starsResponse.json();
          setStars(data.stargazers_count);
        }

        // Fetch downloads from badge API
        try {
          const downloadsResponse = await fetch(`https://api.pinstudios.net/api/badges/downloads/${repo}/total`);
          if (downloadsResponse.ok) {
            const data = await downloadsResponse.json();
            // The API returns { value: "123K" } format
            if (data.value) {
              const valueStr = data.value.toString().toLowerCase();
              let numValue = parseFloat(valueStr.replace(/[^0-9.]/g, ''));
              if (valueStr.includes('k')) numValue *= 1000;
              if (valueStr.includes('m')) numValue *= 1000000;
              setDownloads(Math.round(numValue));
            }
          }
        } catch {
          // Fallback to null if downloads API fails
          setDownloads(null);
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
