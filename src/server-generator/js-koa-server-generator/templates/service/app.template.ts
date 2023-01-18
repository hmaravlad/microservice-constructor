/* eslint-disable @typescript-eslint/indent */
import { File } from '../../../../types/file';
import { FileTemplate } from '../../../../types/file-template';
import { ServiceConfig } from '../../../../types/config/service-config';
import { prepareIndentation, resolveIndentation } from '../../../../utils/handle-indentation';
import { removeExtraWhiteSpace } from '../../../../utils/remove-extra-white-space';

export class AppTemplate implements FileTemplate<ServiceConfig> {
  getFile(config: ServiceConfig): File {
    return { 
      name: 'app.ts',
      path: `${config.name}/src`,
      data: resolveIndentation(`
        import Koa from 'koa';
        import Router from 'koa-joi-router';
        import config from 'config';
        import bodyParser from 'koa-body';

        import { SwaggerAPI } from 'koa-joi-router-docs';
        ${config.docs ? "import { koaSwagger } from 'koa2-swagger-ui';" : ''}
        import { createServer, Server } from 'http';

        ${config.api ?
          prepareIndentation(config.api.endpointGroups.map((endpointGroup) => `import ${endpointGroup.name}Router from './${endpointGroup.name}/${endpointGroup.name}.routes';`).join('\n')) :
          ''
        }
      
        export const app = new Koa();
        export async function start(app: Koa, cb: (server: Server) => void): Promise<Koa> {

          const server = createServer(app.callback());
          const router = Router();
          router.prefix('/api/v1');     

          app.use(bodyParser({
            multipart: true,
            includeUnparsed: true,
            formLimit: 200 * 1024,
          }));        


          ${config.docs ? this.generateOpenApiGenerator(config)  : ''}

          router.get('/', async (ctx) => {
            ctx.body = 'Test';
          });

          ${config.api ?
            prepareIndentation(config.api.endpointGroups.map((endpointGroup) => `router.use(${endpointGroup.name}.middleware());`).join('\n')) :
            ''
          }

          app.use(router.middleware());

          cb(server);
          return app;
        }
      `),
    };
  }

  generateOpenApiGenerator(config: ServiceConfig): string {
    if (!config.api) return '';

    return prepareIndentation(removeExtraWhiteSpace(`
      const generator = new SwaggerAPI();

      ${prepareIndentation(config.api.endpointGroups.map((endpointGroup) => (`generator.addJoiRouter(${endpointGroup.name}Router);`)).join('\n'))}
    
      const spec = generator.generateSpec({
        info: {
          title: '${config.name}',
          description: 'Api for service ${config.name}',
          version: '0.0.1',
        },
      });

      router.get('/docs', koaSwagger({ routePrefix: false, swaggerOptions: { spec } }));
  `));
  }
}