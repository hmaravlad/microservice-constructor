/* eslint-disable @typescript-eslint/ban-types */

export const CustomTypeField = (type: string): PropertyDecorator => (target: Object, propertyKey: string | symbol) => {
  const metadata = Reflect.getMetadata('fieldData', target) || [];
  metadata.push({ name: propertyKey, type });
  Reflect.defineMetadata('fieldData', metadata, target);
};
