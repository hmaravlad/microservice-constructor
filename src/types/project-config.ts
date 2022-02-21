import { ServiceConfig } from "./service-config";

export interface ProjectConfig {
  name: string;
  ci: {
    provider: string;
    deployTarget: string;
  };
  services: ServiceConfig[];
}
