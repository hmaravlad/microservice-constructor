import { File } from 'src/types/file';
import { ServiceFileTemplate } from 'src/types/file-template';
import { ServiceConfig } from 'src/types/service-config';

export class PackageJSONTemplate implements ServiceFileTemplate {
  getFile(config: ServiceConfig): File {
    return { 
      name: 'package.json',
      path: `${config.name}`,
      data: `
{
  "name": "${config.name}",
  "version": "1.0.0",
  "description": "",
  "main": "main.ts",
  "type": "module",
  "scripts": {
    "start": "node dist/main.js",
    "serve": "tsnd --respawn --no-notify --transpile-only src/main.ts",
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "eslint": "^7.32.0",
    "eslint-plugin-import": "^2.25.2",
    "ts-command-line-args": "^2.1.0",
    "ts-node-dev": "^1.1.8",
    "typescript": "^4.4.4"
  },
  "devDependencies": {
    "@types/mersenne-twister": "^1.1.2",
    "@typescript-eslint/eslint-plugin": "^4.33.0",
    "@typescript-eslint/parser": "^4.33.0",
    "eslint-config-airbnb-typescript": "^14.0.1"
  }
}        `,
    };
  }
}