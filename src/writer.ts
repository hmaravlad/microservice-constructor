import { File } from './types/file';
import * as fs from 'fs/promises';
import { existsSync } from 'fs';

export class FileWriter {
  constructor(private target: string) {}

  async writeFile(file: File): Promise<void> {
    const path = __dirname + '/' + this.target + '/' + file.path;
    if (!existsSync(path)) {
      await fs.mkdir(path, { recursive: true });
    }
    await fs.writeFile(path + '/' + file.name, file.data);
  }

  async writeFiles(files: File[]): Promise<void> {
    for (const file of files) {
      await this.writeFile(file);
    }
  }
}