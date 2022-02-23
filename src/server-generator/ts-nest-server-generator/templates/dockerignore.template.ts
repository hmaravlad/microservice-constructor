import { File } from 'src/types/file';
import { ServiceFileTemplate } from 'src/types/file-template';
import { ServiceConfig } from 'src/types/service-config';

export class DockerignoreTemplate implements ServiceFileTemplate {
  getFile(config: ServiceConfig): File {
    return { 
      name: '.dockerignore',
      path: `${config.name}`,
      data: 'node_modules',
    };
  }
}