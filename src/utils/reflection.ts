import { ProjectConfig } from '../types/config/project-config';
import { FieldData, EntityData } from '../types/entity';

export function getProjectConfigData(): FieldData[] {
  return Reflect.getMetadata('fieldData', ProjectConfig.prototype);
}

export function getEntitiesData(): EntityData[] {
  return Reflect.getMetadata('entities', ProjectConfig.prototype);
}