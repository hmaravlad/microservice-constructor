import { isArray } from './is-array';

export function getNonArrayType(typeName: string): string {
  if (isArray(typeName)) {
    return typeName.slice(0, typeName.length - 2);
  }
  return typeName;
}