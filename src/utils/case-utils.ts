export function Capitalize(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

export function Decapitalize(str: string): string {
  return str[0].toLowerCase() + str.slice(1);
}