import { Secret } from './secret';

export interface SetSecretsCommandsProvider {
  getSetSecretsCommands(secrets: Secret[]): string[];
}
