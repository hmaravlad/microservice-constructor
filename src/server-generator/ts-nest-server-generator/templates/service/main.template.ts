import { File } from '../../../../types/file';
import { FileTemplate } from '../../../../types/file-template';
import { ServiceConfig } from '../../../../types/service-config';

export class MainTsTemplate implements FileTemplate<ServiceConfig> {
  getFile(config: ServiceConfig): File {
    return { 
      name: 'main.ts',
      path: `${config.name}/src`,
      data: `
        import { ValidationPipe } from '@nestjs/common';
        import { NestFactory } from '@nestjs/core';
        import { AppModule } from './app.module';
        ${config.docs ? "import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';" : ''}

        async function bootstrap() {
          const app = await NestFactory.create(AppModule);
          app.useGlobalPipes(
            new ValidationPipe({
              whitelist: true,
              forbidNonWhitelisted: true,
              transform: true,
            }),
          );

          ${config.docs ? `
          const config = new DocumentBuilder()
            .setTitle(${config.name})
            .setDescription('${config.name} service API description')
            .setVersion('1.0')
            .build();
          const document = SwaggerModule.createDocument(app, config);
          SwaggerModule.setup('api', app, document);
          ` : ''}

          await app.listen(${config.port});
        }
        bootstrap();      
      `,
    };
  }
}