/* eslint-disable @typescript-eslint/ban-types */

export const Entity = (name: string, type: Object & { prototype: Object; }): PropertyDecorator => (target: Object, propertyKey: string | symbol) => {
  const constructor = target;
  const metadata = Reflect.getMetadata('entities', constructor) || [];
  const fields = Reflect.getMetadata('fieldData', type.prototype);
  metadata.push({
    name,
    fieldName: propertyKey,
    fields,
  });
  Reflect.defineMetadata('entities', metadata, constructor);
};
