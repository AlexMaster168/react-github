export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
  return num.toString()
}

export const truncate = (str: string, len: number): string => {
  if (str.length <= len) return str
  return str.slice(0, len) + '...'
}

export const getLanguageColor = (lang: string): string => {
  const colors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    'C#': '#178600',
    Go: '#00ADD8',
    Rust: '#dea584',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    Shell: '#89e051',
    HTML: '#e34c26',
    CSS: '#563d7c',
    SCSS: '#c6538c',
    Vue: '#41b883',
    Svelte: '#ff3e00',
    Lua: '#000080',
    Haskell: '#5e5086',
    Scala: '#c22d40',
    R: '#198CE7',
    MATLAB: '#e16737',
    Perl: '#0298c3',
    Elixir: '#6e4a7e',
    Clojure: '#db5855',
    'Objective-C': '#438eff',
    Assembly: '#6E4C13',
    Dockerfile: '#384d54',
    Makefile: '#427819'
  }
  return colors[lang] || '#6e7681'
}

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const calculateTotalStars = (repos: Array<{ stargazers_count: number }>): number => {
  return repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)
}

export const getRelativeTime = (date: string): string => {
  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffDays / 365)

  if (diffYears > 0) return `${diffYears} г. назад`
  if (diffMonths > 0) return `${diffMonths} мес. назад`
  if (diffDays > 0) return `${diffDays} дн. назад`
  if (diffHours > 0) return `${diffHours} ч. назад`
  if (diffMins > 0) return `${diffMins} мин. назад`
  return 'только что'
}
