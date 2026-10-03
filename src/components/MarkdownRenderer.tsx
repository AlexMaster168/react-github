import ReactMarkdown, { defaultUrlTransform } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import ReactSyntaxHighlighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { resolveGithubUrl } from '../utils/helpers'

interface MarkdownRendererProps {
  content: string
  owner?: string
  repo?: string
  basePath?: string
}

export const MarkdownRenderer = ({ content, owner, repo, basePath }: MarkdownRendererProps) => (
  <div className="markdown-body">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      urlTransform={(url, key) => {
        const safe = defaultUrlTransform(url)
        return owner && repo ? resolveGithubUrl(safe, owner, repo, key === 'src', basePath) : safe
      }}
      components={{
        code({ className, children, node: _node, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return match ? (
            <ReactSyntaxHighlighter style={dark} language={match[1]} PreTag="div">
              {String(children).replace(/\n$/, '')}
            </ReactSyntaxHighlighter>
          ) : <code className={className} {...props}>{children}</code>
        },
        a({ children, href, node: _node, ...props }) {
          return <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }} {...props}>{children}</a>
        },
        h1({ children, node: _node, ...props }) { return <h1 style={{ color: 'var(--text-primary)', marginTop: 24, marginBottom: 16 }} {...props}>{children}</h1> },
        h2({ children, node: _node, ...props }) { return <h2 style={{ color: 'var(--text-primary)', marginTop: 20, marginBottom: 12 }} {...props}>{children}</h2> },
        h3({ children, node: _node, ...props }) { return <h3 style={{ color: 'var(--text-primary)', marginTop: 16, marginBottom: 8 }} {...props}>{children}</h3> },
        p({ children, node: _node, ...props }) { return <p style={{ color: 'var(--text-primary)', lineHeight: 1.6 }} {...props}>{children}</p> },
        blockquote({ children, node: _node, ...props }) { return <blockquote style={{ borderLeft: '4px solid var(--accent-blue)', paddingLeft: 16, color: 'var(--text-secondary)', margin: '16px 0' }} {...props}>{children}</blockquote> },
        hr({ node: _node, ...props }) { return <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '24px 0' }} {...props} /> },
        img({ src, alt, node: _node, ...props }) { return <img src={src} alt={alt} loading="lazy" style={{ maxWidth: '100%' }} {...props} /> }
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
)
