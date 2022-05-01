import { FilesGenerator } from '../types/files-generator';
import { EventBus } from '../types/event-bus';
import KafkaEventBusGenerator from './kafka-event-bus-generator';
import { EnvVariableProvider } from './../types/env-provider';

export const eventBusGenerators: { [key: string]: FilesGenerator<EventBus> & EnvVariableProvider<EventBus> } = {
  'kafka': new KafkaEventBusGenerator(),
};

export class EventBusGeneratorFactory {
  getEventBusGenerator(type: string): FilesGenerator<EventBus> & EnvVariableProvider<EventBus> {
    const eventBusGenerator = eventBusGenerators[type];
    if (!eventBusGenerator) {
      throw new Error(`Event bus ${type} are not supported`);
    } 
    return eventBusGenerator;
  }
}