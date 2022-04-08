import { ServerGeneratorFactory } from './server-generator/server-generator-factory';
import { File } from './types/file';
import { ServiceConfig } from './types/service-config';

export async function generateService(serviceConfig: ServiceConfig, serverGeneratorFactory: ServerGeneratorFactory): Promise<File[]> {
  const files: File[] = [];
  const serverGenerator = await serverGeneratorFactory.getServerGenerator(serviceConfig.lang);
  const serverFiles = serverGenerator.generateFiles(serviceConfig);
  files.push(...serverFiles);
  return files;
}

