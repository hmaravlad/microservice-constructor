import { Capitalize } from '../../../../utils/case-utils';
import { File } from '../../../../types/file';
import { FileTemplate } from '../../../../types/file-template';
import { Endpoint, EndpointGroup } from '../../../../types/config/api-config';
import { ServiceConfig } from '../../../../types/config/service-config';
import { getTypeName } from '../../get-type-name';
import { getParams } from '../../path-parsing';
import { removeExtraWhiteSpace } from '../../../../utils/remove-extra-white-space';
import { prepareIndentation, resolveIndentation } from '../../../../utils/handle-indentation';

export class ServiceTemplate implements FileTemplate<EndpointGroup> {
  constructor(
    private serviceConfig: ServiceConfig,
  ) { }

  getFile(endpointGroup: EndpointGroup): File {
    return {
      name: `${endpointGroup.name}.service.ts`,
      path: `${this.serviceConfig.name}/src/${endpointGroup.name}/`,
      data: resolveIndentation(this.generateData(endpointGroup)),
    };
  }

  private generateData(endpointGroup: EndpointGroup): string {
    const imports = this.generateImports(endpointGroup);

    const services = endpointGroup.endpoints.map(endpoint => this.generateEndpointService(endpoint, endpointGroup)).join('\n\n');

    return imports + '\n\n' + services;
  }

  private generateImports(endpointGroup: EndpointGroup): string {
    const types = endpointGroup.entities.map(entity => Capitalize(entity.name)).join(', ');
    return `import { ${types} } from './${endpointGroup.name}.types';`;
  }

  private generateEndpointService(endpoint: Endpoint, endpointGroup: EndpointGroup): string {
    const bodyArgStr = endpoint.request ? `body: ${getTypeName(endpoint.request.content, endpointGroup)}` : '';

    const params = getParams(endpoint);
    const paramArgStrs = params.map(param => `${param}: string`);

    const argsString = [bodyArgStr, ...paramArgStrs].filter(x => !!x).join(', ');

    return prepareIndentation(removeExtraWhiteSpace(`
      export const ${endpoint.name} = async (${argsString}) => {
        throw new Error('NOT IMPLEMENTED')
      }`,
    ));
  }
}

