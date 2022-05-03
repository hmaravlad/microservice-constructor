import { Database } from './database';
import { EventBus } from './event-bus';
import { Gateway } from './gateway';
import { ServiceConfig } from './service-config';

export interface ProjectConfig {
  name: string;
  ci: {
    provider: string;
    deployTarget: string;
  };
  dockerUsername: string;
  gateways: Gateway[];
  eventBus: EventBus;
  services: ServiceConfig[];
  databases: Database[];
}
