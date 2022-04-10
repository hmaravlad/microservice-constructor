import { File } from './../../types/file';
import { FileTemplate } from './../../types/file-template';
import { ProjectConfig } from './../../types/project-config';

export class IngressSrvTemplate implements FileTemplate<ProjectConfig> {

  getFile(config: ProjectConfig): File {
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
                paths: ${config.services.map(serviceConfig => serviceConfig.api?.endpointGroups.map(endpointGroup => `
                  - path: /${endpointGroup.prefix}/?(.*)
                    backend:
                      serviceName: ${serviceConfig.name}-srv
                      servicePort: ${serviceConfig.port}    
                `))}
      `,
    };
  }
}

