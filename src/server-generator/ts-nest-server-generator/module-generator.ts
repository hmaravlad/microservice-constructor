import { File } from '../../types/file';
import { FileTemplate } from '../../types/file-template';
import { FilesGenerator } from '../../types/files-generator';
import { EndpointGroup, ServiceConfig } from '../../types/config/service-config';
import { ControllerTemplate } from './templates/module/controller.template';
import { DtoTemplate } from './templates/module/dto.template';
import { ModuleTemplate } from './templates/module/module.template';

export default class ModuleGenerator implements FilesGenerator<EndpointGroup> {
  constructor(private serviceConfig: ServiceConfig) {}

  templates: FileTemplate<EndpointGroup>[] = [
    new ControllerTemplate(this.serviceConfig),
    new ModuleTemplate(this.serviceConfig),
  ]; 

  generateFiles(endpointGroup: EndpointGroup): File[] {
    const files: File[] = [];
    for (const template of this.templates) {
      files.push(template.getFile(endpointGroup));
    }
    const dtoTemplate = new DtoTemplate(endpointGroup, this.serviceConfig);
    for (const entity of endpointGroup.entities) {
      files.push(dtoTemplate.getFile(entity));
    }
    return files;
  }
}