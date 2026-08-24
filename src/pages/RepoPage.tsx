import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGithub } from '../context/GithubContext'
import { RepoHeader } from '../components/RepoHeader'
import { LanguageBar } from '../components/LanguageBar'
import { IssueList } from '../components/IssueList'
import { PullRequestList } from '../components/PullRequestList'
import { CommitList } from '../components/CommitList'
import { ReleaseList } from '../components/ReleaseList'
import { BranchList } from '../components/BranchList'
import { ContributorList } from '../components/ContributorList'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import { FileExplorer } from '../components/FileExplorer'
import { Tabs } from '../components/Tabs'
import { ArrowLeft, MessageSquare, GitPullRequest, GitCommit, Tag, Users, FileCode, FolderOpen } from 'lucide-react'

type RepoTab = 'readme' | 'code' | 'issues' | 'prs' | 'commits' | 'releases' | 'branches' | 'contributors'

export const RepoPage = () => {
  const { owner, name } = useParams<{ owner: string; name: string }>()
  const navigate = useNavigate()
  const { repo, issues, pullRequests, commits, branches, releases, contributors, languages, topics, readme, getRepo, getRepoIssues, getRepoPullRequests, getRepoCommits, getRepoBranches, getRepoReleases, getRepoContributors, getRepoLanguages, getRepoTopics, getRepoReadme, clearRepo, loading } = useGithub()
  const [activeTab, setActiveTab] = useState<RepoTab>('readme')

  useEffect(() => {
    if (!owner || !name) return
    clearRepo()
    getRepo(owner, name)
    getRepoReadme(owner, name)
    return () => clearRepo()
  }, [owner, name])

  const handleTabChange = (tab: RepoTab) => {
    setActiveTab(tab)
    if (!owner || !name) return
    if (tab === 'issues' && issues.length === 0) getRepoIssues(owner, name)
    if (tab === 'prs' && pullRequests.length === 0) getRepoPullRequests(owner, name)
    if (tab === 'commits' && commits.length === 0) getRepoCommits(owner, name)
    if (tab === 'releases' && releases.length === 0) getRepoReleases(owner, name)
    if (tab === 'branches' && branches.length === 0) getRepoBranches(owner, name)
    if (tab === 'contributors' && contributors.length === 0) {
      getRepoContributors(owner, name)
      getRepoLanguages(owner, name)
      getRepoTopics(owner, name)
    }
  }

  if (loading && !repo) return <div className="d-flex justify-content-center p-5"><div className="spin" style={{ width: 40, height: 40, border: '3px solid var(--border-color)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%' }} /></div>
  if (!repo) return <div className="text-center p-5" style={{ color: 'var(--text-secondary)' }}>Репозиторий не найден</div>

  const tabs = [
    { id: 'readme', label: 'README', icon: <FileCode size={14} /> },
    { id: 'code', label: 'Код', icon: <FolderOpen size={14} /> },
    { id: 'issues', label: 'Issues', icon: <MessageSquare size={14} />, count: repo.open_issues_count },
    { id: 'prs', label: 'Pull Requests', icon: <GitPullRequest size={14} /> },
    { id: 'commits', label: 'Коммиты', icon: <GitCommit size={14} /> },
    { id: 'releases', label: 'Релизы', icon: <Tag size={14} /> },
    { id: 'branches', label: 'Ветки', icon: <Tag size={14} /> },
    { id: 'contributors', label: 'Контрибьюторы', icon: <Users size={14} /> }
  ]

  return (
    <div className="fade-in">
      <button className="btn mb-3 d-flex align-items-center gap-1" onClick={() => navigate(-1)} style={{ color: 'var(--accent-blue)' }}>
        <ArrowLeft size={16} /> Назад
      </button>
      <RepoHeader owner={owner!} repo={name!} description={repo.description} stars={repo.stargazers_count} forks={repo.forks_count} watchers={repo.watchers_count} language={repo.language} createdAt={repo.created_at} updatedAt={repo.updated_at} topics={topics} />
      {activeTab === 'contributors' && Object.keys(languages).length > 0 && <LanguageBar languages={languages} />}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={id => handleTabChange(id as RepoTab)}>
        {activeTab === 'readme' && (loading ? <LoaderInline /> : readme ? <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}><MarkdownRenderer content={readme} /></div> : <p style={{ color: 'var(--text-secondary)' }}>README не найден</p>)}
        {activeTab === 'code' && <FileExplorer owner={owner!} repo={name!} defaultBranch={repo.default_branch} />}
        {activeTab === 'issues' && <IssueList issues={issues} loading={loading} />}
        {activeTab === 'prs' && <PullRequestList pullRequests={pullRequests} loading={loading} />}
        {activeTab === 'commits' && <CommitList commits={commits} loading={loading} />}
        {activeTab === 'releases' && <ReleaseList releases={releases} loading={loading} />}
        {activeTab === 'branches' && <BranchList branches={branches} loading={loading} />}
        {activeTab === 'contributors' && <ContributorList contributors={contributors} loading={loading} />}
      </Tabs>
    </div>
  )
}

function LoaderInline() {
  return <div className="d-flex justify-content-center p-4"><div className="spin" style={{ width: 24, height: 24, border: '2px solid var(--border-color)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%' }} /></div>
}
