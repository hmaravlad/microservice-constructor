import { EnumField } from '../../decorators/enum-field';
import { availableEventBuses } from '../../event-bus-generator/event-bus-generator-factory';
import { NumberField } from '../../decorators/number-field';
import { IdField } from '../../decorators/id-field';

export class EventBus {
  @IdField
  id: number;

  @EnumField(availableEventBuses)
  type: string;

  @NumberField
  replicas: number;
}