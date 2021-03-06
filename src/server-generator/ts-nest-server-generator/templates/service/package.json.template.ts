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
        "author": "",
        "private": true,
        "license": "UNLICENSED",
        "scripts": {
          "prebuild": "rimraf dist",
          "build": "nest build",
          "format": "prettier --write \\"src/**/*.ts\\" \\"test/**/*.ts\\"",
          "start": "nest start",
          "start:dev": "nest start --watch",
          "start:debug": "nest start --debug --watch",
          "start:prod": "node dist/main",
          "lint": "eslint \\"{src,apps,libs,test}/**/*.ts\\" --fix",
          "test": "jest",
          "test:watch": "jest --watch",
          "test:cov": "jest --coverage",
          "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand"
        },
        "dependencies": {
          "@nestjs/common": "^8.0.0",
          "@nestjs/core": "^8.0.0",
          "@nestjs/mapped-types": "^1.0.0",
          "@nestjs/platform-express": "^8.0.0",
          ${config.docs ? '"@nestjs/swagger": "^5.2.1",' : ''}
          "class-transformer": "^0.4.0",
          "class-validator": "^0.13.1",
          "knex": "^0.95.9",
          "nestjs-knex": "^2.0.0",
          "reflect-metadata": "^0.1.13",
          "rimraf": "^3.0.2",
          "rxjs": "^7.2.0"${config.docs ? ',' : ''}
          ${config.docs ? '"swagger-ui-express": "^4.3.0"' : ''}
        },
        "devDependencies": {
          "@nestjs/cli": "^8.0.0",
          "@nestjs/schematics": "^8.0.0",
          "@nestjs/testing": "^8.0.0",
          "@types/express": "^4.17.13",
          "@types/jest": "^26.0.24",
          "@types/node": "^16.0.0",
          "@types/supertest": "^2.0.11",
          "@typescript-eslint/eslint-plugin": "^4.33.0",
          "@typescript-eslint/parser": "^4.33.0",
          "eslint": "^7.30.0",
          "eslint-config-prettier": "^8.3.0",
          "eslint-plugin-prettier": "^3.4.0",
          "eslint-config-airbnb-typescript": "^14.0.1",      
          "jest": "27.0.6",
          "prettier": "^2.3.2",
          "supertest": "^6.1.3",
          "ts-jest": "^27.0.3",
          "ts-loader": "^9.2.3",
          "ts-node": "^10.0.0",
          "tsconfig-paths": "^3.10.1",
          "typescript": "^4.3.5"
        },
        "jest": {
          "moduleFileExtensions": [
            "js",
            "json",
            "ts"
          ],
          "rootDir": "src",
          "testRegex": ".*\\\\.spec\\\\.ts$",
          "transform": {
            "^.+\\\\.(t|j)s$": "ts-jest"
          },
          "collectCoverageFrom": [
            "**/*.(t|j)s"
          ],
          "coverageDirectory": "../coverage",
          "testEnvironment": "node"
        }
      }           
    `),
    };
  }
}