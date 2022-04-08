import { removeExtraWhiteSpace } from '../../../../utils/remove-extra-white-space';
import { File } from '../../../../types/file';
import { FileTemplate } from '../../../../types/file-template';
import { EndpointGroup, Entity, Field, ServiceConfig, Value } from '../../../../types/service-config';
import { getTypeName } from '../../get-type-name';
import { addIndentation } from '../../../../utils/add-indentation';
import { Capitalize, Decapitalize } from '../../../../utils/case-utils';
import { getDistinct } from '../../../../utils/distinct';
import { removeEmptyLines } from '../../../../utils/remove-empty-lines';
import { isArray } from '../../../../utils/is-array';
import { getNonArrayType } from '../../../../utils/get-array-item-type';

export class DtoTemplate implements FileTemplate<Entity> {
  constructor(
    private endpointGroup: EndpointGroup,
    private serviceConfig: ServiceConfig,
  ) { }

  getFile(entity: Entity): File {
    return {
      name: `${entity.name}.dto.ts`,
      path: `${this.serviceConfig.name}/src/${this.endpointGroup.name}/dto`,
      data: this.generateDto(entity),
    };
  }

  private generateDto(entity: Entity): string {
    const imports: string[] = [];

    const fields = entity.fields.map(field => this.generateField(field, imports));

    const dto = removeExtraWhiteSpace(`
      ${this.serviceConfig.docs ? "import { ApiProperty } from '@nestjs/swagger';" : ''}

      export class ${Capitalize(entity.name)} {
        ${addIndentation(fields.join('\n\n'), '\t\t\t\t', true)}
      }`);

    return getDistinct(imports).map(name => `import { ${name} } from './${Decapitalize(name)}.dto';`).join('\n') + dto;
  }

  private generateField(field: Field, imports: string[]): string {
    const typeName = getTypeName(field as Value, this.endpointGroup, imports);
    return removeEmptyLines(removeExtraWhiteSpace(`
      ${this.serviceConfig.docs ? `@ApiProperty(${isArray(typeName) ? `{ type: ${getNonArrayType(typeName)}, isArray: true }` : ''})` : ''}
      ${field.name}: ${typeName};
    `));
  }
}
