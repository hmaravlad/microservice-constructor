const OPENING_PATTERN = '<@!';
const CLOSING_PATTERN = '!@>';
const SPACE = ' ';

export const prepareIndentation = (str: string): string => (
  OPENING_PATTERN + str + CLOSING_PATTERN
);

const getIndentBlocks = (rows: string[]): number[][] => {
  const pairs: number[][] = [];

  const openedStack = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    if (row.includes(OPENING_PATTERN)) {
      openedStack.push(i);
    }

    if (row.includes(CLOSING_PATTERN)) {
      const openingIndex = openedStack.pop();

      if (openingIndex === undefined) {
        throw new Error('Invalid indentation labels');
      }

      pairs.push([openingIndex, i]);
    }
  }

  return pairs;
};

const resolveIdentBlock = (rows: string[], identBlock: number[]): string[] => {
  const [openingIndex, closingIndex] = identBlock;

  const ident = rows[openingIndex].indexOf(OPENING_PATTERN);

  rows[openingIndex] = rows[openingIndex].replace(OPENING_PATTERN, '');
  rows[closingIndex] = rows[closingIndex].replace(CLOSING_PATTERN, '');

  return rows.map((row, index) => {
    if (index <= openingIndex || index > closingIndex) {
      return row;
    }
    return SPACE.repeat(ident) + row;
  });
};

export const resolveIndentation = (str: string): string => {
  let rows = str.split('\n');

  const indentBlockPairs = getIndentBlocks(rows);

  indentBlockPairs.sort(([openingIndex1], [openingIndex2]) => openingIndex1 - openingIndex2);

  for (const identBlock of indentBlockPairs) {
    rows = resolveIdentBlock(rows, identBlock);
  }

  return rows.join('\n');
};
