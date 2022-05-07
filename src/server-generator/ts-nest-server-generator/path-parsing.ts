import { Endpoint } from '../../types/config/service-config';

export function getParams(endpoint: Endpoint): string[] {
  return endpoint.path
    .split('/')
    .filter(str => str[0] === ':')
    .map(str => str.slice(1));
}