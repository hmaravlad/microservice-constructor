import { CICDGeneratorFactory } from './cicd-generator/cicd-generator-factory';
import { DatabaseGeneratorFactory } from './database-generator/database-generator-factory';
import { EventBusGeneratorFactory } from './event-bus-generator/event-bus-generator-factory';
import { InfrastructureGenerator } from './infrastructure-generator';
import { ServerGeneratorFactory } from './server-generator/server-generator-factory';
import { generateService } from './service-generator';
import { File } from './types/file';
import { ProjectConfig } from './types/project-config';

export async function generateProject(projectConfig: ProjectConfig): Promise<File[]> {
  const files: File[] = [];
  const serverGeneratorFactory = new ServerGeneratorFactory();
  for (const service of projectConfig.services) {
    files.push(...await generateService(service, serverGeneratorFactory));
  }
  const infrastructureGenerator = new InfrastructureGenerator();
  files.push(...infrastructureGenerator.generateFiles(projectConfig));
  const providers = `${projectConfig.ci.provider}-${projectConfig.ci.deployTarget}`;
  const cicdGenerator = new CICDGeneratorFactory().getCICDGenerator(providers);
  files.push(...cicdGenerator.generateFiles(projectConfig));
  const eventBusGenerator = new EventBusGeneratorFactory().getEventBusGenerator(projectConfig.eventBus.type);
  files.push(...eventBusGenerator.generateFiles(projectConfig.eventBus));
  const databaseGeneratorFactory = new DatabaseGeneratorFactory();
  for (const database of projectConfig.databases) {
    const databaseGenerator = databaseGeneratorFactory.getDatabaseGenerator(database.type);
    files.push(...databaseGenerator.generateFiles(database));
  }
  return files;
}

