import { removeEmptyLines } from '../../../../utils/remove-empty-lines';
import { File } from '../../../../types/file';
import { FileTemplate } from '../../../../types/file-template';
import { ServiceConfig } from '../../../../types/config/service-config';

export class PackageJsonTemplate implements FileTemplate<ServiceConfig> {
  getFile(config: ServiceConfig): File {
    return { 
      name: 'package.json',
      path: `${config.name}`,
      data: removeEmptyLines(`
      {
        "name": "${config.name}",
        "version": "0.0.1",
        "description": "",
        "scripts": {
          "test": "jest",
          "start": "node build/src/server.js",
          "serve": "tsnd --respawn --no-notify --transpile-only src/server.ts",
          "lint": "eslint . --ext .ts",
          "lint-fix": "eslint . --ext .ts --fix",
          "build": "tsc"
        },
        "author": "",
        "license": "ISC",
        "dependencies": {
          "@koa/cors": "^3.1.0",
          "@types/koa__cors": "^3.0.2",
          "@types/pg": "^7.14.5",
          "config": "^3.3.2",
          "koa": "^2.13.0",
          "koa-body": "^4.2.0",
          "koa-helmet": "^6.0.0",
          ${config.docs ? '"koa2-swagger-ui": "^5.0.2",' : ''}
          "koa-joi-router": "^6.0.2",
          "koa-joi-router-docs": "^1.2.1",
        },
        "devDependencies": {
          "@types/config": "0.0.36",
          "@types/koa": "^2.11.4",
          "@types/koa-helmet": "^5.2.0",
          "@types/koa-joi-router": "^5.2.4",
          "@types/koa-joi-router-docs": "^1.0.0",
          "@types/koa-logger": "^3.1.1",
          "@types/koa-passport": "^4.0.2",
          "@types/passport-jwt": "^3.0.3",
          "@types/pino": "^6.3.2",
          "@types/supertest": "^2.0.10",
          "@typescript-eslint/eslint-plugin": "^4.4.1",
          "@typescript-eslint/parser": "^4.4.1",
          "eslint": "^7.11.0",
          "jest": "^26.4.2",
          "supertest": "^5.0.0",
          "ts-jest": "^26.4.1",
          "ts-node-dev": "^1.0.0-pre.63",
          "tsconfig-paths": "^3.9.0",
          "typescript": "^4.0.3"
        },
        "jest": {
          "moduleFileExtensions": [
            "js",
            "jsx",
            "json",
            "ts",
            "tsx"
          ],
          "collectCoverage": false,
          "collectCoverageFrom": [
            "**/*.{ts,js}",
            "!**/node_modules/**",
            "!**/build/**",
            "!**/coverage/**",
            "!**/migrations/**",
            "!**/config/**"
          ],
          "transform": {
            "\\.ts$": "ts-jest"
          },
          "coverageThreshold": {
            "global": {
              "branches": 50,
              "functions": 90,
              "lines": 0,
              "statements": 0
            }
          },
          "coverageReporters": [
            "text",
            "text-summary"
          ],
          "testRegex": "\\.((unit)|(integration)).ts",
          "testPathIgnorePatterns": [
            "/node_modules/",
            "/build/",
            "/coverage/"
          ],
        }
      }
      `),
    };
  }
}