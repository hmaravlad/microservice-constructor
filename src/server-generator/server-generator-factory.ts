import { ServiceFilesGenerator, isServiceFilesGenerator } from '../types/files-generator';
import { existsSync } from 'fs'; 

export class ServerGeneratorFactory {
  async getServerGenerator(lang: string): Promise<ServiceFilesGenerator> {
    if (existsSync(__dirname + '/' + lang + '-server-generator')) {
      const ServerGenerator = (await import(__dirname + '/' + lang + '-server-generator')).default;
      const serverGenerator = new ServerGenerator();
      if (isServiceFilesGenerator(serverGenerator)) {
        return serverGenerator;
      }
    } 
    throw new Error(`Language ${lang} is not supported`);
  }
}