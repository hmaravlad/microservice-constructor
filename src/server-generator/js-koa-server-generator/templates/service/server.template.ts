import { File } from '../../../../types/file';
import { FileTemplate } from '../../../../types/file-template';
import { ServiceConfig } from '../../../../types/config/service-config';

export class ServerTemplate implements FileTemplate<ServiceConfig> {
  getFile(config: ServiceConfig): File {
    return { 
      name: 'tsconfig.json',
      path: `${config.name}`,
      data: `
        import config from 'config';
        import { app, start } from './app';

        const port = config.get('server.port');

        start(app, (server) => {
          server.listen(port, () => {
            console.log(\`Server running on port \${port}\`);
          });
        });     
      `,
    };
  }
}