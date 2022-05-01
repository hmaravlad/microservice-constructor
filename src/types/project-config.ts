import { Database } from './database';
import { EventBus } from './event-bus';
import { ServiceConfig } from './service-config';

export interface ProjectConfig {
  name: string;
  hostname: string
  ci: {
    provider: string;
    deployTarget: string;
  };
  dockerUsername: string;
  eventBus: EventBus;
  services: ServiceConfig[];
  databases: Database[];
}
