/* eslint-disable @typescript-eslint/ban-types */

export const IdField: PropertyDecorator = (target: Object, propertyKey: string | symbol) => {
  const metadata = Reflect.getMetadata('fieldData', target) || [];
  metadata.push({ name: propertyKey, type: 'number', isId: true });
  Reflect.defineMetadata('fieldData', metadata, target);
};
