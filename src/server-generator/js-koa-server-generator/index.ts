import { SecretsCreator } from '../../secret-creator';
import { ProjectConfig } from '../../types/config/project-config';
import { File } from '../../types/file';
import { FileTemplate } from '../../types/file-template';
import { FilesGenerator } from '../../types/files-generator';
import { ServiceConfig } from '../../types/config/service-config';
import ModuleGenerator from './module-generator';
import { DockerfileTemplate } from './templates/service/docker-file.template';
import { DockerignoreTemplate } from './templates/service/dockerignore.template';
import { EslintrcTemplate } from './templates/service/eslintrc.template';
import { PackageJsonTemplate } from './templates/service/package.json.template';
import { AppTemplate } from './templates/service/app.template';
import { ConfigTemplate } from './templates/service/config.template';
import { ServerTemplate } from './templates/service/server.template';
import { TsconfigJsonTemplate } from './templates/service/tsconfig.template';

export default class TsKoaServerGenerator implements FilesGenerator<ServiceConfig> {
  constructor(
    private secretsCreator: SecretsCreator, 
    private projectConfig: ProjectConfig,
  ) {}

  templates: FileTemplate<ServiceConfig>[] = [
    new AppTemplate(),
    new ConfigTemplate(),
    new DockerfileTemplate(),
    new DockerignoreTemplate(),
    new EslintrcTemplate(),
    new PackageJsonTemplate(),
    new ServerTemplate(),
    new TsconfigJsonTemplate(),
  ];

  generateFiles(config: ServiceConfig): File[] {
    const files: File[] = [];

    for (const template of this.templates) {
      files.push(template.getFile(config));
    }

    const moduleGenerator = new ModuleGenerator(config);
    const apiConfig = config.api;

    if (apiConfig) {
      for (const endpointGroup of apiConfig.endpointGroups) {
        files.push(...moduleGenerator.generateFiles(endpointGroup));
      }
    }

    return files;
  }
}