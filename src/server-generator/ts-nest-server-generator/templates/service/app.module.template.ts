import { Capitalize } from '../../../../utils/case-utils';
import { File } from '../../../../types/file';
import { FileTemplate } from '../../../../types/file-template';
import { ServiceConfig } from '../../../../types/config/service-config';
import { prepareIndentation, resolveIndentation } from '../../../../utils/handle-indentation';

export class AppModuleTsTemplate implements FileTemplate<ServiceConfig> {
  getFile(config: ServiceConfig): File {
    return { 
      name: 'app.module.ts',
      path: `${config.name}/src`,
      data: resolveIndentation(`
        import { Module } from '@nestjs/common';
        import { AppController } from './app.controller';
        ${this.generateModuleImports(config)}

        @Module({
          imports: [${config.api ? config.api.endpointGroups.map(({ name }) => `${Capitalize(name)}Module`) : ''}],
          controllers: [AppController],
          providers: [],
        })
        export class AppModule {}      
      `),
    };
  }

  generateModuleImports(config: ServiceConfig): string {
    if (!config.api) return '';

    const imports = config.api.endpointGroups
      .map(({ name }) => `import { ${Capitalize(name)}Module } from './${name}/${name}.module';` )
      .join('\n');

    return prepareIndentation(imports);
  }
}