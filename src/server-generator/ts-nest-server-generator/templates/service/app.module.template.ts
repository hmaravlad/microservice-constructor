import { File } from '../../../../types/file';
import { FileTemplate } from '../../../../types/file-template';
import { ServiceConfig } from '../../../../types/service-config';

export class AppModuleTsTemplate implements FileTemplate<ServiceConfig> {
  getFile(config: ServiceConfig): File {
    return { 
      name: 'app.module.ts',
      path: `${config.name}/src`,
      data: `
        import { Module } from '@nestjs/common';
        import { AppController } from './app.controller';

        @Module({
          imports: [],
          controllers: [AppController],
          providers: [],
        })
        export class AppModule {}      
      `,
    };
  }
}