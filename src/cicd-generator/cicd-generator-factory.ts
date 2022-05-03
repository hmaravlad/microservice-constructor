import { ProjectConfig } from '../types/project-config';
import { FilesGenerator } from '../types/files-generator';
import GithubDoCICDGenerator from './github-do-cicd-generator';
import { SetSecretsCommandsProvider } from '../types/set-secrets-commands-provider';
import { SecretsCreator } from '../secret-creator';

export class CICDGeneratorFactory {
  constructor(private secretsCreator: SecretsCreator) {}

  cicdGenerators: { [key: string]: FilesGenerator<ProjectConfig> & SetSecretsCommandsProvider } = {
    'github-actions-digitalocean': new GithubDoCICDGenerator(this.secretsCreator),
  };

  getCICDGenerator(providers: string): FilesGenerator<ProjectConfig> & SetSecretsCommandsProvider {
    const cicdGenerator = this.cicdGenerators[providers];
    if (!cicdGenerator) {
      throw new Error(`Providers ${providers} are not supported`);
    } 
    return cicdGenerator;
  }
}