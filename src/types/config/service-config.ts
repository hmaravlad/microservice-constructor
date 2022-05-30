import { APIConfig } from './api-config';
import { StringField } from '../../decorators/string-field';
import { NumberField } from '../../decorators/number-field';
import { BooleanField } from '../../decorators/boolean-field';
import { ReferenceField } from '../../decorators/reference-field';
import { CustomTypeField } from '../../decorators/custom-field';
import { EnumField } from '../../decorators/enum-field';
import { availableServiceSetups } from '../../server-generator/server-generator-factory';
import { IdField } from '../../decorators/id-field';

export class ServiceConfig {
  @IdField
  id: number;

  @StringField
  name: string;

  @EnumField(availableServiceSetups)
  lang: string;

  @NumberField
  port: number;

  @BooleanField
  docs: boolean;

  @NumberField
  replicas: number;

  @ReferenceField(['database'])
  databaseIds: number[];

  @ReferenceField(['eventBus'])
  eventBusIds: number[];

  @CustomTypeField('APIConfig')
  api?: APIConfig;
}

