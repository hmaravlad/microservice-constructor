import { File } from './file';
import { ProjectConfig } from './project-config';
import { ServiceConfig } from './service-config';

export interface ProjectFileTemplate {
  getFile: (config: ProjectConfig) => File
}

export interface ServiceFileTemplate {
  getFile: (config: ServiceConfig) => File
}