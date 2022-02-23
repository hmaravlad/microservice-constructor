import { File } from 'src/types/file';
import { ServiceFileTemplate } from 'src/types/file-template';
import { ServiceConfig } from 'src/types/service-config';

export class PrettierrcTemplate implements ServiceFileTemplate {
  getFile(config: ServiceConfig): File {
    return { 
      name: '.prettierrc.js',
      path: `${config.name}`,
      data: `
        {
          "env": {
              "browser": true,
              "es2021": true
          },
          "extends": [
              "eslint:recommended",
              "plugin:@typescript-eslint/recommended",
              "airbnb-typescript/base"
          ],
          "parser": "@typescript-eslint/parser",
          "parserOptions": {
              "ecmaVersion": "latest",
              "sourceType": "module",
              "project": "./tsconfig.json"
          },
          "plugins": [
              "@typescript-eslint",
              "import"
          ]
        }
      `,
    };
  }
}