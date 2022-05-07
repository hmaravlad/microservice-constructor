/* eslint-disable @typescript-eslint/no-explicit-any */
import { GeneratorFactory } from 'src/generator-factory';
import { SecretsCreator } from 'src/secret-creator';
import { File } from 'src/types/file';
import { ProjectConfig } from 'src/types/project-config';

const generateFromOneInput = <T extends { [key: string]: any }>(factory: GeneratorFactory<T>, input: T, typeField: string, secretsCreator: SecretsCreator, projectConfig: ProjectConfig) => {
  const type = input[typeField];
  if (typeof type !== 'string') throw new Error(`Type field ${typeField} is invalid`);
  const generator = factory.get(type, secretsCreator, projectConfig);
  return generator.generateFiles(input);
};

export const getFilesGetter = (secretsCreator: SecretsCreator, projectConfig: ProjectConfig) => <T extends { [key: string]: any }>(factory: GeneratorFactory<T>, inputData: T | T[], typeField: string): File[] => {
  const files: File[] = [];
  if (Array.isArray(inputData)) {
    for (const input of inputData) {
      files.push(...generateFromOneInput(factory, input, typeField, secretsCreator, projectConfig));
    }
  } else {
    files.push(...generateFromOneInput(factory, inputData, typeField, secretsCreator, projectConfig));
  }
  return files;
};
