import { EnvVariableProvider, SecretProvider } from '../../types/env-provider';
import { EnvVariable } from '../../types/env-variable';
import { ProjectConfig } from '../../types/project-config';

export class PostgresInfoProvider implements EnvVariableProvider, SecretProvider {
  constructor(private projectConfig: ProjectConfig) {}

  getSecrets(id: number): string[] {
    const db = this.projectConfig.databases.find(database => database.id === id);
    if (!db) throw new Error(`Invalid reference, database with id = ${id} is not found`);
    return [`${db.name.toUpperCase()}_POSTGRES_PASSWORD`];
  }

  getEnvVariables(id: number): EnvVariable[] {
    const db = this.projectConfig.databases.find(database => database.id === id);
    if (!db) throw new Error(`Invalid reference, database with id = ${id} is not found`);
    return [
      { name: 'POSTGRES_DB', value: db.name },
      { name: 'POSTGRES_USER', value: `${db.name}-admin` },
    ];
  }
}