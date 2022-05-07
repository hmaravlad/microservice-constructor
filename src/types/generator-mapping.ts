import { SecretsCreator } from '../secret-creator';
import { FilesGenerator } from './files-generator';
import { ProjectConfig } from './config/project-config';

export type GeneratorMapping<T, K> = {
  [key: string]: {
    getGenerator: (secretsCreator: SecretsCreator, projectConfig: ProjectConfig) => FilesGenerator<T>,
    getInfoProvider?: (projectConfig: ProjectConfig) => K
  }
};
