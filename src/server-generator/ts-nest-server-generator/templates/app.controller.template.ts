import { File } from 'src/types/file';
import { ServiceFileTemplate } from 'src/types/file-template';
import { ServiceConfig } from 'src/types/service-config';

export class AppControllerTsTemplate implements ServiceFileTemplate {
  getFile(config: ServiceConfig): File {
    return { 
      name: 'app.controller.ts',
      path: `${config.name}/src`,
      data: `
        import { Controller, Get } from '@nestjs/common';

        @Controller()
        export class AppController {
          @Get()
          home(): string {
            return 'This is service: ${config.name}';
          }
        }     
      `,
    };
  }
}