export function LongText({ text, limit }) {
  const longTxt = text.length > limit ? text.slice(0, limit) + '...' : text

  return <span>{longTxt}</span>
}
