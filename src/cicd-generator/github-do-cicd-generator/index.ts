import { SecretsCreator } from '../../secret-creator';
import { Secret } from '../../types/secret';
import { SetSecretsCommandsProvider } from '../../types/set-secrets-commands-provider';
import { ServerGeneratorFactory } from '../../server-generator/server-generator-factory';
import { File } from '../../types/file';
import { FilesGenerator } from '../../types/files-generator';
import { ProjectConfig } from '../../types/project-config';
import { ServiceConfig } from '../../types/service-config';
import { DeployManifestsYamlTemplate } from './templates/deploy-manifests.yaml.template';
import { DeployYamlTemplate } from './templates/deploy.yaml.template';
import { TestsYamlTemplate } from './templates/tests.yaml.template';

export default class GithubDoCICDGenerator implements FilesGenerator<ProjectConfig>, SetSecretsCommandsProvider {
  constructor(private secretsCreator: SecretsCreator) {}

  generateFiles(config: ProjectConfig): File[] {
    this.addSecrets();
    const files: File[] = [];
    const serverGeneratorFactory = new ServerGeneratorFactory();
    const deployTemplate = new DeployYamlTemplate(config);
    const deployManifestsTemplate = new DeployManifestsYamlTemplate();
    for (const service of config.services) {
      files.push(this.generateTestWorkflow(service, serverGeneratorFactory));
      files.push(deployTemplate.getFile(service));
    }
    files.push(deployManifestsTemplate.getFile(config));
    return files;
  }

  generateTestWorkflow(serviceConfig: ServiceConfig, serverGeneratorFactory: ServerGeneratorFactory): File {
    const serverGenerator = serverGeneratorFactory.getServerGenerator(serviceConfig.lang);
    const testCommands = serverGenerator.getTestCommands();
    const serviceTestWorkflow = new TestsYamlTemplate(testCommands).getFile(serviceConfig);
    return serviceTestWorkflow;
  }

  addSecrets(): void {
    this.secretsCreator.addSecret('GH_TOKEN');
  }

  getSetSecretsCommands(secrets: Secret[]): string[] {
    const commands = ['gh auth login --with-token $GH_TOKEN'];
    commands.push(...secrets.map(secret => `gh secret set ${secret.name} --body "$${secret.name}"`));
    return commands;
  }
}