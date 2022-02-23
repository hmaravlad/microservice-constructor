import { File } from './types/file';
import * as fs from 'fs/promises';
import { existsSync } from 'fs';

export class FileWriter {
  constructor(private target: string) {}

  async writeFile(file: File): Promise<void> {
    file = this.removeExtraWhiteSpace(file);
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

  removeExtraWhiteSpace(file: File): File {
    let minNumber = Number.MAX_SAFE_INTEGER;
    const rows = file.data.split('\n');
    for (const row of rows) {
      for (let i = 0; i < row.length; i++) {
        if (!row[i].match(/\s/)) {
          minNumber = Math.min(minNumber, i);
          break;
        }
      }
    }
    return {
      ...file,
      data: rows.map(row => row.slice(minNumber)).join('\n'),
    };
  }
}