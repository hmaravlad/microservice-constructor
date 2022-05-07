import { File } from '../types/file';
import { FilesGenerator } from '../types/files-generator';
import { ProjectConfig } from '../types/config/project-config';
import { IngressSrvTemplate } from './templates/ingress-srv.template';

export class GatewayGenerator implements FilesGenerator<ProjectConfig> {
  generateFiles(config: ProjectConfig): File[] {
    const files: File[] = [];
    for (const gateway of config.gateways) {
      files.push(new IngressSrvTemplate(config).getFile(gateway));
    }
    return files;
  }
}