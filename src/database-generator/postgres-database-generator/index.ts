import { ProjectConfig } from '../../types/project-config';
import { SecretsCreator } from '../../secret-creator';
import { Database } from '../../types/database';
import { File } from '../../types/file';
import { FileTemplate } from '../../types/file-template';
import { FilesGenerator } from '../../types/files-generator';
import { PostgresDeplTemplate } from './templates/postgres-depl.yaml.template';
import { PostgresPasswordTemplate } from './templates/postgres-password.yaml.template';
import { PostgresVolTemplate } from './templates/postgres-vol.yaml.template';

export class PostgresDatabaseGenerator implements FilesGenerator<Database> {
  constructor(
    private secretsCreator: SecretsCreator, 
    private projectConfig: ProjectConfig,
  ) {}

  templates: FileTemplate<Database>[] = [
    new PostgresDeplTemplate(),
    new PostgresVolTemplate(),
    new PostgresPasswordTemplate(),
  ];

  generateFiles(db: Database): File[] {
    this.addSecrets(db);
    const files = this.templates.map(template => template.getFile(db));
    return files;
  }

  addSecrets(db: Database): void {
    this.secretsCreator.addSecret(`${db.name.toUpperCase()}_POSTGRES_PASSWORD`);
    this.secretsCreator.addSecret(`${db.name.toUpperCase()}_POSTGRES_PASSWORD_BASE64`);
  }
}