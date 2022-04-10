import { File } from './../../types/file';
import { FileTemplate } from './../../types/file-template';
import { ProjectConfig } from './../../types/project-config';
import { ServiceConfig } from './../../types/service-config';

export class DeplTemplate implements FileTemplate<ServiceConfig> {
  constructor(private projectConfig: ProjectConfig) {}

  getFile(serviceConfig: ServiceConfig): File {
    return {
      name: `${serviceConfig.name}-depl.yaml`,
      path: 'infra/',
      data: `
        apiVersion: apps/v1
        kind: Deployment
        metadata:
          name: ${serviceConfig.name}-depl
        spec:
          replicas: ${serviceConfig.replicas}
          selector:
            matchLabels:
              app: ${serviceConfig.name}
          template:
            metadata:
              labels:
                app: ${serviceConfig.name}
            spec:
              containers:
                - name: ${serviceConfig.name}
                  image: ${this.projectConfig.dockerUsername}/${serviceConfig.name}
        ---
        apiVersion: v1
        kind: Service
        metadata:
          name: ${serviceConfig.name}-srv
        spec:
          selector:
            app: ${serviceConfig.name}
          ports:
            - name: ${serviceConfig.name}
              protocol: TCP
              port: ${serviceConfig.port}
              targetPort: ${serviceConfig.port}
      `,
    };
  }
}

