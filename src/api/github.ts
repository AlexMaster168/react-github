import axios from 'axios'
import type {
  GithubUser,
  GithubRepo,
  GithubIssue,
  GithubPullRequest,
  GithubCommit,
  GithubBranch,
  GithubRelease,
  GithubGist,
  GithubContent,
  RepoLanguages,
  SearchResult
} from '../types'

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || ''

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    ...(GITHUB_TOKEN && { 'Authorization': `Bearer ${GITHUB_TOKEN}` })
  }
})

export const githubApi = {
  searchUsers: async (query: string, page = 1, limit = 30): Promise<SearchResult<GithubUser>> => {
    const { data } = await api.get(`/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${limit}`)
    return data
  },

  searchRepos: async (query: string, page = 1, limit = 30, sort = 'stars'): Promise<SearchResult<GithubRepo>> => {
    const { data } = await api.get(`/search/repositories?q=${encodeURIComponent(query)}&page=${page}&per_page=${limit}&sort=${sort}`)
    return data
  },

  getUser: async (username: string): Promise<GithubUser> => {
    const { data } = await api.get(`/users/${username}`)
    return data
  },

  getUserRepos: async (username: string, page = 1, limit = 30, sort = 'updated'): Promise<GithubRepo[]> => {
    const { data } = await api.get(`/users/${username}/repos?page=${page}&per_page=${limit}&sort=${sort}`)
    return data
  },

  getUserStarred: async (username: string, page = 1, limit = 30): Promise<GithubRepo[]> => {
    const { data } = await api.get(`/users/${username}/starred?page=${page}&per_page=${limit}`)
    return data
  },

  getUserFollowers: async (username: string, page = 1, limit = 30): Promise<GithubUser[]> => {
    const { data } = await api.get(`/users/${username}/followers?page=${page}&per_page=${limit}`)
    return data
  },

  getUserFollowing: async (username: string, page = 1, limit = 30): Promise<GithubUser[]> => {
    const { data } = await api.get(`/users/${username}/following?page=${page}&per_page=${limit}`)
    return data
  },

  getUserGists: async (username: string, page = 1, limit = 30): Promise<GithubGist[]> => {
    const { data } = await api.get(`/users/${username}/gists?page=${page}&per_page=${limit}`)
    return data
  },

  getUserOrganizations: async (username: string): Promise<Array<{ login: string; id: number; avatar_url: string; url: string }>> => {
    const { data } = await api.get(`/users/${username}/orgs`)
    return data
  },

  getUserEvents: async (username: string, page = 1, limit = 30): Promise<Array<{
    id: string
    type: string
    actor: { login: string; avatar_url: string }
    repo: { name: string; url: string }
    payload: Record<string, unknown>
    created_at: string
    public: boolean
  }>> => {
    const { data } = await api.get(`/users/${username}/events?page=${page}&per_page=${limit}`)
    return data
  },

  getRepo: async (owner: string, repo: string): Promise<GithubRepo> => {
    const { data } = await api.get(`/repos/${owner}/${repo}`)
    return data
  },

  getRepoIssues: async (owner: string, repo: string, page = 1, limit = 30, state = 'open'): Promise<GithubIssue[]> => {
    const { data } = await api.get(`/repos/${owner}/${repo}/issues?page=${page}&per_page=${limit}&state=${state}`)
    return data
  },

  getRepoPullRequests: async (owner: string, repo: string, page = 1, limit = 30, state = 'open'): Promise<GithubPullRequest[]> => {
    const { data } = await api.get(`/repos/${owner}/${repo}/pulls?page=${page}&per_page=${limit}&state=${state}`)
    return data
  },

  getRepoCommits: async (owner: string, repo: string, page = 1, limit = 30, sha?: string): Promise<GithubCommit[]> => {
    const params = `page=${page}&per_page=${limit}${sha ? `&sha=${sha}` : ''}`
    const { data } = await api.get(`/repos/${owner}/${repo}/commits?${params}`)
    return data
  },

  getRepoBranches: async (owner: string, repo: string): Promise<GithubBranch[]> => {
    const { data } = await api.get(`/repos/${owner}/${repo}/branches?per_page=100`)
    return data
  },

  getRepoLanguages: async (owner: string, repo: string): Promise<RepoLanguages> => {
    const { data } = await api.get(`/repos/${owner}/${repo}/languages`)
    return data
  },

  getRepoTopics: async (owner: string, repo: string): Promise<{ names: string[] }> => {
    const { data } = await api.get(`/repos/${owner}/${repo}/topics`)
    return data
  },

  getRepoReleases: async (owner: string, repo: string, page = 1, limit = 30): Promise<GithubRelease[]> => {
    const { data } = await api.get(`/repos/${owner}/${repo}/releases?page=${page}&per_page=${limit}`)
    return data
  },

  getRepoContributors: async (owner: string, repo: string, page = 1, limit = 30): Promise<Array<GithubUser & { contributions: number }>> => {
    const { data } = await api.get(`/repos/${owner}/${repo}/contributors?page=${page}&per_page=${limit}`)
    return data
  },

  getRepoContent: async (owner: string, repo: string, path = ''): Promise<GithubContent[] | GithubContent> => {
    const { data } = await api.get(`/repos/${owner}/${repo}/contents/${path}`)
    return data
  },

  getRepoReadme: async (owner: string, repo: string): Promise<GithubContent> => {
    const { data } = await api.get(`/repos/${owner}/${repo}/readme`)
    return data
  },

  getRepoCompare: async (owner: string, repo: string, base: string, head: string) => {
    const { data } = await api.get(`/repos/${owner}/${repo}/compare/${base}...${head}`)
    return data
  },

  getRepoSearchCode: async (owner: string, repo: string, query: string): Promise<SearchResult<{ name: string; path: string; sha: string; url: string; html_url: string }>> => {
    const { data } = await api.get(`/search/code?q=${encodeURIComponent(query)}+repo:${owner}/${repo}`)
    return data
  },

  getGist: async (gistId: string) => {
    const { data } = await api.get(`/gists/${gistId}`)
    return data
  },

  getTrendingRepos: async (since: 'daily' | 'weekly' | 'monthly' = 'daily'): Promise<GithubRepo[]> => {
    try {
      const { data } = await axios.get(`https://api.gitterapp.com/repositories?since=${since}`)
      return data
    } catch {
      return []
    }
  },

  getRepoTree: async (owner: string, repo: string, sha: string): Promise<{ tree: Array<{ path: string; mode: string; type: string; sha: string; size?: number; url: string }> }> => {
    const { data } = await api.get(`/repos/${owner}/${repo}/git/trees/${sha}?recursive=1`)
    return data
  }
}

export default api
