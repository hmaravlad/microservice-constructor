import { File } from 'src/types/file';
import { ServiceFileTemplate } from 'src/types/file-template';
import { ServiceConfig } from 'src/types/service-config';

export class AppModuleTsTemplate implements ServiceFileTemplate {
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