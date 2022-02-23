import { File } from './file';
import { ProjectConfig } from './project-config';
import { ServiceConfig } from './service-config';

export interface ProjectFilesGenerator {
  generateFiles: (config: ProjectConfig) => File[]
}

export interface ServiceFilesGenerator {
  generateFiles: (config: ServiceConfig) => File[]
}

export function isProjectFilesGenerator(obj: unknown): obj is ProjectFilesGenerator {
  return (obj as ProjectFilesGenerator).generateFiles !== undefined;
}

export function isServiceFilesGenerator(obj: unknown): obj is ServiceFilesGenerator {
  return (obj as ServiceFilesGenerator).generateFiles !== undefined;
}