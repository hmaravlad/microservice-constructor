import { File } from '../../../types/file';
import { FileTemplate } from '../../../types/file-template';
import { ServiceConfig } from '../../../types/config/service-config';
import { prepareIndentation, resolveIndentation } from '../../../utils/handle-indentation';

export class TestsYamlTemplate implements FileTemplate<ServiceConfig> {
  constructor(private testCommands: string[]) {}

  getFile(serviceConfig: ServiceConfig): File{
    return {
      name: `test-${serviceConfig.name}.yaml`,
      path: '.github/workflows',
      data: resolveIndentation(`
        name: ${serviceConfig.name}

        on:
          push:
            branches: [ main ]
            paths: [ '${serviceConfig.name}/**' ]
          pull_request:
            branches: [ main ]
            paths: [ '${serviceConfig.name}/**' ]
        
        jobs:
          test:
            runs-on: ubuntu-latest
            defaults:
              run:
                working-directory: ./auth      
            steps:
            - uses: actions/checkout@v2
            ${prepareIndentation(this.testCommands.map(command => `- run: ${command}`).join('\n'))}
    `),
    };
  }
}

