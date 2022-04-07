import { Capitalize } from '../../../../utils/case-utils';
import { File } from '../../../../types/file';
import { FileTemplate } from '../../../../types/file-template';
import { EndpointGroup, ServiceConfig } from '../../../../types/service-config';

export class ModuleTemplate implements FileTemplate<EndpointGroup> {
  constructor(
    private serviceConfig: ServiceConfig,
  ) { }

  getFile(endpointGroup: EndpointGroup): File {
    return {
      name: `${endpointGroup.name}.module.ts`,
      path: `${this.serviceConfig.name}/src/${endpointGroup.name}/`,
      data: `
      import { Module } from '@nestjs/common';
      import { ${Capitalize(endpointGroup.name)}Controller } from './${endpointGroup.name}.controller';

      @Module({
        controllers: [${Capitalize(endpointGroup.name)}Controller],
      })
      export class ${Capitalize(endpointGroup.name)}Module {}
      `,
    };
  }
}

