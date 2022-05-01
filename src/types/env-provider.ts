import { EnvVariable } from './env-variable';

export interface EnvVariableProvider<T> {
  getEnvVariables(param: T): EnvVariable[];
}

export interface SecretProvider<T> {
  getSecrets(param: T): string[];
}
