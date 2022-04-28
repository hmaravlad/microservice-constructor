import { ProjectConfig } from '../types/project-config';
import { FilesGenerator } from '../types/files-generator';
import GithubDoCICDGenerator from './github-do-cicd-generator';

export const cicdGenerators: { [key: string]: FilesGenerator<ProjectConfig> } = {
  'github-actions-digitalocean': new GithubDoCICDGenerator(),
};

export class CICDGeneratorFactory {
  getCICDGenerator(providers: string): FilesGenerator<ProjectConfig> {
    const cicdGenerator = cicdGenerators[providers];
    if (!cicdGenerator) {
      throw new Error(`Providers ${providers} are not supported`);
    } 
    return cicdGenerator;
  }
}