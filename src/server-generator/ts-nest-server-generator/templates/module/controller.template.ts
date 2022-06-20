import { removeExtraWhiteSpace } from '../../../../utils/remove-extra-white-space';
import { File } from '../../../../types/file';
import { FileTemplate } from '../../../../types/file-template';
import { Endpoint, EndpointGroup, Value } from '../../../../types/config/api-config';
import { ServiceConfig } from '../../../../types/config/service-config';
import { getTypeName } from '../../get-type-name';
import { getParams } from '../../path-parsing';
import { addIndentation } from '../../../../utils/add-indentation';
import { Capitalize, Decapitalize } from '../../../../utils/case-utils';
import { getDistinct } from '../../../../utils/distinct';
import { removeEmptyLines } from '../../../../utils/remove-empty-lines';
import { isArray } from '../../../../utils/is-array';
import { getNonArrayType } from '../../../../utils/get-array-item-type';

export class ControllerTemplate implements FileTemplate<EndpointGroup> {
  constructor(
    private serviceConfig: ServiceConfig,
  ) { }

  getFile(endpointGroup: EndpointGroup): File {
    return {
      name: `${endpointGroup.name}.controller.ts`,
      path: `${this.serviceConfig.name}/src/${endpointGroup.name}/`,
      data: this.generateEndpoints(endpointGroup),
    };
  }

  private generateEndpoints(endpointGroup: EndpointGroup): string {
    this.fixMethods(endpointGroup);

    const imports: string[] = [];

    const endpoints = endpointGroup.endpoints.map(endpoint => this.generateEndpoint(endpoint, endpointGroup, imports));

    const dto = removeExtraWhiteSpace(`
      ${this.serviceConfig.docs ? `@ApiTags('${endpointGroup.name}')` : ''}
      @Controller('${endpointGroup.prefix}')
      export class ${Capitalize(endpointGroup.name)}Controller {
        ${addIndentation(endpoints.join('\n\n'), '\t\t\t\t', true)}
      }`);

    const nestJsImports = this.generateNestjsImports(endpointGroup);

    const swaggerImports = this.serviceConfig.docs ? "import { ApiTags, ApiResponse } from '@nestjs/swagger';\n" : '';

    return nestJsImports + '\n' + swaggerImports + getDistinct(imports).map(name => `import { ${name} } from './dto/${Decapitalize(name)}.dto';`).join('\n') + '\n' + dto;
  }

  private generateEndpoint(endpoint: Endpoint, endpointGroup: EndpointGroup, imports: string[]): string {
    const bodyType = this.getExchangeContentType(endpoint.request?.content, endpointGroup, imports);
    const responseType = this.getExchangeContentType(endpoint.response?.content, endpointGroup, imports);
    const body = bodyType ? `@Body() body: ${bodyType}` : undefined;
    const params = getParams(endpoint).map(param => `@Param('${param}') ${param}: string`);
    if (body) params.unshift(body);
    const statusCode = endpoint.response?.statusCode;
    const statusCodeStr = `@HttpCode(${statusCode})`;

    return removeEmptyLines(removeExtraWhiteSpace(`
      @${Capitalize(endpoint.method)}('${endpoint.path}') 
      ${statusCode ? '\n\t\t\t' + statusCodeStr : ''}
      ${this.serviceConfig.docs && (statusCode || responseType) ? `
      @ApiResponse({ 
        ${statusCode ? `status: ${statusCode},` : ''}
        ${responseType ? `type: ${this.fixPrimitiveTypeName(getNonArrayType(responseType))},` : ''}
        ${isArray(responseType || '') ? 'isArray: true,' : ''}
      })
      ` : ''}
      ${endpoint.name}(${params.join(', ')}): ${responseType || 'void'} {
        throw new NotImplementedException();
      }`));
  }

  private getExchangeContentType(value: Value | undefined, endpointGroup: EndpointGroup, imports: string[]): string | undefined {
    if (value === undefined) {
      return undefined;
    }
    return getTypeName(value, endpointGroup, imports);
  }

  private generateNestjsImports(endpointGroup: EndpointGroup): string {
    const imports = ['Controller', 'NotImplementedException'];
    for (const endpoint of endpointGroup.endpoints) {
      imports.push(endpoint.method);
      if (endpoint.path.includes(':')) imports.push('Param');
      if (endpoint.request) imports.push('Body');
      if (endpoint.response?.statusCode) imports.push('HttpCode');
    }
    return `import { ${getDistinct(imports).join(', ')} } from '@nestjs/common';`;
  }

  private fixPrimitiveTypeName(type: string): string {
    if (type === 'string' || type === 'boolean' || type === 'number') {
      return "'" + type + "'";
    }
    return type;
  }

  private fixMethods(endpointGroup: EndpointGroup): void {
    for (const endpoint of endpointGroup.endpoints) {
      endpoint.method = Capitalize(endpoint.method.toLowerCase());
    }
  }
}

