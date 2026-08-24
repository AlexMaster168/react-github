import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGithub } from '../context/GithubContext'
import { UserHeader } from '../components/UserHeader'
import { RepoCard } from '../components/RepoCard'
import { ContributorList } from '../components/ContributorList'
import { GistList } from '../components/GistList'
import { Tabs } from '../components/Tabs'
import { ArrowLeft, Package, Star, Users, GitFork, Code, Building2 } from 'lucide-react'

type ProfileTab = 'repos' | 'starred' | 'followers' | 'following' | 'gists' | 'contributions'

export const ProfilePage = () => {
  const { username } = useParams<{ username: string }>()
  const navigate = useNavigate()
  const { user, repos, starredRepos, followers, following, gists, orgs, getUser, getUserRepos, getUserStarred, getUserFollowers, getUserFollowing, getUserGists, getUserOrgs, clearUser, loading } = useGithub()
  const [activeTab, setActiveTab] = useState<ProfileTab>('repos')

  useEffect(() => {
    if (!username) return
    clearUser()
    getUser(username)
    getUserRepos(username)
    return () => clearUser()
  }, [username])

  const handleTabChange = (tab: ProfileTab) => {
    setActiveTab(tab)
    if (!username) return
    if (tab === 'repos' && repos.length === 0) getUserRepos(username)
    if (tab === 'starred' && starredRepos.length === 0) getUserStarred(username)
    if (tab === 'followers' && followers.length === 0) getUserFollowers(username)
    if (tab === 'following' && following.length === 0) getUserFollowing(username)
    if (tab === 'gists' && gists.length === 0) getUserGists(username)
    if (tab === 'contributions' && orgs.length === 0) getUserOrgs(username)
  }

  if (loading && !user) return <div className="d-flex justify-content-center p-5"><div className="spin" style={{ width: 40, height: 40, border: '3px solid var(--border-color)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%' }} /></div>
  if (!user) return <div className="text-center p-5" style={{ color: 'var(--text-secondary)' }}>Пользователь не найден</div>

  const tabs = [
    { id: 'repos', label: 'Репозитории', icon: <Package size={14} />, count: user.public_repos },
    { id: 'starred', label: 'Звёздные', icon: <Star size={14} /> },
    { id: 'followers', label: 'Подписчики', icon: <Users size={14} />, count: user.followers },
    { id: 'following', label: 'Подписан', icon: <GitFork size={14} />, count: user.following },
    { id: 'gists', label: 'Гисты', icon: <Code size={14} />, count: user.public_gists },
    { id: 'contributions', label: 'Организации', icon: <Building2 size={14} /> }
  ]

  return (
    <div className="fade-in">
      <button className="btn mb-3 d-flex align-items-center gap-1" onClick={() => navigate(-1)} style={{ color: 'var(--accent-blue)' }}>
        <ArrowLeft size={16} /> Назад
      </button>
      <UserHeader user={user} />
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={id => handleTabChange(id as ProfileTab)}>
        {activeTab === 'repos' && (loading ? <LoaderInline /> : repos.length > 0 ? repos.map(r => <RepoCard key={r.id} repo={r} />) : <p style={{ color: 'var(--text-secondary)' }}>Нет репозиториев</p>)}
        {activeTab === 'starred' && (loading ? <LoaderInline /> : starredRepos.length > 0 ? starredRepos.map(r => <RepoCard key={r.id} repo={r} />) : <p style={{ color: 'var(--text-secondary)' }}>Нет звёздных</p>)}
        {activeTab === 'followers' && (loading ? <LoaderInline /> : followers.length > 0 ? <div className="row g-3">{followers.map(u => <div key={u.id} className="col-sm-6 col-md-4 col-lg-3"><UserSmall user={u} /></div>)}</div> : <p style={{ color: 'var(--text-secondary)' }}>Нет подписчиков</p>)}
        {activeTab === 'following' && (loading ? <LoaderInline /> : following.length > 0 ? <div className="row g-3">{following.map(u => <div key={u.id} className="col-sm-6 col-md-4 col-lg-3"><UserSmall user={u} /></div>)}</div> : <p style={{ color: 'var(--text-secondary)' }}>Нет подписок</p>)}
        {activeTab === 'gists' && <GistList gists={gists} loading={loading} />}
        {activeTab === 'contributions' && (loading ? <LoaderInline /> : orgs.length > 0 ? <div className="row g-3">{orgs.map(o => <div key={o.id} className="col-sm-6 col-md-4"><div className="d-flex align-items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}><img src={o.avatar_url} alt={o.login} style={{ width: 48, height: 48, borderRadius: 8 }} /><div className="fw-bold" style={{ color: 'var(--text-primary)' }}>{o.login}</div></div></div>)}</div> : <p style={{ color: 'var(--text-secondary)' }}>Нет организаций</p>)}
      </Tabs>
    </div>
  )
}

function UserSmall({ user }: { user: { login: string; avatar_url: string; html_url: string } }) {
  return (
    <div className="rounded-lg p-3 d-flex align-items-center gap-3 fade-in" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
      <img src={user.avatar_url} alt={user.login} style={{ width: 48, height: 48, borderRadius: '50%' }} />
      <div>
        <div className="fw-bold" style={{ color: 'var(--text-primary)' }}>{user.login}</div>
        <a href={user.html_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', fontSize: '0.85rem' }}>Профиль</a>
      </div>
    </div>
  )
}

function LoaderInline() {
  return <div className="d-flex justify-content-center p-4"><div className="spin" style={{ width: 24, height: 24, border: '2px solid var(--border-color)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%' }} /></div>
}
