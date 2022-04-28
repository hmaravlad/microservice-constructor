import { TestCommandsProvider } from '../types/test-command-provider';
import { FilesGenerator } from '../types/files-generator';
import { ServiceConfig } from '../types/service-config';
import TsNestServerGenerator from './ts-nest-server-generator';

export const serverGenerators: { [key: string]: FilesGenerator<ServiceConfig> & TestCommandsProvider } = {
  'ts-nest': new TsNestServerGenerator(),
};

export class ServerGeneratorFactory {
  getServerGenerator(lang: string): FilesGenerator<ServiceConfig> & TestCommandsProvider {
    const serverGenerator = serverGenerators[lang];
    if (!serverGenerators) {
      throw new Error(`Language ${lang} is not supported`);
    } 
    return serverGenerator;
  }
}