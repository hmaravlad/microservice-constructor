import { Capitalize } from '../../utils/case-utils';
import { EndpointGroup, isEntityRef, Value } from '../../types/service-config';

const typeMap: { [key: string]: string } = {
  'string': 'string',
  'number': 'number',
};

export function getTypeName(value: Value, endpointGroup: EndpointGroup, imports: string[]): string {
  const { type } = value;
  if (isEntityRef(type)) {
    const entityName = endpointGroup.entities.find(entity => entity.id === type.id)?.name;
    if (!entityName) {
      throw new Error('Invalid entity reference');
    }
    imports.push(Capitalize(entityName));
    return Capitalize(entityName);
  }
  if (type !== 'array') {
    return typeMap[type];
  }
  const itemType = value.items;
  if (itemType === undefined) {
    throw new Error('Type of value is array, but type of item is not specified');
  }
  return getTypeName(itemType, endpointGroup, imports) + '[]';
}
