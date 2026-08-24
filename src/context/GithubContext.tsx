import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode
} from 'react'
import { githubApi } from '../api/github'
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

interface GithubState {
  users: GithubUser[]
  user: GithubUser | null
  repos: GithubRepo[]
  starredRepos: GithubRepo[]
  followers: GithubUser[]
  following: GithubUser[]
  gists: GithubGist[]
  orgs: Array<{ login: string; id: number; avatar_url: string; url: string }>
  events: Array<{
    id: string
    type: string
    actor: { login: string; avatar_url: string }
    repo: { name: string; url: string }
    payload: Record<string, unknown>
    created_at: string
    public: boolean
  }>
  repo: GithubRepo | null
  issues: GithubIssue[]
  pullRequests: GithubPullRequest[]
  commits: GithubCommit[]
  branches: GithubBranch[]
  releases: GithubRelease[]
  contributors: Array<GithubUser & { contributions: number }>
  languages: RepoLanguages
  topics: string[]
  readme: string | null
  fileContent: GithubContent | null
  loading: boolean
  searchResult: SearchResult<GithubUser> | null
  searchRepoResult: SearchResult<GithubRepo> | null
  page: number
  totalPages: number
}

type GithubAction =
  | { type: 'SET_LOADING' }
  | { type: 'CLEAR_LOADING' }
  | { type: 'SEARCH_USERS'; payload: { users: GithubUser[]; total: number; page: number } }
  | { type: 'SEARCH_REPOS'; payload: { repos: GithubRepo[]; total: number; page: number } }
  | { type: 'GET_USER'; payload: GithubUser }
  | { type: 'GET_REPOS'; payload: GithubRepo[] }
  | { type: 'GET_STARRED'; payload: GithubRepo[] }
  | { type: 'GET_FOLLOWERS'; payload: GithubUser[] }
  | { type: 'GET_FOLLOWING'; payload: GithubUser[] }
  | { type: 'GET_GISTS'; payload: GithubGist[] }
  | { type: 'GET_ORGS'; payload: Array<{ login: string; id: number; avatar_url: string; url: string }> }
  | { type: 'GET_EVENTS'; payload: GithubState['events'] }
  | { type: 'GET_REPO'; payload: GithubRepo }
  | { type: 'GET_ISSUES'; payload: GithubIssue[] }
  | { type: 'GET_PULL_REQUESTS'; payload: GithubPullRequest[] }
  | { type: 'GET_COMMITS'; payload: GithubCommit[] }
  | { type: 'GET_BRANCHES'; payload: GithubBranch[] }
  | { type: 'GET_RELEASES'; payload: GithubRelease[] }
  | { type: 'GET_CONTRIBUTORS'; payload: Array<GithubUser & { contributions: number }> }
  | { type: 'GET_LANGUAGES'; payload: RepoLanguages }
  | { type: 'GET_TOPICS'; payload: string[] }
  | { type: 'GET_README'; payload: string | null }
  | { type: 'GET_FILE_CONTENT'; payload: GithubContent | null }
  | { type: 'CLEAR_USER' }
  | { type: 'CLEAR_REPO' }
  | { type: 'CLEAR_SEARCH' }

const initialState: GithubState = {
  users: [],
  user: null,
  repos: [],
  starredRepos: [],
  followers: [],
  following: [],
  gists: [],
  orgs: [],
  events: [],
  repo: null,
  issues: [],
  pullRequests: [],
  commits: [],
  branches: [],
  releases: [],
  contributors: [],
  languages: {},
  topics: [],
  readme: null,
  fileContent: null,
  loading: false,
  searchResult: null,
  searchRepoResult: null,
  page: 1,
  totalPages: 1
}

