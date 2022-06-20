import { ProjectConfig } from '../../types/config/project-config';
import { Secret } from '../../types/secret';
import { SetSecretsCommandsProvider } from '../../types/set-secrets-commands-provider';

export class GithubDoInfoProvider implements SetSecretsCommandsProvider {
  constructor(private projectConfig: ProjectConfig) {}

  getSetSecretsCommands(secrets: Secret[]): string[] {
    const commands = ['echo $GH_TOKEN | gh auth login --with-token'];
    commands.push(...secrets.map(secret => `gh secret set ${secret.name} --body "$${secret.name}"`));
    return commands;
  }
}