import { File } from './../types/file';
import { FilesGenerator } from './../types/files-generator';
import { ProjectConfig } from './../types/project-config';
import { ServiceConfig } from './../types/service-config';
import { DeplTemplate } from './templates/depl.template';

export class ServiceK8SConfigGenerator implements FilesGenerator<ServiceConfig> {
  constructor(private projectConfig: ProjectConfig) {}

  generateFiles(config: ServiceConfig): File[] {
    const deplTemplate = new DeplTemplate(this.projectConfig);
    return [deplTemplate.getFile(config)];
  }
}