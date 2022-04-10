import { getDistinct } from './../../utils/distinct';
import { File } from './../../types/file';
import { FileTemplate } from './../../types/file-template';
import { ProjectConfig } from './../../types/project-config';
import { removeEmptyLines } from './../../utils/remove-empty-lines';

export class IngressSrvTemplate implements FileTemplate<ProjectConfig> {

  getFile(config: ProjectConfig): File {
    if (!this.checkPrefixes(config)) throw new Error('Prefixes must be unique');

    return {
      name: 'ingress-srv.yaml',
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
            - host: ${config.hostname}
              http:
                paths: ${'\n' + removeEmptyLines(config.services.flatMap(serviceConfig => serviceConfig.api?.endpointGroups.map(endpointGroup => `
                  - path: /${endpointGroup.prefix}/?(.*)
                    backend:
                      serviceName: ${serviceConfig.name}-srv
                      servicePort: ${serviceConfig.port}    
                `)).reduce((prev, curr) => (prev || '') + (curr + ''), '') || '')}
      `,
    };
  }

  checkPrefixes(config: ProjectConfig): boolean {
    const prefixes = config.services.flatMap(serviceConfig => serviceConfig.api?.endpointGroups.map(group => group.prefix));
    return getDistinct(prefixes).length === prefixes.length;
  }
}

