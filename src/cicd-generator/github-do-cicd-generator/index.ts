import { serverInfoProviderFactory } from '../../server-generator/server-generator-factory';
import { SecretsCreator } from '../../secret-creator';
import { File } from '../../types/file';
import { FilesGenerator } from '../../types/files-generator';
import { ProjectConfig } from '../../types/config/project-config';
import { ServiceConfig } from '../../types/config/service-config';
import { DeployManifestsYamlTemplate } from './templates/deploy-manifests.yaml.template';
import { DeployYamlTemplate } from './templates/deploy.yaml.template';
import { TestsYamlTemplate } from './templates/tests.yaml.template';

export default class GithubDoCICDGenerator implements FilesGenerator<ProjectConfig>  {
  constructor(
    private secretsCreator: SecretsCreator, 
    private projectConfig: ProjectConfig,
  ) {}

  generateFiles(config: ProjectConfig): File[] {
    this.addSecrets();
    const files: File[] = [];
    const deployTemplate = new DeployYamlTemplate(config);
    const deployManifestsTemplate = new DeployManifestsYamlTemplate();
    for (const service of config.services) {
      files.push(this.generateTestWorkflow(service));
      files.push(deployTemplate.getFile(service));
    }
    files.push(deployManifestsTemplate.getFile(this.secretsCreator.secrets.map(s => s.name)));
    return files;
  }

  generateTestWorkflow(serviceConfig: ServiceConfig): File {
    const serverInfoProvider = serverInfoProviderFactory.get(serviceConfig.lang, this.projectConfig);
    const testCommands = serverInfoProvider.getTestCommands();
    const serviceTestWorkflow = new TestsYamlTemplate(testCommands).getFile(serviceConfig);
    return serviceTestWorkflow;
  }

  addSecrets(): void {
    this.secretsCreator.addSecret('GH_TOKEN');
    this.secretsCreator.addSecret('DOCKER_USERNAME');
    this.secretsCreator.addSecret('DOCKER_PASSWORD');
    this.secretsCreator.addSecret('DIGITALOCEAN_ACCESS_TOKEN');
    this.secretsCreator.addSecret('CLUSTER_ID');
  }
}