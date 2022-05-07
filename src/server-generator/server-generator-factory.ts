import { TestCommandsProvider } from '../types/test-command-provider';
import { ServiceConfig } from '../types/config/service-config';
import TsNestServerGenerator from './ts-nest-server-generator';
import { GeneratorMapping } from '../types/generator-mapping';
import { TsNestInfoProvider } from './ts-nest-server-generator/ts-nest-info-provider';
import { SecretsCreator } from '../secret-creator';
import { ProjectConfig } from '../types/config/project-config';
import { GeneratorFactory } from '../generator-factory';
import { InfoProviderFactory } from '../info-provider-factory';

export const serverGeneratorMapping: GeneratorMapping<ServiceConfig, TestCommandsProvider> = {
  'ts-nest': {
    getGenerator(secretsCreator: SecretsCreator, projectConfig: ProjectConfig) {
      return new TsNestServerGenerator(secretsCreator, projectConfig);
    },
    getInfoProvider(projectConfig: ProjectConfig) {
      return new TsNestInfoProvider(projectConfig);
    },
  },
};

export const serverGeneratorFactory = new GeneratorFactory(serverGeneratorMapping);
export const serverInfoProviderFactory = new InfoProviderFactory(serverGeneratorMapping as GeneratorMapping<unknown, TestCommandsProvider>);
