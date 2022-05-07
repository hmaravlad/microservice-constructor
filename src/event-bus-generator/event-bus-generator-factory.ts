import { EventBus } from '../types/event-bus';
import KafkaEventBusGenerator from './kafka-event-bus-generator';
import { EnvVariableProvider } from './../types/env-provider';
import { GeneratorMapping } from '../types/generator-mapping';
import { KafkaInfoProvider } from './kafka-event-bus-generator/kafka-info-provider';
import { ProjectConfig } from '../types/project-config';
import { SecretsCreator } from '../secret-creator';
import { InfoProviderFactory } from '../info-provider-factory';
import { GeneratorFactory } from '../generator-factory';

// export function getEventBusGeneratorMapping(projectConfig: ProjectConfig): GeneratorMapping<EventBus, EnvVariableProvider> {
//   return {
//     'kafka': {
//       generator: new KafkaEventBusGenerator(),
//       infoProvider: new KafkaInfoProvider(projectConfig),
//     },
//   };
// }

export const eventBusGeneratorMapping: GeneratorMapping<EventBus, EnvVariableProvider> = {
  'kafka': {
    getGenerator(secretsCreator: SecretsCreator, projectConfig: ProjectConfig) {
      return new KafkaEventBusGenerator(secretsCreator, projectConfig);
    },
    getInfoProvider(projectConfig: ProjectConfig) {
      return new KafkaInfoProvider(projectConfig);
    },
  },
};

export const eventBusGeneratorFactory = new GeneratorFactory(eventBusGeneratorMapping);
export const eventBusInfoProviderFactory = new InfoProviderFactory(eventBusGeneratorMapping as GeneratorMapping<unknown, EnvVariableProvider>);
