export interface EventBus {
  type: string;
  replicas: number;
  serviceIds: number[];
}