import { SecretsCreator } from '../../secret-creator';
import { ProjectConfig } from '../../types/config/project-config';
import { EventBus } from '../../types/config/event-bus';
import { File } from '../../types/file';
import { FileTemplate } from '../../types/file-template';
import { FilesGenerator } from '../../types/files-generator';
import { KafkaBrokerTemplate } from './templates/kafka-broker.yaml.template';
import { KafkaServiceTemplate } from './templates/kafka-service.yaml.template';
import { ZookeeperDeplTemplate } from './templates/zookeeper-depl.yaml.template';
import { ZookeeperServiceTemplate } from './templates/zookeeper-service.yaml.template';

export default class KafkaEventBusGenerator implements FilesGenerator<EventBus>  {
  constructor(
    private secretsCreator: SecretsCreator, 
    private projectConfig: ProjectConfig,
  ) {}

  templates: FileTemplate<EventBus>[] = [
    new ZookeeperDeplTemplate(),
    new ZookeeperServiceTemplate(),
    new KafkaServiceTemplate(),
    new KafkaBrokerTemplate(),
  ];

  generateFiles(config: EventBus): File[] {
    const files = this.templates.map(template => template.getFile(config));
    return files;
  }
}