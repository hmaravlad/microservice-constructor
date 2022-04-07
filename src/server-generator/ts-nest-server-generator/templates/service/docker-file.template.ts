import { File } from '../../../../types/file';
import { FileTemplate } from '../../../../types/file-template';
import { ServiceConfig } from '../../../../types/service-config';

export class DockerfileTemplate implements FileTemplate<ServiceConfig> {
  getFile(config: ServiceConfig): File {
    return { 
      name: 'Dockerfile',
      path: `${config.name}`,
      data: `      
        FROM node:alpine

        WORKDIR /app
        COPY package.json .
        RUN npm install --only=prod
        COPY . .

        CMD ["npm", "start"]
      `,
    };
  }
}