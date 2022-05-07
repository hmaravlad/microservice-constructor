import { GeneratorMapping } from './types/generator-mapping';
import { ProjectConfig } from './types/config/project-config';

export class InfoProviderFactory<T> {
  constructor(public generatorMapping: GeneratorMapping<unknown, T>) {}

  get(type: string, projectConfig: ProjectConfig): T {
    const getInfoProvider = this.generatorMapping[type].getInfoProvider;
    if (!getInfoProvider) {
      throw new Error(`${type} is not supported`);
    } 
    return getInfoProvider(projectConfig);
  }
}