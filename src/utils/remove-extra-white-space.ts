export function removeExtraWhiteSpace(data: string): string {
  let minNumber = Number.MAX_SAFE_INTEGER;
  const rows = data.split('\n')
    .map(row => row.replace(/\t/g, '  '));
  for (const row of rows) {
    if (row.trim() === '') continue;
    for (let i = 0; i < row.length; i++) {
      if (!row[i].match(/\s/)) {
        minNumber = Math.min(minNumber, i);
        break;
      }
    }
  }
  return rows.map(row => row.slice(minNumber)).join('\n');
}
