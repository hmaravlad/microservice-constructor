import { File } from 'src/types/file';
import { ServiceFileTemplate } from 'src/types/file-template';
import { ServiceFilesGenerator } from 'src/types/files-generator';
import { ServiceConfig } from 'src/types/service-config';
import { PackageJSONTemplate } from './templates/package.json.template';

export default class TsNestServerGenerator implements ServiceFilesGenerator {
  templates: ServiceFileTemplate[] = [
    new PackageJSONTemplate(),
  ]; 

  generateFiles(config: ServiceConfig): File[] {
    const files: File[] = [];
    for (const template of this.templates) {
      files.push(template.getFile(config));
    }
    return files;
  }
}