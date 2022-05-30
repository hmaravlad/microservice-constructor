/* eslint-disable @typescript-eslint/ban-types */

export const StringField: PropertyDecorator = (target: Object, propertyKey: string | symbol) => {
  const metadata = Reflect.getMetadata('fieldData', target) || [];
  metadata.push({ name: propertyKey, type: 'string' });
  Reflect.defineMetadata('fieldData', metadata, target);
};
