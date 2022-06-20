import { File } from '../../../../types/file';
import { FileTemplate } from '../../../../types/file-template';
import { ServiceConfig } from '../../../../types/config/service-config';

export class DockerfileTemplate implements FileTemplate<ServiceConfig> {
  getFile(config: ServiceConfig): File {
    return { 
      name: 'Dockerfile',
      path: `${config.name}`,
      data: `      
        FROM node:14-alpine

        WORKDIR /app
        COPY package.json .
        RUN npm install
        COPY . .
        RUN npm run build
        CMD ["npm", "run", "start:prod"]
        `,
    };
  }
}