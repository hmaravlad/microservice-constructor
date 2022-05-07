import { ProjectConfig } from '../types/project-config';
import GithubDoCICDGenerator from './github-do-cicd-generator';
import { SetSecretsCommandsProvider } from '../types/set-secrets-commands-provider';
import { SecretsCreator } from '../secret-creator';
import { GeneratorMapping } from '../types/generator-mapping';
import { GithubDoInfoProvider } from './github-do-cicd-generator/github-do-info-provider';
import { GeneratorFactory } from '../generator-factory';
import { InfoProviderFactory } from '../info-provider-factory';

const cicdGeneratorMapping: GeneratorMapping<ProjectConfig, SetSecretsCommandsProvider> = {
  'github-actions-digitalocean': {
    getGenerator(secretsCreator: SecretsCreator, projectConfig: ProjectConfig) {
      return new GithubDoCICDGenerator(secretsCreator, projectConfig);
    },
    getInfoProvider(projectConfig: ProjectConfig) {
      return new GithubDoInfoProvider(projectConfig);
    },
  },
};

export const cicdGeneratorFactory = new GeneratorFactory(cicdGeneratorMapping);
export const cicdInfoProviderFactory = new InfoProviderFactory(cicdGeneratorMapping as GeneratorMapping<unknown, SetSecretsCommandsProvider>);
