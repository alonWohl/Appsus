export function LongText({ children, limit }) {
  const longTxt = children.length > limit ? children.slice(0, limit) + '...' : children

  return <span>{longTxt}</span>
}
