import { Capitalize } from '../../utils/case-utils';
import { EndpointGroup, isEntityRef, Value } from '../../types/config/api-config';
import { getTypeName } from './get-type-name';

const typeMap: { [key: string]: string } = {
  'string': 'Joi.string()',
  'number': 'Joi.number()',
  'boolean': 'Joi.boolean()',
};

export function getJoiType(value: Value, endpointGroup: EndpointGroup): string {
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

  return `Joi.array().items(${getTypeName(itemType, endpointGroup)})`;
}
