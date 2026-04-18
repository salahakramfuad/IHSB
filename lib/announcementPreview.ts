/** Strip basic HTML tags and collapse whitespace for short previews. */
export function stripHtmlToPlain(input: string): string {
  return input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

export function truncatePlain(input: string, maxLen: number): string {
  const plain = stripHtmlToPlain(input)
  if (plain.length <= maxLen) return plain
  return `${plain.slice(0, maxLen).trimEnd()}…`
}
