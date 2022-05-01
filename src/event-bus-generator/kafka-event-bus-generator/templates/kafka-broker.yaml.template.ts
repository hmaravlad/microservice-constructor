import { EventBus } from '../../../types/event-bus';
import { File } from '../../../types/file';
import { FileTemplate } from '../../../types/file-template';

export class KafkaBrokerTemplate implements FileTemplate<EventBus> {
  getFile(eventBus: EventBus): File{
    return {
      name: 'kafka-broker.yaml',
      path: 'infra/',
      data: `
        kind: Deployment
        apiVersion: apps/v1
        metadata:
          name: kafka-broker0
        spec:
          replicas: ${eventBus.replicas}
          selector:
            matchLabels:
                app: kafka
                id: "0"
          template:
            metadata:
              labels:
                app: kafka
                id: "0"
            spec:
              containers:
              - name: kafka
                image: wurstmeister/kafka
                ports:
                - containerPort: 9092
                env:
                - name: KAFKA_ADVERTISED_PORT
                  value: "30718"
                - name: KAFKA_ADVERTISED_HOST_NAME
                  value: 192.168.1.240
                - name: KAFKA_ZOOKEEPER_CONNECT
                  value: zoo1:2181
                - name: KAFKA_BROKER_ID
                  value: "0"
                - name: KAFKA_CREATE_TOPICS
                  value: admintome-test:1:1
      `,
    };
  }
}

