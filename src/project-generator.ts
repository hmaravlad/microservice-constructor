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
  return files;
}

