import { File } from '../../../types/file';
import { FileTemplate } from '../../../types/file-template';
import { ServiceConfig } from '../../../types/config/service-config';

export class KafkaServiceTemplate implements FileTemplate<ServiceConfig> {
  getFile(): File{
    return {
      name: 'kafka-service.yaml',
      path: 'infra/',
      data: `
        apiVersion: v1
        kind: Service
        metadata:
          name: kafka-service
          labels:
            name: kafka
        spec:
          ports:
          - port: 9092
            name: kafka-port
            protocol: TCP
          selector:
            app: kafka
            id: "0"
          type: LoadBalancer
      `,
    };
  }
}

