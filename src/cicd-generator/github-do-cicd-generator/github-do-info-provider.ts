import { ProjectConfig } from '../../types/config/project-config';
import { Secret } from '../../types/secret';
import { SetSecretsCommandsProvider } from '../../types/set-secrets-commands-provider';

export class GithubDoInfoProvider implements SetSecretsCommandsProvider {
  constructor(private projectConfig: ProjectConfig) {}

  getSetSecretsCommands(secrets: Secret[]): string[] {
    const commands = ['gh auth login --with-token $GH_TOKEN'];
    commands.push(...secrets.map(secret => `gh secret set ${secret.name} --body "$${secret.name}"`));
    return commands;
  }
}