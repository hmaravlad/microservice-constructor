/* eslint-disable @typescript-eslint/ban-types */
import { Database } from './database';
import { EventBus } from './event-bus';
import { Gateway } from './gateway';
import { ServiceConfig } from './service-config';
import { StringField } from '../../decorators/string-field';
import { Entity } from '../../decorators/entity';
import { EnumField } from '../../decorators/enum-field';
import { availableCICDSetups } from '../../cicd-generator/cicd-generator-factory';

export class ProjectConfig {
  @StringField
  name: string;

  @EnumField(availableCICDSetups)
  cicd: string;

  @StringField
  dockerUsername: string;

  @Entity('gateway', Gateway)
  gateways: Gateway[];

  @Entity('eventBus', EventBus)
  eventBuses: EventBus[];

  @Entity('service', ServiceConfig)
  services: ServiceConfig[];

  @Entity('database', Database)
  databases: Database[];
}

