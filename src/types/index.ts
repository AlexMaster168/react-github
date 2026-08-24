export interface GithubUser {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  user_view_type: string
  site_admin: boolean
  name: string | null
  company: string | null
  blog: string | null
  location: string | null
  email: string | null
  hireable: boolean | null
  bio: string | null
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface GithubRepo {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: GithubUser
  html_url: string
  description: string | null
  fork: boolean
  url: string
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  issue_events_url: string
  events_url: string
  assignees_url: string
  branches_url: string
  tags_url: string
  blobs_url: string
  git_tags_url: string
  git_refs_url: string
  trees_url: string
  statuses_url: string
  languages_url: string
  stargazers_url: string
  contributors_url: string
  subscribers_url: string
  subscription_url: string
  commits_url: string
  git_commits_url: string
  comments_url: string
  issue_comment_url: string
  contents_url: string
  compare_url: string
  merges_url: string
  archive_url: string
  downloads_url: string
  issues_url: string
  pulls_url: string
  milestones_url: string
  notifications_url: string
  labels_url: string
  releases_url: string
  deployments_url: string
  created_at: string
  updated_at: string
  pushed_at: string
  git_url: string
  ssh_url: string
  clone_url: string
  svn_url: string
  homepage: string | null
  size: number
  stargazers_count: number
  watchers_count: number
  language: string | null
  has_issues: boolean
  has_projects: boolean
  has_downloads: boolean
  has_wiki: boolean
  has_pages: boolean
  has_discussions: boolean
  forks_count: number
  mirror_url: string | null
  archived: boolean
  disabled: boolean
  open_issues_count: number
  license: {
    key: string
    name: string
    spdx_id: string
    url: string
    node_id: string
  } | null
  allow_forking: boolean
  is_template: boolean
  web_commit_signoff_required: boolean
  topics: string[]
  visibility: string
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
  score: number
}

export interface GithubIssue {
  id: number
  node_id: string
  url: string
  repository_url: string
  labels_url: string
  comments_url: string
  events_url: string
  html_url: string
  number: number
  state: string
  title: string
  body: string | null
  user: GithubUser
  labels: Array<{
    id: number
    node_id: string
    url: string
    name: string
    description: string | null
    color: string
    default: boolean
  }>
  assignee: GithubUser | null
  assignees: GithubUser[]
  milestone: unknown | null
  locked: boolean
  active_lock_reason: string | null
  comments: number
  pull_request: {
    url: string
    html_url: string
    diff_url: string
    patch_url: string
    merged_at: string | null
  } | null
  created_at: string
  updated_at: string
  closed_at: string | null
}

export interface GithubPullRequest {
  id: number
  node_id: string
  url: string
  html_url: string
  diff_url: string
  patch_url: string
  issue_url: string
  number: number
  state: string
  locked: boolean
  title: string
  body: string | null
  user: GithubUser
  created_at: string
  updated_at: string
  closed_at: string | null
  merged_at: string | null
  head: {
    label: string
    ref: string
    sha: string
    user: GithubUser
    repo: GithubRepo
  }
  base: {
    label: string
    ref: string
    sha: string
    user: GithubUser
    repo: GithubRepo
  }
}

export interface GithubCommit {
  sha: string
  node_id: string
  url: string
  html_url: string
  comments_url: string
  commit: {
    url: string
    author: {
      name: string
      email: string
      date: string
    }
    committer: {
      name: string
      email: string
      date: string
    }
    message: string
    tree: {
      sha: string
      url: string
    }
    comment_count: number
  }
  author: GithubUser | null
  committer: GithubUser | null
  parents: Array<{
    sha: string
    url: string
    html_url: string
  }>
}

export interface GithubBranch {
  name: string
  commit: {
    sha: string
    url: string
  }
  protected: boolean
}

export interface GithubRelease {
  id: number
  tag_name: string
  target_commitish: string
  name: string | null
  body: string | null
  draft: boolean
  prerelease: boolean
  created_at: string
  published_at: string
  html_url: string
  author: GithubUser
  assets: Array<{
    url: string
    name: string
    content_type: string
    size: number
    download_count: number
    created_at: string
    browser_download_url: string
  }>
}

export interface GithubGist {
  url: string
  forks_url: string
  commits_url: string
  id: string
  node_id: string
  git_pull_url: string
  git_push_url: string
  html_url: string
  files: Record<string, {
    filename: string
    type: string
    language: string | null
    raw_url: string
    size: number
    truncated: boolean
    content: string
  }>
  public: boolean
  created_at: string
  updated_at: string
  description: string | null
  comments: number
  user: GithubUser
  comments_url: string
  owner: GithubUser
}

export interface GithubContent {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string | null
  type: string
  content?: string
  encoding?: string
  _links: {
    self: string
    git: string
    html: string
  }
}

export interface RepoLanguages {
  [language: string]: number
}

export interface SearchResult<T> {
  total_count: number
  incomplete_results: boolean
  items: T[]
}

export type Theme = 'light' | 'dark'
