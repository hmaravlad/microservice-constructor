import { File } from '../../types/file';
import { FileTemplate } from '../../types/file-template';
import { FilesGenerator } from '../../types/files-generator';
import { EndpointGroup } from '../../types/config/api-config';
import { ServiceConfig } from '../../types/config/service-config';
import { RoutesTemplate } from './templates/module/routes.template';
import { ServiceTemplate } from './templates/module/service.template';
import { ValidatorsTemplate } from './templates/module/validators.template';
import { TypesTemplate } from './templates/module/types.template';

export default class ModuleGenerator implements FilesGenerator<EndpointGroup> {
  constructor(private serviceConfig: ServiceConfig) {}

  templates: FileTemplate<EndpointGroup>[] = [
    new ServiceTemplate(this.serviceConfig),
    new RoutesTemplate(this.serviceConfig),
    new ValidatorsTemplate(this.serviceConfig),
    new TypesTemplate(this.serviceConfig),
  ]; 

  generateFiles(endpointGroup: EndpointGroup): File[] {
    const files: File[] = [];
    for (const template of this.templates) {
      files.push(template.getFile(endpointGroup));
    }
    return files;
  }
}