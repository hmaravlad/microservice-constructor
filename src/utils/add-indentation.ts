export function addIndentation(str: string, indent: string, removeIndentForFirstRow = false): string {
  return str
    .split('\n')
    .map(row => indent + row)
    .join('\n')
    .slice(removeIndentForFirstRow ? indent.length : 0);
}