function githubReducer(state: GithubState, action: GithubAction): GithubState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true }
    case 'CLEAR_LOADING':
      return { ...state, loading: false }
    case 'SEARCH_USERS':
      return {
        ...state,
        users: action.payload.users,
        searchResult: action.payload.users.length > 0 ? { total_count: action.payload.total, incomplete_results: false, items: action.payload.users } : null,
        page: action.payload.page,
        totalPages: Math.ceil(action.payload.total / 30),
        loading: false
      }
    case 'SEARCH_REPOS':
      return {
        ...state,
        searchRepoResult: action.payload.repos.length > 0 ? { total_count: action.payload.total, incomplete_results: false, items: action.payload.repos } : null,
        page: action.payload.page,
        totalPages: Math.ceil(action.payload.total / 30),
        loading: false
      }
    case 'GET_USER':
      return { ...state, user: action.payload, loading: false }
    case 'GET_REPOS':
      return { ...state, repos: action.payload, loading: false }
    case 'GET_STARRED':
      return { ...state, starredRepos: action.payload, loading: false }
    case 'GET_FOLLOWERS':
      return { ...state, followers: action.payload, loading: false }
    case 'GET_FOLLOWING':
      return { ...state, following: action.payload, loading: false }
    case 'GET_GISTS':
      return { ...state, gists: action.payload, loading: false }
    case 'GET_ORGS':
      return { ...state, orgs: action.payload, loading: false }
    case 'GET_EVENTS':
      return { ...state, events: action.payload, loading: false }
    case 'GET_REPO':
      return { ...state, repo: action.payload, loading: false }
    case 'GET_ISSUES':
      return { ...state, issues: action.payload, loading: false }
    case 'GET_PULL_REQUESTS':
      return { ...state, pullRequests: action.payload, loading: false }
    case 'GET_COMMITS':
      return { ...state, commits: action.payload, loading: false }
    case 'GET_BRANCHES':
      return { ...state, branches: action.payload, loading: false }
    case 'GET_RELEASES':
      return { ...state, releases: action.payload, loading: false }
    case 'GET_CONTRIBUTORS':
      return { ...state, contributors: action.payload, loading: false }
    case 'GET_LANGUAGES':
      return { ...state, languages: action.payload, loading: false }
    case 'GET_TOPICS':
      return { ...state, topics: action.payload, loading: false }
    case 'GET_README':
      return { ...state, readme: action.payload, loading: false }
    case 'GET_FILE_CONTENT':
      return { ...state, fileContent: action.payload, loading: false }
    case 'CLEAR_USER':
      return { ...state, user: null, repos: [], starredRepos: [], followers: [], following: [], gists: [], orgs: [], events: [] }
    case 'CLEAR_REPO':
      return { ...state, repo: null, issues: [], pullRequests: [], commits: [], branches: [], releases: [], contributors: [], languages: {}, topics: [], readme: null, fileContent: null }
    case 'CLEAR_SEARCH':
      return { ...state, users: [], searchResult: null, searchRepoResult: null, page: 1, totalPages: 1 }
    default:
      return state
  }
}

interface GithubContextType extends GithubState {
  searchUsers: (query: string, page?: number) => Promise<void>
  searchRepos: (query: string, page?: number) => Promise<void>
  getUser: (username: string) => Promise<void>
  getUserRepos: (username: string) => Promise<void>
  getUserStarred: (username: string) => Promise<void>
  getUserFollowers: (username: string) => Promise<void>
  getUserFollowing: (username: string) => Promise<void>
  getUserGists: (username: string) => Promise<void>
  getUserOrgs: (username: string) => Promise<void>
  getUserEvents: (username: string) => Promise<void>
  getRepo: (owner: string, repo: string) => Promise<void>
  getRepoIssues: (owner: string, repo: string) => Promise<void>
  getRepoPullRequests: (owner: string, repo: string) => Promise<void>
  getRepoCommits: (owner: string, repo: string, sha?: string) => Promise<void>
  getRepoBranches: (owner: string, repo: string) => Promise<void>
  getRepoReleases: (owner: string, repo: string) => Promise<void>
  getRepoContributors: (owner: string, repo: string) => Promise<void>
  getRepoLanguages: (owner: string, repo: string) => Promise<void>
  getRepoTopics: (owner: string, repo: string) => Promise<void>
  getRepoReadme: (owner: string, repo: string) => Promise<void>
  getFileContent: (owner: string, repo: string, path: string) => Promise<void>
  clearUser: () => void
  clearRepo: () => void
  clearSearch: () => void
}

export const GithubContext = createContext<GithubContextType>({
  ...initialState,
  searchUsers: async () => {},
  searchRepos: async () => {},
  getUser: async () => {},
  getUserRepos: async () => {},
  getUserStarred: async () => {},
  getUserFollowers: async () => {},
  getUserFollowing: async () => {},
  getUserGists: async () => {},
  getUserOrgs: async () => {},
  getUserEvents: async () => {},
  getRepo: async () => {},
  getRepoIssues: async () => {},
  getRepoPullRequests: async () => {},
  getRepoCommits: async () => {},
  getRepoBranches: async () => {},
  getRepoReleases: async () => {},
  getRepoContributors: async () => {},
  getRepoLanguages: async () => {},
  getRepoTopics: async () => {},
  getRepoReadme: async () => {},
  getFileContent: async () => {},
  clearUser: () => {},
  clearRepo: () => {},
  clearSearch: () => {}
})

