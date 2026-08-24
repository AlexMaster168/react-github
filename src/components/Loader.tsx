export const Loader = () => (
  <div className="d-flex justify-content-center p-5">
    <div className="spin" style={{ width: 40, height: 40, border: '3px solid var(--border-color)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%' }} />
  </div>
)

export const InlineLoader = () => (
  <div className="d-flex justify-content-center p-4">
    <div className="spin" style={{ width: 24, height: 24, border: '2px solid var(--border-color)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%' }} />
  </div>
)
