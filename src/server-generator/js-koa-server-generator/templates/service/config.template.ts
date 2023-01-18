
import { File } from '../../../../types/file';
import { FileTemplate } from '../../../../types/file-template';
import { ServiceConfig } from '../../../../types/config/service-config';

export class ConfigTemplate implements FileTemplate<ServiceConfig> {
  getFile(config: ServiceConfig): File {
    return { 
      name: 'default.ts',
      path: `${config.name}/config/`,
      data: `      
      module.exports = {
        server: {
          port: ${config.port},
        },
      }`,
    };
  }
}