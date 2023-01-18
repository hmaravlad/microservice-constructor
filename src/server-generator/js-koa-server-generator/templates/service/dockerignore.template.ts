import { File } from '../../../../types/file';
import { FileTemplate } from '../../../../types/file-template';
import { ServiceConfig } from '../../../../types/config/service-config';

export class DockerignoreTemplate implements FileTemplate<ServiceConfig> {
  getFile(config: ServiceConfig): File {
    return { 
      name: '.dockerignore',
      path: `${config.name}`,
      data: `
        node_modules
        dist
      `,
    };
  }
}