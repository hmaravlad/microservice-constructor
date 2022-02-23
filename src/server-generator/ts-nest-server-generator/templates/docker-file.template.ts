import { File } from 'src/types/file';
import { ServiceFileTemplate } from 'src/types/file-template';
import { ServiceConfig } from 'src/types/service-config';

export class DockerfileTemplate implements ServiceFileTemplate {
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