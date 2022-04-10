import { File } from './../types/file';
import { FilesGenerator } from './../types/files-generator';
import { ProjectConfig } from './../types/project-config';
import { ServiceK8SConfigGenerator } from './service-k8s-config-generator';
import { IngressSrvTemplate } from './templates/ingress-srv.template';

export class InfrastructureGenerator implements FilesGenerator<ProjectConfig> {
  generateFiles(config: ProjectConfig): File[] {
    const files: File[] = [];
    const serviceK8SConfigGenerator = new ServiceK8SConfigGenerator(config);
    for (const serviceConfig of config.services) {
      files.push(...serviceK8SConfigGenerator.generateFiles(serviceConfig));
    }
    files.push(new IngressSrvTemplate().getFile(config));
    return files;
  }
}