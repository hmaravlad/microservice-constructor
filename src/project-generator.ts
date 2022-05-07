import { cicdGeneratorFactory } from './cicd-generator/cicd-generator-factory';
import { databaseGeneratorFactory } from './database-generator/database-generator-factory';
import { eventBusGeneratorFactory } from './event-bus-generator/event-bus-generator-factory';
import { GatewayGenerator } from './gateway-generator';
import { SecretsCreator } from './secret-creator';
import { serverGeneratorFactory } from './server-generator/server-generator-factory';
import { ServiceK8SConfigGenerator } from './service-k8s-config-generator/service-k8s-config-generator';
import { File } from './types/file';
import { ProjectConfig } from './types/project-config';
import { getFilesGetter } from './utils/get-files-getter';


export async function generateProject(projectConfig: ProjectConfig): Promise<File[]> {
  const secretsCreator = new SecretsCreator();
  
  const getFiles = getFilesGetter(secretsCreator, projectConfig);
  const serviceK8SConfigGenerator = new ServiceK8SConfigGenerator(projectConfig);

  const files = [
    ...getFiles(serverGeneratorFactory, projectConfig.services, 'lang'),
    ...getFiles(databaseGeneratorFactory, projectConfig.databases, 'type'),
    ...getFiles(eventBusGeneratorFactory, projectConfig.eventBuses, 'type'),
    ...getFiles(cicdGeneratorFactory, projectConfig, 'cicd'),
    ...new GatewayGenerator().generateFiles(projectConfig),
    ...projectConfig.services.flatMap(service => serviceK8SConfigGenerator.generateFiles(service)),
  ];

  await secretsCreator.promptSecrets();
  files.push(...secretsCreator.generateFiles(projectConfig));

  return files;
}

