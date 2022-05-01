import { FilesGenerator } from '../types/files-generator';
import { Database } from 'src/types/database';
import { PostgresDatabaseGenerator } from './postgres-database-generator';

export const databaseGenerators: { [key: string]: FilesGenerator<Database> } = {
  'postgres': new PostgresDatabaseGenerator(),
};

export class DatabaseGeneratorFactory {
  getDatabaseGenerator(type: string): FilesGenerator<Database> {
    const databaseGenerator = databaseGenerators[type];
    if (!databaseGenerator) {
      throw new Error(`Database ${type} is not supported`);
    } 
    return databaseGenerator;
  }
}