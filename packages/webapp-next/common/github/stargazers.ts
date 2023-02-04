const stargazersCountKey = "stargazersCount";

const rateLimitResetKey = "stargazersCountRateLimitReset";

export async function getStargazersCount() {
  return shouldRefreshCache()
    ? fetchStargazersCount()
    : localStorage.getItem(stargazersCountKey);
}

async function fetchStargazersCount() {
  return fetch("https://api.github.com/repos/codicocodes/speedtyper.dev").then(
    async (res) => {
      const rateLimitResetSeconds = res.headers.get(
        "x-ratelimit-reset"
      ) as string;
      const resetDate = new Date(parseInt(rateLimitResetSeconds) * 1000);
      const repoData = await res.json();
      localStorage.setItem(stargazersCountKey, repoData.stargazers_count);
      console.log({ resetDate });
      localStorage.setItem(rateLimitResetKey, resetDate.toISOString());
      return repoData;
    }
  );
}

function shouldRefreshCache() {
  const rateLimitReset = localStorage.getItem(rateLimitResetKey);
  if (!rateLimitReset) {
    return true;
  }
  return new Date() > new Date(rateLimitReset);
}
