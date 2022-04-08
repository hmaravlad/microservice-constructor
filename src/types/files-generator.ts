import { File } from './file';

export interface FilesGenerator<T> {
  generateFiles: (config: T) => File[]
}

export function isFilesGenerator<T>(obj: unknown): obj is FilesGenerator<T> {
  return (obj as FilesGenerator<T>).generateFiles !== undefined;
}

