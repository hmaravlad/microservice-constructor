import { File } from '../../../types/file';
import { FileTemplate } from '../../../types/file-template';
import { ServiceConfig } from '../../../types/service-config';

export class ZookeeperServiceTemplate implements FileTemplate<ServiceConfig> {
  getFile(): File{
    return {
      name: 'zookeeper-service.yaml',
      path: 'infra/',
      data: `
        apiVersion: v1
        kind: Service
        metadata:
          name: zoo1
          labels:
            app: zookeeper-1
        spec:
          ports:
          - name: client
            port: 2181
            protocol: TCP
          - name: follower
            port: 2888
            protocol: TCP
          - name: leader
            port: 3888
            protocol: TCP
          selector:
            app: zookeeper-1
      `,
    };
  }
}

