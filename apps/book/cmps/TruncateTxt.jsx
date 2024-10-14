const { useState } = React
export function TruncateTxt({ text, maxLength = 50 }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev)
  }

  return (
    <div>
      <p>{isExpanded ? text : `${text.slice(0, maxLength)}...`}</p>
      <button onClick={toggleExpand}>{isExpanded ? 'Less' : 'More'}</button>
    </div>
  )
}
