import { File } from 'src/types/file';
import { ServiceFileTemplate } from 'src/types/file-template';
import { ServiceConfig } from 'src/types/service-config';

export class TsconfigBuildJsonTemplate implements ServiceFileTemplate {
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