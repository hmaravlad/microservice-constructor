import { Capitalize } from '../../utils/case-utils';
import { EndpointGroup, isEntityRef, Value } from '../../types/config/api-config';

const typeMap: { [key: string]: string } = {
  'string': 'string',
  'number': 'number',
  'boolean': 'boolean',
};

export function getTypeName(value: Value, endpointGroup: EndpointGroup): string {
  const { type } = value;

  if (isEntityRef(type)) {
    const entityName = endpointGroup.entities.find(entity => entity.id === type.id)?.name;
    if (!entityName) {
      throw new Error('Invalid entity reference');
    }
    return Capitalize(entityName);
  }

  if (type !== 'array') {
    return typeMap[type];
  }

  const itemType = value.items;

  if (itemType === undefined) {
    throw new Error('Type of value is array, but type of item is not specified');
  }

  return getTypeName(itemType, endpointGroup) + '[]';
}
