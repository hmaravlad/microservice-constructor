export function removeEmptyLines(str: string): string {
  return str
    .split('\n')
    .filter(line => line.trim() !== '')
    .join('\n');
}