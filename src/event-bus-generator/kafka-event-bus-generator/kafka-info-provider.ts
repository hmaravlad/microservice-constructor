import { EnvVariableProvider } from '../../types/env-provider';
import { EnvVariable } from '../../types/env-variable';
import { ProjectConfig } from '../../types/project-config';

export class KafkaInfoProvider implements EnvVariableProvider {
  constructor(private projectConfig: ProjectConfig) {}

  getEnvVariables(): EnvVariable[] {
    return [];
  }
}