import { File } from '../../../../types/file';
import { FileTemplate } from '../../../../types/file-template';
import { ServiceConfig } from '../../../../types/config/service-config';

export class AppControllerTsTemplate implements FileTemplate<ServiceConfig> {
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