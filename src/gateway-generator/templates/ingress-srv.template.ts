import { getDistinct } from '../../utils/distinct';
import { File } from '../../types/file';
import { FileTemplate } from '../../types/file-template';
import { ProjectConfig } from '../../types/config/project-config';
import { removeEmptyLines } from '../../utils/remove-empty-lines';
import { Gateway } from '../../types/config/gateway';

export class IngressSrvTemplate implements FileTemplate<Gateway> {
  constructor(private config: ProjectConfig) {}

  getFile(gateway: Gateway): File {
    if (!this.checkPrefixes(this.config, gateway)) throw new Error('Prefixes must be unique');

    return {
      name: `ingress-${gateway.id}-srv.yaml`,
      path: 'infra/',
      data: `
        apiVersion: extensions/v1beta1
        kind: Ingress
        metadata:
          name: ingress-service
          annotations:
            kubernetes.io/ingress.class: nginx
            nginx.ingress.kubernetes.io/use-regex: 'true'
        spec:
          rules:
            - host: ${gateway.hostname}
              http:
                paths: ${'\n' + removeEmptyLines(this.config.services.filter(service => gateway.serviceIds.includes(service.id)).flatMap(serviceConfig => serviceConfig.api?.endpointGroups.map(endpointGroup => `
                  - path: /${endpointGroup.prefix}
                    pathType: Prefix
                    backend:
                      service:
                        name: ${serviceConfig.name}-srv
                        port: 
                          number: ${serviceConfig.port}    
                `)).reduce((prev, curr) => (prev || '') + (curr + ''), '') || '')}
      `,
    };
  }

  checkPrefixes(config: ProjectConfig, gateway: Gateway): boolean {
    const prefixes = config.services
      .filter(service => gateway.serviceIds.includes(service.id))
      .flatMap(serviceConfig => serviceConfig.api?.endpointGroups.map(group => group.prefix));
    return getDistinct(prefixes).length === prefixes.length;
  }
}