export const GithubProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(githubReducer, initialState)

  const searchUsers = useCallback(async (query: string, page = 1) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const result = await githubApi.searchUsers(query, page)
      dispatch({
        type: 'SEARCH_USERS',
        payload: { users: result.items, total: result.total_count, page }
      })
    } catch {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }, [])

  const searchRepos = useCallback(async (query: string, page = 1) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const result = await githubApi.searchRepos(query, page)
      dispatch({
        type: 'SEARCH_REPOS',
        payload: { repos: result.items, total: result.total_count, page }
      })
    } catch {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }, [])

  const getUser = useCallback(async (username: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const user = await githubApi.getUser(username)
      dispatch({ type: 'GET_USER', payload: user })
    } catch {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }, [])

  const getUserRepos = useCallback(async (username: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const repos = await githubApi.getUserRepos(username)
      dispatch({ type: 'GET_REPOS', payload: repos })
    } catch {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }, [])

  const getUserStarred = useCallback(async (username: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const repos = await githubApi.getUserStarred(username)
      dispatch({ type: 'GET_STARRED', payload: repos })
    } catch {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }, [])

  const getUserFollowers = useCallback(async (username: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const users = await githubApi.getUserFollowers(username)
      dispatch({ type: 'GET_FOLLOWERS', payload: users })
    } catch {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }, [])

  const getUserFollowing = useCallback(async (username: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const users = await githubApi.getUserFollowing(username)
      dispatch({ type: 'GET_FOLLOWING', payload: users })
    } catch {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }, [])

  const getUserGists = useCallback(async (username: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const gists = await githubApi.getUserGists(username)
      dispatch({ type: 'GET_GISTS', payload: gists })
    } catch {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }, [])

  const getUserOrgs = useCallback(async (username: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const orgs = await githubApi.getUserOrganizations(username)
      dispatch({ type: 'GET_ORGS', payload: orgs })
    } catch {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }, [])

  const getUserEvents = useCallback(async (username: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const events = await githubApi.getUserEvents(username)
      dispatch({ type: 'GET_EVENTS', payload: events })
    } catch {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }, [])

  const getRepo = useCallback(async (owner: string, repo: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const repoData = await githubApi.getRepo(owner, repo)
      dispatch({ type: 'GET_REPO', payload: repoData })
    } catch {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }, [])

  const getRepoIssues = useCallback(async (owner: string, repo: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const issues = await githubApi.getRepoIssues(owner, repo)
      dispatch({ type: 'GET_ISSUES', payload: issues })
    } catch {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }, [])

  const getRepoPullRequests = useCallback(async (owner: string, repo: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const prs = await githubApi.getRepoPullRequests(owner, repo)
      dispatch({ type: 'GET_PULL_REQUESTS', payload: prs })
    } catch {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }, [])

  const getRepoCommits = useCallback(async (owner: string, repo: string, sha?: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const commits = await githubApi.getRepoCommits(owner, repo, 1, 30, sha)
      dispatch({ type: 'GET_COMMITS', payload: commits })
    } catch {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }, [])

  const getRepoBranches = useCallback(async (owner: string, repo: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const branches = await githubApi.getRepoBranches(owner, repo)
      dispatch({ type: 'GET_BRANCHES', payload: branches })
    } catch {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }, [])

  const getRepoReleases = useCallback(async (owner: string, repo: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const releases = await githubApi.getRepoReleases(owner, repo)
      dispatch({ type: 'GET_RELEASES', payload: releases })
    } catch {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }, [])

  const getRepoContributors = useCallback(async (owner: string, repo: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const contributors = await githubApi.getRepoContributors(owner, repo)
      dispatch({ type: 'GET_CONTRIBUTORS', payload: contributors })
    } catch {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }, [])

  const getRepoLanguages = useCallback(async (owner: string, repo: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const languages = await githubApi.getRepoLanguages(owner, repo)
      dispatch({ type: 'GET_LANGUAGES', payload: languages })
    } catch {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }, [])

  const getRepoTopics = useCallback(async (owner: string, repo: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const result = await githubApi.getRepoTopics(owner, repo)
      dispatch({ type: 'GET_TOPICS', payload: result.names })
    } catch {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }, [])

  const getRepoReadme = useCallback(async (owner: string, repo: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const readme = await githubApi.getRepoReadme(owner, repo)
      const decoded = readme.content ? atob(readme.content) : null
      dispatch({ type: 'GET_README', payload: decoded })
    } catch {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }, [])

  const getFileContent = useCallback(async (owner: string, repo: string, path: string) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const content = await githubApi.getRepoContent(owner, repo, path) as GithubContent
      dispatch({ type: 'GET_FILE_CONTENT', payload: content })
    } catch {
      dispatch({ type: 'CLEAR_LOADING' })
    }
  }, [])

  const clearUser = useCallback(() => dispatch({ type: 'CLEAR_USER' }), [])
  const clearRepo = useCallback(() => dispatch({ type: 'CLEAR_REPO' }), [])
  const clearSearch = useCallback(() => dispatch({ type: 'CLEAR_SEARCH' }), [])

  return (
    <GithubContext.Provider value={{
      ...state,
      searchUsers,
      searchRepos,
      getUser,
      getUserRepos,
      getUserStarred,
      getUserFollowers,
      getUserFollowing,
      getUserGists,
      getUserOrgs,
      getUserEvents,
      getRepo,
      getRepoIssues,
      getRepoPullRequests,
      getRepoCommits,
      getRepoBranches,
      getRepoReleases,
      getRepoContributors,
      getRepoLanguages,
      getRepoTopics,
      getRepoReadme,
      getFileContent,
      clearUser,
      clearRepo,
      clearSearch
    }}>
      {children}
    </GithubContext.Provider>
  )
}

export const useGithub = () => useContext(GithubContext)
