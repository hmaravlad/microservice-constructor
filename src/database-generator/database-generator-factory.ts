import { FilesGenerator } from '../types/files-generator';
import { Database } from '../types/database';
import { PostgresDatabaseGenerator } from './postgres-database-generator';
import { SecretsCreator } from '../secret-creator';

export class DatabaseGeneratorFactory {
  constructor(private secretsCreator: SecretsCreator) {}

  databaseGenerators: { [key: string]: FilesGenerator<Database> } = {
    'postgres': new PostgresDatabaseGenerator(this.secretsCreator),
  };  

  getDatabaseGenerator(type: string): FilesGenerator<Database> {
    const databaseGenerator = this.databaseGenerators[type];
    if (!databaseGenerator) {
      throw new Error(`Database ${type} is not supported`);
    } 
    return databaseGenerator;
  }
}