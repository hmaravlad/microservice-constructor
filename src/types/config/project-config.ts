import { Database } from './database';
import { EventBus } from './event-bus';
import { Gateway } from './gateway';
import { ServiceConfig } from './service-config';

export class ProjectConfig {
  name: string;

  cicd: string;

  dockerUsername: string;

  gateways: Gateway[];

  eventBuses: EventBus[];

  services: ServiceConfig[];

  databases: Database[];
}
