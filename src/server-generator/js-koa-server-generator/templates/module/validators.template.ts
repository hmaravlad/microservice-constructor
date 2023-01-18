import { removeExtraWhiteSpace } from '../../../../utils/remove-extra-white-space';
import { File } from '../../../../types/file';
import { FileTemplate } from '../../../../types/file-template';
import { Endpoint, EndpointGroup, Entity, Field, Value } from '../../../../types/config/api-config';
import { ServiceConfig } from '../../../../types/config/service-config';
import { Capitalize } from '../../../../utils/case-utils';
import { removeEmptyLines } from '../../../../utils/remove-empty-lines';
import { getParams } from '../../path-parsing';
import { getJoiType } from '../../get-joi-type';
import { prepareIndentation, resolveIndentation } from '../../../../utils/handle-indentation';

export class ValidatorsTemplate implements FileTemplate<EndpointGroup> {
  constructor(
    private serviceConfig: ServiceConfig,
  ) { }

  getFile(endpointGroup: EndpointGroup): File {
    return {
      name: `${endpointGroup.name}.validators.ts`,
      path: `${this.serviceConfig.name}/src/${endpointGroup.name}/`,
      data: resolveIndentation(this.generateData(endpointGroup)),
    };
  }

  private generateData(endpointGroup: EndpointGroup): string {
    const types = endpointGroup.entities.map(entity => this.generateType(entity, endpointGroup)).join('\n\n');

    const endpoints = endpointGroup.endpoints.map(endpoint => this.generateValidator(endpoint, endpointGroup)).join('\n\n');

    return "import Joi from 'koa-joi-router';\n\n" +  types + '\n\n' + endpoints;
  }

  private generateValidator(endpoint: Endpoint, endpointGroup: EndpointGroup): string {
    const params = getParams(endpoint);
    const paramsStr = this.generateParamsValidate(params);
    const bodyStr = this.generateBodyValidate(endpoint, endpointGroup);
    const responseStr = this.generateResponseValidate(endpoint, endpointGroup);

    return prepareIndentation(removeEmptyLines(removeExtraWhiteSpace(`
      export const ${endpoint.name}: Router.Config = {
        validate: {
          ${paramsStr}
          ${bodyStr}
          ${responseStr}
        }
      } 
    `)));
  }

  private generateBodyValidate(endpoint: Endpoint, endpointGroup: EndpointGroup): string {
    if (!endpoint.request) {
      return '';
    }

    return `body: ${getJoiType(endpoint.request.content, endpointGroup)},`;
  }

  private generateResponseValidate(endpoint: Endpoint, endpointGroup: EndpointGroup): string {
    if (!endpoint.response) {
      return '';
    }

    return prepareIndentation(removeExtraWhiteSpace(
      `output: {
        ${endpoint.response.statusCode}: ${getJoiType(endpoint.response.content, endpointGroup)},
      },`,
    ));
  }

  private generateParamsValidate(params: string[]): string {
    if (!params.length) {
      return '';
    }

    return prepareIndentation(removeExtraWhiteSpace(
      `params: {
        ${params.map(param => this.generateParam(param)).join('\n')}
      }`,
    ));
  }

  private generateParam(param: string): string {
    return `${param}: Joi.string().required(),`;
  }

  private generateType(entity: Entity, endpointGroup: EndpointGroup): string {
    const fields = entity.fields.map(field => this.generateField(field, endpointGroup));

    const type = prepareIndentation(removeExtraWhiteSpace(resolveIndentation(`
      const ${Capitalize(entity.name)} = Joi.object({
        ${prepareIndentation(fields.join('\n'))}
      });`)));

    return type;
  }

  private generateField(field: Field, endpointGroup: EndpointGroup): string {
    const typeName = getJoiType(field as Value, endpointGroup);
    return removeEmptyLines(removeExtraWhiteSpace(`
      ${field.name}: ${typeName},
    `));
  }
}
