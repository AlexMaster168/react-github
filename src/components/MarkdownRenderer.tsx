import ReactMarkdown from 'react-markdown'
import ReactSyntaxHighlighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const MarkdownRenderer = ({ content }: { content: string }) => (
  <div className="markdown-body">
    <ReactMarkdown
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return match ? (
            <ReactSyntaxHighlighter style={dark} language={match[1]} PreTag="div">
              {String(children).replace(/\n$/, '')}
            </ReactSyntaxHighlighter>
          ) : <code className={className} {...props}>{children}</code>
        },
        a({ children, href, ...props }) {
          return <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }} {...props}>{children}</a>
        },
        h1({ children, ...props }) { return <h1 style={{ color: 'var(--text-primary)', marginTop: 24, marginBottom: 16 }} {...props}>{children}</h1> },
        h2({ children, ...props }) { return <h2 style={{ color: 'var(--text-primary)', marginTop: 20, marginBottom: 12 }} {...props}>{children}</h2> },
        h3({ children, ...props }) { return <h3 style={{ color: 'var(--text-primary)', marginTop: 16, marginBottom: 8 }} {...props}>{children}</h3> },
        p({ children, ...props }) { return <p style={{ color: 'var(--text-primary)', lineHeight: 1.6 }} {...props}>{children}</p> },
        blockquote({ children, ...props }) { return <blockquote style={{ borderLeft: '4px solid var(--accent-blue)', paddingLeft: 16, color: 'var(--text-secondary)', margin: '16px 0' }} {...props}>{children}</blockquote> },
        hr({ ...props }) { return <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '24px 0' }} {...props} /> },
        img({ src, alt, ...props }) { return <img src={src} alt={alt} style={{ maxWidth: '100%', borderRadius: 8 }} {...props} /> }
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
)
