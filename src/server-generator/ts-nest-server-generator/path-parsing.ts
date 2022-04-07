import { Endpoint } from '../../types/service-config';

export function getParams(endpoint: Endpoint): string[] {
  return endpoint.path
    .split('/')
    .filter(str => str[0] === ':')
    .map(str => str.slice(1));
}