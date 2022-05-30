import { IdField } from '../../decorators/id-field';
import { availableDatabases } from '../../database-generator/database-generator-factory';
import { EnumField } from '../../decorators/enum-field';
import { NumberField } from '../../decorators/number-field';
import { StringField } from '../../decorators/string-field';

export class Database {
  @IdField
  id: number;

  @StringField
  name: string;

  @EnumField(availableDatabases)
  type: string;

  @NumberField
  sizeGb: number;
}