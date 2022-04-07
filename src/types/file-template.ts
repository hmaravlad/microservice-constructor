import { File } from './file';

export interface FileTemplate<T> {
  getFile: (config: T) => File
}
