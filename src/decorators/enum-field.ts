/* eslint-disable @typescript-eslint/ban-types */

export const EnumField = (possibleValues: string[] | number[]): PropertyDecorator => (target: Object, propertyKey: string | symbol) => {
  if (possibleValues.length === 0) throw new Error('There should be at least one possible value');
  const metadata = Reflect.getMetadata('fieldData', target) || [];
  metadata.push({ name: propertyKey, type: 'enum', possibleValues });
  Reflect.defineMetadata('fieldData', metadata, target);
};
