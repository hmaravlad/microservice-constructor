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
          "root": true,
          "parser": "@typescript-eslint/parser",
          "plugins": [
            "@typescript-eslint"
          ],
          "extends": [
            "eslint:recommended",
            "plugin:@typescript-eslint/eslint-recommended",
            "plugin:@typescript-eslint/recommended"
          ]
        }
      `,
    };
  }
}