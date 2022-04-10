export interface ServiceConfig {
  name: string;
  type: string;
  lang: string;
  port: number;
  docs: boolean;
  replicas: number;
  api?: APIConfig;
}

export interface APIConfig {
  endpointGroups: EndpointGroup[];
}

export interface EndpointGroup {
  name: string;
  prefix: string;
  endpoints: Endpoint[]
  entities: Entity[];
}

export interface Endpoint {
  name: string;
  path: string;
  method: string;
  request?: Exchange;
  response?: Exchange
}

export interface Entity {
  id: number;
  name: string;
  fields: Field[];
}

export interface Value {
  type: string | EntityRef;
  items?: Value;
}

export interface Field extends Value {
  name: string;
}

export interface Exchange {
  statusCode?: number;
  content: Value;
}

export interface EntityRef {
  id: number;
}

export function isEntityRef(obj: unknown): obj is EntityRef {
  return (obj as EntityRef).id !== undefined;
}

export function isValue(obj: unknown): obj is Value {
  return (obj as Value).type !== undefined;
}