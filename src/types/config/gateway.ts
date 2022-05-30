import { ReferenceField } from '../../decorators/reference-field';
import { StringField } from '../../decorators/string-field';
import { IdField } from '../../decorators/id-field';

export class Gateway {
  @IdField
  id: number;

  @ReferenceField(['service'])
  serviceIds: number[];

  @StringField
  hostname: string;
}