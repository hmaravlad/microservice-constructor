import { File } from './types/file';
import * as fs from 'fs/promises';
import { existsSync } from 'fs';
import { removeExtraWhiteSpace } from './utils/remove-extra-white-space';

export class FileWriter {
  constructor(private target: string) {}

  async writeFile(file: File): Promise<void> {
    file = { ...file, data: removeExtraWhiteSpace(file.data) };
    //const path = __dirname + '/' + this.target + '/' + file.path;
    const path = this.target + '/' + file.path;
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