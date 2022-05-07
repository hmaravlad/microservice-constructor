import { SecretsCreator } from '../../secret-creator';
import { ProjectConfig } from '../../types/project-config';
import { File } from '../../types/file';
import { FileTemplate } from '../../types/file-template';
import { FilesGenerator } from '../../types/files-generator';
import { ServiceConfig } from '../../types/service-config';
import ModuleGenerator from './module-generator';
import { AppControllerTsTemplate } from './templates/service/app.controller.template';
import { AppModuleTsTemplate } from './templates/service/app.module.template';
import { DockerfileTemplate } from './templates/service/docker-file.template';
import { DockerignoreTemplate } from './templates/service/dockerignore.template';
import { EslintrcTemplate } from './templates/service/eslintrc.template';
import { MainTsTemplate } from './templates/service/main.template';
import { PackageJsonTemplate } from './templates/service/package.json.template';
import { PrettierrcTemplate } from './templates/service/prettierrc.template';
import { TsconfigBuildJsonTemplate } from './templates/service/tsconfig.build.template';
import { TsconfigJsonTemplate } from './templates/service/tsconfig.template';

export default class TsNestServerGenerator implements FilesGenerator<ServiceConfig> {
  constructor(
    private secretsCreator: SecretsCreator, 
    private projectConfig: ProjectConfig,
  ) {}

  templates: FileTemplate<ServiceConfig>[] = [
    new AppControllerTsTemplate(),
    new AppModuleTsTemplate(),
    new DockerfileTemplate(),
    new DockerignoreTemplate(),
    new EslintrcTemplate(),
    new MainTsTemplate(),
    new PackageJsonTemplate(),
    new PrettierrcTemplate(),
    new TsconfigJsonTemplate(),
    new TsconfigBuildJsonTemplate(),
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