import { removeExtraWhiteSpace } from '../../../../utils/remove-extra-white-space';
import { File } from '../../../../types/file';
import { FileTemplate } from '../../../../types/file-template';
import { EndpointGroup, Entity, Field, Value } from '../../../../types/config/api-config';
import { ServiceConfig } from '../../../../types/config/service-config';
import { getTypeName } from '../../get-type-name';
import { Capitalize } from '../../../../utils/case-utils';
import { removeEmptyLines } from '../../../../utils/remove-empty-lines';
import { prepareIndentation, resolveIndentation } from '../../../../utils/handle-indentation';

export class TypesTemplate implements FileTemplate<EndpointGroup> {
  constructor(
    private serviceConfig: ServiceConfig,
  ) { }

  getFile(endpointGroup: EndpointGroup): File {
    return {
      name: `${endpointGroup.name}.types.ts`,
      path: `${this.serviceConfig.name}/src/${endpointGroup.name}/`,
      data: resolveIndentation(this.generateTypes(endpointGroup)),
    };
  }

  private generateTypes(endpointGroup: EndpointGroup): string {
    const types = endpointGroup.entities.map(field => this.generateType(field, endpointGroup));

    return removeExtraWhiteSpace(prepareIndentation(types.join('\n\n')));
  }

  private generateType(entity: Entity, endpointGroup: EndpointGroup): string {
    const fields = entity.fields.map(field => this.generateField(field, endpointGroup));

    return removeExtraWhiteSpace(`
      export interface ${Capitalize(entity.name)} {
        ${prepareIndentation(fields.join('\n'))}
      }`);
  }

  private generateField(field: Field, endpointGroup: EndpointGroup): string {
    const typeName = getTypeName(field as Value, endpointGroup);
    return removeEmptyLines(removeExtraWhiteSpace(`${field.name}: ${typeName};`));
  }
}
