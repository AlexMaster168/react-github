# GitHub Explorer v2.0.0

> Мощный веб-приложение для исследования GitHub с использованием React 19, TypeScript и GitHub REST API.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)](https://vitejs.dev)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap)](https://getbootstrap.com)

## Возможности

### Поиск пользователей
- Поиск по нику, имени или описанию
- Просмотр профилей с аватарами
- Статистика: подписчики, подписки, репозитории
- Просмотр звёздных репозиториев
- Список подписчиков и подписок
- Гисты пользователя
- Организации

### Поиск репозиториев
- Поиск по названию и описанию
- Фильтрация по языкам
- Статистика: звёзды, форки, watchers

### Просмотр репозитория
- README с подсветкой синтаксиса
- Файловый проводник с навигацией
- Issues с лейблами и статусами
- Pull Requests (open/closed/merged)
- Коммиты с авторами и датами
- Релизы с ассетами
- Ветки с защитой
- Контрибьюторы с количеством коммитов
- Языки с визуальной полосой
- Темы (topics)

### UI/UX
- Тёмная и светлая темы
- Адаптивный дизайн
- Анимации и переходы
- Skeleton загрузка
- Пагинация
- Дебаунс поиска

## Технологии

| Технология | Версия | Описание |
|-----------|--------|----------|
| React | 19.0 | UI фреймворк |
| TypeScript | 5.7 | Типизация |
| Vite | 6.0 | Сборщик |
| Bootstrap | 5.3 | CSS фреймворк |
| React Router | 7.1 | Роутинг |
| Axios | 1.7 | HTTP клиент |
| React Markdown | 9.0 | Markdown рендеринг |
| Lucide React | 0.46 | Иконки |
| Firebase | 11.1 | Деплой |

## Структура проекта

```
src/
├── api/
│   └── github.ts          # GitHub API клиент
├── components/
│   ├── Alert/
│   ├── BranchList/
│   ├── BranchSelector/
│   ├── CommitList/
│   ├── ContributorList/
│   ├── FileExplorer/
│   ├── GistList/
│   ├── IssueList/
│   ├── LanguageBar/
│   ├── Loader/
│   ├── MarkdownRenderer/
│   ├── Navbar/
│   ├── Pagination/
│   ├── PullRequestList/
│   ├── ReleaseList/
│   ├── RepoCard/
│   ├── RepoHeader/
│   ├── Search/
│   ├── Tabs/
│   ├── UserCard/
│   ├── UserGrid/
│   └── UserHeader/
├── context/
│   ├── AlertContext.tsx
│   ├── GithubContext.tsx
│   └── ThemeContext.tsx
├── hooks/
│   └── index.ts           # Кастомные хуки
├── pages/
│   ├── AboutPage.tsx
│   ├── HomePage.tsx
│   ├── ProfilePage.tsx
│   ├── RepoPage.tsx
│   └── ReposPage.tsx
├── styles/
│   └── index.css          # Глобальные стили
├── types/
│   └── index.ts           # TypeScript интерфейсы
├── utils/
│   └── helpers.ts         # Утилиты
├── App.tsx
└── main.tsx
```

## Установка

```bash
# Клонирование
git clone https://github.com/your-username/react-github.git
cd react-github

# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка
npm run build
```

## Переменные окружения

Создайте файл `.env` в корне проекта:

```
VITE_GITHUB_TOKEN=your_github_token_here
```

> Токен необязателен, но увеличивает лимит запросов API (60/час → 5000/час).

## Деплой на Firebase

```bash
# Установка Firebase CLI
npm install -g firebase-tools

# Вход в Firebase
firebase login

# Инициализация (если первый раз)
firebase init hosting

# Деплой
npm run build
firebase deploy
```

## GitHub API

Приложение использует GitHub REST API v3:

- `GET /search/users` - Поиск пользователей
- `GET /search/repositories` - Поиск репозиториев
- `GET /users/{username}` - Профиль пользователя
- `GET /users/{username}/repos` - Репозитории
- `GET /users/{username}/starred` - Звёздные
- `GET /users/{username}/followers` - Подписчики
- `GET /users/{username}/following` - Подписки
- `GET /users/{username}/gists` - Гисты
- `GET /users/{username}/orgs` - Организации
- `GET /repos/{owner}/{repo}` - Информация о репо
- `GET /repos/{owner}/{repo}/issues` - Issues
- `GET /repos/{owner}/{repo}/pulls` - Pull Requests
- `GET /repos/{owner}/{repo}/commits` - Коммиты
- `GET /repos/{owner}/{repo}/branches` - Ветки
- `GET /repos/{owner}/{repo}/releases` - Релизы
- `GET /repos/{owner}/{repo}/contributors` - Контрибьюторы
- `GET /repos/{owner}/{repo}/languages` - Языки
- `GET /repos/{owner}/{repo}/topics` - Темы
- `GET /repos/{owner}/{repo}/contents` - Содержимое
- `GET /repos/{owner}/{repo}/readme` - README

## Лицензия

MIT License
