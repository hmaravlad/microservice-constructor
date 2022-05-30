/* eslint-disable @typescript-eslint/ban-types */

export const NumberField: PropertyDecorator = (target: Object, propertyKey: string | symbol) => {
  const metadata = Reflect.getMetadata('fieldData', target) || [];
  metadata.push({ name: propertyKey, type: 'number' });
  Reflect.defineMetadata('fieldData', metadata, target);
};
