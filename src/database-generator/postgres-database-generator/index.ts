import { Database } from 'src/types/database';
import { File } from 'src/types/file';
import { FileTemplate } from 'src/types/file-template';
import { FilesGenerator } from 'src/types/files-generator';
import { PostgresDeplTemplate } from './templates/postgres-depl.yaml.template';
import { PostgresVolTemplate } from './templates/postgres-vol.yaml.template';

export class PostgresDatabaseGenerator implements FilesGenerator<Database> {
  templates: FileTemplate<Database>[] = [
    new PostgresDeplTemplate(),
    new PostgresVolTemplate(),
  ];

  generateFiles(db: Database): File[] {
    const files = this.templates.map(template => template.getFile(db));
    return files;
  }
}