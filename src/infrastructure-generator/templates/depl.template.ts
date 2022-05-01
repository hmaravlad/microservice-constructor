import { DatabaseGeneratorFactory } from './../../database-generator/database-generator-factory';
import { EventBusGeneratorFactory } from './../../event-bus-generator/event-bus-generator-factory';
import { SecretsCreator } from './../../secret-creator';
import { EnvVariable } from './../../types/env-variable';
import { addIndentation } from './../../utils/add-indentation';
import { removeEmptyLines } from './../../utils/remove-empty-lines';
import { removeExtraWhiteSpace } from './../../utils/remove-extra-white-space';
import { File } from './../../types/file';
import { FileTemplate } from './../../types/file-template';
import { ProjectConfig } from './../../types/project-config';
import { ServiceConfig } from './../../types/service-config';

export class DeplTemplate implements FileTemplate<ServiceConfig> {
  constructor(private projectConfig: ProjectConfig) {}

  generateEnv(serviceConfig: ServiceConfig): string {
    const envs: EnvVariable[] = [];
    const secrets: string[] = [];

    const dbs = this.projectConfig.databases.filter(({ serviceIds }) => serviceIds.includes(serviceConfig.id) );
    
    for (const db of dbs) {
      const databaseGenerator = new DatabaseGeneratorFactory(new SecretsCreator).getDatabaseGenerator(db.type);  
      envs.push(...databaseGenerator.getEnvVariables(db));
      secrets.push(...databaseGenerator.getSecrets(db));
    }

    const eventBuses = [this.projectConfig.eventBus].filter(({ serviceIds }) => serviceIds.includes(serviceConfig.id) );
    
    for (const eventBus of eventBuses) {
      const eventBusGenerator = new EventBusGeneratorFactory().getEventBusGenerator(eventBus.type);  
      envs.push(...eventBusGenerator.getEnvVariables(eventBus));
    }

    const secretStrs = removeExtraWhiteSpace(secrets
      .map(secret => `
        - name: ${secret}
          valueFrom:
            secretKeyRef:
              name: ${secret.toLowerCase().replace(/_/g, '-')}-secret
              key: ${secret}
      `).join('\n'));

    const envsStrs = removeExtraWhiteSpace(envs
      .map(env => `
        - name: ${env.name}
          value: '${env.value}'
      `).join('\n'));

    if (secretStrs.length + envsStrs.length > 0) {
      return 'env:' + '\n' + addIndentation(secretStrs, '\t') + '\n' +  addIndentation(envsStrs, '\t');
    } else {
      return '';
    }
  }

  getFile(serviceConfig: ServiceConfig): File {
    return {
      name: `${serviceConfig.name}-depl.yaml`,
      path: 'infra/',
      data: removeEmptyLines(`
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
                  ${addIndentation(this.generateEnv(serviceConfig), '\t\t\t\t\t\t\t\t\t', true)}
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
      `),
    };
  }
}

