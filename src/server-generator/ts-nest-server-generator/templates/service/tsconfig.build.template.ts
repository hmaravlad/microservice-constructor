import { File } from '../../../../types/file';
import { FileTemplate } from '../../../../types/file-template';
import { ServiceConfig } from '../../../../types/service-config';

export class TsconfigBuildJsonTemplate implements FileTemplate<ServiceConfig> {
  getFile(config: ServiceConfig): File {
    return { 
      name: 'tsconfig.build.json',
      path: `${config.name}`,
      data: `
        {
          "extends": "./tsconfig.json",
          "exclude": ["node_modules", "test", "dist", "**/*spec.ts"]
        }  
      `,
    };
  }
}