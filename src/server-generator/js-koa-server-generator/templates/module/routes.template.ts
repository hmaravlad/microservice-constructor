import { removeExtraWhiteSpace } from '../../../../utils/remove-extra-white-space';
import { File } from '../../../../types/file';
import { FileTemplate } from '../../../../types/file-template';
import { Endpoint, EndpointGroup } from '../../../../types/config/api-config';
import { ServiceConfig } from '../../../../types/config/service-config';
import { Capitalize } from '../../../../utils/case-utils';

export class RoutesTemplate implements FileTemplate<EndpointGroup> {
  constructor(
    private serviceConfig: ServiceConfig,
  ) { }

  getFile(endpointGroup: EndpointGroup): File {
    return {
      name: `${endpointGroup.name}.routes.ts`,
      path: `${this.serviceConfig.name}/src/${endpointGroup.name}/`,
      data: this.generateEndpoints(endpointGroup),
    };
  }

  private generateEndpoints(endpointGroup: EndpointGroup): string {
    const endpoints = endpointGroup.endpoints.map(endpoint => this.generateEndpoint(endpoint, endpointGroup));

    return removeExtraWhiteSpace(`
    import Router from 'koa-joi-router';
    import * as ${Capitalize(endpointGroup.name)}Validator from './${endpointGroup.name}.validators';
    import * as ${Capitalize(endpointGroup.name)}Controllers from './${endpointGroup.name}.controllers';
    `) + endpoints.join('\n\n');
  }

  private generateEndpoint(endpoint: Endpoint, endpointGroup: EndpointGroup): string {
    return removeExtraWhiteSpace(`
      ${endpointGroup.name}Router.${endpoint.method.toLowerCase()}(
        '/${endpointGroup.prefix}/${endpoint.path}',
        ${Capitalize(endpointGroup.name)}Validator.${endpoint.name},
        ${Capitalize(endpointGroup.name)}Controllers.${endpoint.name},
      );
    `);
  }
}

