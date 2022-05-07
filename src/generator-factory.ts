import { SecretsCreator } from './secret-creator';
import { FilesGenerator } from './types/files-generator';
import { GeneratorMapping } from './types/generator-mapping';
import { ProjectConfig } from './types/config/project-config';

export class GeneratorFactory<T> {
  constructor(public generatorMapping: GeneratorMapping<T, unknown>) {}

  get(type: string, secretsCreator: SecretsCreator, projectConfig: ProjectConfig): FilesGenerator<T> {
    const getGenerator = this.generatorMapping[type].getGenerator;
    if (!getGenerator) {
      throw new Error(`${type} is not supported`);
    } 
    return getGenerator(secretsCreator, projectConfig);
  }
}