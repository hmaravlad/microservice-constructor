import { EventBus } from '../../../types/event-bus';
import { File } from '../../../types/file';
import { FileTemplate } from '../../../types/file-template';
import { ServiceConfig } from '../../../types/service-config';

export class ZookeeperDeplTemplate implements FileTemplate<ServiceConfig> {
  getFile(eventBus: EventBus): File{
    return {
      name: 'zookeeper-depl.yaml',
      path: 'infra/',
      data: `
        kind: Deployment
        apiVersion: apps/v1
        metadata:
          name: zookeeper-deploy
        spec:
          replicas: ${eventBus.replicas}
          selector:
            matchLabels:
              app: zookeeper-1
          template:
            metadata:
              labels:
                app: zookeeper-1
            spec:
              containers:
              - name: zoo1
                image: digitalwonderland/zookeeper
                ports:
                - containerPort: 2181
                env:
                - name: ZOOKEEPER_ID
                  value: "1"
                - name: ZOOKEEPER_SERVER_1
                  value: zoo1
      `,
    };
  }
}

