import { Database } from '../types/config/database';
import { PostgresDatabaseGenerator } from './postgres-database-generator';
import { SecretsCreator } from '../secret-creator';
import { EnvVariableProvider, SecretProvider } from 'src/types/env-provider';
import { GeneratorMapping } from 'src/types/generator-mapping';
import { PostgresInfoProvider } from './postgres-database-generator/postgres-info-provider';
import { ProjectConfig } from '../types/config/project-config';
import { GeneratorFactory } from '../generator-factory';
import { InfoProviderFactory } from '../info-provider-factory';

export const databaseGeneratorMapping: GeneratorMapping<Database, EnvVariableProvider & SecretProvider> = {
  'postgres': {
    getGenerator(secretsCreator: SecretsCreator, projectConfig: ProjectConfig) {
      return new PostgresDatabaseGenerator(secretsCreator, projectConfig);
    },
    getInfoProvider(projectConfig: ProjectConfig) {
      return new PostgresInfoProvider(projectConfig);
    },
  },
};

export const databaseGeneratorFactory = new GeneratorFactory(databaseGeneratorMapping);
export const databaseInfoProviderFactory = new InfoProviderFactory(databaseGeneratorMapping as GeneratorMapping<unknown, EnvVariableProvider & SecretProvider>);
export const availableDatabases = Object.keys(databaseGeneratorMapping);