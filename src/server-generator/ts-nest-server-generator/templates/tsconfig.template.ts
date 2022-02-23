import { File } from 'src/types/file';
import { ServiceFileTemplate } from 'src/types/file-template';
import { ServiceConfig } from 'src/types/service-config';

export class TsconfigJsonTemplate implements ServiceFileTemplate {
  getFile(config: ServiceConfig): File {
    return { 
      name: 'tsconfig.json',
      path: `${config.name}`,
      data: `
        {
          "compilerOptions": {
            "module": "commonjs",
            "declaration": true,
            "removeComments": true,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "allowSyntheticDefaultImports": true,
            "target": "es2017",
            "sourceMap": true,
            "outDir": "./dist",
            "baseUrl": "./",
            "incremental": true,
            "skipLibCheck": true
          }
        }      
      `,
    };
  }
}