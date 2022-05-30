/* eslint-disable @typescript-eslint/ban-types */

export const ReferenceField = (references: string[]): PropertyDecorator => (target: Object, propertyKey: string | symbol) => {
  const metadata = Reflect.getMetadata('fieldData', target) || [];
  metadata.push({ name: propertyKey, type: 'number', references });
  Reflect.defineMetadata('fieldData', metadata, target);
};
