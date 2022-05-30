/* eslint-disable @typescript-eslint/ban-types */

export const BooleanField: PropertyDecorator = (target: Object, propertyKey: string | symbol) => {
  const metadata = Reflect.getMetadata('fieldData', target) || [];
  metadata.push({ name: propertyKey, type: 'boolean' });
  Reflect.defineMetadata('fieldData', metadata, target);
};
