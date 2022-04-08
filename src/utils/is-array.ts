export function isArray(typeName: string): boolean {
  const len = typeName.length;
  return typeName[len - 2] === '[' && typeName[len - 1] === ']'; 
}