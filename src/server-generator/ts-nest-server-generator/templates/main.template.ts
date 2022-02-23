import { File } from 'src/types/file';
import { ServiceFileTemplate } from 'src/types/file-template';
import { ServiceConfig } from 'src/types/service-config';

export class MainTsTemplate implements ServiceFileTemplate {
  getFile(config: ServiceConfig): File {
    return { 
      name: 'main.ts',
      path: `${config.name}/src`,
      data: `
        import { ValidationPipe } from '@nestjs/common';
        import { NestFactory } from '@nestjs/core';
        import { AppModule } from './app.module';

        async function bootstrap() {
          const app = await NestFactory.create(AppModule);
          app.useGlobalPipes(
            new ValidationPipe({
              whitelist: true,
              forbidNonWhitelisted: true,
              transform: true,
            }),
          );
          await app.listen(${config.port});
        }
        bootstrap();      
      `,
    };
  }
}