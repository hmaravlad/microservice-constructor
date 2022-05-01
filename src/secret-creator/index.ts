import prompt from 'prompt';
import { CICDGeneratorFactory } from '../cicd-generator/cicd-generator-factory';
import { File } from '../types/file';
import { FilesGenerator } from '../types/files-generator';
import { ProjectConfig } from '../types/project-config';
import { Secret } from '../types/secret';
import { SecretsShTemplate } from './templates/secrets.sh.template';

export class SecretsCreator implements FilesGenerator<ProjectConfig> {
  secrets: Secret[] = [];

  addSecret(secret: string): void {
    this.secrets.push({ name: secret, value: '' });
  }

  async promptSecrets(): Promise<void> {
    prompt.start();

    for (const secret of this.secrets) {
      secret.value = await this.promptSecret(secret.name);
    }
  }
  
  async promptSecret(secretName: string): Promise<string> {
    const str = (await prompt.get({ name: secretName, message: `Please enter ${secretName}` }))[secretName];
    if (typeof str === 'string') {
      return str;
    }
    throw new Error('');
  }

  generateFiles(config: ProjectConfig): File[] {
    const cicdGenerator = new CICDGeneratorFactory(this).getCICDGenerator(`${config.ci.provider}-${config.ci.deployTarget}`);
    const secretCommands = cicdGenerator.getSetSecretsCommands(this.secrets);
    const file = new SecretsShTemplate().getFile(this.secrets);
    file.data += '\n\n\n' + secretCommands.join('\n');
    return [file];
  }
}
