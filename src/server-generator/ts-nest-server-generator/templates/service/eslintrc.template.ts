import { File } from '../../../../types/file';
import { FileTemplate } from '../../../../types/file-template';
import { ServiceConfig } from '../../../../types/config/service-config';

export class EslintrcTemplate implements FileTemplate<ServiceConfig> {
  getFile(config: ServiceConfig): File {
    return { 
      name: '.eslintrc.js',
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
              "airbnb-typescript/base",
              "plugin:prettier/recommended"
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