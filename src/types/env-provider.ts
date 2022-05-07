import { EnvVariable } from './env-variable';

export interface EnvVariableProvider {
  getEnvVariables(id: number): EnvVariable[];
}

export interface SecretProvider {
  getSecrets(id: number): string[];
}
