import { File } from 'src/types/file';
import { ServiceFileTemplate } from 'src/types/file-template';
import { ServiceFilesGenerator } from 'src/types/files-generator';
import { ServiceConfig } from 'src/types/service-config';
import { AppControllerTsTemplate } from './templates/app.controller.template';
import { AppModuleTsTemplate } from './templates/app.module.template';
import { DockerfileTemplate } from './templates/docker-file.template';
import { DockerignoreTemplate } from './templates/dockerignore.template';
import { EslintrcTemplate } from './templates/eslintrc.template';
import { MainTsTemplate } from './templates/main.template';
import { PackageJsonTemplate } from './templates/package.json.template';
import { PrettierrcTemplate } from './templates/prettierrc.template';
import { TsconfigBuildJsonTemplate } from './templates/tsconfig.build.template';
import { TsconfigJsonTemplate } from './templates/tsconfig.template';

export default class TsNestServerGenerator implements ServiceFilesGenerator {
  templates: ServiceFileTemplate[] = [
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
    return files;
  }
}