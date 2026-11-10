import { Tag } from '../ui/Badge'

interface FilterBarProps {
  /** Describes what is being filtered, e.g. "Filter news by category" */
  label: string
  /** Path of the page, e.g. '/news' */
  basePath: string
  /** Query parameter the filter is stored in */
  param: string
  options: Array<{ value: string; label: string }>
  selected?: string
  allLabel?: string
  /** Other query parameters to keep when a filter is chosen */
  keep?: Record<string, string | undefined>
}

/** Filter chips. Each one is a link, so the filter lives in the URL and works without JavaScript. */
export default function FilterBar({ label, basePath, param, options, selected, allLabel = 'All', keep = {} }: FilterBarProps) {
  const href = (value?: string) => {
    const query = new URLSearchParams()
    for (const [key, kept] of Object.entries(keep)) if (kept) query.set(key, kept)
    if (value) query.set(param, value)
    const search = query.toString()
    return search ? `${basePath}?${search}` : basePath
  }

  return (
    <nav aria-label={label}>
      <ul className='flex flex-wrap gap-2'>
        <li>
          <Tag href={href()} selected={!selected}>
            {allLabel}
          </Tag>
        </li>
        {options.map((option) => (
          <li key={option.value}>
            <Tag href={href(option.value)} selected={selected === option.value}>
              {option.label}
            </Tag>
          </li>
        ))}
      </ul>
    </nav>
  )
}
