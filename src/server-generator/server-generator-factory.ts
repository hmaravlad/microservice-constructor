import { existsSync } from 'fs'; 
import { FilesGenerator, isFilesGenerator } from '../types/files-generator';
import { ServiceConfig } from '../types/service-config';

export class ServerGeneratorFactory {
  async getServerGenerator(lang: string): Promise<FilesGenerator<ServiceConfig>> {
    if (existsSync(__dirname + '/' + lang + '-server-generator')) {
      const ServerGenerator = (await import(__dirname + '/' + lang + '-server-generator')).default;
      const serverGenerator = new ServerGenerator();
      if (isFilesGenerator(serverGenerator)) {
        return serverGenerator;
      }
    } 
    throw new Error(`Language ${lang} is not supported`);
  }
}