import { APIConfig } from './api-config';

export class ServiceConfig {
  id: number;

  name: string;

  type: string;

  lang: string;

  port: number;

  docs: boolean;

  replicas: number;

  databaseIds: number[];

  eventBusIds: number[];

  api?: APIConfig;
}
