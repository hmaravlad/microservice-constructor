import { CICDGeneratorFactory } from './cicd-generator/cicd-generator-factory';
import { DatabaseGeneratorFactory } from './database-generator/database-generator-factory';
import { EventBusGeneratorFactory } from './event-bus-generator/event-bus-generator-factory';
import { GatewayGenerator } from './gateway-generator';
import { SecretsCreator } from './secret-creator';
import { ServerGeneratorFactory } from './server-generator/server-generator-factory';
import { generateService } from './service-generator';
import { ServiceK8SConfigGenerator } from './service-k8s-config-generator/service-k8s-config-generator';
import { File } from './types/file';
import { ProjectConfig } from './types/project-config';

export async function generateProject(projectConfig: ProjectConfig): Promise<File[]> {
  const secretsCreator = new SecretsCreator();
  const files: File[] = [];
  const serverGeneratorFactory = new ServerGeneratorFactory();
  for (const service of projectConfig.services) {
    files.push(...await generateService(service, serverGeneratorFactory));
  }
  const gatewayGenerator = new GatewayGenerator();
  files.push(...gatewayGenerator.generateFiles(projectConfig));
  const providers = `${projectConfig.ci.provider}-${projectConfig.ci.deployTarget}`;
  const cicdGenerator = new CICDGeneratorFactory(secretsCreator).getCICDGenerator(providers);
  files.push(...cicdGenerator.generateFiles(projectConfig));
  const eventBusGenerator = new EventBusGeneratorFactory().getEventBusGenerator(projectConfig.eventBus.type);
  files.push(...eventBusGenerator.generateFiles(projectConfig.eventBus));
  const databaseGeneratorFactory = new DatabaseGeneratorFactory(secretsCreator);
  for (const database of projectConfig.databases) {
    const databaseGenerator = databaseGeneratorFactory.getDatabaseGenerator(database.type);
    files.push(...databaseGenerator.generateFiles(database));
  }
  const serviceK8SConfigGenerator = new ServiceK8SConfigGenerator(projectConfig);
  for (const serviceConfig of projectConfig.services) {
    files.push(...serviceK8SConfigGenerator.generateFiles(serviceConfig));
  }
  await secretsCreator.promptSecrets();
  files.push(...secretsCreator.generateFiles(projectConfig));
  return files;
}

